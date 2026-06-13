import React, { useState } from 'react'
import { API_BASE } from '../hooks/api'

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = async e => {
    e.preventDefault(); setSending(true); setError(null)
    try {
      const res = await fetch(`${API_BASE}/messages/`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch { setError('Could not send message. Please call or WhatsApp us directly.') }
    finally { setSending(false) }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="section-label">Get in Touch</div>
          <h1 className="font-bebas text-6xl tracking-wide">Contact Us</h1>
          <p className="text-gray-400 text-sm mt-2">We'd love to hear from you. Reach out via form, phone, or WhatsApp.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {sent ? (
              <div className="bg-gray-900 border border-gold/30 p-10 text-center">
                <i className="fi fi-rr-envelope text-gold text-5xl block mb-4"></i>
                <h2 className="font-bebas text-4xl text-gold tracking-wide mb-2">Message Sent!</h2>
                <p className="text-gray-300 text-sm mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button onClick={() => { setSent(false); setForm({name:'',phone:'',email:'',message:''}) }} className="btn-gold">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm p-4">{error}</div>}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="0712 345 678" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-field" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="input-field resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" disabled={sending} className="btn-gold w-full py-4 disabled:opacity-50 flex items-center justify-center gap-2">
                  <i className="fi fi-rr-paper-plane"></i> {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-5">
            {[
              {icon:'fi fi-rr-marker', label:'Location', value:'Kilifi, Kenya'},
              {icon:'fi fi-rr-phone-call', label:'Phone', value:'0746 747 775', href:'tel:+254746747775'},
              {icon:'fi fi-rr-phone-call', label:'Phone', value:'0712 531 101', href:'tel:+254712431101'},
              {icon:'fi fi-brands-whatsapp', label:'WhatsApp', value:'Chat with us', href:'https://wa.me/254746747775'},
              {icon:'fi fi-brands-whatsapp', label:'WhatsApp', value:'Chat with us', href:'https://wa.me/254712531101'},
              {icon:'fi fi-rr-clock', label:'Working Hours', value:'Mon–Sat: 8am – 7pm'},
            ].map(item => (
              <div key={item.label} className="bg-gray-900 border border-gray-800 p-5 flex gap-4 items-start hover:border-gold transition-colors">
                <i className={`${item.icon} text-gold text-xl mt-0.5 flex-shrink-0`}></i>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.label}</div>
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith('https')?'_blank':undefined} rel="noreferrer" className="text-sm text-gold hover:underline">{item.value}</a>
                    : <div className="text-sm text-white">{item.value}</div>}
                </div>
              </div>
            ))}
            <div className="bg-gold/10 border border-gold/20 p-5">
              <div className="flex items-center gap-2 mb-2">
                <i className="fi fi-rr-bolt text-gold"></i>
                <div className="text-gold text-xs uppercase tracking-widest font-medium">Quick Response</div>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">For the fastest response, reach us on WhatsApp. We typically reply within 30 minutes during business hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
