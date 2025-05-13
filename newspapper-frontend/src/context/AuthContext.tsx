/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { jwtDecode } from 'jwt-decode'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  token: string | null
  user: { id: string; name: string; email: string } | null
  login: (token: string, user: { id: string; name: string; email: string }) => void
  logout: () => void
  isAuthenticated: () => boolean
}

interface TokenPayload {
  id: string
  iat: string
  exp: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)

  const login = (newToken: string, newUser: { id: string; name: string; email: string }) => {
    setToken(newToken)
    setUser(newUser)

    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = (): boolean => {
    if (!token) return false
    try {
      const decoded = jwtDecode<TokenPayload>(token)

      return parseInt(decoded.exp) > Date.now() / 1000
    } catch (error: any) {
      throw error
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
