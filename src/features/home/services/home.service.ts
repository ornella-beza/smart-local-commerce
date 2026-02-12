import { fetchAPI } from '../../../services/apiClient';

export const homeService = {
  getFeaturedProducts: () => fetchAPI('/products'),
  getBestSellers: () => fetchAPI('/products'),
  getTrendingProducts: () => fetchAPI('/products'),
  getCategories: () => fetchAPI('/categories'),
};