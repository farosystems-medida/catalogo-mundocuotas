# Galería de Imágenes de Productos

## Descripción

Sistema de galería de imágenes que permite mostrar hasta 5 imágenes por producto en la página de detalle del producto.

## Nuevos Campos Agregados

### Tabla: `productos`
- `imagen_2` - Segunda imagen del producto
- `imagen_3` - Tercera imagen del producto  
- `imagen_4` - Cuarta imagen del producto
- `imagen_5` - Quinta imagen del producto

## Implementación

### 1. Agregar los campos a la base de datos
```sql
-- Ejecutar: database/add-image-fields.sql
```

### 2. Insertar datos de ejemplo
```sql
-- Ejecutar: database/insert-sample-images.sql
```

### 3. Componentes Creados

#### `ProductImageGallery.tsx`
- **Funcionalidades:**
  - Muestra todas las imágenes disponibles del producto
  - Navegación con flechas izquierda/derecha
  - Thumbnails para selección directa
  - Indicador de imagen actual (ej: "2 / 5")
  - Badge de "Destacado" si aplica
  - Fallback a imagen placeholder si no hay imágenes

- **Características:**
  - Responsive design
  - Animaciones suaves
  - Accesibilidad (aria-labels)
  - Filtrado automático de imágenes vacías

## Funcionalidades

### Navegación
- **Flechas**: Botones izquierda/derecha para navegar
- **Thumbnails**: Click directo en miniaturas
- **Indicador**: Muestra posición actual (ej: "3 / 5")

### Comportamiento Inteligente
- **Una imagen**: No muestra navegación
- **Múltiples imágenes**: Activa toda la funcionalidad
- **Sin imágenes**: Muestra placeholder
- **Imágenes vacías**: Se filtran automáticamente

### Diseño
- **Aspect ratio**: Cuadrado (aspect-square)
- **Hover effects**: Escala suave al pasar el mouse
- **Transiciones**: Animaciones fluidas
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## Uso

### En la Página de Producto
```tsx
// Recopilar todas las imágenes
const productImages = [
  product.imagen || product.image || "",
  product.imagen_2 || "",
  product.imagen_3 || "",
  product.imagen_4 || "",
  product.imagen_5 || ""
].filter(img => img && img.trim() !== '')

// Usar el componente
<ProductImageGallery 
  images={productImages}
  productName={productName}
  isFeatured={isFeatured}
/>
```

### Props del Componente
```tsx
interface ProductImageGalleryProps {
  images: string[]        // Array de URLs de imágenes
  productName: string     // Nombre del producto para alt text
  isFeatured?: boolean    // Si mostrar badge de destacado
}
```

## Estructura de Datos

### Ejemplo de Producto con Múltiples Imágenes
```sql
UPDATE productos 
SET 
    imagen = '/producto-principal.jpg',
    imagen_2 = '/producto-detalle-1.jpg',
    imagen_3 = '/producto-detalle-2.jpg',
    imagen_4 = '/producto-interior.jpg',
    imagen_5 = '/producto-especificaciones.jpg'
WHERE id = 1;
```

### Campos Opcionales
- Todos los campos `imagen_2` a `imagen_5` son opcionales
- Si están vacíos o NULL, no se muestran
- El sistema filtra automáticamente las imágenes vacías

## Ventajas del Sistema

1. **Flexibilidad**: Hasta 5 imágenes por producto
2. **Compatibilidad**: Funciona con productos que solo tienen imagen principal
3. **UX Mejorada**: Navegación intuitiva entre imágenes
4. **Responsive**: Se adapta a todos los dispositivos
5. **Accesibilidad**: Incluye aria-labels y navegación por teclado
6. **Performance**: Carga optimizada de imágenes

## Personalización

### Cambiar Colores
```css
/* Thumbnail activo */
.border-violet-500 → .border-blue-500

/* Botones de navegación */
.bg-white/90 → .bg-black/80
```

### Cambiar Tamaños
```tsx
// Thumbnails
className="w-20 h-20" → className="w-16 h-16"

// Imagen principal
className="aspect-square" → className="aspect-video"
```

### Agregar Más Imágenes
1. Agregar campos `imagen_6`, `imagen_7`, etc. a la tabla
2. Actualizar la interfaz `Product`
3. Modificar el array `productImages` en la página

## Mantenimiento

### Agregar Imágenes a Productos
```sql
UPDATE productos 
SET imagen_2 = 'nueva-imagen.jpg'
WHERE id = 123;
```

### Verificar Productos con Imágenes Adicionales
```sql
SELECT id, descripcion, imagen, imagen_2, imagen_3, imagen_4, imagen_5
FROM productos 
WHERE imagen_2 IS NOT NULL OR imagen_3 IS NOT NULL 
   OR imagen_4 IS NOT NULL OR imagen_5 IS NOT NULL;
```

### Estadísticas
```sql
SELECT 
    COUNT(*) as total_productos,
    COUNT(imagen_2) as con_imagen_2,
    COUNT(imagen_3) as con_imagen_3,
    COUNT(imagen_4) as con_imagen_4,
    COUNT(imagen_5) as con_imagen_5
FROM productos;
```
