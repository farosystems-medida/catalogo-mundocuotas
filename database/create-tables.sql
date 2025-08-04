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