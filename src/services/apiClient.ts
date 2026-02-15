const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://local-ecommerce-bn.onrender.com/api';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {};

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

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (endpoint.includes('/my') || endpoint.includes('/cart') || endpoint.includes('/orders')) {
    throw new Error('Authentication required. Please log in again.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `API error: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      return text ? JSON.parse(text) : { message: 'Success' };
    }
    
    return { message: 'Success' };
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      if (!options.method || options.method === 'GET') {
        return [];
      }
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }
    throw error;
  }
}
