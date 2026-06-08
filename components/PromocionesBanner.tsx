"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getPromocionesVigentes, getPromocionSlug } from "@/lib/supabase-products"
import { Promocion } from "@/lib/products"

export default function PromocionesBanner() {
  const [promociones, setPromociones] = useState<Promocion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPromociones = async () => {
      try {
        setLoading(true)
        const data = await getPromocionesVigentes()
        setPromociones(data)
      } catch (err) {
        console.error('Error al cargar las promociones:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPromociones()
  }, [])

  if (loading || promociones.length === 0) {
    return null
  }

  return (
    <section
      id="promociones"
      className="py-12 bg-gradient-to-br from-fuchsia-950 via-purple-950 to-violet-900 relative overflow-hidden"
    >
      {/* Fondo animado, igual que en las otras secciones pero con tono propio */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-16 w-32 h-32 bg-fuchsia-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-16 w-40 h-40 bg-violet-400 rounded-full blur-3xl animate-float delay-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {promociones.map((promocion) => (
            <Link
              key={promocion.id}
              href={`/promociones/${getPromocionSlug(promocion)}`}
              className="group block w-full"
            >
              <h3 className="mb-3 text-center text-white text-lg sm:text-2xl font-bold">
                {promocion.nombre}
              </h3>
              <div className="relative w-full overflow-hidden transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(promocion.imagen || '/placeholder.jpg').trim()}
                  alt={promocion.nombre}
                  className="block w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
