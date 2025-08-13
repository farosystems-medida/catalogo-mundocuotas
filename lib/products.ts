export interface Categoria {
  id: number
  descripcion: string
  created_at: string
}

export interface Marca {
  id: number
  descripcion: string
  created_at: string
}

export interface PlanFinanciacion {
  id: number
  nombre: string
  cuotas: number
  recargo_porcentual: number
  recargo_fijo: number
  monto_minimo: number
  monto_maximo?: number
  activo: boolean
  created_at: string
  updated_at: string
}

export interface ProductoPlan {
  id: number
  fk_id_producto: number
  fk_id_plan: number
  activo: boolean
  created_at: string
}

export interface ProductoPlanDefault {
  id: number
  fk_id_producto: number
  fk_id_plan: number
  activo: boolean
  created_at: string
}

export interface FinancingPlan {
  installments: number
  monthlyPayment: number
}

export interface Product {
  id: string
  descripcion: string
  descripcion_detallada: string
  precio: number
  stock: number
  imagen: string
  imagen_2?: string
  imagen_3?: string
  imagen_4?: string
  imagen_5?: string
  fk_id_categoria: number
  fk_id_marca: number
  destacado: boolean
  created_at?: string
  updated_at?: string
  
  // Campos adicionales para mantener compatibilidad
  name?: string
  description?: string
  price?: number
  image?: string
  featured?: boolean
  category?: string
  brand?: string
  financingPlans?: FinancingPlan[]
  specifications?: string[]
  
  // Relaciones (se llenarán con JOIN)
  categoria?: Categoria
  marca?: Marca
  planes_financiacion?: PlanFinanciacion[]
}
