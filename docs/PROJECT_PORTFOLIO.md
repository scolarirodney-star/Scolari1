# Portafolio del proyecto ScolariX

## Resumen

ScolariX es un prototipo de producto editorial deportivo que reúne fútbol y Fórmula 1 en una sola experiencia. Nació en el chat **“Crea página de fútbol de prueba”** a partir de referencias de UEFA, Formula1.com, APF y Google News.

Su propuesta central es facilitar la consulta sin ocultar el origen: cada registro debe mantener fuente, enlace y fecha de revisión. El sitio publica resúmenes propios y no reproduce artículos completos ni materiales de terceros sin autorización.

## Objetivo

Crear un punto de encuentro rápido y responsive para consultar:

- noticias deportivas resumidas;
- resultados organizados por competición y jornada;
- tablas de posiciones;
- próximos partidos;
- clasificaciones de pilotos y constructores de Fórmula 1;
- enlaces directos a las fuentes originales.

## Alcance actual

- Portada editorial sin fotografías de protagonistas.
- Sección Fútbol con seis competiciones, filtros, noticias, resultados, próximos partidos y tablas.
- Sección Fórmula 1 con noticias, resultado completo, 23 pilotos, 11 constructores y perfiles de equipos.
- Protagonistas rotativos únicamente dentro de Fútbol y Fórmula 1.
- Buscador global, navegación responsive y estados vacíos cuando faltan datos confirmados.
- Fuente, enlace y fecha de revisión visibles en el contenido deportivo.
- Aviso legal, privacidad, cookies y procedimiento de retirada.

## Decisiones de producto

1. La portada conserva una composición gráfica y no muestra retratos.
2. Las fotografías de protagonistas rotan cada 30 segundos solo en las secciones deportivas.
3. Los datos actuales son instantáneas revisadas; no se presentan como tiempo real.
4. La automatización futura no publicará directamente: todo registro nuevo ingresará como **Pendiente de revisión**.
5. Cuando no exista información verificada o una API autorizada, la interfaz mostrará un estado vacío.
6. Cada contenido externo debe conservar atribución y acceso a la fuente original.

## Flujo editorial previsto

1. Ingesta desde una fuente autorizada.
2. Normalización y control de duplicados.
3. Creación en estado Pendiente de revisión.
4. Verificación de vigencia, fuente, enlace, resumen y derechos.
5. Publicación manual.
6. Registro del cambio.
7. Control periódico de enlaces y vigencia.

## Estado

El prototipo navegable está operativo. Los datos deportivos están estructurados localmente y la interfaz permite explorar el concepto completo.

## Decisiones pendientes

- Seleccionar proveedores y APIs autorizadas.
- Definir responsables y frecuencia de revisión editorial.
- Definir criterios de publicación, corrección y retirada.
- Activar persistencia real y autenticación antes de exponer funciones administrativas.
- Establecer la política definitiva de licencias e imágenes.

## Fuentes iniciales

- UEFA: https://www.uefa.com/
- APF: https://www.apf.org.py/
- Formula 1: https://www.formula1.com/
- Google News: https://news.google.com/

## Documentación relacionada

- `ARCHITECTURE.md`: arquitectura, evolución prevista y límites técnicos.
- `db/schema.ts`: propuesta de modelo de datos.
- `app/data/index.js`: instantáneas y fuentes del prototipo.
- `app/site.js`: comportamiento de filtros, vistas y flujo editorial.
