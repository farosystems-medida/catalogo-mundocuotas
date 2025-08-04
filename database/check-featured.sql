-- Script simple para verificar productos destacados

-- 1. Verificar todos los productos y su estado de destacado
SELECT 
    id,
    descripcion,
    destacado,
    CASE 
        WHEN destacado = true THEN '⭐ DESTACADO'
        WHEN destacado = false THEN '📦 Normal'
        WHEN destacado IS NULL THEN '❓ NULL'
        ELSE '❓ OTRO: ' || destacado::text
    END as estado
FROM productos
ORDER BY destacado DESC, descripcion;

-- 2. Contar productos destacados
SELECT 
    COUNT(*) as total_productos,
    COUNT(CASE WHEN destacado = true THEN 1 END) as productos_destacados,
    COUNT(CASE WHEN destacado = false THEN 1 END) as productos_normales,
    COUNT(CASE WHEN destacado IS NULL THEN 1 END) as productos_null
FROM productos;

-- 3. Mostrar solo productos destacados
SELECT 
    id,
    descripcion,
    destacado
FROM productos
WHERE destacado = true
ORDER BY descripcion; 