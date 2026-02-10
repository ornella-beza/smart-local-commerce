import { Phone, Truck, Globe } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="body-small hidden sm:inline">Need help? Call us: +250789323297</span>
            <span className="body-small sm:hidden">+250789323297</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="body-small font-medium">Free to visit over RWF 50,000</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="body-small">EN</span>
            </button>
            <span className="body-small text-muted-foreground">RWF</span>
            <span className="body-small">RWF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
