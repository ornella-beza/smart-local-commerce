import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../../../components/layout/AdminLayout';
import { AddProductModal } from '../../product/components/AddProductModal';
import { EditProductModal } from '../../product/components/EditProductModal';
import { AddShopModal } from '../../shop/components/AddShopModal';
import { EditShopModal } from '../../shop/components/EditShopModal';
import { AddPromotionModal } from '../../promotions/components/AddPromotionModal';
import { AddCategoryModal } from '../../categories/components/AddCategoryModal';
import { EditCategoryModal } from '../../categories/components/EditCategoryModal';
import { EditUserModal } from '../components/EditUserModal';
import { productService } from '../../product/services/product.service';
import { categoriesService } from '../../categories/services/categories.service';
import { adminService } from '../services/admin.service';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {
  Store,
  Package,
  Tag,
  Activity,
} from 'lucide-react';
import {
  EnhancedBarChart,
  EnhancedLineChart,
  PieChart,
  StatCard,
} from '../../../components/shared/EnhancedCharts';

interface Shop {
  _id: string;
  name: string;
  image?: string;
  location: string;
  email?: string;
  telephone?: string;
  description?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: { _id: string; name: string } | string | null;
  image?: string;
  stock?: number;
  shop?: Shop | string;
  seller?: string;
  location?: string;
  description?: string;
  originalPrice?: number;
}

interface Promotion {
  _id: string;
  title: string;
  description?: string;
  discount?: number;
  shop?: Shop | string;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
}

