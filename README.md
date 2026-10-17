# Niveles de investigación — deck interactivo

Presentación web sobre los **seis niveles de investigación** (Supo, 2025) con **casos educativos simples** y una base de datos de **30 estudiantes** que se calcula en vivo.

Tema claro con glassmorphism, tipografía Inter y **navegación por niveles** desde el header.

## Cómo está organizado

La **barra del header** es la navegación: cada nivel muestra sus 2-3 páginas al pasar el cursor o hacer clic. Siempre visible, sin ventanas emergentes.

| Nivel | Páginas |
|---|---|
| General | Portada · El criterio · El verbo manda |
| 01 · Exploratorio | Teoría · Ejemplo (8 entrevistas) |
| 02 · Descriptivo | Teoría · Ejemplo (autoestima del grupo) |
| 03 · Relacional | Teoría · Ejemplo (r entre horas y rendimiento) |
| 04 · Explicativo | Teoría · **Taller (pretest–postest)** · **Betas (regresión)** |
| 05 · Predictivo | Teoría · Ejemplo (riesgo de reprobar) |
| 06 · Aplicativo | Teoría · Ejemplo (sostener el taller) |
| Cierre | Clasificador · Síntesis |

## Los dos casos

**Taller de autoestima.** 30 estudiantes, 15 con taller y 15 sin él, medidos antes y después. La página muestra la mejora en la **variable total** y en sus **tres dimensiones** (académica, social, emocional), más el **efecto neto** por diferencia de diferencias (+9,3 del grupo con taller vs +2,4 del control).

**Regresión con betas.** Mismos 30 estudiantes: horas de estudio, gasto en materiales y número de hermanos sobre el rendimiento. El modelo 1 (solo horas) da β = 0,64; el modelo 2 (con controles) baja a 0,48 y añade gasto (0,008) y hermanos (−0,47). Los coeficientes se calculan por mínimos cuadrados en el navegador.

## Estructura

```
index.html            deck completo (18 páginas)
assets/styles.css     sistema visual (glass, tema claro)
assets/app.js         navegación, base de datos, regresión, quiz
vercel.json           configuración de despliegue estático
```

## Local

```bash
npx serve .
```

## Desplegar en Vercel

**Opción A — panel (recomendada):** <https://vercel.com/new> → importar `niveles-de-investigacion` → Framework **Other**, build vacío, output `.` → Deploy.

**Opción B — CLI:** `npm i -g vercel && vercel login && vercel --prod`

## Nota

La base de 30 estudiantes es **simulada** y se usa solo con fines didácticos: todos los estadísticos (medias, diferencia de diferencias, correlación, betas, R²) se recalculan a partir de esas filas, así que la tabla visible y los resultados siempre coinciden.
