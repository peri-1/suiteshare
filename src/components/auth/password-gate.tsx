'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BETA_PASSWORD = '100mainst'

interface PasswordGateProps {
  children: React.ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated (stored in localStorage)
    const isAuth = localStorage.getItem('suiteshare_auth') === 'true'
    setIsAuthenticated(isAuth)
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === BETA_PASSWORD) {
      localStorage.setItem('suiteshare_auth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password. Please contact the SuiteShare team.')
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏟️</div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4">🏟️</div>
          <CardTitle className="text-2xl">SuiteShare Beta</CardTitle>
          <p className="text-gray-600">
            Private beta testing - Password required
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter beta password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Access Beta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Beta testers: Contact us for access</p>
            <p>support@suiteshare.net</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
