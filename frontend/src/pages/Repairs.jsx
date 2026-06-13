import React, { useState } from 'react'
import { repairServices } from '../data'
import { API_BASE } from '../hooks/api'

export default function Repairs() {
  const [form, setForm] = useState({ fullName:'', phone:'', email:'', deviceType:'', brand:'', model:'', problem:'', preferredDate:'' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault(); setSubmitting(true); setError(null)
    try {
      const res = await fetch(`${API_BASE}/bookings/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name:form.fullName, phone:form.phone, email:form.email, device_type:form.deviceType, brand:form.brand, model:form.model, problem_description:form.problem, preferred_date:form.preferredDate })
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch { setError('Could not submit booking. Please try WhatsApp or call us directly.') }
    finally { setSubmitting(false) }
  }

  const resetForm = () => {
    setSubmitted(false)
    setForm({ fullName:'', phone:'', email:'', deviceType:'', brand:'', model:'', problem:'', preferredDate:'' })
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fi fi-rr-check-circle text-gold text-4xl"></i>
        </div>
        <h2 className="font-bebas text-5xl text-gold tracking-wide mb-3">Booking Received!</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-2">Thank you, <strong className="text-white">{form.fullName}</strong>. We've received your repair request.</p>
        <p className="text-gray-400 text-sm mb-8">Our team will contact you at <strong className="text-white">{form.phone}</strong> within 1–2 hours to confirm your appointment.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={resetForm} className="btn-gold">Book Another Repair</button>
          <a href="https://wa.me/254746747775" target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2"><i className="fi fi-brands-whatsapp"></i> WhatsApp Us</a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="section-label">Professional Service</div>
          <h1 className="font-bebas text-6xl tracking-wide">Book a Repair</h1>
          <p className="text-gray-400 text-sm mt-2">Fill in the form below and we'll confirm your appointment within 1–2 hours.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm p-4">{error}</div>}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} required className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required className="input-field" placeholder="0712 345 678" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Device Type *</label>
                  <select name="deviceType" value={form.deviceType} onChange={handleChange} required className="input-field">
                    <option value="">Select type</option>
                    {[['laptop','Laptop'],['desktop','Desktop PC'],['smartphone','Smartphone'],['tablet','Tablet'],['other','Other']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Brand *</label>
                  <input name="brand" value={form.brand} onChange={handleChange} required className="input-field" placeholder="e.g. HP, Samsung" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Model</label>
                  <input name="model" value={form.model} onChange={handleChange} className="input-field" placeholder="e.g. Galaxy A55" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Problem Description *</label>
                <textarea name="problem" value={form.problem} onChange={handleChange} required rows={4} className="input-field resize-none" placeholder="Describe the issue with your device..." />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Preferred Date *</label>
                <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} required className="input-field" min={new Date().toISOString().split('T')[0]} />
              </div>
              <button type="submit" disabled={submitting} className="btn-gold w-full py-4 text-base font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                <i className="fi fi-rr-tools"></i> {submitting ? 'Submitting...' : 'Submit Repair Booking'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <i className="fi fi-rr-list text-gold"></i> Repair Services
              </h3>
              <div className="space-y-3">
                {repairServices.map(s => (
                  <div key={s.name} className="flex justify-between items-start pb-3 border-b border-gray-800 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm text-white">{s.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.devices}</div>
                    </div>
                    <div className="text-gold text-xs font-medium whitespace-nowrap ml-4">From KES {s.from.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/20 p-5">
              <h3 className="text-gold text-xs uppercase tracking-widest font-medium mb-3 flex items-center gap-2">
                <i className="fi fi-rr-phone-call"></i> Contact Directly
              </h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+254746747775" className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
                  <i className="fi fi-rr-phone-call text-gold"></i> 0746 747 775
                </a>
                <a href="https://wa.me/254746747775" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
                  <i className="fi fi-brands-whatsapp text-gold"></i> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-5">
              <h3 className="text-white text-xs uppercase tracking-wide font-medium mb-3 flex items-center gap-2">
                <i className="fi fi-rr-info text-gold"></i> How It Works
              </h3>
              {['Submit your booking form','We confirm within 2 hours','Drop off your device','We diagnose and repair','Pick up your device'].map((step,i) => (
                <div key={i} className="flex gap-3 mb-3 last:mb-0">
                  <div className="w-5 h-5 bg-gold text-black text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</div>
                  <span className="text-sm text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
