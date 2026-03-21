import React from 'react'

export const HomePageSimple: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Elites Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover Authentic African Products
        </p>
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-medium">Solar Power Bank</h3>
              <p className="text-gray-600">KES 3,400</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-medium">Ankara Dress</h3>
              <p className="text-gray-600">KES 2,800</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-medium">Maasai Sandals</h3>
              <p className="text-gray-600">KES 1,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
