# MD Forge 404 v5.0.0 — Documentation OS

MD Forge 404 es un IDE de documentación Markdown **local-first** para entender un proyecto, crear su documentación, comprobar que lo documentado coincide con evidencias del código, construir un sitio estático y preparar la publicación.

**Flujo principal:** `ANALYZE → WRITE → DOCTOR → BUILD → GITHUB → PUBLISH`

## Qué aporta v5

### 1. Workspaces multiproyecto

- Crea y mantiene varios proyectos dentro de la misma aplicación.
- Cambia de workspace desde Inicio.
- Duplica o elimina proyectos.
- Conserva documentos, historial, configuración del sitio, evidencias y vínculo GitHub por workspace.
- Los assets de IndexedDB quedan aislados por proyecto.

### 2. Code ↔ Docs Auditor

Cruza la documentación con evidencias del proyecto analizado y marca **posibles discrepancias** sin convertir la ausencia de una señal estática en una certeza falsa.

Ejemplos de comprobación:

- PWA / Service Worker / offline declarados frente a evidencias encontradas.
- IndexedDB y localStorage declarados frente al código inspeccionado.
- Tecnologías mencionadas frente al stack detectado.
- `npm run <script>` documentado frente a scripts reales de `package.json`.
- Versión del workspace frente a la versión del paquete.
- Capacidades detectadas que todavía no están explicadas en la documentación.

### 3. Documentation Coverage

Calcula cobertura documental por áreas:

- instalación;
- uso;
- arquitectura;
- seguridad;
- troubleshooting;
- privacidad;
- capacidades técnicas detectadas.

El objetivo no es premiar cantidad de Markdown, sino mostrar qué aspectos importantes siguen sin documentarse.

### 4. Integración GitHub pública

MD Forge puede analizar repositorios **públicos** sin almacenar tokens:

1. introduce una URL de GitHub o `owner/repo`;
2. obtiene metadatos y árbol del branch por defecto;
3. prioriza archivos relevantes de documentación/código;
4. analiza su contenido de forma estática;
5. permite vincular el repositorio al workspace;
6. puede importar Markdown existente al proyecto local.

La integración está deliberadamente limitada a repositorios públicos en esta versión. Los repositorios privados requieren autenticación y no se solicita ni persiste un token en la PWA.

## 5. GitHub Quality Workflow Generator

Desde la propia aplicación se pueden generar:

```text
.github/workflows/documentation-quality.yml
.github/md-forge/docs-audit.mjs
```

El auditor generado revisa Markdown en CI y el workflow puede exportarse junto al resto de la documentación.

El repositorio de MD Forge incluye además sus propios workflows de **Quality** y **Deploy GitHub Pages**.

## 6. Documentation Site Builder 2.0

Genera un sitio de documentación estático con:

- portada configurable;
- navegación agrupada;
- reordenación de documentos;
- breadcrumbs;
- anterior / siguiente;
- buscador local;
- tema sistema / oscuro / claro;
- logo/favicon opcional desde Asset Manager;
- footer configurable;
- enlaces Markdown convertidos a HTML;
- assets incluidos;
- `404.html`;
- `.nojekyll`;
- canonical URLs opcionales;
- `sitemap.xml` y `robots.txt` cuando se configura una URL base HTTP(S) válida.

El ZIP generado no requiere backend ni build para servirlo como contenido estático.

## Funciones heredadas y ampliadas

### Project Intelligence 2.0

- tipo de proyecto y stack;
- `package.json`, versión, scripts y package manager;
- PWA manifest y Service Worker;
- IndexedDB, localStorage y APIs web detectadas;
- tests, lint, build y workflows;
- README, LICENSE y `.gitignore`;
- TODO/FIXME y otras señales de mantenimiento;
- generación documental basada en evidencias estáticas.

### README Wizard

Asistente para nombre, descripción, tipo, características, instalación, uso, licencia y repositorio. Si reemplaza contenido existente crea un snapshot previo.

### Búsqueda global

- búsqueda en todos los documentos;
- archivo y línea;
- salto directo al resultado;
- reemplazo global con snapshot previo;
- atajo `Ctrl+Shift+F`.

### Historial + Diff

- snapshots manuales y automáticos;
- comparación línea a línea;
- restauración de versiones;
- snapshot previo a restauraciones o correcciones sensibles.

### Asset Manager

- PNG, JPG/JPEG, WebP y GIF;
- máximo 5 MB por asset y 25 MB gestionados por proyecto;
- rutas bajo `assets/images/`;
- alt text editable;
- inserción Markdown automática;
- IndexedDB con fallback de sesión;
- inclusión de binarios en ZIP documental y Documentation Site.

### MD Doctor Pro

Incluye reglas MDF para:

