import React from 'react'
import { Link } from 'react-router-dom'
import { useFeaturedProducts } from '@/hooks/useProducts'
import { useAddToCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice, formatDiscount } from '@/utils/formatPrice'
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Lock } from 'lucide-react'

export const HomePage: React.FC = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts()
  const addToCart = useAddToCart()

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({ productId, quantity: 1 })
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Authentic
              <span className="text-brand-600"> African Products</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery across Kenya</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">Genuine items from verified local sellers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure payment methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Discover our handpicked selection of amazing products</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
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
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.original_price && (
                      <Badge variant="sale" className="absolute top-2 left-2">
                        -{formatDiscount(product.original_price, product.price)}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.location}</p>
                    <StarRating rating={product.rating} reviewCount={product.review_count} size="sm" />
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-brand-600">{formatPrice(product.price)}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
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