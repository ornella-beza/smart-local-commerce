import { useParams, Link } from 'react-router-dom';
import { promotions, businesses } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Store, MapPin, Calendar, Tag } from 'lucide-react';

export function PromotionDetailPage() {
  const { id } = useParams();
  const promotion = promotions.find((p) => p.id === id);
  const business = promotion ? businesses.find((b) => b.id === promotion.businessId) : null;

  if (!promotion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Promotion not found</h1>
          <Link to="/promotions">
            <Button>Back to Promotions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(promotion.startDate);
  const endDate = new Date(promotion.endDate);
  const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/promotions" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Promotions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Promotion Image */}
          <div>
            <Card className="overflow-hidden">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="w-full h-[500px] object-cover"
              />
            </Card>
          </div>

          {/* Promotion Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-destructive text-white text-lg px-4 py-2">
                {promotion.discount}% OFF
              </Badge>
              {daysLeft > 0 && (
                <Badge variant="outline" className="text-base px-3 py-1">
                  {daysLeft} days left
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-6">{promotion.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-8">{promotion.description}</p>

            {/* Business Info */}
            {business && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={business.logo}
                      alt={business.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Store className="w-4 h-4" />
                        <Link to={`/shop/${business.id}`} className="font-semibold hover:underline">
                          {business.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{business.area}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Button */}
            <Link to={`/shop/${business?.id}`}>
              <Button size="lg" className="w-full h-14 text-base mb-8">
                <Store className="w-5 h-5 mr-2" />
                Visit Shop
              </Button>
            </Link>

            {/* Promotion Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Promotion Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="font-semibold text-lg">{promotion.discount}% OFF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Valid Period</p>
                      <p className="font-semibold">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{promotion.area}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {daysLeft <= 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold">This promotion has expired</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
