import React from 'react'
import { useCartStore } from '@/store/cart.store'
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatPrice } from '@/utils/formatPrice'
import { Link } from 'react-router-dom'
import { X, Plus, Minus } from 'lucide-react'

export const CartDrawer: React.FC = () => {
  const { isOpen, closeCart } = useCartStore()
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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-secondary-900 shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-secondary-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
              </div>
            ) : !cart || cart.items.length === 0 ? (
              <EmptyState
                icon="cart"
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet."
                action={{
                  label: "Continue Shopping",
                  onClick: closeCart,
                }}
              />
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 border dark:border-secondary-800 rounded-lg">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button 
                          className="p-1 hover:bg-gray-100 dark:hover:bg-secondary-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 transition-colors"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          disabled={updateItem.isPending || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                        <button 
                          className="p-1 hover:bg-gray-100 dark:hover:bg-secondary-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 transition-colors"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          disabled={updateItem.isPending}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(item.subtotal)}</p>
                      <button 
                        className="text-xs text-red-600 hover:text-red-700 mt-1 disabled:opacity-50"
                        onClick={() => handleRemove(item.id)}
                        disabled={removeItem.isPending}
                      >
                        {removeItem.isPending ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart && cart.items.length > 0 && (
            <div className="border-t dark:border-secondary-800 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-lg font-bold text-brand-600 dark:text-brand-400">{formatPrice(cart.total)}</span>
              </div>
              <div className="space-y-2">
                <Link to="/checkout" onClick={closeCart}>
                  <Button className="w-full" size="lg">
                    Go to Checkout
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}