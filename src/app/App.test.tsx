import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app title parts', () => {
    render(<App />)
    expect(screen.getByText('Stop')).toBeInTheDocument()
    expect(screen.getByText('ChasingTail')).toBeInTheDocument()
  })

  it('displays the tagline', () => {
    render(<App />)
    expect(screen.getByText('Take control of your dating app usage')).toBeInTheDocument()
  })

  it('displays initial quit days counter', () => {
    render(<App />)
    expect(screen.getByText('Days without dating apps')).toBeInTheDocument()
  })

  it('shows the start journey button', () => {
    render(<App />)
    expect(screen.getByText('Start Your Journey')).toBeInTheDocument()
  })
})
