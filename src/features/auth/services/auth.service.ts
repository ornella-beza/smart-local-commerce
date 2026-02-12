import { fetchAPI } from '../../../services/apiClient';

export const authService = {
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};