function DashboardOverview() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [shopsData, productsData, promotionsData] = await Promise.all([
          adminService.getAllShops(),
          adminService.getAllProducts(),
          adminService.getAllPromotions(),
        ]);

        // Filter out null/undefined items and ensure arrays
        const validShops = Array.isArray(shopsData) ? shopsData.filter(s => s !== null && s !== undefined) : [];
        const validProducts = Array.isArray(productsData) ? productsData.filter(p => p !== null && p !== undefined) : [];
        const validPromotions = Array.isArray(promotionsData) ? promotionsData.filter(pr => pr !== null && pr !== undefined) : [];
        
        setShops(validShops);
        setProducts(validProducts);
        setPromotions(validPromotions);
      } catch (error: any) {
        console.error('Failed to fetch dashboard data:', error);
        setError(error.message || 'Failed to fetch dashboard data. Please make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 max-w-2xl">
          <div className="text-red-600 mb-2 font-semibold">Connection Error</div>
          <div className="text-gray-700 mb-4">{error}</div>
          <div className="text-sm text-gray-600">
            <p className="mb-2">To start the backend server:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open a terminal in the <code className="bg-gray-100 px-1 rounded">Backend/local-ecommerce-bn</code> directory</li>
              <li>Run <code className="bg-gray-100 px-1 rounded">npm run dev</code></li>
              <li>Make sure MongoDB is running</li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </Card>
      </div>
    );
  }

  // Calculate statistics
  const lowStockProducts = products.filter((p) => (p.stock || 0) < 10).length;

  // Category distribution
  const categoryData = products.reduce((acc: { label: string; value: number; color: string }[], product) => {
    const categoryName = typeof product.category === 'object' && product.category ? product.category.name : 'Unknown';
    const existing = acc.find((item) => item.label === categoryName);
    if (existing) {
      existing.value++;
    } else {
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
      acc.push({
        label: categoryName,
        value: 1,
        color: colors[acc.length % colors.length],
      });
    }
    return acc;
  }, []);

  // Weekly activity data (mock for now)
  const weeklyData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 25 },
    { label: 'Fri', value: 22 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 28 },
  ];

  // Top shops by products
  const shopProductCount = shops
    .filter((shop) => shop !== null && shop !== undefined && shop.name)
    .map((shop) => {
      const count = products.filter((p) => {
        if (!p || !p.shop) return false;
        const shopId = typeof p.shop === 'object' && p.shop !== null ? p.shop._id : p.shop;
        return shopId === shop._id;
      }).length;
      return { label: shop.name, value: count, color: '#3b82f6' };
    })
    .filter((s) => s.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your platform performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Shops"
          value={shops.length}
          change="+12%"
          trend="up"
          icon={Store}
          color="bg-gray-900"
        />
        <StatCard
          title="Total Products"
          value={products.length}
          change="+8%"
          trend="up"
          icon={Package}
          color="bg-gray-900"
        />
        <StatCard
          title="Active Promotions"
          value={promotions.length}
          change="+5%"
          trend="up"
          icon={Tag}
          color="bg-gray-900"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockProducts}
          change="Attention"
          trend="down"
          icon={Activity}
          color="bg-gray-900"
        />
        </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <EnhancedLineChart data={weeklyData} title="Weekly Activity" color="#3b82f6" />
        </Card>
        <Card className="p-6">
          <EnhancedBarChart data={categoryData} title="Products by Category" />
        </Card>
                    </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Recent Shops</h3>
          <div className="space-y-3">
            {shops.slice(0, 5).map((shop) => (
              <div
                key={shop._id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {shop.image && (
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{shop.name}</p>
                  <p className="text-sm text-gray-600">{shop.location}</p>
                  </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Active
                </span>
                </div>
          ))}
        </div>
          </Card>

        <Card className="p-6">
          <PieChart data={shopProductCount.slice(0, 5)} title="Top Shops" />
        </Card>
      </div>
    </div>
  );
}

function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await adminService.getAllUsers();
        // Filter out null/undefined items
        const validUsers = Array.isArray(usersData) ? usersData.filter(u => u !== null && u !== undefined) : [];
        setUsers(validUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const refreshUsers = async () => {
    try {
      const usersData = await adminService.getAllUsers();
      const validUsers = Array.isArray(usersData) ? usersData.filter(u => u !== null && u !== undefined) : [];
      setUsers(validUsers);
    } catch (error) {
      console.error('Failed to refresh users:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage all platform users</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'business_owner' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.createdAt}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSuccess={() => {
          setSuccessMessage('User updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          // Refresh users list
          refreshUsers();
        }}
        user={selectedUser}
      />
    </div>
  );
}

function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const shopsData = await adminService.getAllShops();
      setShops(shopsData);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading shops...</div>;
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Management</h1>
          <p className="text-gray-600">Manage all registered shops</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Add Shop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <Card key={shop._id} className="p-6 hover:shadow-lg transition-shadow">
            {shop.image && (
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{shop.location}</p>
            {shop.email && <p className="text-sm text-gray-600 mb-1">{shop.email}</p>}
            {shop.telephone && <p className="text-sm text-gray-600 mb-4">{shop.telephone}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedShop(shop);
                  setIsEditModalOpen(true);
                }}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
              >
                Edit
              </button>
            </div>
          </Card>
                ))}
              </div>

      <AddShopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage('Shop created successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          setTimeout(() => {
            fetchShops();
          }, 500);
        }}
      />

      <EditShopModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedShop(null);
        }}
        onSuccess={() => {
          setSuccessMessage('Shop updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          setTimeout(() => {
            fetchShops();
          }, 500);
        }}
        shop={selectedShop ? {
          ...selectedShop,
          telephone: selectedShop.telephone || '',
          email: selectedShop.email || '',
          description: selectedShop.description || '',
        } : null}
      />
    </div>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await adminService.getAllProducts();
      console.log('Fetched products:', productsData.length, 'products');
      // Sort by newest first (backend should already do this, but ensure it)
      const sortedProducts = [...productsData].sort((a, b) => {
        const dateA = new Date((a as any).createdAt || 0).getTime();
        const dateB = new Date((b as any).createdAt || 0).getTime();
        return dateB - dateA;
      });
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage all products in the platform</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No products found. Click "Add Product" to create your first product.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const categoryName = typeof product.category === 'object' && product.category ? product.category.name : 'Unknown';
                  return (
                    <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                              onError={(e) => {
                                // Fallback if image fails to load - hide the image
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                              No Img
                            </div>
                          )}
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{categoryName}</td>
                      <td className="py-3 px-4 font-semibold">RWF {product.price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          (product.stock || 0) < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {product.stock || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
          </Card>

      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {successMessage}
              </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (!deleteConfirm) return;
                  
                  const productIdToDelete = deleteConfirm; // Store ID before clearing state
                  setDeleteConfirm(null); // Close dialog first
                  
                  try {
                    const result = await productService.deleteProduct(productIdToDelete);
                    console.log('Delete result:', result);
                    setSuccessMessage(result.message || 'Product deleted successfully!');
                    setTimeout(() => setSuccessMessage(null), 3000);
                    // Refresh products list
                    await fetchProducts();
                  } catch (error: any) {
                    console.error('Failed to delete product:', error);
                    setSuccessMessage(error.message || 'Failed to delete product');
                    setTimeout(() => setSuccessMessage(null), 3000);
                  }
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage('Product created successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          // Force refresh with a small delay to ensure backend has processed
          setTimeout(() => {
            fetchProducts();
          }, 500);
        }}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={() => {
          setSuccessMessage('Product updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          // Refresh products list after a short delay
          setTimeout(() => {
            fetchProducts();
          }, 500);
        }}
        product={selectedProduct ? {
          ...selectedProduct,
          seller: selectedProduct.seller || '',
          location: selectedProduct.location || '',
          description: selectedProduct.description || '',
        } : null}
      />
    </div>
  );
}

function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const promotionsData = await adminService.getAllPromotions();
      setPromotions(promotionsData);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading promotions...</div>;
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Promotion Management</h1>
          <p className="text-gray-600">Manage all active promotions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Promotion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Card key={promo._id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Tag className="w-8 h-8 text-orange-500" />
              {promo.discount && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                  {promo.discount}% OFF
                </span>
              )}
                    </div>
            <h3 className="font-bold text-lg mb-2">{promo.title}</h3>
            {promo.description && <p className="text-sm text-gray-600 mb-4">{promo.description}</p>}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
                View
              </button>
                  </div>
          </Card>
        ))}
      </div>

      <AddPromotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage('Promotion created successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          setTimeout(() => {
            fetchPromotions();
          }, 500);
        }}
      />
    </div>
  );
}

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await adminService.getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading categories...</div>;
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
          <p className="text-gray-600">Manage product categories</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No categories found. Click "Add Category" to create your first category.
          </div>
        ) : (
          categories.map((category) => (
            <Card key={category._id} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              {category.description && <p className="text-sm text-gray-600 mb-4">{category.description}</p>}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsEditModalOpen(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(category._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
              Products in this category will need to be reassigned.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!deleteConfirm) return;
                  
                  const categoryIdToDelete = deleteConfirm;
                  setDeleteConfirm(null);
                  
                  try {
                    await categoriesService.deleteCategory(categoryIdToDelete);
                    setSuccessMessage('Category deleted successfully!');
                    setTimeout(() => setSuccessMessage(null), 3000);
                    await fetchCategories();
                  } catch (error: any) {
                    console.error('Failed to delete category:', error);
                    setSuccessMessage(error.message || 'Failed to delete category');
                    setTimeout(() => setSuccessMessage(null), 3000);
                  }
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage('Category created successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          setTimeout(() => {
            fetchCategories();
          }, 500);
        }}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSuccess={() => {
          setSuccessMessage('Category updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          setTimeout(() => {
            fetchCategories();
          }, 500);
        }}
        category={selectedCategory}
      />
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure platform settings</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              defaultValue="Smart Local Commerce"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
            <input
              type="email"
              defaultValue="admin@niceshop.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </Card>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="shops" element={<ShopsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
}
