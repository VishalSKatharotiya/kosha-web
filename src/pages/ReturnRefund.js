import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle, XCircle, Clock, Package } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { POLICIES } from '../constants/config';
import './PolicyPages.css';

const ReturnRefund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Return & Refund Policy - Kosha Herbal | {POLICIES.RETURN_POLICY_DAYS}-Day Money-Back Guarantee</title>
        <meta name="description" content={`Learn about our ${POLICIES.RETURN_POLICY_DAYS}-day money-back guarantee, easy return process, and refund policy. Your satisfaction is our priority.`} />
        <meta name="keywords" content={`return policy, refund policy, ${POLICIES.RETURN_POLICY_DAYS} day guarantee, money back guarantee, kosha herbal returns`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://koshaherbal.com/return-refund" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Return & Refund Policy - ${POLICIES.RETURN_POLICY_DAYS}-Day Guarantee`} />
        <meta property="og:description" content={`Easy returns & ${POLICIES.RETURN_POLICY_DAYS}-day money-back guarantee. Your satisfaction is our priority.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koshaherbal.com/return-refund" />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://koshaherbal.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Return & Refund Policy",
                "item": "https://koshaherbal.com/return-refund"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="policy-page">
        {/* Hero Section */}
        <section className="policy-hero">
          <div className="container">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} weight="bold" />
              Back to Home
            </Link>
            <h1>Return & Refund Policy</h1>
            <p>Your satisfaction is our priority. {POLICIES.RETURN_POLICY_DAYS}-day money-back guarantee!</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="policy-content">
          <div className="container">
            <div className="policy-highlight">
              <CheckCircle size={48} weight="fill" />
              <h2>{POLICIES.RETURN_POLICY_DAYS}-Day Money-Back Guarantee</h2>
              <p>If you're not completely satisfied with your purchase, we'll refund your money. No questions asked!</p>
            </div>

            <div className="policy-grid">
              {/* Return Process */}
              <div className="policy-card">
                <div className="policy-card-icon">
                  <Package size={32} weight="bold" />
                </div>
                <h3>Easy Return Process</h3>
                <ol>
                  <li>Contact us within {POLICIES.RETURN_POLICY_DAYS} days of delivery</li>
                  <li>Pack the product in original packaging</li>
                  <li>We'll arrange free pickup</li>
                  <li>Refund initiated after quality check</li>
                </ol>
              </div>

              {/* Eligible Returns */}
              <div className="policy-card success">
                <div className="policy-card-icon">
                  <CheckCircle size={32} weight="bold" />
                </div>
                <h3>Eligible for Return</h3>
                <ul>
                  <li>Unopened/unused products</li>
                  <li>Damaged during delivery</li>
                  <li>Wrong product received</li>
                  <li>Manufacturing defects</li>
                  <li>Within {POLICIES.RETURN_POLICY_DAYS} days of delivery</li>
                </ul>
              </div>

              {/* Non-Eligible Returns */}
              <div className="policy-card danger">
                <div className="policy-card-icon">
                  <XCircle size={32} weight="bold" />
                </div>
                <h3>Not Eligible for Return</h3>
                <ul>
                  <li>Opened or used products</li>
                  <li>Products without original packaging</li>
                  <li>After {POLICIES.RETURN_POLICY_DAYS} days of delivery</li>
                  <li>Products on clearance sale</li>
                  <li>Free gift items</li>
                </ul>
              </div>

              {/* Refund Timeline */}
              <div className="policy-card info">
                <div className="policy-card-icon">
                  <Clock size={32} weight="bold" />
                </div>
                <h3>Refund Timeline</h3>
                <ul>
                  <li><strong>Pickup:</strong> Within 2-3 business days</li>
                  <li><strong>Quality Check:</strong> 2-3 business days</li>
                  <li><strong>Refund Initiated:</strong> Same day after approval</li>
                  <li><strong>Bank Credit:</strong> 5-7 business days</li>
                  <li><strong>Total:</strong> 10-15 business days</li>
                </ul>
              </div>
            </div>

            {/* Detailed Policy */}
            <div className="policy-section">
              <h2>Return & Refund Policy Details</h2>

              <div className="policy-subsection">
                <h3>1. Return Eligibility</h3>
                <p>
                  We accept returns within {POLICIES.RETURN_POLICY_DAYS} days of the delivery date. The product must be unused, 
                  unopened, and in its original packaging with all tags and seals intact. If you've 
                  received a damaged, defective, or wrong product, we'll replace it free of charge.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>2. How to Initiate a Return</h3>
                <p>To initiate a return, please follow these steps:</p>
                <ol>
                  <li>
                    <strong>Contact Us:</strong> Reach out to our customer support via WhatsApp 
                    (+91 9898245608) or email (info@koshaherbal.com) within {POLICIES.RETURN_POLICY_DAYS} days of delivery.
                  </li>
                  <li>
                    <strong>Provide Details:</strong> Share your order number, reason for return, 
                    and photos if the product is damaged or defective.
                  </li>
                  <li>
                    <strong>Return Approval:</strong> Our team will review your request and approve 
                    the return within 24 hours.
                  </li>
                  <li>
                    <strong>Schedule Pickup:</strong> Once approved, we'll arrange a free pickup 
                    from your address within 2-3 business days.
                  </li>
                </ol>
              </div>

              <div className="policy-subsection">
                <h3>3. Product Condition Requirements</h3>
                <p>For a successful return, products must meet these conditions:</p>
                <ul>
                  <li><strong>Unused:</strong> The product should not have been opened or used</li>
                  <li><strong>Original Packaging:</strong> Complete with box, labels, and seals</li>
                  <li><strong>No Damage:</strong> Product and packaging should be undamaged</li>
                  <li><strong>Original Invoice:</strong> Include the invoice or order confirmation</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>4. Refund Process</h3>
                <p>Once we receive and inspect your returned product:</p>
                <ol>
                  <li><strong>Quality Check:</strong> We'll verify the product condition (2-3 days)</li>
                  <li><strong>Approval:</strong> If approved, refund is initiated immediately</li>
                  <li><strong>Refund Method:</strong> Original payment method (same account)</li>
                  <li><strong>Bank Processing:</strong> 5-7 business days for bank credit</li>
                </ol>
                <p>
                  You'll receive email/SMS notifications at each step of the refund process.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>5. Exchanges</h3>
                <p>
                  We currently don't offer direct product exchanges. If you wish to exchange a 
                  product, please return it for a refund and place a new order for the desired 
                  product. This ensures faster processing and better service.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>6. Damaged or Defective Products</h3>
                <p>If you receive a damaged or defective product:</p>
                <ul>
                  <li>Contact us immediately with photos of the damage</li>
                  <li>We'll arrange immediate replacement at no extra cost</li>
                  <li>Free pickup and delivery for damaged items</li>
                  <li>Priority processing for defective products</li>
                  <li>Replacement shipped within 24-48 hours of confirmation</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>7. Cancellation Policy</h3>
                <p>You can cancel your order before it's shipped:</p>
                <ul>
                  <li><strong>Before Dispatch:</strong> Full refund within 24-48 hours</li>
                  <li><strong>After Dispatch:</strong> Follow regular return process</li>
                  <li><strong>Cancellation Method:</strong> WhatsApp, email, or phone</li>
                  <li><strong>Refund:</strong> Original payment method</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>8. Shipping Costs</h3>
                <ul>
                  <li><strong>Return Pickup:</strong> Free for all returns</li>
                  <li><strong>Damaged Products:</strong> Free replacement shipping</li>
                  <li><strong>Wrong Item:</strong> Free return and replacement</li>
                  <li><strong>Change of Mind:</strong> Free pickup within {POLICIES.RETURN_POLICY_DAYS} days</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>9. Free Gift Returns</h3>
                <p>
                  Free gifts received with your order are non-returnable and non-refundable. 
                  However, you can return the main product without returning the free gift. 
                  The refund amount will be for the main product only.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="policy-cta">
              <h2>Need Help with a Return?</h2>
              <p>Our customer support team is here to assist you with any questions or concerns.</p>
              <div className="cta-buttons">
                <a 
                  href="https://wa.me/919898245608?text=Hello!%20I%20need%20help%20with%20a%20return." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <Package size={20} weight="fill" />
                  Contact Support
                </a>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReturnRefund;


