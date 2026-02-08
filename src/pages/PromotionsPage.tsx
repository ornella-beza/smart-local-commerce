import { useState } from 'react';
import { Link } from 'react-router-dom';
import { promotions, businesses, areas } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';

export function PromotionsPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const filteredPromotions = promotions.filter((promo) => {
    return !selectedArea || promo.area === selectedArea;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Active Promotions</h1>

        <div className="mb-6 sm:mb-8">
          <select
            className="h-11 px-3 rounded-lg border border-input bg-background max-w-xs"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredPromotions.map((promo) => {
            const business = businesses.find((b) => b.id === promo.businessId);
            return (
              <Link to={`/promotion/${promo.id}`} key={promo.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                      <h3 className="font-bold text-lg sm:text-xl flex-1">{promo.title}</h3>
                      <Badge className="bg-destructive text-white text-xs sm:text-sm flex-shrink-0">
                        {promo.discount}% OFF
                      </Badge>
                    </div>
                    
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{promo.description}</p>
                    
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{promo.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Valid until {new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                      {business && (
                        <p className="font-semibold mt-2 text-sm sm:text-base">By {business.name}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredPromotions.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-muted-foreground">No promotions found in this area</p>
          </div>
        )}
      </div>
    </div>
  );
}
