import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-bebas text-3xl tracking-widest mb-2">
              <span className="text-gold">ARPHAX</span><span className="text-white">TECH</span>
            </div>
            <div className="w-10 h-0.5 bg-gold mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your trusted technology partner in Kilifi. Quality laptops, mobile devices, accessories, and professional repair services.
            </p>
            <p className="text-gold text-xs tracking-widest uppercase mt-4 font-medium">Our Tech, Your Solutions</p>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/products', 'Products'], ['/repairs', 'Book a Repair'], ['/blog', 'Blog'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 text-sm hover:text-gold transition-colors flex items-center gap-2">
                    <i className="fi fi-rr-angle-right text-xs text-gold"></i> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2 items-start">
                <i className="fi fi-rr-marker text-gold mt-0.5 flex-shrink-0"></i>
                <span>Kilifi, Kenya</span>
              </li>
              <li className="flex gap-2 items-center">
                <i className="fi fi-rr-phone-call text-gold flex-shrink-0"></i>
                <a href="tel:+254746747775" className="hover:text-gold transition-colors">0746 747 775</a>
              </li>
              <li className="flex gap-2 items-center">
                <i className="fi fi-rr-phone-call text-gold flex-shrink-0"></i>
                <a href="tel:+254712531101" className="hover:text-gold transition-colors">0712 531 101</a>
              </li>
              <li className="flex gap-2 items-center">
                <i className="fi fi-brands-whatsapp text-gold flex-shrink-0"></i>
                <a href="https://wa.me/254746747775" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex gap-2 items-center">
                <i className="fi fi-brands-whatsapp text-gold flex-shrink-0"></i>
                <a href="https://wa.me/254712531101" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex gap-2 items-center">
                <i className="fi fi-brands-facebook text-gold flex-shrink-0"></i>
                <a href="https://www.facebook.com/p/ArphaxTech-Laptops-and-Computers-Hub-100069784000455/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook</a>
              </li>
              <li className="flex gap-2 items-center">
                <i className="fi fi-rr-clock text-gold flex-shrink-0"></i>
                <span>Sun–Fri: 8am – 9pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© 2026 ArphaxTech. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with care in Kilifi, Kenya</p>
        </div>
      </div>
    </footer>
  )
}
