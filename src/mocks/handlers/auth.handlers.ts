import { http, HttpResponse } from 'msw'

const MOCK_USER = {
  id: 1,
  email: 'kenn@superiatech.com',
  first_name: 'Kenn',
  last_name: 'Macharia',
  date_joined: '2025-01-01T00:00:00Z',
}

let isLoggedIn = false

export const authHandlers = [
  http.get('/api/auth/csrf/', () =>
    HttpResponse.json({ detail: 'CSRF cookie set' })
  ),

  http.post('/api/auth/login/', async ({ request }) => {
    const body = await request.json() as { email: string; password: string }
    if (body.email && body.password) {
      isLoggedIn = true
      return HttpResponse.json(MOCK_USER)
    }
    return HttpResponse.json({ detail: 'Invalid credentials' }, { status: 400 })
  }),

  http.post('/api/auth/logout/', () => {
    isLoggedIn = false
    return HttpResponse.json({ detail: 'Successfully logged out.' })
  }),

  http.post('/api/auth/register/', async ({ request }) => {
    const body = await request.json() as Record<string, string>
    isLoggedIn = true
    return HttpResponse.json({ ...MOCK_USER, email: body.email, first_name: body.first_name, last_name: body.last_name }, { status: 201 })
  }),

  http.get('/api/auth/me/', () => {
    if (!isLoggedIn) return HttpResponse.json({ detail: 'Not authenticated.' }, { status: 401 })
    return HttpResponse.json(MOCK_USER)
  }),
]