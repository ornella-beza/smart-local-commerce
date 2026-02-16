import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shopService } from '../../shop/services/shop.service';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Search, MapPin, Phone, ExternalLink } from 'lucide-react';

interface Shop {
  _id: string;
  name: string;
  email: string;
  location: string;
  telephone?: string;
  description?: string;
  image?: string;
}

export function ExploreShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = shops.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShops(filtered);
    } else {
      setFilteredShops(shops);
    }
  }, [searchTerm, shops]);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const data = await shopService.getShops();
      setShops(Array.isArray(data) ? data : data.shops || []);
      setFilteredShops(Array.isArray(data) ? data : data.shops || []);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
      setShops([]);
      setFilteredShops([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Explore Shops</h1>
        <p className="text-gray-600 mt-1">Discover local shops and businesses</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search shops by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Shops Grid */}
      {filteredShops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No shops found matching your search' : 'No shops available'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Card key={shop._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {shop.image && (
                  <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{shop.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{shop.location}</span>
                    </div>
                    {shop.telephone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{shop.telephone}</span>
                      </div>
                    )}
                  </div>

                  {shop.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {shop.description}
                    </p>
                  )}

                  <Link
                    to={`/shop/${shop._id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    View Shop
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
