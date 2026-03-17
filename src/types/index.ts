// ── Auth ─────────────────────────────────────────────────────────────────────
export type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  date_joined: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
  password: string
  first_name: string
  last_name: string
}

// ── Products ──────────────────────────────────────────────────────────────────
export type Category = {
  id: number
  name: string
  slug: string
  image?: string
}

export type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: string          // Django DecimalField returns string
  original_price?: string
  category: Category
  images: ProductImage[]
  rating: number
  review_count: number
  in_stock: boolean
  seller: string
  location: string
  created_at: string
}

export type ProductImage = {
  id: number
  url: string
  is_primary: boolean
}

export type ProductsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}

export type ProductFilters = {
  category?: string
  search?: string
  min_price?: number
  max_price?: number
  ordering?: 'price' | '-price' | '-rating' | '-created_at'
  page?: number
}

// ── Cart ─────────────────────────────────────────────────────────────────────
export type CartItem = {
  id: number
  product: Product
  quantity: number
  subtotal: string
}

export type Cart = {
  id: number
  items: CartItem[]
  subtotal: string
  shipping_cost: string
  tax: string
  total: string
  item_count: number
}

// ── Orders ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export type OrderItem = {
  id: number
  product: Product
  quantity: number
  price: string
  subtotal: string
}

export type Order = {
  id: number
  reference: string
  items: OrderItem[]
  status: OrderStatus
  total: string
  shipping_address: ShippingAddress
  created_at: string
}

export type ShippingAddress = {
  full_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  county: string
}

export type CreateOrderPayload = {
  shipping_address: ShippingAddress
}

// ── API ───────────────────────────────────────────────────────────────────────
export type ApiError = {
  message: string
  errors?: Record<string, string[]>
}