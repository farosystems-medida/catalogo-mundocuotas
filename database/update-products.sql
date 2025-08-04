-- Agregar las nuevas columnas a la tabla productos
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS fk_id_categoria INTEGER REFERENCES categorias(id),
ADD COLUMN IF NOT EXISTS fk_id_marca INTEGER REFERENCES marcas(id);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(fk_id_categoria);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(fk_id_marca);

-- Actualizar productos existentes para usar las nuevas claves foráneas
-- Primero, actualizar productos que tengan categoría 'lavarropas'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categorias WHERE nombre = 'Lavarropas')
WHERE categoria = 'lavarropas';

-- Actualizar productos que tengan marca 'whirpool'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'Whirpool')
WHERE marca = 'whirpool'; 