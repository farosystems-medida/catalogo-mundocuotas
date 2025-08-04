-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de marcas
CREATE TABLE IF NOT EXISTS marcas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    logo_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modificar tabla de productos para usar claves foráneas
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS fk_id_categoria INTEGER REFERENCES categorias(id),
ADD COLUMN IF NOT EXISTS fk_id_marca INTEGER REFERENCES marcas(id);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(fk_id_categoria);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(fk_id_marca);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marcas_updated_at BEFORE UPDATE ON marcas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo para categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('Lavarropas', 'Lavarropas automáticos y semiautomáticos'),
('Heladeras', 'Heladeras y freezers'),
('Cocinas', 'Cocinas y hornos'),
('Microondas', 'Microondas y hornos eléctricos'),
('Aire Acondicionado', 'Aires acondicionados split y portátiles')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar datos de ejemplo para marcas
INSERT INTO marcas (nombre, descripcion) VALUES
('Whirpool', 'Electrodomésticos de alta calidad'),
('Samsung', 'Tecnología innovadora para el hogar'),
('LG', 'Soluciones inteligentes para tu casa'),
('Philips', 'Calidad y confianza'),
('Panasonic', 'Tecnología japonesa de vanguardia')
ON CONFLICT (nombre) DO NOTHING;

-- Actualizar productos existentes para usar las nuevas claves foráneas
-- Primero, actualizar productos que tengan categoría 'lavarropas'
UPDATE productos 
SET fk_id_categoria = (SELECT id FROM categorias WHERE nombre = 'Lavarropas')
WHERE categoria = 'lavarropas';

-- Actualizar productos que tengan marca 'whirpool'
UPDATE productos 
SET fk_id_marca = (SELECT id FROM marcas WHERE nombre = 'Whirpool')
WHERE marca = 'whirpool';

-- Eliminar las columnas antiguas (opcional - comentar si quieres mantener compatibilidad)
-- ALTER TABLE productos DROP COLUMN IF EXISTS categoria;
-- ALTER TABLE productos DROP COLUMN IF EXISTS marca; 