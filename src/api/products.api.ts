import { mockApi } from './mock.api'
import type { ProductFilters } from '@/types'

export const productsApi = {
  list: (filters: ProductFilters = {}) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getProducts(filters),
    // apiClient.get<ProductsResponse>('/products/', { params: filters }).then((r) => r.data),

  detail: (slug: string) =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getProduct(slug),
    // apiClient.get<Product>(`/products/${slug}/`).then((r) => r.data),

  categories: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getCategories(),
    // apiClient.get<Category[]>('/products/categories/').then((r) => r.data),

  featured: () =>
    // Temporarily use mock API directly instead of HTTP client
    mockApi.getFeaturedProducts(),
    // apiClient.get<Product[]>('/products/featured/').then((r) => r.data),
}