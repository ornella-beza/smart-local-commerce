import { fetchAPI } from '../../../services/apiClient';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export const userService = {
  getProfile: () => fetchAPI('/users/profile'),
  updateProfile: (data: Partial<UserProfile>) => 
    fetchAPI('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
};
