"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/products"
import { useConfiguracion } from "@/hooks/use-configuracion"

interface WhatsAppButtonProps {
  product: Product
}

export default function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { telefono, loading, error } = useConfiguracion()
  
  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = (product: Product): string => {
    const productInfo = product.descripcion || product.name || 'este producto'
    const price = product.precio ? `$${product.precio.toLocaleString('es-AR')}` : ''
    
    let message = `Hola! 👋 Me interesa saber más información sobre: ${productInfo}`
    
    // Agregar información de categoría y marca si están disponibles
    if (product.categoria?.descripcion || product.marca?.descripcion) {
      message += '\n\n'
      if (product.categoria?.descripcion) {
        message += `Categoría: ${product.categoria.descripcion}`
      }
      if (product.marca?.descripcion) {
        message += product.categoria?.descripcion ? ` | Marca: ${product.marca.descripcion}` : `Marca: ${product.marca.descripcion}`
      }
    }
    
    // Agregar precio si está disponible
    if (price) {
      message += `\n\nPrecio: ${price}`
    }
    
    message += `\n\n¿Podrían brindarme más detalles sobre este producto?`
    
    return message
  }
  
  // Número por defecto en caso de que no se pueda cargar desde la base de datos
  const phoneNumber = telefono || "5491123365608"
  const message = generateWhatsAppMessage(product)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  // Si está cargando, mostrar un botón deshabilitado
  if (loading) {
    return (
      <button
        disabled
        className="relative w-full bg-gray-400 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 text-lg shadow-lg cursor-not-allowed"
      >
        <MessageCircle className="mr-3 animate-pulse" size={24} />
        <span>Cargando...</span>
      </button>
    )
  }

  // Si hay error, mostrar el botón con el número por defecto
  if (error) {
    console.warn('Error al cargar configuración, usando número por defecto:', error)
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efecto de onda */}
      <div
        className={`absolute inset-0 bg-white/20 transform transition-transform duration-500 ${
          isHovered ? "translate-x-0" : "-translate-x-full"
        }`}
      ></div>

      <MessageCircle className={`mr-3 transition-all duration-300 ${isHovered ? "animate-bounce" : ""}`} size={24} />

      <span className="relative z-10">Consultar Producto por WhatsApp</span>

      {/* Partículas animadas */}
      <div
        className={`absolute top-2 right-4 w-2 h-2 bg-white rounded-full transition-all duration-300 ${
          isHovered ? "animate-ping" : "opacity-0"
        }`}
      ></div>
    </a>
  )
}
