import React from 'react'
import { Link } from 'react-router-dom'
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatPrice } from '@/utils/formatPrice'
import { Spinner } from '@/components/ui/Spinner'
import { X, Plus, Minus } from 'lucide-react'

export const CartPage: React.FC = () => {
  const { data: cart, isLoading } = useCart()
  const updateItem = useUpdateCartItem()
  const removeItem = useRemoveCartItem()

  const handleUpdateQuantity = (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity < 1) return
    updateItem.mutate({ itemId, quantity: newQuantity })
  }

  const handleRemove = (itemId: number) => {
    removeItem.mutate(itemId)
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

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={{
            label: "Continue Shopping",
            onClick: () => window.location.href = '/products',
          }}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.product.location}</p>
                    <p className="text-sm font-medium text-brand-600 mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        disabled={updateItem.isPending || item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        disabled={updateItem.isPending}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatPrice(item.subtotal)}</p>
                    <button 
                      className="text-sm text-red-600 hover:text-red-700 mt-1 disabled:opacity-50 shrink-0"
                      onClick={() => handleRemove(item.id)}
                      disabled={removeItem.isPending}
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.item_count} items)</span>
                <span className="font-medium">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatPrice(cart.shipping_cost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(cart.tax)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-brand-600">{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="secondary" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}