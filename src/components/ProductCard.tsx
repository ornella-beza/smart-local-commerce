import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, StarHalf } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: {
    text: string;
    variant?: 'limited' | 'discount' | 'trending';
  };
  imageAlt: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
}

export function ProductCard({ 
  image, 
  title, 
  price, 
  originalPrice, 
  badge, 
  imageAlt,
  category,
  rating,
  reviewCount,
  colors 
}: ProductCardProps) {
  const renderStars = () => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className="w-4 h-4 fill-current" 
          style={{ color: 'var(--star-filled)' }}
        />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half" 
          className="w-4 h-4 fill-current" 
          style={{ color: 'var(--star-filled)' }}
        />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className="w-4 h-4" 
          style={{ color: 'var(--star-empty)' }}
        />
      );
    }
    
    return stars;
  };

  const getBadgeClassName = () => {
    if (!badge?.variant) return 'bg-primary text-primary-foreground';
    
    switch (badge.variant) {
      case 'discount':
        return 'bg-(--discount-badge) text-white';
      case 'limited':
      case 'trending':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-3 sm:p-6">
        <div className="relative mb-3 sm:mb-4">
          {badge && (
            <Badge className={`absolute top-1 left-1 sm:top-2 sm:left-2 ${getBadgeClassName()} px-2 sm:px-4 py-1 sm:py-1.5 rounded-none text-xs font-semibold whitespace-nowrap uppercase`}>
              {badge.text}
            </Badge>
          )}
          <button 
            className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-muted"
            aria-label="Add to wishlist"
            type="button"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-48 sm:h-64 object-cover"
          />
        </div>
        
        {category && (
          <p className="text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2 text-xs" style={{ fontWeight: 500 }}>
            {category}
          </p>
        )}
        
        <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:body-normal line-clamp-2">{title}</h3>
        
        {rating && (
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
            {reviewCount && (
              <span className="text-muted-foreground text-xs sm:body-small">
                ({reviewCount})
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          {originalPrice && (
            <span className="text-muted-foreground line-through text-xs sm:body-normal">
              RWF {originalPrice.toFixed(0)}
            </span>
          )}
          <span className="text-lg sm:text-2xl font-bold">RWF {price.toFixed(0)}</span>
        </div>

        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-transparent hover:border-gray-300 transition-colors"
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
                type="button"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
