# Niveles de investigación — deck interactivo

Presentación web interactiva sobre los **seis niveles de investigación** (Supo, 2025), con foco en el **nivel explicativo**: pretest–postest, coeficientes beta y efectos reales.

- 15 diapositivas, navegación con teclado, índice y enlaces profundos (`#/8`).
- Simulador de **diferencia de diferencias** (pretest–postest con y sin grupo control).
- Simulador de **regresión**: la beta de horas de estudio cambia al introducir controles.
- Clasificador de 8 casos con retroalimentación.
- Tema claro/oscuro, responsive, respeta `prefers-reduced-motion`.

## Estructura

```
index.html            deck completo
assets/styles.css     sistema visual (2 temas)
assets/app.js         navegación, simuladores, quiz
vercel.json           configuración de despliegue estático
```

## Local

Abrir `index.html` en el navegador, o servirlo:

```bash
npx serve .
```

## Desplegar en Vercel

**Opción A — desde el panel (recomendada):**

1. Entrar a <https://vercel.com/new>
2. Importar el repositorio de GitHub `niveles-de-investigacion`.
3. Framework preset: **Other**. Build command: vacío. Output directory: `.` (raíz).
4. Deploy.

**Opción B — CLI:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Contenido

| Sección | Diapositivas |
|---|---|
| Criterio y verbos | 2–3 |
| Niveles 1–3 | 4–6 |
| Nivel explicativo | 7–10 |
| Niveles 5–6 | 11–12 |
| Escalera, quiz y cierre | 13–15 |

Los valores de los simuladores son ilustrativos y están construidos para enseñar el criterio; los casos citados remiten a sus fuentes originales.

## Referencias

- Supo, J. A. (2025). *Niveles de investigación: una clasificación emergente fundamentada en el análisis de datos*. BIOESTADISTICO.
- Hernández-Sampieri, R., & Mendoza, C. P. (2018). *Metodología de la investigación*. McGraw-Hill.
- Valderrama Mendoza, S. (2018). *El desarrollo de la tesis descriptiva-comparativa, correlacional y cuasiexperimental*. San Marcos.
