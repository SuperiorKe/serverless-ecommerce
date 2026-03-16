import { apiClient } from './client'
import type { Cart } from '@/types'

export const cartApi = {
  get: () =>
    apiClient.get<Cart>('/cart/').then((r) => r.data),

  addItem: (productId: number, quantity: number = 1) =>
    apiClient.post<Cart>('/cart/items/', { product_id: productId, quantity }).then((r) => r.data),

  updateItem: (itemId: number, quantity: number) =>
    apiClient.patch<Cart>(`/cart/items/${itemId}/`, { quantity }).then((r) => r.data),

  removeItem: (itemId: number) =>
    apiClient.delete<Cart>(`/cart/items/${itemId}/`).then((r) => r.data),

  clear: () =>
    apiClient.delete<Cart>('/cart/clear/').then((r) => r.data),
}