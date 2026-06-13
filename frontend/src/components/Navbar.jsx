import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/repairs', label: 'Repairs' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black border-b border-gray-800' : 'bg-black/90 border-b border-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-bebas text-2xl tracking-widest">
          <span className="text-gold">ARPHAX</span><span className="text-white">TECH</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={`text-sm tracking-wide transition-colors duration-200 ${isActive(l.to) ? 'text-gold' : 'text-gray-400 hover:text-white'}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs text-gray-400 tracking-wide">0746 747 775</span>
          <Link to="/repairs" className="btn-gold text-xs py-2 px-4">Book a Repair</Link>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-6 py-4">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`block py-3 text-sm border-b border-gray-900 ${isActive(l.to) ? 'text-gold' : 'text-gray-300'}`}>
              {l.label}
            </Link>
          ))}
          <Link to="/repairs" className="btn-gold mt-4 text-center text-sm py-3 w-full block">Book a Repair</Link>
        </div>
      )}
    </nav>
  )
}
