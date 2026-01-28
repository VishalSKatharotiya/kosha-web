import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ConfettiBoom from 'react-confetti-boom';
import { 
  WhatsappLogo, 
  Star, 
  StarHalf, 
  ShoppingBag, 
  Truck, 
  ArrowLeft,
  Package,
  CheckCircle,
  Leaf,
  Sun,
  Moon,
  Clock,
  Tag as TagIcon
} from '@phosphor-icons/react';
import { getProductById } from '../data/products';
import { sendWhatsAppOrder } from '../utils/whatsapp';
import { POLICIES } from '../constants/config';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSavingsConfetti, setShowSavingsConfetti] = useState(false);

  // Scroll to top and trigger confetti when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger confetti after a short delay to ensure component is mounted
    setTimeout(() => {
      setShowSavingsConfetti(true);
    }, 500);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Go Back Home</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={20} weight="fill" className="star-filled" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={20} weight="fill" className="star-filled" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} weight="regular" className="star-empty" />);
    }

    return stars;
  };

  const handleBuyNow = () => {
    sendWhatsAppOrder(product.name, product.price);
  };

  const savings = product.mrp - product.price;
  const discountPercent = Math.round((savings / product.mrp) * 100);

  return (
    <>
      <Helmet>
        <title>{product.name} | Buy Best {product.category} Online - Kosha Herbal</title>
        <meta name="description" content={`Buy ${product.name} - ${product.subtitle}. ${product.description.substring(0, 155)}... ₹${product.price} only. Free delivery. Order now!`} />
        <meta name="keywords" content={product.seoKeywords || product.tags.join(', ')} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`https://koshaherbal.com/product/${product.id}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} - ${product.subtitle}`} />
        <meta property="og:description" content={product.description.substring(0, 200)} />
        <meta property="og:image" content={`https://koshaherbal.com${product.images[0]}`} />
        <meta property="og:url" content={`https://koshaherbal.com/product/${product.id}`} />
        <meta property="og:price:amount" content={product.price} />
        <meta property="og:price:currency" content="INR" />
        <meta property="product:brand" content="Kosha Herbal" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="INR" />
        <meta property="product:retailer_item_id" content={product.id} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="product" />
        <meta name="twitter:title" content={`${product.name} - ${product.subtitle}`} />
        <meta name="twitter:description" content={product.description.substring(0, 200)} />
        <meta name="twitter:image" content={`https://koshaherbal.com${product.images[0]}`} />
        <meta name="twitter:label1" content="Price" />
        <meta name="twitter:data1" content={`₹${product.price}`} />
        <meta name="twitter:label2" content="Availability" />
        <meta name="twitter:data2" content="In Stock" />
        
        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images.map(img => `https://koshaherbal.com${img}`),
            "brand": {
              "@type": "Brand",
              "name": "Kosha Herbal"
            },
            "sku": product.id,
            "mpn": product.id,
            "offers": {
              "@type": "Offer",
              "url": `https://koshaherbal.com/product/${product.id}`,
              "priceCurrency": "INR",
              "price": product.price,
              "priceValidUntil": "2026-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Kosha Herbal"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": product.rating,
                "bestRating": "5"
              },
              "author": {
                "@type": "Organization",
                "name": "Kosha Herbal Customers"
              }
            }
          })}
        </script>
        
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
                "name": "Products",
                "item": "https://koshaherbal.com/#products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": `https://koshaherbal.com/product/${product.id}`
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Confetti Effect for Savings - Top Level for Visibility */}
      {showSavingsConfetti && (
        <div className="savings-confetti-container">
          <ConfettiBoom 
            mode="boom"
            particleCount={500}
            colors={['#FFD700', '#FFA500']}
            shapeSize={13}
            spreadDeg={360}
            effectDuration={6000}
            effectCount={1}
          />
        </div>
      )}

      <div className="product-page">
        <div className="container">
          {/* Back Button */}
          <Link to="/" className="back-button">
            <ArrowLeft size={20} weight="bold" />
            Back to Products
          </Link>

          <div className="product-detail">
            {/* Left Side - Images */}
            <div className="product-gallery">
              <div className="main-image">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23f0f0f0" width="600" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3E' + product.name + '%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="product-info">
              {/* Category Badge */}
              <div className="product-category-badge">
                {product.category}
              </div>

              <h1 className="product-title">{product.name}</h1>
              <p className="product-subtitle">{product.subtitle}</p>

              {/* Rating */}
              <div className="product-rating-section">
                <div className="stars-display">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} | {product.reviewCount} Reviews
                </span>
              </div>

              {/* Pricing */}
              <div className="product-pricing-section">
                <div className="price-row">
                  <span className="price-label">MRP:</span>
                  <span className="price-mrp">₹{product.mrp}</span>
                </div>
                <div className="price-row main">
                  <span className="price-label">Price:</span>
                  <span className="price-special">₹{product.price}</span>
                </div>
                <div className="savings-row">
                  <span className="savings-badge">
                    Save ₹{savings} ({discountPercent}% OFF)
                  </span>
                </div>
              </div>

              {/* Free Gift */}
              {product.freeGift && (
                <div className="free-gift-banner">
                  <Package size={20} weight="fill" />
                  <strong>FREE GIFT:</strong> {product.freeGift.name} (Worth ₹{product.freeGift.value})
                </div>
              )}

              {/* Tags */}
              <div className="product-tags">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <TagIcon size={14} weight="fill" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buy Buttons */}
              <div className="buy-actions">
                <button 
                  className="btn btn-whatsapp btn-large"
                  onClick={handleBuyNow}
                >
                  <WhatsappLogo size={20} weight="fill" />
                  BUY NOW ON WHATSAPP
                </button>
                <Link to="/" className="btn btn-secondary btn-large">
                  <ShoppingBag size={20} weight="bold" />
                  CONTINUE SHOPPING
                </Link>
              </div>

              {/* Suitable For */}
              <div className="suitable-for-section">
                <h3>
                  <CheckCircle size={20} weight="fill" />
                  Suitable For
                </h3>
                <div className="suitable-tags">
                  {product.suitableFor.map((item, index) => (
                    <span key={index} className="suitable-tag">
                      <CheckCircle size={16} weight="fill" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="product-features-grid">
                <div className="feature-item">
                  <Truck size={28} weight="bold" />
                  <div>
                    <strong>Free Delivery</strong>
                    <p>Above ₹499</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Leaf size={28} weight="fill" />
                  <div>
                    <strong>100% Natural</strong>
                    <p>Herbal Ingredients</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Clock size={28} weight="bold" />
                  <div>
                    <strong>{POLICIES.RETURN_POLICY_DAYS}-Day Return</strong>
                    <p>Money Back Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="product-details-section">
            <div className="detail-box">
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>

            <div className="detail-box">
              <h2>Key Benefits</h2>
              <ul className="benefits-list">
                {product.keyBenefits.map((benefit, index) => (
                  <li key={index}>✓ {benefit}</li>
                ))}
              </ul>
            </div>

            <div className="detail-box">
              <h2>What's Included</h2>
              <ul className="package-list">
                {product.package.map((item, index) => (
                  <li key={index}>
                    <strong>{item.item}</strong> - {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {product.dayCream && (
              <div className="detail-box">
                <h2>Day Cream Features</h2>
                <ul className="benefits-list">
                  {product.dayCream.features.map((feature, index) => (
                    <li key={index}>☀️ {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.nightCream && (
              <div className="detail-box">
                <h2>Night Cream Features</h2>
                <ul className="benefits-list">
                  {product.nightCream.features.map((feature, index) => (
                    <li key={index}>🌙 {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-box">
              <h2>Natural Ingredients</h2>
              
              {product.dayIngredients && (
                <>
                  <h3 className="ingredients-section-title">
                    <Sun size={20} weight="fill" />
                    Aura Bright Cream (Day Cream)
                  </h3>
                  <div className="ingredients-grid">
                    {product.dayIngredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-item">
                        <h4>{ingredient.name}</h4>
                        <p className="scientific-name">{ingredient.scientificName}</p>
                        <ul>
                          {ingredient.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {product.nightIngredients && (
                <>
                  <h3 className="ingredients-section-title" style={{ marginTop: '40px' }}>
                    <Moon size={20} weight="fill" />
                    Aura Restore Cream (Night Cream)
                  </h3>
                  <div className="ingredients-grid">
                    {product.nightIngredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-item">
                        <h4>{ingredient.name}</h4>
                        <p className="scientific-name">{ingredient.scientificName}</p>
                        <ul>
                          {ingredient.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="detail-box">
              <h2>How to Use</h2>
              <div className="usage-grid">
                {product.howToUse.day && (
                  <div className="usage-column">
                    <h3>
                      <Sun size={24} weight="fill" />
                      Day Cream
                    </h3>
                    <ol>
                      {product.howToUse.day.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {product.howToUse.night && (
                  <div className="usage-column">
                    <h3>
                      <Moon size={24} weight="fill" />
                      Night Cream
                    </h3>
                    <ol>
                      {product.howToUse.night.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
