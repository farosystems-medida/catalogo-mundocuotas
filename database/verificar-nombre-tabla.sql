-- Script para verificar el nombre correcto de la tabla
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar todas las tablas que contengan "producto" y "plan"
SELECT 'TABLAS CON PRODUCTO Y PLAN:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%producto%' 
AND table_name LIKE '%plan%'
ORDER BY table_name;

-- 2. Verificar todas las tablas que contengan "default"
SELECT 'TABLAS CON DEFAULT:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%default%'
ORDER BY table_name;

-- 3. Verificar la estructura de la tabla que viste en la imagen
SELECT 'ESTRUCTURA DE PRODUCTOS_PLANES_DEFAULT:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'productos_planes_default'
ORDER BY ordinal_position;

-- 4. Si la tabla existe, verificar los datos del producto 12
SELECT 'DATOS DEL PRODUCTO 12:' as info;
SELECT * FROM productos_planes_default WHERE fk_id_producto = 12;

-- 5. Verificar si existe con otro nombre
SELECT 'BUSCANDO TABLA CON DATOS DEL PRODUCTO 12:' as info;
SELECT 
    t.table_name,
    COUNT(*) as registros_producto_12
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE t.table_schema = 'public' 
AND c.column_name = 'fk_id_producto'
AND t.table_name LIKE '%plan%'
GROUP BY t.table_name
HAVING COUNT(*) > 0;
