"use client"

import { useEffect, useState } from "react"
import TypewriterText from "./TypewriterText"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([])

  useEffect(() => {
    setIsVisible(true)

    // Generar copos de nieve
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 2 + Math.random() * 4
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <section
      id="inicio"
      className="relative text-white pt-12 h-[30vh] min-h-[250px] sm:h-[35vh] sm:min-h-[300px] flex items-center"
      style={{ overflow: 'visible' }}
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/dia-del-padre.jpg')"
        }}
      >
        {/* Overlay mejorado para mayor calidad visual */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-purple-900/50 to-blue-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Efecto de copos de nieve */}
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white"
            style={{
              left: `${flake.left}%`,
              top: '-10px',
              animation: `fall ${flake.duration}s linear ${flake.delay}s infinite`,
              fontSize: `${flake.size * 3}px`,
              opacity: 0.9,
              textShadow: '0 0 5px rgba(255,255,255,0.8)'
            }}
          >
            ❄
          </div>
        ))}
      </div>


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 md:py-6">
        <div className={`text-center transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 leading-tight">
            Bienvenidos a<br />
            <span className="inline-block min-w-[200px] sm:min-w-[240px] md:min-w-[350px] lg:min-w-[420px]">
              <TypewriterText />
            </span>
          </h1>
          <p
            className={`text-sm md:text-base lg:text-lg mb-3 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Tu tienda de electrodomésticos de confianza con los mejores planes de financiación
          </p>
        </div>

      </div>
    </section>
  )
}
