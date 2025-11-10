import { useNavigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { LoginForm } from '../components/LoginForm'
import { GoogleAuthButton } from '../components/GoogleAuthButton'

const loginQuotes = [
  {
    text: 'The first step to taking control of your life is recognizing what no longer serves you.',
    author: 'Unknown',
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: 'Zig Ziglar',
  },
  {
    text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
  },
]

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const randomQuote = loginQuotes[Math.floor(Math.random() * loginQuotes.length)]

  const handleSuccess = () => {
    navigate(from, { replace: true })
  }

  const handleSwitchToSignup = () => {
    navigate('/signup')
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  return (
    <AuthLayout quote={randomQuote}>
      <div className="space-y-6">
        <GoogleAuthButton onSuccess={handleSuccess} />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">or continue with email</span>
          </div>
        </div>

        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToSignup={handleSwitchToSignup}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    </AuthLayout>
  )
}
