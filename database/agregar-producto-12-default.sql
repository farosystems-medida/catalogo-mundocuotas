-- Script para agregar el producto 12 a productos_planes_default
-- Ejecuta este script en el SQL Editor de Supabase

-- Verificar que el producto 12 existe
SELECT 'Verificando producto 12:' as info;
SELECT id, descripcion, precio FROM productos WHERE id = 12;

-- Verificar que los planes 1, 2, 3, 5 existen y están activos
SELECT 'Verificando planes 1, 2, 3, 5:' as info;
SELECT id, nombre, cuotas, activo FROM planes_financiacion WHERE id IN (1, 2, 3, 5) ORDER BY id;

-- Agregar el producto 12 a productos_planes_default con los 4 planes específicos
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(12, 1, true),  -- Plan 1
(12, 2, true),  -- Plan 2  
(12, 3, true),  -- Plan 3
(12, 5, true)   -- Plan 5
ON CONFLICT (fk_id_producto, fk_id_plan) DO NOTHING;

-- Verificar que se agregaron correctamente
SELECT 'Producto 12 agregado a productos_planes_default:' as info;
SELECT 
    ppd.id,
    ppd.fk_id_producto,
    ppd.fk_id_plan,
    pf.nombre as plan,
    pf.cuotas,
    ppd.activo
FROM productos_planes_default ppd
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 12
ORDER BY pf.cuotas;

-- Verificar que ahora el producto 12 tiene exactamente 4 planes
SELECT 'Total de planes para producto 12:' as info;
SELECT COUNT(*) as total_planes
FROM productos_planes_default ppd
JOIN planes_financiacion pf ON ppd.fk_id_plan = pf.id
WHERE ppd.fk_id_producto = 12 
AND ppd.activo = true 
AND pf.activo = true;
