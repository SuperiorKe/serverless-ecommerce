import { apiClient } from './client'
import type { User, LoginPayload, RegisterPayload } from '@/types'

export const authApi = {
  login: (data: LoginPayload) =>
    apiClient.post<User>('/auth/login/', data).then((r) => r.data),

  logout: () =>
    apiClient.post('/auth/logout/').then((r) => r.data),

  register: (data: RegisterPayload) =>
    apiClient.post<User>('/auth/register/', data).then((r) => r.data),

  me: () =>
    apiClient.get<User>('/auth/me/').then((r) => r.data),

  // Fetches CSRF cookie from Django before any auth mutation
  fetchCsrf: () =>
    apiClient.get('/auth/csrf/'),
}