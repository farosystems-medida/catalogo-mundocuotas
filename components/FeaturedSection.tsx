"use client"

import { useEffect, useState, useRef } from "react"
import ProductCard from "./ProductCard"
import Pagination from "./Pagination"
import { getFeaturedProducts } from "@/lib/supabase-products"
import { getTituloSeccionDestacados } from "@/lib/supabase-config"
import { Product } from "@/lib/products"

const FEATURED_PRODUCTS_PER_PAGE = 3

export default function FeaturedSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentMobilePage, setCurrentMobilePage] = useState(0)
  const [tituloSeccion, setTituloSeccion] = useState<string>('Productos Destacados')
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const mobileAutoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollLeft, setStartScrollLeft] = useState(0)


  // Cargar productos destacados y título
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [products, titulo] = await Promise.all([
          getFeaturedProducts(),
          getTituloSeccionDestacados()
        ])
        setFeaturedProducts(products)
        setTituloSeccion(titulo)
      } catch (err) {
        setError('Error al cargar los productos destacados')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Autoplay para cambiar de página automáticamente (desktop)
  useEffect(() => {
    const totalPages = Math.ceil(featuredProducts.length / FEATURED_PRODUCTS_PER_PAGE)

    if (featuredProducts.length > FEATURED_PRODUCTS_PER_PAGE) {
      autoplayRef.current = setInterval(() => {
        setCurrentPage((prevPage) => {
          const nextPage = prevPage >= totalPages ? 1 : prevPage + 1
          return nextPage
        })
      }, 10000) // Cambia cada 10 segundos

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current)
        }
      }
    }
  }, [featuredProducts.length])

  // Autoplay para móviles - cambiar cada 2 segundos mostrando 2 productos
  useEffect(() => {
    if (featuredProducts.length <= 2) return

    const totalMobilePages = Math.ceil(featuredProducts.length / 2)

    mobileAutoplayRef.current = setInterval(() => {
      setCurrentMobilePage((prev) => (prev + 1) % totalMobilePages)
    }, 2000)

    return () => {
      if (mobileAutoplayRef.current) {
        clearInterval(mobileAutoplayRef.current)
      }
    }
  }, [featuredProducts.length])

  // Manejadores de eventos táctiles y mouse para scroll manual
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX)
    setStartScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setStartScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = startScrollLeft - walk
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.touches[0].pageX
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = startScrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Sincronizar scroll con la página actual en móviles
  useEffect(() => {
    if (!scrollRef.current) return
    const cardWidth = 240 // w-56 (224px) + gap-4 (16px)
    const scrollPosition = currentMobilePage * cardWidth * 2
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }, [currentMobilePage])


  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
      className="pt-8 pb-20 text-white relative overflow-hidden"
    >
      {/* Imagen de fondo de la familia */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/navidad.png')"
        }}
      >
        {/* Overlay para mantener legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-blue-800/80"></div>
      </div>

      {/* Fondo animado */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-float delay-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent whitespace-nowrap">
            {tituloSeccion}
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Los electrodomésticos más vendidos y preferidos por nuestros clientes
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full animate-pulse-glow"></div>
        </div>

        {/* Contador de productos destacados */}
        <div className="mb-8 text-center mt-4">
          <p className="text-blue-100">
            <span className="md:hidden">
              <span className="font-semibold text-yellow-300">{featuredProducts.length}</span> productos destacados
            </span>
            <span className="hidden md:inline">
              Mostrando <span className="font-semibold text-yellow-300">{displayProducts.length}</span> de{" "}
              <span className="font-semibold text-yellow-300">{featuredProducts.length}</span> productos destacados
            </span>
          </p>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-blue-100">No hay productos destacados disponibles</p>
          </div>
        ) : (
          <>
            {/* Carrusel para móviles - 2 productos a la vez con cambio cada 5 segundos */}
            <div className="md:hidden">
              <div
                className="overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="flex gap-4 px-4">
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-56"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid para desktop */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
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

              {/* Paginación para desktop */}
              {featuredProducts.length > FEATURED_PRODUCTS_PER_PAGE && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
