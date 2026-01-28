import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './IngredientsSlider.css';

const IngredientsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4.5);

  const ingredients = [
    {
      id: 1,
      name: 'Saffron',
      alt: 'Saffron - Natural skin brightening ingredient for face cream',
      title: 'Saffron (Crocus sativus) - Improves complexion and adds natural glow',
      color: '#FF6B35',
      seoKeywords: 'saffron for skin, natural brightening, kesar face cream'
    },
    {
      id: 2,
      name: 'Aloe Vera',
      alt: 'Aloe Vera - Deep hydration and soothing natural ingredient',
      title: 'Aloe Vera (Aloe barbadensis) - Soothes inflammation and hydrates skin',
      color: '#52B788',
      seoKeywords: 'aloe vera benefits, skin hydration, natural moisturizer'
    },
    {
      id: 3,
      name: 'Vitamin E',
      alt: 'Vitamin E - Powerful antioxidant for anti-aging skincare',
      title: 'Vitamin E (Tocopherol) - Anti-aging and protects from free radicals',
      color: '#FFD166',
      seoKeywords: 'vitamin e for skin, anti-aging cream, antioxidant skincare'
    },
    {
      id: 4,
      name: 'Turmeric',
      alt: 'Turmeric - Natural antiseptic and skin brightening herb',
      title: 'Turmeric (Curcuma longa) - Brightens skin tone naturally',
      color: '#FFA62B',
      seoKeywords: 'turmeric for skin, haldi benefits, natural antiseptic'
    },
    {
      id: 5,
      name: 'Sandalwood',
      alt: 'Sandalwood - Cooling and skin tone evening natural ingredient',
      title: 'Sandalwood (Santalum album) - Even skin tone with cooling effect',
      color: '#D4A574',
      seoKeywords: 'sandalwood benefits, chandan for skin, natural cooling'
    },
    {
      id: 6,
      name: 'Rose Water',
      alt: 'Rose Water - Natural toner and pH balancing ingredient',
      title: 'Rose Water (Rosa damascena) - Balances pH and tones skin',
      color: '#FF6B9D',
      seoKeywords: 'rose water benefits, natural toner, gulab jal for skin'
    },
    {
      id: 7,
      name: 'Almond Oil',
      alt: 'Almond Oil - Deep nourishment and skin softening oil',
      title: 'Almond Oil (Prunus dulcis) - Nourishes and softens skin deeply',
      color: '#E8D5B7',
      seoKeywords: 'almond oil for skin, badam oil benefits, natural nourishment'
    },
    {
      id: 8,
      name: 'Neem Extract',
      alt: 'Neem Extract - Antibacterial properties for acne prevention',
      title: 'Neem Extract (Azadirachta indica) - Prevents acne naturally',
      color: '#6B9080',
      seoKeywords: 'neem for acne, antibacterial skin care, natural acne treatment'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setItemsPerView(1.2);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(2.2);
      } else if (window.innerWidth <= 992) {
        setItemsPerView(3.2);
      } else {
        setItemsPerView(4.5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.ceil(ingredients.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="ingredients-section">
      <div className="container">
        <div className="section-header">
          <h2>Natural Ingredients</h2>
          <p className="section-subtitle">Pure herbal extracts that make our products exceptional</p>
        </div>

        <div className="ingredients-slider-wrapper">
          <button
            className="ingredient-arrow ingredient-arrow-prev"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous ingredients"
          >
            <CaretLeft size={24} weight="bold" />
          </button>

          <div className="ingredients-slider">
            <div
              className="ingredients-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {ingredients.map((ingredient) => (
                <div 
                  key={ingredient.id} 
                  className="ingredient-card"
                  data-ingredient={ingredient.name}
                  data-keywords={ingredient.seoKeywords}
                >
                  <div
                    className="ingredient-image-only"
                    style={{ backgroundColor: ingredient.color }}
                    role="img"
                    aria-label={ingredient.alt}
                  >
                    <div className="ingredient-overlay">
                      <span className="ingredient-icon">🌿</span>
                      <span className="ingredient-name-overlay">{ingredient.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="ingredient-arrow ingredient-arrow-next"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Next ingredients"
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSlider;
