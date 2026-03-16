import React from 'react'
import { cn } from '@/utils/cn'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={cn('fill-yellow-400 text-yellow-400', sizes[size])}
          />
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className={cn('text-gray-300', sizes[size])} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={cn('fill-yellow-400 text-yellow-400', sizes[size])} />
            </div>
          </div>
        )
      } else {
        stars.push(
          <Star
            key={i}
            className={cn('text-gray-300', sizes[size])}
          />
        )
      }
    }

    return stars
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">{renderStars()}</div>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500 ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  )
}