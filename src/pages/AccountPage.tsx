import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { AccountProfile } from '@/components/account/AccountProfile'

export const AccountPage: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: '/account',
          message: 'Please login to view your account.'
        } 
      })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      <AccountProfile />
    </div>
  )
}