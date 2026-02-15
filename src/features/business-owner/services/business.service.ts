import { fetchAPI } from '../../../services/apiClient';

export const businessService = {
  getMyShops: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const shops = await fetchAPI('/shops');
    console.log('User email:', user.email);
    console.log('All shops:', shops);
    // Filter by email since backend doesn't return owner field
    return shops.filter((s: any) => s.email === user.email);
  },
  getMyProducts: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const products = await fetchAPI('/products');
    console.log('User email:', user.email, 'Products:', products);
    // Products don't have email, so return all for now
    // Backend needs to add owner field
    return products;
  },
  getMyPromotions: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const promotions = await fetchAPI('/promotions');
    console.log('User email:', user.email, 'Promotions:', promotions);
    // Promotions don't have email, so return all for now
    // Backend needs to add owner field
    return promotions;
  },
  getMyOrders: () => fetchAPI('/orders'),
  getBusinessStats: () => Promise.resolve({}),
  getBusinessAnalytics: () => Promise.resolve({}),
  updateBusinessProfile: () => Promise.resolve({}),
};