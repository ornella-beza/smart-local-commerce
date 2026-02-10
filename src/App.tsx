import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TopBanner } from './components/TopBanner';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ShopsPage } from './pages/ShopsPage';
import { ShopDetailPage } from './pages/ShopDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PromotionDetailPage } from './pages/PromotionDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { BusinessDashboard } from './pages/BusinessDashboard';

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'admin' | 'business' | 'business_owner' }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role) {
    // Handle business role - allow both 'business' and 'business_owner'
    if (role === 'business') {
      if (user?.role !== 'business' && user?.role !== 'business_owner') {
        return <Navigate to="/" />;
      }
    } else if (user?.role !== role) {
      return <Navigate to="/" />;
    }
  }
  
  return <>{children}</>;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
          <Route path="/shops" element={<Layout><ShopsPage /></Layout>} />
          <Route path="/shop/:id" element={<Layout><ShopDetailPage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
          <Route path="/promotions" element={<Layout><PromotionsPage /></Layout>} />
          <Route path="/promotion/:id" element={<Layout><PromotionDetailPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/blog/:id" element={<Layout><BlogDetailPage /></Layout>} />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/business/dashboard/*"
            element={
              <ProtectedRoute role="business">
                <BusinessDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
