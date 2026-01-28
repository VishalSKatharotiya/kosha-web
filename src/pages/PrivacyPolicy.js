import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Shield, Lock, Eye, UserCircle, Database } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Kosha Herbal | Data Protection & Security</title>
        <meta name="description" content="Learn how Kosha Herbal protects your privacy and handles your personal information. We value your trust and data security." />
        <meta name="keywords" content="privacy policy, data protection, kosha herbal privacy, personal information security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://koshaherbal.com/privacy-policy" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy - Kosha Herbal" />
        <meta property="og:description" content="Learn how we protect your privacy and handle your personal information securely." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koshaherbal.com/privacy-policy" />
        
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
                "name": "Privacy Policy",
                "item": "https://koshaherbal.com/privacy-policy"
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
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. Learn how we protect your data.</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="policy-content">
          <div className="container">
            <div className="policy-highlight">
              <Shield size={48} weight="fill" />
              <h2>Your Privacy is Our Priority</h2>
              <p>We are committed to protecting your personal information and ensuring transparent data practices.</p>
              <p className="last-updated"><strong>Last Updated:</strong> January 27, 2026</p>
            </div>

            <div className="policy-grid">
              {/* Data We Collect */}
              <div className="policy-card">
                <div className="policy-card-icon">
                  <Database size={32} weight="bold" />
                </div>
                <h3>Data We Collect</h3>
                <ul>
                  <li>Name and contact details</li>
                  <li>Shipping address</li>
                  <li>Payment information</li>
                  <li>Order history</li>
                  <li>Device and browser data</li>
                </ul>
              </div>

              {/* How We Use Data */}
              <div className="policy-card">
                <div className="policy-card-icon">
                  <Eye size={32} weight="bold" />
                </div>
                <h3>How We Use Your Data</h3>
                <ul>
                  <li>Process your orders</li>
                  <li>Deliver products to you</li>
                  <li>Provide customer support</li>
                  <li>Send order updates</li>
                  <li>Improve our services</li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="policy-card">
                <div className="policy-card-icon">
                  <Lock size={32} weight="bold" />
                </div>
                <h3>Data Security</h3>
                <ul>
                  <li>SSL encryption</li>
                  <li>Secure payment gateways</li>
                  <li>Regular security audits</li>
                  <li>Limited employee access</li>
                  <li>No data selling</li>
                </ul>
              </div>

              {/* Your Rights */}
              <div className="policy-card">
                <div className="policy-card-icon">
                  <UserCircle size={32} weight="bold" />
                </div>
                <h3>Your Rights</h3>
                <ul>
                  <li>Access your data</li>
                  <li>Update information</li>
                  <li>Delete your account</li>
                  <li>Opt-out of marketing</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </div>

            {/* Detailed Policy */}
            <div className="policy-section">
              <h2>Privacy Policy Details</h2>

              <div className="policy-subsection">
                <h3>1. Introduction</h3>
                <p>
                  Welcome to Kosha Herbal ("we," "our," or "us"). We respect your privacy and are 
                  committed to protecting your personal data. This privacy policy explains how we 
                  collect, use, disclose, and safeguard your information when you visit our website 
                  or make a purchase from us.
                </p>
                <p>
                  By using our website and services, you agree to the collection and use of information 
                  in accordance with this policy.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>2. Information We Collect</h3>
                
                <h4>2.1 Personal Information</h4>
                <p>When you place an order or register on our site, we collect:</p>
                <ul>
                  <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                  <li><strong>Shipping Information:</strong> Delivery address, pin code</li>
                  <li><strong>Billing Information:</strong> Payment method (processed securely)</li>
                  <li><strong>Account Information:</strong> Username, password (encrypted)</li>
                </ul>

                <h4>2.2 Automatically Collected Information</h4>
                <ul>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
                  <li><strong>Cookies:</strong> Session data, preferences, shopping cart</li>
                  <li><strong>Location Data:</strong> Approximate location based on IP address</li>
                </ul>

                <h4>2.3 Information from Third Parties</h4>
                <p>
                  We may receive information from payment processors, shipping partners, and 
                  marketing platforms to provide better services.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>3. How We Use Your Information</h3>
                <p>We use the collected information for the following purposes:</p>
                
                <h4>3.1 Order Processing and Delivery</h4>
                <ul>
                  <li>Process and fulfill your orders</li>
                  <li>Communicate order status and delivery updates</li>
                  <li>Handle returns, refunds, and customer support</li>
                </ul>

                <h4>3.2 Account Management</h4>
                <ul>
                  <li>Create and manage your account</li>
                  <li>Provide personalized experiences</li>
                  <li>Save your preferences and order history</li>
                </ul>

                <h4>3.3 Communication</h4>
                <ul>
                  <li>Send order confirmations and shipping notifications</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Send promotional offers (with your consent)</li>
                </ul>

                <h4>3.4 Website Improvement</h4>
                <ul>
                  <li>Analyze website usage and user behavior</li>
                  <li>Improve our products and services</li>
                  <li>Develop new features and offerings</li>
                </ul>

                <h4>3.5 Legal and Security</h4>
                <ul>
                  <li>Prevent fraud and unauthorized access</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and property</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>4. Data Sharing and Disclosure</h3>
                
                <h4>4.1 Service Providers</h4>
                <p>We may share your information with trusted third-party service providers:</p>
                <ul>
                  <li><strong>Payment Processors:</strong> To process your payments securely</li>
                  <li><strong>Shipping Partners:</strong> To deliver your orders</li>
                  <li><strong>Cloud Hosting:</strong> To store data securely</li>
                  <li><strong>Analytics Tools:</strong> To understand website usage</li>
                </ul>
                <p>
                  These providers are contractually obligated to protect your data and use it 
                  only for providing services to us.
                </p>

                <h4>4.2 Legal Requirements</h4>
                <p>We may disclose your information if required by law or to:</p>
                <ul>
                  <li>Comply with legal processes (court orders, subpoenas)</li>
                  <li>Protect our rights and property</li>
                  <li>Prevent fraud or illegal activities</li>
                  <li>Protect the safety of users or the public</li>
                </ul>

                <h4>4.3 Business Transfers</h4>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your information 
                  may be transferred. We'll notify you before your data is transferred.
                </p>

                <h4>4.4 What We Don't Do</h4>
                <ul>
                  <li><strong>We DO NOT sell</strong> your personal information to third parties</li>
                  <li><strong>We DO NOT share</strong> your data for advertising purposes</li>
                  <li><strong>We DO NOT rent</strong> your information to marketers</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>5. Data Security</h3>
                <p>We implement robust security measures to protect your information:</p>
                
                <h4>5.1 Technical Security</h4>
                <ul>
                  <li><strong>SSL/TLS Encryption:</strong> All data transmitted is encrypted</li>
                  <li><strong>Secure Servers:</strong> Data stored on secure, firewall-protected servers</li>
                  <li><strong>PCI DSS Compliance:</strong> Payment card data handled securely</li>
                  <li><strong>Regular Backups:</strong> Data backed up regularly to prevent loss</li>
                </ul>

                <h4>5.2 Administrative Security</h4>
                <ul>
                  <li>Limited employee access to personal data</li>
                  <li>Regular security training for staff</li>
                  <li>Non-disclosure agreements with partners</li>
                  <li>Regular security audits and updates</li>
                </ul>

                <h4>5.3 Your Responsibility</h4>
                <ul>
                  <li>Use strong, unique passwords</li>
                  <li>Keep your account credentials confidential</li>
                  <li>Log out after using shared devices</li>
                  <li>Report suspicious activity immediately</li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>6. Cookies and Tracking Technologies</h3>
                
                <h4>6.1 What Are Cookies?</h4>
                <p>
                  Cookies are small text files stored on your device that help us provide a 
                  better user experience.
                </p>

                <h4>6.2 Types of Cookies We Use</h4>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Performance Cookies:</strong> Track website usage anonymously</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                  <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements (with consent)</li>
                </ul>

                <h4>6.3 Managing Cookies</h4>
                <p>
                  You can control cookies through your browser settings. However, disabling 
                  cookies may limit website functionality.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>7. Your Privacy Rights</h3>
                <p>You have the following rights regarding your personal data:</p>
                
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Withdraw Consent:</strong> Revoke consent for data processing</li>
                </ul>

                <p>
                  To exercise these rights, contact us at info@koshaherbal.com or 
                  +91 9898245608.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>8. Data Retention</h3>
                <p>We retain your personal information for as long as necessary to:</p>
                <ul>
                  <li>Fulfill the purposes outlined in this policy</li>
                  <li>Comply with legal obligations (tax, accounting)</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Provide customer support</li>
                </ul>
                <p>
                  Typically, we retain customer data for 7 years for accounting and legal purposes. 
                  After this period, data is securely deleted.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>9. Children's Privacy</h3>
                <p>
                  Our services are not directed to children under 18 years of age. We do not 
                  knowingly collect personal information from children. If you believe a child 
                  has provided us with personal information, please contact us immediately, and 
                  we'll delete the information.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>10. Third-Party Links</h3>
                <p>
                  Our website may contain links to third-party websites (social media, payment 
                  processors). We are not responsible for their privacy practices. We encourage 
                  you to read their privacy policies.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>11. Changes to This Policy</h3>
                <p>
                  We may update this privacy policy from time to time. We'll notify you of 
                  significant changes via email or a prominent notice on our website. The 
                  "Last Updated" date at the top indicates when the policy was last revised.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>12. Contact for Privacy Concerns</h3>
                <p>
                  If you have questions, concerns, or requests regarding this privacy policy 
                  or your personal data, please email us at <strong>info@koshaherbal.com</strong> or 
                  call us at <strong>+91 9898245608</strong>.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="policy-cta">
              <h2>Questions About Your Privacy?</h2>
              <p>Our team is here to address any privacy concerns you may have.</p>
              <div className="cta-buttons">
                <a 
                  href="mailto:info@koshaherbal.com"
                  className="btn btn-primary"
                >
                  <Shield size={20} weight="fill" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
