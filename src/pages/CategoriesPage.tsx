import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products, areas } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Package } from 'lucide-react';

export function CategoriesPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const categoryStats = categories.map((category) => {
    const categoryProducts = products.filter((p) => {
      const matchesCategory = p.category === category;
      const matchesArea = !selectedArea || p.area === selectedArea;
      return matchesCategory && matchesArea;
    });

    return {
      name: category,
      count: categoryProducts.length,
      products: categoryProducts.slice(0, 3),
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="section-heading mb-8">Browse by Category</h1>

        <div className="mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((category) => (
            <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl">{category.name}</h3>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {category.count} {category.count === 1 ? 'product' : 'products'} available
                  </p>

                  {category.products.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {category.products.map((product) => (
                        <img
                          key={product.id}
                          src={product.image}
                          alt={product.name}
                          className="w-full h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
