import { mockApi } from './mock.api'
import type { LoginPayload, RegisterPayload } from '@/types'

export const authApi = {
  login: (data: LoginPayload) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.login(data),
    // apiClient.post<User>('/auth/login/', data).then((r) => r.data),

  logout: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.logout(),
    // apiClient.post('/auth/logout/').then((r) => r.data),

  register: (data: RegisterPayload) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.register(data),
    // apiClient.post<User>('/auth/register/', data).then((r) => r.data),

  me: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.me(),
    // apiClient.get<User>('/auth/me/').then((r) => r.data),

  // Fetches CSRF cookie from Django before any auth mutation
  fetchCsrf: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.fetchCsrf(),
    // apiClient.get('/auth/csrf/'),
}