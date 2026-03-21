import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { useCartStore } from '@/store/cart.store'
import { useThemeStore } from '@/store/theme.store'
import { Button } from '@/components/ui/Button'

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, clearUser } = useAuthStore()
  const { cart, openCart } = useCartStore()
  const { theme, setTheme } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const navigate = useNavigate()

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const handleLogout = () => {
    clearUser()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-secondary-900 shadow-sm dark:shadow-secondary-800/50 sticky top-0 z-40 transition-colors duration-200 border-b border-transparent dark:border-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-500">Elites</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <button 
              onClick={cycleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none"
              title={`Current theme: ${theme}`}
            >
              {theme === 'light' ? <Sun className="h-5 w-5" /> : theme === 'dark' ? <Moon className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
            </button>
            
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
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
                <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user?.first_name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-secondary-800">
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
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-white dark:bg-secondary-900 border-t dark:border-secondary-800">
            <Link 
              to="/products" 
              className="block text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="block text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="flex items-center justify-between pt-4 border-t dark:border-secondary-800">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400">
                  <Search className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={cycleTheme}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 focus:outline-none"
                  title={`Current theme: ${theme}`}
                >
                  {theme === 'light' ? <Sun className="h-5 w-5" /> : theme === 'dark' ? <Moon className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                </button>
                
                <button 
                  onClick={openCart}
                  className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
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
                  <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user?.first_name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-secondary-800">
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