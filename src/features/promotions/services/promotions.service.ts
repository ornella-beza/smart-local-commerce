import { fetchAPI } from '../../../services/apiClient';

export const promotionsService = {
  getPromotions: () => fetchAPI('/promotions'),
  getMyPromotions: () => fetchAPI('/promotions/my'),
  getPromotion: (id: string) => fetchAPI(`/promotions/${id}`),
  createPromotion: (formData: FormData) => fetchAPI('/promotions', { method: 'POST', body: formData }),
  updatePromotion: () => Promise.resolve({}),
  deletePromotion: (id: string) => fetchAPI(`/promotions/${id}`, { method: 'DELETE' }),
  getActivePromotions: () => fetchAPI('/promotions/active'),
};