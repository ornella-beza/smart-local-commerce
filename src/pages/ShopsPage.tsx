import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { MapPin, Phone, Mail } from 'lucide-react';

interface Shop {
  _id: string;
  name: string;
  description?: string;
  location: string;
  telephone: string;
  email: string;
  image?: string;
}

export function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const shopsData = await api.getShops();
        const shopsArray = Array.isArray(shopsData) ? shopsData : [];
        setShops(shopsArray);
        
        // Extract unique areas
        const uniqueAreas = [...new Set(shopsArray.map((shop: Shop) => shop.location))];
        setAreas(uniqueAreas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shops');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBusinesses = shops.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || business.location === selectedArea;
    return matchesSearch && matchesArea;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading shops...</p>
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Browse Shops</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Input
            placeholder="Search shops..."
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBusinesses.map((business) => (
            <Link key={business._id} to={`/shop/${business._id}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-4 sm:p-6">
                  {business.image && (
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-28 sm:h-32 object-cover rounded-lg mb-3 sm:mb-4"
                    />
                  )}
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{business.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 sm:mb-4 line-clamp-2">{business.description || 'No description available'}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{business.telephone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{business.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-muted-foreground">No shops found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
