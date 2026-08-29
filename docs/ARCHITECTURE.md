# Arquitectura del prototipo

## Estado actual

La interfaz funcional se ejecuta como una aplicación estática organizada por responsabilidades:

- `app/config/sports.js`: registro central de deportes, nombres, colores, imágenes y contenido de portada.
- `app/views/`: una vista independiente por deporte y otra para la portada.
- `app/data/`: catálogo de datos demostrativos y sus fuentes, separado por deporte:
  - `app/data/football.js`: competiciones, resultados, próximos partidos, tablas y artículos de Fútbol.
  - `app/data/formula1.js`: calendario, pilotos, constructores, resultado de carrera, perfiles de equipo y artículos de Fórmula 1.
  - `app/data/nba.js`: próximos partidos, resultados, posiciones, equipos y artículos de NBA.
  - `app/data/index.js`: punto único de exportación. Reexporta los tres archivos anteriores, reconstruye `ARTICLES` (todos los deportes combinados, en el mismo orden histórico) y conserva `EDITORIAL_STATUSES` y `LEGAL_COPY`.
- `app/client/site.js`: renderizadores, navegación e interacciones del navegador. Sigue importando todo desde `app/data/index.js`.
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
- Actualización bajo demanda: las sincronizaciones comienzan únicamente por orden del propietario, crean o actualizan registros en `Pendiente de revisión` y nunca publican directamente.
- Internacionalización: cada noticia y competición lleva `locale`; la interfaz deberá cargar catálogos de texto separados.
- Derechos: los medios y licencias se registran en `sources.license_notes` y `articles.rights_status`.
- SEO: metadatos por publicación, URL canónica y datos estructurados solo después de publicar.

## Flujo editorial

1. Ingesta iniciada por orden del propietario desde una fuente autorizada.
2. Normalización y control de duplicados.
3. Creación en estado `Pendiente de revisión`.
4. Verificación de vigencia, fuente, enlace, resumen, duplicados y permisos.
5. Publicación manual.
6. Registro inmutable del cambio.
7. Revisión bajo demanda de enlaces y vigencia; si falla, pasa a `Requiere actualización`.

## Actualización bajo demanda

ScolariX no ejecuta actualizaciones programadas. El proceso comienza únicamente cuando el propietario da una orden a Codex o Claude.

### Órdenes disponibles

- `Actualizá ScolariX`: revisar todos los deportes.
- `Actualizá Fútbol`: revisar únicamente las competiciones de fútbol.
- `Actualizá Fórmula 1`: revisar únicamente Fórmula 1.
- `Actualizá NBA`: revisar únicamente NBA.

Si la orden no identifica una sección, la IA debe confirmar el alcance antes de modificar información.

### Procedimiento obligatorio

1. Sincronizar el repositorio y revisar cambios pendientes.
2. Consultar fuentes oficiales o proveedores autorizados.
3. Comparar la información verificada con la publicada.
4. Presentar un resumen con la información nueva, modificada o desactualizada, las fuentes y enlaces, y los datos que no pudieron verificarse.
5. Esperar la aprobación del propietario.
6. Actualizar únicamente los registros aprobados.
7. Comprobar duplicados, fechas, fuentes y derechos de uso.
8. Ejecutar las validaciones del proyecto.
9. Guardar el cambio en GitHub.
10. Publicar en producción cuando el propietario lo autorice.
11. Informar el resultado, la versión publicada y cualquier pendiente.

### Colaboración

Codex y Claude pueden ejecutar este procedimiento independientemente. Ninguna IA necesita permiso de la otra.

La coordinación sirve únicamente para evitar sobrescribir cambios. Antes de empezar, cada IA debe revisar Git y comprobar si existen modificaciones pendientes en los archivos que utilizará.

GitHub es la fuente oficial compartida. Toda publicación debe corresponder a un commit identificable.

### Reglas editoriales

- No inventar resultados, noticias, clasificaciones, fuentes ni fechas.
- No copiar artículos completos.
- Utilizar resúmenes propios y conservar el enlace original.
- No publicar información que no haya podido verificarse.
- No duplicar registros existentes.
- Identificar claramente cualquier dato de demostración.
- Registrar la fecha de consulta o última revisión.
- Mostrar un estado vacío cuando no exista información confiable.

## Límites del prototipo

No incluye autenticación, conectores de resultados ni persistencia real porque todavía no se seleccionaron proveedores ni credenciales. Esas decisiones deben tomarse antes de exponer el panel administrativo en producción.

## Modificar deportes

La guía operativa para agregar, editar o retirar una sección está en `docs/SPORTS_MODULES.md`.
