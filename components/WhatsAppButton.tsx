"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/products"

interface WhatsAppButtonProps {
  product: Product
}

export default function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const phoneNumber = "5491123365608"
  const message = `Hola, solicito más información acerca del producto ${product.name}`
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

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
