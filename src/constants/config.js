/**
 * Application Configuration Constants
 * Centralized configuration for contact info, company details, and settings
 */

// Contact Information
export const CONTACT_INFO = {
  PHONE: '+919898245608',
  PHONE_DISPLAY: '+91 9898245608',
  PHONE_RAW: '9898245608', // Without country code
  WHATSAPP_NUMBER: '919898245608', // Format: country code + number (no +)
  WHATSAPP_DISPLAY: '+91 98982 45608',
  EMAIL: 'info@koshaherbal.com',
  EMAIL_SUPPORT: 'support@koshaherbal.com',
  INSTAGRAM_HANDLE: 'kosha.herbal',
  INSTAGRAM_URL: 'https://instagram.com/kosha.herbal',
};

// Company Information
export const COMPANY_INFO = {
  NAME: 'Kosha Herbal',
  TAGLINE: 'Scientifically Backed Natural Skincare',
  DESCRIPTION: 'Founded with a singular mission of creating scientifically researched, ethically sourced natural skincare products.',
  FULL_DESCRIPTION: 'Founded with a singular mission of creating scientifically researched, ethically sourced natural skincare products. All products are manufactured in GMP-certified facilities under strict quality control.',
  ADDRESS: {
    LINE1: 'Kosha Herbal, N/R Gokul Party Plot,',
    LINE2: 'Raspan Circle, Nikol,',
    CITY: 'Ahmedabad',
    PINCODE: '382350',
    STATE: 'Gujarat',
    COUNTRY: 'India',
    FULL: 'Kosha Herbal, N/R Gokul Party Plot, Raspan Circle, Nikol, Ahmedabad - 382350',
    FORMATTED: 'Kosha Herbal, N/R Gokul Party Plot,\nRaspan Circle, Nikol,\nAhmedabad - 382350\nGujarat, India',
  },
};

// Business Hours
export const BUSINESS_HOURS = {
  WEEKDAYS: {
    LABEL: 'Monday - Friday',
    HOURS: '9:00 AM - 6:00 PM',
    OPEN: '09:00',
    CLOSE: '18:00',
  },
  SATURDAY: {
    LABEL: 'Saturday',
    HOURS: '9:00 AM - 5:00 PM',
    OPEN: '09:00',
    CLOSE: '17:00',
  },
  SUNDAY: {
    LABEL: 'Sunday',
    HOURS: 'Closed',
    OPEN: null,
    CLOSE: null,
  },
  TIMEZONE: 'IST (GMT+5:30)',
  SUPPORT_AVAILABLE: '24/7 WhatsApp Support',
  FORMATTED: [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};

// Certifications
export const CERTIFICATIONS = [
  { id: 1, name: 'ISO 9001:2015', icon: '🏆' },
  { id: 2, name: 'GMP Certified', icon: '🏆' },
  { id: 3, name: 'FSSAI Approved', icon: '🏆' },
];

// Offer/Promotion Banners
export const PROMO_BANNER = {
  MESSAGE: 'FREE DELIVERY on orders above ₹499 | 10% OFF on First Order | Use Code: FIRST10',
  COUPON_CODE: 'FIRST10',
  FREE_DELIVERY_THRESHOLD: 499,
  FIRST_ORDER_DISCOUNT: 10, // percentage
};

// Order & Policy Configuration
export const POLICIES = {
  RETURN_POLICY_DAYS: 7,
  FREE_DELIVERY_AMOUNT: 499,
  RETURN_POLICY_TEXT: '7-Day Return Policy',
  FREE_DELIVERY_TEXT: 'Free Delivery on Orders Above ₹499',
  SHIPPING_DAYS: '3-5 business days',
  WARRANTY_DAYS: 0, // No warranty period
};

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 1, name: 'Visa', icon: '💳' },
  { id: 2, name: 'Mastercard', icon: '💳' },
  { id: 3, name: 'RuPay', icon: '💳' },
  { id: 4, name: 'UPI', icon: '💰' },
  { id: 5, name: 'Paytm', icon: '📱' },
];

// Social Media Handles
export const SOCIAL_MEDIA = {
  INSTAGRAM: {
    HANDLE: '@kosha.herbal',
    URL: 'https://instagram.com/kosha.herbal',
  },
  WHATSAPP: {
    NUMBER: '919898245608',
    URL: 'https://wa.me/919898245608',
  },
};

// SEO Configuration
export const SEO_CONFIG = {
  SITE_NAME: 'Kosha Herbal',
  DEFAULT_TITLE: 'Kosha Herbal - Premium Natural Skincare | Dermatologically Tested | India',
  DEFAULT_DESCRIPTION: 'Discover Kosha Herbal\'s premium natural skincare. Scientifically formulated, dermatologically tested, and cruelty-free products for radiant skin. Free delivery on orders above ₹499.',
  SITE_URL: 'https://koshaherbal.com',
  OG_IMAGE: 'https://koshaherbal.com/og-image.jpg',
  TWITTER_HANDLE: '@koshaherbal',
};

// Business Statistics
export const STATS = {
  HAPPY_CUSTOMERS: {
    VALUE: '1,000+',
    NUMERIC: 1000,
    LABEL: 'Happy Customers',
  },
  AVERAGE_RATING: {
    VALUE: '4.8/5',
    NUMERIC: 4.8,
    MAX: 5.0,
    LABEL: 'Average Rating',
  },
  VERIFIED_REVIEWS: {
    VALUE: 156,
    LABEL: 'Verified Reviews',
  },
  SATISFACTION_RATE: {
    VALUE: '95%',
    NUMERIC: 95,
    LABEL: 'Satisfaction Rate',
  },
  NATURAL_INGREDIENTS: {
    VALUE: '100%',
    NUMERIC: 100,
    LABEL: 'Natural Ingredients',
  },
  // Legacy format for backward compatibility
  LEGACY: {
    HAPPY_CUSTOMERS: '10,000+',
    AVERAGE_RATING: '4.8/5',
    VERIFIED_REVIEWS: 156,
    SATISFACTION_RATE: '95%',
    NATURAL_INGREDIENTS: '100%',
  },
};

const CONFIG = {
  CONTACT_INFO,
  COMPANY_INFO,
  BUSINESS_HOURS,
  CERTIFICATIONS,
  PROMO_BANNER,
  POLICIES,
  PAYMENT_METHODS,
  SOCIAL_MEDIA,
  SEO_CONFIG,
  STATS,
};

export default CONFIG;

