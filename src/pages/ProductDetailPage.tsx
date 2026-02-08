import { useParams, Link } from 'react-router-dom';
import { products, businesses } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Store, MapPin, ShoppingCart, Heart } from 'lucide-react';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const business = product ? businesses.find((b) => b.id === product.businessId) : null;

  if (!product) {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <Link to="/products" className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm">{product.category}</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">RWF {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground line-through">
                  RWF {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">{product.description}</p>

            {/* Business Info */}
            {business && (
              <Card className="mb-6 sm:mb-8">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={business.logo}
                      alt={business.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                        <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <Link to={`/shop/${business.id}`} className="font-semibold text-sm sm:text-base hover:underline">
                          {business.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{business.area}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button size="lg" className="flex-1 h-12 sm:h-14 text-sm sm:text-base">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-3 sm:px-4">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Product Details</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold">{product.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-semibold text-green-600">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
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
