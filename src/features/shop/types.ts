export interface Shop {
  _id: string;
  name: string;
  image?: string;
  location: string;
  email?: string;
  telephone?: string;
  description?: string;
}

export interface ShopFilters {
  location?: string;
  search?: string;
}