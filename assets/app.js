/* ==========================================================
   Niveles de investigación — lógica del deck
   ========================================================== */
(function () {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const fmt = (n, d = 1) => n.toFixed(d).replace(".", ",");

  /* ---------------- tema ---------------- */
  const root = document.documentElement;
  const saved = localStorage.getItem("niveles-theme");
  if (saved) root.setAttribute("data-theme", saved);

  $("#themeToggle")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("niveles-theme", next);
  });

  /* ---------------- deck ---------------- */
  const slides = $$(".slide");
  const total = slides.length;
  let index = 0;

  $("#totNum").textContent = String(total).padStart(2, "0");

  function setRevealIndexes() {
    slides.forEach(s => {
      $$(".reveal", s).forEach((el, i) => el.style.setProperty("--i", i));
    });
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

  /* swipe */
  let sx = 0, sy = 0, tracking = false;
  const deck = $("#deck");
  deck.addEventListener("pointerdown", e => {
    if (e.target.closest("button, input, .menu, .rail")) return;
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
    b.innerHTML = '<span>' + String(i + 1).padStart(2, "0") + "</span>" + (s.dataset.title || "Diapositiva");
    b.addEventListener("click", () => { goTo(i + 1); closeMenu(); });
    grid.appendChild(b);
  });

  function openMenu()   { menu.classList.add("is-open"); menu.setAttribute("aria-hidden", "false"); }
  function closeMenu()  { menu.classList.remove("is-open"); menu.setAttribute("aria-hidden", "true"); }
  function toggleMenu() { menu.classList.contains("is-open") ? closeMenu() : openMenu(); }

  $("#menuBtn").addEventListener("click", openMenu);
  $("#menuClose").addEventListener("click", closeMenu);
  menu.addEventListener("click", e => { if (e.target === menu) closeMenu(); });

  /* ---------------- rail de niveles ---------------- */
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

  const verbGrid = $("#verbGrid");
  verbGrid?.addEventListener("click", e => {
    const b = e.target.closest(".verb");
    if (!b) return;
    $$(".verb").forEach(v => v.classList.remove("is-active"));
    b.classList.add("is-active");
    const d = VERBS[b.dataset.verb];
    $("#vrLevel").textContent = d.level;
    $("#vrAnalysis").textContent = d.analysis;
    $("#vrExample").innerHTML = "<em>Objetivo modelo:</em> " + d.ex;
  });

  /* ---------------- simulador pretest / postest ---------------- */
  const sim = $("#didSim");
  if (sim) {
    const PRE = 50;
    const gain = $("#gainRange"), mature = $("#matureRange");
    const controlToggle = $("#controlToggle");
    let withControl = true;

    const bar = (k, v) => { const el = $('[data-bar="' + k + '"]'); if (el) el.style.setProperty("--v", v); };
    const val = (k, v) => { const el = $('[data-val="' + k + '"]'); if (el) el.textContent = v; };

    function update() {
      const g = +gain.value, m = +mature.value;
      const tPre = PRE, tPost = PRE + m + g;
      const cPre = PRE, cPost = PRE + m;

      $("#gainVal").textContent = g;
      $("#matureVal").textContent = m;

      bar("treat-pre", tPre);  val("treat-pre", tPre);
      bar("treat-post", tPost); val("treat-post", tPost);
      bar("control-pre", cPre); val("control-pre", cPre);
      bar("control-post", cPost); val("control-post", cPost);

      $("#naiveVal").textContent = (tPost - tPre > 0 ? "+" : "") + (tPost - tPre);

      const grp = $('[data-group="control"]');
      grp.classList.toggle("is-off", !withControl);
      $(".group-lab", grp).textContent = withControl ? "Grupo control" : "Sin grupo control";

      controlToggle.setAttribute("aria-checked", String(withControl));
      $("#controlState").textContent = withControl ? "activo" : "desactivado";

      if (withControl) {
        const net = (tPost - tPre) - (cPost - cPre);
        $("#netVal").textContent = (net > 0 ? "+" : "") + net;
        $("#netVal").style.color = "var(--good)";
        $("#roNote").textContent = "El grupo control también mejoró " + m + " puntos: sin él, esos puntos se habrían atribuido al programa.";
      } else {
        $("#netVal").textContent = "—";
        $("#netVal").style.color = "var(--muted)";
        $("#roNote").textContent = "Con un solo grupo el efecto neto no es estimable: la mejora mezcla el programa, la maduración, el efecto del test y la regresión a la media.";
      }
    }

    gain.addEventListener("input", update);
    mature.addEventListener("input", update);
    controlToggle.addEventListener("click", () => { withControl = !withControl; update(); });
    update();
  }

  /* ---------------- simulador de betas ---------------- */
  const beta = $("#betaSim");
  if (beta) {
    const MODELS = {
      1: { b0: 40, b1: 1.9, name: "Modelo 1" },
      2: { b0: 24, b1: 0.7, b2: 0.2, b3: 2.5, name: "Modelo 2" }
    };
    let model = 1;

    const hR = $("#hRange"), aR = $("#aRange"), nR = $("#nRange");

    function update() {
      const h = +hR.value, a = +aR.value, n = +nR.value;
      $("#hVal").textContent = h;
      $("#aVal").textContent = a;
      $("#nVal").textContent = n;

      const controlsOn = model === 2;
      $("#asistCtl").style.opacity = controlsOn ? "1" : ".4";
      $("#nseCtl").style.opacity = controlsOn ? "1" : ".4";
      aR.disabled = nR.disabled = !controlsOn;

      let y, eq, read;

      if (!controlsOn) {
        const m = MODELS[1];
        y = m.b0 + m.b1 * h;
        eq = "Ŷ = " + m.b0 + " + " + fmt(m.b1, 2) + " · " + h + " = " + fmt(y);
        read = "Por cada hora adicional de estudio, la nota sube <strong>" + fmt(m.b1, 2) + " puntos</strong>. Sin controles, ese es todo el efecto observado.";
        $("#betaNote").textContent = "";
      } else {
        const m = MODELS[2];
        y = m.b0 + m.b1 * h + m.b2 * a + m.b3 * n;
        eq = "Ŷ = " + m.b0 + " + " + fmt(m.b1, 2) + " · " + h + " + " + fmt(m.b2, 2) + " · " + a + " + " + fmt(m.b3, 1) + " · " + n + " = " + fmt(y);
        read = "Al controlar asistencia y nivel socioeconómico, la beta de horas cae a <strong>" + fmt(m.b1, 2) + " puntos</strong>.";
        $("#betaNote").textContent = "La beta bajó de 1,90 a 0,70: parte del efecto que parecía de las horas era, en realidad, del contexto.";
      }

      $("#yHat").textContent = fmt(y);
      $("#betaEq").textContent = eq;
      $("#betaRead").innerHTML = read;
    }

    $$(".seg").forEach(b => b.addEventListener("click", () => {
      $$(".seg").forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      model = +b.dataset.model;
      update();
    }));

    [hR, aR, nR].forEach(r => r.addEventListener("input", update));
    update();
  }

  /* ---------------- escalera ---------------- */
  const STEPS = [
    {
      name: "Exploratorio",
      q: "¿Qué usos, prácticas y tensiones reportan los docentes al incorporar IA generativa?",
      instrument: "8 entrevistas semiestructuradas",
      analysis: "Análisis temático (no estadístico)",
      verdict: "Categorías y preguntas para estudios posteriores",
      out: "Se obtiene un mapa del problema, no una conclusión."
    },
    {
      name: "Descriptivo",
      q: "¿Cuál es la frecuencia de uso y qué herramientas emplean 120 docentes?",
      instrument: "Encuesta con escala ordinal",
      analysis: "Frecuencias, porcentajes, medias",
      verdict: "Perfil de uso por categoría",
      out: "Un retrato del fenómeno, sin cruzar variables."
    },
    {
      name: "Relacional",
      q: "¿Qué relación existe entre competencia digital y frecuencia de uso de IA?",
      instrument: "Dos escalas aplicadas a la misma muestra",
      analysis: "rho de Spearman",
      verdict: "Coeficiente e interpretación del grado de asociación",
      out: "Se afirma relación, nunca causa."
    },
    {
      name: "Explicativo",
      q: "¿Cuál es el efecto de un programa de capacitación sobre la planificación de sesiones?",
      instrument: "Cuasi experimento con grupo control, pre y post test",
      analysis: "ANOVA de medidas repetidas o regresión con betas",
      verdict: "Efecto atribuible al programa, controlando rivales",
      out: "Aquí se puede hablar de influencia; antes, no."
    },
    {
      name: "Predictivo",
      q: "¿Qué modelo anticipa qué docentes adoptarán IA el próximo semestre?",
      instrument: "Datos de dos cohortes y variables predictoras",
      analysis: "Regresión logística con validación cruzada, AUC-ROC",
      verdict: "Probabilidad individual de adopción",
      out: "Se juzga por acierto fuera de muestra, no por p-valor."
    },
    {
      name: "Aplicativo",
      q: "¿En qué medida el programa mejora la planificación y se sostiene en el tiempo?",
      instrument: "Línea base, indicadores y monitoreo semestral",
      analysis: "CEP: gráficos de control e índices de capacidad",
      verdict: "Proceso institucionalizado y validado",
      out: "El criterio es la sostenibilidad, no el entusiasmo."
    }
  ];

  const panels = $("#ladderPanels");
  if (panels) {
    STEPS.forEach((s, i) => {
      const d = document.createElement("div");
      d.className = "lp" + (i === 0 ? " is-active" : "");
      d.setAttribute("role", "tabpanel");
      d.innerHTML =
        "<div><h3>" + String(i + 1).padStart(2, "0") + " · " + s.name + "</h3>" +
        '<p class="q">“' + s.q + '”</p>' +
        "<dl><dt>Instrumento</dt><dd>" + s.instrument + "</dd>" +
        "<dt>Análisis</dt><dd>" + s.analysis + "</dd>" +
        "<dt>Producto</dt><dd>" + s.verdict + "</dd></dl></div>" +
        '<div class="out"><b>Qué se obtiene</b>' + s.out + "</div>";
      panels.appendChild(d);
    });

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
      qProg.style.width = ((qi) / QUIZ.length) * 100 + "%";
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
