import type { Order } from '@/types'
import { MOCK_PRODUCTS } from './products.data'

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    reference: 'AFM-2025-001',
    status: 'delivered',
    total: '8300.00',
    items: [
      { id: 1, product: MOCK_PRODUCTS[0], quantity: 1, price: '3400.00', subtotal: '3400.00' },
      { id: 2, product: MOCK_PRODUCTS[2], quantity: 1, price: '2800.00', subtotal: '2800.00' },
      { id: 3, product: MOCK_PRODUCTS[6], quantity: 2, price: '980.00', subtotal: '1960.00' },
    ],
    shipping_address: {
      full_name: 'Kenn Macharia',
      phone: '+254700000000',
      address_line_1: '123 Ngong Road',
      city: 'Nairobi',
      county: 'Nairobi County',
    },
    created_at: '2025-02-01T10:00:00Z',
  },
]