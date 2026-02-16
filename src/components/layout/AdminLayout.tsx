import { AdminSidebar } from '../shared/AdminSidebar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64 p-4 sm:p-6 lg:pr-8 lg:pl-0">
        {children}
      </main>
    </div>
  );
}
