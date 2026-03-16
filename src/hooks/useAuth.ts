import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/api'
import { useAuthStore } from '@/store/auth.store'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { LoginPayload, RegisterPayload } from '@/types'

export function useMe() {
  const setUser = useAuthStore((s) => s.setUser)

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const user = await authApi.me()
      setUser(user)
      return user
    },
    retry: false,
  })
}

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (user) => {
      setUser(user)
      toast.success(`Welcome back, ${user.first_name}!`)
      navigate('/')
    },
    onError: () => {
      toast.error('Invalid email or password.')
    },
  })
}

export function useRegister() {
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterPayload) => authApi.register(data),
    onSuccess: (user) => {
      setUser(user)
      toast.success('Account created! Welcome to the marketplace.')
      navigate('/')
    },
    onError: () => {
      toast.error('Registration failed. Please check your details.')
    },
  })
}

export function useLogout() {
  const clearUser = useAuthStore((s) => s.clearUser)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser()
      queryClient.clear()
      navigate('/login')
      toast.success('Logged out successfully.')
    },
  })
}