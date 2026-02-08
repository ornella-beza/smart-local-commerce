import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  productCount: number;
  image: string;
  imageAlt: string;
  backgroundColor: string;
}

export function CategoryCard({ title, productCount, image, imageAlt, backgroundColor }: CategoryCardProps) {
  return (
    <Link to="/categories">
      <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full" style={{ backgroundColor }}>
        <CardContent className="p-4 sm:p-6 flex flex-col h-full">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-2xl font-bold mb-1">{title}</h3>
            <p className="text-muted-foreground text-xs sm:body-small">{productCount} products</p>
          </div>
          
          <button 
            className="flex items-center gap-2 font-semibold text-sm sm:body-normal mb-4 sm:mb-6 group-hover:gap-3 transition-all"
            type="button"
          >
            Go to Shops <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
           
          <div className="mt-auto">
            <img 
              src={image} 
              alt={imageAlt}
              className="w-full h-24 sm:h-32 object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
