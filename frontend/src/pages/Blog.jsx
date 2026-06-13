import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../hooks/api'

const CATS = ['All','Buying Guides','Smartphone Reviews','Repair Tips','Product Comparisons','Laptop Reviews','Technology News']
const icons = { 'Buying Guides':'📋','Smartphone Reviews':'📱','Repair Tips':'🔧','Product Comparisons':'⚖️','Laptop Reviews':'💻','Technology News':'📡' }

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (active !== 'All') params.set('category', active.toLowerCase().replace(/ /g, '_'))
        const data = await apiFetch(`/blog/?${params}`)
        setPosts(Array.isArray(data) ? data : [])
      } catch { setPosts([]) }
      finally { setLoading(false) }
    }
    load()
  }, [active])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="section-label">Tech Knowledge</div>
          <h1 className="font-bebas text-6xl tracking-wide">Our Blog</h1>
          <p className="text-gray-400 text-sm mt-2">Reviews, buying guides, repair tips, and the latest in tech.</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-3 py-1.5 text-xs border transition-colors ${active === c ? 'bg-gold text-black border-gold' : 'border-gray-700 text-gray-400 hover:border-gold hover:text-gold'}`}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-gray-800" />
                <div className="p-5 space-y-2">
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                  <div className="h-4 bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">📭</div>
            <p>No posts in this category yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card block group">
                <div className="h-40 bg-gray-800 flex items-center justify-center text-5xl border-b border-gray-800 overflow-hidden">
                  {post.image
                    ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    : icons[post.category_display] || '📄'
                  }
                </div>
                <div className="p-5">
                  <div className="text-gold text-xs tracking-widest uppercase mb-2">{post.category_display}</div>
                  <h2 className="text-white text-sm font-medium leading-snug mb-3 group-hover:text-gold transition-colors">{post.title}</h2>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'}) : ''}</span>
                    <span>{post.read_time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
