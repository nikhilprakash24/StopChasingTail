import { useState, FormEvent } from 'react'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Input'
import { useAuth } from '../context/AuthContext'
import { validateSignupForm, getPasswordStrength } from '../utils/validation'
import type { SignupFormData, ValidationErrors } from '../types/auth.types'

interface SignupFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export const SignupForm = ({ onSuccess, onSwitchToLogin }: SignupFormProps) => {
  const { signup, loading, error: authError, clearError } = useAuth()

  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showPassword, setShowPassword] = useState(false)

  const passwordStrength = getPasswordStrength(formData.password)

  const handleChange = (field: keyof SignupFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (authError) {
      clearError()
    }
  }

  const handleBlur = (field: keyof SignupFormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateSignupForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched({
        email: true,
        password: true,
        confirmPassword: true,
        displayName: true,
        acceptTerms: true,
      })
      return
    }

    try {
      await signup(formData.email, formData.password, formData.displayName)
      onSuccess?.()
    } catch (err) {
      // Error is handled by AuthContext
    }
  }

  const getStrengthColor = () => {
    switch (passwordStrength.strength) {
      case 'weak':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'strong':
        return 'bg-green-500'
      default:
        return 'bg-neutral-200'
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Start Your Journey</h2>
        <p className="text-neutral-600">Create your account to take back control</p>
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

        {/* Display Name */}
        <Input
          label="Display Name"
          type="text"
          value={formData.displayName}
          onChange={handleChange('displayName')}
          onBlur={handleBlur('displayName')}
          error={touched.displayName ? errors.displayName : undefined}
          placeholder="How should we call you?"
          required
          autoComplete="name"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />

        {/* Email */}
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

        {/* Password */}
        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password ? errors.password : undefined}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-purple-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            }
            iconPosition="right"
          />

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2 animate-slide-in-right">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-600">Password strength</span>
                <span className={`text-xs font-medium ${
                  passwordStrength.strength === 'weak' ? 'text-red-600' :
                  passwordStrength.strength === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">{passwordStrength.feedback}</p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />

        {/* Terms & Conditions */}
        <div>
          <label className="flex items-start cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange('acceptTerms')}
              className="w-4 h-4 mt-1 rounded border-neutral-300 text-purple-600 focus:ring-purple-500 transition-colors"
            />
            <span className="ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
              I accept the{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Privacy Policy
              </a>
            </span>
          </label>
          {touched.acceptTerms && errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
          Create Account
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

        {/* Login Link */}
        <div className="text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
