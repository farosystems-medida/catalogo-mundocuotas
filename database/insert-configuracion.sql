-- Insertar configuración inicial
INSERT INTO public.configuracion (telefono) 
VALUES ('5491123365608')
ON CONFLICT (id) DO UPDATE SET 
  telefono = EXCLUDED.telefono,
  created_at = now();

-- Verificar que se insertó correctamente
SELECT * FROM public.configuracion;
