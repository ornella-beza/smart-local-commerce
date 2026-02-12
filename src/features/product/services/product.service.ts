import { fetchAPI } from '../../../services/apiClient';

export const productService = {
  getProducts: () => fetchAPI('/products'),
  getMyProducts: () => fetchAPI('/products/my'),
  getProduct: (id: string) => fetchAPI(`/products/${id}`),
  createProduct: (formData: FormData) => fetchAPI('/products', { method: 'POST', body: formData }),
  updateProduct: (id: string, formData: FormData) => fetchAPI(`/products/${id}`, { method: 'PUT', body: formData }),
  deleteProduct: (id: string) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
};