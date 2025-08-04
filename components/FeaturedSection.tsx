"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { getFeaturedProducts } from "@/lib/supabase-products"
import { Product } from "@/lib/products"

export default function FeaturedSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar productos destacados
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const products = await getFeaturedProducts()
        setFeaturedProducts(products)
      } catch (err) {
        setError('Error al cargar los productos destacados')
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Productos Destacados
            </h2>
            <p className="text-xl text-blue-100">Cargando productos destacados...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Productos Destacados
            </h2>
            <p className="text-xl text-red-300">Error al cargar los productos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const displayProducts = featuredProducts.slice(0, 6) // Limitar a 6 productos destacados

  return (
    <section
      id="destacados"
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-float delay-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            Productos Destacados
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Los electrodomésticos más vendidos y preferidos por nuestros clientes
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full animate-pulse-glow"></div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-blue-100">No hay productos destacados disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="transition-all duration-700"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
