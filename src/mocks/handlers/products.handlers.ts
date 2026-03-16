import { http, HttpResponse } from 'msw'
import { MOCK_PRODUCTS } from '../data/products.data'
import { MOCK_CATEGORIES } from '../data/categories.data'

export const productsHandlers = [
  http.get('/api/products/', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase()
    const category = url.searchParams.get('category')
    const ordering = url.searchParams.get('ordering')

    let results = [...MOCK_PRODUCTS]

    if (search) {
      results = results.filter(
        (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      )
    }
    if (category) {
      results = results.filter((p) => p.category.slug === category)
    }
    if (ordering === 'price') results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    if (ordering === '-price') results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    if (ordering === '-rating') results.sort((a, b) => b.rating - a.rating)

    return HttpResponse.json({ count: results.length, next: null, previous: null, results })
  }),

  http.get('/api/products/categories/', () =>
    HttpResponse.json(MOCK_CATEGORIES)
  ),

  http.get('/api/products/featured/', () =>
    HttpResponse.json(MOCK_PRODUCTS.filter((_, i) => i < 4))
  ),

  http.get('/api/products/:slug/', ({ params }) => {
    const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug)
    if (!product) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 })
    return HttpResponse.json(product)
  }),
]