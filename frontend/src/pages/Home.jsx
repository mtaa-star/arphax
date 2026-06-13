import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../hooks/api'
import { blogPosts, testimonials } from '../data'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const latestPosts = blogPosts.slice(0, 3)

  useEffect(() => {
    apiFetch('/products/featured/')
      .then(data => setFeatured((Array.isArray(data) ? data : []).slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-gold/5" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full border border-gold/10" />
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full border border-gold/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="text-gold text-xs tracking-widest uppercase mb-4">Kilifi's Tech Hub</div>
            <h1 className="font-bebas text-7xl md:text-8xl leading-none tracking-wide mb-6">
              Our Tech,<br/><span className="text-gold">Your Solutions</span>
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8">
              Quality Laptops, Mobile Devices, Accessories, and Professional Repair Services — all in one place in Kilifi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-gold">View Products</Link>
              <Link to="/repairs" className="btn-outline">Book a Repair</Link>
            </div>
            <div className="flex gap-8 mt-10 pt-10 border-t border-gray-900">
              {[['500+','Products'],['1000+','Repairs Done'],['5★','Customer Rating']].map(([num,label]) => (
                <div key={label}>
                  <div className="font-bebas text-3xl text-gold">{num}</div>
                  <div className="text-xs text-gray-500 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-4 items-end">
            {[
              {tag:'Laptops', name:'HP EliteBook 840 G8', spec:'Core i7 · 16GB · 512GB', price:'KES 85,000', featured:true},
              {tag:'Mobile', name:'Samsung Galaxy A55', spec:'8GB · 256GB · 50MP', price:'KES 42,000', featured:false},
              {tag:'Repair', name:'Screen Replacement', spec:'Phones & Laptops', price:'From KES 2,500', featured:false},
            ].map((item,i) => (
              <div key={i} className={`w-64 bg-gray-900 p-4 border ${item.featured?'border-gold':'border-gray-800'} relative`}>
                {item.featured && <span className="absolute -top-3 left-3 bg-gold text-black text-xs font-medium px-2 py-0.5 tracking-wide">FEATURED</span>}
                <div className="text-xs text-gold tracking-widest uppercase mb-1">{item.tag}</div>
                <div className="text-sm font-medium mb-1">{item.name}</div>
                <div className="text-xs text-gray-500 mb-3">{item.spec}</div>
                <div className="text-gold font-medium">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-label">Products</div>
            <h2 className="section-title mb-0">Featured Products</h2>
          </div>
          <Link to="/products" className="text-gold text-sm hover:underline">View All →</Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_,i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-800" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                  <div className="h-4 bg-gray-800 rounded w-1/3 mt-3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SERVICES */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {icon:'fi fi-rr-laptop', title:'Laptop Sales', desc:'HP, Dell, Lenovo, Asus, Acer, and Apple — new and certified refurbished units for students, professionals, and businesses.', link:'/products?cat=Laptops'},
              {icon:'fi fi-rr-mobile', title:'Mobile Devices', desc:'Samsung, Apple, Xiaomi, Tecno, Infinix, and Oppo — the latest smartphones at competitive prices.', link:'/products?cat=Mobile Devices'},
              {icon:'fi fi-rr-tools', title:'Repair Services', desc:'Screen replacements, battery swaps, software fixes, data recovery, and hardware diagnostics. Fast turnaround guaranteed.', link:'/repairs'},
            ].map(s => (
              <Link key={s.title} to={s.link} className="card block p-6 group">
                <i className={`${s.icon} text-gold text-4xl mb-4 block`}></i>
                <h3 className="text-white font-medium mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-4 text-gold text-xs tracking-wide flex items-center gap-1">
                  Learn more <i className="fi fi-rr-arrow-right text-xs"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="section-label">Why ArphaxTech</div>
        <h2 className="section-title">Built on Trust</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {icon:'fi fi-rr-shield-check', label:'Quality Products', desc:'Verified, tested devices from top brands only.'},
            {icon:'fi fi-rr-wrench', label:'Expert Repairs', desc:'Certified technicians with fast turnaround times.'},
            {icon:'fi fi-rr-tag', label:'Affordable Prices', desc:'Competitive pricing without compromising quality.'},
            {icon:'fi fi-rr-heart', label:'Customer First', desc:'Support before, during, and after every purchase.'},
          ].map((item,i) => (
            <div key={item.label} className="border-l-2 border-gold pl-4 py-2">
              <i className={`${item.icon} text-gold text-2xl block mb-2`}></i>
              <div className="text-white text-sm font-medium mb-1">{item.label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-label">Tech Knowledge</div>
              <h2 className="section-title mb-0">Latest from the Blog</h2>
            </div>
            <Link to="/blog" className="text-gold text-sm hover:underline">All Posts →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="card block group">
                <div className="h-36 bg-gray-800 flex items-center justify-center border-b border-gray-800">
                  <i className={`${post.category==='Buying Guides'?'fi fi-rr-clipboard-list':post.category==='Repair Tips'?'fi fi-rr-wrench':'fi fi-rr-mobile'} text-gold text-4xl`}></i>
                </div>
                <div className="p-5">
                  <div className="text-gold text-xs tracking-widest uppercase mb-2">{post.category}</div>
                  <h3 className="text-white text-sm font-medium leading-snug mb-3 group-hover:text-gold transition-colors">{post.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.date}</span><span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="section-label">Happy Customers</div>
        <h2 className="section-title">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t,i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_,j) => <i key={j} className="fi fi-ss-star text-gold text-sm"></i>)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div>
                <div className="text-white text-sm font-medium">{t.name}</div>
                <div className="text-gray-500 text-xs mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-bebas text-5xl text-black tracking-wide">Need a Repair? Book Today.</h2>
            <p className="text-black/60 text-sm mt-1">Fast, professional service. Most repairs completed same day.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/repairs" className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-900 transition-colors flex items-center gap-2">
              <i className="fi fi-rr-tools"></i> Book a Repair
            </Link>
            <a href="https://wa.me/254746747775" target="_blank" rel="noreferrer" className="border-2 border-black text-black px-8 py-3 text-sm font-medium hover:bg-black/10 transition-colors flex items-center gap-2">
              <i className="fi fi-brands-whatsapp"></i> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
