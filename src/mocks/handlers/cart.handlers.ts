import { http, HttpResponse } from 'msw'
import type { Cart, CartItem } from '@/types'
import { MOCK_PRODUCTS } from '../data/products.data'

let mockCart: Cart = { id: 1, items: [], total: '0.00', item_count: 0 }

function recalcCart(): Cart {
  const total = mockCart.items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0)
  mockCart.total = total.toFixed(2)
  mockCart.item_count = mockCart.items.reduce((sum, item) => sum + item.quantity, 0)
  return mockCart
}

export const cartHandlers = [
  http.get('/api/cart/', () => HttpResponse.json(recalcCart())),

  http.post('/api/cart/items/', async ({ request }) => {
    const body = await request.json() as { product_id: number; quantity: number }
    const product = MOCK_PRODUCTS.find((p) => p.id === body.product_id)
    if (!product) return HttpResponse.json({ detail: 'Product not found.' }, { status: 404 })

    const existing = mockCart.items.find((i) => i.product.id === body.product_id)
    if (existing) {
      existing.quantity += body.quantity
      existing.subtotal = (existing.quantity * parseFloat(product.price)).toFixed(2)
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        product,
        quantity: body.quantity,
        subtotal: (body.quantity * parseFloat(product.price)).toFixed(2),
      }
      mockCart.items.push(newItem)
    }
    return HttpResponse.json(recalcCart())
  }),

  http.patch('/api/cart/items/:id/', async ({ params, request }) => {
    const body = await request.json() as { quantity: number }
    const item = mockCart.items.find((i) => i.id === Number(params.id))
    if (!item) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 })
    item.quantity = body.quantity
    item.subtotal = (body.quantity * parseFloat(item.product.price)).toFixed(2)
    return HttpResponse.json(recalcCart())
  }),

  http.delete('/api/cart/items/:id/', ({ params }) => {
    mockCart.items = mockCart.items.filter((i) => i.id !== Number(params.id))
    return HttpResponse.json(recalcCart())
  }),

  http.delete('/api/cart/clear/', () => {
    mockCart = { id: 1, items: [], total: '0.00', item_count: 0 }
    return HttpResponse.json(mockCart)
  }),
]