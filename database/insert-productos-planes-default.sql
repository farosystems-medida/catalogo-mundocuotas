-- Script para insertar datos de ejemplo en productos_planes_default
-- Este script asocia todos los productos con todos los planes de financiación activos

-- Primero, obtener todos los productos y planes activos
-- Luego, crear las asociaciones por defecto

-- Insertar asociaciones por defecto para todos los productos con todos los planes
-- Nota: Reemplaza los IDs de productos y planes con los valores reales de tu base de datos

-- Ejemplo para producto ID 1 con todos los planes
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(1, 1, true),  -- Producto 1 con Plan 1
(1, 2, true),  -- Producto 1 con Plan 2
(1, 3, true),  -- Producto 1 con Plan 3
(1, 4, true);  -- Producto 1 con Plan 4

-- Ejemplo para producto ID 2 con todos los planes
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(2, 1, true),  -- Producto 2 con Plan 1
(2, 2, true),  -- Producto 2 con Plan 2
(2, 3, true),  -- Producto 2 con Plan 3
(2, 4, true);  -- Producto 2 con Plan 4

-- Ejemplo para producto ID 3 con todos los planes
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(3, 1, true),  -- Producto 3 con Plan 1
(3, 2, true),  -- Producto 3 con Plan 2
(3, 3, true),  -- Producto 3 con Plan 3
(3, 4, true);  -- Producto 3 con Plan 4

-- Script automático para asociar todos los productos con todos los planes (descomenta si quieres usar esto)
/*
-- Obtener todos los productos y planes activos y crear las asociaciones automáticamente
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo)
SELECT 
    p.id as fk_id_producto,
    pf.id as fk_id_plan,
    true as activo
FROM productos p
CROSS JOIN planes_financiacion pf
WHERE pf.activo = true
ON CONFLICT (fk_id_producto, fk_id_plan) DO NOTHING;
*/
