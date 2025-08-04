-- Script para verificar los datos existentes en las tablas
-- Ejecuta este script en el SQL Editor de Supabase

-- Verificar si las tablas existen
SELECT 'Tablas existentes:' as info;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('categoria', 'marcas');

-- Ver datos en tabla categoria
SELECT 'Datos en tabla categoria:' as info;
SELECT COUNT(*) as total_registros FROM categoria;
SELECT id, descripcion, created_at FROM categoria ORDER BY id;

-- Ver datos en tabla marcas
SELECT 'Datos en tabla marcas:' as info;
SELECT COUNT(*) as total_registros FROM marcas;
SELECT id, descripcion, created_at FROM marcas ORDER BY id; 