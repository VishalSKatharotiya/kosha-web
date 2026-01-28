import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { WhatsappLogo } from '@phosphor-icons/react';
import { ROUTES, HASH_ROUTES, EXTERNAL_LINKS } from '../../constants/routes';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleHashNavigation = (hash) => {
    // If we're on home page, just scroll to section
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with hash
      navigate(`/${hash}`);
      // After navigation, scroll to section
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Top Offer Banner */}
      <div className="offer-banner">
        <div className="container">
          <p>FREE DELIVERY on orders above ₹499 | 10% OFF on First Order | Use Code: FIRST10</p>
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
              <Link to={ROUTES.HOME} className="nav-link">HOME</Link>
              <button 
                onClick={() => handleHashNavigation(HASH_ROUTES.PRODUCTS_SECTION)} 
                className="nav-link nav-link-button"
              >
                PRODUCTS
              </button>
              <Link to={ROUTES.REVIEWS} className="nav-link">REVIEWS</Link>
              <Link to={ROUTES.CONTACT} className="nav-link">CONTACT US</Link>
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

              {/* Mobile Menu Toggle */}
              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="mobile-nav">
              <Link to={ROUTES.HOME} className="mobile-nav-link" onClick={toggleMobileMenu}>HOME</Link>
              <button 
                onClick={() => {
                  handleHashNavigation(HASH_ROUTES.PRODUCTS_SECTION);
                  toggleMobileMenu();
                }} 
                className="mobile-nav-link mobile-nav-link-button"
              >
                PRODUCTS
              </button>
              <Link to={ROUTES.REVIEWS} className="mobile-nav-link" onClick={toggleMobileMenu}>REVIEWS</Link>
              <Link to={ROUTES.CONTACT} className="mobile-nav-link" onClick={toggleMobileMenu}>CONTACT US</Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;


