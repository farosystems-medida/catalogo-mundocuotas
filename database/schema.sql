-- Crear tabla de productos
CREATE TABLE productos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    descripcion_detallada TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    imagen VARCHAR(500),
    categoria VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    destacado BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_productos_marca ON productos(marca);
CREATE INDEX idx_productos_destacado ON productos(destacado);
CREATE INDEX idx_productos_precio ON productos(precio);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_productos_updated_at 
    BEFORE UPDATE ON productos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo
INSERT INTO productos (descripcion, descripcion_detallada, precio, stock, imagen, categoria, marca, destacado) VALUES
('Heladera Samsung No Frost 364L', 'Heladera con tecnología No Frost, control de temperatura digital y diseño moderno. Perfecta para familias medianas con amplio espacio de almacenamiento.', 450000, 10, '/placeholder.svg?height=400&width=400', 'Heladeras', 'Samsung', true),
('Lavarropas LG Automático 8kg', 'Lavarropas automático con carga frontal, múltiples programas de lavado y tecnología de ahorro de agua y energía.', 320000, 15, '/placeholder.svg?height=400&width=400', 'Lavarropas', 'LG', true),
('Microondas Whirlpool 25L', 'Microondas con grill, múltiples funciones de cocción y panel de control digital. Ideal para cocinar y calentar alimentos rápidamente.', 85000, 20, '/placeholder.svg?height=400&width=400', 'Microondas', 'Whirlpool', false),
('Aire Acondicionado Split 3000 Frigorías', 'Aire acondicionado split frío/calor con tecnología inverter, control remoto y función sleep para mayor eficiencia energética.', 280000, 8, '/placeholder.svg?height=400&width=400', 'Aires Acondicionados', 'LG', true),
('Cocina Escorial 4 Hornallas', 'Cocina a gas con 4 hornallas, horno con grill y encendido automático. Diseño elegante y funcional para tu cocina.', 180000, 12, '/placeholder.svg?height=400&width=400', 'Cocinas', 'Escorial', false),
('Lavavajillas Bosch 12 Cubiertos', 'Lavavajillas con capacidad para 12 cubiertos, múltiples programas de lavado y tecnología de secado eficiente.', 420000, 5, '/placeholder.svg?height=400&width=400', 'Lavavajillas', 'Bosch', false),
('Smart TV Samsung 55 4K', 'Smart TV con pantalla 4K UHD, sistema operativo Tizen, HDR y múltiples aplicaciones de streaming integradas.', 380000, 7, '/placeholder.svg?height=400&width=400', 'Televisores', 'Samsung', true),
('Horno Eléctrico Philips 60L', 'Horno eléctrico con múltiples funciones de cocción, timer digital y puerta de vidrio templado para mayor seguridad.', 150000, 18, '/placeholder.svg?height=400&width=400', 'Hornos', 'Philips', false),
('Lavarropas Electrolux 9kg', 'Lavarropas de carga superior con tecnología de lavado eficiente, múltiples programas y bajo consumo energético.', 290000, 9, '/placeholder.svg?height=400&width=400', 'Lavarropas', 'Electrolux', false),
('Heladera LG Side by Side 600L', 'Heladera side by side con dispensador de agua y hielo, tecnología inverter y amplio espacio de almacenamiento.', 650000, 3, '/placeholder.svg?height=400&width=400', 'Heladeras', 'LG', true),
('Microondas Samsung 28L Digital', 'Microondas con panel digital, función descongelado automático y múltiples programas preestablecidos.', 95000, 25, '/placeholder.svg?height=400&width=400', 'Microondas', 'Samsung', false),
('Smart TV LG 65 OLED', 'Smart TV OLED con tecnología de última generación, colores vibrantes y sistema webOS con inteligencia artificial.', 850000, 4, '/placeholder.svg?height=400&width=400', 'Televisores', 'LG', true); 