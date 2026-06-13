import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../hooks/api'

const icons = { Laptops: '💻', 'Mobile Devices': '📱', Accessories: '🎧' }

function ProductImage({ src, name, category }) {
  const [err, setErr] = useState(false)
  if (src && !err) {
    return <img src={src} alt={name} onError={() => setErr(true)} className="w-full h-full object-contain p-6" />
  }
  return <span className="text-8xl">{icons[category] || '📦'}</span>
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null)
      try {
        const data = await apiFetch(`/products/${id}/`)
        setProduct(data)
        // Load related products from same category
        const rel = await apiFetch(`/products/?category=${data.category}`)
        setRelated((Array.isArray(rel) ? rel : []).filter(p => p.id !== data.id).slice(0, 3))
      } catch (e) {
        setError('Product not found.')
      } finally { setLoading(false) }
    }
    load()
  }, [id])

  if (loading) return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-900 border border-gray-800" style={{height:'360px'}} />
          <div className="space-y-4 pt-4">
            <div className="h-4 bg-gray-800 rounded w-1/4" />
            <div className="h-10 bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-800 rounded w-1/2" />
            <div className="h-8 bg-gray-800 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  )

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-gray-400 mb-4">{error || 'Product not found.'}</p>
        <Link to="/products" className="btn-gold">Back to Products</Link>
      </div>
    </div>
  )

  const catName = product.category_name || product.category
  const brandName = product.brand_name || product.brand

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-gold">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900 border border-gray-800 flex items-center justify-center" style={{height:'360px'}}>
            <ProductImage src={product.image} name={product.name} category={catName} />
          </div>

          <div>
            {product.featured && (
              <span className="inline-block bg-gold text-black text-xs font-medium px-2 py-0.5 tracking-wide mb-3">FEATURED</span>
            )}
            <div className="text-gold text-xs tracking-widest uppercase mb-2">
              {catName}{brandName ? ` · ${brandName}` : ''}
            </div>
            <h1 className="font-bebas text-5xl tracking-wide mb-2">{product.name}</h1>
            <p className="text-gray-400 text-sm mb-4">{product.specs}</p>
            <div className="text-3xl font-medium text-gold mb-2">
              KES {Number(product.price).toLocaleString()}
            </div>
            <span className={`text-xs px-3 py-1 mb-6 inline-block ${
              product.status === 'in_stock' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'
            }`}>
              {product.status_display || product.status}
            </span>

            <p className="text-gray-300 text-sm leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="btn-gold text-center">Request This Product</Link>
              <a href="tel:+254746747775" className="btn-outline text-center">📞 Call Us</a>
              <a href="https://wa.me/254746747775" target="_blank" rel="noreferrer" className="btn-outline text-center">💬 WhatsApp</a>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
              {[['✅','Genuine Product'],['🚚','Mombasa Delivery'],['🔧','After-Sales Support']].map(([icon, label]) => (
                <div key={label}>
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="section-title">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="card block group p-4">
                  <div className="h-24 flex items-center justify-center mb-3 bg-gray-800 overflow-hidden">
                    <ProductImage src={p.image} name={p.name} category={p.category_name} />
                  </div>
                  <div className="text-sm font-medium mb-1 group-hover:text-gold transition-colors">{p.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{p.specs}</div>
                  <div className="text-gold text-sm font-medium">KES {Number(p.price).toLocaleString()}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
