export const API_BASE_URL = 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  SHOPS: '/shops',
  PRODUCTS: '/products',
  PROMOTIONS: '/promotions',
  BLOG: '/blog',
  CATEGORIES: '/categories',
  ADMIN: '/admin',
  BUSINESS: '/business/dashboard',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  BUSINESS_OWNER: 'business_owner',
  CUSTOMER: 'customer',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const;