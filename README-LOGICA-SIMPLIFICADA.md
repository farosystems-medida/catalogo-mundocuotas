# Lógica Simplificada de Planes de Financiación

## Descripción

Sistema simplificado de planes de financiación con priorización clara:

1. **Planes Especiales** (`productos_planes`) → Prioridad más alta
2. **Planes por Defecto** (`productos_planes_default`) → Prioridad media
3. **Todos los Planes Activos** → Fallback

## Lógica de Priorización

### **1. Planes Especiales** (Prioridad más alta)
- **Tabla**: `productos_planes`
- **Comportamiento**: Si el producto tiene registros aquí, SOLO muestra estos planes
- **Uso**: Ofertas especiales, promociones temporales

### **2. Planes por Defecto** (Prioridad media)
- **Tabla**: `productos_planes_default`
- **Comportamiento**: Si NO hay planes especiales, muestra estos planes
- **Uso**: Configuración estándar del producto

### **3. Fallback** (Último recurso)
- **Tabla**: `planes_financiacion`
- **Comportamiento**: Si no hay planes específicos, muestra todos los planes activos
- **Uso**: Productos sin configuración específica

## Ejemplos de Uso

### **Ejemplo 1: Producto con Planes por Defecto**
```sql
-- Producto tiene 6, 12 y 18 cuotas en productos_planes_default
-- NO tiene registros en productos_planes
-- Resultado: Muestra 6, 12 y 18 cuotas
```

### **Ejemplo 2: Producto con Planes Especiales**
```sql
-- Producto tiene 6, 12 y 18 cuotas en productos_planes_default
-- PERO también tiene 18 cuotas en productos_planes (oferta especial)
-- Resultado: Muestra SOLO 18 cuotas (los planes especiales tienen prioridad)
```

### **Ejemplo 3: Producto sin Configuración**
```sql
-- Producto NO tiene registros en ninguna tabla
-- Resultado: Muestra todos los planes activos
```

## Implementación

### **1. Verificar estructura**
```sql
-- Ejecutar: database/test-simple-logic.sql
```

### **2. Configurar Producto con Planes por Defecto**
```sql
-- Asociar producto con planes por defecto
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(1, 1, true),  -- Producto 1 con Plan 1 (6 cuotas)
(1, 2, true),  -- Producto 1 con Plan 2 (12 cuotas)
(1, 3, true);  -- Producto 1 con Plan 3 (18 cuotas)
```

### **3. Configurar Producto con Planes Especiales**
```sql
-- Crear oferta especial (esto anula los planes por defecto)
INSERT INTO producto_planes (fk_id_producto, fk_id_plan, activo) VALUES
(1, 3, true);  -- Producto 1 SOLO con Plan 3 (18 cuotas) - oferta especial
```

### **4. Eliminar Oferta Especial**
```sql
-- Eliminar la oferta especial para volver a los planes por defecto
DELETE FROM producto_planes WHERE fk_id_producto = 1 AND fk_id_plan = 3;
-- O desactivar
UPDATE producto_planes SET activo = false WHERE fk_id_producto = 1 AND fk_id_plan = 3;
```

## Funciones

### `getPlanesProducto(productoId: string)`
1. Busca planes en `productos_planes`
2. Si encuentra → los usa y termina
3. Si no encuentra → busca en `productos_planes_default`
4. Si encuentra → los usa y termina
5. Si no encuentra → usa todos los planes activos

### `getTipoPlanesProducto(productoId: string)`
Retorna el tipo de planes que tiene el producto:
- `'especiales'`: Tiene planes en `productos_planes`
- `'default'`: Tiene planes en `productos_planes_default`
- `'todos'`: Usa todos los planes activos
- `'ninguno'`: No tiene planes disponibles

## Casos de Uso Prácticos

### **Caso 1: Producto Normal**
```sql
-- Configurar planes por defecto
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(1, 1, true), (1, 2, true), (1, 3, true);
-- Resultado: Muestra 6, 12 y 18 cuotas
```

### **Caso 2: Oferta Especial**
```sql
-- Agregar oferta especial
INSERT INTO producto_planes (fk_id_producto, fk_id_plan, activo) VALUES
(1, 3, true);
-- Resultado: Muestra SOLO 18 cuotas
```

### **Caso 3: Finalizar Oferta**
```sql
-- Eliminar oferta especial
DELETE FROM producto_planes WHERE fk_id_producto = 1;
-- Resultado: Vuelve a mostrar 6, 12 y 18 cuotas (planes por defecto)
```

## Debug y Monitoreo

### **Habilitar información de debug:**
```tsx
<FinancingPlans productoId={product.id} precio={product.precio} showDebug={true} />
```

### **Logs esperados:**
```
🔍 getPlanesProducto: Buscando planes para producto ID: 1
🔍 getPlanesProducto: Planes especiales encontrados: 1
✅ getPlanesProducto: Usando planes especiales: 1 planes
```

## Ventajas del Sistema Simplificado

1. **Lógica Clara**: Priorización simple y predecible
2. **Fácil Mantenimiento**: Solo dos tablas principales
3. **Flexibilidad**: Fácil crear y eliminar ofertas especiales
4. **Performance**: Menos consultas complejas
5. **Debug**: Información clara sobre qué planes se usan

## Mantenimiento

### **Agregar Oferta Especial:**
```sql
INSERT INTO producto_planes (fk_id_producto, fk_id_plan, activo) VALUES
(123, 4, true);
```

### **Eliminar Oferta Especial:**
```sql
DELETE FROM producto_planes WHERE fk_id_producto = 123;
```

### **Verificar Configuración:**
```sql
-- Ver planes por defecto
SELECT p.descripcion, pf.nombre, pf.cuotas
FROM productos_planes_default ppd
JOIN productos p ON ppd.fk_id_producto = p.id
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 123;

-- Ver planes especiales
SELECT p.descripcion, pf.nombre, pf.cuotas
FROM producto_planes pp
JOIN productos p ON pp.fk_id_producto = p.id
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.fk_id_producto = 123;
```
