'use client'

import { useState, useEffect } from 'react'
import { PlanFinanciacion } from '@/lib/products'
import { getPlanesProducto, calcularCuota } from '@/lib/supabase-products'

interface FinancingPlansProps {
  productoId: string
  precio: number
}

export default function FinancingPlans({ productoId, precio }: FinancingPlansProps) {
  const [planes, setPlanes] = useState<PlanFinanciacion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlanes() {
      try {
        setLoading(true)
        const planesData = await getPlanesProducto(productoId)
        console.log('Planes cargados para producto', productoId, ':', planesData)
        setPlanes(planesData)
      } catch (error) {
        console.error('Error loading financing plans:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPlanes()
  }, [productoId])

  if (loading) {
    return (
      <div className="mt-3 p-2 bg-gray-50 rounded">
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (planes.length === 0) {
    return null
  }

  // Mostrar todos los planes disponibles para este producto
  const colores = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800', 'bg-orange-100 text-orange-800']

  return (
    <div className="mt-3 space-y-2">
      {planes.map((plan, index) => {
        const calculo = calcularCuota(precio, plan)
        if (!calculo) return null

        return (
          <div
            key={plan.id}
            className={`p-3 rounded-lg text-center font-bold text-sm ${
              colores[index % colores.length]
            }`}
          >
            {plan.cuotas} CUOTAS MENSUALES x ${calculo.cuota_mensual.toLocaleString()}
          </div>
        )
      })}
    </div>
  )
} 