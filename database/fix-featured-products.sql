-- Script para verificar y corregir productos destacados

-- 1. Verificar el estado actual de los productos destacados
SELECT 
    id,
    descripcion,
    destacado,
    CASE 
        WHEN destacado IS NULL THEN 'NULL'
        WHEN destacado = true THEN 'TRUE'
        WHEN destacado = false THEN 'FALSE'
        ELSE 'OTRO: ' || destacado::text
    END as estado_destacado
FROM productos
ORDER BY destacado DESC, descripcion;

-- 2. Contar productos por estado de destacado
SELECT 
    CASE 
        WHEN destacado IS NULL THEN 'NULL'
        WHEN destacado = true THEN 'TRUE'
        WHEN destacado = false THEN 'FALSE'
        ELSE 'OTRO'
    END as estado,
    COUNT(*) as cantidad
FROM productos
GROUP BY 
    CASE 
        WHEN destacado IS NULL THEN 'NULL'
        WHEN destacado = true THEN 'TRUE'
        WHEN destacado = false THEN 'FALSE'
        ELSE 'OTRO'
    END;

-- 3. Corregir productos destacados (ejecutar solo si es necesario)
-- Marcar productos específicos como destacados
UPDATE productos 
SET destacado = true 
WHERE descripcion IN (
    'Heladera Samsung No Frost 364L',
    'Lavarropas LG Automático 8kg',
    'Aire Acondicionado Split 3000 Frigorías',
    'Smart TV Samsung 55 4K',
    'Heladera LG Side by Side 600L',
    'Smart TV LG 65 OLED'
);

-- 4. Asegurar que el campo destacado no sea NULL
UPDATE productos 
SET destacado = false 
WHERE destacado IS NULL;

-- 5. Verificar después de las correcciones
SELECT 
    descripcion,
    destacado,
    CASE 
        WHEN destacado = true THEN '⭐ DESTACADO'
        ELSE '📦 Normal'
    END as estado
FROM productos
ORDER BY destacado DESC, descripcion;

-- 6. Contar productos destacados final
SELECT 
    COUNT(*) as total_productos,
    COUNT(CASE WHEN destacado = true THEN 1 END) as productos_destacados,
    COUNT(CASE WHEN destacado = false THEN 1 END) as productos_normales
FROM productos; 