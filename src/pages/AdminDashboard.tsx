import { businesses, products, promotions } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Store, Package, Tag, Users, TrendingUp, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Businesses', value: businesses.length, icon: Store, color: 'bg-gradient-to-br from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-gradient-to-br from-green-500 to-green-600', change: '+8%' },
    { label: 'Active Promotions', value: promotions.length, icon: Tag, color: 'bg-gradient-to-br from-orange-500 to-orange-600', change: '+5%' },
    { label: 'Business Owners', value: 2, icon: Users, color: 'bg-gradient-to-br from-purple-500 to-purple-600', change: '+2' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className={`${stat.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8" />
                    <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl">Recent Businesses</h2>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-3">
                {businesses.slice(0, 5).map((business) => (
                  <div key={business.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                    <img src={business.logo} alt={business.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <p className="font-semibold">{business.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Store className="w-3 h-3" />
                        {business.area}
                      </p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      Active
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl">Recent Products</h2>
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                    <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        RWF {product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                      {product.category}
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
