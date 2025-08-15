-- Script para verificar qué productos tienen planes de financiación configurados
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar productos con planes especiales
SELECT 'PRODUCTOS CON PLANES ESPECIALES:' as info;
SELECT 
    p.id,
    p.descripcion,
    COUNT(pp.fk_id_plan) as total_planes_especiales
FROM productos p
LEFT JOIN producto_planes pp ON p.id = pp.fk_id_producto
WHERE pp.fk_id_producto IS NOT NULL
GROUP BY p.id, p.descripcion
ORDER BY p.id;

-- 2. Verificar productos con planes por defecto
SELECT 'PRODUCTOS CON PLANES POR DEFECTO:' as info;
SELECT 
    p.id,
    p.descripcion,
    COUNT(ppd.fk_id_plan) as total_planes_default
FROM productos p
LEFT JOIN producto_planes_default ppd ON p.id = ppd.fk_id_producto
WHERE ppd.fk_id_producto IS NOT NULL
GROUP BY p.id, p.descripcion
ORDER BY p.id;

-- 3. Productos SIN planes de financiación (no deberían mostrar planes)
SELECT 'PRODUCTOS SIN PLANES DE FINANCIACIÓN:' as info;
SELECT 
    p.id,
    p.descripcion,
    p.precio,
    CASE 
        WHEN pp.fk_id_producto IS NOT NULL THEN 'Tiene planes especiales'
        WHEN ppd.fk_id_producto IS NOT NULL THEN 'Tiene planes por defecto'
        ELSE 'SIN PLANES'
    END as estado_planes
FROM productos p
LEFT JOIN producto_planes pp ON p.id = pp.fk_id_producto
LEFT JOIN producto_planes_default ppd ON p.id = ppd.fk_id_producto
WHERE pp.fk_id_producto IS NULL AND ppd.fk_id_producto IS NULL
ORDER BY p.id;

-- 4. Resumen general
SELECT 'RESUMEN GENERAL:' as info;
SELECT 
    COUNT(*) as total_productos,
    COUNT(CASE WHEN pp.fk_id_producto IS NOT NULL THEN 1 END) as con_planes_especiales,
    COUNT(CASE WHEN ppd.fk_id_producto IS NOT NULL THEN 1 END) as con_planes_default,
    COUNT(CASE WHEN pp.fk_id_producto IS NULL AND ppd.fk_id_producto IS NULL THEN 1 END) as sin_planes
FROM productos p
LEFT JOIN producto_planes pp ON p.id = pp.fk_id_producto
LEFT JOIN producto_planes_default ppd ON p.id = ppd.fk_id_producto;
