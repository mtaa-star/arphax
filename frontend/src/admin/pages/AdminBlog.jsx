import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Blog() {
  const { authFetch, API } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title:'', slug:'', category:'buying_guides', excerpt:'', content:'', published:false })
  const [saving, setSaving] = useState(false)

  const cats = [
    {v:'laptop_reviews',l:'Laptop Reviews'},{v:'smartphone_reviews',l:'Smartphone Reviews'},
    {v:'buying_guides',l:'Buying Guides'},{v:'repair_tips',l:'Repair Tips'},
    {v:'technology_news',l:'Technology News'},{v:'product_comparisons',l:'Product Comparisons'},
  ]

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      const res = await authFetch(`${API}/blog/?${params}`)
      if (res) { const d = await res.json(); setPosts(d.results || d) }
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [search])

  const toSlug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')

  const openNew = () => {
    setEditing(null)
    setForm({ title:'', slug:'', category:'buying_guides', excerpt:'', content:'', published:false })
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditing(p.slug)
    setForm({ title:p.title, slug:p.slug, category:p.category, excerpt:p.excerpt, content:p.content||'', published:p.published })
    setShowForm(true)
  }

  const save = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const url = editing ? `${API}/blog/${editing}/` : `${API}/blog/`
      const res = await authFetch(url, { method: editing ? 'PATCH' : 'POST', body: JSON.stringify(form) })
      if (res?.ok) { setShowForm(false); load() }
    } finally { setSaving(false) }
  }

  const del = async (slug) => {
    if (!confirm('Delete this post?')) return
    await authFetch(`${API}/blog/${slug}/`, { method: 'DELETE' })
    load()
  }

  const togglePublish = async (post) => {
    await authFetch(`${API}/blog/${post.slug}/publish/`, { method: 'POST' })
    load()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-4xl tracking-wide">Blog Posts</h1>
          <p className="text-gray-500 text-xs mt-1">{posts.length} articles</p>
        </div>
        <button onClick={openNew} className="btn-gold">+ New Post</button>
      </div>

      <div className="flex gap-3 mb-6">
        <input value={search} onChange={e=>setSearch(e.target.value)} className="input w-64" placeholder="Search posts..." />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-800">
            <tr className="text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-600">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-600">No posts found</td></tr>
            ) : posts.map(p => (
              <tr key={p.id} className="border-b border-gray-900 hover:bg-gray-900/50">
                <td className="px-4 py-3">
                  <div className="text-white font-medium leading-tight max-w-xs">{p.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{p.read_time}</div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{p.category_display}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 ${p.published ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {p.published_at ? new Date(p.published_at).toLocaleDateString('en-KE', {day:'numeric',month:'short',year:'numeric'}) : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={()=>togglePublish(p)} className={`text-xs py-1 px-2 border transition-colors ${p.published?'border-gray-700 text-gray-400 hover:text-red-400':'border-green-800 text-green-400 hover:bg-green-900/20'}`}>
                      {p.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={()=>openEdit(p)} className="btn-ghost text-xs py-1 px-2">Edit</button>
                    <button onClick={()=>del(p.slug)} className="text-xs text-red-500 hover:text-red-400 px-2 py-1">Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bebas text-2xl tracking-wide">{editing ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={()=>setShowForm(false)} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Title *</label>
                <input value={form.title} onChange={e=>setForm({...form,title:e.target.value,slug:toSlug(e.target.value)})} className="input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Slug *</label>
                  <input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} className="input" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="select">
                    {cats.map(c=><option key={c.v} value={c.v}>{c.l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Excerpt *</label>
                <textarea value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} className="input resize-none" rows={2} required />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Content *</label>
                <textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} className="input resize-none" rows={8} required />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pub" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} className="accent-yellow-400" />
                <label htmlFor="pub" className="text-sm text-gray-300 cursor-pointer">Publish immediately</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gold flex-1 py-2.5 disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update Post' : 'Create Post'}
                </button>
                <button type="button" onClick={()=>setShowForm(false)} className="btn-outline px-6">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
