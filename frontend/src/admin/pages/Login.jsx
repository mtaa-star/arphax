import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(form.username, form.password)
    if (ok) navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-bebas text-5xl tracking-widest mb-1">
            <span className="text-gold">ARPHAX</span><span className="text-white">TECH</span>
          </div>
          <div className="w-8 h-0.5 bg-gold mx-auto mb-3" />
          <p className="text-gray-500 text-xs tracking-widest uppercase">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-950 border border-gray-800 p-8 space-y-5">
          <h1 className="text-white text-sm font-medium uppercase tracking-widest mb-6">Sign In</h1>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 text-xs p-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3 text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-6">
          ArphaxTech © 2025 · Admin access only
        </p>
      </div>
    </div>
  )
}