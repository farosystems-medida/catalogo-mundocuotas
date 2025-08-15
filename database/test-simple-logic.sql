-- Script para probar la lógica simplificada de planes
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar que las tablas existen
SELECT 'Verificando tablas:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('productos', 'planes_financiacion', 'producto_planes', 'productos_planes_default')
ORDER BY table_name;

-- 2. Verificar productos existentes
SELECT 'Productos disponibles:' as info;
SELECT id, descripcion FROM productos ORDER BY id LIMIT 5;

-- 3. Verificar planes de financiación existentes
SELECT 'Planes de financiación activos:' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY cuotas;

-- 4. Verificar planes por defecto existentes
SELECT 'Planes por defecto existentes:' as info;
SELECT 
    ppd.fk_id_producto,
    p.descripcion as producto,
    ppd.fk_id_plan,
    pf.nombre as plan,
    pf.cuotas
FROM productos_planes_default ppd
JOIN productos p ON ppd.fk_id_producto = p.id
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.activo = true AND pf.activo = true
ORDER BY ppd.fk_id_producto, pf.cuotas
LIMIT 10;

-- 5. Verificar planes especiales existentes
SELECT 'Planes especiales existentes:' as info;
SELECT 
    pp.fk_id_producto,
    p.descripcion as producto,
    pp.fk_id_plan,
    pf.nombre as plan,
    pf.cuotas
FROM producto_planes pp
JOIN productos p ON pp.fk_id_producto = p.id
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.activo = true AND pf.activo = true
ORDER BY pp.fk_id_producto, pf.cuotas
LIMIT 10;

-- 6. Ejemplo: Configurar un producto con planes por defecto
-- (Asumiendo que el producto 1 existe)
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo)
SELECT 1, id, true
FROM planes_financiacion 
WHERE activo = true 
AND id IN (1, 2, 3)  -- Ajusta los IDs según tus planes reales
ON CONFLICT (fk_id_producto, fk_id_plan) DO NOTHING;

-- 7. Ejemplo: Configurar un producto con planes especiales
-- (Asumiendo que el producto 2 existe)
INSERT INTO producto_planes (fk_id_producto, fk_id_plan, activo)
SELECT 2, id, true
FROM planes_financiacion 
WHERE activo = true 
AND id = 4  -- Solo un plan especial (ajusta el ID según tus planes reales)
ON CONFLICT (fk_id_producto, fk_id_plan) DO NOTHING;

-- 8. Verificar la configuración final
SELECT 'Configuración final:' as info;
SELECT 
    'Producto 1 - Planes por defecto' as tipo,
    p.descripcion as producto,
    pf.nombre as plan,
    pf.cuotas
FROM productos_planes_default ppd
JOIN productos p ON ppd.fk_id_producto = p.id
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 1 AND ppd.activo = true AND pf.activo = true
UNION ALL
SELECT 
    'Producto 2 - Planes especiales' as tipo,
    p.descripcion as producto,
    pf.nombre as plan,
    pf.cuotas
FROM producto_planes pp
JOIN productos p ON pp.fk_id_producto = p.id
JOIN planes_financiacion pf ON pp.fk_id_plan = pf.id
WHERE pp.fk_id_producto = 2 AND pp.activo = true AND pf.activo = true
ORDER BY tipo, pf.cuotas;
