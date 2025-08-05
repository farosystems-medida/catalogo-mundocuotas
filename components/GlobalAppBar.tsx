'use client'

import Link from "next/link"
import { Home, Package, Zap, Sparkles } from "lucide-react"

export default function GlobalAppBar() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-violet-700 via-violet-600 to-violet-700 shadow-lg border-b border-violet-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header principal */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="/logo.svg" 
                  alt="MUNDO CUOTAS" 
                  className="h-28 w-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-violet-400 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white tracking-wide group-hover:text-violet-200 transition-colors duration-300">
                  MUNDOCUOTAS
                </h1>
                <p className="text-xs text-violet-200 font-medium">Tu tienda de confianza</p>
              </div>
            </Link>
          </div>

          {/* Navegación central */}
          <nav className="hidden md:flex items-center space-x-1">
            <div className="flex items-center bg-violet-800/30 rounded-full p-1 backdrop-blur-sm">
              <Link 
                href="/" 
                className="flex items-center px-4 py-2 text-white hover:text-violet-200 rounded-full transition-all duration-300 hover:bg-violet-800/50 group"
              >
                <Home className="mr-2 size-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-sm">Inicio</span>
              </Link>
              
              <button 
                onClick={scrollToProducts}
                className="flex items-center px-4 py-2 text-white hover:text-violet-200 rounded-full transition-all duration-300 hover:bg-violet-800/50 group"
              >
                <Package className="mr-2 size-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-sm">Productos</span>
              </button>
              
              <Link 
                href="/#destacados" 
                className="flex items-center px-4 py-2 text-white hover:text-violet-200 rounded-full transition-all duration-300 hover:bg-violet-800/50 group"
              >
                <Zap className="mr-2 size-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-sm">Destacados</span>
              </Link>
              
              <div className="flex items-center px-4 py-2 bg-violet-500/50 text-white rounded-full border border-violet-400/30">
                <Sparkles className="mr-2 size-5" />
                <span className="font-bold text-sm">CATÁLOGO</span>
              </div>
            </div>
          </nav>

          {/* Indicador de estado */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-violet-800/30 rounded-full px-3 py-1 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-violet-200 text-xs font-medium">En línea</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 