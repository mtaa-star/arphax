import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('arphax_token'))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('arphax_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const API = 'http://localhost:8000/api'

  const login = async (username, password) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/login/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setToken(data.token)
      setUser({ username: data.username, email: data.email })
      localStorage.setItem('arphax_token', data.token)
      localStorage.setItem('arphax_user', JSON.stringify({ username: data.username, email: data.email }))
      return true
    } catch (e) { setError(e.message); return false }
    finally { setLoading(false) }
  }

  const logout = async () => {
    try { await fetch(`${API}/auth/logout/`, { method: 'POST', headers: { Authorization: `Token ${token}` } }) } catch {}
    setToken(null); setUser(null)
    localStorage.removeItem('arphax_token'); localStorage.removeItem('arphax_user')
  }

  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json', ...options.headers }
    })
    if (res.status === 401) { logout(); return null }
    return res
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading, error, setError, authFetch, API }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
