-- Script para configurar productos de prueba
-- Ejecuta este script en el SQL Editor de Supabase después de ejecutar los otros scripts

-- Verificar productos existentes
SELECT 'Productos disponibles:' as info;
SELECT id, descripcion, fk_id_categoria FROM productos ORDER BY id LIMIT 10;

-- Configurar producto 1: Planes generales (sin categorías)
UPDATE productos 
SET aplicar_todos_planes = true,
    aplicar_planes_categoria = false,
    aplicar_planes_especiales = false
WHERE id = 1;

-- Configurar producto 2: Planes de categoría
UPDATE productos 
SET aplicar_todos_planes = false,
    aplicar_planes_categoria = true,
    aplicar_planes_especiales = false
WHERE id = 2;

-- Configurar producto 3: Planes especiales
UPDATE productos 
SET aplicar_todos_planes = false,
    aplicar_planes_categoria = false,
    aplicar_planes_especiales = true
WHERE id = 3;

-- Configurar producto 4: Sin configuración (usará fallback)
UPDATE productos 
SET aplicar_todos_planes = false,
    aplicar_planes_categoria = false,
    aplicar_planes_especiales = false
WHERE id = 4;

-- Verificar la configuración
SELECT 'Configuración de productos de prueba:' as info;
SELECT 
    id,
    descripcion,
    fk_id_categoria,
    aplicar_todos_planes,
    aplicar_planes_categoria,
    aplicar_planes_especiales
FROM productos 
WHERE id IN (1, 2, 3, 4)
ORDER BY id;

-- Mostrar planes disponibles
SELECT 'Planes de financiación activos:' as info;
SELECT id, nombre, cuotas FROM planes_financiacion WHERE activo = true ORDER BY cuotas;

-- Mostrar categorías disponibles
SELECT 'Categorías disponibles:' as info;
SELECT id, descripcion FROM categoria ORDER BY id;
