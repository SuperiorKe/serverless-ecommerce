import axios from 'axios'

// Switch this one env var to point at real Django backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,   // required for Django session auth
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ── CSRF Token handling ───────────────────────────────────────────────────────
// Django requires X-CSRFToken header on all mutating requests (POST/PUT/PATCH/DELETE)
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const method = config.method?.toLowerCase()
  if (method && ['post', 'put', 'patch', 'delete'].includes(method)) {
    const csrfToken = getCookie('csrftoken')
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken
    }
  }
  return config
})

// ── Global error handling ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired — redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)