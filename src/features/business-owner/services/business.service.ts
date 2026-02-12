import { fetchAPI } from '../../../services/apiClient';

export const businessService = {
  getMyShops: () => fetchAPI('/shops/my'),
  getMyProducts: () => fetchAPI('/products/my'),
  getMyPromotions: () => fetchAPI('/promotions/my'),
  getMyOrders: () => fetchAPI('/orders'),
  getBusinessStats: () => Promise.resolve({}),
  getBusinessAnalytics: () => Promise.resolve({}),
  updateBusinessProfile: () => Promise.resolve({}),
};