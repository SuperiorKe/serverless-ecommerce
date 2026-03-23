import React from 'react'
import { Link } from 'react-router-dom'
import { useFeaturedProducts } from '@/hooks/useProducts'
import { useAddToCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice, formatDiscount } from '@/utils/formatPrice'
import { ArrowRight, Truck, ShieldCheck, Lock } from 'lucide-react'

export const HomePage: React.FC = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts()
  const addToCart = useAddToCart()

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({ productId, quantity: 1 })
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-secondary-900 dark:to-secondary-800 py-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
              Discover Authentic
              <span className="text-brand-600 dark:text-brand-400 transition-colors"> African Products</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors">
              Connect with local artisans and businesses across Kenya. 
              Quality products, fair prices, and authentic craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white dark:bg-secondary-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <Truck className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white transition-colors">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">Quick and reliable delivery across Kenya</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <ShieldCheck className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white transition-colors">Authentic Products</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">Genuine items from verified local sellers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <Lock className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white transition-colors">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">Safe and secure payment methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-secondary-900/50 transition-colors duration-200 border-t border-transparent dark:border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Featured Products</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors">Discover our handpicked selection of amazing products</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-secondary-800 border border-transparent dark:border-secondary-700 rounded-lg shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-secondary-700 animate-pulse transition-colors"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 animate-pulse rounded transition-colors"></div>
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 animate-pulse rounded w-3/4 transition-colors"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load featured products</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
                <div key={product.id} className="bg-white dark:bg-secondary-800 border border-transparent dark:border-secondary-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Link to={`/products/${product.slug}`}>
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full aspect-[4/3] object-cover hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    {product.original_price && (
                      <Badge variant="sale" className="absolute top-2 left-2">
                        -{formatDiscount(product.original_price, product.price)}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.location}</p>
                    <StarRating rating={product.rating} reviewCount={product.review_count} size="sm" />
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-brand-600 dark:text-brand-400 transition-colors">{formatPrice(product.price)}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2 transition-colors">
                            {formatPrice(product.original_price)}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!product.in_stock || addToCart.isPending}
                        className="whitespace-nowrap"
                      >
                        {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="secondary" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}