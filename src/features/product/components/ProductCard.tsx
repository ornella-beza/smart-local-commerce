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
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md">
      <CardContent className="p-3 sm:p-6">
        <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg">
          {badge && (
            <Badge className={`absolute top-1 left-1 sm:top-2 sm:left-2 ${getBadgeClassName()} px-2 sm:px-4 py-1 sm:py-1.5 rounded-none text-xs font-semibold whitespace-nowrap uppercase z-10 animate-fade-in`}>
              {badge.text}
            </Badge>
          )}
          <button 
            className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-red-50 hover:scale-110 z-10"
            aria-label="Add to wishlist"
            type="button"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:fill-red-500 group-hover:text-red-500" />
          </button>
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={imageAlt}
              className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {category && (
          <p className="text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2 text-xs transition-colors group-hover:text-primary" style={{ fontWeight: 500 }}>
            {category}
          </p>
        )}
        
        <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:body-normal line-clamp-2 transition-colors group-hover:text-primary">{title}</h3>
        
        {rating && (
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 animate-fade-in">
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
          <span className="text-lg sm:text-2xl font-bold text-primary transition-transform group-hover:scale-105">RWF {price.toFixed(0)}</span>
        </div>

        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-transparent hover:border-gray-300 transition-all duration-200 hover:scale-125 hover:shadow-md"
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
