import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your cart.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/login')}>Log In</Button>
              <Button variant="outline" onClick={() => navigate('/register')}>Sign Up</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <Link to="/products" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start adding some products to your cart!</p>
              <Button onClick={() => navigate('/products')}>Browse Products</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdating(productId);
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error: any) {
      alert(error.message || 'Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (productId: string) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      setUpdating(productId);
      try {
        await removeFromCart(productId);
      } catch (error: any) {
        alert(error.message || 'Failed to remove item');
      } finally {
        setUpdating(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <Link to="/products" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item: any) => (
              <Card key={item.product._id} className="animate-fade-in-up">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={`/product/${item.product._id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image || '/placeholder-image.jpg'}
                        alt={item.product.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full sm:w-32 h-32 bg-muted flex items-center justify-center text-muted-foreground text-xs rounded-lg">No Image</div>';
                          }
                        }}
                      />
                    </Link>

                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <Link to={`/product/${item.product._id}`}>
                          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-primary">
                            RWF {item.product.price.toLocaleString()}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-muted-foreground line-through">
                              RWF {item.product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {item.product.stock !== undefined && (
                          <p className="text-sm text-muted-foreground">
                            Stock: {item.product.stock}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            disabled={updating === item.product._id || item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            disabled={updating === item.product._id || (item.product.stock !== undefined && item.quantity >= item.product.stock)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.product._id)}
                          disabled={updating === item.product._id}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-lg font-bold">
                      RWF {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">RWF {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">RWF {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <Link to="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
