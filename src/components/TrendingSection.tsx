import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { CategoryCard } from './CategoryCard';

export function TrendingSection() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Featured Collection */}
          <div className="bg-(--purple-50) rounded-2xl p-12 flex flex-col justify-between min-h-[600px]">
            <div>
              <Badge className="bg-white/60 text-foreground hover:bg-white/80 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Trending Now
              </Badge>
              
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                New<br />
                Summer<br />
                Collection
              </h2>
              
              <p className="text-muted-foreground body-normal mb-8 max-w-md">
                Discover our latest arrivals designed for the modern lifestyle. 
                Elegant, comfortable, and sustainable fashion for every occasion.
              </p>
              
              <Button size="lg" className="h-14 px-8 text-base rounded-full group">
                Explore Collection 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="mt-8">
              <img 
                src="https://images.pexels.com/photos/7956135/pexels-photo-7956135.jpeg" 
                alt="Stylish woman in a white blazer and black pants poses gracefully indoors by Artem Podrez on Pexels"
                className="w-full h-64 object-contain object-bottom"
              />
            </div>
          </div>
          
          {/* Right - Category Grid */}
          <div className="grid grid-cols-2 gap-6">
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
