import { FirebaseError } from 'firebase/app'
import { AUTH_ERROR_MESSAGES } from '../types/auth.types'

/**
 * Get user-friendly error message from Firebase error
 */
export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] || 'An unexpected error occurred'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (user: unknown): boolean => {
  return user !== null && user !== undefined
}

/**
 * Format user display name from email if not provided
 */
export const getDisplayNameFromEmail = (email: string): string => {
  return email.split('@')[0]
}

/**
 * Generate initials from display name
 */
export const getInitials = (displayName: string): string => {
  return displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
  return input.trim()
}

/**
 * Check if email domain is commonly used for disposable emails
 */
export const isDisposableEmail = (email: string): boolean => {
  const disposableDomains = [
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
  ]

  const domain = email.split('@')[1]?.toLowerCase()
  return disposableDomains.includes(domain)
}

/**
 * Debounce function for form validation
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
