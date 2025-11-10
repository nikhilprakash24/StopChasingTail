import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'gradient' | 'glass' | 'outlined'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const Card = ({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className = '',
  onClick,
}: CardProps) => {
  const baseStyles = 'rounded-2xl transition-all duration-300'

  const variants = {
    default: 'bg-white shadow-lg',
    gradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 shadow-lg',
    glass: 'glass shadow-xl',
    outlined: 'bg-white border-2 border-neutral-200',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:shadow-2xl cursor-pointer'
    : ''

  const clickableStyles = onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return (
    <h3 className={`text-2xl font-bold text-neutral-900 ${className}`}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export const CardDescription = ({
  children,
  className = '',
}: CardDescriptionProps) => {
  return <p className={`text-neutral-600 ${className}`}>{children}</p>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return <div className={className}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return <div className={`mt-4 pt-4 border-t border-neutral-200 ${className}`}>{children}</div>
}
