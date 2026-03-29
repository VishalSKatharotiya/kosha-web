import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { loadRazorpay } from "../utils/razorpay";
import { INDIAN_STATES } from "../constants/states";
import { trackBeginCheckout } from "../utils/analytics";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discountAmount, finalTotal }
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);
    try {
      const res = await api.post("/coupon/validate", {
        code: couponInput.trim(),
        cartTotal,
        userId: user?.id || null,
      });
      if (res.data.valid) {
        setAppliedCoupon({
          code: couponInput.trim().toUpperCase(),
          ...res.data,
        });
      } else {
        setCouponError(res.data.message);
      }
    } catch {
      setCouponError("Could not apply coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Must be 10 digits";

    if (!formData.pincode?.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Must be exactly 6 digits";

    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setPaymentProcessing(true);
    
    // Track checkout attempt in GA4
    trackBeginCheckout(cartItems, appliedCoupon?.finalTotal ?? cartTotal);

    try {
      const orderData = {
        userId: user.id,
        customerData: formData,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        total: cartTotal,
        couponCode: appliedCoupon?.code || null,
        discount: appliedCoupon?.discountAmount || 0,
        finalTotal: appliedCoupon?.finalTotal ?? cartTotal,
        paymentMethod,
      };

      const response = await api.post("/payment/create", orderData);

      if (paymentMethod === "razorpay") {
        const { razorpayOrderId, amount, currency } = response.data;
        const res = await loadRazorpay();

        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          setIsSubmitting(false);
          setPaymentProcessing(false);
          return;
        }

        // Overlay is already showing — keep it while Razorpay modal loads
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: "Kosha Herbal",
          description: "Purchase Payment",
          order_id: razorpayOrderId,
          // ── Restrict payment methods ──────────────────────
          config: {
            display: {
              blocks: {
                utib: { name: "Pay via UPI", instruments: [{ method: "upi" }] },
                cards: {
                  name: "Pay via Card",
                  instruments: [{ method: "card" }],
                },
              },
              sequence: ["block.utib", "block.cards"],
              preferences: { show_default_blocks: false },
            },
          },
          // ──────────────────────────────────────────────────
          handler: async (paymentRes) => {
            try {
              setPaymentProcessing(true);
              await api.post("/payment/verify", paymentRes);
              setPaymentProcessing(false);
              setOrderId(response.data?.orderId || razorpayOrderId);
              setOrderSuccess(true);
              clearCart();
              window.scrollTo(0, 0);
            } catch (err) {
              setPaymentProcessing(false);
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#6b46c1",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", () => setPaymentProcessing(false));
        rzp.open();
        setPaymentProcessing(false); // hide loader when modal is visible
      } else {
        // COD path
        setOrderId(response.data.orderId);
        setOrderSuccess(true);
        clearCart();
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to place order. Please try again.";
      alert(
        `${errorMessage}\n\nNote: Your amount will be credited in case order is not placed and amount is deducted.`,
      );
    } finally {
      setIsSubmitting(false);
      setPaymentProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="cart-page success-page">
        <div className="container">
          <div className="success-card">
            <CheckCircle size={80} weight="fill" color="#4CAF50" />
            <h1>Order Placed Successfully!</h1>
            <p>
              Thank you for your purchase. Your order ID is{" "}
              <strong>#{orderId}</strong>.
            </p>
            <p>We've sent a confirmation email to {formData.email}.</p>
            <Link to="/my-orders" className="btn btn-primary">
              VIEW MY ORDERS
            </Link>
            <Link to="/" className="btn btn-secondary">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-state">
            <ShoppingBag size={100} weight="thin" />
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/#products" className="btn btn-primary">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items in your bag</p>
        </div>

        <div className="cart-content-wrapper">
          {/* Top Section: Items (Left) and Summary (Right) */}
          <div className="cart-top-section">
            <div className="cart-items-container">
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={
                          (item.product.images || [])[0] || item.product.image
                        }
                        alt={item.product.name}
                      />
                    </div>
                    <div className="item-details">
                      <div className="item-info">
                        <h3>{item.product.name}</h3>
                        <p className="item-subtitle">{item.product.subtitle}</p>
                      </div>
                      <div className="item-pricing">
                        <div className="item-price">₹{item.product.price}</div>
                        {item.product.originalPrice && (
                          <div className="item-mrp">
                            ₹{item.product.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus size={16} weight="bold" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus size={16} weight="bold" />
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="continue-shopping">
                <Link to="/">
                  <ArrowLeft size={16} weight="bold" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="cart-summary-container">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>

                {/* ── Coupon input ── */}
                <div style={{ margin: "0.75rem 0" }}>
                  {!appliedCoupon ? (
                    <>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError("");
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), handleApplyCoupon())
                          }
                          style={{
                            flex: 1,
                            padding: "0.5rem 0.75rem",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            fontSize: "0.88rem",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                          style={{
                            padding: "0.5rem 1rem",
                            background: "#6b46c1",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            fontWeight: 600,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponError && (
                        <p
                          style={{
                            marginTop: 6,
                            fontSize: "0.8rem",
                            color: "#ef4444",
                          }}
                        >
                          ⚠ {couponError}
                        </p>
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        background: "#f0fdf4",
                        border: "1px solid #86efac",
                        borderRadius: 8,
                        padding: "0.6rem 0.9rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#15803d",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                        }}
                      >
                        🎟️ {appliedCoupon.code} — You save ₹
                        {appliedCoupon.discountAmount}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#6b7280",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {appliedCoupon && (
                  <div
                    className="summary-row"
                    style={{ color: "#15803d", fontWeight: 600 }}
                  >
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discountAmount}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>
                    ₹{appliedCoupon ? appliedCoupon.finalTotal : cartTotal}
                  </span>
                </div>
                <div className="trust-badges">
                  <div className="trust-item">
                    <Truck size={20} weight="fill" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="trust-item">
                    <ShieldCheck size={20} weight="fill" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Delivery Form */}
          <div className="cart-bottom-section">
            <div className="checkout-card">
              <h2>Delivery Details</h2>
              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Contact No</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile"
                    />
                    {errors.phone && (
                      <span className="error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Street, Landmark"
                    rows="3"
                  ></textarea>
                  {errors.address && (
                    <span className="error">{errors.address}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                    {errors.city && (
                      <span className="error">{errors.city}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="state-select"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className="error">{errors.state}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6 digits"
                    />
                    {errors.pincode && (
                      <span className="error">{errors.pincode}</span>
                    )}
                  </div>
                </div>

                <div className="payment-info-banner">
                  <CreditCard size={16} weight="fill" />
                  <span>
                    We accept <strong>UPI</strong> and{" "}
                    <strong>Debit/Credit Cards</strong> only. No Cash on
                    Delivery.
                  </span>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary place-order-btn ${!user ? "login-btn" : "reduced-size"}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "PROCESSING..."
                    : user
                      ? `PLACE ORDER & PAY ₹${appliedCoupon ? appliedCoupon.finalTotal : cartTotal}`
                      : "LOGIN TO PLACE ORDER"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen payment processing overlay */}
      {paymentProcessing && (
        <div className="payment-overlay">
          <div className="payment-overlay-card">
            <div className="payment-spinner" />
            <h3>Processing Payment</h3>
            <p>Please do not close or refresh this page…</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
