import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const fallbackIcons = { Laptops: 'fi fi-rr-laptop', 'Mobile Devices': 'fi fi-rr-mobile', Accessories: 'fi fi-rr-headphones' }

function ProductImage({ src, name, category }) {
  const [err, setErr] = useState(false)
  if (src && !err) {
    return <img src={src} alt={name} onError={() => setErr(true)} className="w-full h-full object-cover" />
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800">
      <i className={`${fallbackIcons[category] || 'fi fi-rr-box'} text-gold text-5xl`}></i>
    </div>
  )
}

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="card block group">
      <div className="h-48 overflow-hidden border-b border-gray-800 group-hover:border-gold transition-colors bg-gray-800">
        <ProductImage src={product.image} name={product.name} category={product.category_name || product.category} />
      </div>
      <div className="p-4">
        {product.featured && (
          <span className="inline-block bg-gold text-black text-xs font-medium px-2 py-0.5 tracking-wide mb-2">Featured</span>
        )}
        <h3 className="text-white text-sm font-medium mb-1 leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-3">{product.specs}</p>
        <div className="flex items-center justify-between">
          <span className="text-gold font-medium text-sm">KES {Number(product.price).toLocaleString()}</span>
          <span className={`text-xs px-2 py-0.5 ${(product.status==='In Stock'||product.status==='in_stock')?'bg-green-900/50 text-green-400':'bg-yellow-900/50 text-yellow-400'}`}>
            {product.status_display || product.status}
          </span>
        </div>
      </div>
    </Link>
  )
}
