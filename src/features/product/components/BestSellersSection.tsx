import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/product.service';
import { ProductCard } from './ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: { _id: string; name: string } | string | null;
}

export function BestSellersSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        // Get first 4 products as best sellers (or you could sort by popularity/stock)
        const bestSellers = data.slice(0, 4);
        setProducts(bestSellers);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="skeleton h-10 w-64 mx-auto mb-4 rounded-lg" />
            <div className="skeleton h-6 w-96 mx-auto rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="skeleton-image h-48 sm:h-64 mb-3 rounded-lg" />
                <div className="skeleton h-4 w-20 mb-2 rounded" />
                <div className="skeleton h-5 w-full mb-2 rounded" />
                <div className="skeleton h-6 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {products.map((product, index) => {
            const productCategory = typeof product.category === 'object' && product.category ? product.category.name : product.category;
            const categoryName = typeof productCategory === 'string' ? productCategory : 'BEST SELLERS';
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            const discountPercent = hasDiscount 
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : null;

            return (
              <div 
                key={product._id}
                className="product-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/product/${product._id}`}>
                  <ProductCard
                    image={product.image || '/placeholder-image.jpg'}
                    imageAlt={product.name}
                    title={product.name}
                    category={categoryName}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={4.5}
                    reviewCount={Math.floor(Math.random() * 50) + 10}
                    badge={discountPercent ? {
                      text: `${discountPercent}% OFF`,
                      variant: 'discount' as const
                    } : undefined}
                    colors={['#3B82F6', '#14B8A6', '#EF4444']}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
