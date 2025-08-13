-- Script para verificar las tablas existentes y su estructura

-- Verificar si la tabla productos_planes_default existe
SELECT 'Verificando tabla productos_planes_default:' as info;
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'productos_planes_default'
) as tabla_existe;

-- Verificar si la tabla producto_planes existe
SELECT 'Verificando tabla producto_planes:' as info;
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'producto_planes'
) as tabla_existe;

-- Verificar si la tabla planes_financiacion existe
SELECT 'Verificando tabla planes_financiacion:' as info;
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'planes_financiacion'
) as tabla_existe;

-- Mostrar todas las tablas que contengan 'plan' en el nombre
SELECT 'Tablas relacionadas con planes:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%plan%'
ORDER BY table_name;

-- Verificar estructura de la tabla planes_financiacion si existe
SELECT 'Estructura de planes_financiacion:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'planes_financiacion'
ORDER BY ordinal_position;
