import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { useCreateOrder } from '@/hooks/useOrders'
import { Button } from '@/components/ui/Button'
import type { ShippingAddress } from '@/types'

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate()
  const { data: cart, isLoading: cartLoading } = useCart()
  const createOrder = useCreateOrder()
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    county: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!cart?.items.length) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const order = await createOrder.mutateAsync({ shipping_address: shippingAddress })
      // Navigate to orders page with success message
      navigate('/orders', { 
        state: { 
          successMessage: 'Order placed successfully!',
          newOrder: order 
        } 
      })
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = shippingAddress.full_name && 
    shippingAddress.phone && 
    shippingAddress.address_line_1 && 
    shippingAddress.city && 
    shippingAddress.county

  if (cartLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  if (!cart?.items.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Your cart is empty. Add some items before checkout.</p>
        <Button 
          variant="secondary" 
          className="mt-4"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={shippingAddress.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <input
            type="text"
            value={shippingAddress.address_line_1}
            onChange={(e) => handleInputChange('address_line_1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={shippingAddress.address_line_2}
            onChange={(e) => handleInputChange('address_line_2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County *
            </label>
            <input
              type="text"
              value={shippingAddress.county}
              onChange={(e) => handleInputChange('county', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-2 mb-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">KES {item.subtotal}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>KES {cart.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>KES {cart.shipping_cost}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (16%):</span>
            <span>KES {cart.tax}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-brand-600">KES {cart.total}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="mr-3"
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              className="mr-3"
            />
            <span>M-Pesa</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              className="mr-3"
            />
            <span>Card Payment</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/cart')}
        >
          Back to Cart
        </Button>
        
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting || createOrder.isPending}
          className="px-8"
        >
          {isSubmitting || createOrder.isPending ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </form>
  )
}