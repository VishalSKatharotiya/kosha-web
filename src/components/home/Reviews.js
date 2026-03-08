import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import { getReviews } from "../../data/reviews";
import "./Reviews.css";
import { STATS } from "../../constants/config";

const Reviews = ({ reviews: propReviews, title, subtitle } = {}) => {
  const [reviews, setReviews] = useState(propReviews || []);
  const [loading, setLoading] = useState(!propReviews);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    // If reviews are passed as a prop, use them directly
    if (propReviews) {
      setReviews(propReviews);
      setLoading(false);
      return;
    }
    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, [propReviews]);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={20}
          weight={index < rating ? "fill" : "regular"}
          style={{ color: index < rating ? "#FFC107" : "#E0E0E0" }}
        />
      ));
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
  };

  if (loading) return <div className="container">Loading reviews...</div>;
  if (!reviews || reviews.length === 0) return null;

  return (
    <section
      className="reviews-section"
      id="reviews"
      style={
        propReviews
          ? { background: "#fff", borderTop: "none", marginTop: 0 }
          : {}
      }
    >
      <div className="container">
        <div className="reviews-header">
          <h2>{title || "Customer Reviews"}</h2>
          {!propReviews && (
            <p className="reviews-subtitle">
              {subtitle || "Trusted by 1,100+ happy customers across India"}
            </p>
          )}
          <div className="overall-rating">
            <span className="stars">{renderStars(5)}</span>
            <span className="rating-score">4.8/5.0</span>
          </div>
        </div>

        <div className="reviews-carousel">
          {/* Review Cards */}
          <div className="reviews-track">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`review-card ${index === currentReview ? "active" : ""}`}
                style={{
                  transform: `translateX(${(index - currentReview) * 100}%)`,
                  opacity: index === currentReview ? 1 : 0.3,
                }}
              >
                <div className="review-header">
                  <div className="review-stars">
                    {renderStars(review.rating)}
                  </div>
                  <div className="review-date">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <h3 className="review-title">{review.title}</h3>
                <p className="review-text">{review.review}</p>

                <div className="review-footer">
                  <div className="reviewer-info">
                    <strong className="reviewer-name">{review.name}</strong>
                    <span className="reviewer-location">{review.location}</span>
                  </div>
                  {review.verified && (
                    <span className="verified-badge">✓ Verified Purchase</span>
                  )}
                </div>
                {!propReviews && (
                  <div className="review-product">
                    Product: {review?.product?.name}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="review-arrow review-arrow-prev"
            onClick={prevReview}
            aria-label="Previous review"
          >
            <CaretLeft size={32} weight="bold" />
          </button>
          <button
            className="review-arrow review-arrow-next"
            onClick={nextReview}
            aria-label="Next review"
          >
            <CaretRight size={32} weight="bold" />
          </button>

          {/* Dots Navigation */}
          <div className="review-dots">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`review-dot ${index === currentReview ? "active" : ""}`}
                onClick={() => goToReview(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Stats — only on homepage version */}
        {!propReviews && (
          <div className="trust-stats">
            <div className="stat">
              <div className="stat-number">{STATS.HAPPY_CUSTOMERS.VALUE}</div>
              <div className="stat-label">{STATS.HAPPY_CUSTOMERS.LABEL}</div>
            </div>
            <div className="stat">
              <div className="stat-number">{STATS.AVERAGE_RATING.VALUE}</div>
              <div className="stat-label">{STATS.AVERAGE_RATING.LABEL}</div>
            </div>
            <div className="stat">
              <div className="stat-number">{STATS.VERIFIED_REVIEWS.VALUE}</div>
              <div className="stat-label">{STATS.VERIFIED_REVIEWS.LABEL}</div>
            </div>
            <div className="stat">
              <div className="stat-number">
                {STATS.NATURAL_INGREDIENTS.VALUE}
              </div>
              <div className="stat-label">
                {STATS.NATURAL_INGREDIENTS.LABEL}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
