// Temporary direct mock API to bypass MSW issues
import { MOCK_PRODUCTS } from '@/mocks/data/products.data'
import { MOCK_CATEGORIES } from '@/mocks/data/categories.data'
import { MOCK_ORDERS } from '@/mocks/data/orders.data'
import type { Product, ProductsResponse, Category, ProductFilters, Cart, CartItem, User, LoginPayload, RegisterPayload, Order, CreateOrderPayload } from '@/types'

// Mock cart state
let mockCart: Cart = { 
  id: 1, 
  items: [], 
  subtotal: '0.00',
  shipping_cost: '0.00',
  tax: '0.00',
  total: '0.00', 
  item_count: 0 
}

// Mock auth state
let mockUser: User | null = null
const MOCK_USER: User = {
  id: 1,
  email: 'kenn@superiatech.com',
  first_name: 'Kenn',
  last_name: 'Macharia',
  date_joined: '2025-01-01T00:00:00Z',
}

// Mock orders state
let mockOrders: Order[] = [...MOCK_ORDERS]

function recalcCart(): Cart {
  const subtotal = mockCart.items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0)
  const shippingCost = subtotal > 0 ? '5.00' : '0.00'
  const tax = (subtotal * 0.16).toFixed(2)
  const total = subtotal.toFixed(2) // Total should be sum of item subtotals only
  
  mockCart.subtotal = subtotal.toFixed(2)
  mockCart.shipping_cost = shippingCost
  mockCart.tax = tax
  mockCart.total = total
  mockCart.item_count = mockCart.items.reduce((sum, item) => sum + item.quantity, 0)
  return mockCart
}

export const mockApi = {
  // Simulate network delay
  delay: (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms)),

  getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    await mockApi.delay()
    let results = [...MOCK_PRODUCTS]

    if (filters.category) {
      results = results.filter((p) => p.category.slug === filters.category)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      results = results.filter(
        (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      )
    }

    return {
      count: results.length,
      next: null,
      previous: null,
      results
    }
  },

  getCategories: async (): Promise<Category[]> => {
    await mockApi.delay()
    return [...MOCK_CATEGORIES]
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    await mockApi.delay()
    return MOCK_PRODUCTS.filter((_: Product, i: number) => i < 4)
  },

  getProduct: async (slug: string): Promise<Product> => {
    await mockApi.delay()
    const product = MOCK_PRODUCTS.find((p: Product) => p.slug === slug)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  },

  // Cart methods
  getCart: async (): Promise<Cart> => {
    await mockApi.delay()
    return recalcCart()
  },

  addToCart: async (productId: number, quantity: number = 1): Promise<Cart> => {
    await mockApi.delay()
    const product = MOCK_PRODUCTS.find((p) => p.id === productId)
    if (!product) {
      throw new Error('Product not found')
    }

    const existing = mockCart.items.find((i) => i.product.id === productId)
    if (existing) {
      existing.quantity += quantity
      existing.subtotal = (existing.quantity * parseFloat(product.price)).toFixed(2)
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        product,
        quantity,
        subtotal: (quantity * parseFloat(product.price)).toFixed(2),
      }
      mockCart.items.push(newItem)
    }

    return recalcCart()
  },

  updateCartItem: async (itemId: number, quantity: number): Promise<Cart> => {
    await mockApi.delay()
    const item = mockCart.items.find((i) => i.id === itemId)
    if (!item) {
      throw new Error('Cart item not found')
    }
    item.quantity = quantity
    item.subtotal = (quantity * parseFloat(item.product.price)).toFixed(2)
    return recalcCart()
  },

  removeFromCart: async (itemId: number): Promise<Cart> => {
    await mockApi.delay()
    mockCart.items = mockCart.items.filter((i) => i.id !== itemId)
    return recalcCart()
  },

  clearCart: async (): Promise<Cart> => {
    await mockApi.delay()
    mockCart = { 
      id: 1, 
      items: [], 
      subtotal: '0.00',
      shipping_cost: '0.00',
      tax: '0.00',
      total: '0.00', 
      item_count: 0 
    }
    return mockCart
  },

  // Auth methods
  login: async (data: LoginPayload): Promise<User> => {
    await mockApi.delay()
    mockUser = { ...MOCK_USER, ...data }
    return mockUser
  },

  register: async (data: RegisterPayload): Promise<User> => {
    await mockApi.delay()
    mockUser = { ...MOCK_USER, ...data }
    return mockUser
  },

  logout: async (): Promise<void> => {
    await mockApi.delay()
    mockUser = null
  },

  me: async (): Promise<User | null> => {
    await mockApi.delay()
    return mockUser
  },

  fetchCsrf: async (): Promise<void> => {
    await mockApi.delay()
    // Mock CSRF fetch - no-op for now
  },

  // Orders methods
  createOrder: async (data: CreateOrderPayload): Promise<Order> => {
    await mockApi.delay()
    const newOrder: Order = {
      id: mockOrders.length + 1,
      reference: `AFM-2025-00${mockOrders.length + 1}`,
      status: 'pending',
      total: mockCart.total,
      items: mockCart.items.map(item => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.subtotal
      })),
      shipping_address: data.shipping_address,
      created_at: new Date().toISOString(),
    }
    mockOrders.push(newOrder)
    return newOrder
  },

  getOrders: async (): Promise<Order[]> => {
    await mockApi.delay()
    return [...mockOrders]
  },

  getOrder: async (id: number): Promise<Order> => {
    await mockApi.delay()
    const order = mockOrders.find((o) => o.id === id)
    if (!order) {
      throw new Error('Order not found')
    }
    return order
  }
}
