import { useState, useEffect } from 'react';
import { orderService } from '../services/order.service';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { 
  Package, 
  Calendar,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import type { Order } from '../types';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'shipped' | 'delivered'>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      const ordersList = Array.isArray(data) ? data : data.orders || [];
      // Sort by date (newest first)
      ordersList.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(ordersList);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      await orderService.cancelOrder(orderId);
      await fetchOrders();
    } catch (error: any) {
      alert(error.message || 'Failed to cancel order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Order Placed' },
      { key: 'processing', label: 'Processing' },
      { key: 'shipped', label: 'Shipped' },
      { key: 'delivered', label: 'Delivered' },
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage your orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All Orders ({orders.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
          size="sm"
        >
          Pending ({orders.filter(o => o.status === 'pending').length})
        </Button>
        <Button
          variant={filter === 'shipped' ? 'default' : 'outline'}
          onClick={() => setFilter('shipped')}
          size="sm"
        >
          Shipped ({orders.filter(o => o.status === 'shipped').length})
        </Button>
        <Button
          variant={filter === 'delivered' ? 'default' : 'outline'}
          onClick={() => setFilter('delivered')}
          size="sm"
        >
          Delivered ({orders.filter(o => o.status === 'delivered').length})
        </Button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            </h3>
            <p className="text-gray-600 mb-4">
              Start shopping to see your orders here
            </p>
            <Button onClick={() => window.location.href = '/customer/products'}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrder === order._id;
            const statusSteps = getStatusSteps(order.status);

            return (
              <Card key={order._id}>
                <CardHeader className="cursor-pointer" onClick={() => setExpandedOrder(isExpanded ? null : order._id)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">
                          Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                        </CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <Separator className="mb-6" />

                    {/* Order Status Progress */}
                    {order.status !== 'cancelled' && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Order Status</h4>
                        <div className="flex items-center justify-between relative">
                          {statusSteps.map((step, index) => (
                            <div key={step.key} className="flex flex-col items-center flex-1 relative">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  step.completed
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-400'
                                } relative z-10`}
                              >
                                {step.completed ? '✓' : index + 1}
                              </div>
                              <span className={`text-xs mt-2 text-center ${
                                step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                              }`}>
                                {step.label}
                              </span>
                              {index < statusSteps.length - 1 && (
                                <div
                                  className={`absolute top-5 left-1/2 w-full h-0.5 ${
                                    statusSteps[index + 1].completed ? 'bg-green-600' : 'bg-gray-200'
                                  }`}
                                  style={{ zIndex: 0 }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.status === 'cancelled' && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900">Order Cancelled</p>
                          <p className="text-sm text-red-700 mt-1">
                            This order was cancelled on {formatDate(order.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            {item.product.image && (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.product.name}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × {formatCurrency(item.product.price)}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(item.product.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}{order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ''}</p>
                          <p>{order.shippingAddress.phone}</p>
                          <p>{order.shippingAddress.email}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Payment Method
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {order.paymentMethod.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </Button>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
