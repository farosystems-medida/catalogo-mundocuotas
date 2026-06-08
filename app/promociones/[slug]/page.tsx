import { Metadata } from "next"
import { getPromocionBySlugOrId } from "@/lib/supabase-products"
import PromocionPageClient from "./PromocionPageClient"

interface PromocionPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PromocionPageProps): Promise<Metadata> {
  const resolvedParams = await params

  try {
    const promocion = await getPromocionBySlugOrId(resolvedParams.slug)

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

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        locale: 'es_AR',
        siteName: 'MUNDOCUOTA',
        title,
        description,
        images: promocion.imagen ? [{ url: promocion.imagen.trim() }] : undefined,
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
