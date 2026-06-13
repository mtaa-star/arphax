import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Frontend
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Repairs from './pages/Repairs'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'

// Admin
import { AuthProvider, useAuth } from './admin/context/AuthContext'
import Sidebar from './admin/components/Sidebar'
import Login from './admin/pages/Login'
import DashboardHome from './admin/pages/DashboardHome'
import AdminProducts from './admin/pages/AdminProducts'
import AdminBlog from './admin/pages/AdminBlog'
import Bookings from './admin/pages/Bookings'
import Messages from './admin/pages/Messages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ── Public frontend layout ────────────────────────────────────────────────
function FrontendLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="font-bebas text-9xl text-gold">404</div>
                <p className="text-gray-400 mb-6">Page not found.</p>
                <a href="/" className="btn-gold">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

// ── Protected admin layout ────────────────────────────────────────────────
function AdminLayout() {
  const { token, authFetch, API } = useAuth()
  const [stats, setStats] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!token) return
    authFetch(`${API}/dashboard/`).then(r => r?.ok && r.json().then(setStats)).catch(() => {})
  }, [token, pathname])

  if (!token) return <Navigate to="/admin/login" replace />

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar stats={stats} />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome stats={stats} loading={!stats} />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/blog" element={<AdminBlog />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function AdminRoutes() {
  const { token } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/admin" replace /> : <Login />} />
      <Route path="/*" element={<AdminLayout />} />
    </Routes>
  )
}

// ── Root app ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<FrontendLayout />} />
      </Routes>
    </AuthProvider>
  )
}
