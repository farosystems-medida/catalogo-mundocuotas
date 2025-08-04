-- Agregar las columnas de claves foráneas a la tabla productos
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS fk_id_categoria BIGINT REFERENCES categoria(id),
ADD COLUMN IF NOT EXISTS fk_id_marca BIGINT REFERENCES marcas(id);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_fk_categoria ON productos(fk_id_categoria);
CREATE INDEX IF NOT EXISTS idx_productos_fk_marca ON productos(fk_id_marca);

-- Actualizar productos existentes para vincular con categorías
-- Primero, actualizar productos que tengan categoría 'lavarropas'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categoria WHERE nombre = 'Lavarropas')
WHERE categoria = 'lavarropas' AND fk_id_categoria IS NULL;

-- Actualizar productos que tengan categoría 'heladeras'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categoria WHERE nombre = 'Heladeras')
WHERE categoria = 'heladeras' AND fk_id_categoria IS NULL;

-- Actualizar productos que tengan categoría 'cocinas'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categoria WHERE nombre = 'Cocinas')
WHERE categoria = 'cocinas' AND fk_id_categoria IS NULL;

-- Actualizar productos que tengan categoría 'microondas'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categoria WHERE nombre = 'Microondas')
WHERE categoria = 'microondas' AND fk_id_categoria IS NULL;

-- Actualizar productos que tengan categoría 'aire acondicionado'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categoria WHERE nombre = 'Aire Acondicionado')
WHERE categoria = 'aire acondicionado' AND fk_id_categoria IS NULL;

-- Actualizar productos existentes para vincular con marcas
-- Primero, actualizar productos que tengan marca 'whirpool'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'Whirpool')
WHERE marca = 'whirpool' AND fk_id_marca IS NULL;

-- Actualizar productos que tengan marca 'samsung'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'Samsung')
WHERE marca = 'samsung' AND fk_id_marca IS NULL;

-- Actualizar productos que tengan marca 'lg'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'LG')
WHERE marca = 'lg' AND fk_id_marca IS NULL;

-- Actualizar productos que tengan marca 'philips'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'Philips')
WHERE marca = 'philips' AND fk_id_marca IS NULL;

-- Actualizar productos que tengan marca 'panasonic'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'Panasonic')
WHERE marca = 'panasonic' AND fk_id_marca IS NULL;

-- Mostrar estadísticas de la actualización
SELECT 
  'Productos con categoría asignada' as descripcion,
  COUNT(*) as cantidad
FROM productos 
WHERE fk_id_categoria IS NOT NULL
UNION ALL
SELECT 
  'Productos con marca asignada' as descripcion,
  COUNT(*) as cantidad
FROM productos 
WHERE fk_id_marca IS NOT NULL
UNION ALL
SELECT 
  'Total de productos' as descripcion,
  COUNT(*) as cantidad
FROM productos; 