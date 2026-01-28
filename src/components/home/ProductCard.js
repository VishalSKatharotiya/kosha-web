import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, WhatsappLogo } from '@phosphor-icons/react';
import { sendWhatsAppOrder } from '../../utils/whatsapp';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star star-filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star star-filled">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star star-empty">★</span>);
    }

    return stars;
  };

  const savings = product.mrp - product.price;
  const discountPercent = Math.round((savings / product.mrp) * 100);

  return (
    <div className="product-card">
      {/* Category Tag */}
      <div className="product-category">
        <Tag size={14} weight="fill" />
        <span>{product.category}</span>
      </div>

      {/* Badges */}
      <div className="product-badges">
        {product.badges.map((badge, index) => (
          <span key={index} className="badge badge-primary">
            {badge}
          </span>
        ))}
      </div>

      {/* Product Image with Hover */}
      <div 
        className="product-image"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`product-img-primary ${isHovered ? 'fade-out' : 'fade-in'}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3EProduct Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} - view 2`}
            className={`product-img-secondary ${isHovered ? 'fade-in' : 'fade-out'}`}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Rating */}
      <div className="product-rating">
        <div className="star-rating">
          {renderStars(product.rating)}
        </div>
        <span className="rating-text">{product.rating} | {product.reviewCount} Reviews</span>
      </div>

      {/* Product Info */}
      <h3 className="product-name">{product.name}</h3>
      <p className="product-subtitle">{product.subtitle}</p>

      {/* Key Benefits */}
      <ul className="product-benefits">
        {product.keyBenefits.slice(0, 3).map((benefit, index) => (
          <li key={index}>✓ {benefit}</li>
        ))}
      </ul>

      {/* Pricing */}
      <div className="product-pricing">
        <div className="price-container">
          <span className="price-mrp">MRP: ₹{product.mrp}</span>
          <span className="price-special">₹{product.price}</span>
          <span className="price-savings">Save ₹{savings} ({discountPercent}% OFF)</span>
        </div>
      </div>

      {/* Free Gift */}
      {product.freeGift && (
        <div className="product-gift">
          🎁 FREE: {product.freeGift.name} (Worth ₹{product.freeGift.value})
        </div>
      )}

      {/* CTA Buttons */}
      <div className="product-actions">
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          VIEW DETAILS
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            sendWhatsAppOrder(product.name, product.price);
          }}
          className="btn btn-whatsapp"
        >
          <WhatsappLogo size={20} weight="fill" />
          BUY ON WHATSAPP
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

