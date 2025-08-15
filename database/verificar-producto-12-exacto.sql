-- Verificación exacta del producto ID 12
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar planes por defecto EXACTOS del producto 12
SELECT 'PLANES POR DEFECTO - Producto 12:' as info;
SELECT 
    ppd.id as registro_id,
    ppd.fk_id_plan,
    pf.nombre as plan_nombre,
    pf.cuotas,
    pf.activo as plan_activo,
    ppd.activo as asociacion_activa
FROM productos_planes_default ppd
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 12
ORDER BY pf.cuotas;

-- 2. Verificar si hay planes especiales (esto anularía los planes por defecto)
SELECT 'PLANES ESPECIALES - Producto 12:' as info;
SELECT 
    pp.id as registro_id,
    pp.fk_id_plan,
    pf.nombre as plan_nombre,
    pf.cuotas,
    pf.activo as plan_activo,
    pp.activo as asociacion_activa
FROM producto_planes pp
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.fk_id_producto = 12
ORDER BY pf.cuotas;

-- 3. Simular exactamente la consulta que hace getPlanesProducto
SELECT 'SIMULACIÓN EXACTA DE getPlanesProducto:' as info;

-- Paso 1: Buscar planes especiales
SELECT 'PASO 1 - Planes especiales (producto_planes):' as info;
SELECT 
    pf.id,
    pf.nombre,
    pf.cuotas
FROM producto_planes pp
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.fk_id_producto = 12 
AND pp.activo = true 
AND pf.activo = true
ORDER BY pf.cuotas;

-- Paso 2: Si no hay planes especiales, planes por defecto
SELECT 'PASO 2 - Planes por defecto (productos_planes_default):' as info;
SELECT 
    pf.id,
    pf.nombre,
    pf.cuotas
FROM productos_planes_default ppd
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 12 
AND ppd.activo = true 
AND pf.activo = true
ORDER BY pf.cuotas;

-- Paso 3: Todos los planes activos (fallback)
SELECT 'PASO 3 - Todos los planes activos (fallback):' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY cuotas;

-- 4. Verificar si hay algún problema con los IDs de planes
SELECT 'VERIFICACIÓN DE PLANES:' as info;
SELECT 
    pf.id,
    pf.nombre,
    pf.cuotas,
    pf.activo
FROM planes_financiacion pf
WHERE pf.id IN (1, 2, 3, 4, 5)
ORDER BY pf.id;
