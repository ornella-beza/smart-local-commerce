import { fetchAPI } from '../../../services/apiClient';

export const adminService = {
  getAllUsers: () => Promise.resolve([]),
  getAllShops: () => fetchAPI('/shops'),
  getAllProducts: () => fetchAPI('/products'),
  getAllPromotions: () => fetchAPI('/promotions'),
  getAllCategories: () => fetchAPI('/categories'),
  getAllOrders: () => fetchAPI('/orders'),
  getAdminStats: () => Promise.resolve({}),
  getSystemAnalytics: () => Promise.resolve({}),
  updateUserRole: () => Promise.resolve({}),
  deleteUser: () => Promise.resolve({}),
  getSystemSettings: () => Promise.resolve({}),
  updateSystemSettings: () => Promise.resolve({}),
};