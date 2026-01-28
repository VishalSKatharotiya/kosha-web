import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import "./IngredientsSlider.css";

const IngredientsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3.5);

  const ingredients = [
    {
      name: "Aloe Vera",
      photo: "/images/ingredients/kosha_aloe_vera.png",
      alt: "Aloe Vera - Natural hydration and soothing ingredient",
      seoKeywords: "aloe vera, natural moisturizer, skin soothing",
    },
    {
      name: "Alpha Arbutin",
      photo: "/images/ingredients/kosha_alpha_arbutin.png",
      alt: "Alpha Arbutin - Skin brightening and spot reduction",
      seoKeywords: "alpha arbutin, skin brightening, hyperpigmentation",
    },
    {
      name: "Argan Oil",
      photo: "/images/ingredients/kosha_argan_oil.png",
      alt: "Argan Oil - Deep nourishment and skin softening",
      seoKeywords: "argan oil, skin nourishment, natural oils",
    },
    {
      name: "Coffee",
      photo: "/images/ingredients/kosha_coffee.png",
      alt: "Coffee - Exfoliating and skin energizing ingredient",
      seoKeywords: "coffee scrub, skin energizer, natural exfoliant",
    },
    {
      name: "Green Tea",
      photo: "/images/ingredients/kosha_green_tea.png",
      alt: "Green Tea - Antioxidant and skin protecting",
      seoKeywords: "green tea, antioxidant skincare, detox skin",
    },
    {
      name: "Hyaluronic Acid",
      photo: "/images/ingredients/kosha_hyalaronic_acid.png",
      alt: "Hyaluronic Acid - Intense hydration and plumping",
      seoKeywords: "hyaluronic acid, skin plumping, deep hydration",
    },
    {
      name: "Keratin",
      photo: "/images/ingredients/kosha_ketatin.png",
      alt: "Keratin - Skin repairing and strengthening",
      seoKeywords: "keratin, skin repair, strengthening ingredients",
    },
    {
      name: "Niacinamide (B3)",
      photo: "/images/ingredients/kosha_niacinamide_vitamin_b3.png",
      alt: "Niacinamide Vitamin B3 - Pore refining and skin evening",
      seoKeywords: "niacinamide, vitamin b3, pore refining",
    },
    {
      name: "Salicylic Acid",
      photo: "/images/ingredients/kosha_salicilyic_acid.png",
      alt: "Salicylic Acid - Acne fighting and clear skin",
      seoKeywords: "salicylic acid, acne treatment, clear skin",
    },
    {
      name: "Tea Tree Oil",
      photo: "/images/ingredients/kosha_tea_tree_oil.png",
      alt: "Tea Tree Oil - Anti-bacterial and anti-inflammatory",
      seoKeywords: "tea tree oil, antibacterial skin care, natural healing",
    },
    {
      name: "Vitamin C",
      photo: "/images/ingredients/kosha_vitamin_c.png",
      alt: "Vitamin C - Radiance boosting and skin brightening",
      seoKeywords: "vitamin c, skin radiance, brightening serum",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setItemsPerView(1.1);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(1.5);
      } else if (window.innerWidth <= 992) {
        setItemsPerView(2.5);
      } else {
        setItemsPerView(3.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          <p className="section-subtitle">
            Pure herbal extracts that make our products exceptional
          </p>
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
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="ingredient-card"
                  data-ingredient={ingredient.name}
                  data-keywords={ingredient.seoKeywords}
                >
                  <div className="ingredient-image-container">
                    <img
                      src={ingredient.photo}
                      alt={ingredient.alt}
                      className="ingredient-photo"
                      loading="lazy"
                    />
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
