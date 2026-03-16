import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '@/api'
import { useCartStore } from '@/store/cart.store'
import toast from 'react-hot-toast'

export const cartKeys = {
  cart: ['cart'] as const,
}

export function useCart() {
  const setCart = useCartStore((s) => s.setCart)

  return useQuery({
    queryKey: cartKeys.cart,
    queryFn: async () => {
      const cart = await cartApi.get()
      setCart(cart)
      return cart
    },
  })
}

export function useAddToCart() {
  const queryClient = useQueryClient()
  const setCart = useCartStore((s) => s.setCart)
  const openCart = useCartStore((s) => s.openCart)

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity?: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: (cart) => {
      setCart(cart)
      queryClient.setQueryData(cartKeys.cart, cart)
      openCart()
      toast.success('Added to cart!')
    },
    onError: () => {
      toast.error('Failed to add item. Please try again.')
    },
  })
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  const setCart = useCartStore((s) => s.setCart)

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: (cart) => {
      setCart(cart)
      queryClient.setQueryData(cartKeys.cart, cart)
    },
  })
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient()
  const setCart = useCartStore((s) => s.setCart)

  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeItem(itemId),
    onSuccess: (cart) => {
      setCart(cart)
      queryClient.setQueryData(cartKeys.cart, cart)
      toast.success('Item removed')
    },
  })
}