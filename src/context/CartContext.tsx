import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    stock?: number;
  };
  quantity: number;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
  totalAmount: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cartData = await api.getCart();
      setCart(cartData);
    } catch (error: any) {
      // Silently handle cart fetch errors - user might not have a cart yet
      console.error('Failed to fetch cart:', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      throw new Error('Please log in to add items to cart');
    }

    try {
      const response = await api.addToCart(productId, quantity);
      if (response.cart) {
        setCart(response.cart);
      } else {
        await refreshCart();
      }
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      throw new Error('Please log in to update cart');
    }

    try {
      const response = await api.updateCartItem(productId, quantity);
      if (response.cart) {
        setCart(response.cart);
      } else {
        await refreshCart();
      }
    } catch (error: any) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!isAuthenticated) {
      throw new Error('Please log in to remove items from cart');
    }

    try {
      const response = await api.removeFromCart(productId);
      if (response.cart) {
        setCart(response.cart);
      } else {
        await refreshCart();
      }
    } catch (error: any) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await api.clearCart();
      await refreshCart();
    } catch (error: any) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalAmount = cart?.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount,
        totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
