import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import API from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('bizsense_user')
    const token = localStorage.getItem('bizsense_token')
    if (stored && token) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('bizsense_user')
        localStorage.removeItem('bizsense_token')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password })
    localStorage.setItem('bizsense_token', data.token)
    localStorage.setItem('bizsense_user', JSON.stringify(data.user || { email }))
    setUser(data.user || { email })
    return data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const { data } = await API.post('/auth/register', { name, email, password })
    localStorage.setItem('bizsense_token', data.token)
    localStorage.setItem('bizsense_user', JSON.stringify(data.user || { name, email }))
    setUser(data.user || { name, email })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('bizsense_token')
    localStorage.removeItem('bizsense_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}