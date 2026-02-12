import { fetchAPI } from '../../../services/apiClient';

export const shopService = {
  getShops: () => fetchAPI('/shops'),
  getMyShops: () => fetchAPI('/shops/my'),
  getShop: (id: string) => fetchAPI(`/shops/${id}`),
  createShop: (formData: FormData) => fetchAPI('/shops', { method: 'POST', body: formData }),
  updateShop: (id: string, formData: FormData) => fetchAPI(`/shops/${id}`, { method: 'PUT', body: formData }),
  deleteShop: (id: string) => fetchAPI(`/shops/${id}`, { method: 'DELETE' }),
};