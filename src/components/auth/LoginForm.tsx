import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import type { LoginPayload } from '@/types'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useLogin()
  
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof LoginPayload, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      await login.mutateAsync(formData)
      
      // Redirect to the page they came from, or default to account
      const from = location.state?.from || '/account'
      navigate(from, { replace: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({ general: 'Login failed. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-transparent dark:border-secondary-700 p-6 transition-colors">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Welcome Back</h2>
        
        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4 transition-colors">
            {errors.general}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-secondary-900 text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 ${
                errors.email ? 'border-red-300 dark:border-red-500/50' : 'border-gray-300 dark:border-secondary-600'
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-secondary-900 text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 ${
                errors.password ? 'border-red-300 dark:border-red-500/50' : 'border-gray-300 dark:border-secondary-600'
              }`}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-transparent dark:border-secondary-700 p-6 transition-colors">
        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting || login.isPending}
            className="w-full"
          >
            {isSubmitting || login.isPending ? 'Signing In...' : 'Sign In'}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-medium text-brand-600 hover:text-brand-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
