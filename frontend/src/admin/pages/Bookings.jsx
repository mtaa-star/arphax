import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const STATUS_OPTIONS = ['pending','confirmed','in_progress','completed','cancelled']
const STATUS_LABELS = { pending:'Pending', confirmed:'Confirmed', in_progress:'In Progress', completed:'Completed', cancelled:'Cancelled' }

export default function Bookings() {
  const { authFetch, API } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (filterStatus) params.set('status', filterStatus)
      const res = await authFetch(`${API}/bookings/?${params}`)
      if (res) { const d = await res.json(); setBookings(d.results || d) }
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [search, filterStatus])

  const openDetail = (b) => {
    setSelected(b); setNewStatus(b.status); setAdminNotes(b.admin_notes || '')
  }

  const updateStatus = async () => {
    if (!selected) return
    setUpdating(true)
    try {
      const res = await authFetch(`${API}/bookings/${selected.id}/update_status/`, {
        method: 'PATCH', body: JSON.stringify({ status: newStatus, admin_notes: adminNotes })
      })
      if (res?.ok) { setSelected(null); load() }
    } finally { setUpdating(false) }
  }

  const statusColor = s => ({pending:'text-yellow-400',confirmed:'text-blue-400',in_progress:'text-purple-400',completed:'text-green-400',cancelled:'text-red-400'}[s]||'text-gray-400')
  const statusBg = s => ({pending:'badge-pending',confirmed:'badge-confirmed',in_progress:'badge-in_progress',completed:'badge-completed',cancelled:'badge-cancelled'}[s]||'')

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-4xl tracking-wide">Repair Bookings</h1>
          <p className="text-gray-500 text-xs mt-1">{bookings.length} bookings</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <input value={search} onChange={e=>setSearch(e.target.value)} className="input w-56" placeholder="Search name, phone, device..." />
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="select w-44">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s=><option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {STATUS_OPTIONS.map(s => {
          const count = bookings.filter(b=>b.status===s).length
          return (
            <button key={s} onClick={()=>setFilterStatus(filterStatus===s?'':s)}
              className={`card p-3 text-center cursor-pointer hover:border-gold transition-colors ${filterStatus===s?'border-gold':''}`}>
              <div className={`font-bebas text-2xl ${statusColor(s)}`}>{count}</div>
              <div className="text-xs text-gray-500">{STATUS_LABELS[s]}</div>
            </button>
          )
        })}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-800">
            <tr className="text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Device</th>
              <th className="text-left px-4 py-3">Problem</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-600">Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-600">No bookings found</td></tr>
            ) : bookings.map(b => (
              <tr key={b.id} className="border-b border-gray-900 hover:bg-gray-900/50">
                <td className="px-4 py-3">
                  <div className="text-white font-medium">{b.full_name}</div>
                  <div className="text-gray-500 text-xs">{b.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-white">{b.brand} {b.model}</div>
                  <div className="text-gray-500 text-xs capitalize">{b.device_type_display}</div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs max-w-xs truncate">{b.problem_description}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(b.preferred_date).toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'})}
                </td>
                <td className="px-4 py-3">
                  <span className={statusBg(b.status)}>{STATUS_LABELS[b.status]}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={()=>openDetail(b)} className="btn-ghost text-xs py-1 px-3">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail / Update Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bebas text-2xl tracking-wide">Booking #{selected.id}</h2>
              <button onClick={()=>setSelected(null)} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Customer', selected.full_name], ['Phone', selected.phone],
                  ['Email', selected.email||'—'], ['Device', `${selected.brand} ${selected.model}`],
                  ['Type', selected.device_type_display], ['Preferred Date', new Date(selected.preferred_date).toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'})],
                ].map(([label,val])=>(
                  <div key={label}>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className="text-white">{val}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Problem Description</div>
                <div className="text-gray-300 text-sm bg-gray-900 p-3 leading-relaxed">{selected.problem_description}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Update Status</label>
                <select value={newStatus} onChange={e=>setNewStatus(e.target.value)} className="select">
                  {STATUS_OPTIONS.map(s=><option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Admin Notes</label>
                <textarea value={adminNotes} onChange={e=>setAdminNotes(e.target.value)} className="input resize-none" rows={3} placeholder="Internal notes about this repair..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={updateStatus} disabled={updating} className="btn-gold flex-1 py-2.5 disabled:opacity-50">
                  {updating ? 'Saving...' : 'Update Booking'}
                </button>
                <button onClick={()=>setSelected(null)} className="btn-outline px-6">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
