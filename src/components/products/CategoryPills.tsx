import React from 'react'
import { useCategories } from '@/hooks/useProducts'
import { Link } from 'react-router-dom'
import { Spinner } from '@/components/ui/Spinner'

export const CategoryPills: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories()

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="sm" />
      </div>
    )
  }

  if (error || !categories || categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 py-4">
      <Link
        to="/products"
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        All Products
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/products?category=${category.slug}`}
          className="px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-medium hover:bg-brand-200 transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}