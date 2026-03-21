import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ProductsPage } from '@/pages/ProductsPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { OrderSuccessPage } from '@/pages/OrderSuccessPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { AccountPage } from '@/pages/AccountPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { AboutPage } from '@/pages/AboutPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-success', element: <OrderSuccessPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrdersPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
])
