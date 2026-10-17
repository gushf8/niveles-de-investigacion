/* ==========================================================
   Niveles de investigación — deck interactivo (tema claro)
   ========================================================== */
(function () {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const fmt = (n, d = 2) => n.toFixed(d).replace(".", ",");
  const mean = a => a.reduce((x, y) => x + y, 0) / a.length;

  /* ---------------- base de datos simulada (n = 30) ---------------- */
  const DATASET = [
    { id: "C01", grupo: "Control", pre: 13.6, post: 15.7, horas: 14.5, asist: 88, nse: 5, nota: 19.6 },
    { id: "C02", grupo: "Control", pre: 12.4, post: 13.8, horas: 5.7, asist: 61, nse: 1, nota: 9.3 },
    { id: "C03", grupo: "Control", pre: 12.2, post: 13.6, horas: 13.7, asist: 76, nse: 4, nota: 16.4 },
    { id: "C04", grupo: "Control", pre: 11.0, post: 12.9, horas: 6.8, asist: 67, nse: 2, nota: 10.7 },
    { id: "C05", grupo: "Control", pre: 10.3, post: 11.4, horas: 10.5, asist: 72, nse: 3, nota: 12.3 },
    { id: "C06", grupo: "Control", pre: 12.1, post: 13.5, horas: 4.7, asist: 66, nse: 1, nota: 9.0 },
    { id: "C07", grupo: "Control", pre: 11.5, post: 12.8, horas: 15.1, asist: 85, nse: 5, nota: 19.9 },
    { id: "C08", grupo: "Control", pre: 12.6, post: 13.7, horas: 11.7, asist: 73, nse: 3, nota: 14.1 },
    { id: "C09", grupo: "Control", pre: 13.8, post: 15.3, horas: 9.9, asist: 65, nse: 2, nota: 13.0 },
    { id: "C10", grupo: "Control", pre: 12.3, post: 13.6, horas: 7.2, asist: 80, nse: 3, nota: 13.3 },
    { id: "C11", grupo: "Control", pre: 11.4, post: 11.9, horas: 7.8, asist: 67, nse: 2, nota: 11.5 },
    { id: "C12", grupo: "Control", pre: 12.4, post: 14.0, horas: 12.5, asist: 83, nse: 4, nota: 14.3 },
    { id: "C13", grupo: "Control", pre: 12.6, post: 14.0, horas: 12.4, asist: 79, nse: 4, nota: 16.0 },
    { id: "C14", grupo: "Control", pre: 13.2, post: 14.8, horas: 14.0, asist: 91, nse: 5, nota: 20.0 },
    { id: "C15", grupo: "Control", pre: 10.6, post: 12.1, horas: 10.7, asist: 76, nse: 3, nota: 15.8 },
    { id: "E01", grupo: "Experimental", pre: 12.3, post: 17.6, horas: 11.3, asist: 82, nse: 4, nota: 16.4 },
    { id: "E02", grupo: "Experimental", pre: 11.4, post: 16.2, horas: 12.1, asist: 81, nse: 4, nota: 16.1 },
    { id: "E03", grupo: "Experimental", pre: 13.1, post: 18.4, horas: 11.2, asist: 75, nse: 3, nota: 16.8 },
    { id: "E04", grupo: "Experimental", pre: 11.2, post: 15.9, horas: 6.9, asist: 73, nse: 2, nota: 11.9 },
    { id: "E05", grupo: "Experimental", pre: 13.3, post: 17.4, horas: 14.2, asist: 92, nse: 5, nota: 18.5 },
    { id: "E06", grupo: "Experimental", pre: 12.2, post: 16.7, horas: 3.6, asist: 69, nse: 1, nota: 9.2 },
    { id: "E07", grupo: "Experimental", pre: 10.8, post: 15.6, horas: 10.3, asist: 80, nse: 3, nota: 15.2 },
    { id: "E08", grupo: "Experimental", pre: 10.4, post: 16.0, horas: 5.0, asist: 70, nse: 1, nota: 9.6 },
    { id: "E09", grupo: "Experimental", pre: 12.7, post: 18.2, horas: 5.3, asist: 64, nse: 1, nota: 11.8 },
    { id: "E10", grupo: "Experimental", pre: 13.2, post: 17.4, horas: 14.7, asist: 84, nse: 4, nota: 17.6 },
    { id: "E11", grupo: "Experimental", pre: 13.0, post: 17.5, horas: 8.8, asist: 66, nse: 2, nota: 10.5 },
    { id: "E12", grupo: "Experimental", pre: 13.8, post: 18.7, horas: 7.7, asist: 67, nse: 2, nota: 11.0 },
    { id: "E13", grupo: "Experimental", pre: 11.9, post: 16.7, horas: 4.5, asist: 60, nse: 1, nota: 7.3 },
    { id: "E14", grupo: "Experimental", pre: 13.7, post: 19.1, horas: 16.8, asist: 97, nse: 5, nota: 20.0 },
    { id: "E15", grupo: "Experimental", pre: 12.2, post: 17.0, horas: 4.9, asist: 68, nse: 1, nota: 10.3 }
  ];

  /* ---------------- regresión: mínimos cuadrados ---------------- */
  function ols(X, y) {
    const n = X.length, k = X[0].length;
    const A = [];
    for (let i = 0; i < k; i++) {
      const row = [];
      for (let j = 0; j < k; j++) {
        let s = 0;
        for (let r = 0; r < n; r++) s += X[r][i] * X[r][j];
        row.push(s);
      }
      let s = 0;
      for (let r = 0; r < n; r++) s += X[r][i] * y[r];
      row.push(s);
      A.push(row);
    }
    for (let c = 0; c < k; c++) {
      let piv = c;
      for (let r = c + 1; r < k; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r;
      const tmp = A[c]; A[c] = A[piv]; A[piv] = tmp;
      const pv = A[c][c];
      for (let j = 0; j <= k; j++) A[c][j] /= pv;
      for (let r = 0; r < k; r++) {
        if (r === c) continue;
        const f = A[r][c];
        if (!f) continue;
        for (let j = 0; j <= k; j++) A[r][j] -= f * A[c][j];
      }
    }
    const b = A.map(r => r[k]);
    const ybar = mean(y);
    let ssr = 0, sst = 0;
    for (let r = 0; r < n; r++) {
      let yh = 0;
      for (let j = 0; j < k; j++) yh += X[r][j] * b[j];
      ssr += (y[r] - yh) ** 2;
      sst += (y[r] - ybar) ** 2;
    }
    return { b, r2: 1 - ssr / sst };
  }

  const Y = DATASET.map(d => d.nota);
  const M1 = ols(DATASET.map(d => [1, d.horas]), Y);
  const M2 = ols(DATASET.map(d => [1, d.horas, d.asist, d.nse]), Y);

  /* ---------------- deck ---------------- */
  const slides = $$(".slide");
  const total = slides.length;
  let index = 0;

  $("#totNum").textContent = String(total).padStart(2, "0");

  function setRevealIndexes() {
    slides.forEach(s => $$(".reveal", s).forEach((el, i) => el.style.setProperty("--i", i)));
  }

  function render() {
    slides.forEach((s, i) => {
      const on = i === index;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
      try { s.inert = !on; } catch (_) {}
    });

    const num = index + 1;
    $("#curNum").textContent = String(num).padStart(2, "0");
    $("#progressBar").style.width = (num / total) * 100 + "%";
    $("#prevBtn").disabled = index === 0;
    $("#nextBtn").disabled = index === total - 1;
    history.replaceState(null, "", "#/" + num);

    const active = slides[index];
    active.scrollTop = 0;
    $$(".menu-item").forEach((b, i) => b.classList.toggle("is-current", i === index));
    document.title = (active.dataset.title || "Niveles") + " · Niveles de investigación";

    const updateHint = () => {
      const hint = $("#scrollHint");
      if (hint) hint.classList.toggle("is-on", active.scrollHeight > active.clientHeight + 8);
    };
    updateHint();
    requestAnimationFrame(updateHint);
    setTimeout(updateHint, 150);
  }

  function goTo(n) {
    const target = Math.max(1, Math.min(total, n));
    if (target === index + 1) return;
    index = target - 1;
    render();
  }
  const next = () => goTo(index + 2);
  const prev = () => goTo(index);

  $("#nextBtn").addEventListener("click", next);
  $("#prevBtn").addEventListener("click", prev);
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => goTo(+b.dataset.goto)));

  document.addEventListener("keydown", e => {
    if ($("#menu").classList.contains("is-open")) {
      if (e.key === "Escape") closeMenu();
      return;
    }
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    switch (e.key) {
      case "ArrowRight": case "PageDown": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft":  case "PageUp":  e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); goTo(1); break;
      case "End":  e.preventDefault(); goTo(total); break;
      case "m": case "M": e.preventDefault(); toggleMenu(); break;
      case "Escape": closeMenu(); break;
    }
  });

  let sx = 0, sy = 0, tracking = false;
  const deck = $("#deck");
  deck.addEventListener("pointerdown", e => {
    if (e.target.closest("button, input, .menu, .data-scroll")) return;
    sx = e.clientX; sy = e.clientY; tracking = true;
  });
  deck.addEventListener("pointerup", e => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) (dx < 0 ? next : prev)();
  });

  /* ---------------- índice ---------------- */
  const menu = $("#menu");
  const grid = $("#menuGrid");

  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "menu-item";
    b.innerHTML = "<span>" + String(i + 1).padStart(2, "0") + "</span>" + (s.dataset.title || "Diapositiva");
    b.addEventListener("click", () => { goTo(i + 1); closeMenu(); });
    grid.appendChild(b);
  });

  function openMenu()   { menu.classList.add("is-open"); menu.setAttribute("aria-hidden", "false"); }
  function closeMenu()  { menu.classList.remove("is-open"); menu.setAttribute("aria-hidden", "true"); }
  function toggleMenu() { menu.classList.contains("is-open") ? closeMenu() : openMenu(); }

  $("#menuBtn").addEventListener("click", openMenu);
  $("#menuClose").addEventListener("click", closeMenu);
  menu.addEventListener("click", e => { if (e.target === menu) closeMenu(); });

  /* ---------------- rail ---------------- */
  const railMap = { exploratorio: 4, descriptivo: 5, relacional: 6, explicativo: 7, predictivo: 11, aplicativo: 12 };
  $$(".rail-item").forEach(b => b.addEventListener("click", () => goTo(railMap[b.dataset.level] || 2)));

  /* ---------------- verbos ---------------- */
  const VERBS = {
    identificar:  { level: "Exploratorio", analysis: "Análisis no estadístico", ex: "Identificar las prácticas de retroalimentación que aparecen en un aula donde el tema no ha sido investigado." },
    interpretar:  { level: "Exploratorio", analysis: "Análisis no estadístico", ex: "Interpretar el sentido que los docentes atribuyen a la evaluación formativa en su práctica cotidiana." },
    describir:    { level: "Descriptivo",  analysis: "Estadística univariada", ex: "Describir la distribución del uso de rúbricas según facultad y ciclo." },
    estimar:      { level: "Descriptivo",  analysis: "Estadística univariada", ex: "Estimar el porcentaje poblacional de docentes que aplica rúbricas, con su intervalo de confianza." },
    comparar:     { level: "Relacional",   analysis: "Estadística bivariada",  ex: "Comparar el rendimiento entre las secciones A y B mediante t de Student." },
    asociar:      { level: "Relacional",   analysis: "Estadística bivariada",  ex: "Asociar la competencia digital con la frecuencia de uso de inteligencia artificial." },
    evidenciar:   { level: "Explicativo",  analysis: "Estadística multivariada", ex: "Evidenciar la influencia del clima institucional en el compromiso docente, controlando la antigüedad." },
    demostrar:    { level: "Explicativo",  analysis: "Estadística multivariada", ex: "Demostrar que un programa de tutoría produce mejora, con grupo control y medición pre y post." },
    predecir:     { level: "Predictivo",   analysis: "Modelamiento predictivo", ex: "Predecir la probabilidad de abandono de cada estudiante con los datos del primer mes." },
    pronosticar:  { level: "Predictivo",   analysis: "Modelamiento predictivo", ex: "Pronosticar en qué mes del semestre es más probable que ocurra el abandono." },
    evaluar:      { level: "Aplicativo",   analysis: "Mejora continua", ex: "Evaluar la línea base y el monitoreo mensual de un programa de tutoría." },
    controlar:    { level: "Aplicativo",   analysis: "Mejora continua", ex: "Controlar que la reducción del abandono se mantenga bajo el 10 % durante tres semestres." }
  };

  $("#verbGrid")?.addEventListener("click", e => {
    const b = e.target.closest(".verb");
    if (!b) return;
    $$(".verb").forEach(v => v.classList.remove("is-active"));
    b.classList.add("is-active");
    const d = VERBS[b.dataset.verb];
    $("#vrLevel").textContent = d.level;
    $("#vrAnalysis").textContent = d.analysis;
    $("#vrExample").innerHTML = "<em>Objetivo modelo:</em> " + d.ex;
  });

  /* ---------------- diapositiva 8: pretest / postest ---------------- */
  const tblPre = $("#tblPre");
  if (tblPre) {
    tblPre.innerHTML = DATASET.map(d => {
      const delta = d.post - d.pre;
      return "<tr>" +
        "<td>" + d.id + "</td>" +
        '<td><span class="grp ' + (d.grupo === "Control" ? "c" : "e") + '">' + (d.grupo === "Control" ? "Control" : "Exper.") + "</span></td>" +
        "<td>" + fmt(d.pre, 1) + "</td>" +
        "<td>" + fmt(d.post, 1) + "</td>" +
        '<td class="delta">+' + fmt(delta, 1) + "</td>" +
        "</tr>";
    }).join("");

    const C = DATASET.filter(d => d.grupo === "Control");
    const E = DATASET.filter(d => d.grupo === "Experimental");
    const stats = {
      cPre: mean(C.map(d => d.pre)), cPost: mean(C.map(d => d.post)),
      ePre: mean(E.map(d => d.pre)), ePost: mean(E.map(d => d.post))
    };
    const dC = stats.cPost - stats.cPre;
    const dE = stats.ePost - stats.ePre;

    let withControl = true;

    function renderDiD() {
      $("#cPre").textContent = fmt(stats.cPre, 1);
      $("#cPost").textContent = fmt(stats.cPost, 1);
      $("#ePre").textContent = fmt(stats.ePre, 1);
      $("#ePost").textContent = fmt(stats.ePost, 1);
      $("#cDelta").textContent = "+" + fmt(dC, 1);
      $("#eDelta").textContent = "+" + fmt(dE, 1);

      $("#naiveVal").textContent = "+" + fmt(dE, 1);

      const sw = $("#controlToggle");
      sw.setAttribute("aria-checked", String(withControl));
      $("#controlState").textContent = withControl ? "activo" : "desactivado";

      if (withControl) {
        $("#netVal").textContent = "+" + fmt(dE - dC, 1);
        $("#netVal").style.color = "";
        $("#roNote").textContent = "El grupo control mejoró " + fmt(dC, 1) +
          " puntos sin recibir el programa: sin él, esa mejora se habría atribuido a la intervención.";
      } else {
        $("#netVal").textContent = "—";
        $("#netVal").style.color = "var(--muted)";
        $("#roNote").textContent = "Con un solo grupo el efecto neto no es estimable: la mejora mezcla el programa, la maduración, el efecto del test y la regresión a la media.";
      }
    }

    $("#controlToggle").addEventListener("click", () => { withControl = !withControl; renderDiD(); });
    renderDiD();
  }

  /* ---------------- diapositiva 9: betas ---------------- */
  const tblBeta = $("#tblBeta");
  if (tblBeta) {
    let model = 1;
    let selected = null;

    tblBeta.innerHTML = DATASET.map((d, i) =>
      '<tr data-i="' + i + '">' +
        "<td>" + d.id + "</td>" +
        "<td>" + fmt(d.horas, 1) + "</td>" +
        "<td>" + d.asist + "</td>" +
        "<td>" + d.nse + "</td>" +
        "<td>" + fmt(d.nota, 1) + "</td>" +
      "</tr>"
    ).join("");

    function predict(d, m) {
      return m === 1
        ? M1.b[0] + M1.b[1] * d.horas
        : M2.b[0] + M2.b[1] * d.horas + M2.b[2] * d.asist + M2.b[3] * d.nse;
    }

    function renderBeta() {
      const isM2 = model === 2;
      const m = isM2 ? M2 : M1;
      const bH = m.b[1];

      $("#betaH").textContent = fmt(bH, 2);
      $("#betaR2").textContent = fmt(m.r2, 2);
      $("#betaEq").textContent = isM2
        ? "Ŷ = " + fmt(M2.b[0], 2) + " + " + fmt(M2.b[1], 2) + "·Horas + " + fmt(M2.b[2], 3) + "·Asist. + " + fmt(M2.b[3], 2) + "·NSE"
        : "Ŷ = " + fmt(M1.b[0], 2) + " + " + fmt(M1.b[1], 2) + " · Horas";

      $("#betaRead").innerHTML = "Por cada hora adicional de estudio, la nota sube <strong>" +
        fmt(bH, 2) + " puntos</strong>" + (isM2 ? ", manteniendo constantes asistencia y NSE." : ".");

      const rows = [];
      rows.push({ k: "Horas de estudio", v: fmt(bH, 2), why: "Cada hora adicional", key: true, drop: isM2 });
      if (isM2) {
        rows.push({ k: "Asistencia (%)", v: fmt(M2.b[2], 3), why: "Cada punto de asistencia" });
        rows.push({ k: "NSE (1–5)", v: fmt(M2.b[3], 2), why: "Cada nivel socioeconómico" });
        rows.push({ k: "Intercepto", v: fmt(M2.b[0], 2), why: "Sin interpretación sustantiva" });
      } else {
        rows.push({ k: "Intercepto", v: fmt(M1.b[0], 2), why: "Nota esperada con 0 horas (extrapolación)" });
      }

      $("#betaTable tbody").innerHTML = rows.map(r =>
        "<tr" + (r.key ? ' class="is-key' + (r.drop ? " is-drop" : "") + '"' : "") + ">" +
        "<td>" + r.k + "</td><td>" + r.v + "</td><td>" + r.why + "</td></tr>"
      ).join("");

      $("#betaNote").textContent = isM2
        ? "La beta de horas cayó de " + fmt(M1.b[1], 2) + " a " + fmt(M2.b[1], 2) +
          ": al controlar asistencia y NSE, casi la mitad del efecto que parecía de las horas era del contexto."
        : "Modelo sin controles: la beta de horas absorbe el efecto de todo lo que no está en el modelo.";

      if (selected !== null) updateSel();
    }

    function updateSel() {
      const d = DATASET[selected];
      const yh = predict(d, model);
      $("#betaSel").innerHTML = "<b>" + d.id + "</b> · predicho " + fmt(yh, 1) + " · real " + fmt(d.nota, 1);
    }

    tblBeta.addEventListener("click", e => {
      const tr = e.target.closest("tr");
      if (!tr) return;
      $$("#tblBeta tr").forEach(r => r.classList.remove("is-sel"));
      tr.classList.add("is-sel");
      selected = +tr.dataset.i;
      updateSel();
    });

    $$(".seg").forEach(b => b.addEventListener("click", () => {
      $$(".seg").forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      model = +b.dataset.model;
      renderBeta();
    }));

    renderBeta();
  }

  /* ---------------- escalera ---------------- */
  const STEPS = [
    { name: "Exploratorio", q: "¿Qué usos, prácticas y tensiones reportan los docentes al incorporar IA generativa?", instrument: "8 entrevistas semiestructuradas", analysis: "Análisis temático (no estadístico)", verdict: "Categorías y preguntas para estudios posteriores", out: "Se obtiene un mapa del problema, no una conclusión." },
    { name: "Descriptivo", q: "¿Cuál es la frecuencia de uso y qué herramientas emplean 120 docentes?", instrument: "Encuesta con escala ordinal", analysis: "Frecuencias, porcentajes, medias", verdict: "Perfil de uso por categoría", out: "Un retrato del fenómeno, sin cruzar variables." },
    { name: "Relacional", q: "¿Qué relación existe entre competencia digital y frecuencia de uso de IA?", instrument: "Dos escalas aplicadas a la misma muestra", analysis: "rho de Spearman", verdict: "Coeficiente e interpretación del grado de asociación", out: "Se afirma relación, nunca causa." },
    { name: "Explicativo", q: "¿Cuál es el efecto de un programa de capacitación sobre la planificación de sesiones?", instrument: "Cuasi experimento con grupo control, pre y post test", analysis: "ANOVA de medidas repetidas o regresión con betas", verdict: "Efecto atribuible al programa, controlando rivales", out: "Aquí se puede hablar de influencia; antes, no." },
    { name: "Predictivo", q: "¿Qué modelo anticipa qué docentes adoptarán IA el próximo semestre?", instrument: "Datos de dos cohortes y variables predictoras", analysis: "Regresión logística con validación cruzada, AUC-ROC", verdict: "Probabilidad individual de adopción", out: "Se juzga por acierto fuera de muestra, no por p-valor." },
    { name: "Aplicativo", q: "¿En qué medida el programa mejora la planificación y se sostiene en el tiempo?", instrument: "Línea base, indicadores y monitoreo semestral", analysis: "CEP: gráficos de control e índices de capacidad", verdict: "Proceso institucionalizado y validado", out: "El criterio es la sostenibilidad, no el entusiasmo." }
  ];

  const panels = $("#ladderPanels");
  if (panels) {
    panels.innerHTML = STEPS.map((s, i) =>
      '<div class="lp' + (i === 0 ? " is-active" : "") + '" role="tabpanel">' +
        "<div><h3>" + String(i + 1).padStart(2, "0") + " · " + s.name + "</h3>" +
        '<p class="q">“' + s.q + '”</p>' +
        "<dl><dt>Instrumento</dt><dd>" + s.instrument + "</dd>" +
        "<dt>Análisis</dt><dd>" + s.analysis + "</dd>" +
        "<dt>Producto</dt><dd>" + s.verdict + "</dd></dl></div>" +
        '<div class="out"><b>Qué se obtiene</b>' + s.out + "</div>" +
      "</div>"
    ).join("");

    $$("#ladder .lt").forEach(btn => btn.addEventListener("click", () => {
      const i = +btn.dataset.tab;
      $$("#ladder .lt").forEach(b => b.classList.toggle("is-active", b === btn));
      $$(".lp", panels).forEach((p, j) => p.classList.toggle("is-active", i === j));
    }));
  }

  /* ---------------- quiz ---------------- */
  const QUIZ = [
    { q: "¿Cuál es la proporción de docentes que aplica rúbricas en la facultad?", a: "Descriptivo", why: "Una sola variable, análisis univariado: eso es descriptivo." },
    { q: "¿Cómo interpretan los docentes el sentido de la evaluación formativa en su práctica?", a: "Exploratorio", why: "Se busca comprender significados con análisis no estadístico: nivel exploratorio, objetivo interpretar." },
    { q: "¿Existen diferencias significativas en el rendimiento entre las secciones A y B?", a: "Relacional", why: "Comparar grupos independientes es una técnica bivariada propia del nivel relacional." },
    { q: "¿Qué factores explican la deserción, controlando el nivel socioeconómico?", a: "Explicativo", why: "El control de variables extrañas mediante análisis multivariado define el nivel explicativo." },
    { q: "¿Qué probabilidad tiene cada estudiante de abandonar el próximo semestre?", a: "Predictivo", why: "No se pregunta por la causa: se estima una probabilidad individual con un modelo." },
    { q: "¿El programa redujo el abandono y se mantuvo bajo el 10 % durante tres semestres?", a: "Aplicativo", why: "Evaluar y sostener una intervención con indicadores es nivel aplicativo." },
    { q: "Se comparan los promedios de dos grupos con t de Student. ¿Qué nivel es?", a: "Relacional", why: "La t de Student compara grupos: análisis bivariado, nivel relacional." },
    { q: "Se estima el efecto de un curso con grupo control y medición postest. ¿Qué nivel es?", a: "Explicativo", why: "Hay manipulación y grupo de comparación: inferencia causal, nivel explicativo." }
  ];
  const LEVELS = ["Exploratorio", "Descriptivo", "Relacional", "Explicativo", "Predictivo", "Aplicativo"];

  const quiz = $("#quiz");
  if (quiz) {
    let qi = 0, score = 0, answered = false;
    const qText = $("#qText"), qOpts = $("#qOptions"), qFb = $("#qFeedback"),
          qIdx = $("#qIndex"), qScore = $("#qScore"), qProg = $("#qProgress"), qNext = $("#qNext");

    function renderQ() {
      if (qi >= QUIZ.length) {
        qText.textContent = "Resultado final";
        qOpts.innerHTML = "";
        qFb.innerHTML = "<b>" + score + " de " + QUIZ.length + "</b> correctas. " +
          (score === QUIZ.length
            ? "Domina el criterio: el análisis decide el nivel."
            : "Repase el par relacional–correlacional y la frontera explicativo–predictivo.");
        qNext.textContent = "Reiniciar";
        qNext.disabled = false;
        qNext.onclick = reset;
        qIdx.textContent = QUIZ.length;
        qProg.style.width = "100%";
        return;
      }

      answered = false;
      const item = QUIZ[qi];
      qText.textContent = item.q;
      qFb.textContent = "";
      qIdx.textContent = qi + 1;
      qProg.style.width = (qi / QUIZ.length) * 100 + "%";
      qNext.disabled = true;
      qNext.textContent = "Siguiente →";
      qNext.onclick = () => { qi++; renderQ(); };

      qOpts.innerHTML = "";
      LEVELS.forEach(lvl => {
        const b = document.createElement("button");
        b.className = "opt";
        b.textContent = lvl;
        b.addEventListener("click", () => answer(b, lvl, item));
        qOpts.appendChild(b);
      });
    }

    function answer(btn, lvl, item) {
      if (answered) return;
      answered = true;
      const ok = lvl === item.a;
      if (ok) score++;
      $$(".opt", qOpts).forEach(b => {
        b.disabled = true;
        if (b.textContent === item.a) b.classList.add("correct");
      });
      if (!ok) btn.classList.add("wrong");
      qScore.textContent = score;
      qFb.innerHTML = (ok ? "<b>Correcto.</b> " : "<b>No exactamente.</b> ") + item.why;
      qNext.disabled = false;
    }

    function reset() {
      qi = 0; score = 0;
      qScore.textContent = "0";
      renderQ();
      qNext.onclick = () => { qi++; renderQ(); };
    }

    $("#qReset").addEventListener("click", reset);
    renderQ();
  }

  /* ---------------- arranque ---------------- */
  window.addEventListener("hashchange", () => {
    const n = parseInt((location.hash.match(/\d+/) || [])[0], 10);
    if (n && n !== index + 1 && n >= 1 && n <= total) { index = n - 1; render(); }
  });

  const hash = (location.hash.match(/\d+/) || [])[0];
  if (hash) index = Math.max(0, Math.min(total - 1, parseInt(hash, 10) - 1));

  setRevealIndexes();
  render();
})();
