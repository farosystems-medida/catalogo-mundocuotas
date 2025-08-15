-- Script para insertar datos de ejemplo en plan_categoria
-- Ejecuta este script en el SQL Editor de Supabase

-- Primero, verificar qué planes y categorías existen
SELECT 'Planes de financiación disponibles:' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY id;

SELECT 'Categorías disponibles:' as info;
SELECT id, descripcion FROM categoria ORDER BY id;

-- Insertar asociaciones de ejemplo
-- Nota: Ajusta los IDs según tus datos reales

-- Ejemplo 1: Plan 1 asociado a categoría Lavarropas (ID 1)
INSERT INTO plan_categoria (fk_id_plan, fk_id_categoria, activo) VALUES
(1, 1, true)  -- Plan 1 con categoría Lavarropas
ON CONFLICT (fk_id_plan, fk_id_categoria) DO NOTHING;

-- Ejemplo 2: Plan 2 asociado a categoría Heladeras (ID 2)
INSERT INTO plan_categoria (fk_id_plan, fk_id_categoria, activo) VALUES
(2, 2, true)  -- Plan 2 con categoría Heladeras
ON CONFLICT (fk_id_plan, fk_id_categoria) DO NOTHING;

-- Ejemplo 3: Plan 3 asociado a múltiples categorías
INSERT INTO plan_categoria (fk_id_plan, fk_id_categoria, activo) VALUES
(3, 1, true),  -- Plan 3 con categoría Lavarropas
(3, 2, true)   -- Plan 3 con categoría Heladeras
ON CONFLICT (fk_id_plan, fk_id_categoria) DO NOTHING;

-- Ejemplo 4: Plan 4 asociado a categoría Microondas (ID 4)
INSERT INTO plan_categoria (fk_id_plan, fk_id_categoria, activo) VALUES
(4, 4, true)  -- Plan 4 con categoría Microondas
ON CONFLICT (fk_id_plan, fk_id_categoria) DO NOTHING;

-- Verificar los datos insertados
SELECT 'Asociaciones creadas:' as info;
SELECT COUNT(*) as total_asociaciones FROM plan_categoria;

-- Mostrar las asociaciones creadas
SELECT 'Registros en plan_categoria:' as info;
SELECT 
    pc.id,
    pc.fk_id_plan,
    pf.nombre as plan,
    pf.cuotas,
    pc.fk_id_categoria,
    c.descripcion as categoria,
    pc.activo
FROM plan_categoria pc
JOIN planes_financiacion pf ON pc.fk_id_plan = pf.id
JOIN categoria c ON pc.fk_id_categoria = c.id
ORDER BY pc.fk_id_plan, pc.fk_id_categoria;

-- Mostrar planes que NO tienen categorías (planes "generales")
SELECT 'Planes sin categorías (generales):' as info;
SELECT 
    pf.id,
    pf.nombre,
    pf.cuotas
FROM planes_financiacion pf
WHERE pf.activo = true
AND NOT EXISTS (
    SELECT 1 FROM plan_categoria pc 
    WHERE pc.fk_id_plan = pf.id 
    AND pc.activo = true
)
ORDER BY pf.cuotas;
