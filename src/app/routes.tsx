import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import { TopBanner } from '../components/layout/TopBanner';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../features/home/HomePage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { ShopPage } from '../features/shop/ShopPage';
import { ShopDetailPage } from '../features/shop/pages/ShopDetailPage';
import { ProductsPage } from '../features/product/pages/ProductsPage';
import { ProductDetailPage } from '../features/product/pages/ProductDetailPage';
import { PromotionsPage } from '../features/promotions/PromotionsPage';
import { CartPage } from '../features/cart/pages/CartPage';
import { CheckoutPage } from '../features/cart/pages/CheckoutPage';
import { OrderConfirmationPage } from '../features/cart/pages/OrderConfirmationPage';
import { OrdersPage } from '../features/cart/pages/OrdersPage';
import { PromotionDetailPage } from '../features/promotions/pages/PromotionDetailPage';
import { BlogPage } from '../features/blog/BlogPage';
import { BlogDetailPage } from '../features/blog/pages/BlogDetailPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { AdminOwnerPage } from '../features/admin-owner/AdminOwnerPage';
import { BusinessOwnerPage } from '../features/business-owner/BusinessOwnerPage';
import { CustomerDashboard } from '../features/customer/CustomerDashboard';

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'admin' | 'business' | 'business_owner' }) {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role) {
    if (role === 'business' && user?.role !== 'business_owner') {
      return <Navigate to="/" />;
    }
    if (role !== 'business' && user?.role !== role) {
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

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
          <Route path="/shops" element={<Layout><ShopPage /></Layout>} />
          <Route path="/shop/:id" element={<Layout><ShopDetailPage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
          <Route path="/order-confirmation" element={<Layout><OrderConfirmationPage /></Layout>} />
          <Route path="/orders" element={<Layout><OrdersPage /></Layout>} />
          <Route path="/promotions" element={<Layout><PromotionsPage /></Layout>} />
          <Route path="/promotion/:id" element={<Layout><PromotionDetailPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/blog/:id" element={<Layout><BlogDetailPage /></Layout>} />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminOwnerPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/business/dashboard"
            element={
              <ProtectedRoute role="business">
                <BusinessOwnerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business/products"
            element={
              <ProtectedRoute role="business">
                <BusinessOwnerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business/shops"
            element={
              <ProtectedRoute role="business">
                <BusinessOwnerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business/orders"
            element={
              <ProtectedRoute role="business">
                <BusinessOwnerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business/promotions"
            element={
              <ProtectedRoute role="business">
                <BusinessOwnerPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/customer/*"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}