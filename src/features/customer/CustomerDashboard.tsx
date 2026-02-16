import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '../../components/shared/CustomerLayout';
import { DashboardHome } from './pages/DashboardHome';
import { ProfileSettings } from './pages/ProfileSettings';
import { ExploreShops } from './pages/ExploreShops';
import { ExploreProducts } from './pages/ExploreProducts';
import { Orders } from './pages/Orders';

export function CustomerDashboard() {
  return (
    <CustomerLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="shops" element={<ExploreShops />} />
        <Route path="products" element={<ExploreProducts />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </CustomerLayout>
  );
}
