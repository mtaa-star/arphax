import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const icons = { Laptops: '💻', 'Mobile Devices': '📱', Accessories: '🎧' }

function ProductImage({ src, name, category, size = 'sm' }) {
  const [err, setErr] = useState(false)
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-full h-48'
  if (src && !err) {
    return <img src={src} alt={name} onError={() => setErr(true)} className={`${dim} object-cover`} />
  }
  return (
    <div className={`${dim} bg-gray-800 flex items-center justify-center text-2xl`}>
      {icons[category] || '📦'}
    </div>
  )
}

export default function Products() {
  const { authFetch, API } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [filterCat, setFilterCat] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name:'', category:'', brand:'', price:'', specs:'', description:'', status:'in_stock', featured:false })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (filterCat) params.set('category', filterCat)
      const [prodRes, catRes] = await Promise.all([
        authFetch(`${API}/products/?${params}`),
        authFetch(`${API}/categories/`)
      ])
      if (prodRes) { const d = await prodRes.json(); setProducts(d.results || d) }
      if (catRes) { const d = await catRes.json(); setCategories(d.results || d) }
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [search, filterCat])

  const openNew = () => {
    setEditing(null)
    setForm({ name:'', category:'', brand:'', price:'', specs:'', description:'', status:'in_stock', featured:false })
    setImageFile(null)
    setImagePreview(null)
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditing(p.id)
    setForm({ name:p.name, category:p.category||'', brand:p.brand||'', price:p.price, specs:p.specs||'', description:p.description||'', status:p.status, featured:p.featured })
    setImageFile(null)
    setImagePreview(p.image || null)
    setShowForm(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editing ? `${API}/products/${editing}/` : `${API}/products/`
      const method = editing ? 'PATCH' : 'POST'

      // Use FormData so we can upload the image file
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (imageFile) fd.append('image', imageFile)

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Token ${localStorage.getItem('arphax_token')}` },
        body: fd
      })
      if (res.ok) { setShowForm(false); load() }
    } finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Delete this product?')) return
    await authFetch(`${API}/products/${id}/`, { method: 'DELETE' })
    load()
  }

  const toggleFeatured = async (p) => {
    await authFetch(`${API}/products/${p.id}/`, { method: 'PATCH', body: JSON.stringify({ featured: !p.featured }) })
    load()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-4xl tracking-wide">Products</h1>
          <p className="text-gray-500 text-xs mt-1">{products.length} products in catalogue</p>
        </div>
        <button onClick={openNew} className="btn-gold">+ Add Product</button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <input value={search} onChange={e=>setSearch(e.target.value)} className="input w-56" placeholder="Search products..." />
        <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} className="select w-44">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-800">
            <tr className="text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Image</th>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Featured</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-600">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-600">No products found</td></tr>
            ) : products.map(p => (
              <tr key={p.id} className="border-b border-gray-900 hover:bg-gray-900/50">
                <td className="px-4 py-3">
                  <ProductImage src={p.image} name={p.name} category={p.category_name} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <div className="text-white font-medium">{p.name}</div>
                  <div className="text-gray-500 text-xs">{p.specs}</div>
                </td>
                <td className="px-4 py-3 text-gray-400">{p.category_name}</td>
                <td className="px-4 py-3 text-gold font-medium">KES {Number(p.price).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 ${p.status==='in_stock'?'bg-green-900/40 text-green-400':p.status==='limited'?'bg-yellow-900/40 text-yellow-400':'bg-red-900/40 text-red-400'}`}>
                    {p.status_display}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={()=>toggleFeatured(p)} className={`text-lg ${p.featured?'text-gold':'text-gray-700 hover:text-gold'}`}>★</button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={()=>openEdit(p)} className="btn-ghost text-xs py-1 px-2">Edit</button>
                    <button onClick={()=>del(p.id)} className="text-xs text-red-500 hover:text-red-400 px-2 py-1">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bebas text-2xl tracking-wide">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={()=>setShowForm(false)} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">

              {/* Image Upload */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Product Image</label>
                <div className="flex gap-4 items-start">
                  {/* Preview */}
                  <div className="w-24 h-24 bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {imagePreview
                      ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      : <span className="text-3xl">{icons[categories.find(c=>c.id==form.category)?.name] || '📦'}</span>
                    }
                  </div>
                  {/* Upload button */}
                  <div className="flex-1">
                    <label className="block w-full cursor-pointer">
                      <div className="border border-dashed border-gray-600 hover:border-gold transition-colors p-4 text-center text-sm text-gray-400 hover:text-gold">
                        {imageFile ? (
                          <span className="text-green-400">✓ {imageFile.name}</span>
                        ) : (
                          <>
                            <div className="text-2xl mb-1">📷</div>
                            <div>Click to upload image</div>
                            <div className="text-xs text-gray-600 mt-1">JPG, PNG, WEBP · Max 5MB</div>
                          </>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imageFile && (
                      <button type="button" onClick={()=>{setImageFile(null);setImagePreview(editing?imagePreview:null)}}
                        className="text-xs text-red-400 hover:text-red-300 mt-1">
                        Remove new image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input" required placeholder="e.g. HP EliteBook 840" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="select">
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Price (KES) *</label>
                  <input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="input" required placeholder="85000" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Specs</label>
                <input value={form.specs} onChange={e=>setForm({...form,specs:e.target.value})} className="input" placeholder="Core i7 · 16GB · 512GB SSD" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="input resize-none" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
                  <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="select">
                    <option value="in_stock">In Stock</option>
                    <option value="limited">Limited</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                    <input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} className="w-4 h-4 accent-yellow-400" />
                    Mark as Featured
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gold flex-1 py-2.5 disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}
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
