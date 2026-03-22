import React from 'react'
import { useCategories } from '@/hooks/useProducts'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'

export const CategoriesPage: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories()

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load categories. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors">Categories</h1>
        <p className="text-gray-600 dark:text-gray-300 transition-colors">Browse products by category</p>
      </div>

      {!categories || categories.length === 0 ? (
        <EmptyState
          icon="package"
          title="No categories found"
          description="Check back later for new product categories."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="block p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-secondary-700"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
                  View all {category.name.toLowerCase()} products
                </p>
                <Button variant="secondary" size="sm">
                  Browse Products
                </Button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
