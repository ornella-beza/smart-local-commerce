import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Shirt, Laptop, UtensilsCrossed, Sparkles, Dumbbell, BookOpen, Gamepad } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { categories } from '../data/mockData';
import { useState } from 'react';

const categoryIcons: Record<string, any> = {
  'Clothing': Shirt,
  'Electronics': Laptop,
  'Home & Kitchen': UtensilsCrossed,
  'Beauty & Personal Care': Sparkles,
  'Sports & Outdoors': Dumbbell,
  'Books': BookOpen,
  'Toys & Games': Gamepad,
};

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Shops', path: '/shops' },
    { label: 'Products', path: '/products' },
    { label: 'Promotions', path: '/promotions' },
    { label: 'Categories', path: '#', hasDropdown: true },
  ];

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-4 sm:gap-8 py-3">
            {menuItems.map((item) => (
              <li key={item.label} className="relative whitespace-nowrap">
                {item.hasDropdown ? (
                  <div>
                    <button 
                      onClick={() => setShowCategories(!showCategories)}
                      className="flex items-center gap-1 hover:text-primary-foreground/80 transition-colors text-sm sm:body-normal"
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    {showCategories && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowCategories(false)}
                        />
                        <div className="absolute top-full left-0 mt-2 bg-white text-foreground rounded-lg shadow-lg py-2 min-w-[240px] z-50">
                          {categories.map((cat) => {
                            const Icon = categoryIcons[cat];
                            return (
                              <Link
                                key={cat}
                                to={`/products?category=${encodeURIComponent(cat)}`}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted text-sm transition-colors"
                                onClick={() => setShowCategories(false)}
                              >
                                {Icon && <Icon className="w-4 h-4" />}
                                <span>{cat}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link to={item.path!} className="hover:text-primary-foreground/80 transition-colors text-sm sm:body-normal">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="hover:text-primary-foreground/80 transition-colors body-normal">
                    Admin Dashboard
                  </Link>
                )}
                {user?.role === 'business' && (
                  <Link to="/business/dashboard" className="hover:text-primary-foreground/80 transition-colors body-normal">
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
        </div>
      </div>
    </nav>
  );
}
