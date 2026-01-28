

const WHATSAPP_NUMBER = '919898245608'; // Format: country code + number

/**
 * Send WhatsApp message for product order
 * @param {string} productName - Name of the product
 * @param {number} price - Price of the product
 */
export const sendWhatsAppOrder = (productName = 'Aura Combo', price = '899') => {
  const message = `Hello Kosha Herbal! 👋

I would like to purchase the following product:

*Product:* ${productName}
*Price:* ₹${price} (10% OFF)
*Offer:* FREE Face Wash included

*Delivery Details:*
Name: 
Complete Address: 
Phone: 
Pin Code: 

Please confirm my order. Thank you! 🌿`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
};

/**
 * Send general inquiry via WhatsApp
 * @param {string} message - Custom message
 */
export const sendWhatsAppMessage = (message) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
};

/**
 * Send product inquiry
 * @param {string} productName - Product name
 */
export const sendProductInquiry = (productName) => {
  const message = `Hello Kosha Herbal! 👋

I would like to know more about *${productName}*.

Please provide more details. Thank you!`;

  sendWhatsAppMessage(message);
};

const whatsappUtils = {
  sendWhatsAppOrder,
  sendWhatsAppMessage,
  sendProductInquiry,
  WHATSAPP_NUMBER
};

export default whatsappUtils;



