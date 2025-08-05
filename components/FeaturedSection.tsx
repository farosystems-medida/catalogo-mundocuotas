"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import Pagination from "./Pagination"
import { getFeaturedProducts } from "@/lib/supabase-products"
import { Product } from "@/lib/products"

const FEATURED_PRODUCTS_PER_PAGE = 3

export default function FeaturedSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

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

  // Calcular paginación para productos destacados
  const totalPages = Math.ceil(featuredProducts.length / FEATURED_PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * FEATURED_PRODUCTS_PER_PAGE
  const displayProducts = featuredProducts.slice(startIndex, startIndex + FEATURED_PRODUCTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll suave a la sección de destacados
    document.getElementById("destacados")?.scrollIntoView({ behavior: "smooth" })
  }

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

        {/* Contador de productos destacados */}
        <div className="mb-8 text-center">
          <p className="text-blue-100">
            Mostrando <span className="font-semibold text-yellow-300">{displayProducts.length}</span> de{" "}
            <span className="font-semibold text-yellow-300">{featuredProducts.length}</span> productos destacados
          </p>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-blue-100">No hay productos destacados disponibles</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product, index) => (
                <div
                  key={`${product.id}-${currentPage}`}
                  className={`transition-all duration-700 ${
                    index === 0
                      ? "delay-100 animate-fade-in-up"
                      : index === 1
                        ? "delay-200 animate-fade-in-up"
                        : "delay-300 animate-fade-in-up"
                  }`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Paginación para productos destacados */}
            {featuredProducts.length > FEATURED_PRODUCTS_PER_PAGE && (
              <div className="mt-12">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
