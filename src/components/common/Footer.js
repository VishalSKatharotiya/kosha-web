import React from 'react';
import { Link } from 'react-router-dom';
import { WhatsappLogo, InstagramLogo } from '@phosphor-icons/react';
import { ROUTES, HASH_ROUTES, EXTERNAL_LINKS } from '../../constants/routes';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>Kosha Herbal</h3>
            <p className="footer-description">
              Founded with a singular mission of creating scientifically researched, 
              ethically sourced natural skincare products. All products are manufactured 
              in GMP-certified facilities under strict quality control.
            </p>
            
            {/* Certifications */}
            <div className="certifications">
              <div className="cert-badge">🏆 ISO 9001:2015</div>
              <div className="cert-badge">🏆 GMP Certified</div>
              <div className="cert-badge">🏆 FSSAI Approved</div>
            </div>
          </div>

          {/* Essentials */}
          <div className="footer-section">
            <h4>ESSENTIALS</h4>
            <ul>
              <li><Link to={ROUTES.HOME} onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
              <li><Link to={`/${HASH_ROUTES.PRODUCTS_SECTION}`} onClick={() => window.scrollTo(0, 0)}>Products</Link></li>
              <li><Link to={ROUTES.REVIEWS} onClick={() => window.scrollTo(0, 0)}>Customer Reviews</Link></li>
              <li><Link to={ROUTES.CONTACT} onClick={() => window.scrollTo(0, 0)}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4>CUSTOMER SERVICE</h4>
            <ul>
              <li><Link to={ROUTES.CONTACT} onClick={() => window.scrollTo(0, 0)}>Shipping Policy</Link></li>
              <li><Link to={ROUTES.RETURN_REFUND} onClick={() => window.scrollTo(0, 0)}>Return & Refund</Link></li>
              <li><Link to={ROUTES.PRIVACY_POLICY} onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
              <li><Link to={ROUTES.CONTACT} onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>CONTACT US</h4>
            <div className="footer-contact-info">
              <p>
                <strong>Corporate Office:</strong>
                Kosha Herbal, N/R Gokul Party Plot,<br />
                Raspan Circle, Nikol,<br />
                Ahmedabad - 382350
              </p>
              <p>
                <strong>Phone:</strong>
                <a href={EXTERNAL_LINKS.PHONE}>+91 9898245608</a>
              </p>
              <p>
                <strong>Email:</strong>
                <a href={EXTERNAL_LINKS.EMAIL}>info@koshaherbal.com</a>
              </p>
            </div>
            
            <div className="social-icons-only">
              <a 
                href={EXTERNAL_LINKS.INSTAGRAM} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon-link"
              >
                <InstagramLogo size={32} weight="fill" />
              </a>
              <a 
                href={EXTERNAL_LINKS.WHATSAPP} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon-link"
              >
                <WhatsappLogo size={32} weight="fill" />
              </a>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} Kosha Herbal™. All Rights Reserved.</p>
            <p className="trademark">Kosha Herbal™ is a registered trademark.</p>
          </div>
          
          <div className="payment-partners">
            <span>We Accept:</span>
            <div className="payment-icons">
              <span>💳 Visa</span>
              <span>💳 Mastercard</span>
              <span>💳 RuPay</span>
              <span>💰 UPI</span>
              <span>📱 Paytm</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

