import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="section-label">Our Story</div>
            <h1 className="font-bebas text-6xl md:text-7xl tracking-wide leading-none mb-6">
              About<br/><span className="text-gold">ArphaxTech</span>
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              ArphaxTech was founded with a simple mission: to make quality technology accessible to everyone in Kilifi and beyond.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Today, we serve students, professionals, and businesses across the Coast region, offering genuine laptops, smartphones, accessories, and professional repair services — all under one roof.
            </p>
            <div className="text-gold text-lg font-bebas tracking-widest">"Our Tech, Your Solution"</div>
          </div>
          <div className="bg-gray-900 border border-gold/20 p-8 space-y-6">
            {[
              ['Mission', 'fi fi-rr-target', 'To provide high-quality technology products and dependable repair services while delivering innovative solutions that empower individuals and businesses.'],
              ['Vision', 'fi fi-rr-eye', 'To become the most trusted technology solutions provider in Kenya and beyond, known for excellence in products, services, and customer satisfaction.'],
            ].map(([title, icon, text]) => (
              <div key={title}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`${icon} text-gold`}></i>
                  <div className="text-gold text-xs tracking-widest uppercase">{title}</div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="section-label">What Drives Us</div>
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {icon:'fi fi-rr-shield-check', title:'Quality Products', desc:'We stock only genuine, tested technology products from reputable brands.'},
              {icon:'fi fi-rr-wrench', title:'Reliable Repairs', desc:'Certified technicians delivering fast, honest, and lasting repair solutions.'},
              {icon:'fi fi-rr-headset', title:'Customer Support', desc:'Professional guidance and assistance before, during, and after every purchase.'},
              {icon:'fi fi-rr-bulb', title:'Innovation', desc:'Staying ahead of technology trends to offer the latest and best solutions.'},
              {icon:'fi fi-rr-tag', title:'Affordability', desc:'Competitive pricing that makes quality tech accessible to everyone.'},
              {icon:'fi fi-rr-handshake', title:'Trust', desc:'Building lasting relationships through transparency and consistent excellence.'},
            ].map(v => (
              <div key={v.title} className="bg-gray-900 border border-gray-800 p-5 hover:border-gold transition-colors">
                <i className={`${v.icon} text-gold text-3xl block mb-3`}></i>
                <h3 className="text-white text-sm font-medium mb-2">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gold/10 border border-gold/20 p-10 text-center">
          <h2 className="font-bebas text-5xl text-gold tracking-wide mb-3">Ready to Work With Us?</h2>
          <p className="text-gray-300 text-sm mb-6">Browse our products or book a repair today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="btn-gold flex items-center gap-2"><i className="fi fi-rr-laptop"></i> View Products</Link>
            <Link to="/repairs" className="btn-outline flex items-center gap-2"><i className="fi fi-rr-tools"></i> Book a Repair</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
