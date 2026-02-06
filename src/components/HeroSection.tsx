import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <div className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div>
            <h1 className="hero-heading mb-6">
              Discover Local Businesses
            </h1>
            
            <p className="body-large text-muted-foreground mb-8 max-w-xl">
              Find products and promotions from local shops in your area. Support local businesses and discover amazing deals near you.
            </p>
            
            <div className="flex gap-4 mb-12">
              <Link to="/shops">
                <Button size="lg" className="h-12 px-8 text-base">
                  Shops
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Browse Products
                </Button>
              </Link>
            </div>
            
            {/* Feature Icons */}
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold body-normal">Free to visit</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold body-normal">Quality Guarantee</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h3Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold body-normal">24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Product Card */}
          <div className="relative">
            <div className="absolute -top-4 right-8 bg-white rounded-full p-3 shadow-lg z-10 hover:scale-110 transition-transform cursor-pointer">
              <Search className="w-5 h-5" />
            </div>
            
            <ProductCard
              image="https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg"
              title="Premium Wireless Headphones"
              price={299000}
              originalPrice={399000}
              badge={{ text: "Best Seller", variant: "trending" }}
              imageAlt="Modern wooden accent chair by Ksenia Chernaya on Pexels"
            />
            
            {/* Small Product Thumbnails */}
            <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <img 
                  src="https://pixabay.com/get/ga123b1ccb820f28c7f27143646e732ece099b5e9095f5eefee718b82aa1b09ed55d9dece83f71909331b1783eb23efe1.jpg" 
                  alt="Stylish glasses by Chillsoffear on Pixabay"
                  className="w-full h-20 object-contain mb-2"
                />
                <div className="text-center font-semibold body-small">RWF 89,000</div>
              </div>
              
              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <img 
                  src="https://images.pexels.com/photos/27174551/pexels-photo-27174551.jpeg" 
                  alt="Elegant beige heels by José Martin Segura Benites on Pexels"
                  className="w-full h-20 object-contain mb-2"
                />
                <div className="text-center font-semibold body-small">RWF 149,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
