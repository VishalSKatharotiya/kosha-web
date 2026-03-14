import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import AdminModal from "./AdminModal";
import { INDIAN_STATES } from "../../constants/states";
import {
  Plus,
  X,
  Check,
  Truck,
  Package,
  MagnifyingGlass,
  Eye,
  Trash,
  CreditCard,
  ReceiptX,
  Hash,
  ShoppingBag,
  User,
  CaretUp,
  CaretDown,
  Tag,
} from "@phosphor-icons/react";

const STATUSES = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];
const PAYMENT_STATUSES = ["pending", "completed", "failed", "refunded"];

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  // Admin coupon state for Create Order modal
  const [adminCouponCode, setAdminCouponCode] = useState('');
  const [adminCouponResult, setAdminCouponResult] = useState(null);
  const [adminCouponError, setAdminCouponError] = useState('');

  const trackingInputRef = useRef(null);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    customerCity: "",
    customerState: "",
    customerPincode: "",
    paymentMethod: "cod",
  });
  const [orderItems, setOrderItems] = useState([
    { productId: "", quantity: 1 },
  ]);

  const addOrderItem = () =>
    setOrderItems([...orderItems, { productId: "", quantity: 1 }]);
  const removeOrderItem = (i) =>
    setOrderItems(orderItems.filter((_, idx) => idx !== i));
  const updateOrderItem = (i, field, value) => {
    const updated = [...orderItems];
    updated[i] = {
      ...updated[i],
      [field]: field === "quantity" ? parseInt(value) || 1 : value,
    };
    setOrderItems(updated);
  };
  const orderTotal = orderItems.reduce((sum, item) => {
    const p = products.find((pr) => pr.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
  const orderFinalTotal = adminCouponResult
    ? adminCouponResult.finalTotal
    : orderTotal;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        api.get("/payment/orders"),
        api.get("/products"),
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder({ ...order });
    setShowViewModal(true);
  };

  const handleUpdateStatus = async (orderId, status) => {
    setUpdatingStatus(true);
    try {
      await api.put(`/payment/order/${orderId}/status`, { status });
      const updated = { ...selectedOrder, status };
      setSelectedOrder(updated);
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
    } catch (error) {
      alert("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleUpdatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      await api.put(`/payment/order/${orderId}/payment-status`, {
        paymentStatus,
      });
      const updated = { ...selectedOrder, paymentStatus };
      setSelectedOrder(updated);
      setOrders(
        orders.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o)),
      );
    } catch (error) {
      alert("Error updating payment status");
    }
  };

  const handleUpdateTracking = async () => {
    const trackingId = trackingInputRef.current?.value?.trim();
    if (!trackingId) return;
    try {
      await api.put(`/payment/order/${selectedOrder.id}/status`, {
        trackingId,
      });
      const updated = { ...selectedOrder, trackingId };
      setSelectedOrder(updated);
      setOrders(
        orders.map((o) =>
          o.id === selectedOrder.id ? { ...o, trackingId } : o,
        ),
      );
    } catch (error) {
      alert("Error updating tracking ID");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/payment/order/${id}`);
      setOrders(orders.filter((o) => o.id !== id));
      setShowViewModal(false);
    } catch (error) {
      alert("Error deleting order");
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const validItems = orderItems.filter(
      (item) => item.productId && item.quantity > 0,
    );
    if (validItems.length === 0) {
      alert("Please add at least one product");
      return;
    }
    if (!newOrder.customerState) {
      alert("Please select a state");
      return;
    }
    if (!/^\d{10}$/.test(newOrder.customerPhone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    if (newOrder.customerPincode && !/^\d{6}$/.test(newOrder.customerPincode)) {
      alert("Pincode must be exactly 6 digits");
      return;
    }
    try {
      const payload = {
        userId: null,
        customerData: {
          name: newOrder.customerName,
          email: newOrder.customerEmail,
          phone: newOrder.customerPhone,
          address: newOrder.customerAddress,
          city: newOrder.customerCity,
          state: newOrder.customerState,
          pincode: newOrder.customerPincode,
        },
        items: validItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        total: orderTotal,
        couponCode: adminCouponResult ? adminCouponCode : null,
        discount: adminCouponResult?.discountAmount || 0,
        finalTotal: orderFinalTotal,
        paymentMethod: newOrder.paymentMethod,
      };
      await api.post("/payment/create", payload);
      alert("Order created successfully");
      setShowCreateModal(false);
      setNewOrder({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
        customerCity: "",
        customerState: "",
        customerPincode: "",
        paymentMethod: "cod",
      });
      setOrderItems([{ productId: "", quantity: 1 }]);
      setAdminCouponCode('');
      setAdminCouponResult(null);
      setAdminCouponError('');
      fetchData();
    } catch (error) {
      const msg = error?.response?.data?.message || "Error creating order";
      alert(msg);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="sort-arrow">⇅</span>;
    return sortDir === "asc"
      ? <CaretUp size={12} weight="bold" className="sort-arrow" />
      : <CaretDown size={12} weight="bold" className="sort-arrow" />;
  };

  const filteredOrders = orders
    .filter(
      (o) =>
        (o.customerData?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (o.customerData?.email || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (o.customerData?.phone || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let aVal, bVal;
      if (sortField === "createdAt") {
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
      } else if (sortField === "finalTotal") {
        aVal = a.finalTotal || 0;
        bVal = b.finalTotal || 0;
      } else if (sortField === "status") {
        aVal = a.status || "";
        bVal = b.status || "";
      } else if (sortField === "customer") {
        aVal = a.customerData?.name || "";
        bVal = b.customerData?.name || "";
      } else {
        return 0;
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="admin-section fade-in">
      <div className="section-header">
        <div className="header-left">
          <h2>Manage Orders</h2>
          <div className="search-bar-premium">
            <MagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search by name, email, phone or order ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button
          className="add-btn-premium"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} weight="bold" />
          Create Order
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="premium-admin-table">
            <thead>
              <tr className="table-head-gradient">
                <th
                  className={`th-sortable${sortField === "createdAt" ? " sorted" : ""}`}
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="th-inner">
                    <Hash size={14} weight="bold" />
                    Date
                    <SortIcon field="createdAt" />
                  </div>
                </th>
                <th
                  className={`th-sortable${sortField === "customer" ? " sorted" : ""}`}
                  onClick={() => handleSort("customer")}
                >
                  <div className="th-inner">
                    <User size={14} weight="bold" />
                    Customer
                    <SortIcon field="customer" />
                  </div>
                </th>
                <th>
                  <div className="th-inner">Contact</div>
                </th>
                <th>
                  <div className="th-inner">
                    <ShoppingBag size={14} weight="bold" />
                    Items
                  </div>
                </th>
                <th
                  className={`th-sortable${sortField === "finalTotal" ? " sorted" : ""}`}
                  onClick={() => handleSort("finalTotal")}
                >
                  <div className="th-inner">
                    Total
                    <SortIcon field="finalTotal" />
                  </div>
                </th>
                <th>
                  <div className="th-inner">
                    <CreditCard size={14} weight="bold" />
                    Payment
                  </div>
                </th>
                <th
                  className={`th-sortable${sortField === "status" ? " sorted" : ""}`}
                  onClick={() => handleSort("status")}
                >
                  <div className="th-inner">
                    Status
                    <SortIcon field="status" />
                  </div>
                </th>
                <th className="text-right">
                  <div className="th-inner" style={{ justifyContent: "flex-end" }}>Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="table-row-hover"
                  onClick={() => handleViewOrder(order)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className="customer-cell-premium" style={{ fontSize: "0.82rem", color: "#666" }}>
                      <strong style={{ color: "#222" }}>{new Date(order.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</strong>
                      <code className="order-id-code" style={{ marginTop: 2 }}>#{order.id.slice(0, 8)}</code>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell-premium">
                      <strong>{order.customerData?.name || "Guest"}</strong>
                      <span>{order.customerData?.email}</span>
                      <span>
                        {order.customerData?.city}, {order.customerData?.state}
                      </span>
                    </div>
                  </td>
                  <td className="text-muted">
                    <span style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                      {order.customerData?.phone || "—"}
                    </span>
                  </td>
                  <td>
                    <div className="items-cell">
                      {(order.items || []).map((item) => (
                        <div key={item.id} className="mini-item">
                          <div className="mini-item-img">
                            <img
                              src={
                                (item.product?.images || [])[0] ||
                                item.product?.image
                              }
                              alt=""
                            />
                          </div>
                          <div className="mini-item-info">
                            <span className="mini-item-name">
                              {item.product?.name}
                            </span>
                            <span className="mini-item-qty">
                              ×{item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="price-text">₹{order.finalTotal}</span>
                    {order.couponCode && (
                      <div style={{ marginTop: 4 }}>
                        <span style={{ fontSize: '0.72rem', background: '#f0fdf4', color: '#15803d', border: '1px solid #86efac', borderRadius: 4, padding: '1px 6px', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          <Tag size={10} weight="bold" />{order.couponCode}
                        </span>
                      </div>
                    )}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <span
                      className={`status-chip payment-${order.paymentStatus}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <span className={`status-chip order-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="action-buttons">
                      <button
                        className="icon-btn view"
                        title="View Details"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye size={18} />
                      </button>
                      {/* <button
                        className="icon-btn delete"
                        title="Delete"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash size={18} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══ View / Edit Order Modal ═══ */}
      {showViewModal && selectedOrder && (
        <AdminModal onClose={() => setShowViewModal(false)}>
          <div
            className="premium-modal ultra-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>
                  Order <code>#{selectedOrder.id.slice(0, 8)}</code>
                </h3>
                <span className="modal-subtitle">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setShowViewModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body-scroll">
              {/* Row 1: Customer + Manage + Payment */}
              <div className="order-modal-grid three-col">
                {/* Customer Info */}
                <div className="modal-card">
                  <h4>
                    <User size={16} /> Customer Details
                  </h4>
                  <div className="info-list">
                    <div className="info-row">
                      <span>Name</span>
                      <strong>{selectedOrder.customerData?.name || "—"}</strong>
                    </div>
                    <div className="info-row">
                      <span>Email</span>
                      <strong>
                        {selectedOrder.customerData?.email || "—"}
                      </strong>
                    </div>
                    <div className="info-row">
                      <span>Phone</span>
                      <strong>
                        {selectedOrder.customerData?.phone || "—"}
                      </strong>
                    </div>
                    <div className="info-row">
                      <span>Address</span>
                      <strong>{selectedOrder.customerData?.address}</strong>
                    </div>
                    <div className="info-row">
                      <span>City</span>
                      <strong>
                        {selectedOrder.customerData?.city},{" "}
                        {selectedOrder.customerData?.state} -{" "}
                        {selectedOrder.customerData?.pincode}
                      </strong>
                    </div>
                    <div className="info-row">
                      <span>Payment Method</span>
                      <strong className="upper">
                        {selectedOrder.paymentMethod}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Order Management Controls */}
                <div className="modal-card">
                  <h4>
                    <Truck size={16} /> Order Management
                  </h4>
                  <div className="form-group">
                    <label>Order Status</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        handleUpdateStatus(selectedOrder.id, e.target.value)
                      }
                      disabled={updatingStatus}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(e) =>
                        handleUpdatePaymentStatus(
                          selectedOrder.id,
                          e.target.value,
                        )
                      }
                    >
                      {PAYMENT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tracking ID</label>
                    <div className="tracking-input-group">
                      <input
                        ref={trackingInputRef}
                        type="text"
                        defaultValue={selectedOrder.trackingId || ""}
                        placeholder="e.g. DTDC123456789"
                      />
                      <button
                        className="icon-btn confirm"
                        onClick={handleUpdateTracking}
                        title="Save Tracking"
                      >
                        <Check size={18} weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment / Razorpay Details (read-only) */}
                <div className="modal-card">
                  <h4>
                    <CreditCard size={16} /> Payment Details
                  </h4>
                  <div className="form-group">
                    <label>Razorpay Order ID</label>
                    <input
                      type="text"
                      readOnly
                      disabled
                      value={selectedOrder.razorpayOrderId || "N/A"}
                      className="disabled-field"
                    />
                  </div>
                  <div className="form-group">
                    <label>Razorpay Payment ID</label>
                    <input
                      type="text"
                      readOnly
                      disabled
                      value={selectedOrder.razorpayPaymentId || "N/A"}
                      className="disabled-field"
                    />
                  </div>
                  <div className="form-group">
                    <label>Razorpay Signature</label>
                    <input
                      type="text"
                      readOnly
                      disabled
                      value={selectedOrder.razorpaySignature || "N/A"}
                      className="disabled-field font-mono"
                      title={selectedOrder.razorpaySignature || ""}
                    />
                  </div>
                  <div className="info-list" style={{ marginTop: "0.5rem" }}>
                    <div className="info-row">
                      <span>Sub-total</span>
                      <strong>₹{selectedOrder.total}</strong>
                    </div>
                    {selectedOrder.couponCode && (
                      <div className="info-row">
                        <span>Coupon Code</span>
                        <strong style={{ color: '#15803d', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Tag size={14} weight="bold" />{selectedOrder.couponCode}
                        </strong>
                      </div>
                    )}
                    <div className="info-row">
                      <span>Discount</span>
                      <strong style={{ color: selectedOrder.discount > 0 ? '#15803d' : undefined }}>- ₹{selectedOrder.discount || 0}</strong>
                    </div>
                    <div className="info-row highlight-row">
                      <span>Final Total</span>
                      <strong>₹{selectedOrder.finalTotal}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="modal-section">
                <h4>
                  <Package size={18} /> Order Items
                </h4>
                <table className="premium-admin-table">
                  <thead>
                    <tr className="table-head-gradient">
                      <th>
                        <div className="th-inner">
                          <ShoppingBag size={13} weight="bold" />
                          Product
                        </div>
                      </th>
                      <th>
                        <div className="th-inner">Unit Price</div>
                      </th>
                      <th>
                        <div className="th-inner">Qty</div>
                      </th>
                      <th className="text-right">
                        <div
                          className="th-inner"
                          style={{ justifyContent: "flex-end" }}
                        >
                          Subtotal
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="product-cell-premium">
                            <div className="img-box">
                              <img
                                src={
                                  (item.product?.images || [])[0] ||
                                  item.product?.image
                                }
                                alt=""
                              />
                            </div>
                            <span className="name">{item.product?.name}</span>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>
                          <span className="qty-badge">{item.quantity}</span>
                        </td>
                        <td className="text-right price-text">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-total-row">
                  <span>Grand Total</span>
                  <strong>₹{selectedOrder.finalTotal}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-danger"
                onClick={() => handleDeleteOrder(selectedOrder.id)}
              >
                <Trash size={16} /> Delete Order
              </button>
              <button
                className="btn-submit"
                onClick={() => setShowViewModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </AdminModal>
      )}

      {/* ═══ Create Order Modal ═══ */}
      {showCreateModal && (
        <AdminModal onClose={() => setShowCreateModal(false)}>
          <div
            className="premium-modal wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Create Manual Order</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateOrder} className="premium-form">
              <div className="form-grid">
                <div className="form-column">
                  <h4 className="form-section-title">Customer Information</h4>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>Email</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            customerEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group half">
                      <label>Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            customerPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      required
                      rows="2"
                      placeholder="Street / Area"
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerAddress: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>City</label>
                      <input
                        type="text"
                        required
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            customerCity: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group half">
                      <label>State</label>
                      <select
                        required
                        value={newOrder.customerState}
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            customerState: e.target.value,
                          })
                        }
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      pattern="[0-9]{6}"
                      placeholder="6-digit pincode"
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerPincode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-column">
                  <h4 className="form-section-title">Order Items</h4>

                  {orderItems.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Product {i + 1}</label>
                        <select
                          required
                          value={item.productId}
                          onChange={(e) =>
                            updateOrderItem(i, "productId", e.target.value)
                          }
                        >
                          <option value="">-- Select --</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} — ₹{p.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="form-group"
                        style={{ width: "90px", flexShrink: 0 }}
                      >
                        <label>Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          required
                          onChange={(e) =>
                            updateOrderItem(i, "quantity", e.target.value)
                          }
                        />
                      </div>
                      {orderItems.length > 1 && (
                        <button
                          type="button"
                          className="icon-btn delete"
                          style={{ marginTop: "24px", flexShrink: 0 }}
                          title="Remove"
                          onClick={() => removeOrderItem(i)}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="add-row-btn"
                    onClick={addOrderItem}
                  >
                    <Plus size={15} weight="bold" /> Add Another Product
                  </button>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label>Payment Method</label>
                    <select
                      value={newOrder.paymentMethod}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          paymentMethod: e.target.value,
                        })
                      }
                    >
                      <option value="cod">Cash on Delivery (COD)</option>
                      <option value="razorpay">Prepaid (Razorpay)</option>
                    </select>
                  </div>

                  <div className="order-preview-box">
                    <span>Estimated Total</span>
                    <strong>₹{orderTotal}</strong>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default OrderManager;
