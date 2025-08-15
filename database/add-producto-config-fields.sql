-- Script para agregar los nuevos campos de configuración de planes a la tabla productos
-- Ejecuta este script en el SQL Editor de Supabase

-- Agregar los nuevos campos de configuración
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS aplicar_todos_planes BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS aplicar_planes_categoria BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS aplicar_planes_especiales BOOLEAN DEFAULT false;

-- Verificar que los campos se agregaron correctamente
SELECT 'Campos de configuración agregados:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'productos' 
AND column_name LIKE 'aplicar%'
ORDER BY column_name;

-- Mostrar algunos productos para verificar la estructura
SELECT 'Estructura de productos:' as info;
SELECT 
    id,
    descripcion,
    fk_id_categoria,
    aplicar_todos_planes,
    aplicar_planes_categoria,
    aplicar_planes_especiales
FROM productos 
LIMIT 3;

-- Comentarios sobre los nuevos campos
COMMENT ON COLUMN productos.aplicar_todos_planes IS 'Si el producto aplica a todos los planes sin categoría';
COMMENT ON COLUMN productos.aplicar_planes_categoria IS 'Si el producto aplica a planes de su categoría';
COMMENT ON COLUMN productos.aplicar_planes_especiales IS 'Si el producto aplica a planes especiales (productos_planes)';

-- Configurar algunos productos de ejemplo
-- Ejemplo 1: Producto que aplica a todos los planes sin categoría
UPDATE productos 
SET aplicar_todos_planes = true
WHERE id = 1;

-- Ejemplo 2: Producto que aplica a planes de su categoría
UPDATE productos 
SET aplicar_planes_categoria = true
WHERE id = 2;

-- Ejemplo 3: Producto que aplica a planes especiales
UPDATE productos 
SET aplicar_planes_especiales = true
WHERE id = 3;

-- Verificar la configuración
SELECT 'Configuración de productos:' as info;
SELECT 
    id,
    descripcion,
    aplicar_todos_planes,
    aplicar_planes_categoria,
    aplicar_planes_especiales
FROM productos 
WHERE aplicar_todos_planes = true OR aplicar_planes_categoria = true OR aplicar_planes_especiales = true
ORDER BY id;
