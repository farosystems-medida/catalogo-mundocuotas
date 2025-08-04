'use client'

import { useState, useEffect } from 'react'
import { Product, Categoria, Marca } from '@/lib/products'
import { 
  getProducts, 
  getFeaturedProducts, 
  getProductsByCategory, 
  getProductsByBrand,
  getCategories,
  getBrands
} from '@/lib/supabase-products'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Categoria[]>([])
  const [brands, setBrands] = useState<Marca[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)

      const featuredData = await getFeaturedProducts()
      const productsData = await getProducts()
      const categoriesData = await getCategories()
      const brandsData = await getBrands()

      console.log('useProducts - Datos cargados:', {
        featured: featuredData.length,
        products: productsData.length,
        categories: categoriesData.length,
        brands: brandsData.length
      })

      setProducts(productsData)
      setFeaturedProducts(featuredData)
      setCategories(categoriesData)
      setBrands(brandsData)
      
    } catch (err) {
      setError('Error al cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  const filterByCategory = async (categoryId: number | null) => {
    if (categoryId === null) {
      await loadInitialData()
      return
    }

    try {
      setLoading(true)
      const filteredProducts = await getProductsByCategory(categoryId)
      setProducts(filteredProducts)
    } catch (err) {
      setError('Error al filtrar por categoría')
    } finally {
      setLoading(false)
    }
  }

  const filterByBrand = async (brandId: number | null) => {
    if (brandId === null) {
      await loadInitialData()
      return
    }

    try {
      setLoading(true)
      const filteredProducts = await getProductsByBrand(brandId)
      setProducts(filteredProducts)
    } catch (err) {
      setError('Error al filtrar por marca')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    loadInitialData()
  }

  return {
    products,
    featuredProducts,
    categories,
    brands,
    loading,
    error,
    filterByCategory,
    filterByBrand,
    clearFilters,
    refresh: loadInitialData
  }
} 