- H1 ausente o múltiple;
- saltos y duplicados de encabezados;
- enlaces vacíos/inseguros/internos rotos;
- imágenes sin alt;
- assets locales ausentes;
- placeholders;
- documentos excesivamente breves;
- documentos GitHub recomendados ausentes;
- README sin instalación o uso.

Las correcciones automáticas que modifican contenido crean snapshot previo.

### Documentation Pack

Puede crear sin sobrescribir documentos existentes:

- `README.md`
- `CHANGELOG.md`
- `ROADMAP.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `docs/INSTALLATION.md`
- `docs/ARCHITECTURE.md`
- `docs/USER-GUIDE.md`
- `docs/FEATURES.md`
- `docs/TROUBLESHOOTING.md`
- `docs/FAQ.md`
- `docs/PRIVACY.md`
- `docs/OFFLINE.md`

## Editor

Editor / Split / Preview, números de línea en Modo Pro, Command Palette, H1, negrita, cursiva, enlaces, imágenes, código, listas, tablas, `<details>`, callouts, TOC y bloques Mermaid.

Mermaid se genera como Markdown; MD Forge no incorpora un renderer gráfico externo.

## Atajos

- `Ctrl+K` — Command Palette.
- `Ctrl+Shift+F` — búsqueda global.
- `Ctrl+E` — Editor.
- `Ctrl+D` — MD Doctor Pro.
- `Escape` — cerrar diálogos.

## Ejecución local

Las funciones principales usan JavaScript clásico con `defer` y no dependen de módulos ES para arrancar la interfaz.

Para probar PWA, Service Worker y comportamiento equivalente a GitHub Pages, sirve la carpeta por HTTP:

```bash
python -m http.server 4173
```

Después abre `http://localhost:4173/`.

El Service Worker no se activa bajo `file://`.

## Tests

Requiere Node.js 22 o posterior.

```bash
npm install
npm run test:static
npx playwright install --with-deps chromium
npm run test:browser
```

O todo junto:

```bash
npm test
```

La suite incluida cubre auditoría estructural, navegación, editor, workspaces, MD Doctor / Code↔Docs, generación de workflow, GitHub público mediante red simulada y Site Builder 2.0.

> Nota: en este paquete no se incluye `node_modules`. Instala las dependencias de desarrollo solo si quieres ejecutar la suite Playwright.

## GitHub Actions incluidos

- `.github/workflows/quality.yml` — auditoría estática + smoke tests Playwright.
- `.github/workflows/pages.yml` — despliegue estático a GitHub Pages desde `main`.

Para usar Pages, configura el repositorio para **GitHub Actions** como fuente de GitHub Pages.

## Privacidad y seguridad

- Sin backend propio.
- Sin CDN.
- Sin analítica ni telemetría.
- No ejecuta código de los proyectos importados.
- No ejecuta scripts npm, PowerShell, BAT, Python ni binarios de un proyecto analizado.
- La integración GitHub v5 no solicita ni almacena tokens.
- El preview neutraliza protocolos Markdown no permitidos.
- SVG no se admite como asset gestionado para reducir superficie de contenido activo.
- Los datos de proyecto permanecen en almacenamiento local compatible.

## Límites deliberados

- 1,5 MB por archivo de texto analizado.
- 10 MB de texto total por análisis.
- 5.000 entradas.
- 120 MB por ZIP importado.
- 5 MB por asset y 25 MB de assets gestionados por proyecto.
- GitHub público: se prioriza un subconjunto de archivos textuales relevantes para evitar descargar repositorios completos.
- La API pública de GitHub puede aplicar rate limiting.
- ZIP64 y ZIP cifrados no forman parte del objetivo actual.

## QA de v5

Durante la auditoría de esta release se verificaron en Chromium, sobre el código real de la aplicación:

- **29/29 comprobaciones funcionales del flujo v5**;
- workspaces: crear, cambiar y duplicar;
- Code ↔ Docs Auditor y Documentation Coverage;
- generación del Quality Workflow;
- integración GitHub completa con endpoints simulados;
- vinculación e importación de README;
- Site Builder 2.0 con navegación premium, sitemap y robots;
- ZIP documental y ZIP del sitio sin errores de integridad;
- workflow y auditor Node incluidos en exportación;
- navegación móvil de siete destinos;
- cero errores JavaScript no controlados durante la batería.

Adicionalmente, el auditor Node generado por MD Forge se ejecutó sobre un ZIP exportado y terminó con `Markdown: 7 · incidencias: 0`.

## Validaciones externas pendientes

No se consideran demostradas por esta auditoría:

- ejecución real del workflow en GitHub Actions;
- despliegue final del paquete en un repositorio GitHub Pages real;
- instalación/actualización PWA completa bajo HTTPS;
- Safari/iPhone/iPad físicos;
- Android físico;
- repositorios GitHub privados.

## Licencia

Consulta `LICENSE`.
