-- Script para insertar datos de ejemplo con las nuevas imágenes
-- Ejecuta este script en el SQL Editor de Supabase

-- Actualizar productos existentes con imágenes adicionales de ejemplo
-- Nota: Reemplaza las URLs con las URLs reales de tus imágenes

-- Ejemplo 1: Heladera con múltiples imágenes
UPDATE productos 
SET 
    imagen_2 = '/placeholder.svg?height=400&width=400&text=Imagen+2',
    imagen_3 = '/placeholder.svg?height=400&width=400&text=Imagen+3',
    imagen_4 = '/placeholder.svg?height=400&width=400&text=Imagen+4',
    imagen_5 = '/placeholder.svg?height=400&width=400&text=Imagen+5'
WHERE id = 1;

-- Ejemplo 2: Lavarropas con algunas imágenes adicionales
UPDATE productos 
SET 
    imagen_2 = '/placeholder.svg?height=400&width=400&text=Detalle+1',
    imagen_3 = '/placeholder.svg?height=400&width=400&text=Detalle+2'
WHERE id = 2;

-- Ejemplo 3: Microondas con una imagen adicional
UPDATE productos 
SET 
    imagen_2 = '/placeholder.svg?height=400&width=400&text=Interior'
WHERE id = 3;

-- Verificar los cambios
SELECT 'Productos actualizados con imágenes adicionales:' as info;
SELECT 
    id,
    descripcion,
    imagen,
    imagen_2,
    imagen_3,
    imagen_4,
    imagen_5
FROM productos 
WHERE imagen_2 IS NOT NULL OR imagen_3 IS NOT NULL OR imagen_4 IS NOT NULL OR imagen_5 IS NOT NULL
ORDER BY id;

-- Mostrar el total de productos con imágenes adicionales
SELECT 'Resumen:' as info;
SELECT 
    COUNT(*) as total_productos,
    COUNT(imagen_2) as con_imagen_2,
    COUNT(imagen_3) as con_imagen_3,
    COUNT(imagen_4) as con_imagen_4,
    COUNT(imagen_5) as con_imagen_5
FROM productos;
