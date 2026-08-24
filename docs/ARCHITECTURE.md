# Arquitectura del prototipo

## Estado actual

La interfaz funcional se ejecuta como una aplicación estática organizada por responsabilidades:

- `app/config/sports.js`: registro central de deportes, nombres, colores, imágenes y contenido de portada.
- `app/views/`: una vista independiente por deporte y otra para la portada.
- `app/data/index.js`: catálogo único de datos demostrativos y sus fuentes.
- `app/client/site.js`: renderizadores, navegación e interacciones del navegador.
- `app/styles/globals.css`: sistema visual compartido y variantes por deporte.

La navegación, los filtros de portada, los protagonistas rotativos y los colores editoriales toman su información del registro central. Agregar o retirar un deporte ya no exige repetir esa configuración en varios lugares.

Los filtros, las vistas y el panel editorial son interactivos, pero las mutaciones del panel duran únicamente durante la sesión de demostración.

Los datos públicos del prototipo se limitan a registros revisados en las fuentes oficiales indicadas. Cuando no hay información verificada o una API autorizada, la interfaz muestra un estado vacío en lugar de completar datos ficticios.

Para tablas, calendarios y resultados se priorizan organismos y competiciones oficiales. ABC Deportes se utiliza como fuente periodística complementaria para noticias y contexto, conservando siempre el enlace original, un resumen propio y la revisión editorial previa a la publicación.

## Evolución prevista

- Persistencia: Cloudflare D1 mediante el binding lógico `DB` definido en `.openai/hosting.json`.
- Modelo: deportes, competiciones, fuentes, noticias, equipos, personas, eventos, clasificaciones, controles editoriales y registro de cambios. La propuesta está en `db/schema.ts`.
- Duplicados: huella única por URL normalizada, fuente y contenido mediante `source_fingerprint`.
- Integraciones: un adaptador independiente por proveedor autorizado. El adaptador normaliza identificadores externos antes de guardar.
- Automatización: las sincronizaciones crean o actualizan registros en `Pendiente de revisión`; nunca publican directamente.
- Internacionalización: cada noticia y competición lleva `locale`; la interfaz deberá cargar catálogos de texto separados.
- Derechos: los medios y licencias se registran en `sources.license_notes` y `articles.rights_status`.
- SEO: metadatos por publicación, URL canónica y datos estructurados solo después de publicar.

## Flujo editorial

1. Ingesta desde una fuente autorizada.
2. Normalización y control de duplicados.
3. Creación en estado `Pendiente de revisión`.
4. Verificación de vigencia, fuente, enlace, resumen, duplicados y permisos.
5. Publicación manual.
6. Registro inmutable del cambio.
7. Revisión automática de enlaces y vigencia; si falla, pasa a `Requiere actualización`.

## Límites del prototipo

No incluye autenticación, conectores de resultados ni persistencia real porque todavía no se seleccionaron proveedores ni credenciales. Esas decisiones deben tomarse antes de exponer el panel administrativo en producción.

## Modificar deportes

La guía operativa para agregar, editar o retirar una sección está en `docs/SPORTS_MODULES.md`.
