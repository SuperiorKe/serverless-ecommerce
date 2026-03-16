import React from 'react'
import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <Loader2 className={cn('animate-spin text-brand-600', sizes[size])} />
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'