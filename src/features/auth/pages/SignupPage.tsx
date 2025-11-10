import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { SignupForm } from '../components/SignupForm'
import { GoogleAuthButton } from '../components/GoogleAuthButton'

const signupQuotes = [
  {
    text: 'Your future self will thank you for the decision you make today.',
    author: 'Unknown',
  },
  {
    text: 'Every journey begins with a single step. Take yours today.',
    author: 'Lao Tzu',
  },
  {
    text: 'The only person you are destined to become is the person you decide to be.',
    author: 'Ralph Waldo Emerson',
  },
]

export const SignupPage = () => {
  const navigate = useNavigate()

  const randomQuote = signupQuotes[Math.floor(Math.random() * signupQuotes.length)]

  const handleSuccess = () => {
    navigate('/dashboard', { replace: true })
  }

  const handleSwitchToLogin = () => {
    navigate('/login')
  }

  return (
    <AuthLayout quote={randomQuote}>
      <div className="space-y-6">
        <GoogleAuthButton
          onSuccess={handleSuccess}
          text="Sign up with Google"
        />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">or sign up with email</span>
          </div>
        </div>

        <SignupForm
          onSuccess={handleSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </AuthLayout>
  )
}
