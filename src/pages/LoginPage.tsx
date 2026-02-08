import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Home, Mail, Lock, ShoppingBag } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">NiceShop</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Local Commerce Platform</p>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Welcome back to your
              <span className="text-primary"> local marketplace</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Connect with local businesses, discover amazing products, and support your community.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Local Shops</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl border-0">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Welcome Back</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Sign in to continue shopping</p>
              </div>
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 sm:pl-11 h-11 sm:h-12"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 sm:pl-11 h-11 sm:h-12"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold">
                Sign In
              </Button>
            </form>

            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
