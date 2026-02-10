import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';

interface Promotion {
  _id: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  bannerImage?: string;
  location: string;
  startDate: string;
  endDate: string;
  shop?: { _id: string; name: string; location: string } | string;
  isActive: boolean;
}

interface Shop {
  _id: string;
  name: string;
  location: string;
}

export function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [promotionsData, shopsData] = await Promise.all([
          api.getActivePromotions(),
          api.getShops(),
        ]);

        setPromotions(promotionsData);
        setShops(shopsData);
        
        // Extract unique areas from promotions
        const uniqueAreas = [...new Set(promotionsData.map((p: Promotion) => p.location))];
        setAreas(uniqueAreas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load promotions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPromotions = promotions.filter((promo) => {
    return !selectedArea || promo.location === selectedArea;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading promotions...</p>
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
            const shop = typeof promo.shop === 'object' ? promo.shop : shops.find(s => s._id === promo.shop);
            const discountText = promo.discountType === 'percentage' 
              ? `${promo.discountValue}% OFF` 
              : `RWF ${promo.discountValue} OFF`;
            
            return (
              <Link to={`/promotion/${promo._id}`} key={promo._id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {promo.bannerImage && (
                    <img
                      src={promo.bannerImage}
                      alt={promo.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                      <h3 className="font-bold text-lg sm:text-xl flex-1">{promo.title}</h3>
                      <Badge className="bg-destructive text-white text-xs sm:text-sm flex-shrink-0">
                        {discountText}
                      </Badge>
                    </div>
                    
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{promo.description}</p>
                    
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{promo.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Valid until {new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                      {shop && (
                        <p className="font-semibold mt-2 text-sm sm:text-base">By {shop.name}</p>
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
