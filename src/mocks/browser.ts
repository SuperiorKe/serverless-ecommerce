import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth.handlers'
import { productsHandlers } from './handlers/products.handlers'
import { cartHandlers } from './handlers/cart.handlers'
import { ordersHandlers } from './handlers/orders.handlers'

export const worker = setupWorker(
  ...authHandlers,
  ...productsHandlers,
  ...cartHandlers,
  ...ordersHandlers,
)