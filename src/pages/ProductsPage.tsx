import React from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useAddToCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice, formatDiscount } from '@/utils/formatPrice'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { CategoryPills } from '@/components/products/CategoryPills'

export const ProductsPage: React.FC = () => {
  const { data: productsData, isLoading, error } = useProducts()
  const addToCart = useAddToCart()

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({ productId, quantity: 1 })
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load products. Please try again.</p>
        </div>
      </div>
    )
  }

  const products = productsData?.results || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600">Discover our complete collection of authentic African products</p>
      </div>

      <CategoryPills />

      {products.length === 0 ? (
        <EmptyState
          icon="package"
          title="No products found"
          description="Check back later for new products from our local sellers."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <Badge variant="pending">Out of Stock</Badge>
                  </div>
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
                    disabled={!product.in_stock || addToCart.isPending}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}