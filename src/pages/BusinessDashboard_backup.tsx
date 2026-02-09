import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { businesses, products, promotions } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Package, Tag, Plus, TrendingUp, Store, ArrowUp, DollarSign, ShoppingCart, Eye, Calendar } from 'lucide-react';
import { BarChart, LineChart } from '../components/Charts';

export function BusinessDashboard() {
  const { user } = useAuth();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [dateRange, setDateRange] = useState('This Month');

  const userBusinesses = businesses.filter((b) => b.ownerId === user?.id);
  const userProducts = products.filter((p) => 
    userBusinesses.some((b) => b.id === p.businessId)
  );
  const userPromotions = promotions.filter((p) => 
    userBusinesses.some((b) => b.id === p.businessId)
  );

  const salesData = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 6 },
    { label: 'Thu', value: 12 },
    { label: 'Fri', value: 10 },
    { label: 'Sat', value: 15 },
    { label: 'Sun', value: 13 },
  ];

  const monthlyRevenue = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
  ];

  const categoryData = userProducts.reduce((acc, product) => {
    const existing = acc.find((item) => item.label === product.category);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ label: product.category, value: 1, color: '#3b82f6' });
    }
    return acc;
  }, [] as { label: string; value: number; color: string }[]);

  const stats = [
    { 
      label: 'Total Sales', 
      value: '230', 
      change: '+25%', 
      trend: 'up',
      subtitle: 'vs previous 30 days',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Revenue', 
      value: 'RWF 2.5M', 
      change: '+18%', 
      trend: 'up',
      subtitle: 'vs previous 30 days',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Products', 
      value: userProducts.length.toString(), 
      change: `${userProducts.length} active`, 
      trend: 'up',
      subtitle: 'in your catalog',
      icon: Package,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Page Views', 
      value: '12.4K', 
      change: '+32%', 
      trend: 'up',
      subtitle: 'vs previous 30 days',
      icon: Eye,
      color: 'from-orange-500 to-orange-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Business Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Monitor and manage your business performance</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-muted-foreground mb-2 block">Date Range</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-semibold text-sm"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-muted-foreground mb-2 block">Business</label>
            <select className="w-full bg-transparent border-none outline-none font-semibold text-sm">
              <option>All Businesses</option>
              {userBusinesses.map(b => <option key={b.id}>{b.name}</option>)}
            </select>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-muted-foreground mb-2 block">Category</label>
            <select className="w-full bg-transparent border-none outline-none font-semibold text-sm">
              <option>All Categories</option>
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Home & Kitchen</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="bg-white p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm font-semibold">
                      <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      {stat.change}
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.subtitle}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Monthly Revenue</h3>
                  <p className="text-sm text-muted-foreground">Last 6 months performance</p>
                </div>
              </div>
              <BarChart data={monthlyRevenue} title="" />
            </CardContent>
          </Card>

          {/* Sales Trend */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Weekly Sales</h3>
                  <p className="text-sm text-muted-foreground">Sales trend this week</p>
                </div>
              </div>
              <LineChart data={salesData} title="" />
            </CardContent>
          </Card>
        </div>

        {/* Products & Promotions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Products Section */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <h2 className="font-bold text-lg sm:text-xl">My Products</h2>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="shadow-md w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {showAddProduct && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 space-y-3">
                  <Input placeholder="Product name" className="bg-white" />
                  <Input placeholder="Price (RWF)" type="number" className="bg-white" />
                  <Input placeholder="Category" className="bg-white" />
                  <Button size="sm" className="w-full">Save Product</Button>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {userProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow border border-gray-100">
                    <img src={product.image} alt={product.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">{product.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">RWF {product.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                      In Stock
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Promotions Section */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <h2 className="font-bold text-lg sm:text-xl">My Promotions</h2>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddPromo(!showAddPromo)}
                  className="shadow-md w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Promotion
                </Button>
              </div>

              {showAddPromo && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 space-y-3">
                  <Input placeholder="Promotion title" className="bg-white" />
                  <Input placeholder="Discount %" type="number" className="bg-white" />
                  <Input placeholder="End date" type="date" className="bg-white" />
                  <Button size="sm" className="w-full">Save Promotion</Button>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {userPromotions.map((promo) => (
                  <div key={promo.id} className="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl hover:shadow-md transition-shadow border border-orange-100">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-sm sm:text-base flex-1 pr-2">{promo.title}</p>
                      <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        {promo.discount}% OFF
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{promo.description}</p>
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
