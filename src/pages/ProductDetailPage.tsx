import React from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '@/hooks/useProducts'
import { useAddToCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice, formatDiscount } from '@/utils/formatPrice'
import { Spinner } from '@/components/ui/Spinner'

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, error } = useProduct(slug || '')
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

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">Product not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="w-full aspect-[4/3] md:aspect-square max-h-[50vh] lg:max-h-none bg-gray-100 dark:bg-secondary-800 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            {product.original_price && (
              <Badge variant="sale" className="mb-2">
                -{formatDiscount(product.original_price, product.price)}% OFF
              </Badge>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.location}</p>
            <StarRating rating={product.rating} reviewCount={product.review_count} />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-brand-600">{formatPrice(product.price)}</span>
              {product.original_price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
            <Badge variant={product.in_stock ? 'new' : 'pending'}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
            <p className="text-gray-600">
              <strong>Seller:</strong> {product.seller}<br />
              <strong>Location:</strong> {product.location}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
               size="lg" 
               className="w-full" 
               disabled={!product.in_stock || addToCart.isPending}
               onClick={() => handleAddToCart(product.id)}
            >
              {addToCart.isPending ? 'Adding...' : product.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}