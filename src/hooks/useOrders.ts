import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '@/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { CreateOrderPayload } from '@/types'

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.list,
  })
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.detail(id),
    enabled: !!id,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => ordersApi.create(data),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success(`Order ${order.reference} placed successfully!`)
      navigate(`/orders/${order.id}`)
    },
    onError: () => {
      toast.error('Failed to place order. Please try again.')
    },
  })
}