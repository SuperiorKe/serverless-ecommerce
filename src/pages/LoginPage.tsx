import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { LoginForm } from '@/components/auth/LoginForm'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    // Redirect authenticated users away from login page
    if (isAuthenticated) {
      const from = location.state?.from || '/account'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location.state])

  // Show message if redirected from checkout
  useEffect(() => {
    if (location.state?.message) {
      // Message will be shown by LoginForm component
    }
  }, [location.state])

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">BeSA</h1>
        <p className="text-gray-600 mt-2">Your trusted online marketplace</p>
      </div>
      <LoginForm />
    </div>
  )
}