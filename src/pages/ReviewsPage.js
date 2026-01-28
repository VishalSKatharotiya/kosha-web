import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, X, MagnifyingGlassPlus, WhatsappLogo, InstagramLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import './ReviewsPage.css';
import { STATS } from '../constants/config';

const ReviewsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample review screenshots data
  // In production, replace these with actual screenshot URLs
  const reviewScreenshots = [
    {
      id: 1,
      image: '/images/reviews/screenshot1.png',
      customer: 'Priya Sharma',
      rating: 5,
      product: 'Aura Combo',
      category: 'whatsapp',
      date: 'Jan 2026'
    },
    {
      id: 2,
      image: '/images/reviews/screenshot2.png',
      customer: 'Yarshana Barvaliya',
      rating: 5,
      product: 'Night Cream',
      category: 'whatsapp',
      date: 'Jan 2026'
    },
    {
      id: 3,
      image: '/images/reviews/screenshot3.png',
      customer: 'Raksha Mehta',
      rating: 4,
      product: 'Aura Combo',
      category: 'whatsapp',
      date: 'Jan 2026'
    },
    {
      id: 4,
      image: '/images/reviews/screenshot4.png',
      customer: 'Juhi Patekar',
      rating: 5,
      product: 'Aura Combo',
      category: 'whatsapp',
      date: 'Jan 2026'
    },
    {
      id: 5,
      image: '/images/reviews/screenshot5.png',
      customer: 'Neha Gupta',
      rating: 5,
      product: 'Night Cream',
      category: 'whatsapp',
      date: 'Dec 2025'
    },
    {
      id: 6,
      image: '/images/reviews/screenshot6.png',
      customer: 'Jyoti Patel',
      rating: 4,
      product: 'Aura Combo',
      category: 'whatsapp',
      date: 'Dec 2025'
    },
    {
      id: 7,
      image: '/images/reviews/screenshot7.png',
      customer: 'Kavita Reddy',
      rating: 5,
      product: 'Night Cream',
      category: 'instagram',
      date: 'Dec 2025'
    },
    {
      id: 8,
      image: '/images/reviews/screenshot8.png',
      customer: 'Charvi Vaghasiya',
      rating: 5,
      product: 'Aura Combo',
      category: 'whatsapp',
      date: 'Dec 2025'
    },
    // {
    //   id: 9,
    //   image: '/images/reviews/screenshot9.jpg',
    //   customer: 'Pooja Joshi',
    //   rating: 5,
    //   product: 'Aura Combo',
    //   category: 'whatsapp',
    //   date: 'Jan 2026'
    // },
    // {
    //   id: 10,
    //   image: '/images/reviews/screenshot10.jpg',
    //   customer: 'Nidhi Patel',
    //   rating: 4,
    //   product: 'Night Cream',
    //   category: 'whatsapp',
    //   date: 'Jan 2026'
    // },
    // {
    //   id: 11,
    //   image: '/images/reviews/screenshot11.jpg',
    //   customer: 'Sneha Kapoor',
    //   rating: 5,
    //   product: 'Aura Combo',
    //   category: 'instagram',
    //   date: 'Jan 2026'
    // },
    // {
    //   id: 12,
    //   image: '/images/reviews/screenshot12.jpg',
    //   customer: 'Radhika Rathod',
    //   rating: 5,
    //   product: 'Night Cream',
    //   category: 'whatsapp',
    //   date: 'Jan 2026'
    // }
  ];

  const handleImageClick = (review) => {
    setSelectedImage(review);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Customer Reviews - Kosha Herbal | Real Customer Feedback</title>
        <meta name="description" content="See what our customers are saying! Browse authentic reviews and screenshots from satisfied customers across India." />
        <meta name="keywords" content="kosha herbal reviews, customer reviews, product reviews, testimonials, customer feedback, real reviews India" />
        <link rel="canonical" href="https://koshaherbal.com/reviews" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Customer Reviews - Kosha Herbal" />
        <meta property="og:description" content="See what our customers are saying! Browse authentic reviews from satisfied customers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koshaherbal.com/reviews" />
        
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
                "name": "Reviews",
                "item": "https://koshaherbal.com/reviews"
              }
            ]
          })}
        </script>
        
        {/* ItemList Schema for Reviews */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Customer Reviews",
            "description": "Authentic customer reviews and testimonials for Kosha Herbal products",
            "numberOfItems": reviewScreenshots.length,
            "itemListElement": reviewScreenshots.map((review, index) => ({
              "@type": "Review",
              "position": index + 1,
              "itemReviewed": {
                "@type": "Product",
                "name": review.product,
                "brand": {
                  "@type": "Brand",
                  "name": "Kosha Herbal"
                }
              },
              "author": {
                "@type": "Person",
                "name": review.customer
              },
              "datePublished": review.date,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5",
                "worstRating": "1"
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="reviews-page">
        {/* Hero Section */}
        <section className="reviews-hero">
          <div className="container">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} weight="bold" />
              Back to Home
            </Link>
            <h1>Customer Reviews</h1>
            <p>Real feedback from real customers. See what they're saying about Kosha Herbal!</p>
            
            <div className="reviews-stats">
              <div className="stat-item">
                <h3>{STATS.HAPPY_CUSTOMERS.VALUE}</h3>
                <p>{STATS.HAPPY_CUSTOMERS.LABEL}</p>
              </div>
              <div className="stat-item">
                <h3>{STATS.AVERAGE_RATING.VALUE}</h3>
                <p>{STATS.AVERAGE_RATING.LABEL}</p>
              </div>
              <div className="stat-item">
                <h3>{STATS.SATISFACTION_RATE.VALUE}</h3>
                <p>{STATS.SATISFACTION_RATE.LABEL}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="reviews-gallery-section">
          <div className="container">
            <div className="reviews-grid">
              {reviewScreenshots.map((review) => (
                <div 
                  key={review.id} 
                  className="review-screenshot-card"
                  onClick={() => handleImageClick(review)}
                >
                  <div className="screenshot-image">
                    <img 
                      src={review.image} 
                      alt={`Review from ${review.customer}`}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="600"%3E%3Crect fill="%23f8faf9" width="300" height="600"/%3E%3Ctext fill="%232D5016" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="18" font-weight="bold"%3EReview %23${review.id}%3C/text%3E%3Ctext fill="%2352B788" x="50%25" y="55%25" text-anchor="middle" dy=".3em" font-size="14"%3E${review.customer}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div className="screenshot-overlay">
                      <MagnifyingGlassPlus size={48} weight="bold" />
                      <p>Click to Enlarge</p>
                    </div>
                    <div className="platform-badge">
                      {review.category === 'whatsapp' && (
                        <>
                          <WhatsappLogo size={16} weight="fill" /> WhatsApp
                        </>
                      )}
                      {review.category === 'instagram' && (
                        <>
                          <InstagramLogo size={16} weight="fill" /> Instagram
                        </>
                      )}
                    </div>
                  </div>
                  <div className="review-info">
                    <div className="review-header">
                      <h3 className="customer-name">{review.customer}</h3>
                      <p className="review-date">{review.date}</p>
                    </div>
                    <p className="review-product">{review.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="reviews-cta">
          <div className="container">
            <h2>Share Your Experience!</h2>
            <p>We'd love to hear from you. Share your review and help others make the right choice.</p>
            <a 
              href="https://wa.me/919898245608?text=Hi!%20I%20want%20to%20share%20my%20review%20about%20Kosha%20Herbal%20products." 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Share Your Review
            </a>
          </div>
        </section>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="review-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={32} weight="bold" />
            </button>
            <div className="modal-image">
              <img 
                src={selectedImage.image} 
                alt={`Review from ${selectedImage.customer}`}
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="800"%3E%3Crect fill="%23f8faf9" width="400" height="800"/%3E%3Ctext fill="%232D5016" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24" font-weight="bold"%3EReview %23${selectedImage.id}%3C/text%3E%3Ctext fill="%2352B788" x="50%25" y="55%25" text-anchor="middle" dy=".3em" font-size="18"%3E${selectedImage.customer}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            <div className="modal-info">
              <div className="review-header">
                <h3 className="customer-name">{selectedImage.customer}</h3>
                <p className="review-date">{selectedImage.date}</p>
              </div>
              <p className="review-product">{selectedImage.product}</p>
              <div className="platform-badge-large">
                {selectedImage.category === 'whatsapp' && (
                  <>
                    <WhatsappLogo size={20} weight="fill" /> WhatsApp Review
                  </>
                )}
                {selectedImage.category === 'instagram' && (
                  <>
                    <InstagramLogo size={20} weight="fill" /> Instagram Review
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsPage;
