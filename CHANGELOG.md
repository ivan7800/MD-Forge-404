# Changelog

## [5.0.0] - 2026-08-25

### Added
- Workspaces multiproyecto con creación, cambio, duplicado y eliminación.
- Migración del estado de v4/v3 al sistema de workspaces v5.
- Aislamiento de assets IndexedDB por workspace.
- Code ↔ Docs Auditor para contrastar documentación con evidencias estáticas del proyecto.
- Documentation Coverage para instalación, uso, arquitectura, seguridad, troubleshooting, privacidad y capacidades detectadas.
- Integración GitHub para repositorios públicos sin almacenar tokens.
- Lectura del branch por defecto, commit, árbol recursivo y archivos textuales priorizados.
- Vinculación del repositorio al workspace e importación de Markdown con snapshots.
- Generador de GitHub Quality Workflow y auditor Node exportables.
- Documentation Site Builder 2.0 con portada configurable, navegación agrupada/reordenable, breadcrumbs y anterior/siguiente.
- Logo/favicon opcional, footer, canonical, `.nojekyll`, sitemap y robots cuando existe URL base válida.
- Workflows propios de Quality y Deploy GitHub Pages.
- Tests Playwright y auditoría estática incluidos en el repositorio.

### Changed
- Flujo principal ampliado a Analyze → Write → Doctor → Build → GitHub → Publish.
- Project Intelligence conserva información estructurada de `package.json`, versión, scripts y origen del análisis.
- GitHub Readiness incorpora repositorio vinculado y Quality Workflow.
- Exportación documental incluye archivos extra generados por MD Forge.
- Service Worker actualizado a caché `md-forge-404-v5.0.0`.
- Manifest y documentación actualizados a v5.

### Fixed
- Auditor Node generado usa `String.raw` para preservar regex y caracteres escapados.
- Auditor Node generado resuelve la raíz del repositorio desde `import.meta.url`, por lo que no depende del directorio desde el que se invoque.
- Auditoría estática del propio repo detecta ahora botones con ID sin conexión y controles data-driven sin handler.
- `.gitignore` ampliado para artefactos de Node/Playwright.

### Security / Privacy
- La integración GitHub v5 trabaja con repositorios públicos y no solicita ni persiste tokens.
- Los análisis GitHub descargan un subconjunto priorizado de archivos textuales en vez de ejecutar contenido remoto.
- Las discrepancias código↔docs se expresan como evidencia/posible inconsistencia cuando un análisis estático no puede demostrar una afirmación absoluta.

### Verified
- 29/29 comprobaciones funcionales v5 en Chromium mediante harness con HTML/CSS/JS reales.
- Auditoría estática: IDs, navegación, referencias JS, manifest, assets y cache version.
- GitHub público probado end-to-end con red simulada; disponibilidad de API pública verificada por separado.
- ZIP documental íntegro e incluye Quality Workflow + auditor Node.
- ZIP Documentation Site íntegro e incluye navegación premium y archivos SEO opcionales.
- Auditor Node generado ejecutado sobre exportación: `Markdown: 7 · incidencias: 0`.
- Navegación móvil de siete destinos verificada a 390×844.
- Cero errores JavaScript no controlados durante la batería funcional.

## [4.0.0] - 2026-08-25

### Added
- Documentation OS con flujo Analyze → Write → Doctor → Build → Publish.
- Project Intelligence 2.0.
- README Wizard de cuatro pasos.
- Búsqueda y reemplazo global (`Ctrl+Shift+F`).
- Historial por documento con snapshots, Diff y restauración.
- Asset Manager con IndexedDB/fallback de sesión.
- Inserción automática de imágenes y exportación binaria.
- MD Doctor Pro con reglas MDF001–MDF403.
- Documentation Pack para completar documentos faltantes.
- Documentation Site Builder estático con navegación, buscador local, themes, responsive y 404.
- Exportador ZIP genérico para Markdown, HTML y binarios.
- Página Build y navegación móvil de seis secciones.

### Changed
- Producto renombrado visualmente de Documentation Studio a Documentation OS.
- MD Doctor amplía categorías a Contenido, Estructura, GitHub, Enlaces, Assets y Mantenimiento.
- Análisis de proyectos amplía package manager, tests, lint, build, workflows, TODO/FIXME y señales de repositorio.
- Exportación documental incluye assets gestionados.
- Preview Markdown añade imágenes y soporte seguro de `<details>/<summary>`.
- Service Worker actualizado a caché `md-forge-404-v4.0.0`.

### Fixed
- URLs temporales de imágenes separadas entre preview y Asset Manager para evitar revocaciones cruzadas.
- Búsqueda del Documentation Site corregida para funcionar desde páginas HTML anidadas.
- Navegación móvil ajustada para seis destinos sin overflow horizontal.
- Cierre defensivo de bloques de código Markdown sin fence final.

### Verified
- 37/37 checks funcionales automatizados.
- 39/39 botones con ID conectados a handlers.
- 11/11 controles de formato probados en Modo Pro.
- ZIP documental válido.
- ZIP Documentation Site válido.
- Sin errores JavaScript no controlados durante la suite automatizada.

## [3.1.0] - 2026-08-25

### Fixed
- Arranque sin dependencia innecesaria de ES Modules.
- Navegación y selector móvil.
- Persistencia defensiva.
- Sanitización básica de enlaces Markdown.
- Importación ZIP y exportación UTF-8.
