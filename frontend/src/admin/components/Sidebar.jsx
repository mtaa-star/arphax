import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/admin', icon: 'fi fi-rr-dashboard', label: 'Dashboard' },
  { to: '/admin/products', icon: 'fi fi-rr-laptop', label: 'Products' },
  { to: '/admin/blog', icon: 'fi fi-rr-document', label: 'Blog Posts' },
  { to: '/admin/bookings', icon: 'fi fi-rr-tools', label: 'Repair Bookings' },
  { to: '/admin/messages', icon: 'fi fi-rr-envelope', label: 'Messages' },
]

export default function Sidebar({ stats }) {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`flex flex-col bg-black border-r border-gray-800 transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'} min-h-screen flex-shrink-0`}>
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-800">
        {!collapsed && (
          <span className="font-bebas text-lg tracking-widest">
            <span className="text-gold">ARPHAX</span><span className="text-white">TECH</span>
          </span>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 hover:text-gold p-1 ml-auto">
          <i className={`fi ${collapsed ? 'fi-rr-angle-right' : 'fi-rr-angle-left'} text-sm`}></i>
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(item => {
          const active = item.to === '/admin' ? pathname === '/admin' : pathname.startsWith(item.to)
          const badge = item.to === '/admin/bookings' ? stats?.pending_bookings
            : item.to === '/admin/messages' ? stats?.unread_messages : null
          return (
            <Link key={item.to} to={item.to} title={collapsed ? item.label : ''}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative
                ${active ? 'bg-gold/10 text-gold border-r-2 border-gold' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}>
              <i className={`${item.icon} text-base flex-shrink-0`}></i>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && badge > 0 && (
                <span className="ml-auto bg-gold text-black text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">{badge}</span>
              )}
              {collapsed && badge > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">{badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-800 p-3">
        {!collapsed && <div className="text-xs text-gray-500 mb-2 px-1 truncate">{user?.username}</div>}
        <button onClick={logout} title={collapsed ? 'Logout' : ''} className="flex items-center gap-2 w-full text-xs text-gray-500 hover:text-red-400 transition-colors px-1 py-1">
          <i className="fi fi-rr-sign-out-alt"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
