import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { CategoryCard } from './CategoryCard';

export function TrendingSection() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left - Featured Collection */}
          <div className="bg-(--purple-50) rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
            <div>
              <Badge className="bg-white/60 text-foreground hover:bg-white/80 mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Trending Now
              </Badge>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                New<br />
                Summer<br />
                Collection
              </h2>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md">
                Discover our latest arrivals designed for the modern lifestyle. 
                Elegant, comfortable, and sustainable fashion for every occasion.
              </p>
              
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-full group">
                Explore Collection 
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <img 
                src="https://images.pexels.com/photos/7956135/pexels-photo-7956135.jpeg" 
                alt="Stylish woman in a white blazer and black pants poses gracefully indoors by Artem Podrez on Pexels"
                className="w-full h-48 sm:h-56 md:h-64 object-contain object-bottom"
              />
            </div>
          </div>
          
          {/* Right - Category Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <CategoryCard 
              title="Men's Wear"
              productCount={242}
              image="https://images.pexels.com/photos/31268617/pexels-photo-31268617.jpeg"
              imageAlt="Confident man in beige blazer by Duy's House of Photo on Pexels"
              backgroundColor="var(--blue-50)"
            />
            
            <CategoryCard 
              title="Kid's Fashion"
              productCount={185}
              image="https://images.pexels.com/photos/27256441/pexels-photo-27256441.jpeg"
              imageAlt="Modern black and white sneakers by José Martin Segura Benites on Pexels"
              backgroundColor="var(--beige-50)"
            />
            
            <CategoryCard 
              title="Beauty Products"
              productCount={127}
              image="https://images.pexels.com/photos/32677241/pexels-photo-32677241.jpeg"
              imageAlt="Elegant tortoiseshell sunglasses by Fashion Needles on Pexels"
              backgroundColor="var(--pink-50)"
            />
            
            <CategoryCard 
              title="Accessories"
              productCount={308}
              image="https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg"
              imageAlt="White breathable sportswear by Ray Piedra on Pexels"
              backgroundColor="var(--green-50)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
