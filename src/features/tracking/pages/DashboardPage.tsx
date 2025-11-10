import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/context/AuthContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../shared/components/Card'
import { Button } from '../../../shared/components/Button'

// Daily quotes for motivation
const motivationalQuotes = [
  {
    text: 'You are braver than you believe, stronger than you seem, and smarter than you think.',
    author: 'A.A. Milne',
  },
  {
    text: 'The only way out is through.',
    author: 'Robert Frost',
  },
  {
    text: 'What you get by achieving your goals is not as important as what you become by achieving your goals.',
    author: 'Zig Ziglar',
  },
  {
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: 'Steve Jobs',
  },
]

export const DashboardPage = () => {
  const { profile, logout } = useAuth()
  const [dailyQuote] = useState(() => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem('quoteDate')
    const storedIndex = localStorage.getItem('quoteIndex')

    if (storedDate === today && storedIndex) {
      return motivationalQuotes[parseInt(storedIndex)]
    }

    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    localStorage.setItem('quoteDate', today)
    localStorage.setItem('quoteIndex', randomIndex.toString())
    return motivationalQuotes[randomIndex]
  })

  const [daysClean, setDaysClean] = useState(0)

  useEffect(() => {
    if (profile?.quitDate) {
      const diff = Date.now() - new Date(profile.quitDate).getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      setDaysClean(days)
    }
  }, [profile])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold gradient-text">StopChasingTail</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-neutral-900">
                  {profile?.displayName}
                </div>
                <div className="text-xs text-neutral-500">{profile?.email}</div>
              </div>

              <button
                onClick={() => logout()}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Welcome back, {profile?.displayName}! 👋
          </h1>
          <p className="text-lg text-neutral-600">
            Keep up the great work on your journey
          </p>
        </div>

        {/* Daily Quote */}
        <Card variant="gradient" className="mb-8 animate-fade-in" hover>
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-12 h-12 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 mb-2">
                  DAILY INSPIRATION
                </div>
                <blockquote className="text-2xl font-medium text-neutral-900 mb-3 leading-relaxed">
                  {dailyQuote.text}
                </blockquote>
                <cite className="text-neutral-600 not-italic">— {dailyQuote.author}</cite>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Days Clean */}
          <Card className="animate-fade-in" hover style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-neutral-500 uppercase">
                  Days Clean
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{daysClean}</div>
              <p className="text-sm text-neutral-600">Keep the momentum going!</p>
            </CardContent>
          </Card>

          {/* Current Streak */}
          <Card className="animate-fade-in" hover style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-neutral-500 uppercase">
                  Current Streak
                </div>
                <div className="p-3 bg-pink-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {profile?.stats?.currentStreak || 0}
              </div>
              <p className="text-sm text-neutral-600">Days in a row</p>
            </CardContent>
          </Card>

          {/* Longest Streak */}
          <Card className="animate-fade-in" hover style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-neutral-500 uppercase">
                  Longest Streak
                </div>
                <div className="p-3 bg-rose-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {profile?.stats?.longestStreak || 0}
              </div>
              <p className="text-sm text-neutral-600">Personal best</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Track your progress and stay accountable</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="primary" fullWidth>
                Daily Check-in
              </Button>
              <Button variant="secondary" fullWidth>
                Log Urge
              </Button>
              <Button variant="secondary" fullWidth>
                View Progress
              </Button>
              <Button variant="secondary" fullWidth>
                Get Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="animate-fade-in" hover style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle>📚 Recommended Reading</CardTitle>
              <CardDescription>Books to support your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-500 text-center py-8">Coming soon...</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" hover style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle>💬 Community</CardTitle>
              <CardDescription>Connect with others on the same path</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-500 text-center py-8">Coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
