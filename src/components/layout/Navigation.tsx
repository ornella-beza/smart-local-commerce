import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { categoriesService } from '../../features/categories/services/categories.service';
import { useState, useEffect } from 'react';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  
  const cartItemCount = itemCount || 0;
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getCategories();
        const categoryNames = data.map((cat: any) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
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
    setShowMobileMenu(false);
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 py-3">
            {menuItems.map((item) => (
              <li key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button 
                      onClick={() => setShowCategories(!showCategories)}
                      className="flex items-center gap-1 hover:text-primary-foreground/80 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showCategories && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowCategories(false)} />
                        <div className="absolute top-full left-0 mt-2 bg-white text-foreground rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                          {loading ? (
                            <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
                          ) : categories.length > 0 ? (
                            categories.map((cat) => (
                              <Link
                                key={cat}
                                to={`/products?category=${encodeURIComponent(cat)}`}
                                className="block px-4 py-2 hover:bg-muted text-sm"
                                onClick={() => setShowCategories(false)}
                              >
                                {cat}
                              </Link>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-muted-foreground">No categories</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link to={item.path} className="hover:text-primary-foreground/80 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/cart" className="relative hover:text-primary-foreground/80 transition-colors">
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
                  <Link to="/admin/dashboard" className="hover:text-primary-foreground/80 transition-colors whitespace-nowrap">
                    Admin
                  </Link>
                )}
                {user?.role === 'business_owner' && (
                  <Link to="/business/dashboard" className="hover:text-primary-foreground/80 transition-colors whitespace-nowrap">
                    Dashboard
                  </Link>
                )}
                <span className="text-sm">Hi, {user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:text-primary-foreground/80">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <Link to="/cart" className="relative p-2 hover:text-primary-foreground/80 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {showMobileMenu && (
          <div className="lg:hidden border-t border-primary-foreground/20 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button 
                        onClick={() => setShowCategories(!showCategories)}
                        className="flex items-center justify-between w-full py-2 hover:text-primary-foreground/80 transition-colors"
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {showCategories && (
                        <div className="pl-4 mt-2 space-y-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat}
                              to={`/products?category=${encodeURIComponent(cat)}`}
                              className="block py-1 text-sm hover:text-primary-foreground/80"
                              onClick={() => {
                                setShowCategories(false);
                                setShowMobileMenu(false);
                              }}
                            >
                              {cat}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={item.path} 
                      className="block py-2 hover:text-primary-foreground/80 transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              {isAuthenticated && (
                <>
                  {user?.role === 'admin' && (
                    <li>
                      <Link 
                        to="/admin/dashboard" 
                        className="block py-2 hover:text-primary-foreground/80 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {user?.role === 'business_owner' && (
                    <li>
                      <Link 
                        to="/business/dashboard" 
                        className="block py-2 hover:text-primary-foreground/80 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        My Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="pt-2 border-t border-primary-foreground/20">
                    <span className="block py-1 text-sm">Hi, {user?.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 py-2 hover:text-primary-foreground/80 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
