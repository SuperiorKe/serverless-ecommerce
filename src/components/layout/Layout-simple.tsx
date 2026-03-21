import React from 'react'
import { Outlet } from 'react-router-dom'

export const LayoutSimple: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-brand-600">Elites</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="/products" className="text-gray-700 hover:text-brand-600">Products</a>
              <a href="/cart" className="text-gray-700 hover:text-brand-600">Cart</a>
              <a href="/login" className="text-gray-700 hover:text-brand-600">Login</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 Elites Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
