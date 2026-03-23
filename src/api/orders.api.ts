import { mockApi } from './mock.api'
import type { CreateOrderPayload } from '@/types'

export const ordersApi = {
  create: (data: CreateOrderPayload) =>
    mockApi.createOrder(data),

  list: () =>
    mockApi.getOrders(),

  detail: (id: number) =>
    mockApi.getOrder(id),
}