import { mockApi } from './mock.api'

export const cartApi = {
  get: () =>
    mockApi.getCart(),

  addItem: (productId: number, quantity: number = 1) =>
    mockApi.addToCart(productId, quantity),

  updateItem: (itemId: number, quantity: number) =>
    mockApi.updateCartItem(itemId, quantity),

  removeItem: (itemId: number) =>
    mockApi.removeFromCart(itemId),

  clear: () =>
    mockApi.clearCart(),
}