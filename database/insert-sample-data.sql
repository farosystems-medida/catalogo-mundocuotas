-- Script para insertar datos de ejemplo en las tablas categoria y marcas
-- Ejecuta este script en el SQL Editor de Supabase

-- Insertar categorías de ejemplo
INSERT INTO categoria (descripcion) VALUES
('Lavarropas'),
('Heladeras'),
('Cocinas'),
('Microondas'),
('Aire Acondicionado'),
('Televisores'),
('Computadoras'),
('Celulares')
ON CONFLICT (id) DO NOTHING;

-- Insertar marcas de ejemplo
INSERT INTO marcas (descripcion) VALUES
('Whirlpool'),
('Samsung'),
('LG'),
('Philips'),
('Panasonic'),
('Sony'),
('Apple'),
('Dell'),
('HP'),
('Motorola')
ON CONFLICT (id) DO NOTHING;

-- Verificar que se insertaron los datos
SELECT 'Categorías insertadas:' as info;
SELECT id, descripcion FROM categoria ORDER BY id;

SELECT 'Marcas insertadas:' as info;
SELECT id, descripcion FROM marcas ORDER BY id; 