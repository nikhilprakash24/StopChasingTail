# StopChasingTail 🎯

> Take control of your dating app usage and build healthier habits

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8)](https://web.dev/progressive-web-apps/)

## 🎯 Mission

StopChasingTail is a progressive web application designed to help people quit or reduce their dating app usage. We provide tracking, accountability, motivation, and community support for those seeking healthier relationships with technology and dating.

## ✨ Features

### Current (MVP - Phase 1)
- ✅ Modern PWA architecture (works offline, installable)
- ✅ Beautiful, responsive UI with TailwindCSS
- ✅ TypeScript for type safety
- ✅ Comprehensive testing setup

### Coming Soon
- 📊 Usage tracking and visualization
- 🎯 Customizable quit goals
- 🏆 Gamification and achievements
- 📅 Streak tracking
- 💪 Motivational system
- 👥 Community support
- 📱 Push notifications
- 📈 Progress reports

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/nikhilprakash24/StopChasingTail.git

# Navigate to project directory
cd StopChasingTail

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run lint         # Lint code
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🏗️ Architecture

### Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | TailwindCSS 4 |
| **State Management** | Zustand (coming soon) |
| **Testing** | Vitest + React Testing Library |
| **PWA** | Vite PWA Plugin |
| **Backend** | Firebase (planned) |
| **Linting** | ESLint 9 + Prettier 3 |

### Project Structure

```
src/
├── features/           # Feature modules (domain-driven)
│   ├── auth/          # Authentication
│   ├── tracking/      # Usage tracking
│   ├── blocking/      # App blocking features
│   ├── progress/      # Progress tracking
│   └── community/     # Community features
├── shared/            # Shared code
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── core/              # Core services
│   ├── storage/       # Data persistence
│   ├── analytics/     # Analytics tracking
│   └── notifications/ # Push notifications
└── app/               # App shell and routing
```

## 🧪 Testing

We maintain high test coverage and comprehensive testing:

```bash
# Run all tests
npm test

# Run tests with UI for debugging
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Testing Philosophy
- Unit tests for all utilities and hooks
- Component tests for UI components
- Integration tests for features
- E2E tests for critical user journeys (coming soon)
- Target: >80% code coverage

## 📱 PWA Features

StopChasingTail is a Progressive Web App with:
- ✅ Installable on mobile and desktop
- ✅ Offline functionality
- ✅ Fast loading with service workers
- ✅ App-like experience
- 📋 Push notifications (coming soon)

## 🎨 Design Philosophy

1. **User-First**: Every feature serves the user's quit journey
2. **Privacy-First**: Minimal data collection, user owns their data
3. **Accessibility-First**: WCAG 2.1 AA compliance
4. **Test-First**: Quality and reliability build trust
5. **Simple-First**: Start with MVP, iterate based on feedback

## 🗺️ Roadmap

### Phase 1: Foundation & MVP ✅ (Current)
- [x] Project setup and architecture
- [x] PWA configuration
- [x] Testing infrastructure
- [ ] Authentication
- [ ] Basic tracking
- [ ] Simple dashboard

### Phase 2: Core Features (Next)
- [ ] Advanced tracking and visualization
- [ ] Gamification system
- [ ] Motivational content
- [ ] Journaling

### Phase 3: Community (Future)
- [ ] Support groups
- [ ] Accountability partners
- [ ] Success stories
- [ ] Social features

### Phase 4: Advanced (Future)
- [ ] Browser extension
- [ ] Native mobile apps
- [ ] AI-powered insights
- [ ] Professional integration

## 🤝 Contributing

This project is currently in active development. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with love to help people develop healthier relationships with technology and dating.

---

**Made with ❤️ by the StopChasingTail team**

*Because your time and mental health are worth more than endless swiping.*
