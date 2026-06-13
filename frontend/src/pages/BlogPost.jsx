import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../hooks/api'

const icons = { 'Buying Guides':'📋','Smartphone Reviews':'📱','Repair Tips':'🔧','Product Comparisons':'⚖️','Laptop Reviews':'💻','Technology News':'📡' }

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null)
      try {
        const data = await apiFetch(`/blog/${id}/`)
        setPost(data)
        const all = await apiFetch(`/blog/?category=${data.category}`)
        setRelated((Array.isArray(all) ? all : []).filter(p => p.slug !== data.slug).slice(0, 3))
      } catch { setError('Post not found.') }
      finally { setLoading(false) }
    }
    load()
  }, [id])

  if (loading) return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-1/4" />
        <div className="h-10 bg-gray-800 rounded w-3/4" />
        <div className="h-64 bg-gray-800 mt-6" />
      </div>
    </div>
  )

  if (error || !post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-gray-400 mb-4">Post not found.</p>
        <Link to="/blog" className="btn-gold">Back to Blog</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-gold">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white line-clamp-1">{post.title}</span>
        </div>

        <div className="text-gold text-xs tracking-widest uppercase mb-4">{post.category_display}</div>
        <h1 className="font-bebas text-5xl md:text-6xl leading-tight tracking-wide mb-4">{post.title}</h1>
        <div className="flex gap-4 text-xs text-gray-500 mb-8">
          <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-KE',{day:'numeric',month:'long',year:'numeric'}) : ''}</span>
          <span>·</span>
          <span>{post.read_time}</span>
          <span>·</span>
          <span>ArphaxTech Team</span>
        </div>

        <div className="h-64 bg-gray-900 border border-gray-800 flex items-center justify-center text-8xl mb-10 overflow-hidden">
          {post.image
            ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            : icons[post.category_display] || '📄'
          }
        </div>

        <div className="text-gray-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
          {post.content}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-sm text-gray-400">Found this helpful? Share it!</div>
          <div className="flex gap-3">
            <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`} target="_blank" rel="noreferrer" className="btn-outline text-xs py-2 px-4">Share on WhatsApp</a>
            <Link to="/contact" className="btn-gold text-xs py-2 px-4">Ask Us a Question</Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="section-title">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="card block group p-4">
                  <div className="text-3xl mb-3">{icons[p.category_display] || '📄'}</div>
                  <div className="text-gold text-xs tracking-widest uppercase mb-1">{p.category_display}</div>
                  <div className="text-sm font-medium group-hover:text-gold transition-colors leading-snug">{p.title}</div>
                  <div className="text-xs text-gray-500 mt-2">{p.published_at ? new Date(p.published_at).toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'}) : ''}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
