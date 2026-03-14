import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  MapPin,
  Hash,
  Copy,
  Calendar,
  CurrencyInr,
  CaretRight,
  Tag,
} from "@phosphor-icons/react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // if (!user) return;

        const url = user?.id ? `/payment/orders/${user.id}` : "/payment/orders";
        const response = await api.get(url);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // You could use a toast here, but simple alert for now as requested or common practice
    // alert(`${type} copied to clipboard!`);
  };

  if (loading)
    return (
      <div className="container orders-loading">
        <div className="loading-spinner"></div>
        <p>Gearing up your order history...</p>
      </div>
    );

  return (
    <div className="container my-orders-page">
      <header className="orders-header-section">
        <h1>My Orders</h1>
        <p className="subtitle">View and track your previous purchases</p>
      </header>

      {orders.length === 0 ? (
        <div className="empty-orders-premium fade-in">
          <Package size={80} weight="thin" />
          <h3>No Orders Found</h3>
          <p>Explore our products and place your first order today!</p>
          <a href="/products" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="orders-containers">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="order-card-premium fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-top-bar">
                <div className="order-id-section">
                  <Hash size={18} color="var(--primary)" weight="bold" />
                  <span className="order-id-label">ID:</span>
                  <span className="order-id-value">{order.id.slice(0, 8)}</span>
                  <button
                    className="copy-icon-btn"
                    onClick={() => copyToClipboard(order.id, "Order ID")}
                    title="Copy Order ID"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div
                  className={`status-pill status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </div>
              </div>

              <div className="card-main-content">
                <div className="order-summary-row">
                  <div className="summary-item">
                    <Calendar size={20} />
                    <div className="summary-text">
                      <span className="label">Date</span>
                      <span className="value">
                        {new Date(order.createdAt).toLocaleDateString(
                          undefined,
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <CurrencyInr size={20} />
                    <div className="summary-text">
                      <span className="label">Total Paid</span>
                      <span className="value primary-color">
                        ₹{order.finalTotal}
                      </span>
                    </div>
                  </div>
                  {order.couponCode && (
                    <div className="summary-item">
                      <Tag size={20} color="#15803d" />
                      <div className="summary-text">
                        <span className="label">Coupon Applied</span>
                        <span className="value" style={{ color: '#15803d', fontWeight: 700 }}>
                          {order.couponCode} · Saved ₹{order.discount}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="order-items-minimal">
                  {order.items.map((item) => (
                    <div key={item.id} className="minimal-item">
                      <img
                        src={
                          (item.product.images || [])[0] || item.product.image
                        }
                        alt={item.product.name}
                      />
                      <div className="item-info">
                        <h5>{item.product.name}</h5>
                        <p>
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="delivery-tracking-section">
                  <div className="delivery-info">
                    <div className="section-subtitle">
                      <MapPin size={18} weight="fill" />
                      <span>Delivery Address</span>
                    </div>
                    <p className="address-text">
                      {order.customerData
                        ? `${order.customerData.name}, ${order.customerData.address}, ${order.customerData.city}, ${order.customerData.state} - ${order.customerData.pincode}`
                        : "Address details unavailable"}
                    </p>
                  </div>

                  <div className="tracking-info">
                    <div className="section-subtitle">
                      <Truck size={18} weight="fill" />
                      <span>Tracking Status</span>
                    </div>
                    <div className="tracking-status-box">
                      {order.trackingId ? (
                        <div className="tracking-active">
                          <span className="id">{order.trackingId}</span>
                          <button
                            className="copy-icon-btn"
                            onClick={() =>
                              copyToClipboard(order.trackingId, "Tracking ID")
                            }
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="pending-text">
                          Processing Shipment
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
