import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOrders } from '@/hooks/useOrders'
import { OrderCard } from '@/components/orders/OrderCard'
import { toast } from 'react-hot-toast'

export const OrdersPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: orders, isLoading, error } = useOrders()

  useEffect(() => {
    // Show success message if coming from checkout
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage)
      // Clear the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.state, navigate, location.pathname])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load orders. Please try again.</p>
        </div>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}