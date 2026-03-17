import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Order, OrderStatus } from '@/types'

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusText: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

interface OrderCardProps {
  order: Order
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order.reference}
          </h3>
          <p className="text-sm text-gray-500">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <Badge variant={order.status as any}>
          {statusText[order.status]}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Items</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × KES {item.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">KES {item.subtotal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p className="font-medium">{order.shipping_address.full_name}</p>
            <p>{order.shipping_address.phone}</p>
            <p>{order.shipping_address.address_line_1}</p>
            {order.shipping_address.address_line_2 && (
              <p>{order.shipping_address.address_line_2}</p>
            )}
            <p>
              {order.shipping_address.city}, {order.shipping_address.county}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>KES {order.total}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-brand-600">KES {order.total}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Link to={`/products`}>
            <Button variant="secondary" size="sm">
              Continue Shopping
            </Button>
          </Link>
          
          {order.status === 'delivered' && (
            <Button size="sm">
              Buy Again
            </Button>
          )}
          
          {['pending', 'confirmed'].includes(order.status) && (
            <Button 
              variant="secondary" 
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              Cancel Order
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
