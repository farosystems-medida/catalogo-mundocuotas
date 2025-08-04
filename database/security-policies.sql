-- Políticas de seguridad recomendadas para la tabla productos

-- 1. Habilitar RLS en la tabla productos
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- 2. Política para permitir solo lectura a todos los usuarios
CREATE POLICY "Enable read access for all users" ON productos
    FOR SELECT
    TO authenticated, anon
    USING (true);

-- 3. Política para permitir inserción solo a usuarios autenticados (opcional)
-- CREATE POLICY "Enable insert for authenticated users only" ON productos
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (true);

-- 4. Política para permitir actualización solo a usuarios autenticados (opcional)
-- CREATE POLICY "Enable update for authenticated users only" ON productos
--     FOR UPDATE
--     TO authenticated
--     USING (true)
--     WITH CHECK (true);

-- 5. Política para permitir eliminación solo a usuarios autenticados (opcional)
-- CREATE POLICY "Enable delete for authenticated users only" ON productos
--     FOR DELETE
--     TO authenticated
--     USING (true);

-- 6. Política más restrictiva (solo lectura de productos activos)
-- CREATE POLICY "Enable read access for active products only" ON productos
--     FOR SELECT
--     TO authenticated, anon
--     USING (stock > 0); -- Solo productos con stock disponible

-- 7. Política para productos destacados (ejemplo)
-- CREATE POLICY "Enable read access for featured products" ON productos
--     FOR SELECT
--     TO authenticated, anon
--     USING (destacado = true); 