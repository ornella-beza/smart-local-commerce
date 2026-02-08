import { ProductCard } from './ProductCard';

export function BestSellersSection() {
  const products = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1713425884368-9079ba200325?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxCcm93biUyMGxlYXRoZXIlMjB0b3RlJTIwYmFnJTIwaGFuZGJhZyUyMHdpdGglMjBzaG91bGRlciUyMHN0cmFwJTIwcHJvZHVjdHxlbnwwfDF8fHwxNzcwMjg1NTQ3fDA&ixlib=rb-4.1.0&q=85',
      imageAlt: 'Brown leather tote bag by Muneeb Malhotra on Unsplash',
      title: 'Simba Supermarket',
      category: 'PREMIUM COLLECTION',
      price: 18900,
      rating: 4,
      reviewCount: 24,
      badge: {
        text: 'LIMITED',
        variant: 'limited' as const
      },
      colors: ['#3B82F6', '#14B8A6', '#EF4444']
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/6995866/pexels-photo-6995866.jpeg',
      imageAlt: 'Light gray hoodie by Alena Shekhovtcova on Pexels',
      title: 'Aaky',
      category: 'BEST SELLERS',
      price: 18000,
      originalPrice: 24000,
      rating: 4.5,
      reviewCount: 38,
      badge: {
        text: '25% OFF',
        variant: 'discount' as const
      },
      colors: ['#1F2937', '#F59E0B', '#8B5CF6']
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/16428734/pexels-photo-16428734.jpeg',
      imageAlt: 'Light blue denim jacket by James Frid on Pexels',
      title: 'SBO Shop',
      category: 'NEW ARRIVALS',
      price: 9500,
      rating: 3,
      reviewCount: 12,
      colors: ['#EF4444', '#06B6D4', '#10B981']
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/18224913/pexels-photo-18224913.jpeg',
      imageAlt: 'Navy blue polo shirt by Marcelo Verfe on Pexels',
      title: 'Levi Store',
      category: 'DESIGNER SERIES',
      price: 16500,
      rating: 5,
      reviewCount: 56,
      badge: {
        text: 'TRENDING',
        variant: 'trending' as const
      },
      colors: ['#6B7280', '#8B5CF6', '#F59E0B']
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Best Sellers</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto px-4">
            Sometimes what we desire or find attractive also causes us to hesitate or run away because of the effort or responsibility involved
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              imageAlt={product.imageAlt}
              title={product.title}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              badge={product.badge}
              colors={product.colors}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
