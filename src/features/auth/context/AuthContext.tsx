import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '../../../core/firebase/config'
import type { AuthContextType, UserProfile } from '../types/auth.types'
import { getAuthErrorMessage } from '../utils/authHelpers'

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Load user profile from Firestore
   */
  const loadUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const profileDoc = await getDoc(doc(db, 'users', uid))

      if (profileDoc.exists()) {
        const data = profileDoc.data()
        return {
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          quitDate: data.quitDate?.toDate(),
          stats: data.stats
            ? {
                ...data.stats,
                lastCheckIn: data.stats.lastCheckIn?.toDate(),
              }
            : undefined,
        } as UserProfile
      }

      return null
    } catch (err) {
      console.error('Error loading user profile:', err)
      return null
    }
  }

  /**
   * Create user profile in Firestore
   */
  const createUserProfile = async (
    user: FirebaseUser,
    additionalData?: Partial<UserProfile>
  ): Promise<void> => {
    const profileData: Partial<UserProfile> = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || additionalData?.displayName || user.email!.split('@')[0],
      photoURL: user.photoURL || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetApps: [],
      preferences: {
        notifications: true,
        emailUpdates: false,
        privacyMode: false,
        theme: 'auto',
      },
      stats: {
        currentStreak: 0,
        longestStreak: 0,
        totalDaysClean: 0,
      },
      ...additionalData,
    }

    await setDoc(doc(db, 'users', user.uid), {
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  /**
   * Sign up with email and password
   */
  const signup = async (email: string, password: string, displayName: string): Promise<void> => {
    try {
      setError(null)
      setLoading(true)

      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      // Update Firebase Auth profile
      await firebaseUpdateProfile(user, { displayName })

      // Create Firestore profile
      await createUserProfile(user, { displayName })
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Log in with email and password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Log in with Google
   */
  const loginWithGoogle = async (): Promise<void> => {
    try {
      setError(null)
      setLoading(true)

      const { user } = await signInWithPopup(auth, googleProvider)

      // Check if profile exists, if not create one
      const existingProfile = await loadUserProfile(user.uid)
      if (!existingProfile) {
        await createUserProfile(user)
      }
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Log out
   */
  const logout = async (): Promise<void> => {
    try {
      setError(null)
      await signOut(auth)
      setUser(null)
      setProfile(null)
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
      throw new Error(message)
    }
  }

  /**
   * Send password reset email
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
      throw new Error(message)
    }
  }

  /**
   * Update user profile
   */
  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error('No user logged in')

    try {
      setError(null)

      // Update Firestore profile
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: serverTimestamp(),
      })

      // Update Firebase Auth profile if displayName or photoURL changed
      if (data.displayName || data.photoURL) {
        await firebaseUpdateProfile(user, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
      }

      // Reload profile
      await refreshProfile()
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
      throw new Error(message)
    }
  }

  /**
   * Refresh user profile from Firestore
   */
  const refreshProfile = async (): Promise<void> => {
    if (!user) return

    const updatedProfile = await loadUserProfile(user.uid)
    setProfile(updatedProfile)
  }

  /**
   * Clear error state
   */
  const clearError = () => setError(null)

  /**
   * Listen to auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser)

      if (currentUser) {
        // Load user profile
        const userProfile = await loadUserProfile(currentUser.uid)
        setProfile(userProfile)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    updateProfile,
    refreshProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
