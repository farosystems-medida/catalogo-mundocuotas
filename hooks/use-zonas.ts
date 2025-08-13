import { useState, useEffect } from 'react'
import { getZonas, getConfiguracionZonas, getTelefonoPorZona, type Zona, type ConfiguracionZona } from '@/lib/supabase-config'

export function useZonas() {
  const [zonas, setZonas] = useState<Zona[]>([])
  const [configuracionZonas, setConfiguracionZonas] = useState<ConfiguracionZona[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchZonas() {
      try {
        setLoading(true)
        const [zonasData, configZonasData] = await Promise.all([
          getZonas(),
          getConfiguracionZonas()
        ])
        setZonas(zonasData)
        setConfiguracionZonas(configZonasData)
      } catch (err) {
        setError('Error al cargar las zonas')
        console.error('Error al cargar zonas:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchZonas()
  }, [])

  const getTelefonoZona = async (zonaId: number): Promise<string | null> => {
    try {
      return await getTelefonoPorZona(zonaId)
    } catch (err) {
      console.error('Error al obtener teléfono de zona:', err)
      return null
    }
  }

  return { 
    zonas, 
    configuracionZonas, 
    loading, 
    error, 
    getTelefonoZona 
  }
}
