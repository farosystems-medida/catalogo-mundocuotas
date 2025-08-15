-- Script para debuggear el producto ID 12 (Pava)
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar información del producto
SELECT 'Información del producto ID 12:' as info;
SELECT id, descripcion, precio FROM productos WHERE id = 12;

-- 2. Verificar planes por defecto del producto 12
SELECT 'Planes por defecto del producto 12:' as info;
SELECT 
    ppd.id,
    ppd.fk_id_plan,
    pf.nombre as plan,
    pf.cuotas,
    pf.activo as plan_activo,
    ppd.activo as asociacion_activa
FROM productos_planes_default ppd
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 12
ORDER BY pf.cuotas;

-- 3. Verificar planes especiales del producto 12
SELECT 'Planes especiales del producto 12:' as info;
SELECT 
    pp.id,
    pp.fk_id_plan,
    pf.nombre as plan,
    pf.cuotas,
    pf.activo as plan_activo,
    pp.activo as asociacion_activa
FROM producto_planes pp
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.fk_id_producto = 12
ORDER BY pf.cuotas;

-- 4. Verificar todos los planes de financiación activos
SELECT 'Todos los planes de financiación activos:' as info;
SELECT id, nombre, cuotas, activo FROM planes_financiacion WHERE activo = true ORDER BY cuotas;

-- 5. Simular la lógica de getPlanesProducto para el producto 12
SELECT 'Simulación de getPlanesProducto para producto 12:' as info;

-- Paso 1: Buscar planes especiales
SELECT 'Paso 1 - Planes especiales encontrados:' as info;
SELECT COUNT(*) as total_planes_especiales
FROM producto_planes pp
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.fk_id_producto = 12 
AND pp.activo = true 
AND pf.activo = true;

-- Paso 2: Si no hay planes especiales, buscar planes por defecto
SELECT 'Paso 2 - Planes por defecto encontrados:' as info;
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

-- Paso 3: Si no hay planes por defecto, todos los planes activos
SELECT 'Paso 3 - Todos los planes activos (fallback):' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY cuotas;

-- 6. Verificar si hay algún plan duplicado o problema en la consulta
SELECT 'Verificación de duplicados:' as info;
SELECT 
    pf.id,
    pf.nombre,
    pf.cuotas,
    COUNT(*) as veces_en_default
FROM productos_planes_default ppd
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 12 
AND ppd.activo = true 
AND pf.activo = true
GROUP BY pf.id, pf.nombre, pf.cuotas
HAVING COUNT(*) > 1;
