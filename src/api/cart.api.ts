import { mockApi } from './mock.api'

export const cartApi = {
  get: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getCart(),
    // apiClient.get<Cart>('/cart/').then((r) => r.data),

  addItem: (productId: number, quantity: number = 1) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.addToCart(productId, quantity),
    // apiClient.post<Cart>('/cart/items/', { product_id: productId, quantity }).then((r) => r.data),

  updateItem: (itemId: number, quantity: number) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.updateCartItem(itemId, quantity),
    // apiClient.patch<Cart>(`/cart/items/${itemId}/`, { quantity }).then((r) => r.data),

  removeItem: (itemId: number) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.removeFromCart(itemId),
    // apiClient.delete<Cart>(`/cart/items/${itemId}/`).then((r) => r.data),

  clear: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.clearCart(),
    // apiClient.delete<Cart>('/cart/clear/').then((r) => r.data),
}