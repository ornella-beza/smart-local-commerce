import { businesses, products, promotions } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Store, Package, Tag, Users, TrendingUp, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, LineChart } from '../components/Charts';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Businesses', value: businesses.length, icon: Store, color: 'bg-gradient-to-br from-blue-500 to-blue-600', change: '+12%', trend: 'up' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-gradient-to-br from-green-500 to-green-600', change: '+8%', trend: 'up' },
    { label: 'Active Promotions', value: promotions.length, icon: Tag, color: 'bg-gradient-to-br from-orange-500 to-orange-600', change: '+5%', trend: 'up' },
    { label: 'Business Owners', value: 2, icon: Users, color: 'bg-gradient-to-br from-purple-500 to-purple-600', change: '+2', trend: 'up' },
  ];

  const categoryData = [
    { label: 'Electronics', value: 2, color: '#3b82f6' },
    { label: 'Fashion', value: 4, color: '#10b981' },
    { label: 'Food & Beverages', value: 2, color: '#f59e0b' },
  ];

  const salesData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 25 },
    { label: 'Fri', value: 22 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 28 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Monitor and manage your platform</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className={`${stat.color} p-4 sm:p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <LineChart data={salesData} title="Weekly Activity" />
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <BarChart data={categoryData} title="Products by Category" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="font-bold text-lg sm:text-xl">Recent Businesses</h2>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <div className="space-y-3">
                {businesses.slice(0, 5).map((business) => (
                  <div key={business.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                    <img src={business.logo} alt={business.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">{business.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                        <Store className="w-3 h-3" />
                        {business.area}
                      </p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                      Active
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="font-bold text-lg sm:text-xl">Recent Products</h2>
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                    <img src={product.image} alt={product.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        RWF {product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full font-semibold whitespace-nowrap">
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
