// Shared type definitions for the application

export interface User {
  id: string
  email: string
  displayName: string | null
  createdAt: Date
  quitDate?: Date
}

export interface AppConfig {
  targetApps: string[]
  quitGoal: QuitGoal
  notifications: boolean
}

export interface QuitGoal {
  type: 'complete' | 'reduce'
  duration?: number // days
  dailyLimit?: number // minutes per day
}

export interface UsageEntry {
  id: string
  userId: string
  appName: string
  duration: number // minutes
  timestamp: Date
  mood?: MoodRating
}

export type MoodRating = 'great' | 'good' | 'neutral' | 'bad' | 'terrible'

export interface Streak {
  current: number
  longest: number
  lastCheckin: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
}
