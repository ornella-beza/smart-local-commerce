export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  category: { _id: string; name: string } | string | null;
  shop?: { _id: string; name: string } | string;
  location: string;
  stock?: number;
  seller: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}