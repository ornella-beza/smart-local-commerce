export function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}