import { fetchAPI } from '../../../services/apiClient';

export const cartService = {
  getCart: () => fetchAPI('/cart'),
  addToCart: (productId: string, quantity: number) =>
    fetchAPI('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (productId: string, quantity: number) =>
    fetchAPI('/cart', { method: 'PUT', body: JSON.stringify({ productId, quantity }) }),
  removeFromCart: (productId: string) => fetchAPI(`/cart/${productId}`, { method: 'DELETE' }),
  clearCart: () => fetchAPI('/cart/clear/all', { method: 'DELETE' }),
  checkout: (orderData: any) => fetchAPI('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
};