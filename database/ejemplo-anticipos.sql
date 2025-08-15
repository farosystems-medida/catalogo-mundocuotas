-- Script de ejemplo para agregar anticipos a planes de financiación
-- Ejecuta este script en el SQL Editor de Supabase después de agregar los campos

-- Ejemplo 1: Plan 3 cuotas - Anticipo del 20%
UPDATE planes_financiacion 
SET anticipo_minimo = 20.00 
WHERE id = 1 AND cuotas = 3;

-- Ejemplo 2: Plan 6 cuotas - Anticipo fijo de $30,000
UPDATE planes_financiacion 
SET anticipo_minimo_fijo = 30000.00 
WHERE id = 2 AND cuotas = 6;

-- Ejemplo 3: Plan 12 cuotas - Anticipo del 15%
UPDATE planes_financiacion 
SET anticipo_minimo = 15.00 
WHERE id = 3 AND cuotas = 12;

-- Ejemplo 4: Plan 18 cuotas - Anticipo fijo de $25,000
UPDATE planes_financiacion 
SET anticipo_minimo_fijo = 25000.00 
WHERE id = 4 AND cuotas = 18;

-- Ejemplo 5: Plan 24 cuotas - Anticipo del 10%
UPDATE planes_financiacion 
SET anticipo_minimo = 10.00 
WHERE id = 5 AND cuotas = 24;

-- Verificar los cambios
SELECT 'PLANES CON ANTICIPOS CONFIGURADOS:' as info;
SELECT 
    id,
    nombre,
    cuotas,
    recargo_porcentual,
    anticipo_minimo,
    anticipo_minimo_fijo,
    CASE 
        WHEN anticipo_minimo IS NOT NULL THEN 'Porcentaje: ' || anticipo_minimo || '%'
        WHEN anticipo_minimo_fijo IS NOT NULL THEN 'Fijo: $' || anticipo_minimo_fijo
        ELSE 'Sin anticipo'
    END as tipo_anticipo,
    activo
FROM planes_financiacion 
WHERE anticipo_minimo IS NOT NULL OR anticipo_minimo_fijo IS NOT NULL
ORDER BY cuotas;
