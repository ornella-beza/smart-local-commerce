import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BusinessLayout } from '../components/BusinessLayout';
import { AddProductModal } from '../components/AddProductModal';
import { EditProductModal } from '../components/EditProductModal';
import { AddShopModal } from '../components/AddShopModal';
import { EditShopModal } from '../components/EditShopModal';
import { AddPromotionModal } from '../components/AddPromotionModal';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
<<<<<<< HEAD
import { Badge } from '../components/ui/badge';
import { 
  Package, 
  Store, 
  Tag, 
  Plus, 
  Edit, 
  Trash2,
  TrendingUp,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { StatCard, EnhancedBarChart as BarChart, PieChart } from '../components/EnhancedCharts';

interface Shop {
  _id: string;
  name: string;
  email: string;
  location: string;
  description?: string;
  image?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  category: { _id: string; name: string } | string;
  shop?: { _id: string; name: string } | string;
  stock?: number;
}

interface Promotion {
  _id: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  shop?: { _id: string; name: string } | string;
  endDate: string;
  bannerImage?: string;
  isActive?: boolean;
}

export function BusinessDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active section from URL
  const getActiveSectionFromPath = (): 'dashboard' | 'shops' | 'products' | 'promotions' => {
    const path = location.pathname;
    if (path.includes('/shops')) return 'shops';
    if (path.includes('/products')) return 'products';
    if (path.includes('/promotions')) return 'promotions';
    return 'dashboard';
  };
  
  const [activeSection, setActiveSection] = useState<'dashboard' | 'shops' | 'products' | 'promotions'>(getActiveSectionFromPath());
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal states
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddShop, setShowAddShop] = useState(false);
  const [showEditShop, setShowEditShop] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [showAddPromotion, setShowAddPromotion] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Update activeSection when URL changes
  useEffect(() => {
    const section = getActiveSectionFromPath();
    setActiveSection(section);
  }, [location.pathname]);

  useEffect(() => {
    // Simple check: if we have a token, try to fetch data
    const token = localStorage.getItem('token');
    
    if (authLoading) {
      // Still loading, wait
      return;
    }

    if (token) {
      // We have a token, try to fetch data
      fetchData();
    } else {
      // No token, show error
      setError('Please log in to access the business dashboard.');
      setLoading(false);
    }
  }, [authLoading]); // Only depend on authLoading to avoid infinite loops

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch data - if any call fails with auth error, we'll handle it
      const [shopsData, productsData, promotionsData] = await Promise.all([
        api.getMyShops().catch((err) => {
          // If it's an auth error, throw it so we can handle it
          if (err.message?.includes('Authentication') || err.message?.includes('401') || err.message?.includes('403')) {
            throw err;
          }
          // Otherwise return empty array
          return [];
        }),
        api.getMyProducts().catch((err) => {
          if (err.message?.includes('Authentication') || err.message?.includes('401') || err.message?.includes('403')) {
            throw err;
          }
          return [];
        }),
        api.getMyPromotions().catch((err) => {
          if (err.message?.includes('Authentication') || err.message?.includes('401') || err.message?.includes('403')) {
            throw err;
          }
          return [];
        }),
      ]);

      // Success - set the data
      setShops(Array.isArray(shopsData) ? shopsData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
      setPromotions(Array.isArray(promotionsData) ? promotionsData : []);
      setError(null); // Clear any errors
      
    } catch (error: any) {
      // Authentication error - clear token and show message
      const errorMessage = error.message || '';
      if (errorMessage.includes('Authentication') || errorMessage.includes('401') || errorMessage.includes('403')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Failed to load dashboard data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await api.deleteProduct(productId);
      setSuccessMessage('Product deleted successfully!');
      await fetchData();
      setDeleteConfirm(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to delete product');
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    try {
      await api.deleteShop(shopId);
      setSuccessMessage('Shop deleted successfully!');
      await fetchData();
      setDeleteConfirm(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to delete shop');
    }
  };

  const handleDeletePromotion = async (promotionId: string) => {
    try {
      await api.deletePromotion(promotionId);
      setSuccessMessage('Promotion deleted successfully!');
      await fetchData();
      setDeleteConfirm(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to delete promotion');
    }
  };

  // Statistics
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
  const categoryData = products.reduce((acc: { label: string; value: number; color: string }[], product) => {
    const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
    const existing = acc.find((item) => item.label === categoryName);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    if (existing) {
      existing.value++;
    } else {
      acc.push({ 
        label: categoryName, 
        value: 1,
        color: colors[acc.length % colors.length]
      });
    }
    return acc;
  }, []);

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

<<<<<<< HEAD
  if (authLoading || loading) {
    return (
      <BusinessLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading dashboard...</p>
        </div>
      </BusinessLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <BusinessLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold text-red-600 mb-4">Authentication Required</p>
            <p className="text-gray-600 mb-4">Please log in to access the business dashboard.</p>
            <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
          </div>
        </div>
      </BusinessLayout>
    );
  }

  return (
    <BusinessLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <p className="font-semibold mb-2">Error Loading Dashboard</p>
              <p className="mb-3">{error}</p>
              <div className="flex gap-3">
=======
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
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-semibold text-sm text-gray-900 cursor-pointer"
              >
                <option>All</option>
                <option>Products</option>
                <option>Promotions</option>
                <option>Orders</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <label className="text-xs text-gray-500 mb-2 block font-medium">Posts</label>
            <div className="flex items-center justify-between">
              <select
                value={selectedPost}
                onChange={(e) => setSelectedPost(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-semibold text-sm text-gray-900 cursor-pointer"
              >
                <option>All</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Scheduled</option>
              </select>
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
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
                <Button 
                  variant="outline" 
                  size="sm" 
<<<<<<< HEAD
                  onClick={() => {
                    setError(null);
                    fetchData();
                  }}
=======
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="bg-black hover:bg-gray-800"
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
                >
                  Retry
                </Button>
                {(error.includes('expired') || error.includes('Authentication') || error.includes('log in')) && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => {
                      // Clear auth data and redirect to login
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                  >
                    Log In Again
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
            <p className="text-muted-foreground">Manage your shops, products, and promotions</p>
          </div>

          {/* Dashboard Overview Section */}
          {activeSection === 'dashboard' && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  title="Total Shops"
                  value={shops.length.toString()}
                  icon={Store}
                  change="+2"
                  trend="up"
                  color="bg-blue-500"
                />
                <StatCard
                  title="Total Products"
                  value={products.length.toString()}
                  icon={Package}
                  change={`+${products.length}`}
                  trend="up"
                  color="bg-green-500"
                />
                <StatCard
                  title="Active Promotions"
                  value={promotions.filter(p => p.isActive).length.toString()}
                  icon={Tag}
                  change="Live"
                  trend="up"
                  color="bg-orange-500"
                />
                <StatCard
                  title="Total Stock Value"
                  value={`RWF ${totalRevenue.toLocaleString()}`}
                  icon={DollarSign}
                  color="bg-purple-500"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <BarChart data={salesData} title="Weekly Sales" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <PieChart data={categoryData} title="Products by Category" />
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Shops Section */}
          {(activeSection === 'dashboard' || activeSection === 'shops') && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Store className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">My Shops</h2>
                  <Badge>{shops.length}</Badge>
                </div>
                <Button onClick={() => setShowAddShop(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shop
                </Button>
              </div>

              {shops.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Store className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No shops yet. Create your first shop!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shops.map((shop) => (
                    <Card key={shop._id} className="overflow-hidden">
                      <div className="relative h-32 bg-muted">
                        {shop.image ? (
                          <img
                            src={shop.image}
                            alt={shop.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Store className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{shop.location}</p>
                        <p className="text-xs text-muted-foreground mb-4">{shop.email}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setEditingShop(shop);
                              setShowEditShop(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteConfirm(shop._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          )}

          {/* Products Section */}
          {(activeSection === 'dashboard' || activeSection === 'products') && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-green-500" />
                  <h2 className="text-2xl font-bold">My Products</h2>
                  <Badge>{products.length}</Badge>
                </div>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

<<<<<<< HEAD
              {products.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No products yet. Add your first product!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Image</th>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Category</th>
                        <th className="text-left p-3">Price</th>
                        <th className="text-left p-3">Stock</th>
                        <th className="text-right p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
                        return (
                          <tr key={product._id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = '<div class="w-16 h-16 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded">No Img</div>';
                                    }
                                  }}
                                />
                              ) : (
                                <div className="w-16 h-16 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded">
                                  No Img
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="font-semibold">{product.name}</div>
                              {product.description && (
                                <div className="text-sm text-muted-foreground line-clamp-1">
                                  {product.description}
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">{categoryName}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="font-bold">RWF {product.price.toLocaleString()}</div>
                              {product.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  RWF {product.originalPrice.toLocaleString()}
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <Badge variant={product.stock && product.stock > 0 ? 'default' : 'destructive'}>
                                {product.stock || 0}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setShowEditProduct(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setDeleteConfirm(product._id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
=======
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
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
            </CardContent>
          </Card>
          )}

          {/* Promotions Section */}
<<<<<<< HEAD
          {(activeSection === 'dashboard' || activeSection === 'promotions') && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Tag className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold">My Promotions</h2>
                  <Badge>{promotions.length}</Badge>
                </div>
                <Button onClick={() => setShowAddPromotion(true)}>
=======
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
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
                  <Plus className="w-4 h-4 mr-2" />
                  Add Promotion
                </Button>
              </div>

<<<<<<< HEAD
              {promotions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Tag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No promotions yet. Create your first promotion!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {promotions.map((promo) => {
                    const discountText = promo.discountType === 'percentage' 
                      ? `${promo.discountValue}% OFF` 
                      : `RWF ${promo.discountValue} OFF`;
                    const shopName = typeof promo.shop === 'object' ? promo.shop.name : 'N/A';
                    
                    return (
                      <Card key={promo._id} className="overflow-hidden">
                        {promo.bannerImage && (
                          <div className="h-32 bg-muted">
                            <img
                              src={promo.bannerImage}
                              alt={promo.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg flex-1">{promo.title}</h3>
                            <Badge variant="destructive">{discountText}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{promo.description}</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Shop: {shopName} | Until {new Date(promo.endDate).toLocaleDateString()}
                          </p>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => setDeleteConfirm(promo._id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
=======
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
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
            </CardContent>
          </Card>
          )}

          {/* Delete Confirmation Dialog */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="max-w-md w-full mx-4">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                  <p className="text-muted-foreground mb-6">
                    Are you sure you want to delete this item? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        // Determine what type of item to delete based on context
                        if (products.find(p => p._id === deleteConfirm)) {
                          handleDeleteProduct(deleteConfirm);
                        } else if (shops.find(s => s._id === deleteConfirm)) {
                          handleDeleteShop(deleteConfirm);
                        } else if (promotions.find(p => p._id === deleteConfirm)) {
                          handleDeletePromotion(deleteConfirm);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSuccess={() => {
          setShowAddProduct(false);
          setSuccessMessage('Product added successfully!');
          fetchData();
          setTimeout(() => setSuccessMessage(null), 3000);
        }}
      />

      {editingProduct && (
        <EditProductModal
          isOpen={showEditProduct}
          onClose={() => {
            setShowEditProduct(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setShowEditProduct(false);
            setEditingProduct(null);
            setSuccessMessage('Product updated successfully!');
            fetchData();
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
          product={editingProduct}
        />
      )}

      <AddShopModal
        isOpen={showAddShop}
        onClose={() => setShowAddShop(false)}
        onSuccess={() => {
          setShowAddShop(false);
          setSuccessMessage('Shop added successfully!');
          fetchData();
          setTimeout(() => setSuccessMessage(null), 3000);
        }}
      />

      {editingShop && (
        <EditShopModal
          isOpen={showEditShop}
          onClose={() => {
            setShowEditShop(false);
            setEditingShop(null);
          }}
          onSuccess={() => {
            setShowEditShop(false);
            setEditingShop(null);
            setSuccessMessage('Shop updated successfully!');
            fetchData();
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
          shop={editingShop}
        />
      )}

      <AddPromotionModal
        isOpen={showAddPromotion}
        onClose={() => setShowAddPromotion(false)}
        onSuccess={() => {
          setShowAddPromotion(false);
          setSuccessMessage('Promotion added successfully!');
          fetchData();
          setTimeout(() => setSuccessMessage(null), 3000);
        }}
      />
    </BusinessLayout>
  );
}
