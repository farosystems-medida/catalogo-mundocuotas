-- Agregar columna nombre a la tabla marcas si no existe
ALTER TABLE marcas 
ADD COLUMN IF NOT EXISTS nombre VARCHAR(100);

-- Agregar columna nombre a la tabla categoria si no existe
ALTER TABLE categoria 
ADD COLUMN IF NOT EXISTS nombre VARCHAR(100);

-- Agregar columna updated_at a ambas tablas si no existe
ALTER TABLE marcas 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE categoria 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Agregar columna logo_url a marcas si no existe
ALTER TABLE marcas 
ADD COLUMN IF NOT EXISTS logo_url VARCHAR(255);

-- Insertar datos de ejemplo para categorías (si la tabla existe)
INSERT INTO categoria (nombre, descripcion) VALUES
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