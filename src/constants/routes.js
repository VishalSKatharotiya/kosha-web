/**
 * Application Route Constants
 * Centralized route paths for easy maintenance and consistency
 */

// Main Routes
export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  CONTACT: '/contact',
  RETURN_REFUND: '/return-refund',
  PRIVACY_POLICY: '/privacy-policy',
  REVIEWS: '/reviews',
};

// Route Builders (for dynamic routes)
export const buildProductRoute = (productId) => `/product/${productId}`;

// Hash Routes (for same-page navigation)
export const HASH_ROUTES = {
  PRODUCTS_SECTION: '#products',
  REVIEWS_SECTION: '#reviews',
  FEATURES_SECTION: '#features',
};

// External Links
export const EXTERNAL_LINKS = {
  WHATSAPP: 'https://wa.me/919898245608',
  INSTAGRAM: 'https://instagram.com/kosha.herbal',
  EMAIL: 'mailto:info@koshaherbal.com',
  PHONE: 'tel:+919898245608',
};

// Navigation Items (for Header/Footer)
export const NAV_ITEMS = [
  { label: 'HOME', path: ROUTES.HOME },
  { label: 'PRODUCTS', path: HASH_ROUTES.PRODUCTS_SECTION },
  { label: 'REVIEWS', path: ROUTES.REVIEWS },
  { label: 'CONTACT US', path: ROUTES.CONTACT },
];

// Footer Links
export const FOOTER_LINKS = {
  essentials: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Products', path: HASH_ROUTES.PRODUCTS_SECTION },
    { label: 'Customer Reviews', path: ROUTES.REVIEWS },
    { label: 'Contact Us', path: ROUTES.CONTACT },
  ],
  customerService: [
    { label: 'Shipping Policy', path: ROUTES.CONTACT },
    { label: 'Return & Refund', path: ROUTES.RETURN_REFUND },
    { label: 'Privacy Policy', path: ROUTES.PRIVACY_POLICY },
    { label: 'Terms of Service', path: ROUTES.CONTACT },
  ],
};

export default ROUTES;

