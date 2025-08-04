'use client'

import { Categoria, Marca } from '@/lib/products'

interface DebugInfoProps {
  categories: Categoria[]
  brands: Marca[]
}

export default function DebugInfo({ categories, brands }: DebugInfoProps) {
  return (
    <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
      <h3 className="font-bold text-yellow-800 mb-2">🔍 Debug Info</h3>
      <div className="text-sm text-yellow-700">
        <p><strong>Categorías:</strong> {categories.length} elementos</p>
        <ul className="ml-4 mt-1">
          {categories.map(cat => (
            <li key={cat.id}>• {cat.id}: {cat.descripcion}</li>
          ))}
        </ul>
        <p className="mt-2"><strong>Marcas:</strong> {brands.length} elementos</p>
        <ul className="ml-4 mt-1">
          {brands.map(brand => (
            <li key={brand.id}>• {brand.id}: {brand.descripcion}</li>
          ))}
        </ul>
      </div>
    </div>
  )
} 