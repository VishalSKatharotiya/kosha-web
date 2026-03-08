import api from '../services/api';

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await api.get(`/reviews?productId=${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
};

export const getAverageRating = (productReviews) => {
  if (!productReviews || productReviews.length === 0) return 0;
  const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / productReviews.length).toFixed(1);
};

export const getRatingDistribution = (productReviews) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  if (!productReviews) return distribution;
  
  productReviews.forEach(review => {
    distribution[review.rating]++;
  });
  
  const total = productReviews.length;
  Object.keys(distribution).forEach(key => {
    distribution[key] = total > 0 ? Math.round((distribution[key] / total) * 100) : 0;
  });
  
  return distribution;
};

export const reviews = [];
export default reviews;

