import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import type { RegisterPayload } from '@/types'

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const register = useRegister()
  
  const [formData, setFormData] = useState<RegisterPayload>({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof RegisterPayload, value: string) => {
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
      await register.mutateAsync(formData)
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login to continue.',
          from: '/account'
        } 
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else if (error.response?.data) {
        setErrors(error.response.data)
      } else {
        setErrors({ general: 'Registration failed. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-transparent dark:border-secondary-700 p-6 transition-colors">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Create Account</h2>
        
        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4 transition-colors">
            {errors.general}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors">
                First Name
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-secondary-900 text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.first_name ? 'border-red-300 dark:border-red-500/50' : 'border-gray-300 dark:border-secondary-600'
                }`}
                placeholder="Enter your first name"
                required
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors">
                Last Name
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-secondary-900 text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.last_name ? 'border-red-300 dark:border-red-500/50' : 'border-gray-300 dark:border-secondary-600'
                }`}
                placeholder="Enter your last name"
                required
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>
          </div>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Create a password"
                required
                minLength={8}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.password_confirm}
                onChange={(e) => handleInputChange('password_confirm', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-secondary-900 text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.password_confirm ? 'border-red-300 dark:border-red-500/50' : 'border-gray-300 dark:border-secondary-600'
                }`}
                placeholder="Confirm password"
                required
                minLength={8}
              />
              {errors.password_confirm && (
                <p className="mt-1 text-sm text-red-600">{errors.password_confirm}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-transparent dark:border-secondary-700 p-6 transition-colors">
        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting || register.isPending}
            className="w-full"
          >
            {isSubmitting || register.isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-brand-600 hover:text-brand-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
