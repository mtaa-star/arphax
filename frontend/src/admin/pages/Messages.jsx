import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Messages() {
  const { authFetch, API } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterRead, setFilterRead] = useState('')
  const [selected, setSelected] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterRead !== '') params.set('is_read', filterRead)
      const res = await authFetch(`${API}/messages/?${params}`)
      if (res) { const d = await res.json(); setMessages(d.results || d) }
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [filterRead])

  const markRead = async (id) => {
    await authFetch(`${API}/messages/${id}/mark_read/`, { method: 'PATCH' })
    load()
    if (selected?.id === id) setSelected({ ...selected, is_read: true })
  }

  const del = async (id) => {
    if (!confirm('Delete this message?')) return
    await authFetch(`${API}/messages/${id}/`, { method: 'DELETE' })
    setSelected(null); load()
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-4xl tracking-wide">Messages</h1>
          <p className="text-gray-500 text-xs mt-1">
            {messages.length} total · <span className="text-gold">{unreadCount} unread</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={()=>setFilterRead('')} className={`btn text-xs py-1.5 px-3 border ${filterRead===''?'bg-gold text-black border-gold':'border-gray-700 text-gray-400'}`}>All</button>
        <button onClick={()=>setFilterRead('false')} className={`btn text-xs py-1.5 px-3 border ${filterRead==='false'?'bg-gold text-black border-gold':'border-gray-700 text-gray-400'}`}>Unread {unreadCount > 0 && `(${unreadCount})`}</button>
        <button onClick={()=>setFilterRead('true')} className={`btn text-xs py-1.5 px-3 border ${filterRead==='true'?'bg-gold text-black border-gold':'border-gray-700 text-gray-400'}`}>Read</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center text-gray-600">No messages found</div>
          ) : (
            <div className="divide-y divide-gray-800">
              {messages.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setSelected(m); if (!m.is_read) markRead(m.id) }}
                  className={`w-full text-left p-4 hover:bg-gray-900/60 transition-colors
                    ${selected?.id === m.id ? 'bg-gray-900 border-l-2 border-gold' : ''}
                    ${!m.is_read ? 'border-l-2 border-gold/50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{m.name}</span>
                      {!m.is_read && <span className="bg-gold text-black text-xs px-1.5 py-0.5 font-medium leading-none">NEW</span>}
                    </div>
                    <span className="text-xs text-gray-600 flex-shrink-0">
                      {new Date(m.created_at).toLocaleDateString('en-KE',{day:'numeric',month:'short'})}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{m.email}</div>
                  <div className="text-xs text-gray-400 truncate">{m.message}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="card p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-white font-medium text-base">{selected.name}</h2>
                <div className="text-xs text-gray-500 mt-0.5">{selected.email}</div>
                {selected.phone && <div className="text-xs text-gray-500">{selected.phone}</div>}
                <div className="text-xs text-gray-600 mt-1">
                  {new Date(selected.created_at).toLocaleString('en-KE', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 ${selected.is_read ? 'bg-gray-800 text-gray-500' : 'bg-gold/20 text-gold'}`}>
                {selected.is_read ? 'Read' : 'Unread'}
              </span>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-4 text-sm text-gray-300 leading-relaxed mb-5">
              {selected.message}
            </div>

            <div className="flex gap-3">
              <a href={`mailto:${selected.email}?subject=Re: Your ArphaxTech Enquiry`}
                className="btn-gold flex-1 text-center text-sm py-2.5">
                Reply via Email
              </a>
              {selected.phone && (
                <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                  className="btn-outline text-sm py-2.5 px-4">
                  WhatsApp
                </a>
              )}
              <button onClick={()=>del(selected.id)} className="btn text-sm py-2.5 px-4 text-red-500 border border-red-900 hover:bg-red-900/20">
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="card flex items-center justify-center text-gray-600 text-sm" style={{minHeight:'300px'}}>
            Select a message to view
          </div>
        )}
      </div>
    </div>
  )
}
