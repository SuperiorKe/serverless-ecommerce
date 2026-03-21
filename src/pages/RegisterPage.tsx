import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    // Redirect authenticated users away from register page
    if (isAuthenticated) {
      const from = location.state?.from || '/account'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location.state])

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Elites</h1>
        <p className="text-gray-600 mt-2">Your trusted online marketplace</p>
      </div>
      <RegisterForm />
    </div>
  )
}