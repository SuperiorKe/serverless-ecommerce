import { apiClient } from './client'
import type { Order, CreateOrderPayload } from '@/types'

export const ordersApi = {
  create: (data: CreateOrderPayload) =>
    apiClient.post<Order>('/orders/', data).then((r) => r.data),

  list: () =>
    apiClient.get<Order[]>('/orders/').then((r) => r.data),

  detail: (id: number) =>
    apiClient.get<Order>(`/orders/${id}/`).then((r) => r.data),
}