import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  quote?: {
    text: string
    author: string
  }
}

const defaultQuote = {
  text: 'The first step to taking control of your life is recognizing what no longer serves you.',
  author: 'Unknown',
}

export const AuthLayout = ({ children, quote = defaultQuote }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side - Inspirational Content */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500" />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white w-full">
          {/* Logo/Brand */}
          <div className="mb-12 text-center animate-fade-in">
            <div className="text-6xl font-bold mb-4">
              Stop<span className="text-white/90">ChasingTail</span>
            </div>
            <p className="text-xl text-white/90">Take back control of your life</p>
          </div>

          {/* Quote Card */}
          <div className="max-w-lg animate-fade-in-up glass-dark rounded-3xl p-8 shadow-2xl">
            <svg
              className="w-12 h-12 text-white/50 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <blockquote className="text-2xl font-light leading-relaxed mb-6">
              {quote.text}
            </blockquote>

            <cite className="text-white/70 not-italic">— {quote.author}</cite>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">10k+</div>
              <div className="text-sm text-white/80">Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">50k+</div>
              <div className="text-sm text-white/80">Days Clean</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">98%</div>
              <div className="text-sm text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
