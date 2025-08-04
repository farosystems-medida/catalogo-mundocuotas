"use client"

import { useEffect, useState } from "react"
import TypewriterText from "./TypewriterText"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white pt-20 overflow-hidden"
    >
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-blue-300 rounded-full animate-float delay-200"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-float delay-700"></div>
      </div>

      {/* Gradiente animado de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-gradient"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenidos a <TypewriterText />
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Tu tienda de electrodomésticos de confianza con los mejores planes de financiación
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}>
            <div className="glass p-8 rounded-2xl backdrop-blur-lg">
              <h2 className="text-3xl font-bold mb-6 text-yellow-400 animate-pulse-glow">¿Quiénes Somos?</h2>
              <p className="text-lg mb-4 leading-relaxed">
                En MUNDOCUOTAS somos una empresa especializada en la venta de electrodomésticos con más de 10 años de
                experiencia en el mercado. Nos dedicamos a brindar soluciones accesibles para tu hogar.
              </p>
              <p className="text-lg leading-relaxed">
                Ofrecemos productos de las mejores marcas con planes de financiación flexibles que se adaptan a tu
                presupuesto.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-1000 ${isVisible ? "animate-fade-in-right" : "opacity-0"}`}
          >
            <div className="glass p-8 rounded-2xl backdrop-blur-lg">
              <h2 className="text-3xl font-bold mb-6 text-yellow-400 animate-pulse-glow">¿Qué Hacemos?</h2>
              <ul className="text-lg space-y-4">
                {[
                  "Venta de electrodomésticos de primera calidad",
                  "Planes de financiación en 3, 6, 12 y 18 cuotas",
                  "Asesoramiento personalizado",
                  "Entrega e instalación a domicilio",
                  "Garantía oficial en todos nuestros productos",
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center transition-all duration-500 ${
                      index === 0
                        ? "delay-1000"
                        : index === 1
                          ? "delay-1100"
                          : index === 2
                            ? "delay-1200"
                            : index === 3
                              ? "delay-1300"
                              : "delay-1500"
                    } ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}
                  >
                    <span className="text-yellow-400 mr-3 text-xl animate-pulse">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Botón CTA animado */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
        >
          <button
            onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl animate-pulse-glow"
          >
            Ver Productos
          </button>
        </div>
      </div>
    </section>
  )
}
