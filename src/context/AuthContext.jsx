import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking auth status
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password.length >= 6) {
          const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            createdAt: new Date().toISOString()
          }
          setUser(userData)
          resolve(userData)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const register = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const userData = {
            id: Date.now(),
            email,
            name,
            createdAt: new Date().toISOString()
          }
          setUser(userData)
          resolve(userData)
        } else {
          reject(new Error('Invalid registration data'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
