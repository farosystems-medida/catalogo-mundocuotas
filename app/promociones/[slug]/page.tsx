import { Metadata } from "next"
import { getPromocionBySlugOrId } from "@/lib/supabase-products"
import { getConfiguracionWeb } from "@/lib/supabase-config"
import PromocionPageClient from "./PromocionPageClient"

const SITE_URL = 'https://www.mundocuota.com.ar'

// Las previews (WhatsApp, Facebook, etc.) necesitan URLs absolutas
const toAbsoluteUrl = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`)

interface PromocionPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PromocionPageProps): Promise<Metadata> {
  const resolvedParams = await params

  try {
    const [promocion, configuracion] = await Promise.all([
      getPromocionBySlugOrId(resolvedParams.slug),
      getConfiguracionWeb(),
    ])

    if (!promocion) {
      return {
        title: "Promoción no encontrada - MUNDOCUOTA",
        description: "La promoción que buscas no está disponible.",
      }
    }

    const title = `${promocion.nombre} - Promoción | MUNDOCUOTAS`
    const description = promocion.descripcion
      ? promocion.descripcion.substring(0, 160)
      : `Aprovechá la promoción ${promocion.nombre} y descubrí los productos en oferta.`

    // Misma imagen que el banner de la página: imagen propia de la promo → banner por defecto de configuración → imagen local
    const imageUrl = toAbsoluteUrl(
      (promocion.imagen_banner || configuracion?.imagen_banner_promociones || '/dia-del-padre.jpg').trim()
    )
    const url = `${SITE_URL}/promociones/${resolvedParams.slug}`

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        locale: 'es_AR',
        url,
        siteName: 'MUNDOCUOTA',
        title,
        description,
        images: [{ url: imageUrl, alt: promocion.nombre }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: "Promoción - MUNDOCUOTA",
      description: "Descubrí nuestras promociones especiales.",
    }
  }
}

export default async function PromocionPage({ params }: PromocionPageProps) {
  return <PromocionPageClient params={params} />
}
