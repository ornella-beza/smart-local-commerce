import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productService } from '../../product/services/product.service';
import { promotionsService } from '../../promotions/services/promotions.service';
import { shopService } from '../services/shop.service';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

interface Shop {
  _id: string;
  name: string;
  description?: string;
  location: string;
  telephone: string;
  email: string;
  image?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  category: { _id: string; name: string } | string;
  shop?: { _id: string; name: string } | string;
}

interface Promotion {
  _id: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  bannerImage?: string;
  shop?: { _id: string } | string;
}

export function ShopDetailPage() {
  const { id } = useParams();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [shopData, productsData, promotionsData] = await Promise.all([
          shopService.getShop(id),
          productService.getProducts(),
          promotionsService.getPromotions(),
        ]);

        setShop(shopData);
        
        // Filter products by shop
        const shopProducts = productsData.filter((p: Product) => {
          const shopId = typeof p.shop === 'object' ? p.shop._id : p.shop;
          return shopId === id;
        });
        setProducts(shopProducts);
        
        // Filter promotions by shop
        const shopPromotions = promotionsData.filter((p: Promotion) => {
          const shopId = typeof p.shop === 'object' ? p.shop._id : p.shop;
          return shopId === id;
        });
        setPromotions(shopPromotions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading shop...</p>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Shop not found</p>
          <Link to="/shops">
            <button className="text-primary hover:underline">Back to Shops</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <Link to="/shops" className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Back to Shops
        </Link>

        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {shop.image && (
                <img src={shop.image} alt={shop.name} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg object-cover" />
              )}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{shop.name}</h1>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{shop.description || 'No description available'}</p>
                <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{shop.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{shop.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{shop.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {promotions.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Active Promotions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {promotions.map((promo) => {
                const discountText = promo.discountType === 'percentage' 
                  ? `${promo.discountValue}% OFF` 
                  : `RWF ${promo.discountValue} OFF`;
                
                return (
                  <Link key={promo._id} to={`/promotion/${promo._id}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-sm sm:text-base mb-1">{promo.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{promo.description}</p>
                          </div>
                          <Badge className="bg-destructive text-white text-xs sm:text-sm">{discountText}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Products ({products.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, index) => {
              const productCategory = typeof product.category === 'object' ? product.category.name : product.category;
              const categoryName = typeof productCategory === 'string' ? productCategory : '';
              
              return (
                <Link 
                  key={product._id} 
                  to={`/product/${product._id}`}
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
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <span className="font-bold text-sm sm:text-base md:text-lg text-primary transition-transform group-hover:scale-105">RWF {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-muted-foreground line-through text-[10px] sm:text-xs md:text-sm">
                            RWF {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
