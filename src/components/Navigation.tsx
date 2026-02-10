import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { api } from '../services/api';
import { useState, useEffect } from 'react';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  
  // Safely get itemCount, default to 0 if cart context fails
  const cartItemCount = itemCount || 0;
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        const categoryNames = data.map((cat: any) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Fallback to empty array if API fails
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Shops', path: '/shops' },
    { label: 'Products', path: '/products' },
    { label: 'Promotions', path: '/promotions' },
    { label: 'Blog', path: '/blog' },
    { label: 'Categories', path: '#', hasDropdown: true },
  ];

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 py-3">
            {menuItems.map((item) => (
              <li key={item.label} className="relative flex-shrink-0">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button 
                      onClick={() => setShowCategories(!showCategories)}
                      className="flex items-center gap-1 hover:text-primary-foreground/80 transition-colors text-sm sm:body-normal"
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    {showCategories && (
<<<<<<< HEAD
                      <div className="absolute top-full left-0 mt-2 bg-white text-foreground rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                        {loading ? (
                          <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
                        ) : categories.length > 0 ? (
                          categories.map((cat) => (
                            <Link
                              key={cat}
                              to={`/products?category=${encodeURIComponent(cat)}`}
                              className="block px-4 py-2 hover:bg-muted text-sm"
                            >
                              {cat}
                            </Link>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-muted-foreground">No categories available</div>
                        )}
                      </div>
=======
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowCategories(false)}
                        />
                        <div className="absolute top-full left-0 mt-2 bg-white text-foreground rounded-lg shadow-2xl py-2 min-w-[240px] z-50 border border-gray-200">
                          {categories.map((cat) => (
                            <Link
                              key={cat}
                              to={`/products?category=${encodeURIComponent(cat)}`}
                              className="block px-4 py-2.5 hover:bg-gray-100 text-sm transition-colors text-gray-900 font-medium"
                              onClick={() => setShowCategories(false)}
                            >
                              {cat}
                            </Link>
                          ))}
                        </div>
                      </>
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
                    )}
                  </div>
                ) : (
                  <Link to={item.path} className="hover:text-primary-foreground/80 transition-colors text-sm sm:body-normal">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/cart"
              className="relative hover:text-primary-foreground/80 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
            {isAuthenticated && (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="hover:text-primary-foreground/80 transition-colors body-normal whitespace-nowrap">
                    Admin Dashboard
                  </Link>
                )}
                {(user?.role === 'business' || user?.role === 'business_owner') && (
                  <Link to="/business/dashboard" className="hover:text-primary-foreground/80 transition-colors body-normal whitespace-nowrap">
                    My Dashboard
                  </Link>
                )}
                <span className="text-sm">Hi, {user?.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-primary-foreground hover:text-primary-foreground/80"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Cart Icon */}
          <div className="md:hidden flex items-center">
            <Link
              to="/cart"
              className="relative p-2 hover:text-primary-foreground/80 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
