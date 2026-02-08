import { useState } from 'react';
import { Link } from 'react-router-dom';
import { businesses, areas, categories } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { MapPin, Phone, Mail } from 'lucide-react';

export function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || business.area === selectedArea;
    return matchesSearch && matchesArea;
  });

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

          <select
            className="h-11 px-3 rounded-lg border border-input bg-background"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBusinesses.map((business) => (
            <Link key={business.id} to={`/shop/${business.id}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-4 sm:p-6">
                  <img
                    src={business.logo}
                    alt={business.name}
                    className="w-full h-28 sm:h-32 object-cover rounded-lg mb-3 sm:mb-4"
                  />
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{business.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 sm:mb-4 line-clamp-2">{business.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{business.area}</span>
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
