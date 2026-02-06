import { useParams, Link } from 'react-router-dom';
import { businesses, products, promotions } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

export function ShopDetailPage() {
  const { id } = useParams();
  const business = businesses.find((b) => b.id === id);
  const shopProducts = products.filter((p) => p.businessId === id);
  const shopPromotions = promotions.filter((p) => p.businessId === id);

  if (!business) {
    return <div className="min-h-screen flex items-center justify-center">Shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/shops" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Shops
        </Link>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <img src={business.logo} alt={business.name} className="w-32 h-32 rounded-lg object-cover" />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
                <p className="text-muted-foreground mb-4">{business.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{business.area} - {business.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{business.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {shopPromotions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Active Promotions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shopPromotions.map((promo) => (
                <Card key={promo.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold mb-1">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground">{promo.description}</p>
                      </div>
                      <Badge className="bg-destructive text-white">{promo.discount}% OFF</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Products ({shopProducts.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shopProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img src={product.image} alt={product.imageAlt} className="w-full h-48 object-cover rounded-lg mb-3" />
                  <Badge className="mb-2 text-xs">{product.category}</Badge>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">RWF {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        RWF {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
