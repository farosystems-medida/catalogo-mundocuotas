"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import GlobalAppBar from "@/components/GlobalAppBar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import FormattedProductDescription from "@/components/FormattedProductDescription"
import { getPromocionBySlugOrId } from "@/lib/supabase-products"
import { Promocion } from "@/lib/products"
import { ArrowLeft, Calendar } from "lucide-react"

interface PromocionPageClientProps {
  params: Promise<{
    slug: string
  }>
}

export default function PromocionPageClient({ params: paramsPromise }: PromocionPageClientProps) {
  const [promocion, setPromocion] = useState<Promocion | null>(null)
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<{ slug: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await paramsPromise
      setParams(resolvedParams)
    }
    resolveParams()
  }, [paramsPromise])

  useEffect(() => {
    if (!params) return

    const loadPromocion = async () => {
      try {
        setLoading(true)

        const promocionData = await getPromocionBySlugOrId(params.slug)

        if (!promocionData) {
          notFound()
          return
        }

        setPromocion(promocionData)
      } catch (error) {
        console.error('Error loading promocion:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadPromocion()
  }, [params])

  const handleBackToHome = () => {
    router.push('/#promociones')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando promoción...</p>
        </div>
      </div>
    )
  }

  if (!promocion) {
    notFound()
    return null
  }

  const productos = (promocion.items || [])
    .map(item => item.producto)
    .filter((producto): producto is NonNullable<typeof producto> => Boolean(producto))

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalAppBar />

      {/* Banner de la promoción */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[32/9] max-h-[220px] sm:max-h-[320px] overflow-hidden">
        <Image
          src="/dia-del-padre.jpg"
          alt={promocion.nombre}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
              {promocion.nombre}
            </h1>
            {promocion.fecha_vigencia_fin && (
              <div className="flex items-center space-x-2 text-white/90 mt-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm sm:text-base">
                  Válido hasta: {new Date(promocion.fecha_vigencia_fin).toLocaleDateString('es-AR')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button
            onClick={handleBackToHome}
            className="flex items-center hover:text-violet-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Inicio
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{promocion.nombre}</span>
        </nav>

        {/* Descripción de la promoción */}
        {promocion.descripcion && (
          <div className="mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-4xl mx-auto">
              <FormattedProductDescription description={promocion.descripcion} />
            </div>
          </div>
        )}

        {/* Productos de la promoción */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
          Productos en esta promoción
        </h2>

        {productos.length === 0 ? (
          <p className="text-center text-gray-600">No hay productos asociados a esta promoción.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
