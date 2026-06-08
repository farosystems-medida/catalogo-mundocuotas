"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpLeft } from "lucide-react"
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

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {promociones.map((promocion) => (
            <Link
              key={promocion.id}
              href={`/promociones/${getPromocionSlug(promocion)}`}
              className="group block w-full"
            >
              <h3 className="mb-4 text-center text-3xl sm:text-5xl md:text-6xl font-['Fredoka'] font-bold uppercase tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent animate-pulse-glow">
                🎁 Especial Día del Padre
              </h3>
              <div className="relative w-full">
                <div className="relative w-full overflow-hidden transition-all duration-300">
                  {/* Banner mobile: usa imagen_mobile si existe, sino cae a la imagen de escritorio */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(promocion.imagen_mobile || promocion.imagen || '/placeholder.jpg').trim()}
                    alt={promocion.nombre}
                    className="sm:hidden block w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Banner desktop/tablet */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(promocion.imagen || '/placeholder.jpg').trim()}
                    alt={promocion.nombre}
                    className="hidden sm:block w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Flecha animada por fuera del banner, apuntando al botón "Ver regalos" de la imagen */}
                <div className="absolute -bottom-6 sm:-bottom-9 right-[6%] sm:right-[9%] flex flex-col items-center gap-1 pointer-events-none animate-bounce z-10">
                  <span className="bg-yellow-400 text-purple-950 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    ¡Clickeá acá!
                  </span>
                  <ArrowUpLeft className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
