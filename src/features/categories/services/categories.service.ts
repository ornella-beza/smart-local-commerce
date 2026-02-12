import { fetchAPI } from '../../../services/apiClient';

export const categoriesService = {
  getCategories: () => fetchAPI('/categories'),
  getCategory: (id: string) => fetchAPI(`/categories/${id}`),
  createCategory: (formData: FormData) => fetchAPI('/categories', { method: 'POST', body: formData }),
  updateCategory: (id: string, formData: FormData) => fetchAPI(`/categories/${id}`, { method: 'PUT', body: formData }),
  deleteCategory: (id: string) => fetchAPI(`/categories/${id}`, { method: 'DELETE' }),
  getCategoryProducts: () => Promise.resolve([]),
};