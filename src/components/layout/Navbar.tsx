import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { useCartStore } from '@/store/cart.store'
import { Button } from '@/components/ui/Button'

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, clearUser } = useAuthStore()
  const { cart, openCart } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    clearUser()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-600">BeSA</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-brand-600 font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-brand-600 font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-600 font-medium">
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-brand-600">
              <Search className="h-5 w-5" />
            </button>
            
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-brand-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart && cart.item_count > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.item_count}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Welcome, {user?.first_name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/products" 
              className="block text-gray-700 hover:text-brand-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="block text-gray-700 hover:text-brand-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-brand-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-700 hover:text-brand-600">
                  <Search className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={openCart}
                  className="relative p-2 text-gray-700 hover:text-brand-600"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart && cart.item_count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.item_count}
                    </span>
                  )}
                </button>
              </div>

              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-700">Welcome, {user?.first_name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}