import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/hero/slide1.jpg',
      title: 'Natural Skincare, Scientifically Proven',
      subtitle: 'Discover the power of nature backed by science',
      cta: 'Shop Now',
      ctaLink: '#products'
    },
    {
      id: 2,
      image: '/images/hero/slide2.jpg',
      title: 'Aura Combo - Day & Night Care',
      subtitle: 'Complete skincare solution for radiant skin',
      cta: 'Explore Products',
      ctaLink: '#products'
    },
    {
      id: 3,
      image: '/images/hero/slide3.jpg',
      title: '100% Natural Ingredients',
      subtitle: 'Dermatologically tested, cruelty-free formulations',
      cta: 'Learn More',
      ctaLink: '#products'
    }
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleCTAClick = (link) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            }}
          >
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button 
                onClick={() => handleCTAClick(slide.ctaLink)} 
                className="btn btn-primary btn-hero"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button 
          className="slider-arrow slider-arrow-left" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <CaretLeft size={32} weight="bold" />
        </button>
        
        <button 
          className="slider-arrow slider-arrow-right" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <CaretRight size={32} weight="bold" />
        </button>

        {/* Dots Navigation */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

