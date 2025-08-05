import { supabase } from './supabase'
import { Product, Categoria, Marca, PlanFinanciacion, ProductoPlan } from './products'

// Función para formatear números con 2 decimales
export function formatearPrecio(precio: number): string {
  return precio.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// Función para calcular cuotas
export function calcularCuota(precio: number, plan: PlanFinanciacion) {
  // Verificar si el producto aplica para este plan
  if (precio < plan.monto_minimo) return null
  if (plan.monto_maximo && precio > plan.monto_maximo) return null
  
  // Calcular precio con recargo
  const recargo = (precio * plan.recargo_porcentual / 100) + plan.recargo_fijo
  const precio_final = precio + recargo
  
  // Calcular cuota mensual
  const cuota_mensual = precio_final / plan.cuotas
  
  return {
    precio_original: precio,
    recargo_total: recargo,
    precio_final: precio_final,
    cuota_mensual: Math.round(cuota_mensual * 100) / 100, // Redondear a 2 decimales
    cuotas: plan.cuotas,
    recargo_porcentual: plan.recargo_porcentual
  }
}

// Obtener todos los planes de financiación
export async function getPlanesFinanciacion(): Promise<PlanFinanciacion[]> {
  try {
    const { data, error } = await supabase
      .from('planes_financiacion')
      .select('*')
      .eq('activo', true)
      .order('cuotas', { ascending: true })

    if (error) {
      console.error('Error fetching financing plans:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching financing plans:', error)
    return []
  }
}

// Obtener planes disponibles para un producto específico
export async function getPlanesProducto(productoId: string): Promise<PlanFinanciacion[]> {
  try {
    console.log('🔍 getPlanesProducto: Buscando planes para producto ID:', productoId)
    
    const { data, error } = await supabase
      .from('producto_planes')
      .select(`
        fk_id_plan,
        planes_financiacion(*)
      `)
      .eq('fk_id_producto', parseInt(productoId))
      .eq('activo', true)
      .eq('planes_financiacion.activo', true)

    console.log('🔍 getPlanesProducto: Respuesta de Supabase:', { data, error })

    if (error) {
      console.error('Error fetching product financing plans:', error)
      return []
    }

    // Extraer los planes de financiación de la respuesta
    const planes: PlanFinanciacion[] = []
    data?.forEach(item => {
      if (item.planes_financiacion) {
        planes.push(item.planes_financiacion as unknown as PlanFinanciacion)
      }
    })
    
    console.log('✅ getPlanesProducto: Planes encontrados:', planes.length, planes)
    return planes
  } catch (error) {
    console.error('Error fetching product financing plans:', error)
    return []
  }
}

// Calcular cuotas para un producto específico
export async function calcularCuotasProducto(productoId: string, planId: number) {
  try {
    const producto = await getProductById(productoId)
    const { data: planData, error } = await supabase
      .from('planes_financiacion')
      .select('*')
      .eq('id', planId)
      .eq('activo', true)
      .single()

    if (error || !producto || !planData) {
      console.error('Error calculating product installments:', error)
      return null
    }

    return calcularCuota(producto.precio, planData)
  } catch (error) {
    console.error('Error calculating product installments:', error)
    return null
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categoria(id, descripcion),
        marca:marcas(id, descripcion)
      `)
      .order('destacado', { ascending: false })
      .order('descripcion', { ascending: true })

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    // Transformar datos para que coincidan con la nueva estructura
    const transformedData = data?.map(product => ({
      ...product,
      fk_id_categoria: product.fk_id_categoria || 1,
      fk_id_marca: product.fk_id_marca || 1,
      categoria: product.categoria || { id: product.fk_id_categoria || 1, descripcion: `Categoría ${product.fk_id_categoria || 1}` },
      marca: product.marca || { id: product.fk_id_marca || 1, descripcion: `Marca ${product.fk_id_marca || 1}` }
    })) || []

    return transformedData
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categoria(id, descripcion),
        marca:marcas(id, descripcion)
      `)
      .eq('destacado', true)
      .order('descripcion', { ascending: true })

    if (error) {
      console.error('Error fetching featured products:', error)
      return []
    }

    // Transformar datos para que coincidan con la nueva estructura
    const transformedData = data?.map(product => ({
      ...product,
      fk_id_categoria: product.fk_id_categoria || 1,
      fk_id_marca: product.fk_id_marca || 1,
      categoria: product.categoria || { id: product.fk_id_categoria || 1, descripcion: `Categoría ${product.fk_id_categoria || 1}` },
      marca: product.marca || { id: product.fk_id_marca || 1, descripcion: `Marca ${product.fk_id_marca || 1}` }
    })) || []

    return transformedData
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categoria(id, descripcion),
        marca:marcas(id, descripcion)
      `)
      .eq('fk_id_categoria', categoryId)
      .order('destacado', { ascending: false })
      .order('descripcion', { ascending: true })

    if (error) {
      console.error('Error fetching products by category:', error)
      return []
    }

    // Transformar datos
    const transformedData = data?.map(product => ({
      ...product,
      fk_id_categoria: product.fk_id_categoria || 1,
      fk_id_marca: product.fk_id_marca || 1,
      categoria: product.categoria || { id: product.fk_id_categoria || 1, descripcion: `Categoría ${product.fk_id_categoria || 1}` },
      marca: product.marca || { id: product.fk_id_marca || 1, descripcion: `Marca ${product.fk_id_marca || 1}` }
    })) || []

    return transformedData
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

export async function getProductsByBrand(brandId: number): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categoria(id, descripcion),
        marca:marcas(id, descripcion)
      `)
      .eq('fk_id_marca', brandId)
      .order('destacado', { ascending: false })
      .order('descripcion', { ascending: true })

    if (error) {
      console.error('Error fetching products by brand:', error)
      return []
    }

    // Transformar datos
    const transformedData = data?.map(product => ({
      ...product,
      fk_id_categoria: product.fk_id_categoria || 1,
      fk_id_marca: product.fk_id_marca || 1,
      categoria: product.categoria || { id: product.fk_id_categoria || 1, descripcion: `Categoría ${product.fk_id_categoria || 1}` },
      marca: product.marca || { id: product.fk_id_marca || 1, descripcion: `Marca ${product.fk_id_marca || 1}` }
    })) || []

    return transformedData
  } catch (error) {
    console.error('Error fetching products by brand:', error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categoria(id, descripcion),
        marca:marcas(id, descripcion)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching product by id:', error)
      return null
    }

    // Transformar datos
    const transformedData = {
      ...data,
      fk_id_categoria: data.fk_id_categoria || 1,
      fk_id_marca: data.fk_id_marca || 1,
      categoria: data.categoria || { id: data.fk_id_categoria || 1, descripcion: `Categoría ${data.fk_id_categoria || 1}` },
      marca: data.marca || { id: data.fk_id_marca || 1, descripcion: `Marca ${data.fk_id_marca || 1}` }
    }

    return transformedData
  } catch (error) {
    console.error('Error fetching product by id:', error)
    return null
  }
}

export async function getCategories(): Promise<Categoria[]> {
  try {
    console.log('🔍 getCategories: Intentando obtener categorías...')
    const { data, error } = await supabase
      .from('categoria')
      .select('*')
      .order('descripcion', { ascending: true })

    console.log('🔍 getCategories: Respuesta de Supabase:', { data, error })

    if (error) {
      console.error('❌ Error fetching categories:', error)
      return []
    }

    console.log('✅ getCategories: Datos obtenidos:', data)
    return data || []
  } catch (error) {
    console.error('❌ Error fetching categories:', error)
    return []
  }
}

export async function getBrands(): Promise<Marca[]> {
  try {
    console.log('🔍 getBrands: Intentando obtener marcas...')
    const { data, error } = await supabase
      .from('marcas')
      .select('*')
      .order('descripcion', { ascending: true })

    console.log('🔍 getBrands: Respuesta de Supabase:', { data, error })

    if (error) {
      console.error('❌ Error fetching brands:', error)
      return []
    }

    console.log('✅ getBrands: Datos obtenidos:', data)
    return data || []
  } catch (error) {
    console.error('❌ Error fetching brands:', error)
    return []
  }
} 