import { fetchAPI } from '../../../services/apiClient';

export const adminService = {
  getAllUsers: () => fetchAPI('/users'),
  getAllShops: () => fetchAPI('/shops'),
  getAllProducts: () => fetchAPI('/products'),
  getAllPromotions: () => fetchAPI('/promotions'),
  getAllCategories: () => fetchAPI('/categories'),
  getAllOrders: () => fetchAPI('/orders'),
  getAdminStats: () => Promise.resolve({}),
  getSystemAnalytics: () => Promise.resolve({}),
  updateUserRole: (userId: string, role: string) => fetchAPI(`/users/${userId}`, { method: 'PUT', body: JSON.stringify({ role }) }),
  updateUser: (userId: string, userData: any) => fetchAPI(`/users/${userId}`, { method: 'PUT', body: JSON.stringify(userData) }),
  deleteUser: (userId: string) => fetchAPI(`/users/${userId}`, { method: 'DELETE' }),
  getSystemSettings: () => Promise.resolve({}),
  updateSystemSettings: () => Promise.resolve({}),
};