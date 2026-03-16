import React from 'react'
import { useCartStore } from '@/store/cart.store'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatPrice } from '@/utils/formatPrice'
import { Link } from 'react-router-dom'
import { X, Plus, Minus } from 'lucide-react'

export const CartDrawer: React.FC = () => {
  const { isOpen, closeCart } = useCartStore()
  const { data: cart, isLoading } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg"
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
                  <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatPrice(item.subtotal)}</p>
                      <button className="text-xs text-red-600 hover:text-red-700 mt-1">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart && cart.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-brand-600">{formatPrice(cart.total)}</span>
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