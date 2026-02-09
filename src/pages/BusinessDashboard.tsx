import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { businesses, products, promotions } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Package, Tag, Plus, Calendar, ChevronDown, Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { BarChart, LineChart } from '../components/Charts';
import { DonutChart } from '../components/DonutChart';

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

  const monthlyRevenue = [
    { label: 'Jan-Feb', value: 11500 },
    { label: 'Mar-Apr', value: 13200 },
    { label: 'May-Jun', value: 11000 },
    { label: 'Jul-Aug', value: 12400 },
    { label: 'Sep-Oct', value: 9800 },
    { label: 'Nov-Dec', value: 5900 },
  ];

  const salesByArea = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 6 },
    { label: 'Thu', value: 12 },
    { label: 'Fri', value: 10 },
    { label: 'Sat', value: 15 },
    { label: 'Sun', value: 13 },
  ];

  const trafficSources = [
    { label: 'Direct', value: 45, color: '#3b82f6' },
    { label: 'Organic Search', value: 35, color: '#10b981' },
    { label: 'Referral', value: 12, color: '#f59e0b' },
    { label: 'Social', value: 8, color: '#8b5cf6' },
  ];

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    alert(`Exporting dashboard data as ${format.toUpperCase()}...`);
    // Implementation would go here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header with Export Buttons */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
            <p className="text-gray-600">Monitor your business performance and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('pdf')}
              className="bg-white hover:bg-gray-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('csv')}
              className="bg-white hover:bg-gray-50"
            >
              <File className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('excel')}
              className="bg-white hover:bg-gray-50"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-gray-500 mb-2 block font-medium">Auto date range</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-semibold text-sm text-gray-900"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-gray-500 mb-2 block font-medium">Services</label>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-gray-900">All</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-gray-500 mb-2 block font-medium">Posts</label>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-gray-900">All</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* New Sales */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4 font-medium">New Sales</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">230</div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <span>↑ 25%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">vs previous 30 days</p>
            </CardContent>
          </Card>

          {/* Conversion Rate */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4 font-medium">Conversion Rate</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                9.86<span className="text-3xl">%</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <span>↑ 25%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">vs previous 30 days</p>
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4 font-medium">New Revenue</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                <span className="text-3xl">RWF</span>25,690
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <span>↑ 8.7%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">vs previous 30 days</p>
            </CardContent>
          </Card>

          {/* Page Views - Donut Chart */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4 font-medium">Page Views</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="20"
                    strokeDasharray="175 251"
                    strokeLinecap="round"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="20"
                    strokeDasharray="75 251"
                    strokeDashoffset="-175"
                    strokeLinecap="round"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="20"
                    strokeDasharray="25 251"
                    strokeDashoffset="-250"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="mt-4 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Organic Search</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Direct</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-600">Referral</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Sales by Area */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-6 font-medium">Sales by Area</h3>
              <div className="h-64">
                <LineChart data={salesByArea} title="" />
              </div>
            </CardContent>
          </Card>

          {/* Monthly Revenue */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-6 font-medium">Revenue (RWF)</h3>
              <div className="h-64">
                <BarChart data={monthlyRevenue} title="" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products & Promotions Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Products Section */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-lg">My Products</h2>
                  <span className="text-sm text-gray-500">({userProducts.length})</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="bg-black hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {showAddProduct && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-3">
                  <Input placeholder="Product name" className="bg-white" />
                  <Input placeholder="Price (RWF)" type="number" className="bg-white" />
                  <Input placeholder="Category" className="bg-white" />
                  <Button size="sm" className="w-full bg-black hover:bg-gray-800">Save Product</Button>
                </div>
              )}

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {userProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{product.name}</p>
                      <p className="text-sm text-gray-600">RWF {product.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      In Stock
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Promotions Section */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-600" />
                  <h2 className="font-bold text-lg">Active Promotions</h2>
                  <span className="text-sm text-gray-500">({userPromotions.length})</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddPromo(!showAddPromo)}
                  className="bg-black hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Promotion
                </Button>
              </div>

              {showAddPromo && (
                <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100 space-y-3">
                  <Input placeholder="Promotion title" className="bg-white" />
                  <Input placeholder="Discount %" type="number" className="bg-white" />
                  <Input placeholder="End date" type="date" className="bg-white" />
                  <Button size="sm" className="w-full bg-black hover:bg-gray-800">Save Promotion</Button>
                </div>
              )}

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {userPromotions.map((promo) => (
                  <div key={promo.id} className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-sm flex-1">{promo.title}</p>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {promo.discount}% OFF
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{promo.description}</p>
                    <p className="text-xs text-gray-500">Valid until {new Date(promo.endDate).toLocaleDateString()}</p>
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
