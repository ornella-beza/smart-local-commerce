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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="section-heading mb-8">Search Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const business = businesses.find((b) => b.id === product.businessId);
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    
                    <Badge className="mb-2 text-xs">{product.category}</Badge>
                    
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-lg">RWF {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm">
                          RWF {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Store className="w-3 h-3" />
                        <span className="hover:underline">
                          {business?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
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
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
