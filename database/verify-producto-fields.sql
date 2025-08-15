-- Script para verificar si los campos de configuración existen en la tabla productos
-- Ejecuta este script en el SQL Editor de Supabase

-- Verificar si los campos existen
SELECT 'Verificando campos de configuración:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'productos' 
AND column_name IN ('aplicar_todos_planes', 'aplicar_planes_categoria', 'aplicar_planes_especiales')
ORDER BY column_name;

-- Verificar si hay productos en la tabla
SELECT 'Productos existentes:' as info;
SELECT COUNT(*) as total_productos FROM productos;

-- Mostrar algunos productos con sus configuraciones
SELECT 'Configuración de productos:' as info;
SELECT 
    id,
    descripcion,
    fk_id_categoria,
    COALESCE(aplicar_todos_planes, false) as aplicar_todos_planes,
    COALESCE(aplicar_planes_categoria, false) as aplicar_planes_categoria,
    COALESCE(aplicar_planes_especiales, false) as aplicar_planes_especiales
FROM productos 
LIMIT 5;

-- Si los campos no existen, agregarlos
DO $$
BEGIN
    -- Verificar si aplicar_todos_planes existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'productos' 
        AND column_name = 'aplicar_todos_planes'
    ) THEN
        ALTER TABLE productos ADD COLUMN aplicar_todos_planes BOOLEAN DEFAULT false;
        RAISE NOTICE 'Campo aplicar_todos_planes agregado';
    END IF;

    -- Verificar si aplicar_planes_categoria existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'productos' 
        AND column_name = 'aplicar_planes_categoria'
    ) THEN
        ALTER TABLE productos ADD COLUMN aplicar_planes_categoria BOOLEAN DEFAULT false;
        RAISE NOTICE 'Campo aplicar_planes_categoria agregado';
    END IF;

    -- Verificar si aplicar_planes_especiales existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'productos' 
        AND column_name = 'aplicar_planes_especiales'
    ) THEN
        ALTER TABLE productos ADD COLUMN aplicar_planes_especiales BOOLEAN DEFAULT false;
        RAISE NOTICE 'Campo aplicar_planes_especiales agregado';
    END IF;
END $$;

-- Verificar nuevamente después de agregar los campos
SELECT 'Verificación final:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'productos' 
AND column_name IN ('aplicar_todos_planes', 'aplicar_planes_categoria', 'aplicar_planes_especiales')
ORDER BY column_name;
