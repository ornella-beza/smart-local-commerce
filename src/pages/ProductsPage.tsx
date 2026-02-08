import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, businesses, areas, categories } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { MapPin, Store } from 'lucide-react';

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || product.area === selectedArea;
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesArea && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Search Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Input
            placeholder="Search products..."
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => {
            const business = businesses.find((b) => b.id === product.businessId);
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-3 sm:p-4">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-2 sm:mb-3"
                    />
                    
                    <Badge className="mb-1 sm:mb-2 text-[10px] sm:text-xs">{product.category}</Badge>
                    
                    <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <span className="font-bold text-sm sm:text-base md:text-lg">RWF {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through text-[10px] sm:text-xs md:text-sm">
                          RWF {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Store className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hover:underline">
                          {business?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{product.area}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12 col-span-full">
            <p className="text-sm sm:text-base text-muted-foreground">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
