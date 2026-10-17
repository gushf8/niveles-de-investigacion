# Niveles de investigación — deck interactivo

Presentación web sobre los **seis niveles de investigación** (Supo, 2025), con foco en el **nivel explicativo**: pretest–postest, coeficientes beta y una **base de datos simulada de 30 casos** que se usa en vivo.

Tema claro con glassmorphism, tipografía sans (Inter) y navegación tipo presentación.

## Qué incluye

- 15 diapositivas con navegación por teclado, índice (`M`), barra de progreso y enlaces profundos (`#/8`).
- **Base de datos de 30 estudiantes** (15 control / 15 experimental) visible al costado de la explicación.
- **Diferencia de diferencias** calculada en vivo sobre esa base: efecto ingenuo vs. efecto neto, con interruptor para quitar el grupo control.
- **Regresión con betas** calculada en vivo (mínimos cuadrados): la beta de *horas* cae de 0,92 a 0,48 al introducir asistencia y NSE.
- Selección de fila para comparar predicción vs. valor real.
- Clasificador de 8 casos con retroalimentación.
- Tema claro, responsive, respeta `prefers-reduced-motion`.

## Estructura

```
index.html            deck completo
assets/styles.css     sistema visual (glass, tema claro)
assets/app.js         navegación, base de datos, regresión, quiz
vercel.json           configuración de despliegue estático
```

## Local

```bash
npx serve .
```

## Desplegar en Vercel

**Opción A — panel (recomendada):**

1. <https://vercel.com/new>
2. Importar `niveles-de-investigacion`.
3. Framework preset: **Other**. Build command: vacío. Output directory: `.`
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

La base de datos es **simulada** y se usa solo con fines didácticos: los coeficientes se recalculan a partir de esas 30 filas, de modo que la tabla y los resultados siempre coinciden. Los casos citados (Proyecto STAR, aspirina, Mincer, Hanushek, Georgia State, Six Sigma) remiten a sus fuentes originales.

## Referencias

- Supo, J. A. (2025). *Niveles de investigación: una clasificación emergente fundamentada en el análisis de datos*. BIOESTADISTICO.
- Hernández-Sampieri, R., & Mendoza, C. P. (2018). *Metodología de la investigación*. McGraw-Hill.
- Valderrama Mendoza, S. (2018). *El desarrollo de la tesis descriptiva-comparativa, correlacional y cuasiexperimental*. San Marcos.
