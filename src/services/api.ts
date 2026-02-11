const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {};

  // Copy existing headers if they exist
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, options.headers);
    }
  }

  // Only set Content-Type if it's not FormData (browser will set it automatically for FormData)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    // Debug logging for protected endpoints
    if (endpoint.includes('/my') || endpoint.includes('/cart') || endpoint.includes('/orders')) {
      console.log(`[API] Making authenticated request to: ${endpoint}`, {
        hasToken: !!token,
        tokenLength: token.length,
        tokenPreview: token.substring(0, 20) + '...'
      });
    }
  } else {
    // Throw error if token is missing for protected endpoints
    if (endpoint.includes('/my') || endpoint.includes('/cart') || endpoint.includes('/orders')) {
      console.error(`[API] No authentication token found for protected endpoint: ${endpoint}`);
      throw new Error('Authentication required. Please log in again.');
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      const errorMessage = errorData.message || `API error: ${response.statusText} (${response.status})`;
      
      // Log authentication errors for debugging
      if (response.status === 401 || response.status === 403) {
        console.error(`[API] Authentication error (${response.status}) for ${endpoint}:`, {
          errorMessage,
          hasToken: !!token,
          tokenLength: token?.length,
        });
      }
      
      throw new Error(errorMessage);
    }

    // Handle responses that might be empty or have no content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        const text = await response.text();
        return text ? JSON.parse(text) : { message: 'Success' };
      } catch (e) {
        // If JSON parsing fails, return success message
        return { message: 'Success' };
      }
    }
    
    // If no content-type or not JSON, return success message
    return { message: 'Success' };
  } catch (error: any) {
    // Handle network errors gracefully
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      console.warn(`Cannot connect to backend server at ${API_BASE_URL}`);
      
      // For GET requests, return empty array instead of throwing
      if (!options.method || options.method === 'GET') {
        return [];
      }
      
      // For POST/PUT/DELETE, throw a user-friendly error
      throw new Error('Unable to connect to server. Please check your internet connection and try again.');
    }
    throw error;
  }
}

export const api = {
  // Authentication
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Products
  getProducts: () => fetchAPI('/products'),
  getMyProducts: () => fetchAPI('/products/my'),
  getProduct: (id: string) => fetchAPI(`/products/${id}`),
  updateProduct: (id: string, formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Product update error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  deleteProduct: (id: string) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
  createProduct: (formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Product creation error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  
  // Shops
  getShops: () => fetchAPI('/shops'),
  getMyShops: () => fetchAPI('/shops/my'),
  getShop: (id: string) => fetchAPI(`/shops/${id}`),
  updateShop: (id: string, formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/shops/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Shop update error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  createShop: (formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/shops`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Shop creation error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  
  // Promotions
  getPromotions: () => fetchAPI('/promotions'),
  getMyPromotions: () => fetchAPI('/promotions/my'),
  getActivePromotions: () => fetchAPI('/promotions/active'),
  getPromotion: (id: string) => fetchAPI(`/promotions/${id}`),
  createPromotion: (formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/promotions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Promotion creation error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  
  // Categories
  getCategories: () => fetchAPI('/categories'),
  getCategory: (id: string) => fetchAPI(`/categories/${id}`),
  createCategory: (formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Category creation error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  updateCategory: (id: string, formData: FormData) => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    return fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = error.message || error.error || `API error: ${response.statusText}`;
        console.error('Category update error details:', error);
        throw new Error(errorMessage);
      }
      return response.json();
    });
  },
  deleteCategory: (id: string) => fetchAPI(`/categories/${id}`, { method: 'DELETE' }),

  // Shop deletion
  deleteShop: (id: string) => fetchAPI(`/shops/${id}`, { method: 'DELETE' }),

  // Promotion deletion
  deletePromotion: (id: string) => fetchAPI(`/promotions/${id}`, { method: 'DELETE' }),

  // Cart
  getCart: () => fetchAPI('/cart'),
  addToCart: (productId: string, quantity: number) =>
    fetchAPI('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  updateCartItem: (productId: string, quantity: number) =>
    fetchAPI('/cart', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    }),
  removeFromCart: (productId: string) => fetchAPI(`/cart/${productId}`, { method: 'DELETE' }),
  clearCart: () => fetchAPI('/cart/clear/all', { method: 'DELETE' }),

  // Orders
  createOrder: (data: { shippingAddress: any; paymentMethod: string }) =>
    fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getOrders: () => fetchAPI('/orders'),
  getOrder: (id: string) => fetchAPI(`/orders/${id}`),
};
