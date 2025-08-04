'use client'

import Link from "next/link"
import { Home, Package, Zap, User, Phone, Lightbulb } from "lucide-react"

export default function GlobalAppBar() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-violet-600 border-b border-violet-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Teléfonos */}
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center space-x-6 text-white text-sm">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>0810-333-9435</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>011-6811-6000</span>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <div className="flex items-center py-4">
          {/* Logo - Más a la izquierda */}
          <div className="w-1/4">
            <Link href="/" className="flex items-center gap-3">
              <Lightbulb size={32} className="text-yellow-300" />
              <span className="text-white font-bold text-3xl">
                MUNDOCUOTAS
              </span>
            </Link>
          </div>

          {/* Navegación - Centrada en el espacio restante */}
          <div className="w-2/4 flex justify-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center text-white hover:text-violet-200 transition-colors duration-300">
                <Home className="mr-2" size={16} />
                <span className="font-medium">Inicio</span>
              </Link>
              <button 
                onClick={scrollToProducts}
                className="flex items-center text-white hover:text-violet-200 transition-colors duration-300"
              >
                <Package className="mr-2" size={16} />
                <span className="font-medium">Productos</span>
              </button>
              <Link href="/#destacados" className="flex items-center text-white hover:text-violet-200 transition-colors duration-300">
                <Zap className="mr-2" size={16} />
                <span className="font-medium">Destacados</span>
              </Link>
              <span className="text-white font-medium border-b-2 border-white">CATÁLOGO</span>
            </div>
          </div>

          {/* Icono de usuario - Alineado a la derecha */}
          <div className="w-1/4 flex justify-end">
            <button className="p-2 text-white hover:text-violet-200 transition-colors duration-300">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 