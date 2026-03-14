import React, { useState, useEffect } from "react";
import api from "../../services/api";
import AdminModal from "./AdminModal";
import {
  Plus,
  PencilSimple,
  Trash,
  X,
  Tag,
  MagnifyingGlass,
  CaretUp,
  CaretDown,
  Users,
  UserPlus,
  UserMinus,
  CheckCircle,
  Warning,
} from "@phosphor-icons/react";

const EMPTY_FORM = {
  code: "",
  discount_type: "FLAT",
  discount_value: "",
  min_order_amount: "",
  max_discount: "",
  usage_limit: "",
  per_user_limit: "1",
  first_order_only: false,
  valid_from: "",
  valid_to: "",
  is_active: false,
};

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("desc");

  // Create/Edit modal
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Whitelist modal
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [whitelistCoupon, setWhitelistCoupon] = useState(null);
  const [whitelist, setWhitelist] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [whitelistLoading, setWhitelistLoading] = useState(false);

  // ── Fetch coupons ──────────────────────────────────────────────────────────
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await api.get("/coupon");
      setCoupons(res.data);
    } catch (e) {
      console.error("Error fetching coupons", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ── Sort & filter ──────────────────────────────────────────────────────────
  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="sort-arrow">⇅</span>;
    return sortDir === "asc" ? (
      <CaretUp size={12} weight="bold" className="sort-arrow" />
    ) : (
      <CaretDown size={12} weight="bold" className="sort-arrow" />
    );
  };

  const displayed = coupons
    .filter((c) => c.code.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  // ── Create / Edit ──────────────────────────────────────────────────────────
  const openModal = (coupon = null) => {
    setFormError("");
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value ?? "",
        min_order_amount: coupon.min_order_amount ?? "",
        max_discount: coupon.max_discount ?? "",
        usage_limit: coupon.usage_limit ?? "",
        per_user_limit: coupon.per_user_limit ?? "",
        first_order_only: coupon.first_order_only ?? false,
        valid_from: coupon.valid_from ? coupon.valid_from.slice(0, 10) : "",
        valid_to: coupon.valid_to ? coupon.valid_to.slice(0, 10) : "",
        is_active: coupon.is_active ?? false,
      });
    } else {
      setEditingCoupon(null);
      setFormData(EMPTY_FORM);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    const payload = {
      ...formData,
      code: formData.code.toUpperCase().trim(),
      discount_value: Number(formData.discount_value),
      min_order_amount: Number(formData.min_order_amount) || 0,
      max_discount:
        formData.max_discount !== "" ? Number(formData.max_discount) : null,
      usage_limit:
        formData.usage_limit !== "" ? Number(formData.usage_limit) : null,
      per_user_limit:
        formData.per_user_limit !== "" ? Number(formData.per_user_limit) : null,
      valid_from: formData.valid_from || null,
      valid_to: formData.valid_to || null,
    };
    try {
      if (editingCoupon) {
        await api.put(`/coupon/${editingCoupon.id}`, payload);
      } else {
        await api.post("/coupon", payload);
      }
      setShowModal(false);
      fetchCoupons();
    } catch (err) {
      setFormError(err.response?.data?.message || "Error saving coupon");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon? This cannot be undone.")) return;
    try {
      await api.delete(`/coupon/${id}`);
      fetchCoupons();
    } catch {
      alert("Error deleting coupon");
    }
  };

  // ── Whitelist ──────────────────────────────────────────────────────────────
  const openWhitelist = async (coupon) => {
    setWhitelistCoupon(coupon);
    setWhitelistLoading(true);
    setShowWhitelistModal(true);
    setUserSearch("");
    setUserResults([]);
    try {
      const res = await api.get(`/coupon/${coupon.id}/whitelist`);
      setWhitelist(res.data);
    } catch {
      setWhitelist([]);
    } finally {
      setWhitelistLoading(false);
    }
  };

  const searchUsers = async (q) => {
    setUserSearch(q);
    if (!q.trim()) {
      setUserResults([]);
      return;
    }
    try {
      const res = await api.get(
        `/coupon/users/search?q=${encodeURIComponent(q)}`,
      );
      setUserResults(res.data);
    } catch {
      setUserResults([]);
    }
  };

  const addToWhitelist = async (user) => {
    try {
      const res = await api.post(`/coupon/${whitelistCoupon.id}/whitelist`, {
        userId: user.id,
      });
      setWhitelist((prev) => [...prev, res.data]);
      setUserSearch("");
      setUserResults([]);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  const removeFromWhitelist = async (userId) => {
    if (!window.confirm("Remove this user from whitelist?")) return;
    try {
      await api.delete(`/coupon/${whitelistCoupon.id}/whitelist/${userId}`);
      setWhitelist((prev) => prev.filter((e) => e.user_id !== userId));
    } catch {
      alert("Error removing user");
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";
  const isExpired = (d) => d && new Date(d) < new Date();

  return (
    <div className="admin-section fade-in">
      <div className="section-header">
        <div className="header-left">
          <h2>Manage Coupons</h2>
          <div className="search-bar-premium">
            <MagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search by code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button className="add-btn-premium" onClick={() => openModal()}>
          <Plus size={20} weight="bold" /> Add Coupon
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="spinner" />
          <p>Loading coupons...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="premium-admin-table">
            <thead>
              <tr className="table-head-gradient">
                <th
                  className={`th-sortable${sortField === "code" ? " sorted" : ""}`}
                  onClick={() => handleSort("code")}
                >
                  <div className="th-inner">
                    <Tag size={14} weight="bold" />
                    Code
                    <SortIcon field="code" />
                  </div>
                </th>
                <th>
                  <div className="th-inner">Type / Value</div>
                </th>
                <th>
                  <div className="th-inner">Min Order</div>
                </th>
                <th
                  className={`th-sortable${sortField === "used_count" ? " sorted" : ""}`}
                  onClick={() => handleSort("used_count")}
                >
                  <div className="th-inner">
                    Usage
                    <SortIcon field="used_count" />
                  </div>
                </th>
                <th>
                  <div className="th-inner">Valid Until</div>
                </th>
                <th>
                  <div className="th-inner">Status</div>
                </th>
                <th className="text-right">
                  <div
                    className="th-inner"
                    style={{ justifyContent: "flex-end" }}
                  >
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#888",
                    }}
                  >
                    No coupons found
                  </td>
                </tr>
              )}
              {displayed.map((c) => (
                <tr key={c.id} className="table-row-hover">
                  <td>
                    <code
                      className="slug-tag"
                      style={{ fontSize: "0.9rem", fontWeight: 700 }}
                    >
                      {c.code}
                    </code>
                    {c.first_order_only && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: "0.7rem",
                          background: "#ede9fe",
                          color: "#7c3aed",
                          borderRadius: 4,
                          padding: "1px 5px",
                        }}
                      >
                        1st order
                      </span>
                    )}
                    {c.whitelist?.length > 0 && (
                      <span
                        style={{
                          marginLeft: 4,
                          fontSize: "0.7rem",
                          background: "#fef3c7",
                          color: "#92400e",
                          borderRadius: 4,
                          padding: "1px 5px",
                        }}
                      >
                        VIP
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>
                      {c.discount_type === "FLAT"
                        ? `₹${Number(c.discount_value).toFixed(0)}`
                        : `${c.discount_value}%`}
                    </span>
                    {c.discount_type === "PERCENT" && c.max_discount && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#666",
                          display: "block",
                        }}
                      >
                        max ₹{c.max_discount}
                      </span>
                    )}
                  </td>
                  <td className="text-muted">
                    ₹{Number(c.min_order_amount).toFixed(0)}
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{c.used_count}</span>
                    {c.usage_limit && (
                      <span style={{ color: "#888" }}>/{c.usage_limit}</span>
                    )}
                    {!c.usage_limit && (
                      <span style={{ color: "#888" }}> / ∞</span>
                    )}
                  </td>
                  <td className={isExpired(c.valid_to) ? "text-muted" : ""}>
                    {isExpired(c.valid_to) ? (
                      <span style={{ color: "#ef4444" }}>Expired</span>
                    ) : (
                      fmtDate(c.valid_to)
                    )}
                  </td>
                  <td>
                    <span
                      className={`status-chip ${c.is_active ? "payment-completed" : "payment-failed"}`}
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons">
                      <button
                        className="icon-btn view"
                        title="Manage Whitelist"
                        onClick={() => openWhitelist(c)}
                      >
                        <Users size={18} />
                      </button>
                      <button
                        className="icon-btn edit"
                        title="Edit"
                        onClick={() => openModal(c)}
                      >
                        <PencilSimple size={18} />
                      </button>
                      <button
                        className="icon-btn delete"
                        title="Delete"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══ Create / Edit Coupon Modal ═══ */}
      {showModal && (
        <AdminModal onClose={() => setShowModal(false)}>
          <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCoupon ? "Edit Coupon" : "Create Coupon"}</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SAVE50"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    style={{ textTransform: "uppercase", letterSpacing: 1 }}
                  />
                </div>
                <div className="form-group">
                  <label>Discount Type</label>
                  <select
                    value={formData.discount_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount_type: e.target.value,
                      })
                    }
                  >
                    <option value="FLAT">Flat ₹ Amount</option>
                    <option value="PERCENT">Percentage %</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Discount Value *{" "}
                    {formData.discount_type === "FLAT" ? "(₹)" : "(%)"}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    placeholder={
                      formData.discount_type === "FLAT" ? "50" : "10"
                    }
                    value={formData.discount_value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount_value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Min Order Amount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="499"
                    value={formData.min_order_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_order_amount: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {formData.discount_type === "PERCENT" && (
                <div className="form-group">
                  <label>Max Discount Cap (₹) — leave blank for no cap</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="200"
                    value={formData.max_discount}
                    onChange={(e) =>
                      setFormData({ ...formData, max_discount: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Total Usage Limit — blank = unlimited</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="100"
                    value={formData.usage_limit}
                    onChange={(e) =>
                      setFormData({ ...formData, usage_limit: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Per User Limit — blank = unlimited</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={formData.per_user_limit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        per_user_limit: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valid From</label>
                  <input
                    type="date"
                    value={formData.valid_from}
                    onChange={(e) =>
                      setFormData({ ...formData, valid_from: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Valid To</label>
                  <input
                    type="date"
                    value={formData.valid_to}
                    onChange={(e) =>
                      setFormData({ ...formData, valid_to: e.target.value })
                    }
                  />
                </div>
              </div>

              <div
                className="form-row"
                style={{ alignItems: "center", gap: "2rem" }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.first_order_only}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_order_only: e.target.checked,
                      })
                    }
                  />
                  First Order Only
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                  />
                  Active (users can apply)
                </label>
              </div>

              {formError && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    color: "#b91c1c",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Warning size={18} /> {formError}
                </div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingCoupon
                      ? "Update Coupon"
                      : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </AdminModal>
      )}

      {/* ═══ Whitelist Modal ═══ */}
      {showWhitelistModal && whitelistCoupon && (
        <AdminModal onClose={() => setShowWhitelistModal(false)}>
          <div
            className="premium-modal"
            style={{ maxWidth: "70%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>
                  <Users size={18} style={{ marginRight: 6 }} />
                  Whitelist — <code>{whitelistCoupon.code}</code>
                </h3>
                <span className="modal-subtitle">
                  Only these users can apply this coupon. Empty = public coupon.
                </span>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setShowWhitelistModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ padding: "1rem 1.5rem" }}>
              {/* User search */}
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>Add User by Email</label>
                <div style={{ display: "flex", gap: 8, position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search email…"
                    value={userSearch}
                    onChange={(e) => searchUsers(e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>
                {userResults.length > 0 && (
                  <div
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      marginTop: 4,
                      background: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {userResults.map((u) => (
                      <div
                        key={u.id}
                        style={{
                          padding: "0.6rem 1rem",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid #f3f4f6",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f9fafb")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff")
                        }
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                            {u.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#666" }}>
                            {u.email}
                          </div>
                        </div>
                        <button
                          className="icon-btn confirm"
                          title="Add to whitelist"
                          onClick={() => addToWhitelist(u)}
                        >
                          <UserPlus size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Whitelist users */}
              {whitelistLoading ? (
                <div className="admin-loading">
                  <div className="spinner" />
                </div>
              ) : whitelist.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1.5rem",
                    color: "#888",
                  }}
                >
                  <Users size={36} style={{ marginBottom: 8, opacity: 0.4 }} />
                  <p>
                    No users whitelisted — this is a{" "}
                    <strong>public coupon</strong>
                  </p>
                </div>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {whitelist.length} user(s) whitelisted
                  </p>
                  {whitelist.map((e) => (
                    <div
                      key={e.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {e.user?.name || e.user_id}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>
                          {e.user?.email || ""}
                        </div>
                      </div>
                      <button
                        className="icon-btn delete"
                        title="Remove"
                        onClick={() => removeFromWhitelist(e.user_id)}
                      >
                        <UserMinus size={16} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn-submit"
                onClick={() => setShowWhitelistModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default CouponManager;
