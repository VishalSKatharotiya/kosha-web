/**
 * Utility functions for Google Analytics 4 (GA4) Event Tracking.
 * Documentation: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

// Helper to check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

/**
 * Triggered when a user views a product detail page
 */
export const trackViewItem = (product) => {
  if (!isGtagAvailable() || !product) return;
  
  window.gtag("event", "view_item", {
    currency: "INR",
    value: product.price || 0,
    items: [
      {
        item_id: product.id || product._id,
        item_name: product.name,
        price: product.price || 0,
        item_category: product.category || "Skincare",
      }
    ]
  });
};

/**
 * Triggered when a user clicks "Add to Cart"
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (!isGtagAvailable() || !product) return;

  window.gtag("event", "add_to_cart", {
    currency: "INR",
    value: (product.price || 0) * quantity,
    items: [
      {
        item_id: product.id || product._id,
        item_name: product.name,
        price: product.price || 0,
        item_category: product.category || "Skincare",
        quantity: quantity,
      }
    ]
  });
};

/**
 * Triggered when a user successfully creates an account
 */
export const trackSignUp = (method = "email") => {
  if (!isGtagAvailable()) return;

  window.gtag("event", "sign_up", {
    method: method
  });
};

/**
 * Triggered when a user attempts to place an order from the cart
 */
export const trackBeginCheckout = (cartItems, totalValue) => {
  if (!isGtagAvailable() || !cartItems || !cartItems.length) return;

  const gaItems = cartItems.map(item => ({
    item_id: item.product_id || item.product?._id || item.id,
    item_name: item.product_name || item.product?.name || item.name,
    price: item.price || item.product?.price || 0,
    quantity: item.quantity || 1
  }));

  window.gtag("event", "begin_checkout", {
    currency: "INR",
    value: totalValue,
    items: gaItems
  });
};
