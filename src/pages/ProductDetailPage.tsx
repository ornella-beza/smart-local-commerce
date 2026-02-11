import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Store, MapPin, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  category: { _id: string; name: string } | string;
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

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await api.getProduct(id);
        setProduct(productData);
        
        // Fetch shop if product has shop reference
        if (productData.shop) {
          const shopId = typeof productData.shop === 'object' ? productData.shop._id : productData.shop;
          try {
            const shopData = await api.getShop(shopId);
            setShop(shopData);
          } catch (err) {
            console.error('Failed to fetch shop:', err);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <div className="skeleton h-6 w-32 mb-6 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div className="skeleton-image h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg" />
            <div className="space-y-4">
              <div className="skeleton h-6 w-24 rounded" />
              <div className="skeleton h-10 w-full rounded" />
              <div className="skeleton h-8 w-48 rounded" />
              <div className="skeleton h-24 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const productCategory = typeof product.category === 'object' && product.category !== null
    ? product.category.name
    : product.category;
  const categoryName = typeof productCategory === 'string' && productCategory
    ? productCategory
    : 'Uncategorized';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <Link to="/products" className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Product Image */}
          <div className="animate-fade-in-up">
            <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src={product.image || '/placeholder-image.jpg'}
                  alt={product.name}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-muted flex items-center justify-center text-muted-foreground">No Image Available</div>';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm animate-scale-in">{categoryName}</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">RWF {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground line-through">
                  RWF {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>{product.description || 'No description available'}</p>

            {/* Business Info */}
            {shop && (
              <Card className="mb-6 sm:mb-8 animate-fade-in-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {shop.image && (
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                        <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        <Link to={`/shop/${shop._id}`} className="font-semibold text-sm sm:text-base hover:underline transition-colors hover:text-primary">
                          {shop.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{shop.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-2 border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                  disabled={product.stock !== undefined && quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              {product.stock !== undefined && (
                <span className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                className="flex-1 h-12 sm:h-14 text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={async () => {
                  if (!isAuthenticated) {
                    navigate('/login');
                    return;
                  }
                  if (!product) return;
                  setAddingToCart(true);
                  try {
                    await addToCart(product._id, quantity);
                    alert('Product added to cart!');
                    setQuantity(1);
                  } catch (error: any) {
                    alert(error.message || 'Failed to add to cart');
                  } finally {
                    setAddingToCart(false);
                  }
                }}
                disabled={addingToCart || (product.stock !== undefined && product.stock === 0)}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-3 sm:px-4 transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:border-red-300 group">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-colors group-hover:fill-red-500 group-hover:text-red-500" />
              </Button>
            </div>

            {/* Product Details */}
            <Card className="animate-fade-in-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Product Details</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between py-2 border-b border-border transition-colors hover:bg-muted/50 px-2 -mx-2 rounded">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold">{categoryName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border transition-colors hover:bg-muted/50 px-2 -mx-2 rounded">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold">{product.location}</span>
                  </div>
                  <div className="flex justify-between py-2 transition-colors hover:bg-muted/50 px-2 -mx-2 rounded">
                    <span className="text-muted-foreground">Availability</span>
                    <span className={`font-semibold ${product.stock && product.stock > 0 ? 'text-green-600' : 'text-red-600'} animate-pulse`}>
                      {product.stock && product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
