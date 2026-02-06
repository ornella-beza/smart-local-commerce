import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  productCount: number;
  image: string;
  imageAlt: string;
  backgroundColor: string;
}

export function CategoryCard({ title, productCount, image, imageAlt, backgroundColor }: CategoryCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer" style={{ backgroundColor }}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-1">{title}</h3>
          <p className="text-muted-foreground body-small">{productCount} products</p>
        </div>
        
        <button 
          className="flex items-center gap-2 font-semibold body-normal mb-6 group-hover:gap-3 transition-all"
          type="button"
        >
          Go to Shops <ArrowRight className="w-4 h-4" />
        </button>
        
        <div className="mt-auto">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-32 object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
}
