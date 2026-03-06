import { Metadata } from 'next'
import { getCategories } from '@/lib/supabase-products'

interface Props {
  params: Promise<{
    categoria: string
  }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const categories = await getCategories()

  // Encontrar la categoría por slug
  const categoria = categories.find(cat => {
    const slug = cat.descripcion?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    return slug === resolvedParams.categoria
  })

  // Valores por defecto si no se encuentra la categoría
  const title = categoria?.descripcion
    ? `${categoria.descripcion} - MUNDOCUOTA`
    : 'MUNDOCUOTA - Electrodomésticos en Cuotas'

  const description = categoria?.descripcion
    ? `Encontrá los mejores ${categoria.descripcion.toLowerCase()} con financiación en cuotas. Precios accesibles y planes de pago flexibles.`
    : 'Tu tienda de electrodomésticos de confianza con los mejores planes de financiación.'

  // Usar imagen de la categoría si existe, sino usar logo por defecto
  const imageUrl = categoria?.imagen_url
    ? categoria.imagen_url
    : 'https://www.mundocuota.com.ar/LOGO2.png?v=3'

  // Construir URL de la página
  const url = `https://www.mundocuota.com.ar/${resolvedParams.categoria}`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url,
      siteName: 'MUNDOCUOTA',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: categoria?.descripcion || 'MUNDOCUOTA',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default function CategoriaLayout({ children }: Props) {
  return <>{children}</>
}
