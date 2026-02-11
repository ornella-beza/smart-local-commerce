import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { MapPin, Store } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  category: { _id: string; name: string } | string | null;
  shop?: { _id: string; name: string; location: string; image?: string } | string;
  location: string;
  stock?: number;
}

interface Shop {
  _id: string;
  name: string;
  location: string;
  image?: string;
}

interface Category {
  _id: string;
  name: string;
}

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    if (urlSearch) setSearchTerm(urlSearch);
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, shopsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getShops(),
          api.getCategories(),
        ]);

        const productsArray = Array.isArray(productsData) ? productsData as Product[] : [];
        const shopsArray = Array.isArray(shopsData) ? shopsData as Shop[] : [];
        const categoriesArray = Array.isArray(categoriesData) ? categoriesData as Category[] : [];
        
        setProducts(productsArray);
        setShops(shopsArray);
        setCategories(categoriesArray);
        
        const uniqueAreas = [...new Set(shopsArray.map((shop: Shop) => shop.location))];
        setAreas(uniqueAreas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Skip products with null/undefined name
    if (!product || !product.name) return false;
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const productShop = typeof product.shop === 'object' && product.shop !== null ? product.shop : shops.find(s => s._id === product.shop);
    const productLocation = productShop?.location || product.location;
    const matchesArea = !selectedArea || productLocation === selectedArea;
    
    const productCategory = typeof product.category === 'object' && product.category ? product.category.name : product.category;
    const categoryName = typeof productCategory === 'string' ? productCategory : '';
    const matchesCategory = !selectedCategory || categoryName === selectedCategory;
    
    return matchesSearch && matchesArea && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <div className="h-12 skeleton mb-6 w-64 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-11 skeleton rounded-lg" />
            <div className="h-11 skeleton rounded-lg" />
            <div className="h-11 skeleton rounded-lg" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="skeleton-image h-32 sm:h-40 md:h-48 mb-3 rounded-lg" />
                <div className="skeleton h-4 w-20 mb-2 rounded" />
                <div className="skeleton h-5 w-full mb-2 rounded" />
                <div className="skeleton h-6 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Search Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="h-11 px-3 rounded-lg border border-input bg-background"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          <select
            className="h-11 px-3 rounded-lg border border-input bg-background"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No products in database</p>
            <p className="text-sm text-muted-foreground">Add some products to get started</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product, index) => {
                const productShop = typeof product.shop === 'object' ? product.shop : shops.find(s => s._id === product.shop);
                const productCategory = typeof product.category === 'object' && product.category ? product.category.name : product.category;
                const categoryName = typeof productCategory === 'string' ? productCategory : 'Uncategorized';
                
                return (
                  <Link 
                    to={`/product/${product._id}`} 
                    key={product._id}
                    className="product-card"
                    style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                  >
                    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md h-full flex flex-col">
                      <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                        <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-3">
                          <img
                            src={product.image || '/placeholder-image.jpg'}
                            alt={product.name}
                            className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-32 sm:h-40 md:h-48 bg-muted flex items-center justify-center text-muted-foreground text-xs">No Image</div>';
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <Badge className="mb-1 sm:mb-2 text-[10px] sm:text-xs w-fit transition-colors group-hover:bg-primary">{categoryName}</Badge>
                        
                        <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 transition-colors group-hover:text-primary flex-1">{product.name}</h3>
                        
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <span className="font-bold text-sm sm:text-base md:text-lg text-primary transition-transform group-hover:scale-105">RWF {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through text-[10px] sm:text-xs md:text-sm">
                              RWF {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs text-muted-foreground mt-auto">
                          {productShop && (
                            <div className="flex items-center gap-1 transition-colors group-hover:text-foreground">
                              <Store className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span className="hover:underline">{productShop.name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 transition-colors group-hover:text-foreground">
                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span>{product.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-sm sm:text-base text-muted-foreground">No products found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}