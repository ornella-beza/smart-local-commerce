import { Star, StarHalf } from 'lucide-react';

interface ProductListCardProps {
  image: string;
  imageAlt: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: {
    text: string;
    variant?: 'new' | 'discount' | 'limited' | 'hot';
  };
}

export function ProductListCard({
  image,
  imageAlt,
  title,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge
}: ProductListCardProps) {
  const renderStars = () => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className="w-3.5 h-3.5 fill-current" 
          style={{ color: 'var(--star-filled)' }}
        />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half" 
          className="w-3.5 h-3.5 fill-current" 
          style={{ color: 'var(--star-filled)' }}
        />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className="w-3.5 h-3.5" 
          style={{ color: 'var(--star-empty)' }}
        />
      );
    }
    
    return stars;
  };

  const getBadgeStyle = () => {
    if (!badge?.variant) return { backgroundColor: 'var(--new-badge)' };
    
    switch (badge.variant) {
      case 'discount':
        return { backgroundColor: 'var(--discount-badge)' };
      case 'new':
        return { backgroundColor: 'var(--new-badge)' };
      case 'limited':
        return { backgroundColor: 'var(--limited-badge)' };
      case 'hot':
        return { backgroundColor: 'var(--hot-badge)' };
      default:
        return { backgroundColor: 'var(--new-badge)' };
    }
  };

  return (
    <div className="flex gap-4 hover:bg-muted/50 p-2 rounded-sm transition-colors">
      <div className="relative flex-shrink-0">
        {badge && (
          <div 
            className="absolute -top-1 -left-1 text-white px-2 py-0.5 text-xs font-bold uppercase rounded-none z-10"
            style={getBadgeStyle()}
          >
            {badge.text}
          </div>
        )}
        <img
          src={image}
          alt={imageAlt}
          className="w-20 h-20 object-cover rounded-sm"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold mb-1 body-small line-clamp-2">
          {title}
        </h4>
        
        {rating && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
            {reviewCount && (
              <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                ({reviewCount})
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <span className="font-bold body-normal">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-muted-foreground line-through" style={{ fontSize: '0.75rem' }}>
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
