import { useState } from 'react'

function App() {
  const [quitDays, setQuitDays] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Stop<span className="text-purple-600">ChasingTail</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your dating app usage
          </p>

          <div className="bg-purple-100 rounded-xl p-6 mb-8">
            <div className="text-6xl font-bold text-purple-600 mb-2">{quitDays}</div>
            <div className="text-gray-700 text-lg">Days without dating apps</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">0h</div>
              <div className="text-sm text-gray-600">Time saved</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Current streak</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>

          <button
            onClick={() => setQuitDays(quitDays + 1)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Start Your Journey
          </button>

          <div className="mt-8 text-sm text-gray-500">
            <p>🚀 Foundation Setup Complete</p>
            <p>Ready to build features!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
