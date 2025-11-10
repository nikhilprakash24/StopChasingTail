import { useState, FormEvent } from 'react'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Input'
import { useAuth } from '../context/AuthContext'
import { validateLoginForm } from '../utils/validation'
import type { LoginFormData, ValidationErrors } from '../types/auth.types'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToSignup?: () => void
  onForgotPassword?: () => void
}

export const LoginForm = ({
  onSuccess,
  onSwitchToSignup,
  onForgotPassword,
}: LoginFormProps) => {
  const { login, loading, error: authError, clearError } = useAuth()

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear field error on change
    if (field in errors && errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (authError) {
      clearError()
    }
  }

  const handleBlur = (field: keyof LoginFormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateLoginForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched({ email: true, password: true })
      return
    }

    try {
      await login(formData.email, formData.password)
      onSuccess?.()
    } catch (err) {
      // Error is handled by AuthContext
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h2>
        <p className="text-neutral-600">Sign in to continue your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Global Error */}
        {authError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-slide-in-right">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-700">{authError}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          placeholder="your.email@example.com"
          required
          autoComplete="email"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          }
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={touched.password ? errors.password : undefined}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange('rememberMe')}
              className="w-4 h-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500 transition-colors"
            />
            <span className="ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
              Remember me
            </span>
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
          Sign In
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
