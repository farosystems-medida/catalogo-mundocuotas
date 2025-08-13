-- Script para insertar datos de ejemplo básicos
-- Primero verificar qué productos y planes existen

-- Verificar productos existentes
SELECT 'Productos disponibles:' as info;
SELECT id, descripcion FROM productos ORDER BY id LIMIT 5;

-- Verificar planes de financiación existentes
SELECT 'Planes de financiación disponibles:' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY id LIMIT 5;

-- Insertar datos de ejemplo (ajusta los IDs según tus datos reales)
-- Ejemplo: asociar el primer producto con los primeros 3 planes
INSERT INTO productos_planes_default (fk_id_producto, fk_id_plan, activo) VALUES
(1, 1, true),
(1, 2, true),
(1, 3, true)
ON CONFLICT DO NOTHING;

-- Verificar que se insertaron los datos
SELECT 'Datos insertados:' as info;
SELECT COUNT(*) as total_registros FROM productos_planes_default;

-- Mostrar los datos insertados
SELECT 'Registros en productos_planes_default:' as info;
SELECT 
    ppd.id,
    ppd.fk_id_producto,
    ppd.fk_id_plan,
    ppd.activo
FROM productos_planes_default ppd
ORDER BY ppd.fk_id_producto, ppd.fk_id_plan
LIMIT 10;
