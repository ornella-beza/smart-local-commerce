import { fetchAPI } from '../../../services/apiClient';

export const productService = {
  getProducts: () => fetchAPI('/products'),
  getMyProducts: async () => {
    const products = await fetchAPI('/products');
    return products;
  },
  getProduct: (id: string) => fetchAPI(`/products/${id}`),
  createProduct: (formData: FormData) => fetchAPI('/products', { method: 'POST', body: formData }),
  updateProduct: (id: string, formData: FormData) => fetchAPI(`/products/${id}`, { method: 'PUT', body: formData }),
  deleteProduct: (id: string) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
};