import { fetchAPI } from '../../../services/apiClient';

export const orderService = {
  getOrders: () => fetchAPI('/orders'),
  getOrder: (id: string) => fetchAPI(`/orders/${id}`),
  cancelOrder: (id: string) => fetchAPI(`/orders/${id}/cancel`, { method: 'PUT' }),
};
