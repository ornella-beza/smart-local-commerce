import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { businesses, products, promotions } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Package, Tag, Plus, TrendingUp, Store } from 'lucide-react';

export function BusinessDashboard() {
  const { user } = useAuth();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddPromo, setShowAddPromo] = useState(false);

  const userBusinesses = businesses.filter((b) => b.ownerId === user?.id);
  const userProducts = products.filter((p) => 
    userBusinesses.some((b) => b.id === p.businessId)
  );
  const userPromotions = promotions.filter((p) => 
    userBusinesses.some((b) => b.id === p.businessId)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Business Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and promotions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Store className="w-8 h-8" />
                  <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                    Active
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-1">My Businesses</p>
                <p className="text-4xl font-bold">{userBusinesses.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-8 h-8" />
                  <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                    +{userProducts.length}
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-1">Total Products</p>
                <p className="text-4xl font-bold">{userProducts.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Tag className="w-8 h-8" />
                  <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                    Live
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-1">Active Promotions</p>
                <p className="text-4xl font-bold">{userPromotions.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-500" />
                  <h2 className="font-bold text-xl">My Products</h2>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {showAddProduct && (
                <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 space-y-3">
                  <Input placeholder="Product name" className="bg-white" />
                  <Input placeholder="Price (RWF)" type="number" className="bg-white" />
                  <Input placeholder="Category" className="bg-white" />
                  <Button size="sm" className="w-full">Save Product</Button>
                </div>
              )}

              <div className="space-y-3">
                {userProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">RWF {product.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      In Stock
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-xl">My Promotions</h2>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddPromo(!showAddPromo)}
                  className="shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Promotion
                </Button>
              </div>

              {showAddPromo && (
                <div className="mb-6 p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 space-y-3">
                  <Input placeholder="Promotion title" className="bg-white" />
                  <Input placeholder="Discount %" type="number" className="bg-white" />
                  <Input placeholder="End date" type="date" className="bg-white" />
                  <Button size="sm" className="w-full">Save Promotion</Button>
                </div>
              )}

              <div className="space-y-3">
                {userPromotions.map((promo) => (
                  <div key={promo.id} className="p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl hover:shadow-md transition-shadow border border-orange-100">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold flex-1">{promo.title}</p>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {promo.discount}% OFF
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{promo.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      <span>Valid until {new Date(promo.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
