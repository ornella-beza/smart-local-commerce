import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { productService } from '../../product/services/product.service';
import { shopService } from '../../shop/services/shop.service';
import { promotionsService } from '../../promotions/services/promotions.service';
import { businessService } from '../../business-owner/services/business.service';
import { fetchAPI } from '../../../services/apiClient';
import { BusinessLayout } from '../../../components/shared/BusinessLayout';
import { AddProductModal } from '../../product/components/AddProductModal';
import { EditProductModal } from '../../product/components/EditProductModal';
import { AddShopModal } from '../../shop/components/AddShopModal';
import { EditShopModal } from '../../shop/components/EditShopModal';
import { AddPromotionModal } from '../../promotions/components/AddPromotionModal';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Package, 
  Store, 
  Tag, 
  Plus, 
  Edit, 
  Trash2,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { PieChart } from '../../../components/shared/EnhancedCharts';

interface Shop {
  _id: string;
  name: string;
  email: string;
  location: string;
  telephone?: string;
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
  seller?: string;
  location?: string;
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

interface Order {
  _id: string;
  user: { _id: string; name: string; email: string } | string;
  items: Array<{
    product: { _id: string; name: string; image?: string } | string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  shippingAddress?: string;
}

export function BusinessDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();
  
  // Determine active section from URL
  const getActiveSectionFromPath = (): 'dashboard' | 'shops' | 'products' | 'promotions' | 'orders' => {
    const path = location.pathname;
    if (path.includes('/shops')) return 'shops';
    if (path.includes('/products')) return 'products';
    if (path.includes('/promotions')) return 'promotions';
    if (path.includes('/orders')) return 'orders';
    return 'dashboard';
  };
  
  const [activeSection, setActiveSection] = useState<'dashboard' | 'shops' | 'products' | 'promotions' | 'orders'>(getActiveSectionFromPath());
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal states
  const [showAddProduct, setShowAddProduct] = useState(false);
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
      const [shopsData, productsData, promotionsData, ordersData] = await Promise.all([
        businessService.getMyShops().catch((err: any) => {
          // If it's an auth error, throw it so we can handle it
          if (err.message?.includes('Authentication') || err.message?.includes('401') || err.message?.includes('403')) {
            throw err;
          }
          // Otherwise return empty array
          return [];
        }),
        businessService.getMyProducts().catch((err: any) => {
          if (err.message?.includes('Authentication') || err.message?.includes('401') || err.message?.includes('403')) {
            throw err;
          }
          return [];
        }),
        businessService.getMyPromotions().catch((err: any) => {
          if (err.message?.includes('Authentication') || err.message?.includes('401') || err.message?.includes('403')) {
            throw err;
          }
          return [];
        }),
        fetchAPI('/orders').catch((err: any) => {
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
      setOrders(Array.isArray(ordersData) ? ordersData : []);
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
      await productService.deleteProduct(productId);
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
      await shopService.deleteShop(shopId);
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
      await promotionsService.deletePromotion(promotionId);
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


  const salesByArea = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 6 },
    { label: 'Thu', value: 12 },
    { label: 'Fri', value: 10 },
    { label: 'Sat', value: 15 },
    { label: 'Sun', value: 13 },
  ];

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

  const salesData = salesByArea;

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setError(null);
                    fetchData();
                  }}
                >
                  Retry
                </Button>
                {(error.includes('expired') || error.includes('Authentication') || error.includes('log in')) && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => {
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Shops</p>
                        <p className="text-3xl font-bold text-gray-900">{shops.length}</p>
                        <p className="text-sm text-green-600 mt-1">+2 this month</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Store className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Products</p>
                        <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                        <p className="text-sm text-green-600 mt-1">+{products.length} items</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Stock Value</p>
                        <p className="text-3xl font-bold text-gray-900">RWF {totalRevenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-1">Inventory value</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Active Promotions</p>
                        <p className="text-3xl font-bold text-gray-900">{promotions.filter(p => p.isActive).length}</p>
                        <p className="text-sm text-orange-600 mt-1">Live campaigns</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Tag className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Weekly Sales</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {salesData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
                            <div
                              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600 hover:to-blue-500"
                              style={{
                                height: `${(item.value / Math.max(...salesData.map(d => d.value))) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 mt-2">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <PieChart data={categoryData} title="Products by Category" />
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Shops Section */}
          {activeSection === 'dashboard' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Store className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">My Shops</h2>
                  <Badge>{shops.length}</Badge>
                </div>
              </div>

              {shops.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Store className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No shops yet.</p>
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
                        <p className="text-xs text-muted-foreground">{shop.email}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          )}

          {/* Shops Section */}
          {activeSection === 'shops' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Store className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">My Shops</h2>
                  <Badge>{shops.length}</Badge>
                </div>
                {activeSection === 'shops' && (
                  <Button onClick={() => setShowAddShop(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Shop
                  </Button>
                )}
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
                {activeSection === 'products' && (
                  <Button onClick={() => setShowAddProduct(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                )}
              </div>

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
            </CardContent>
          </Card>
          )}

          {/* Promotions Section */}
          {(activeSection === 'dashboard' || activeSection === 'promotions') && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Tag className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold">My Promotions</h2>
                  <Badge>{promotions.length}</Badge>
                </div>
                {activeSection === 'promotions' && (
                  <Button onClick={() => setShowAddPromotion(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Promotion
                  </Button>
                )}
              </div>

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
            </CardContent>
          </Card>
          )}

          {/* Orders Section */}
          {activeSection === 'orders' && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-green-500" />
                  <h2 className="text-2xl font-bold">Orders</h2>
                  <Badge>{orders.length}</Badge>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No orders yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Order ID</th>
                        <th className="text-left p-3">Customer</th>
                        <th className="text-left p-3">Items</th>
                        <th className="text-left p-3">Total</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const customerName = typeof order.user === 'object' ? order.user.name : 'N/A';
                        const customerEmail = typeof order.user === 'object' ? order.user.email : '';
                        const statusColors = {
                          pending: 'bg-yellow-100 text-yellow-800',
                          processing: 'bg-blue-100 text-blue-800',
                          completed: 'bg-green-100 text-green-800',
                          cancelled: 'bg-red-100 text-red-800'
                        };
                        
                        return (
                          <tr key={order._id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              <div className="font-mono text-sm">{order._id.slice(-8)}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold">{customerName}</div>
                              <div className="text-xs text-muted-foreground">{customerEmail}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">{order.items.length} item(s)</div>
                            </td>
                            <td className="p-3">
                              <div className="font-bold">RWF {order.totalAmount.toLocaleString()}</div>
                            </td>
                            <td className="p-3">
                              <Badge className={statusColors[order.status]}>
                                {order.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                              <div className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleTimeString()}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
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
          product={editingProduct ? {
            ...editingProduct,
            seller: editingProduct.seller || '',
            location: editingProduct.location || '',
            description: editingProduct.description || '',
          } : null}
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
          shop={editingShop ? {
            ...editingShop,
            telephone: editingShop.telephone || '',
            email: editingShop.email || '',
            description: editingShop.description || '',
          } : null}
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
