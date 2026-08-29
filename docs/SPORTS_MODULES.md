# Módulos deportivos

## Editar un deporte existente

1. Cambiar nombre, color, imagen, protagonistas o textos de portada en `app/config/sports.js`.
2. Cambiar la estructura exclusiva del deporte en su archivo dentro de `app/views/`.
3. Cambiar noticias, resultados, clasificaciones o equipos en el archivo de datos de ese deporte: `app/data/football.js`, `app/data/formula1.js` o `app/data/nba.js`. `app/data/index.js` solo reexporta y no debe contener datos deportivos propios.
4. Ajustar únicamente sus estilos específicos en `app/styles/globals.css`.

## Agregar un deporte

1. Crear una entrada en `SPORTS` dentro de `app/config/sports.js`.
2. Crear una vista independiente, por ejemplo `app/views/tenis.ts`.
3. Importar esa vista y colocarla en `app/page.tsx`.
4. Añadir sus datos demostrativos con fuentes verificables.
5. Crear un renderizador `renderTenis()` y registrarlo en `SPORT_RENDERERS` dentro de `app/client/site.js`.
6. Añadir sus colores y componentes visuales específicos al final del bloque deportivo de estilos.

El registro genera automáticamente la navegación de escritorio y celular, los filtros de noticias de portada, las tarjetas de acceso, el contador de deportes, los protagonistas y los colores del panel editorial.

## Retirar temporalmente un deporte

1. Quitar su entrada del registro `SPORTS`.
2. Quitar la importación y la vista correspondiente de `app/page.tsx`.
3. Quitar su renderizador de `SPORT_RENDERERS`.

Los datos pueden conservarse mientras la sección esté oculta, evitando tener que reconstruirlos si vuelve a activarse.

## Regla de mantenimiento

La configuración compartida debe vivir en `app/config/sports.js`. La vista de un deporte no debe contener datos deportivos y el catálogo de datos no debe contener estilos ni estructura visual.

Cada archivo de datos (`football.js`, `formula1.js`, `nba.js`) conserva sus propios artículos (`FOOTBALL_ARTICLES`, `F1_ARTICLES`, `NBA_ARTICLES`); `app/data/index.js` los combina en `ARTICLES` respetando el orden histórico de publicación.

Las actualizaciones de noticias, resultados, clasificaciones o equipos deben seguir el procedimiento de actualización bajo demanda definido en `docs/ARCHITECTURE.md`.
