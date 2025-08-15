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

// Función para calcular el anticipo
export function calcularAnticipo(precio: number, plan: PlanFinanciacion) {
  let anticipo = 0
  
  // Si hay anticipo fijo, usarlo
  if (plan.anticipo_minimo_fijo && plan.anticipo_minimo_fijo > 0) {
    anticipo = plan.anticipo_minimo_fijo
  }
  // Si hay anticipo por porcentaje, calcularlo
  else if (plan.anticipo_minimo && plan.anticipo_minimo > 0) {
    anticipo = (precio * plan.anticipo_minimo) / 100
  }
  
  return Math.round(anticipo * 100) / 100 // Redondear a 2 decimales
}

// Obtener todos los planes de financiación activos
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

// Obtener planes disponibles para un producto específico con lógica simplificada
export async function getPlanesProducto(productoId: string): Promise<PlanFinanciacion[]> {
  try {
    console.log('🔍 getPlanesProducto: Buscando planes para producto ID:', productoId)
    
    // 1. PRIORIDAD ALTA: Buscar planes especiales (productos_planes)
    try {
      const { data: planesEspeciales, error: errorEspeciales } = await supabase
        .from('producto_planes')
        .select('fk_id_plan')
        .eq('fk_id_producto', parseInt(productoId))

      console.log('🔍 getPlanesProducto: Planes especiales encontrados:', planesEspeciales?.length || 0)
      console.log('🔍 getPlanesProducto: Error en consulta planes especiales:', errorEspeciales)
      
      if (planesEspeciales && planesEspeciales.length > 0) {
        // Obtener los planes de financiación por separado
        const planIds = planesEspeciales.map(p => p.fk_id_plan)
        console.log('🔍 getPlanesProducto: IDs de planes especiales encontrados:', planIds)
        
        const { data: planesData, error: planesError } = await supabase
          .from('planes_financiacion')
          .select('*')
          .in('id', planIds)
          .eq('activo', true)
        
        if (planesData && planesData.length > 0) {
          console.log('🔍 getPlanesProducto: Detalle planes especiales:', planesData.map(p => p.cuotas))
          console.log('✅ getPlanesProducto: Usando planes especiales:', planesData.length, planesData.map(p => p.cuotas))
          return planesData
        }
      }
    } catch (error) {
      console.log('⚠️ getPlanesProducto: Error al buscar planes especiales (tabla puede no existir):', error)
    }

    // 2. PRIORIDAD BAJA: Si no hay planes especiales, usar planes por defecto
    console.log('🔍 getPlanesProducto: No hay planes especiales, buscando planes por defecto...')
    
    try {
      const { data: planesDefault, error: errorDefault } = await supabase
        .from('producto_planes_default')
        .select('fk_id_plan')
        .eq('fk_id_producto', parseInt(productoId))

      console.log('🔍 getPlanesProducto: Planes por defecto encontrados:', planesDefault?.length || 0)
      console.log('🔍 getPlanesProducto: Error en consulta planes por defecto:', errorDefault)
      
      if (planesDefault && planesDefault.length > 0) {
        // Obtener los planes de financiación por separado
        const planIds = planesDefault.map(p => p.fk_id_plan)
        console.log('🔍 getPlanesProducto: IDs de planes encontrados:', planIds)
        
        const { data: planesData, error: planesError } = await supabase
          .from('planes_financiacion')
          .select('*')
          .in('id', planIds)
          .eq('activo', true)
        
        if (planesData && planesData.length > 0) {
          console.log('🔍 getPlanesProducto: Detalle planes por defecto:', planesData.map(p => p.cuotas))
          console.log('✅ getPlanesProducto: Usando planes por defecto:', planesData.length, planesData.map(p => p.cuotas))
          return planesData
        }
      }
    } catch (error) {
      console.log('⚠️ getPlanesProducto: Error al buscar planes por defecto (tabla puede no existir):', error)
    }

    // 3. FALLBACK: Si no hay planes especiales ni por defecto, no mostrar ningún plan
    console.log('🔍 getPlanesProducto: No hay planes específicos ni por defecto para este producto')
    console.log('✅ getPlanesProducto: No se mostrarán planes de financiación')
    return []
  } catch (error) {
    console.error('❌ getPlanesProducto: Error general:', error)
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

// Función para verificar qué tipo de planes tiene un producto
export async function getTipoPlanesProducto(productoId: string): Promise<'especiales' | 'default' | 'todos' | 'ninguno'> {
  try {
    // 1. Verificar planes especiales
    try {
      const { data: planesEspeciales } = await supabase
        .from('producto_planes')
        .select('id')
        .eq('fk_id_producto', parseInt(productoId))
        .limit(1)

      if (planesEspeciales && planesEspeciales.length > 0) {
        return 'especiales'
      }
    } catch (error) {
      console.log('⚠️ getTipoPlanesProducto: Error al verificar planes especiales (tabla puede no existir):', error)
    }

    // 2. Verificar planes por defecto
    try {
      const { data: planesDefault } = await supabase
        .from('producto_planes_default')
        .select('id')
        .eq('fk_id_producto', parseInt(productoId))
        .limit(1)

      if (planesDefault && planesDefault.length > 0) {
        return 'default'
      }
    } catch (error) {
      console.log('⚠️ getTipoPlanesProducto: Error al verificar planes por defecto (tabla puede no existir):', error)
    }

    // 3. Si no hay planes especiales ni por defecto, no hay planes para este producto
    return 'ninguno'
  } catch (error) {
    console.error('❌ getTipoPlanesProducto: Error general:', error)
    return 'ninguno'
  }
} 