import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { WhatsappLogo, UserCircle, ShoppingBag } from "@phosphor-icons/react";
import { ROUTES, HASH_ROUTES, EXTERNAL_LINKS } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Header.css";
import api from "../../services/api";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordUpdating, setPasswordUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleProfileClick = () => {
    if (!showProfilePopup) {
      fetchProfile();
    }
    setShowProfilePopup(!showProfilePopup);
    setShowPasswordForm(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setPasswordUpdating(true);
    try {
      await api.put("/auth/update-password", {
        newPassword: passwordData.newPassword,
      });
      alert("Password updated successfully. Please login again.");
      logout();
    } catch (error) {
      alert("Error updating password");
    } finally {
      setPasswordUpdating(false);
    }
  };

  const handleHashNavigation = (hash) => {
    // If we're on home page, just scroll to section
    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Navigate to home page with hash
      navigate(`/${hash}`);
      // After navigation, scroll to section
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Top Offer Banner */}
      <div className="offer-banner">
        <div className="container">
          <p>{process.env.REACT_APP_HEADER_PROMO}</p>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="logo">
              <h1>Kosha Herbal</h1>
              <p className="tagline">Scientifically Backed Natural Skincare</p>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <Link to={ROUTES.HOME} className="nav-link">
                HOME
              </Link>
              <button
                onClick={() =>
                  handleHashNavigation(HASH_ROUTES.PRODUCTS_SECTION)
                }
                className="nav-link nav-link-button"
              >
                PRODUCTS
              </button>
              <Link to={ROUTES.REVIEWS} className="nav-link">
                REVIEWS
              </Link>
              <Link to={ROUTES.CONTACT} className="nav-link">
                CONTACT US
              </Link>
              {user ? (
                <>
                  <Link to="/my-orders" className="nav-link">
                    MY ORDERS
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="nav-link">
                      DASHBOARD
                    </Link>
                  )}
                  <button onClick={logout} className="nav-link nav-link-button">
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-link">
                  LOGIN
                </Link>
              )}
            </nav>

            {/* Action Icons */}
            <div className="header-actions">
              <a
                href={EXTERNAL_LINKS.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-icon"
                title="WhatsApp"
              >
                <WhatsappLogo size={24} weight="fill" />
              </a>

              {/* Profile/User Icon */}
              {user && (
                <div className="profile-container">
                  <button
                    className="profile-icon-btn"
                    onClick={handleProfileClick}
                    title="User Profile"
                  >
                    <UserCircle size={28} weight="fill" />
                  </button>

                  {showProfilePopup && (
                    <div className="profile-popup">
                      <div className="popup-header">
                        <h3>My Account</h3>
                        <button onClick={() => setShowProfilePopup(false)}>
                          ✕
                        </button>
                      </div>

                      <div className="popup-content">
                        {!showPasswordForm ? (
                          <div className="user-info">
                            <p>
                              <strong>Name:</strong>{" "}
                              {profileData?.name || user.name}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {profileData?.email || user.email}
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              {profileData?.phone || "Not set"}
                            </p>
                            {profileData?.addresses &&
                              profileData.addresses.length > 0 && (
                                <div className="user-address">
                                  <p>
                                    <strong>Address:</strong>
                                  </p>
                                  <p>
                                    {profileData.addresses[0].address},{" "}
                                    {profileData.addresses[0].city},{" "}
                                    {profileData.addresses[0].state} -{" "}
                                    {profileData.addresses[0].pincode}
                                  </p>
                                </div>
                              )}
                            <div className="popup-actions">
                              <button
                                className="btn-text"
                                onClick={() => setShowPasswordForm(true)}
                              >
                                Change Password
                              </button>
                              <button className="btn-logout" onClick={logout}>
                                Logout
                              </button>
                            </div>
                          </div>
                        ) : (
                          <form
                            onSubmit={handlePasswordUpdate}
                            className="password-form"
                          >
                            <div className="form-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    newPassword: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    confirmPassword: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="form-actions">
                              <button
                                type="submit"
                                className="btn-primary"
                                disabled={passwordUpdating}
                              >
                                {passwordUpdating
                                  ? "UPDATING..."
                                  : "UPDATE PASSWORD"}
                              </button>
                              <button
                                type="button"
                                className="btn-text"
                                onClick={() => setShowPasswordForm(false)}
                              >
                                Back
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cart Icon */}
              <Link to="/cart" className="cart-icon" title="Shopping Cart">
                <ShoppingBag size={24} weight="fill" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="mobile-nav">
              <Link
                to={ROUTES.HOME}
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                HOME
              </Link>
              <button
                onClick={() => {
                  handleHashNavigation(HASH_ROUTES.PRODUCTS_SECTION);
                  toggleMobileMenu();
                }}
                className="mobile-nav-link mobile-nav-link-button"
              >
                PRODUCTS
              </button>
              <Link
                to={ROUTES.REVIEWS}
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                REVIEWS
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                CONTACT US
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
