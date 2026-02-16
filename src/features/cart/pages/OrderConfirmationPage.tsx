import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { CheckCircle2, Package, Truck, CreditCard, MapPin, Phone } from 'lucide-react';
import { fetchAPI } from '../../../services/apiClient';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode?: string;
  };
  paymentMethod: string;
  createdAt: string;
}

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const orderId = location.state?.orderId;
    if (!orderId) {
      // For testing - create a mock order
      const mockOrder: Order = {
        _id: 'test-order-123',
        items: [
          {
            product: {
              _id: 'test-product-1',
              name: 'Test Product',
              price: 1000,
              image: '/placeholder-image.jpg'
            },
            quantity: 2,
            price: 1000
          }
        ],
        totalAmount: 2000,
        status: 'pending',
        shippingAddress: {
          fullName: 'Test User',
          phone: '+250 123 456 789',
          email: 'test@example.com',
          address: '123 Test Street',
          city: 'Kigali',
          postalCode: '12345'
        },
        paymentMethod: 'cash_on_delivery',
        createdAt: new Date().toISOString()
      };
      setOrder(mockOrder);
      setLoading(false);
      return;
    }

    fetchOrderDetails(orderId);
  }, [location.state, navigate]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await fetchAPI(`/orders/${orderId}`);
      setOrder(response);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!order) return;
    
    setConfirming(true);
    try {
      // Here you could add an API call to confirm the order if needed
      // For now, we'll just redirect to the orders page
      navigate('/orders');
    } catch (error) {
      console.error('Failed to confirm order:', error);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Order not found</p>
          <Button onClick={() => navigate('/cart')} className="mt-4">
            Back to Cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. Your order ID is: <span className="font-mono font-semibold">{order._id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Ordered Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={item.product.image || '/placeholder-image.jpg'}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm text-muted-foreground">Price per item: RWF {item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          RWF {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold">{order.shippingAddress.fullName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{order.shippingAddress.fullName}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {order.shippingAddress.address}, {order.shippingAddress.city}
                      {order.shippingAddress.postalCode && `, ${order.shippingAddress.postalCode}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span className="capitalize">{order.paymentMethod?.replace('_', ' ') || 'Cash on Delivery'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Status</span>
                    <span className="font-semibold capitalize bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">RWF {order.totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">RWF {order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Order placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Order ID: {order._id}</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleConfirmOrder}
                    className="w-full"
                    size="lg"
                    disabled={confirming}
                  >
                    {confirming ? 'Confirming...' : 'Confirm Order'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/products')}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/orders')}
                    className="w-full"
                  >
                    View My Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
