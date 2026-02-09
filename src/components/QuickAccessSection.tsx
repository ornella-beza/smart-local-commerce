import { Link } from 'react-router-dom';
import { Store, Package, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { businesses, products, promotions } from '../data/mockData';

export function QuickAccessSection() {
  const featuredShops = businesses.slice(0, 3);
  const featuredProducts = products.slice(0, 4);
  const activePromotions = promotions.slice(0, 3);

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Featured Shops */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Shops</h2>
              <p className="text-muted-foreground">Discover local businesses near you</p>
            </div>
            <Link to="/shops">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredShops.map((shop) => (
              <Link key={shop.id} to={`/shop/${shop.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={shop.logo} 
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl mb-1">{shop.name}</h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <Store className="w-4 h-4" />
                          <span>{shop.area}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{shop.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Popular Products</h2>
              <p className="text-muted-foreground">Shop the latest trending items</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
                  <CardContent className="p-3 sm:p-4">
                    <div className="relative mb-3 overflow-hidden rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          SALE
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">RWF {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          RWF {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Active Promotions */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Hot Deals</h2>
              <p className="text-muted-foreground">Don't miss out on these amazing offers</p>
            </div>
            <Link to="/promotions">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePromotions.map((promo) => (
              <Link key={promo.id} to={`/promotion/${promo.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={promo.image} 
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        {promo.discount}% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{promo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{promo.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Tag className="w-3 h-3" />
                        <span>Valid until {new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
