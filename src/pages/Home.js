import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from '@phosphor-icons/react';
import HeroSlider from '../components/home/HeroSlider';
import Features from '../components/home/Features';
import ProductCard from '../components/home/ProductCard';
import IngredientsSlider from '../components/home/IngredientsSlider';
import Reviews from '../components/home/Reviews';
import products from '../data/products';
import commitments from '../data/commitments';
import { POLICIES } from '../constants/config';
import './Home.css';

const Home = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Kosha Herbal - Premium Natural Skincare | Dermatologically Tested | India</title>
        <meta 
          name="description" 
          content={`Shop scientifically formulated natural skincare at Kosha Herbal. Dermatologically tested, cruelty-free products. Free delivery above ₹499. ${POLICIES.RETURN_POLICY_DAYS}-day money-back guarantee.`} 
        />
        <meta 
          name="keywords" 
          content="natural skincare India, herbal face cream, ayurvedic skincare, dermatologically tested, kosha herbal, day night cream, chemical free skincare" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Kosha Herbal - Premium Natural Skincare" />
        <meta property="og:description" content="Shop scientifically formulated natural skincare. Dermatologically tested, cruelty-free products." />
        <meta property="og:type" content="website" />
        
        {/* Schema Markup for Products */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kosha Herbal",
            "url": "https://koshaherbal.com",
            "description": "Premium natural skincare products with scientifically researched herbal formulations"
          })}
        </script>
      </Helmet>

      <div className="home-page">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Features Section */}
        <Features />

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <h2>Why Choose Kosha Herbal?</h2>
              <p className="about-description">
                Kosha Herbal, established with a commitment to natural wellness, brings you 
                scientifically researched skincare solutions rooted in Ayurvedic wisdom. Our 
                products undergo rigorous testing to ensure safety, efficacy, and quality that 
                exceeds industry standards.
              </p>
              
              <div className="commitments-grid">
                {commitments.map((commitment) => (
                  <div key={commitment.id} className="commitment-item">
                    <span className="commitment-icon">
                      <CheckCircle size={40} weight="fill" />
                    </span>
                    <div>
                      <h4>{commitment.title}</h4>
                      <p>{commitment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section" id="products">
          <div className="container">
            <div className="section-header">
              <h2>Bestselling Products</h2>
              <p className="section-subtitle">Scientifically formulated natural skincare solutions</p>
            </div>
            
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Ingredients Slider Section */}
        <IngredientsSlider />

        {/* Reviews Section */}
        <Reviews />
      </div>
    </>
  );
};

export default Home;

