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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <Link to="/promotions" className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Back to Promotions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Promotion Image */}
          <div>
            <Card className="overflow-hidden">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
              />
            </Card>
          </div>

          {/* Promotion Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Badge className="bg-destructive text-white text-base sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2">
                {promotion.discount}% OFF
              </Badge>
              {daysLeft > 0 && (
                <Badge variant="outline" className="text-sm sm:text-base px-2 sm:px-3 py-0.5 sm:py-1">
                  {daysLeft} days left
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{promotion.title}</h1>
            
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">{promotion.description}</p>

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

            {/* Action Button */}
            <Link to={`/shop/${business?.id}`}>
              <Button size="lg" className="w-full h-12 sm:h-14 text-sm sm:text-base mb-6 sm:mb-8">
                <Store className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Visit Shop
              </Button>
            </Link>

            {/* Promotion Details */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Promotion Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Discount</p>
                      <p className="font-semibold text-base sm:text-lg">{promotion.discount}% OFF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Valid Period</p>
                      <p className="font-semibold text-sm sm:text-base">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-sm sm:text-base">{promotion.area}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {daysLeft <= 0 && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm sm:text-base text-red-700 font-semibold">This promotion has expired</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
