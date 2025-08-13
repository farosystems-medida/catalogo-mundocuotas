-- Script para poblar la tabla productos_planes_default con productos existentes
-- Este script asocia todos los productos existentes con todos los planes de financiación activos

-- Primero, verificar qué productos y planes existen
SELECT 'Productos existentes:' as info;
SELECT id, descripcion FROM productos ORDER BY id;

SELECT 'Planes de financiación activos:' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY id;

-- Poblar la tabla productos_planes_default con todos los productos existentes
-- y todos los planes de financiación activos
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo)
SELECT 
    p.id as fk_id_producto,
    pf.id as fk_id_plan,
    true as activo
FROM productos p
CROSS JOIN planes_financiacion pf
WHERE pf.activo = true
ON CONFLICT (fk_id_producto, fk_id_plan) DO NOTHING;

-- Verificar que se insertaron los datos
SELECT 'Asociaciones creadas:' as info;
SELECT COUNT(*) as total_asociaciones FROM productos_planes_default;

-- Mostrar algunas asociaciones de ejemplo
SELECT 'Ejemplos de asociaciones:' as info;
SELECT 
    ppd.id,
    p.descripcion as producto,
    pf.nombre as plan,
    pf.cuotas,
    ppd.activo
FROM productos_planes_default ppd
JOIN productos p ON ppd.fk_id_producto = p.id
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
ORDER BY p.id, pf.cuotas
LIMIT 10;
