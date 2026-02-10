import { useSearchParams, Link } from 'react-router-dom';
import { products, businesses, promotions, blogPosts } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Store, Package, Tag, FileText, MapPin } from 'lucide-react';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchQuery = query.toLowerCase().trim();

  // Search across all categories
  const matchedProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery) ||
    p.description.toLowerCase().includes(searchQuery) ||
    p.category.toLowerCase().includes(searchQuery)
  );

  const matchedShops = businesses.filter(b =>
    b.name.toLowerCase().includes(searchQuery) ||
    b.description.toLowerCase().includes(searchQuery) ||
    b.area.toLowerCase().includes(searchQuery)
  );

  const matchedPromotions = promotions.filter(pr =>
    pr.title.toLowerCase().includes(searchQuery) ||
    pr.description.toLowerCase().includes(searchQuery)
  );

  const matchedBlogs = blogPosts.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery) ||
    blog.excerpt.toLowerCase().includes(searchQuery) ||
    blog.category.toLowerCase().includes(searchQuery)
  );

  const totalResults = matchedProducts.length + matchedShops.length + matchedPromotions.length + matchedBlogs.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''} across all categories
          </p>
        </div>

        {totalResults === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No results found for "{query}"</p>
            <p className="text-sm text-muted-foreground">Try different keywords or browse our categories</p>
          </div>
        )}

        {/* Shops Section */}
        {matchedShops.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold">Shops ({matchedShops.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {matchedShops.map((shop) => (
                <Link key={shop.id} to={`/shop/${shop.id}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={shop.logo} 
                          alt={shop.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-xl mb-1">{shop.name}</h3>
                          <div className="flex items-center gap-2 text-white/90 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{shop.area}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{shop.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {matchedProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold">Products ({matchedProducts.length})</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {matchedProducts.map((product) => {
                const business = businesses.find((b) => b.id === product.businessId);
                return (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
                      <CardContent className="p-3 sm:p-4">
                        <div className="relative mb-3 overflow-hidden rounded-lg">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {product.originalPrice && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              SALE
                            </div>
                          )}
                        </div>
                        <Badge className="mb-2 text-xs">{product.category}</Badge>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg">RWF {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              RWF {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Store className="w-3 h-3" />
                          <span className="truncate">{business?.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Promotions Section */}
        {matchedPromotions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-bold">Promotions ({matchedPromotions.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {matchedPromotions.map((promo) => (
                <Link key={promo.id} to={`/promotion/${promo.id}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={promo.image} 
                          alt={promo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                          {promo.discount}% OFF
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{promo.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Tag className="w-3 h-3" />
                          <span>Valid until {new Date(promo.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog Section */}
        {matchedBlogs.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold">Blog Posts ({matchedBlogs.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {matchedBlogs.map((blog) => (
                <Card key={blog.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48 overflow-hidden flex-shrink-0">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <Badge className="mb-2 text-xs">{blog.category}</Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{blog.author}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
