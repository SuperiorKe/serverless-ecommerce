import { http, HttpResponse } from 'msw'
import type { Cart, CartItem } from '@/types'
import { MOCK_PRODUCTS } from '../data/products.data'

// Start with some sample items for testing
const sampleItems: CartItem[] = [
  {
    id: 1,
    product: MOCK_PRODUCTS[0], // Solar Power Bank
    quantity: 1,
    subtotal: (1 * parseFloat(MOCK_PRODUCTS[0].price)).toFixed(2),
  },
  {
    id: 2,
    product: MOCK_PRODUCTS[1], // Ankara Dress
    quantity: 2,
    subtotal: (2 * parseFloat(MOCK_PRODUCTS[1].price)).toFixed(2),
  }
]

let mockCart: Cart = { 
  id: 1, 
  items: sampleItems, 
  subtotal: '0.00',
  shipping_cost: '0.00',
  tax: '0.00',
  total: '0.00', 
  item_count: 0 
}

function recalcCart(): Cart {
  const subtotal = mockCart.items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0)
  const shippingCost = subtotal > 0 ? '5.00' : '0.00'
  const tax = (subtotal * 0.16).toFixed(2)
  const total = (subtotal + parseFloat(shippingCost) + parseFloat(tax)).toFixed(2)
  
  mockCart.subtotal = subtotal.toFixed(2)
  mockCart.shipping_cost = shippingCost
  mockCart.tax = tax
  mockCart.total = total
  mockCart.item_count = mockCart.items.reduce((sum, item) => sum + item.quantity, 0)
  return mockCart
}

// Initialize with calculated values
recalcCart()

export const cartHandlers = [
  http.get('/api/cart/', () => {
    console.log('[MSW] Cart GET request')
    return HttpResponse.json(recalcCart())
  }),

  http.post('/api/cart/items/', async ({ request }) => {
    console.log('[MSW] Cart POST request:', await request.text())
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
    console.log('[MSW] Cart after adding:', recalcCart())
    return HttpResponse.json(recalcCart())
  }),

  http.patch('/api/cart/items/:id', async ({ params, request }) => {
    console.log('[MSW] Cart PATCH request:', await request.text())
    const body = await request.json() as { quantity: number }
    const item = mockCart.items.find((i) => i.id === Number(params.id))
    if (!item) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 })
    item.quantity = body.quantity
    item.subtotal = (body.quantity * parseFloat(item.product.price)).toFixed(2)
    return HttpResponse.json(recalcCart())
  }),

  http.delete('/api/cart/items/:id', ({ params }) => {
    console.log('[MSW] Cart DELETE request for item:', params.id)
    mockCart.items = mockCart.items.filter((i) => i.id !== Number(params.id))
    return HttpResponse.json(recalcCart())
  }),

  http.delete('/api/cart/clear/', () => {
    console.log('[MSW] Cart CLEAR request')
    mockCart = { 
      id: 1, 
      items: [], 
      subtotal: '0.00',
      shipping_cost: '0.00',
      tax: '0.00',
      total: '0.00', 
      item_count: 0 
    }
    return HttpResponse.json(mockCart)
  }),
]