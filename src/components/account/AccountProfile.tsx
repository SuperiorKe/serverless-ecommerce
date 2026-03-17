import React from 'react'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '@/components/ui/Button'

export const AccountProfile: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const { setUser, clearUser } = useAuthStore()

  const handleLogout = () => {
    clearUser()
    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please login to view your account.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
              {user.first_name}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
              {user.last_name}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
            {user.email}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Member Since
          </label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
            {new Date(user.date_joined).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center">
          <Button variant="secondary">
            Edit Profile
          </Button>
          
          <Button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
