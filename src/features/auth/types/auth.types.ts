import { User as FirebaseUser } from 'firebase/auth'

// User profile stored in Firestore
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
  quitDate?: Date // When they committed to quitting
  targetApps: string[] // Apps they want to quit
  preferences: UserPreferences
  stats?: UserStats
}

export interface UserPreferences {
  notifications: boolean
  emailUpdates: boolean
  privacyMode: boolean
  theme: 'light' | 'dark' | 'auto'
}

export interface UserStats {
  currentStreak: number
  longestStreak: number
  totalDaysClean: number
  lastCheckIn?: Date
}

// Auth state
export interface AuthState {
  user: FirebaseUser | null
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

// Auth context type
export interface AuthContextType extends AuthState {
  // Authentication methods
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>

  // Profile methods
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>

  // Helper methods
  clearError: () => void
}

// Form data types
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  displayName: string
  acceptTerms: boolean
}

export interface PasswordResetFormData {
  email: string
}

// Validation errors
export interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
  displayName?: string
  acceptTerms?: string
  general?: string
}

// Auth error codes
export enum AuthErrorCode {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
  WEAK_PASSWORD = 'auth/weak-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  NETWORK_ERROR = 'auth/network-request-failed',
  POPUP_CLOSED = 'auth/popup-closed-by-user',
  ACCOUNT_EXISTS_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
}

// Auth error messages
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCode.EMAIL_ALREADY_IN_USE]:
    'An account with this email already exists',
  [AuthErrorCode.INVALID_EMAIL]: 'Invalid email address',
  [AuthErrorCode.WEAK_PASSWORD]: 'Password must be at least 8 characters',
  [AuthErrorCode.USER_NOT_FOUND]: 'No account found with this email',
  [AuthErrorCode.WRONG_PASSWORD]: 'Incorrect password',
  [AuthErrorCode.TOO_MANY_REQUESTS]:
    'Too many failed attempts. Please try again later',
  [AuthErrorCode.NETWORK_ERROR]:
    'Network error. Please check your internet connection',
  [AuthErrorCode.POPUP_CLOSED]:
    'Sign-in popup was closed before completing',
  [AuthErrorCode.ACCOUNT_EXISTS_DIFFERENT_CREDENTIAL]:
    'An account already exists with this email using a different sign-in method',
}
