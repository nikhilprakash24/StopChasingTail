import type { ValidationErrors, LoginFormData, SignupFormData } from '../types/auth.types'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password requirements
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

/**
 * Validate email address
 */
export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return 'Email is required'
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address'
  }
  return undefined
}

/**
 * Validate password strength
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required'
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
  }
  if (!PASSWORD_REGEX.test(password)) {
    return 'Password must contain uppercase, lowercase, and a number'
  }
  return undefined
}

/**
 * Validate password confirmation matches
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) {
    return 'Please confirm your password'
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return undefined
}

/**
 * Validate display name
 */
export const validateDisplayName = (displayName: string): string | undefined => {
  if (!displayName) {
    return 'Display name is required'
  }
  if (displayName.length < 2) {
    return 'Display name must be at least 2 characters'
  }
  if (displayName.length > 50) {
    return 'Display name must be less than 50 characters'
  }
  return undefined
}

/**
 * Validate login form
 */
export const validateLoginForm = (data: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  if (!data.password) {
    errors.password = 'Password is required'
  }

  return errors
}

/**
 * Validate signup form
 */
export const validateSignupForm = (data: SignupFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  const confirmPasswordError = validatePasswordConfirmation(
    data.password,
    data.confirmPassword
  )
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError

  const displayNameError = validateDisplayName(data.displayName)
  if (displayNameError) errors.displayName = displayNameError

  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions'
  }

  return errors
}

/**
 * Check if validation errors object is empty
 */
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0
}

/**
 * Get password strength indicator
 */
export const getPasswordStrength = (password: string): {
  strength: 'weak' | 'medium' | 'strong'
  score: number
  feedback: string
} => {
  if (!password) {
    return { strength: 'weak', score: 0, feedback: 'Enter a password' }
  }

  let score = 0
  const feedback: string[] = []

  // Length check
  if (password.length >= PASSWORD_MIN_LENGTH) {
    score += 25
  } else {
    feedback.push(`At least ${PASSWORD_MIN_LENGTH} characters`)
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 25
  } else {
    feedback.push('One uppercase letter')
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 25
  } else {
    feedback.push('One lowercase letter')
  }

  // Number check
  if (/\d/.test(password)) {
    score += 25
  } else {
    feedback.push('One number')
  }

  // Bonus for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 10
  }

  // Bonus for length > 12
  if (password.length > 12) {
    score += 10
  }

  let strength: 'weak' | 'medium' | 'strong'
  if (score < 50) {
    strength = 'weak'
  } else if (score < 85) {
    strength = 'medium'
  } else {
    strength = 'strong'
  }

  return {
    strength,
    score: Math.min(score, 100),
    feedback: feedback.length > 0 ? `Needs: ${feedback.join(', ')}` : 'Strong password!',
  }
}
