import { Phone, Truck, Globe } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-xs">
          <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span className="hidden md:inline">Need help? Call us: +250789323297</span>
            <span className="md:hidden">+250789323297</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
            <Truck className="w-3 h-3 text-orange-500" />
            <span className="font-medium">Free to visit over RWF 50,000</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Globe className="w-3 h-3" />
              <span>EN</span>
            </button>
            <span className="text-muted-foreground">RWF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
