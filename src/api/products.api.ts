import { mockApi } from './mock.api'
import type { ProductFilters } from '@/types'

export const productsApi = {
  list: (filters: ProductFilters = {}) =>
    mockApi.getProducts(filters),

  detail: (slug: string) =>
    mockApi.getProduct(slug),

  categories: () =>
    mockApi.getCategories(),

  featured: () =>
    mockApi.getFeaturedProducts(),
}