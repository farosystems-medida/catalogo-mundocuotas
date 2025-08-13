-- Script para agregar los nuevos campos de imagen a la tabla productos
-- Ejecuta este script en el SQL Editor de Supabase

-- Agregar los nuevos campos de imagen
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS imagen_2 VARCHAR(500),
ADD COLUMN IF NOT EXISTS imagen_3 VARCHAR(500),
ADD COLUMN IF NOT EXISTS imagen_4 VARCHAR(500),
ADD COLUMN IF NOT EXISTS imagen_5 VARCHAR(500);

-- Verificar que los campos se agregaron correctamente
SELECT 'Campos de imagen agregados:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'productos' 
AND column_name LIKE 'imagen%'
ORDER BY column_name;

-- Mostrar algunos productos para verificar la estructura
SELECT 'Estructura de productos:' as info;
SELECT 
    id,
    descripcion,
    imagen,
    imagen_2,
    imagen_3,
    imagen_4,
    imagen_5
FROM productos 
LIMIT 3;

-- Comentarios sobre los nuevos campos
COMMENT ON COLUMN productos.imagen_2 IS 'Segunda imagen del producto';
COMMENT ON COLUMN productos.imagen_3 IS 'Tercera imagen del producto';
COMMENT ON COLUMN productos.imagen_4 IS 'Cuarta imagen del producto';
COMMENT ON COLUMN productos.imagen_5 IS 'Quinta imagen del producto';
