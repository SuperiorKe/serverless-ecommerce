import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'
import type { Order } from '@/types'

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const newOrder = location.state?.newOrder as Order | undefined

  useEffect(() => {
    if (!newOrder) {
      navigate('/products')
    }
  }, [newOrder, navigate])

  if (!newOrder) return null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="h-20 w-20 text-brand-500" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order <span className="font-semibold px-2 py-1 bg-gray-100 rounded">#{newOrder.reference}</span> is confirmed.
      </p>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 text-left">
        <h2 className="font-semibold text-lg mb-4 border-b pb-2">Order Summary</h2>
        <div className="space-y-2 text-gray-600 mb-4">
          <p><strong>Shipping to:</strong> {newOrder.shipping_address.full_name}</p>
          <p><strong>Address:</strong> {newOrder.shipping_address.address_line_1}, {newOrder.shipping_address.city}</p>
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-lg border-t pt-4">
          <span>Amount Paid:</span>
          <span className="text-brand-600">KES {newOrder.total}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-sm mx-auto sm:max-w-none">
        <Link to="/products" className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" className="w-full">Continue Shopping</Button>
        </Link>
        <Link to="/orders" className="w-full sm:w-auto">
          <Button size="lg" className="w-full">View All Orders</Button>
        </Link>
      </div>
    </div>
  )
}
