import { useState, useEffect } from 'react'
import { getTelefono } from '@/lib/supabase-config'

export function useConfiguracion() {
  const [telefono, setTelefono] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTelefono() {
      try {
        setLoading(true)
        const telefonoData = await getTelefono()
        setTelefono(telefonoData)
      } catch (err) {
        setError('Error al cargar la configuración')
        console.error('Error al cargar configuración:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTelefono()
  }, [])

  return { telefono, loading, error }
}
