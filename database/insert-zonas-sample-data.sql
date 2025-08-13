-- Insertar datos de ejemplo en la tabla zonas
INSERT INTO public.zonas (nombre) VALUES
('Zona Norte'),
('Zona Sur'),
('Zona Este'),
('Zona Oeste'),
('Zona Centro');

-- Insertar configuración de teléfonos para cada zona
-- Nota: Reemplaza estos números con los números reales de WhatsApp de cada zona
INSERT INTO public.configuracion_zonas (fk_id_zona, telefono) VALUES
(1, '5491123365608'), -- Zona Norte
(2, '5491123365609'), -- Zona Sur
(3, '5491123365610'), -- Zona Este
(4, '5491123365611'), -- Zona Oeste
(5, '5491123365612'); -- Zona Centro
