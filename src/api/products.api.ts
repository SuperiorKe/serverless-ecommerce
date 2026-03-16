import { apiClient } from './client'
import type { Product, ProductsResponse, ProductFilters, Category } from '@/types'

export const productsApi = {
  list: (filters: ProductFilters = {}) =>
    apiClient.get<ProductsResponse>('/products/', { params: filters }).then((r) => r.data),

  detail: (slug: string) =>
    apiClient.get<Product>(`/products/${slug}/`).then((r) => r.data),

  categories: () =>
    apiClient.get<Category[]>('/products/categories/').then((r) => r.data),

  featured: () =>
    apiClient.get<Product[]>('/products/featured/').then((r) => r.data),
}