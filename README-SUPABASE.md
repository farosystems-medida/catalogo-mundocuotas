# Configuración de Supabase para el Catálogo de Productos

## 1. Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

## 2. Configurar las variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

Puedes encontrar estas credenciales en:
- Dashboard de Supabase → Settings → API
- Copia la "Project URL" y "anon public" key

## 3. Crear la tabla de productos

En el dashboard de Supabase, ve a:
1. **SQL Editor**
2. **New Query**
3. Copia y pega el contenido del archivo `database/schema.sql`
4. Ejecuta el script

Este script creará:
- Tabla `productos` con todos los campos necesarios
- Índices para optimizar las consultas
- Trigger para actualizar automáticamente `updated_at`
- Datos de ejemplo

## 4. Estructura de la tabla

La tabla `productos` tiene los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único (generado automáticamente) |
| `descripcion` | VARCHAR(255) | Nombre del producto |
| `descripcion_detallada` | TEXT | Descripción completa del producto |
| `precio` | DECIMAL(10,2) | Precio del producto |
| `stock` | INTEGER | Cantidad disponible |
| `imagen` | VARCHAR(500) | URL de la imagen del producto |
| `categoria` | VARCHAR(100) | Categoría del producto |
| `marca` | VARCHAR(100) | Marca del producto |
| `destacado` | BOOLEAN | Si el producto es destacado |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

## 5. Configurar políticas de seguridad (RLS)

Para permitir solo lectura de datos:

1. Ve a **Authentication → Policies**
2. En la tabla `productos`, crea una nueva política:
   - **Policy Name**: `Enable read access for all users`
   - **Target roles**: `authenticated` y `anon`
   - **Using expression**: `true`
   - **Operation**: `SELECT`

## 6. Funcionalidades implementadas

### Productos destacados
- Los productos con `destacado = true` aparecen en la sección de destacados
- Se muestran con una etiqueta "Destacado"

### Filtros
- **Por categoría**: Filtra productos por categoría
- **Por marca**: Filtra productos por marca
- **Por precio**: Rango de precios mínimo y máximo
- **Búsqueda**: Búsqueda por nombre y descripción

### Paginación
- 6 productos por página
- Navegación entre páginas

### Información del producto
- Nombre y descripción
- Precio
- Stock disponible
- Categoría y marca
- Imagen del producto

## 7. Agregar productos

Para agregar nuevos productos, puedes:

1. **Usar el SQL Editor**:
```sql
INSERT INTO productos (descripcion, descripcion_detallada, precio, stock, imagen, categoria, marca, destacado) 
VALUES ('Nuevo Producto', 'Descripción del nuevo producto', 150000, 10, '/imagen.jpg', 'Categoría', 'Marca', false);
```

2. **Usar el Dashboard**:
   - Ve a **Table Editor**
   - Selecciona la tabla `productos`
   - Haz clic en **Insert row**

## 8. Notas importantes

- La aplicación solo lee datos, no los modifica
- Los productos destacados se muestran primero en las listas
- Las imágenes deben ser URLs válidas
- El stock se muestra como "disponible" o "sin stock"
- Los filtros funcionan en tiempo real

## 9. Solución de problemas

### Error de conexión
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el proyecto de Supabase esté activo

### No se muestran productos
- Verifica que la tabla tenga datos
- Revisa las políticas de seguridad (RLS)
- Comprueba la consola del navegador para errores

### Filtros no funcionan
- Verifica que las categorías y marcas estén escritas exactamente igual
- Asegúrate de que los productos tengan los campos completos 