# Solución al Error de Tabla productos_planes_default

## Problema
El error indica que la tabla `productos_planes_default` no existe o no se puede acceder a ella.

## Solución Paso a Paso

### 1. Verificar el estado actual de las tablas
Ejecuta este script en Supabase SQL Editor:
```sql
-- Ejecutar: database/check-tables.sql
```

### 2. Crear la tabla básica
Si la tabla no existe, ejecuta:
```sql
-- Ejecutar: database/create-simple-productos-planes-default.sql
```

### 3. Insertar datos de ejemplo
```sql
-- Ejecutar: database/insert-basic-sample-data.sql
```

### 4. Verificar que todo funciona
El sistema ahora debería funcionar sin errores. Los logs en la consola mostrarán:
- ✅ Si encuentra planes específicos
- ✅ Si encuentra planes por defecto  
- ✅ Si usa todos los planes activos como fallback

## Funcionamiento del Sistema

### Con la tabla creada:
1. **Planes Específicos** (prioridad alta)
2. **Planes por Defecto** (prioridad media)
3. **Todos los Planes Activos** (fallback)

### Sin la tabla (fallback automático):
1. **Planes Específicos** (si existen)
2. **Todos los Planes Activos** (fallback)

## Verificación

### En la consola del navegador deberías ver:
```
🔍 getPlanesProducto: Buscando planes para producto ID: [ID]
⚠️ getPlanesProducto: Error al buscar planes específicos (tabla puede no existir): [error]
🔍 getPlanesProducto: Buscando planes por defecto...
⚠️ getPlanesProducto: Error al buscar planes por defecto (tabla puede no existir): [error]
🔍 getPlanesProducto: Usando todos los planes activos como fallback...
✅ getPlanesProducto: Usando todos los planes activos: [cantidad] planes
```

### En la UI:
- Los planes de financiación se mostrarán normalmente
- Si habilitas debug: `showDebug={true}`, verás el tipo de planes que se está usando

## Comandos SQL para Ejecutar

### Opción 1: Crear tabla completa con triggers
```sql
-- Ejecutar: database/create-productos-planes-default.sql
-- Luego: database/populate-productos-planes-default.sql
```

### Opción 2: Crear tabla básica (recomendado para empezar)
```sql
-- Ejecutar: database/create-simple-productos-planes-default.sql
-- Luego: database/insert-basic-sample-data.sql
```

## Notas Importantes

1. **El sistema funciona sin la tabla**: Si no creas la tabla, el sistema usará todos los planes activos como fallback
2. **Errores controlados**: Los errores ahora se manejan de forma elegante y no rompen la aplicación
3. **Logs informativos**: La consola te dirá exactamente qué está pasando
4. **Funcionalidad completa**: Los planes de financiación se mostrarán correctamente en todos los casos

## Próximos Pasos

Una vez que el error esté solucionado:

1. **Verificar que los planes se muestran** en las tarjetas de productos
2. **Probar en la página de producto** individual
3. **Habilitar debug** para ver qué tipo de planes se está usando
4. **Configurar productos especiales** si es necesario

## Soporte

Si sigues teniendo problemas:
1. Revisa los logs en la consola del navegador
2. Verifica que las tablas `productos` y `planes_financiacion` existen
3. Asegúrate de que hay planes de financiación activos en la base de datos
