import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiFetch } from '../hooks/api'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['All', 'Laptops', 'Mobile Devices', 'Accessories']

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || 'All')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveCat(cat)
  }, [searchParams])

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null)
      try {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (activeCat !== 'All') params.set('category', activeCat.toLowerCase().replace(' ', '-'))
        const data = await apiFetch(`/products/?${params}`)
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        setError('Could not load products. Make sure the backend is running.')
      } finally { setLoading(false) }
    }
    const timer = setTimeout(load, search ? 400 : 0)
    return () => clearTimeout(timer)
  }, [search, activeCat])

  // Client-side category filter as fallback
  const filtered = activeCat === 'All'
    ? products
    : products.filter(p => (p.category_name || '').toLowerCase() === activeCat.toLowerCase())

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="section-label">Catalogue</div>
          <h1 className="font-bebas text-6xl tracking-wide">Our Products</h1>
          <p className="text-gray-400 text-sm mt-2">Browse laptops, mobile devices, and accessories available at ArphaxTech.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products or brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field md:w-72"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setSearchParams(cat !== 'All' ? { cat } : {}) }}
                className={`px-4 py-2 text-sm border transition-colors ${activeCat === cat ? 'bg-gold text-black border-gold' : 'border-gray-700 text-gray-400 hover:border-gold hover:text-gold'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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

        {error && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-gray-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="text-gray-500 text-sm mb-6">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <div className="text-5xl mb-4">🔍</div>
                <p>No products found. Try a different search or category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
