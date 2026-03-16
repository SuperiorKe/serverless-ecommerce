import React from 'react'
import { cn } from '@/utils/cn'
import { Package, Search, ShoppingBag } from 'lucide-react'

interface EmptyStateProps {
  icon?: 'package' | 'search' | 'cart'
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const icons = {
  package: Package,
  search: Search,
  cart: ShoppingBag,
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'package',
  title,
  description,
  action,
  className,
}) => {
  const Icon = icons[icon]

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md">{description}</p>
      {action && (
        <div className="mt-6">
          <button
            onClick={action.onClick}
            className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  )
}