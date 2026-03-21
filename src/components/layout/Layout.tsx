import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { useMe } from '@/hooks/useAuth'
import { useThemeStore } from '@/store/theme.store'

export const Layout: React.FC = () => {
  // Restore user session on mount
  useMe()
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    const root = window.document.documentElement
    
    const applyTheme = (currentTheme: 'light' | 'dark' | 'system') => {
      root.classList.remove('light', 'dark')
      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
      } else {
        root.classList.add(currentTheme)
      }
    }

    applyTheme(theme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-secondary-900 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}