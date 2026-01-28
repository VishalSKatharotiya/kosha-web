import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, 
  Envelope, 
  MapPin, 
  WhatsappLogo,
  Clock,
  InstagramLogo,
  FacebookLogo,
  PaperPlaneTilt
} from '@phosphor-icons/react';
import { POLICIES } from '../constants/config';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/919898245608?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    setFormStatus({
      type: 'success',
      message: 'Opening WhatsApp... Please send the message!'
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setFormStatus({ type: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Kosha Herbal | Get in Touch</title>
        <meta 
          name="description" 
          content="Contact Kosha Herbal for queries about natural skincare products. Call: +91 9898245608 | Email: info@koshaherbal.com | Visit us in Ahmedabad, Gujarat" 
        />
        <meta 
          name="keywords" 
          content="contact kosha herbal, customer support, skincare queries, herbal products help, kosha herbal ahmedabad" 
        />
        <link rel="canonical" href="https://koshaherbal.com/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us - Kosha Herbal" />
        <meta property="og:description" content="Get in touch with Kosha Herbal. We're here to help with all your natural skincare needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koshaherbal.com/contact" />
        
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
                "name": "Contact Us",
                "item": "https://koshaherbal.com/contact"
              }
            ]
          })}
        </script>
        
        {/* ContactPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Kosha Herbal",
            "description": "Contact page for Kosha Herbal - Natural Skincare Products",
            "url": "https://koshaherbal.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Kosha Herbal",
              "telephone": "+919898245608",
              "email": "info@koshaherbal.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "N/R Gokul Party Plot, Raspan Circle, Nikol",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "postalCode": "382350",
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="contact-content">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information */}
              <div className="contact-info">
                <h2>Contact Information</h2>
                <p className="info-subtitle">
                  Reach out to us through any of these channels
                </p>

                <div className="contact-cards">
                  {/* Phone */}
                  <div className="contact-card">
                    <div className="contact-icon">
                      <Phone size={32} weight="bold" />
                    </div>
                    <div className="contact-details">
                      <h3>Phone</h3>
                      <a href="tel:+919898245608">+91 9898245608</a>
                      <p>Mon-Sat, 9 AM - 7 PM</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-card">
                    <div className="contact-icon">
                      <Envelope size={32} weight="bold" />
                    </div>
                    <div className="contact-details">
                      <h3>Email</h3>
                      <a href="mailto:info@koshaherbal.com">info@koshaherbal.com</a>
                      <p>We'll reply within 24 hours</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="contact-card highlight">
                    <div className="contact-icon whatsapp">
                      <WhatsappLogo size={32} weight="fill" />
                    </div>
                    <div className="contact-details">
                      <h3>WhatsApp</h3>
                      <a 
                        href="https://wa.me/919898245608?text=Hello%20Kosha%20Herbal!%20I%20have%20a%20question." 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat with us instantly
                      </a>
                      <p>Quick response guaranteed</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="contact-card">
                    <div className="contact-icon">
                      <MapPin size={32} weight="bold" />
                    </div>
                    <div className="contact-details">
                      <h3>Address</h3>
                      <p>
                        Kosha Herbal<br />
                        N/R Gokul Party Plot Raspan Circle, Nikol, Ahmedabad - 382350
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="contact-card">
                    <div className="contact-icon">
                      <Clock size={32} weight="bold" />
                    </div>
                    <div className="contact-details">
                      <h3>Business Hours</h3>
                      <p className="business-hours">
                        <span className="day-label">Mon - Fri:</span> 9:00 AM - 7:00 PM<br />
                        <span className="day-label">Sunday:</span> 10:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="contact-card">
                    <div className="contact-icon">
                      <InstagramLogo size={32} weight="bold" />
                    </div>
                    <div className="contact-details">
                      <h3>Follow Us</h3>
                      <div className="social-links">
                        <a href="https://instagram.com/koshaherbal" target="_blank" rel="noopener noreferrer">
                          <InstagramLogo size={24} weight="bold" /> Instagram
                        </a>
                        <a href="https://facebook.com/koshaherbal" target="_blank" rel="noopener noreferrer">
                          <FacebookLogo size={24} weight="bold" /> Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <h2>Send Us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you shortly
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows="6"
                      required
                    ></textarea>
                  </div>

                  {formStatus.message && (
                    <div className={`form-status ${formStatus.type}`}>
                      {formStatus.message}
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary btn-submit">
                    <PaperPlaneTilt size={20} weight="bold" />
                    Send Message via WhatsApp
                  </button>

                  <p className="form-note">
                    * This will open WhatsApp with your message pre-filled. 
                    You can review before sending.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>🚚 What is the delivery time?</h3>
                <p>We deliver within 3-5 business days across India. Free delivery on orders above ₹499.</p>
              </div>

              <div className="faq-item">
                <h3>🔄 What is your return policy?</h3>
                <p>We offer a {POLICIES.RETURN_POLICY_DAYS}-day money-back guarantee. If you're not satisfied, contact us for a full refund.</p>
              </div>

              <div className="faq-item">
                <h3>💳 What payment methods do you accept?</h3>
                <p>We accept all major payment methods including UPI, Cards, Net Banking, and Cash on Delivery.</p>
              </div>

              <div className="faq-item">
                <h3>🌿 Are your products 100% natural?</h3>
                <p>Yes! All our products are made from 100% natural herbal ingredients with no harmful chemicals.</p>
              </div>

              <div className="faq-item">
                <h3>📦 How can I track my order?</h3>
                <p>Once shipped, you'll receive a tracking link via SMS and email. You can also WhatsApp us for updates.</p>
              </div>

              <div className="faq-item">
                <h3>💬 How can I get quick support?</h3>
                <p>WhatsApp us at +91 9898245608 for instant support. We're available Mon-Sat, 9 AM - 7 PM.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;

