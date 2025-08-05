"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle, Truck, Shield, CreditCard } from "lucide-react"
import { useEffect, useState, use } from "react"
import { getProductById, getPlanesProducto, calcularCuota, formatearPrecio, getProductsByCategory } from "@/lib/supabase-products"
import { Product, PlanFinanciacion } from "@/lib/products"
import WhatsAppButton from "@/components/WhatsAppButton"
import GlobalAppBar from "@/components/GlobalAppBar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [planes, setPlanes] = useState<PlanFinanciacion[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Unwrap params usando React.use()
  const { id } = use(params)

  useEffect(() => {
    setIsVisible(true)
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const productData = await getProductById(id)
      setProduct(productData)
      
      // Cargar planes de financiación y productos relacionados
      if (productData) {
        const [planesData, relatedData] = await Promise.all([
          getPlanesProducto(id),
          getProductsByCategory(productData.fk_id_categoria || 1)
        ])
        
        setPlanes(planesData)
        
        // Filtrar productos relacionados (excluir el producto actual y limitar a 3)
        const filteredRelated = relatedData
          .filter(p => p.id !== productData.id)
          .slice(0, 3)
        setRelatedProducts(filteredRelated)
      }
    } catch (err) {
      setError('Error al cargar el producto')
      console.error('Error loading product:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Cargando producto...</h1>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all duration-300 transform hover:scale-105"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  // Usar los nuevos campos de la base de datos, con fallback a los campos antiguos
  const productName = product.descripcion || product.name || 'Sin nombre'
  const productDescription = product.descripcion_detallada || product.description || 'Sin descripción'
  const productPrice = product.precio || product.price || 0
  const productImage = product.imagen || product.image || "/placeholder.svg"
  const isFeatured = product.destacado || product.featured || false
  const productCategory = typeof product.categoria === 'string' 
    ? product.categoria 
    : product.categoria?.descripcion || product.category || 'Sin categoría'
  const productBrand = typeof product.marca === 'string' 
    ? product.marca 
    : product.marca?.descripcion || product.brand || 'Sin marca'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <GlobalAppBar />
      
      {/* Hero Section - Imagen y Información Principal */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-violet-600 hover:text-violet-800 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Volver al catálogo
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Imagen del Producto */}
            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Badge Destacado */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <Star className="mr-2" size={14} />
                      Destacado
                    </div>
                  )}

                  {/* Botones de navegación */}
                  <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300">
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300">
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center mt-6 space-x-3">
                  <div className="w-20 h-20 bg-white border-2 border-violet-500 rounded-xl flex items-center justify-center shadow-md">
                    <Image src={productImage} alt="Thumbnail" width={70} height={70} className="object-contain" />
                  </div>
                  <div className="w-20 h-20 bg-white border border-gray-300 rounded-xl flex items-center justify-center shadow-md">
                    <Image src={productImage} alt="Thumbnail" width={70} height={70} className="object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Información Principal */}
            <div className="space-y-8">
              {/* Título y Categoría */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                    {productCategory}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {productBrand}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {productName}
                </h1>
              </div>

              {/* Precio */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-violet-600">
                    ${formatearPrecio(productPrice)}
                  </span>
                  <span className="text-lg text-gray-500">ARS</span>
                </div>
              </div>

              {/* Planes de Financiación */}
              {planes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Planes de Financiación</h3>
                  <div className="space-y-3">
                    {planes.map((plan, index) => {
                      const calculo = calcularCuota(productPrice, plan)
                      if (!calculo) return null

                      const colores = [
                        'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
                        'bg-gradient-to-r from-green-500 to-green-600 text-white',
                        'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
                        'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      ]

                      return (
                        <div
                          key={plan.id}
                          className={`p-4 rounded-xl text-center font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                            colores[index % colores.length]
                          }`}
                        >
                          {plan.cuotas} CUOTAS MENSUALES x ${formatearPrecio(calculo.cuota_mensual)}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Botón de Acción */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <WhatsAppButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Descripción */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Descripción del Producto</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {productDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-16 bg-gradient-to-r from-violet-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">¿Por qué elegir MUNDOCUOTAS?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-violet-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Envío Gratis</h3>
              <p className="text-gray-600">Entrega a domicilio sin cargo adicional en toda la ciudad</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Garantía Oficial</h3>
              <p className="text-gray-600">Todos nuestros productos incluyen garantía de fábrica</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financiación Flexible</h3>
              <p className="text-gray-600">Planes de pago adaptados a tu presupuesto</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Relacionados */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Productos que te pueden interesar
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubre más productos de la misma categoría que podrían ser perfectos para ti
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className={`transition-all duration-700 ${
                    index === 0
                      ? "delay-100 animate-fade-in-up"
                      : index === 1
                        ? "delay-200 animate-fade-in-up"
                        : "delay-300 animate-fade-in-up"
                  }`}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>

            {/* Botón para ver más productos de la categoría */}
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Ver más productos
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  )
}
