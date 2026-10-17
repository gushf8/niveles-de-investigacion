/* ==========================================================
   Niveles de investigación — deck interactivo
   Casos educativos · navegación por niveles
   ========================================================== */
(function () {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const fmt = (n, d = 1) => n.toFixed(d).replace(".", ",");
  const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
  const sd = a => {
    const m = mean(a);
    return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1));
  };

  /* ---------------- base de datos: 30 estudiantes ---------------- */
  const DATA = [
    { id:"C01", g:"Control", preT:60.4, postT:61.7, preA:55.0, postA:55.9, preS:62.1, postS:63.9, preE:64.1, postE:65.3, horas:8.0, gasto:62, herm:2, rend:9.7 },
    { id:"C02", g:"Control", preT:48.2, postT:51.7, preA:41.3, postA:44.8, preS:50.8, postS:54.8, preE:52.5, postE:55.5, horas:11.8, gasto:240, herm:2, rend:14.6 },
    { id:"C03", g:"Control", preT:71.1, postT:73.2, preA:70.8, postA:73.0, preS:74.7, postS:75.5, preE:67.8, postE:71.2, horas:14.5, gasto:249, herm:0, rend:15.5 },
    { id:"C04", g:"Control", preT:61.2, postT:63.8, preA:57.9, postA:59.8, preS:59.3, postS:61.4, preE:66.5, postE:70.3, horas:7.4, gasto:167, herm:1, rend:12.9 },
    { id:"C05", g:"Control", preT:49.7, postT:51.8, preA:52.1, postA:55.0, preS:47.0, postS:49.7, preE:50.2, postE:50.7, horas:11.4, gasto:161, herm:1, rend:12.2 },
    { id:"C06", g:"Control", preT:63.7, postT:66.7, preA:57.9, postA:60.6, preS:65.7, postS:68.5, preE:67.4, postE:71.0, horas:5.1, gasto:157, herm:2, rend:10.8 },
    { id:"C07", g:"Control", preT:66.1, postT:68.5, preA:73.0, postA:74.5, preS:64.8, postS:66.7, preE:60.6, postE:64.4, horas:5.4, gasto:41, herm:1, rend:10.4 },
    { id:"C08", g:"Control", preT:50.8, postT:53.3, preA:48.5, postA:50.8, preS:44.7, postS:48.0, preE:59.2, postE:61.1, horas:5.4, gasto:62, herm:3, rend:11.1 },
    { id:"C09", g:"Control", preT:47.8, postT:50.7, preA:53.3, postA:55.8, preS:50.2, postS:53.5, preE:40.0, postE:42.9, horas:9.1, gasto:172, herm:2, rend:12.3 },
    { id:"C10", g:"Control", preT:54.6, postT:57.3, preA:51.4, postA:53.5, preS:54.8, postS:56.9, preE:57.7, postE:61.4, horas:8.7, gasto:88, herm:2, rend:10.8 },
    { id:"C11", g:"Control", preT:70.7, postT:71.6, preA:67.6, postA:67.8, preS:74.1, postS:75.3, preE:70.4, postE:71.8, horas:6.6, gasto:152, herm:2, rend:12.2 },
    { id:"C12", g:"Control", preT:55.5, postT:58.7, preA:54.6, postA:56.0, preS:53.8, postS:57.7, preE:58.1, postE:62.4, horas:7.9, gasto:182, herm:1, rend:13.8 },
    { id:"C13", g:"Control", preT:46.6, postT:48.7, preA:40.6, postA:42.2, preS:53.4, postS:55.5, preE:45.7, postE:48.4, horas:6.9, gasto:62, herm:1, rend:10.6 },
    { id:"C14", g:"Control", preT:59.0, postT:60.6, preA:59.6, postA:59.4, preS:58.5, postS:61.2, preE:58.8, postE:61.1, horas:6.5, gasto:104, herm:3, rend:7.7 },
    { id:"C15", g:"Control", preT:73.1, postT:76.0, preA:68.2, postA:70.2, preS:73.9, postS:77.4, preE:77.3, postE:80.6, horas:14.7, gasto:230, herm:1, rend:14.9 },
    { id:"E01", g:"Experimental", preT:65.1, postT:74.8, preA:67.5, postA:80.0, preS:64.5, postS:72.5, preE:63.4, postE:71.8, horas:9.4, gasto:123, herm:2, rend:12.3 },
    { id:"E02", g:"Experimental", preT:46.6, postT:54.7, preA:46.4, postA:56.3, preS:49.3, postS:57.4, preE:44.1, postE:50.4, horas:11.8, gasto:168, herm:1, rend:11.8 },
    { id:"E03", g:"Experimental", preT:59.9, postT:69.8, preA:55.9, postA:67.5, preS:63.7, postS:73.0, preE:59.9, postE:68.8, horas:2.0, gasto:79, herm:2, rend:6.3 },
    { id:"E04", g:"Experimental", preT:58.1, postT:67.2, preA:54.7, postA:67.3, preS:57.6, postS:65.9, preE:62.1, postE:68.5, horas:8.1, gasto:94, herm:3, rend:12.7 },
    { id:"E05", g:"Experimental", preT:60.8, postT:70.2, preA:60.0, postA:74.8, preS:58.9, postS:67.4, preE:63.4, postE:68.3, horas:2.4, gasto:117, herm:3, rend:7.2 },
    { id:"E06", g:"Experimental", preT:62.6, postT:70.7, preA:55.6, postA:68.9, preS:64.9, postS:73.0, preE:67.1, postE:70.3, horas:9.5, gasto:144, herm:1, rend:14.4 },
    { id:"E07", g:"Experimental", preT:48.0, postT:57.9, preA:50.1, postA:62.2, preS:51.1, postS:62.6, preE:42.8, postE:48.8, horas:7.5, gasto:109, herm:1, rend:10.4 },
    { id:"E08", g:"Experimental", preT:61.8, postT:70.3, preA:65.7, postA:80.3, preS:59.7, postS:64.9, preE:60.1, postE:65.6, horas:11.1, gasto:160, herm:2, rend:12.8 },
    { id:"E09", g:"Experimental", preT:55.0, postT:64.2, preA:50.2, postA:63.7, preS:61.8, postS:70.3, preE:52.9, postE:58.7, horas:9.8, gasto:136, herm:1, rend:13.8 },
    { id:"E10", g:"Experimental", preT:65.7, postT:74.4, preA:63.8, postA:78.5, preS:68.7, postS:77.0, preE:64.6, postE:67.7, horas:4.1, gasto:64, herm:2, rend:7.5 },
    { id:"E11", g:"Experimental", preT:72.3, postT:81.4, preA:73.2, postA:84.2, preS:79.1, postS:85.8, preE:64.5, postE:74.1, horas:7.1, gasto:233, herm:2, rend:11.5 },
    { id:"E12", g:"Experimental", preT:50.1, postT:59.7, preA:47.2, postA:61.1, preS:49.9, postS:59.3, preE:53.2, postE:58.7, horas:6.5, gasto:192, herm:3, rend:8.7 },
    { id:"E13", g:"Experimental", preT:50.1, postT:60.3, preA:48.6, postA:63.6, preS:49.0, postS:57.2, preE:52.7, postE:60.0, horas:8.7, gasto:124, herm:1, rend:11.1 },
    { id:"E14", g:"Experimental", preT:71.1, postT:79.7, preA:76.8, postA:88.2, preS:67.1, postS:76.1, preE:69.5, postE:74.7, horas:7.0, gasto:194, herm:3, rend:11.4 },
    { id:"E15", g:"Experimental", preT:56.9, postT:68.0, preA:63.4, postA:77.2, preS:62.6, postS:75.2, preE:44.8, postE:51.6, horas:13.8, gasto:166, herm:0, rend:15.6 }
  ];

  const C = DATA.filter(d => d.g === "Control");
  const E = DATA.filter(d => d.g === "Experimental");

  /* ---------------- estadística ---------------- */
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
      const t = A[c]; A[c] = A[piv]; A[piv] = t;
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

  function pearson(x, y) {
    const mx = mean(x), my = mean(y);
    let num = 0, dx = 0, dy = 0;
    for (let i = 0; i < x.length; i++) {
      num += (x[i] - mx) * (y[i] - my);
      dx += (x[i] - mx) ** 2;
      dy += (y[i] - my) ** 2;
    }
    return num / Math.sqrt(dx * dy);
  }

  const Y = DATA.map(d => d.rend);
  const M1 = ols(DATA.map(d => [1, d.horas]), Y);
  const M2 = ols(DATA.map(d => [1, d.horas, d.gasto, d.herm]), Y);

  /* ---------------- pirámide de niveles ---------------- */
  const PYRAMID = [
    { n: "Aplicativo",   a: "Mejora continua", c: "#059669" },
    { n: "Predictivo",   a: "Modelamiento",    c: "#10b981" },
    { n: "Explicativo",  a: "Multivariado",    c: "#7c3aed" },
    { n: "Relacional",   a: "Bivariado",       c: "#a78bfa" },
    { n: "Descriptivo",  a: "Univariado",      c: "#0891b2" },
    { n: "Exploratorio", a: "No estadístico",  c: "#22d3ee" }
  ];

  const pyramidEl = $("#pyramid");
  if (pyramidEl) {
    const W = 240, H = 300, CX = 120, HALF = 118, step = H / PYRAMID.length;
    const bands = PYRAMID.map((lvl, i) => {
      const y0 = i * step, y1 = (i + 1) * step;
      const h0 = (y0 / H) * HALF, h1 = (y1 / H) * HALF;
      const pts = CX + "," + y0 + " " + (CX + h0) + "," + y0 + " " +
                  (CX + h1) + "," + y1 + " " + (CX - h1) + "," + y1 + " " +
                  (CX - h0) + "," + y0;
      return '<polygon class="pyr-band" points="' + pts + '" fill="' + lvl.c +
             '" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round"></polygon>';
    }).join("");

    pyramidEl.innerHTML =
      '<svg class="pyr-svg" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true">' + bands + "</svg>" +
      '<div class="pyr-legend">' + PYRAMID.map(l =>
        '<div class="pyr-item"><i style="background:' + l.c + '"></i><div><b>' + l.n + "</b><span>" + l.a + "</span></div></div>"
      ).join("") + "</div>";
  }

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
    try { history.replaceState(null, "", "#/" + num); } catch (_) {}

    const active = slides[index];
    active.scrollTop = 0;
    const gi = slideGroup[index];
    $$(".ln-item").forEach((it, i) => it.classList.toggle("is-active", i === gi));
    $("#topPage").textContent = String(num).padStart(2, "0") + " / " + total;
    document.title = (active.dataset.label || "Niveles") + " · " + (active.dataset.group || "");

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
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    switch (e.key) {
      case "ArrowRight": case "PageDown": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft":  case "PageUp":  e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); goTo(1); break;
      case "End":  e.preventDefault(); goTo(total); break;
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

  /* ---------------- navegación por niveles en el header ---------------- */
  const nav = $("#levelNav");

  const ANALYSIS = {
    "General": "", "Cierre": "",
    "01": "No estadístico", "02": "Univariado", "03": "Bivariado",
    "04": "Multivariado", "05": "Modelamiento", "06": "Mejora continua"
  };

  const groups = [];
  const slideGroup = [];
  slides.forEach((s, i) => {
    const g = s.dataset.group || "General";
    let gi = groups.findIndex(x => x.name === g);
    if (gi === -1) { groups.push({ name: g, items: [] }); gi = groups.length - 1; }
    groups[gi].items.push({ n: i, label: s.dataset.label || "Página" });
    slideGroup[i] = gi;
  });

  const caret = "";

  nav.innerHTML = groups.map((g, gi) => {
    const code = g.name.slice(0, 2);
    const isLevel = /^\d/.test(code);
    const num = isLevel ? code : "";
    const title = isLevel ? g.name.slice(4).trim() : g.name;
    return '<div class="ln-item' + (isLevel ? "" : " is-plain") + '" data-g="' + gi + '" data-first="' + g.items[0].n + '">' +
      '<button class="ln-trigger" title="Ir a ' + title + '">' +
        (num ? '<span class="ln-num">' + num + "</span>" : "") +
        '<span class="ln-name">' + title + "</span>" + caret +
      "</button>" +
    "</div>";
  }).join("");

  nav.addEventListener("click", e => {
    const trigger = e.target.closest(".ln-trigger");
    if (!trigger) return;
    const item = trigger.parentElement;
    goTo(+item.dataset.first + 1);
  });

  /* ---------------- filtro rápido del rail ---------------- */
  const railMap = { exploratorio: 4, descriptivo: 6, relacional: 8, explicativo: 12, predictivo: 16, aplicativo: 19 };
  $$(".rail-item").forEach(b => b.addEventListener("click", () => goTo(railMap[b.dataset.level] || 2)));

  /* ---------------- verbos ---------------- */
  const VERBS = {
    explorar:     { level: "Exploratorio", analysis: "Análisis no estadístico", ex: "Explorar las prácticas de estudio que aparecen en un contexto donde el tema no ha sido investigado.", note: "Explorar no estima parámetros ni prueba hipótesis: identifica categorías, describe el terreno y formula preguntas." },
    analizar:     { level: "Depende del análisis", analysis: "El verbo no basta", ex: "«Analizar la autoestima de los estudiantes»: no dice si se describe, se relaciona o se explica.", note: "Analizar es una acción, no un nivel. Se analiza para describir, para relacionar o para explicar. Si el objetivo solo dice «analizar», el nivel queda indeterminado hasta saber qué se analiza y con qué análisis." },
    identificar:  { level: "Exploratorio", analysis: "Análisis no estadístico", ex: "Identificar las situaciones en que los estudiantes dicen sentirse inseguros en clase." },
    interpretar:  { level: "Exploratorio", analysis: "Análisis no estadístico", ex: "Interpretar cómo los estudiantes explican su propia autoestima." },
    describir:    { level: "Descriptivo",  analysis: "Estadística univariada", ex: "Describir el nivel de autoestima de los 30 estudiantes y sus tres dimensiones." },
    estimar:      { level: "Descriptivo",  analysis: "Estadística univariada", ex: "Estimar la autoestima media de toda la promoción, con su intervalo de confianza.", note: "Estimar un parámetro (una media o una proporción) es descriptivo. Estimar los betas de un modelo es explicativo; estimar un caso nuevo es predictivo." },
    comparar:     { level: "Relacional",   analysis: "Estadística bivariada",  ex: "Comparar la autoestima entre quienes practican deporte y quienes no." },
    asociar:      { level: "Relacional",   analysis: "Estadística bivariada",  ex: "Asociar las horas de estudio con el rendimiento académico." },
    evidenciar:   { level: "Explicativo",  analysis: "Estadística multivariada", ex: "Evidenciar el efecto de las horas de estudio sobre la nota, controlando hermanos y gasto." },
    demostrar:    { level: "Explicativo",  analysis: "Estadística multivariada", ex: "Demostrar que el taller de autoestima produce mejora, con grupo control y pre y post test." },
    predecir:     { level: "Predictivo",   analysis: "Modelamiento predictivo", ex: "Predecir la probabilidad de reprobar de cada estudiante." },
    pronosticar:  { level: "Predictivo",   analysis: "Modelamiento predictivo", ex: "Pronosticar en qué bimestre es más probable que el estudiante baje su autoestima." },
    evaluar:      { level: "Aplicativo",   analysis: "Mejora continua", ex: "Evaluar la línea base y el monitoreo del taller en tres secciones." },
    controlar:    { level: "Aplicativo",   analysis: "Mejora continua", ex: "Controlar que la autoestima media se mantenga sobre 66 durante dos años." }
  };

  $("#verbGrid")?.addEventListener("click", e => {
    const b = e.target.closest(".verb");
    if (!b) return;
    $$(".verb").forEach(v => v.classList.remove("is-active"));
    b.classList.add("is-active");
    const d = VERBS[b.dataset.verb];
    $("#vrLevel").textContent = d.level;
    $("#vrAnalysis").textContent = d.analysis;
    $("#vrExample").innerHTML = "<em>Objetivo modelo:</em> " + d.ex +
      (d.note ? '<span class="vr-note">' + d.note + "</span>" : "");
  });

  /* ---------------- página 7: descriptivo ---------------- */
  if ($("#dimTable")) {
    const preT = DATA.map(d => d.preT);
    const low = preT.filter(v => v < 55).length;

    $("#dMean").textContent = fmt(mean(preT), 1);
    $("#dSd").textContent = fmt(sd(preT), 1);
    $("#dMin").textContent = fmt(Math.min(...preT), 1);
    $("#dMax").textContent = fmt(Math.max(...preT), 1);
    $("#dLow").textContent = Math.round((low / preT.length) * 100) + " %";
    $("#dSay").textContent = fmt(mean(preT), 1);

    const dims = [
      { k: "preT", n: "Autoestima total", r: "Punto de partida del grupo" },
      { k: "preA", n: "Dimensión académica", r: "La más baja: imagen de sí como estudiante" },
      { k: "preS", n: "Dimensión social", r: "La más alta: relación con los pares" },
      { k: "preE", n: "Dimensión emocional", r: "Intermedia: manejo de la frustración" }
    ];

    $("#dimTable").innerHTML = dims.map(d => {
      const v = DATA.map(x => x[d.k]);
      return "<tr><td>" + d.n + "</td><td>" + fmt(mean(v), 1) + "</td><td>" + fmt(sd(v), 1) +
        "</td><td>" + fmt(Math.min(...v), 1) + "</td><td>" + fmt(Math.max(...v), 1) +
        "</td><td>" + d.r + "</td></tr>";
    }).join("");

    $("#tblDesc").innerHTML = DATA.map(d =>
      "<tr><td>" + d.id + "</td><td>" + fmt(d.preT, 1) + "</td><td>" + fmt(d.preA, 1) +
      "</td><td>" + fmt(d.preS, 1) + "</td><td>" + fmt(d.preE, 1) + "</td></tr>"
    ).join("");
  }

  /* ---------------- página 9: relacional ---------------- */
  if ($("#rVal")) {
    const r = pearson(DATA.map(d => d.horas), DATA.map(d => d.rend));
    $("#rVal").textContent = fmt(r, 2);
    $("#rVal2").textContent = fmt(r, 2);
    $("#rBig").textContent = fmt(r, 2);
    $("#r2Big").textContent = fmt(r * r, 2);

    $("#tblRel").innerHTML = DATA.map(d =>
      "<tr><td>" + d.id + '</td><td><span class="grp ' + (d.g === "Control" ? "c" : "e") + '">' +
      (d.g === "Control" ? "Control" : "Exper.") + "</span></td><td>" + fmt(d.horas, 1) +
      "</td><td>" + fmt(d.rend, 1) + "</td></tr>"
    ).join("");

    // dispersión + recta de mínimos cuadrados
    const svg = $("#scatter");
    if (svg) {
      const W = 320, H = 150, PAD = 10;
      const xs = DATA.map(d => d.horas), ys = DATA.map(d => d.rend);
      const x0 = Math.min(...xs), x1 = Math.max(...xs);
      const y0 = Math.min(...ys), y1 = Math.max(...ys);
      const px = v => PAD + ((v - x0) / (x1 - x0)) * (W - 2 * PAD);
      const py = v => H - PAD - ((v - y0) / (y1 - y0)) * (H - 2 * PAD);

      const grid = [0.25, 0.5, 0.75].map(f =>
        '<line x1="' + PAD + '" y1="' + (PAD + f * (H - 2 * PAD)) + '" x2="' + (W - PAD) +
        '" y2="' + (PAD + f * (H - 2 * PAD)) + '" stroke="rgba(15,23,42,.09)" stroke-width="1"/>'
      ).join("");

      const dots = DATA.map(d =>
        '<circle cx="' + px(d.horas).toFixed(1) + '" cy="' + py(d.rend).toFixed(1) +
        '" r="3" fill="' + (d.g === "Control" ? "#0891b2" : "#7c3aed") +
        '" fill-opacity=".62" stroke="#fff" stroke-width=".9"/>'
      ).join("");

      const sl = ols(DATA.map(d => [1, d.horas]), DATA.map(d => d.rend)).b;
      const line = '<line x1="' + px(x0) + '" y1="' + py(sl[0] + sl[1] * x0) +
        '" x2="' + px(x1) + '" y2="' + py(sl[0] + sl[1] * x1) +
        '" stroke="#1d4ed8" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>';

      svg.innerHTML = grid + line + dots;
    }
  }

  /* ---------------- página 11: pretest–postest ---------------- */
  const tblPre = $("#tblPre");
  if (tblPre) {
    tblPre.innerHTML = DATA.map(d => {
      const delta = d.postT - d.preT;
      return "<tr>" +
        "<td>" + d.id + "</td>" +
        '<td><span class="grp ' + (d.g === "Control" ? "c" : "e") + '">' + (d.g === "Control" ? "Control" : "Exper.") + "</span></td>" +
        "<td>" + fmt(d.preT, 1) + "</td>" +
        "<td>" + fmt(d.postT, 1) + "</td>" +
        '<td class="delta">+' + fmt(delta, 1) + "</td>" +
      "</tr>";
    }).join("");

    const avg = (arr, k) => mean(arr.map(d => d[k]));
    const pairs = [
      { n: "Autoestima total", a: "preT", b: "postT" },
      { n: "Dimensión académica", a: "preA", b: "postA" },
      { n: "Dimensión social", a: "preS", b: "postS" },
      { n: "Dimensión emocional", a: "preE", b: "postE" }
    ];

    $("#dimEffect").innerHTML = pairs.map(p => {
      const preE = avg(E, p.a), postE = avg(E, p.b);
      const dE = postE - preE;
      const dC = avg(C, p.b) - avg(C, p.a);
      return "<tr><td>" + p.n + "</td><td>" + fmt(preE, 1) + "</td><td>" + fmt(postE, 1) +
        '</td><td class="delta">+' + fmt(dE, 1) + "</td><td>+" + fmt(dC, 1) + "</td></tr>";
    }).join("");

    const dExp = avg(E, "postT") - avg(E, "preT");
    const dCtl = avg(C, "postT") - avg(C, "preT");
    let withControl = true;

    function renderDiD() {
      $("#eDelta").textContent = "+" + fmt(dExp, 1);
      $("#controlToggle").setAttribute("aria-checked", String(withControl));
      $("#controlState").textContent = withControl ? "activo" : "desactivado";

      if (withControl) {
        $("#netVal").textContent = "+" + fmt(dExp - dCtl, 1);
        $("#netVal").style.color = "";
        $("#roNote").textContent = "El grupo sin taller mejoró " + fmt(dCtl, 1) +
          " puntos por su cuenta. El efecto que se puede atribuir al taller es la diferencia: " + fmt(dExp - dCtl, 1) + " puntos.";
      } else {
        $("#netVal").textContent = "—";
        $("#netVal").style.color = "var(--muted)";
        $("#roNote").textContent = "Con un solo grupo el efecto neto no es estimable: la mejora mezcla el taller, la maduración, el efecto del test y la regresión a la media.";
      }
    }

    $("#controlToggle").addEventListener("click", () => { withControl = !withControl; renderDiD(); });
    renderDiD();
  }

  /* ---------------- página 12: betas ---------------- */
  const tblBeta = $("#tblBeta");
  if (tblBeta) {
    let model = 1;
    let selected = null;

    tblBeta.innerHTML = DATA.map((d, i) =>
      '<tr data-i="' + i + '"><td>' + d.id + "</td><td>" + fmt(d.horas, 1) +
      "</td><td>" + d.gasto + "</td><td>" + d.herm + "</td><td>" + fmt(d.rend, 1) + "</td></tr>"
    ).join("");

    const predict = (d, m) => m === 1
      ? M1.b[0] + M1.b[1] * d.horas
      : M2.b[0] + M2.b[1] * d.horas + M2.b[2] * d.gasto + M2.b[3] * d.herm;

    function renderBeta() {
      const m = model === 1 ? M1 : M2;
      $("#betaEq").textContent = model === 1
        ? "Ŷ = " + fmt(M1.b[0], 2) + " + " + fmt(M1.b[1], 2) + " · Horas   ·   R² = " + fmt(M1.r2, 2)
        : "Ŷ = " + fmt(M2.b[0], 2) + " + " + fmt(M2.b[1], 2) + "·Horas + " + fmt(M2.b[2], 3) + "·Gasto − " + fmt(Math.abs(M2.b[3]), 2) + "·Hermanos   ·   R² = " + fmt(M2.r2, 2);

      const rows = [];
      rows.push({
        k: "Horas de estudio", v: fmt(m.b[1], 2), key: true, drop: model === 2,
        why: "Cada hora adicional " + (model === 1 ? "sube la nota " + fmt(m.b[1], 2) : "sube la nota " + fmt(m.b[1], 2))
      });
      if (model === 2) {
        rows.push({ k: "Gasto en materiales (S/)", v: fmt(M2.b[2], 3), why: "Cada S/ 100 extra: " + fmt(M2.b[2] * 100, 2) + " puntos" });
        rows.push({ k: "Número de hermanos", v: fmt(M2.b[3], 2), why: "Cada hermano adicional resta " + fmt(Math.abs(M2.b[3]), 2) + " puntos" });
      }
      rows.push({
        k: "Intercepto", v: fmt(m.b[0], 2),
        why: model === 1 ? "Nota esperada con 0 horas" : "Sin interpretación: nadie tiene 0 en todo"
      });

      $("#betaTable tbody").innerHTML = rows.map(r =>
        "<tr" + (r.key ? ' class="is-key' + (r.drop ? " is-drop" : "") + '"' : "") + ">" +
        "<td>" + r.k + "</td><td>" + r.v + "</td><td>" + r.why + "</td></tr>"
      ).join("");

      if (model === 1) {
        $("#betaRead").innerHTML = "Con un solo predictor: por cada hora adicional de estudio, la nota sube <strong>" +
          fmt(M1.b[1], 2) + " puntos</strong>. Pero este modelo no descuenta nada más.";
        $("#betaNote").textContent = "Cuidado: la beta de horas absorbe el efecto de todo lo que no está en el modelo.";
      } else {
        $("#betaRead").innerHTML = "Al controlar las otras dos variables, cada hora adicional sube <strong>" +
          fmt(M2.b[1], 2) + " puntos</strong>, y cada hermano <strong>baja " + fmt(Math.abs(M2.b[3]), 2) + " puntos</strong>.";
        $("#betaNote").textContent = "La beta de horas cayó de " + fmt(M1.b[1], 2) + " a " + fmt(M2.b[1], 2) +
          ": parte de esa asociación era, en realidad, tener menos hermanos.";
      }

      if (selected !== null) {
        const d = DATA[selected];
        $("#betaSel").innerHTML = "<b>" + d.id + "</b> · predicho " + fmt(predict(d, model), 1) + " · real " + fmt(d.rend, 1);
      }
    }

    tblBeta.addEventListener("click", e => {
      const tr = e.target.closest("tr");
      if (!tr) return;
      $$("#tblBeta tr").forEach(r => r.classList.remove("is-sel"));
      tr.classList.add("is-sel");
      selected = +tr.dataset.i;
      const d = DATA[selected];
      $("#betaSel").innerHTML = "<b>" + d.id + "</b> · predicho " + fmt(predict(d, model), 1) + " · real " + fmt(d.rend, 1);
    });

    $$(".seg").forEach(b => b.addEventListener("click", () => {
      $$(".seg").forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      model = +b.dataset.model;
      renderBeta();
    }));

    renderBeta();
  }

  /* ---------------- página 10: calculadora 2x2 ---------------- */
  if ($("#cellA")) {
    const cells = ["cellA", "cellB", "cellC", "cellD"].map(id => $("#" + id));

    const erf = x => {
      const s = Math.sign(x); x = Math.abs(x);
      const t = 1 / (1 + 0.3275911 * x);
      const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
      return s * y;
    };
    const phi = z => 0.5 * (1 + erf(z / Math.SQRT2));

    function updateCalc() {
      const [a, b, c, d] = cells.map(i => Math.max(0, Math.min(99, parseInt(i.value, 10) || 0)));
      const n = a + b + c + d;
      const OR = (b * c) === 0 ? Infinity : (a * d) / (b * c);
      const den = (a + b) * (c + d) * (a + c) * (b + d);
      const chi = den === 0 ? 0 : n * Math.pow(a * d - b * c, 2) / den;
      const p = den === 0 ? 1 : 2 * (1 - phi(Math.sqrt(chi)));

      $("#orVal").textContent = isFinite(OR) ? fmt(OR, 2) : "∞";
      $("#chiVal").textContent = fmt(chi, 2);
      $("#pVal").textContent = p < 0.001 ? "< 0,001" : fmt(p, 3);

      let txt = "";
      if (!isFinite(OR)) {
        txt = "Hay una celda en cero: el OR no se puede calcular. Ocurre cuando un grupo no tiene ningún caso en una categoría.";
      } else if (Math.abs(OR - 1) < 0.001) {
        txt = "OR = 1: no hay asociación, la proporción de nota alta es la misma en mujeres y varones. ";
      } else {
        const mayor = OR > 1 ? "las mujeres" : "los varones";
        const veces = OR > 1 ? OR : 1 / OR;
        txt = "En palabras simples: las chances de tener <strong>nota alta</strong> son <strong>" +
          fmt(veces, 2) + " veces mayores</strong> en " + mayor + ". ";
      }
      if (isFinite(OR)) {
        txt += p < 0.05
          ? "Y el χ² sí alcanza significancia (p < 0,05): la diferencia no parece obra del azar."
          : "Pero con n = " + n + ", el χ² no alcanza el 5 %: una diferencia así puede aparecer por azar.";
      }
      $("#calcRead").innerHTML = txt;
    }

    cells.forEach(i => i.addEventListener("input", updateCalc));
    updateCalc();
  }

  /* ---------------- página 14: matriz de pruebas ---------------- */
  const TESTS = {
    chi_bondad: { name:"χ² de bondad de ajuste", short:"χ² bondad", np:true, nivel:"Descriptivo", diseno:"Transversal · un grupo", tipo:"No paramétrica", variable:"Categórica",
      q:"¿La distribución observada se ajusta a la esperada?", ej:"¿Los 30 estudiantes se reparten por igual entre las tres secciones?",
      nota:"Es univariable: por eso es descriptivo, no relacional." },
    binomial: { name:"Prueba binomial", short:"Binomial", np:true, nivel:"Descriptivo", diseno:"Transversal · un grupo", tipo:"No paramétrica", variable:"Nominal dicotómica",
      q:"¿La proporción observada difiere de un valor de referencia?", ej:"¿La proporción con autoestima alta supera el 50 %?" },
    t_1m: { name:"t de Student para una muestra", short:"t · una muestra", np:false, nivel:"Descriptivo", diseno:"Transversal · un grupo", tipo:"Paramétrica", variable:"Numérica",
      q:"¿La media difiere de un valor de referencia?", ej:"¿La nota media del grupo difiere de 14?",
      nota:"Contrastar con un parámetro es un objetivo del nivel descriptivo." },
    chi_homog: { name:"χ² de homogeneidad", short:"χ² homogeneidad", np:true, nivel:"Relacional", diseno:"Transversal · 2 o más grupos independientes", tipo:"No paramétrica", variable:"Nominal",
      q:"¿La distribución del desenlace difiere entre grupos?", ej:"¿La proporción con autoestima alta difiere entre quienes llevaron el taller y quienes no?" },
    yates: { name:"Corrección de Yates", short:"Yates", np:true, nivel:"Relacional", diseno:"Transversal · 2 grupos independientes", tipo:"No paramétrica", variable:"Nominal dicotómica (2×2)",
      q:"Igual que el χ², corregido para tablas 2×2.", ej:"Taller sí/no × autoestima alta sí/no, con pocos casos por celda." },
    fisher: { name:"Test exacto de Fisher", short:"Fisher", np:true, nivel:"Relacional", diseno:"Transversal · 2 grupos independientes", tipo:"No paramétrica", variable:"Nominal dicotómica (2×2)",
      q:"¿Hay asociación cuando las frecuencias son muy pequeñas?", ej:"Tabla 2×2 con celdas menores de 5 casos." },
    u_mann: { name:"U de Mann-Whitney", short:"U Mann-Whitney", np:true, nivel:"Relacional", diseno:"Transversal · 2 grupos independientes", tipo:"No paramétrica", variable:"Ordinal",
      q:"¿Difieren dos grupos en una variable ordinal?", ej:"¿La autoestima ordinal difiere entre dos secciones?" },
    t_indep: { name:"t de Student para muestras independientes", short:"t · independientes", np:false, nivel:"Relacional", diseno:"Transversal · 2 grupos independientes", tipo:"Paramétrica", variable:"Numérica",
      q:"¿Difieren las medias de dos grupos?", ej:"¿La nota media difiere entre quienes llevaron el taller y quienes no?",
      nota:"Solo es explicativa si los grupos provienen de una intervención controlada." },
    kruskal: { name:"H de Kruskal-Wallis", short:"Kruskal-Wallis", np:true, nivel:"Relacional", diseno:"Transversal · 3 o más grupos independientes", tipo:"No paramétrica", variable:"Ordinal",
      q:"¿Difieren tres o más grupos?", ej:"¿La autoestima difiere entre 3.º, 4.º y 5.º?" },
    anova1: { name:"ANOVA de un factor", short:"ANOVA 1 factor", np:false, nivel:"Relacional", diseno:"Transversal · 3 o más grupos independientes", tipo:"Paramétrica", variable:"Numérica",
      q:"¿Difieren las medias de tres o más grupos?", ej:"¿La nota media difiere entre tres secciones?" },
    mcnemar: { name:"Prueba de McNemar", short:"McNemar", np:true, nivel:"Relacional", diseno:"Longitudinal · 2 medidas relacionadas", tipo:"No paramétrica", variable:"Nominal dicotómica",
      q:"¿Cambió la proporción entre dos mediciones?", ej:"¿Cuántos pasaron de autoestima baja a alta tras el taller?",
      nota:"Si compara antes y después de una intervención, el diseño es pre experimental y el nivel pasa a explicativo." },
    cochran: { name:"Q de Cochran", short:"Q de Cochran", np:true, nivel:"Relacional", diseno:"Longitudinal · 3 o más medidas relacionadas", tipo:"No paramétrica", variable:"Nominal dicotómica",
      q:"¿Cambia la proporción a lo largo de varias mediciones?", ej:"¿La proporción con autoestima alta cambió en tres bimestres?" },
    wilcoxon: { name:"Wilcoxon de rangos con signo", short:"Wilcoxon", np:true, nivel:"Relacional", diseno:"Longitudinal · 2 medidas relacionadas", tipo:"No paramétrica", variable:"Ordinal",
      q:"¿Cambió la variable entre dos mediciones?", ej:"¿Subió la autoestima ordinal del pretest al postest?" },
    t_rel: { name:"t de Student para muestras relacionadas", short:"t · relacionada", np:false, nivel:"Relacional / Explicativo", diseno:"Longitudinal · 2 medidas relacionadas", tipo:"Paramétrica", variable:"Numérica",
      q:"¿Cambió la media entre dos mediciones?", ej:"¿La autoestima media subió del pretest al postest?",
      nota:"Con grupo de comparación y una intervención, es el diseño pre experimental: nivel explicativo." },
    friedman: { name:"Prueba de Friedman", short:"Friedman", np:true, nivel:"Relacional", diseno:"Longitudinal · 3 o más medidas relacionadas", tipo:"No paramétrica", variable:"Ordinal",
      q:"¿Cambió la variable en tres o más mediciones?", ej:"¿La autoestima ordinal cambió en tres bimestres?" },
    anova_mr: { name:"ANOVA de medidas repetidas", short:"ANOVA medidas rep.", np:false, nivel:"Relacional / Explicativo", diseno:"Longitudinal · 3 o más medidas relacionadas", tipo:"Paramétrica", variable:"Numérica",
      q:"¿Cambian las medias a lo largo del tiempo o entre grupos?", ej:"¿La autoestima media evolucionó en los seis bimestres?",
      nota:"Es la prueba típica del nivel aplicativo cuando se monitorea una intervención." },
    pearson: { name:"Coeficiente de correlación de Pearson", short:"Pearson", np:false, nivel:"Relacional", diseno:"Transversal · dos variables numéricas", tipo:"Paramétrica", variable:"Numérica × Numérica",
      q:"¿Cuánto y en qué dirección se relacionan linealmente?", ej:"Horas de estudio y nota: r = 0,84",
      nota:"Mide relación lineal; no implica causalidad y falla si la relación es curva." },
    spearman: { name:"rho de Spearman", short:"Spearman", np:true, nivel:"Relacional", diseno:"Transversal · dos variables ordinales", tipo:"No paramétrica", variable:"Ordinal × Ordinal",
      q:"¿Se relacionan de forma monótona?", ej:"Autoestima ordinal y nota final",
      nota:"Alternativa a Pearson con escalas ordinales, outliers o distribuciones no normales." },
    kendall: { name:"tau de Kendall", short:"Kendall", np:true, nivel:"Relacional", diseno:"Transversal · dos variables ordinales", tipo:"No paramétrica", variable:"Ordinal × Ordinal",
      q:"¿Concuerdan los rangos de las dos variables?", ej:"Orden de mérito de dos evaluadores",
      nota:"Más estable que Spearman con muestras pequeñas y muchos empates." },
    biserial: { name:"Correlación punto-biserial", short:"Punto-biserial", np:false, nivel:"Relacional", diseno:"Transversal · numérica y dicotómica", tipo:"Paramétrica", variable:"Numérica × Dicotómica",
      q:"¿Hay relación entre una variable numérica y una dicotómica?", ej:"Nota final y condición de becario",
      nota:"Equivale a comparar las medias de dos grupos con una t independiente." },
    shapiro: { name:"Shapiro-Wilk", short:"Shapiro-Wilk", np:true, nivel:"— supuesto previo", diseno:"Transversal", tipo:"No paramétrica", variable:"Numérica",
      q:"¿La variable se distribuye normal?", ej:"¿La nota final sigue una distribución normal?",
      nota:"No es un nivel de investigación: es el requisito para elegir entre pruebas paramétricas y no paramétricas." },
    ks: { name:"Kolmogorov-Smirnov con corrección de Lilliefors", short:"K-S Lilliefors", np:true, nivel:"— supuesto previo", diseno:"Transversal", tipo:"No paramétrica", variable:"Numérica",
      q:"¿La variable se ajusta a una distribución teórica?", ej:"¿Los 30 puntajes de autoestima son normales?",
      nota:"Se prefiere con muestras grandes; con n < 50 suele usarse Shapiro-Wilk." },
    anderson: { name:"Anderson-Darling", short:"Anderson-Darling", np:true, nivel:"— supuesto previo", diseno:"Transversal", tipo:"No paramétrica", variable:"Numérica",
      q:"¿La variable se ajusta a una distribución teórica, con más peso en las colas?", ej:"Verificación previa antes de elegir ANOVA",
      nota:"Sensible a las colas de la distribución; no confirma normalidad, solo no la rechaza." },
    reg_simple: { name:"Regresión lineal simple", short:"Lineal simple", np:false, nivel:"Explicativo", diseno:"Transversal · una variable independiente", tipo:"Paramétrica", variable:"Y numérica × X numérica",
      q:"¿Cuánto cambia Y por cada unidad de X?", ej:"Nota = 6,27 + 0,64 × horas de estudio",
      nota:"Es predictiva si el objetivo es pronosticar; explicativa si busca el efecto controlando otras variables." },
    reg_multiple: { name:"Regresión lineal múltiple", short:"Lineal múltiple", np:false, nivel:"Explicativo", diseno:"Transversal · varias variables independientes", tipo:"Paramétrica", variable:"Y numérica",
      q:"¿Cuánto aporta cada X, manteniendo las demás constantes?", ej:"Horas, gasto y hermanos sobre la nota",
      nota:"Es el modelo de las betas: aísla el aporte de cada factor." },
    reg_log: { name:"Regresión logística binaria", short:"Logística", np:false, nivel:"Explicativo / Predictivo", diseno:"Transversal o longitudinal · Y dicotómica", tipo:"Paramétrica", variable:"Y dicotómica",
      q:"¿Qué factores se asocian con la probabilidad del evento?", ej:"Probabilidad de reprobar según horas y autoestima",
      nota:"Devuelve odds ratios; en el nivel predictivo se evalúa con AUC y validación cruzada." },
    reg_poisson: { name:"Regresión de Poisson", short:"Poisson", np:false, nivel:"Explicativo / Predictivo", diseno:"Transversal o longitudinal · Y de conteo", tipo:"Paramétrica", variable:"Y de conteo",
      q:"¿Qué factores explican el número de eventos?", ej:"Número de faltas por estudiante en el semestre" },
    cox: { name:"Regresión de Cox", short:"Cox", np:false, nivel:"Predictivo", diseno:"Longitudinal · tiempo hasta el evento", tipo:"Paramétrica", variable:"Tiempo hasta el evento",
      q:"¿Qué factores aceleran o retrasan el evento?", ej:"Tiempo hasta el abandono, con tutoría como predictor",
      nota:"Modela el riesgo en el tiempo, no una probabilidad puntual." },
    arima: { name:"ARIMA / SARIMA", short:"ARIMA", np:false, nivel:"Predictivo", diseno:"Serie de tiempo · varios periodos", tipo:"Paramétrica", variable:"Serie temporal",
      q:"¿Cuál será el próximo valor de la serie?", ej:"Matrícula mensual de los próximos 12 meses",
      nota:"Se juzga por RMSE o MAE fuera de muestra, no por p-valores." },
    holt: { name:"Suavizamiento exponencial (Holt-Winters)", short:"Holt-Winters", np:false, nivel:"Predictivo", diseno:"Serie de tiempo · tendencia y estacionalidad", tipo:"Paramétrica", variable:"Serie temporal",
      q:"¿Cuál será el próximo valor, con tendencia y estacionalidad?", ej:"Asistencia mensual con caída en exámenes" },
    prophet: { name:"Prophet", short:"Prophet", np:false, nivel:"Predictivo", diseno:"Serie de tiempo · tendencia y estacionalidad", tipo:"Paramétrica", variable:"Serie temporal",
      q:"¿Cuál será el valor futuro de la serie?", ej:"Proyección de matrícula con feriados y vacaciones" },
    vvar: { name:"VAR (vectores autorregresivos)", short:"VAR", np:false, nivel:"Predictivo", diseno:"Serie de tiempo · varias series", tipo:"Paramétrica", variable:"Varias series temporales",
      q:"¿Cómo se influyen mutuamente varias series en el tiempo?", ej:"Matrícula y deserción mes a mes" },
    tree: { name:"Árbol de decisión", short:"Árbol", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada", tipo:"Aprendizaje automático", variable:"Predictores mixtos",
      q:"¿Qué reglas separan mejor las clases?", ej:"Si falta más de 20 % y estudia menos de 5 h, riesgo alto",
      nota:"Muy interpretable, pero se sobreajusta si no se poda." },
    rf: { name:"Random Forest", short:"Random Forest", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada · conjunto de árboles", tipo:"Aprendizaje automático", variable:"Predictores mixtos",
      q:"¿Cuál es la clase más votada por cientos de árboles?", ej:"Riesgo de reprobar a partir de asistencia, horas y autoestima",
      nota:"Robusto y estable; entrega importancia de variables." },
    gbm: { name:"Gradient Boosting (XGBoost / LightGBM)", short:"Boosting", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada · boosting", tipo:"Aprendizaje automático", variable:"Predictores mixtos",
      q:"¿Qué modelo maximiza el acierto fuera de muestra?", ej:"Mejor AUC en la predicción de abandono",
      nota:"Suele ganar en datos tabulares; menos interpretable." },
    svm: { name:"Máquinas de vectores de soporte (SVM)", short:"SVM", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada · margen máximo", tipo:"Aprendizaje automático", variable:"Predictores numéricos escalados",
      q:"¿Qué frontera separa mejor las clases?", ej:"Pocos casos y muchas variables", nota:"Requiere escalar las variables." },
    knn: { name:"k vecinos más cercanos (kNN)", short:"kNN", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada · instancias", tipo:"Aprendizaje automático", variable:"Predictores numéricos escalados",
      q:"¿A qué clase se parecen más los vecinos de este caso?", ej:"Estudiantes con perfil similar que reprobaron",
      nota:"Simple e intuitivo; sufre con muchas variables." },
    nb: { name:"Naive Bayes", short:"Naive Bayes", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada · probabilístico", tipo:"Aprendizaje automático", variable:"Predictores categóricos o texto",
      q:"¿Qué clase es más probable dadas las características?", ej:"Clasificar comentarios de tutoría por riesgo",
      nota:"Asume independencia entre predictores; funciona bien en texto." },
    mlp: { name:"Red neuronal (perceptrón multicapa)", short:"Red neuronal", np:false, nivel:"Predictivo", diseno:"Clasificación supervisada · red profunda", tipo:"Aprendizaje automático", variable:"Predictores numéricos",
      q:"¿Qué patrón no lineal separa las clases?", ej:"Grandes volúmenes de datos de plataformas educativas",
      nota:"Necesita muchos datos; es una caja negra." }
  };

  const MATRIX = [
    { sec: "Transversal · un solo periodo" },
    { row: "Un grupo", sub: "1 categoría", cells: [["chi_bondad", "binomial"], ["chi_bondad"], ["chi_bondad"], ["t_1m"]] },
    { row: "Dos grupos", sub: "independientes", cells: [["chi_homog", "yates", "fisher"], ["chi_homog"], ["u_mann"], ["t_indep"]] },
    { row: "Tres o más", sub: "independientes", cells: [["chi_homog"], ["chi_homog"], ["kruskal"], ["anova1"]] },
    { sec: "Longitudinal · varios periodos" },
    { row: "Dos medidas", sub: "relacionadas", cells: [["mcnemar"], ["cochran"], ["wilcoxon"], ["t_rel"]] },
    { row: "Tres o más medidas", sub: "relacionadas", cells: [["cochran"], ["cochran"], ["friedman"], ["anova_mr"]] }
  ];

  if ($("#block1")) {
    const heads = ["", "Nom. dicotómica", "Nom. politómica", "Ordinal", "Numérica"];
    let html = "<table class=\"mtx\"><thead><tr>" + heads.map((h, i) =>
      "<th>" + (i === 0 ? "Variable fija / aleatoria" : h) + "</th>").join("") + "</tr></thead><tbody>";

    MATRIX.forEach(r => {
      if (r.sec) {
        html += '<tr class="sec"><td colspan="5">' + r.sec + "</td></tr>";
        return;
      }
      html += '<tr><td class="rowh">' + r.row + "<span>" + r.sub + "</span></td>" +
        r.cells.map(cell =>
          '<td class="cell">' + cell.map(id => {
            const t = TESTS[id];
            return '<button class="chip-test' + (t.np ? " np" : "") + '" data-t="' + id + '" title="' + t.name + '">' + t.short + "</button>";
          }).join("") + "</td>"
        ).join("") + "</tr>";
    });
    html += "</tbody></table>";
    $("#block1").innerHTML = html;

    const panel = $("#testDetail");
    const empty = '<p class="td-empty"><b>Elija una prueba.</b><br><br>Cada botón muestra el nivel, el diseño, si es paramétrica o no, y un ejemplo con los 30 estudiantes.</p>' +
      '<p class="td-ej" style="margin-top:12px"><b>Observación:</b> la misma prueba puede cambiar de nivel según el diseño. Una t relacionada en un estudio transversal es relacional; en un pre–post con intervención, es explicativa.</p>';
    panel.innerHTML = empty;

    document.querySelector(".matrix-wrap").addEventListener("click", e => {
      const b = e.target.closest(".chip-test");
      if (!b) return;
      $$(".chip-test").forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      const t = TESTS[b.dataset.t];
      panel.innerHTML =
        '<p class="td-name">' + t.name + "</p>" +
        '<div class="td-pills"><span>Nivel: ' + t.nivel + '</span><span class="g">' + t.tipo + "</span></div>" +
        '<p class="td-row"><b>Diseño</b>' + t.diseno + "</p>" +
        '<p class="td-row"><b>Variable</b>' + t.variable + "</p>" +
        '<p class="td-row"><b>Pregunta</b>' + t.q + "</p>" +
        '<p class="td-ej"><b>Ejemplo:</b> ' + t.ej + "</p>" +
        (t.nota ? '<p class="td-note">' + t.nota + "</p>" : "");
    });
  }

  const MATRIX2 = [
    { row: "Correlación", sub: "nivel relacional", items: ["pearson", "spearman", "kendall", "biserial"] },
    { row: "Normalidad", sub: "supuesto previo, no es nivel", items: ["shapiro", "ks", "anderson"] },
    { row: "Regresión", sub: "explicativo o predictivo", items: ["reg_simple", "reg_multiple", "reg_log", "reg_poisson", "cox"] },
    { row: "Series de tiempo", sub: "nivel predictivo", items: ["arima", "holt", "prophet", "vvar"] },
    { row: "Clasificación", sub: "nivel predictivo · ML", items: ["tree", "rf", "gbm", "svm", "knn", "nb", "mlp"] }
  ];

  if ($("#block2")) {
    $("#block2").innerHTML = '<table class="mtx mtx-groups"><thead><tr><th>Familia</th><th>Técnica</th></tr></thead><tbody>' +
      MATRIX2.map(r =>
        '<tr><td class="rowh">' + r.row + "<span>" + r.sub + "</span></td>" +
        '<td class="cell chips-row">' + r.items.map(id => {
          const t = TESTS[id];
          return '<button class="chip-test' + (t.np ? " np" : "") + '" data-t="' + id + '" title="' + t.name + '">' + t.short + "</button>";
        }).join("") + "</td></tr>").join("") +
      "</tbody></table>";

    $$(".tt").forEach(b => b.addEventListener("click", () => {
      $$(".tt").forEach(x => x.classList.toggle("is-active", x === b));
      const n = b.dataset.block;
      $("#block1").hidden = n !== "1";
      $("#block2").hidden = n !== "2";
    }));
  }

  /* ---------------- página 14: riesgo estimado ---------------- */
  const tblPred = $("#tblPred");
  if (tblPred) {
    tblPred.innerHTML = DATA.map(d => {
      const score = 0.45 * (d.horas / 17) + 0.25 * (d.preT / 100) + 0.30 * (d.rend / 20);
      const risk = Math.max(0, Math.min(100, Math.round((1 - score) * 100)));
      return "<tr><td>" + d.id + "</td><td>" + fmt(d.horas, 1) + "</td><td>" + fmt(d.preT, 1) +
        "</td><td>" + fmt(d.rend, 1) + '</td><td class="' + (risk >= 70 ? "risk-high" : "") + '">' + risk + "</td></tr>";
    }).join("");
  }

  /* ---------------- ejercicios de completar ---------------- */
  const EX = [
    {
      case: "Se comparan los minutos de uso del teléfono entre dos grupos independientes: control y experimental. La variable no sigue una distribución normal.",
      text: "Se realizó la prueba [[test]] para estudiar si había diferencias en [[var]] entre los dos grupos. Los resultados mostraron que la hipótesis nula fue [[h0]] (p = [[p]]), por lo tanto las diferencias encontradas fueron [[sig]].",
      blanks: {
        test: { opts: ["U de Mann-Whitney", "t de Student independiente", "ANOVA de un factor", "χ² de homogeneidad"], a: "U de Mann-Whitney" },
        var: { opts: ["el tiempo de uso del teléfono", "la autoestima", "el rendimiento académico"], a: "el tiempo de uso del teléfono" },
        h0: { opts: ["aceptada", "rechazada"], a: "aceptada" },
        p: { opts: ["0,32", "0,05", "0,95"], a: "0,32" },
        sig: { opts: ["no significativas", "significativas"], a: "no significativas" }
      }
    },
    {
      case: "Se comparan las horas de ocio entre quienes trabajan y quienes no. La variable es ordinal y no se distribuye normalmente.",
      text: "Se realizó la prueba [[test]] para estudiar si había diferencias en [[var]] entre los grupos de la variable situación laboral. Los resultados mostraron que la hipótesis nula fue [[h0]] (p = [[p]]), por lo tanto las diferencias encontradas fueron [[sig]].",
      blanks: {
        test: { opts: ["t de Student independiente", "U de Mann-Whitney", "Friedman", "χ² de bondad"], a: "U de Mann-Whitney" },
        var: { opts: ["las horas de ocio", "la nota final", "la autoestima"], a: "las horas de ocio" },
        h0: { opts: ["rechazada", "aceptada"], a: "rechazada" },
        p: { opts: ["0,04", "0,40", "0,98"], a: "0,04" },
        sig: { opts: ["significativas", "no significativas"], a: "significativas" }
      }
    },
    {
      case: "Se midió la autoestima de los mismos 30 estudiantes antes y después del taller. La variable es numérica y normal.",
      text: "Se realizó la prueba [[test]] para estudiar si había diferencias en [[var]] entre las dos mediciones. Los resultados mostraron que la hipótesis nula fue [[h0]] (p = [[p]]), por lo tanto las diferencias encontradas fueron [[sig]].",
      blanks: {
        test: { opts: ["t de Student para muestras relacionadas", "t de Student independiente", "U de Mann-Whitney", "ANOVA de un factor"], a: "t de Student para muestras relacionadas" },
        var: { opts: ["la autoestima", "el grupo", "la asistencia"], a: "la autoestima" },
        h0: { opts: ["rechazada", "aceptada"], a: "rechazada" },
        p: { opts: ["0,003", "0,30", "0,97"], a: "0,003" },
        sig: { opts: ["significativas", "no significativas"], a: "significativas" }
      }
    },
    {
      case: "Se quiere saber si el nivel de nota (alta / baja) se asocia con el sexo (mujeres / varones). Ambas variables son categóricas. El análisis arrojó χ² = 1,83 y p = 0,18.",
      text: "Se realizó la prueba [[test]] para estudiar si había diferencias en [[var]] entre mujeres y varones. Los resultados mostraron que la hipótesis nula fue [[h0]] (p = [[p]]), por lo tanto las diferencias encontradas fueron [[sig]].",
      blanks: {
        test: { opts: ["χ² de homogeneidad", "t de Student independiente", "Wilcoxon", "ANOVA de medidas repetidas"], a: "χ² de homogeneidad" },
        var: { opts: ["la proporción con nota alta", "la media de nota", "las horas de estudio"], a: "la proporción con nota alta" },
        h0: { opts: ["aceptada", "rechazada"], a: "aceptada" },
        p: { opts: ["0,18", "0,018", "0,80"], a: "0,18" },
        sig: { opts: ["no significativas", "significativas"], a: "no significativas" }
      }
    }
  ];

  if ($("#ex")) {
    let idx = 0, score = 0, checked = false;

    function renderEx() {
      const e = EX[idx];
      $("#exIndex").textContent = idx + 1;
      $("#exProgress").style.width = ((idx) / EX.length) * 100 + "%";
      $("#exCase").textContent = e.case;
      $("#exFix").textContent = "";
      $("#exNext").disabled = true;
      $("#exNext").textContent = idx === EX.length - 1 ? "Ver resultado" : "Siguiente →";
      $("#exCheck").disabled = false;
      checked = false;

      let html = "";
      let last = 0;
      const re = /\[\[(\w+)\]\]/g;
      let m;
      while ((m = re.exec(e.text)) !== null) {
        html += e.text.slice(last, m.index);
        const key = m[1];
        const b = e.blanks[key];
        html += '<select class="ex-sel" data-k="' + key + '"><option value="">—</option>' +
          b.opts.map(o => '<option value="' + o + '">' + o + "</option>").join("") + "</select>";
        last = re.lastIndex;
      }
      html += e.text.slice(last);
      $("#exBody").innerHTML = html;
    }

    function verifyEx() {
      if (checked) return;
      checked = true;
      const e = EX[idx];
      let allOk = true;
      const fixes = [];
      $$(".ex-sel").forEach(sel => {
        const b = e.blanks[sel.dataset.k];
        const ok = sel.value === b.a;
        sel.classList.toggle("ok", ok);
        sel.classList.toggle("err", !ok);
        if (!ok) {
          allOk = false;
          fixes.push("<b>" + sel.dataset.k + "</b>: " + b.a);
        }
      });
      if (allOk) {
        score++;
        $("#exScore").textContent = score;
        $("#exFix").innerHTML = '<span class="ex-good">Correcto: el análisis está bien planteado.</span>';
      } else {
        $("#exFix").innerHTML = '<span class="ex-bad">Revisar → </span>' + fixes.join(" · ");
      }
      $("#exCheck").disabled = true;
      $("#exNext").disabled = false;
    }

    function nextEx() {
      if (idx === EX.length - 1) {
        $("#exCase").textContent = "Resultado final";
        $("#exBody").innerHTML = '<p style="font-size:1rem;line-height:1.6">Acertaste <b>' + score + " de " + EX.length +
          "</b> ejercicios. " + (score === EX.length
            ? "Ya distingue qué prueba corresponde a cada diseño y cómo se lee el p-valor."
            : "Repasá la página de pruebas y diseños: la clave es el tipo de variable y si las muestras son independientes o relacionadas.") + "</p>";
        $("#exFix").textContent = "";
        $("#exNext").disabled = true;
        $("#exCheck").disabled = true;
        $("#exReset").textContent = "Empezar de nuevo";
        return;
      }
      idx++;
      renderEx();
    }

    $("#exCheck").addEventListener("click", verifyEx);
    $("#exNext").addEventListener("click", nextEx);
    $("#exReset").addEventListener("click", () => {
      idx = 0; score = 0; checked = false;
      $("#exScore").textContent = "0";
      $("#exReset").textContent = "Reiniciar";
      renderEx();
    });

    renderEx();
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
