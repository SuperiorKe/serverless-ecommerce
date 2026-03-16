import { http, HttpResponse } from 'msw'
import type { Order } from '@/types'
import { MOCK_ORDERS } from '../data/orders.data'

const orders = [...MOCK_ORDERS]

export const ordersHandlers = [
  http.get('/api/orders/', () => HttpResponse.json(orders)),

  http.get('/api/orders/:id/', ({ params }) => {
    const order = orders.find((o) => o.id === Number(params.id))
    if (!order) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 })
    return HttpResponse.json(order)
  }),

  http.post('/api/orders/', async ({ request }) => {
    const body = await request.json() as { shipping_address: Order['shipping_address'] }
    const newOrder: Order = {
      id: orders.length + 1,
      reference: `AFM-2025-00${orders.length + 1}`,
      status: 'pending',
      total: '0.00',
      items: [],
      shipping_address: body.shipping_address,
      created_at: new Date().toISOString(),
    }
    orders.push(newOrder)
    return HttpResponse.json(newOrder, { status: 201 })
  }),
]