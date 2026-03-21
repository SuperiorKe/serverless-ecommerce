import { mockApi } from './mock.api'
import type { CreateOrderPayload } from '@/types'

export const ordersApi = {
  create: (data: CreateOrderPayload) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.createOrder(data),
    // apiClient.post<Order>('/orders/', data).then((r) => r.data),

  list: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getOrders(),
    // apiClient.get<Order[]>('/orders/').then((r) => r.data),

  detail: (id: number) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getOrder(id),
    // apiClient.get<Order>(`/orders/${id}/`).then((r) => r.data),
}