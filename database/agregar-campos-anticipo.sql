-- Script para agregar campos de anticipo a la tabla planes_financiacion
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Verificar la estructura actual de la tabla
SELECT 'ESTRUCTURA ACTUAL DE PLANES_FINANCIACION:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'planes_financiacion'
ORDER BY ordinal_position;

-- 2. Agregar campo anticipo_minimo (porcentaje)
ALTER TABLE planes_financiacion 
ADD COLUMN IF NOT EXISTS anticipo_minimo DECIMAL(5,2) DEFAULT NULL;

-- 3. Agregar campo anticipo_minimo_fijo (monto fijo)
ALTER TABLE planes_financiacion 
ADD COLUMN IF NOT EXISTS anticipo_minimo_fijo DECIMAL(10,2) DEFAULT NULL;

-- 4. Verificar que se agregaron correctamente
SELECT 'ESTRUCTURA DESPUÉS DE AGREGAR CAMPOS:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'planes_financiacion'
ORDER BY ordinal_position;

-- 5. Ejemplo de cómo actualizar algunos planes con anticipos
-- (Descomenta y modifica según tus necesidades)

-- Ejemplo 1: Plan con anticipo del 20%
-- UPDATE planes_financiacion 
-- SET anticipo_minimo = 20.00 
-- WHERE id = 1;

-- Ejemplo 2: Plan con anticipo fijo de $50,000
-- UPDATE planes_financiacion 
-- SET anticipo_minimo_fijo = 50000.00 
-- WHERE id = 2;

-- Ejemplo 3: Plan con anticipo del 15%
-- UPDATE planes_financiacion 
-- SET anticipo_minimo = 15.00 
-- WHERE id = 3;

-- 6. Verificar datos actuales
SELECT 'DATOS ACTUALES DE PLANES_FINANCIACION:' as info;
SELECT 
    id,
    nombre,
    cuotas,
    recargo_porcentual,
    anticipo_minimo,
    anticipo_minimo_fijo,
    activo
FROM planes_financiacion 
ORDER BY cuotas;
