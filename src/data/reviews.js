// Customer reviews data

export const reviews = [
  {
    id: 1,
    rating: 5,
    title: 'Professional results at home',
    review: 'The day cream provides excellent protection while the night cream works wonders on skin repair. My complexion has never looked better. Highly recommend for visible results.',
    name: 'Yarshana Barvaliya',
    location: 'Ahmedabad',
    verified: true,
    productId: 'aura-combo',
    productName: 'Aura Combo',
    date: '2026-01-15',
    helpful: 45
  },
  {
    id: 2,
    rating: 5,
    title: 'Gentle yet effective',
    review: 'As someone with sensitive skin, I\'m impressed by how gentle yet effective these products are. The natural formulation gives me confidence in what I\'m applying. No irritation at all!',
    name: 'Raksha Mehta',
    location: 'Surat',
    verified: true,
    productId: 'aura-combo',
    productName: 'Aura Combo',
    date: '2026-01-10',
    helpful: 38
  },
  {
    id: 3,
    rating: 5,
    title: 'Exceptional quality',
    review: 'Worth every rupee! The herbal ingredients are carefully selected, and the results speak for themselves. My dark spots have reduced significantly in just 3 weeks.',
    name: 'Chaitali Chauhan',
    location: 'Ahmedabad',
    verified: true,
    productId: 'aura-combo',
    productName: 'Aura Combo',
    date: '2025-12-28',
    helpful: 52
  },
  {
    id: 4,
    rating: 5,
    title: 'Scientifically backed natural skincare',
    review: 'I appreciate the scientific approach to natural skincare. The product delivers on its promises with visible reduction in pigmentation. The free face wash is a great bonus!',
    name: 'Sneha Reddy',
    location: 'Ahmedabad',
    verified: true,
    productId: 'aura-combo',
    productName: 'Aura Combo',
    date: '2025-12-20',
    helpful: 29
  },
  {
    id: 5,
    rating: 5,
    title: 'Excellent value for money',
    review: 'My skin feels nourished and looks radiant. The day cream sits perfectly under makeup, and the night cream is deeply moisturizing without being greasy. Best purchase this year!',
    name: 'Vsanat Mistri',
    location: 'Rajkot',
    verified: true,
    productId: 'aura-combo',
    productName: 'Aura Combo',
    date: '2026-01-05',
    helpful: 34
  },
  {
    id: 6,
    rating: 5,
    title: 'Visible transformation',
    review: 'I\'ve been using this for 4 weeks and the transformation is remarkable. My skin texture has improved, and I get compliments regularly. The natural glow is real!',
    name: 'Priya Sharma',
    location: 'Bhavnagar',
    verified: true,
    productId: 'aura-combo',
    productName: 'Aura Combo',
    date: '2025-12-15',
    helpful: 67
  }
];

export const getReviewsByProduct = (productId) => {
  return reviews.filter(review => review.productId === productId);
};

export const getAverageRating = (productId) => {
  const productReviews = getReviewsByProduct(productId);
  if (productReviews.length === 0) return 0;
  
  const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / productReviews.length).toFixed(1);
};

export const getRatingDistribution = (productId) => {
  const productReviews = getReviewsByProduct(productId);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  productReviews.forEach(review => {
    distribution[review.rating]++;
  });
  
  // Convert to percentages
  const total = productReviews.length;
  Object.keys(distribution).forEach(key => {
    distribution[key] = total > 0 ? Math.round((distribution[key] / total) * 100) : 0;
  });
  
  return distribution;
};

export default reviews;

