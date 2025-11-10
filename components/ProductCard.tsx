"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Product } from "@/lib/products"
import FinancingPlans from "./FinancingPlans"
import { useShoppingList } from "@/hooks/use-shopping-list"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, isInList } = useShoppingList()
  const productCategory = product.categoria?.descripcion || product.category || 'Sin categoría'
  const productBrand = product.marca?.descripcion || product.brand || 'Sin marca'
  const productPrice = product.precio || product.price || 0

  const productUrl = product.categoria && product.categoria.descripcion && 
    !product.categoria.descripcion.toLowerCase().includes('categor') &&
    product.categoria.descripcion.trim() !== '' ? 
    `/${productCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}/${product.id}` :
    `/varios/${product.id}`

  const isInFavorites = isInList(product.id)
  const hasStock = product.tiene_stock === true // Solo true permite agregar, undefined/null/false no permiten
  
  // Debug: log del stock
  console.log('🔍 ProductCard - Product:', product.descripcion, 'tiene_stock:', product.tiene_stock, 'hasStock:', hasStock)
  console.log('🔍 ProductCard - Tipo de tiene_stock:', typeof product.tiene_stock)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInFavorites) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <Link href={productUrl} className="block">
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group cursor-pointer ${
        hasStock
          ? 'hover:shadow-xl hover:scale-105 active:scale-95'
          : 'opacity-75 grayscale-[0.3]'
      }`}>
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imagen || product.image || '/placeholder.jpg'}
            alt={product.descripcion || product.name || 'Producto'}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />

          {/* Icono de Favoritos - Esquina superior izquierda (solo si hay stock) */}
          {hasStock && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-1.5 left-1.5 p-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 ${
                isInFavorites
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-violet-500'
              }`}
              title={isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-all duration-300 ${
                  isInFavorites ? 'fill-current' : ''
                }`}
              />
            </button>
          )}

          {/* Badge Sin Stock - Esquina superior derecha */}
          {!hasStock && (
            <div className="absolute top-1.5 right-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
              Sin Stock
            </div>
          )}

          {/* Badge Destacado - Esquina superior derecha (solo si hay stock) */}
          {product.destacado && hasStock && (
            <div className="absolute top-1.5 right-1.5 bg-yellow-400 text-black px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
              Destacado
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="p-2">
          {/* Marca */}
          <div className="flex gap-1 mb-1 flex-wrap">
            <span className="text-xs text-white bg-gradient-to-r from-blue-500 to-blue-600 px-1.5 py-0.5 rounded-full truncate font-semibold shadow-sm">
              {productBrand}
            </span>
          </div>

          {/* Título del producto */}
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
            {product.descripcion || product.name || 'Sin descripción'}
          </h3>

          {/* Planes de Financiación - Versión simplificada */}
          <FinancingPlans productoId={product.id} precio={productPrice} />
        </div>
      </div>
    </Link>
  )
}
