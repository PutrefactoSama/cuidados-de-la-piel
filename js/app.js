/* CuidaPiel · lógica de la guía interactiva.
   Todo se guarda solo en este equipo (localStorage). */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const SVGNS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Almacenamiento seguro ---------- */
  const PREFIX = "cuidapiel:";
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) {
        /* sin almacenamiento: la página sigue funcionando en memoria */
      }
    },
    clearAll() {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(PREFIX))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* nada que borrar */
      }
    },
  };

  /* ---------- Utilidades de tiempo ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hora = (ts) => {
    const d = new Date(ts);
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const duracion = (ms) => {
    const min = Math.max(0, Math.round(ms / 60000));
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h} h ${m} min`;
    if (h) return `${h} h`;
    return `${m} min`;
  };
  const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const fechaLarga = (d = new Date()) =>
    d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 4200);
  }

  /* ---------- Preferencias ---------- */
  const prefs = Object.assign(
    { texto: "normal", contraste: false, intervalo: 2, aguaMeta: 8, avisos: false },
    store.get("prefs", {})
  );
  const savePrefs = () => store.set("prefs", prefs);

  const TEXTOS = ["normal", "grande", "muy-grande"];
  const TEXTO_NOMBRE = { normal: "normal", grande: "grande", "muy-grande": "muy grande" };
  function aplicarTexto() {
    document.documentElement.dataset.texto = prefs.texto;
    $("#textoEstado").textContent = `Tamaño de letra: ${TEXTO_NOMBRE[prefs.texto]}`;
  }
  function aplicarContraste() {
    if (prefs.contraste) document.documentElement.dataset.contraste = "alto";
    else delete document.documentElement.dataset.contraste;
    $("#btnContraste").setAttribute("aria-pressed", String(prefs.contraste));
  }
  $("#btnTexto").addEventListener("click", () => {
    prefs.texto = TEXTOS[(TEXTOS.indexOf(prefs.texto) + 1) % TEXTOS.length];
    savePrefs();
    aplicarTexto();
    toast(`Letra ${TEXTO_NOMBRE[prefs.texto]}`);
  });
  $("#btnContraste").addEventListener("click", () => {
    prefs.contraste = !prefs.contraste;
    savePrefs();
    aplicarContraste();
    toast(prefs.contraste ? "Alto contraste activado" : "Alto contraste desactivado");
  });
  aplicarTexto();
  aplicarContraste();

  /* ==========================================================
     Mi día: datos
     ========================================================== */
  const POS = {
    supino: { label: "Boca arriba", color: "#f4b400", consejo: "con los talones en el aire y la cabecera baja" },
    derecho: { label: "Lado derecho", color: "#0b6e75", consejo: "inclinado unos 30°, con almohada en la espalda y entre las rodillas" },
    izquierdo: { label: "Lado izquierdo", color: "#a3195b", consejo: "inclinado unos 30°, con almohada en la espalda y entre las rodillas" },
    sentado: { label: "Sentado", color: "#5a3a93", consejo: "con cojín antiescaras y los pies apoyados" },
  };
  const CHECKS = 5;

  let diaKey = dateKey();
  let dia = cargarDia(diaKey);
  let ultimoNuevo = null;

  function cargarDia(key) {
    const base = { turns: [], agua: 0, checks: Array(CHECKS).fill(false) };
    const d = Object.assign(base, store.get("dia:" + key, {}));
    if (!Array.isArray(d.checks) || d.checks.length !== CHECKS) d.checks = Array(CHECKS).fill(false);
    return d;
  }
  const guardarDia = () => store.set("dia:" + diaKey, dia);

  function ultimoTurno() {
    return dia.turns[dia.turns.length - 1] || null;
  }
  function proximoCambio() {
    const u = ultimoTurno();
    if (!u) return null;
    const horas = u.pos === "sentado" ? 1 : prefs.intervalo;
    return u.t + horas * 3600000;
  }
  function sugerencia() {
    const u = ultimoTurno();
    if (!u) return "supino";
    if (u.pos === "supino") {
      const lateral = [...dia.turns].reverse().find((t) => t.pos === "derecho" || t.pos === "izquierdo");
      return lateral && lateral.pos === "derecho" ? "izquierdo" : "derecho";
    }
    return "supino";
  }

  /* ---------- Reloj de hilo (SVG) ---------- */
  function el(tag, attrs = {}, parent) {
    const n = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  }
  const CX = 110;
  const CY = 110;
  const angulo = (ts) => {
    const d = new Date(ts);
    const h = d.getHours() + d.getMinutes() / 60;
    return (h / 24) * Math.PI * 2 - Math.PI / 2;
  };
  const punto = (a, r) => [CX + Math.cos(a) * r, CY + Math.sin(a) * r];
  function arco(a0, a1, r) {
    let delta = a1 - a0;
    if (delta < 0) delta += Math.PI * 2;
    if (delta < 0.004) delta = 0.004;
    const [x0, y0] = punto(a0, r);
    const [x1, y1] = punto(a0 + delta, r);
    const large = delta > Math.PI ? 1 : 0;
    return { d: `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`, len: r * delta };
  }

  function dibujarReloj(svg, mini) {
    svg.textContent = "";
    const R = 82;
    const ahora = Date.now();
    el("circle", { cx: CX, cy: CY, r: 106, fill: "#eef0fb" }, svg);
    // noche (22:00 a 07:00)
    const hoy = new Date();
    const a22 = angulo(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 22).getTime());
    const a07 = angulo(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 7).getTime());
    const noche = arco(a22, a07, 98);
    const [nx0, ny0] = punto(a22, 98);
    el("path", { d: `M${CX} ${CY}L${nx0} ${ny0}${noche.d.replace(/^M[^A]+/, "")}Z`, fill: "rgba(90,58,147,.14)" }, svg);
    el("circle", { cx: CX, cy: CY, r: 101, fill: "none", stroke: "rgba(20,27,77,.35)", "stroke-width": 2, "stroke-dasharray": "5 4" }, svg);
    // marcas de hora
    for (let h = 0; h < 24; h++) {
      const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
      const [x, y] = punto(a, 94);
      el("circle", { cx: x.toFixed(2), cy: y.toFixed(2), r: h % 6 === 0 ? 3.4 : 1.8, fill: "#141b4d", opacity: h % 6 === 0 ? 0.8 : 0.4 }, svg);
    }
    if (!mini) {
      [
        [0, "0"],
        [6, "6"],
        [12, "12"],
        [18, "18"],
      ].forEach(([h, t]) => {
        const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
        const [x, y] = punto(a, 67);
        const tx = el("text", { x: x.toFixed(1), y: (y + 6).toFixed(1), "text-anchor": "middle", "font-size": 17, "font-weight": 800, fill: "#141b4d", "font-family": "Atkinson Hyperlegible Next, sans-serif" }, svg);
        tx.textContent = t;
      });
    }
    // hilo guía
    el("circle", { cx: CX, cy: CY, r: R, fill: "none", stroke: "rgba(20,27,77,.12)", "stroke-width": 12 }, svg);

    // hilos de cada posición
    const turns = dia.turns;
    turns.forEach((t, i) => {
      const fin = i < turns.length - 1 ? turns[i + 1].t : ahora;
      const a = arco(angulo(t.t), angulo(fin), R);
      const color = POS[t.pos] ? POS[t.pos].color : "#141b4d";
      const p = el("path", { d: a.d, fill: "none", stroke: color, "stroke-width": 12, "stroke-linecap": "round", class: "puntada" }, svg);
      p.style.setProperty("--len", a.len.toFixed(1));
      if (!reduceMotion && t.t === ultimoNuevo) p.classList.add("is-nueva");
      el("path", { d: a.d, fill: "none", stroke: "rgba(255,255,255,.85)", "stroke-width": 2.4, "stroke-dasharray": "4 5", "stroke-linecap": "round" }, svg);
    });
    // nudos
    turns.forEach((t) => {
      const [x, y] = punto(angulo(t.t), R);
      const color = POS[t.pos] ? POS[t.pos].color : "#141b4d";
      const c = el("circle", { cx: x.toFixed(2), cy: y.toFixed(2), r: 8.5, fill: color, stroke: "#fff", "stroke-width": 3, class: "nudo" }, svg);
      if (!reduceMotion && t.t === ultimoNuevo) c.classList.add("is-nuevo");
    });
    // próximo cambio
    const prox = proximoCambio();
    if (prox && dateKey(new Date(prox)) === diaKey) {
      const [x, y] = punto(angulo(prox), R);
      el("circle", { cx: x.toFixed(2), cy: y.toFixed(2), r: 10, fill: "#fff", stroke: "#141b4d", "stroke-width": 2.5, "stroke-dasharray": "3 3" }, svg);
    }
    // aguja (hora actual)
    const an = angulo(ahora);
    const [hx, hy] = punto(an, R - 18);
    const [tx, ty] = punto(an + Math.PI, 14);
    el("line", { x1: tx.toFixed(2), y1: ty.toFixed(2), x2: hx.toFixed(2), y2: hy.toFixed(2), stroke: "#141b4d", "stroke-width": 4, "stroke-linecap": "round" }, svg);
    const [ex, ey] = punto(an + Math.PI, 9);
    el("ellipse", { cx: ex.toFixed(2), cy: ey.toFixed(2), rx: 3, ry: 3, fill: "#eef0fb", stroke: "#141b4d", "stroke-width": 2 }, svg);
    el("circle", { cx: CX, cy: CY, r: 5, fill: "#f4b400", stroke: "#141b4d", "stroke-width": 2 }, svg);
  }

  /* ---------- Render de "Mi día" ---------- */
  const relojMini = $("#relojMini");
  const relojGrande = $("#relojGrande");
  const diaMini = $("#diaMini");

  function renderEstado() {
    const ahora = Date.now();
    const prox = proximoCambio();
    const u = ultimoTurno();
    let horaTxt = "";
    let enTxt = "";
    let vencido = false;
    if (prox) {
      horaTxt = hora(prox);
      const diff = prox - ahora;
      if (diff > 0) enTxt = `en ${duracion(diff)}`;
      else {
        vencido = true;
        enTxt = diff > -60000 ? "¡Es ahora!" : `Le tocaba hace ${duracion(-diff)}`;
      }
    }
    $("#diaMiniFecha").textContent = fechaLarga();
    $("#diaMiniLabel").textContent = prox ? "Próximo cambio de posición" : "Cambios de hoy";
    $("#diaMiniHora").textContent = prox ? horaTxt : "0";
    $("#diaMiniEn").textContent = prox ? enTxt : "Toque el botón cada vez que cambie de posición";
    diaMini.classList.toggle("is-due", vencido);
    $("#diaMiniAgua").textContent = `${dia.agua} de ${prefs.aguaMeta} vasos`;
    $("#diaMiniRevision").textContent = `Revisión ${dia.checks.filter(Boolean).length} de ${CHECKS}`;

    $("#relojLabel").textContent = prox ? "Próximo cambio de posición" : "Cambios de hoy";
    $("#relojHora").textContent = prox ? horaTxt : "0";
    const relojEn = $("#relojEn");
    relojEn.textContent = prox ? enTxt : "Registre abajo el primer cambio del día";
    relojEn.classList.toggle("is-due", vencido);
    $("#avisoCambio").classList.toggle("is-visible", vencido);
    $("#relojUltimo").textContent = u
      ? `Último cambio: ${hora(u.t)}, ${POS[u.pos].label.toLowerCase()}${u.pos === "sentado" ? " (sentado: le recordamos cada hora)" : ""}.`
      : "";
    const s = sugerencia();
    $("#relojSugerencia").textContent = `Sugerencia para el próximo cambio: ${POS[s].label.toLowerCase()}, ${POS[s].consejo}.`;

    dibujarReloj(relojMini, true);
    dibujarReloj(relojGrande, false);
    document.title = vencido ? "(!) Hora de cambiar de posición · CuidaPiel" : tituloBase;
  }
  const tituloBase = document.title;

  function renderRegistro() {
    const ol = $("#registro");
    ol.textContent = "";
    [...dia.turns].reverse().forEach((t) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="dot" style="--c:${POS[t.pos].color}"></span><time datetime="${new Date(t.t).toISOString()}">${hora(t.t)}</time><span>${POS[t.pos].label}</span>`;
      ol.appendChild(li);
    });
    $("#registroVacio").hidden = dia.turns.length > 0;
    $("#btnDeshacer").hidden = dia.turns.length === 0;
  }

  function preseleccionar() {
    const s = sugerencia();
    const radio = $(`#pos-${s}`);
    if (radio) radio.checked = true;
  }

  function registrarCambio(pos) {
    const t = Date.now();
    dia.turns.push({ t, pos });
    ultimoNuevo = t;
    guardarDia();
    avisado = null;
    renderEstado();
    renderRegistro();
    renderSemana();
    preseleccionar();
    const prox = proximoCambio();
    toast(`Registrado: ${POS[pos].label.toLowerCase()} a las ${hora(t)}. Próximo cambio a las ${hora(prox)}.`);
  }

  $("#relojForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const pos = new FormData(e.currentTarget).get("pos") || "supino";
    registrarCambio(pos);
  });
  $$("[data-registrar-rapido]").forEach((b) =>
    b.addEventListener("click", () => {
      const checked = $('#relojForm input[name="pos"]:checked');
      registrarCambio(checked ? checked.value : sugerencia());
    })
  );
  $("#btnDeshacer").addEventListener("click", () => {
    const quitado = dia.turns.pop();
    if (!quitado) return;
    guardarDia();
    renderEstado();
    renderRegistro();
    renderSemana();
    preseleccionar();
    toast(`Se borró el registro de las ${hora(quitado.t)}.`);
  });

  // Intervalo
  function renderIntervalo() {
    $$("[data-intervalo]").forEach((b) => b.setAttribute("aria-checked", String(Number(b.dataset.intervalo) === prefs.intervalo)));
  }
  $$("[data-intervalo]").forEach((b) =>
    b.addEventListener("click", () => {
      prefs.intervalo = Number(b.dataset.intervalo);
      savePrefs();
      renderIntervalo();
      renderEstado();
      toast(`Recordatorio cada ${prefs.intervalo} horas en cama.`);
    })
  );
  $(".intervalo [role=radiogroup]").addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const opts = [2, 3, 4];
    const dir = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
    prefs.intervalo = opts[(opts.indexOf(prefs.intervalo) + dir + opts.length) % opts.length];
    savePrefs();
    renderIntervalo();
    renderEstado();
    $(`[data-intervalo="${prefs.intervalo}"]`).focus();
  });

  // Avisos
  let avisado = null;
  const btnAvisos = $("#btnAvisos");
  function renderAvisos() {
    btnAvisos.setAttribute("aria-pressed", String(prefs.avisos));
    btnAvisos.querySelector("span").textContent = prefs.avisos ? "Aviso activado" : "Activar aviso";
  }
  btnAvisos.addEventListener("click", async () => {
    if (prefs.avisos) {
      prefs.avisos = false;
      savePrefs();
      renderAvisos();
      toast("Aviso desactivado.");
      return;
    }
    prefs.avisos = true;
    if ("Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch (e) {
        /* algunos navegadores no lo permiten */
      }
    }
    savePrefs();
    renderAvisos();
    const permitido = "Notification" in window && Notification.permission === "granted";
    toast(permitido ? "Le avisaremos cuando toque cambiar de posición, con la página abierta." : "Verá el aviso en esta página. Manténgala abierta.");
  });
  function revisarAviso() {
    const prox = proximoCambio();
    if (!prefs.avisos || !prox || Date.now() < prox || avisado === prox) return;
    avisado = prox;
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("CuidaPiel", { body: "Es hora de cambiar de posición.", icon: "images/icono.svg" });
      } catch (e) {
        /* sin notificaciones del sistema */
      }
    }
    if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
    toast("Es hora de cambiar de posición.");
  }

  /* ---------- Agua ---------- */
  const VASO_SVG = `<svg viewBox="0 0 40 52" aria-hidden="true"><path class="agua-nivel" d="M9.4 22h21.2l-2.1 23.2a3 3 0 0 1-3 2.8H14.5a3 3 0 0 1-3-2.8z" fill="#0b6e75"/><path d="M6 4h28l-3.6 41.4a4 4 0 0 1-4 3.6H13.6a4 4 0 0 1-4-3.6z" fill="none" stroke="#141b4d" stroke-width="2.6" stroke-linejoin="round"/><path d="M8.6 14h22.8" stroke="#141b4d" stroke-width="2" stroke-dasharray="3 3" opacity=".45"/></svg>`;
  function renderAgua() {
    const ul = $("#vasos");
    ul.textContent = "";
    for (let i = 0; i < prefs.aguaMeta; i++) {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "vaso";
      const lleno = i < dia.agua;
      b.setAttribute("aria-pressed", String(lleno));
      b.setAttribute("aria-label", `Vaso ${i + 1}${lleno ? ", tomado" : ""}`);
      b.innerHTML = VASO_SVG;
      b.addEventListener("click", () => {
        dia.agua = i < dia.agua ? i : i + 1;
        guardarDia();
        renderAgua();
        renderEstado();
        if (dia.agua === prefs.aguaMeta) toast("¡Meta de agua cumplida!");
      });
      li.appendChild(b);
      ul.appendChild(li);
    }
    $("#aguaCuenta").textContent = `${dia.agua} / ${prefs.aguaMeta}`;
    $("#aguaMeta").textContent = prefs.aguaMeta;
  }
  $("#aguaMenos").addEventListener("click", () => {
    prefs.aguaMeta = Math.max(3, prefs.aguaMeta - 1);
    dia.agua = Math.min(dia.agua, prefs.aguaMeta);
    savePrefs();
    guardarDia();
    renderAgua();
    renderEstado();
  });
  $("#aguaMas").addEventListener("click", () => {
    prefs.aguaMeta = Math.min(12, prefs.aguaMeta + 1);
    savePrefs();
    renderAgua();
    renderEstado();
  });

  /* ---------- Revisión diaria ---------- */
  function renderChecks() {
    $$("#cruzLista input").forEach((inp) => {
      inp.checked = !!dia.checks[Number(inp.dataset.check)];
    });
    $("#diaCompleto").classList.toggle("is-visible", dia.checks.every(Boolean));
  }
  $$("#cruzLista input").forEach((inp) =>
    inp.addEventListener("change", () => {
      dia.checks[Number(inp.dataset.check)] = inp.checked;
      guardarDia();
      renderChecks();
      renderEstado();
      renderSemana();
    })
  );

  /* ---------- Semana ---------- */
  function renderSemana() {
    const ol = $("#semana");
    ol.textContent = "";
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = dateKey(d);
      const datos = k === diaKey ? dia : cargarDia(k);
      const completo = datos.checks.every(Boolean);
      const li = document.createElement("li");
      li.className = "semana-dia" + (i === 0 ? " is-hoy" : "");
      li.setAttribute("aria-label", `${i === 0 ? "Hoy" : fechaLarga(d)}: ${datos.turns.length} cambios de posición${completo ? ", revisión completa" : ""}`);
      li.innerHTML = `<span>${i === 0 ? "hoy" : DIAS[d.getDay()]}</span><b>${datos.turns.length}</b>${
        completo ? '<svg class="estrella icon" aria-hidden="true"><use href="#i-star"/></svg>' : '<span aria-hidden="true" style="height:20px"></span>'
      }`;
      ol.appendChild(li);
    }
  }

  /* ---------- Imprimir ---------- */
  function imprimir() {
    const box = $("#impresion");
    const filas = dia.turns.map((t) => `<li>${hora(t.t)} · ${POS[t.pos].label}</li>`).join("") || "<li>Sin cambios registrados.</li>";
    const nombres = $$("#cruzLista strong").map((s) => s.textContent);
    const checks = dia.checks.map((c, i) => `<li>${c ? "[x]" : "[ ]"} ${nombres[i]}</li>`).join("");
    box.innerHTML = `<h3 class="h3" style="margin-top:12pt">Mi día · ${fechaLarga()}</h3>
      <p><strong>Cambios de posición:</strong></p><ul>${filas}</ul>
      <p><strong>Agua:</strong> ${dia.agua} de ${prefs.aguaMeta} vasos.</p>
      <p><strong>Revisión:</strong></p><ul>${checks}</ul>`;
    document.documentElement.classList.add("imprimiendo-dia");
    window.print();
  }
  window.addEventListener("afterprint", () => document.documentElement.classList.remove("imprimiendo-dia"));
  $("#btnImprimir").addEventListener("click", imprimir);
  $("#btnImprimir2").addEventListener("click", imprimir);

  $("#btnBorrar").addEventListener("click", () => {
    if (!window.confirm("¿Borrar todos sus registros, insignias y preferencias de este equipo?")) return;
    store.clearAll();
    window.location.reload();
  });

  /* ==========================================================
     ¿Por qué aparece? Corte de la piel
     ========================================================== */
  const corteSvg = $("#corteSvg");
  const corteRange = $("#corteRange");
  const corteEstado = $("#corteEstado");
  const corteHoras = $("#corteHoras");
  const flujos = $$(".flujo", corteSvg);
  const ESTADOS = [
    [0, 0, "Piel sana: la sangre circula y lleva oxígeno a todos los tejidos."],
    [1.5, 1, "El peso aprieta los vasos sanguíneos: llega menos sangre a la piel."],
    [3, 2, "La piel enrojece: está avisando. Si cambia de posición ahora, se recupera."],
    [6, 3, "Puede haber daño en las capas profundas, aunque la piel todavía se vea entera."],
  ];
  function horasTxt(v) {
    return `${String(v).replace(".", ",")} h`;
  }
  function actualizarCorte(v, mensaje) {
    const p = v / 6;
    corteSvg.style.setProperty("--p", p.toFixed(3));
    corteHoras.textContent = horasTxt(v);
    corteRange.setAttribute("aria-valuetext", `${String(v).replace(".", ",")} horas`);
    const [, nivel, texto] = ESTADOS.find(([max]) => v <= max) || ESTADOS[3];
    corteEstado.dataset.nivel = nivel;
    corteEstado.textContent = mensaje || texto;
    const dur = (2.2 + p * 7).toFixed(2) + "s";
    flujos.forEach((f) => (f.style.animationDuration = dur));
    if (p >= 0.75) corteSvg.setAttribute("data-detenido", "");
    else corteSvg.removeAttribute("data-detenido");
  }
  corteRange.addEventListener("input", () => actualizarCorte(Number(corteRange.value)));
  $("#corteCambiar").addEventListener("click", () => {
    const desde = Number(corteRange.value);
    const fin = "¡Bien! Al cambiar de posición la sangre vuelve a la piel. Por eso hay que moverse con regularidad.";
    if (reduceMotion || desde === 0) {
      corteRange.value = 0;
      actualizarCorte(0, fin);
      return;
    }
    const t0 = performance.now();
    const ms = 900;
    const paso = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      const v = Math.round(desde * (1 - e) * 2) / 2;
      corteRange.value = v;
      actualizarCorte(v, k < 1 ? undefined : fin);
      if (k < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
  actualizarCorte(0);

  /* ==========================================================
     Cuidados: pestañas y aprendidos
     ========================================================== */
  const tabs = $$(".cuidado-tab");
  const aprendidos = new Set(store.get("aprendidos", []));
  function seleccionarCuidado(tab, foco) {
    tabs.forEach((t) => {
      const activo = t === tab;
      t.setAttribute("aria-selected", String(activo));
      t.tabIndex = activo ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !activo;
    });
    if (foco) tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    detenerLectura();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => seleccionarCuidado(t));
    t.addEventListener("keydown", (e) => {
      let j = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") j = 0;
      if (e.key === "End") j = tabs.length - 1;
      if (j !== null) {
        e.preventDefault();
        seleccionarCuidado(tabs[j], true);
      }
    });
  });
  $$("[data-siguiente]").forEach((b) =>
    b.addEventListener("click", () => {
      const i = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      const sig = tabs[(i + 1) % tabs.length];
      seleccionarCuidado(sig);
      const panel = $("#" + sig.getAttribute("aria-controls"));
      const top = panel.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.6) {
        $("#cuidados .cuidados").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    })
  );
  function renderAprendidos() {
    tabs.forEach((t) => {
      const id = $("#" + t.getAttribute("aria-controls")).dataset.cuidado;
      t.classList.toggle("is-learned", aprendidos.has(id));
    });
    $$("[data-aprendido]").forEach((b) => {
      const ok = aprendidos.has(b.dataset.aprendido);
      b.setAttribute("aria-pressed", String(ok));
      b.querySelector("span").textContent = ok ? "Aprendido" : "Lo aprendí";
      b.classList.toggle("btn-sol", !ok);
      b.classList.toggle("btn-cielo", ok);
    });
    const n = aprendidos.size;
    $("#cuidadosCuenta").textContent = `${n} de 6 aprendidos`;
    $("#cuidadosBarra").style.setProperty("--p", (n / 6).toFixed(3));
  }
  $$("[data-aprendido]").forEach((b) =>
    b.addEventListener("click", () => {
      const id = b.dataset.aprendido;
      if (aprendidos.has(id)) aprendidos.delete(id);
      else aprendidos.add(id);
      store.set("aprendidos", [...aprendidos]);
      renderAprendidos();
      if (aprendidos.size === 6) ganarInsignia("aprendiz");
    })
  );

  /* ==========================================================
     Mapa de puntos de presión
     ========================================================== */
  const PUNTOS = {
    supino: [
      { x: 44, y: 154, n: "Nuca", por: "El hueso de la parte de atrás de la cabeza se apoya siempre en el mismo punto de la almohada.", pro: "Almohada blanda; cambie el apoyo de la cabeza en cada cambio de posición." },
      { x: 100, y: 166, n: "Omóplatos", por: "Los huesos de la espalda alta quedan apoyados en el colchón.", pro: "Sábanas estiradas y cambios de posición regulares." },
      { x: 150, y: 156, n: "Codos", por: "Quedan apoyados en la cama y tienen muy poca grasa que los proteja.", pro: "Apoye los brazos sobre una almohada blanda." },
      { x: 232, y: 166, n: "Sacro y cóccix", por: "Es la zona donde más aparecen lesiones: allí se concentra el peso al estar boca arriba.", pro: "Cabecera baja (máximo 30°) y alterne con posiciones de lado." },
      { x: 368, y: 154, n: "Talones", por: "Tienen muy poca grasa y soportan el peso de las piernas.", pro: "Almohada bajo las pantorrillas para que los talones queden en el aire." },
    ],
    lado: [
      { x: 40, y: 150, n: "Oreja", por: "Queda apretada entre la cabeza y la almohada.", pro: "Almohada blanda y revise que la oreja no quede doblada." },
      { x: 96, y: 168, n: "Hombro", por: "Recibe el peso de la parte alta del cuerpo.", pro: "Inclínese solo unos 30°, con una almohada en la espalda." },
      { x: 228, y: 168, n: "Cadera", por: "El hueso de la cadera queda muy expuesto si se acuesta completamente de lado.", pro: "Nunca de lado completo (90°): solo unos 30° de inclinación." },
      { x: 298, y: 166, n: "Rodillas", por: "El hueso de una rodilla aprieta a la otra.", pro: "Ponga una almohada entre las rodillas." },
      { x: 366, y: 168, n: "Tobillos", por: "El hueso del tobillo roza el colchón y el otro pie.", pro: "La almohada entre las piernas debe llegar hasta los tobillos." },
    ],
    sentado: [
      { x: 122, y: 78, n: "Omóplatos", por: "La espalda alta se apoya en el respaldo.", pro: "Respaldo acolchado y cambios de apoyo frecuentes." },
      { x: 162, y: 110, n: "Codos", por: "Descansan sobre los apoyabrazos.", pro: "Apoyabrazos acolchados o una almohada blanda." },
      { x: 124, y: 142, n: "Sacro y cóccix", por: "Si la persona se resbala en la silla, el peso cae sobre el cóccix.", pro: "Siéntela bien atrás, con la espalda recta y apoyada." },
      { x: 184, y: 146, n: "Glúteos", por: "Los huesos de sentarse (isquiones) soportan casi todo el peso del cuerpo.", pro: "Cojín antiescaras, nunca de rosca, y cambios de apoyo cada 15 a 30 minutos." },
      { x: 266, y: 206, n: "Talones y pies", por: "Pueden quedar apretados contra el suelo o el apoyapiés.", pro: "Pies bien apoyados y calcetines sin costuras apretadas." },
    ],
  };
  const VISTAS = { supino: [0, 88, 400, 126], lado: [0, 84, 400, 130], sentado: [70, 14, 260, 204] };
  const mapaPuntos = $("#mapaPuntos");
  const puntoInfo = $("#puntoInfo");
  const mapaStage = $("#mapaStage");
  let posturaActual = "supino";
  function renderPuntos() {
    mapaPuntos.textContent = "";
    const [vx, vy, vw, vh] = VISTAS[posturaActual];
    $("#mapaSvg").setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
    PUNTOS[posturaActual].forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "punto";
      b.style.left = `${((p.x - vx) / vw) * 100}%`;
      b.style.top = `${((p.y - vy) / vh) * 100}%`;
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", `${i + 1}: ${p.n}`);
      b.innerHTML = `<span aria-hidden="true">${i + 1}</span>`;
      b.addEventListener("click", () => {
        $$(".punto", mapaPuntos).forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
        puntoInfo.innerHTML = `<h3>${i + 1}. ${p.n}</h3><p>${p.por}</p><p class="proteja">Cómo protegerla: ${p.pro}</p>`;
      });
      mapaPuntos.appendChild(b);
    });
  }
  const posturaTabs = $$("[data-postura]");
  function seleccionarPostura(btn, foco) {
    posturaActual = btn.dataset.postura;
    posturaTabs.forEach((b) => {
      const on = b === btn;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    mapaStage.setAttribute("aria-labelledby", btn.id);
    $("#mapaUse").setAttribute("href", `#fig-${posturaActual}`);
    renderPuntos();
    puntoInfo.innerHTML = `<h3>Toque un número</h3><p>Verá por qué esa zona sufre y cómo protegerla.</p>`;
    if (foco) btn.focus();
  }
  posturaTabs.forEach((b, i) => {
    b.addEventListener("click", () => seleccionarPostura(b));
    b.addEventListener("keydown", (e) => {
      let j = null;
      if (e.key === "ArrowRight") j = (i + 1) % posturaTabs.length;
      if (e.key === "ArrowLeft") j = (i - 1 + posturaTabs.length) % posturaTabs.length;
      if (j !== null) {
        e.preventDefault();
        seleccionarPostura(posturaTabs[j], true);
      }
    });
  });
  renderPuntos();

  /* ==========================================================
     Prueba del dedo
     ========================================================== */
  const dedoResultado = $("#dedoResultado");
  $$(".muestra-btn").forEach((btn) => {
    const nombre = btn.id === "muestraA" ? "Piel A" : "Piel B";
    let inicio = 0;
    let contador = null;
    let presionando = false;
    const presionar = () => {
      if (presionando) return;
      presionando = true;
      inicio = performance.now();
      btn.classList.remove("is-blanched");
      btn.classList.add("is-pressing");
      dedoResultado.dataset.tipo = "";
      let s = 1;
      dedoResultado.textContent = `Presionando ${nombre}… 1`;
      contador = setInterval(() => {
        s += 1;
        dedoResultado.textContent = s <= 3 ? `Presionando ${nombre}… ${s}` : `Ya puede soltar ${nombre}.`;
      }, 1000);
    };
    const soltar = () => {
      if (!presionando) return;
      presionando = false;
      clearInterval(contador);
      btn.classList.remove("is-pressing");
      const ms = performance.now() - inicio;
      if (ms < 900) {
        dedoResultado.dataset.tipo = "";
        dedoResultado.textContent = "Mantenga presionado un poco más, unos 3 segundos, y luego suelte.";
        return;
      }
      if (btn.dataset.blanquea === "si") {
        btn.classList.add("is-blanched");
        requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.remove("is-blanched")));
        dedoResultado.dataset.tipo = "bien";
        dedoResultado.textContent = `${nombre} se puso blanca y luego recuperó su color: la sangre todavía circula. Quite el apoyo de esa zona y vuelva a revisarla en unas horas.`;
      } else {
        dedoResultado.dataset.tipo = "alerta";
        dedoResultado.textContent = `${nombre} siguió roja: no se puso blanca. Es una lesión por presión inicial (categoría 1). No apoye esa zona y avise hoy a su equipo de salud.`;
      }
    };
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      btn.setPointerCapture?.(e.pointerId);
      presionar();
    });
    btn.addEventListener("pointerup", soltar);
    btn.addEventListener("pointercancel", soltar);
    btn.addEventListener("lostpointercapture", soltar);
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
    btn.addEventListener("keydown", (e) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        presionar();
      }
    });
    btn.addEventListener("keyup", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        soltar();
      }
    });
  });

  /* ==========================================================
     Juego: ¿mito o verdad?
     ========================================================== */
  const PREGUNTAS = [
    { tema: "piel", t: "Masajear una zona enrojecida ayuda a que circule la sangre.", r: "mito", e: "Frotar o masajear una zona roja puede dañar aún más los tejidos. Quite el apoyo de esa zona y avise si no mejora." },
    { tema: "posicion", t: "De lado, es mejor quedar solo un poco inclinado, unos 30°, que completamente de lado.", r: "verdad", e: "Completamente de lado, todo el peso cae sobre el hueso de la cadera. Con unos 30° y una almohada en la espalda, el peso se reparte." },
    { tema: "superficie", t: "Un cojín con forma de rosca, con hoyo al centro, es ideal para no hacer presión.", r: "mito", e: "Las roscas o flotadores aprietan la piel alrededor del hoyo y dificultan la circulación. Use un cojín antiescaras." },
    { tema: "posicion", t: "Los talones deben quedar «flotando», sin tocar el colchón.", r: "verdad", e: "Ponga la almohada bajo las pantorrillas, no bajo los talones, con las rodillas apenas dobladas." },
    { tema: "superficie", t: "Si tengo un colchón antiescaras, ya no necesito cambiar de posición.", r: "mito", e: "El colchón ayuda, pero no reemplaza los cambios de posición." },
    { tema: "revise", t: "En piel morena u oscura, el enrojecimiento puede no notarse.", r: "verdad", e: "Por eso hay que fijarse también en el calor, la dureza, la hinchazón, el dolor o un color más oscuro o morado." },
    { tema: "posicion", t: "Para acomodar a la persona en la cama, conviene arrastrarla con cuidado.", r: "mito", e: "Arrastrar produce roce y daña la piel. Levántela con una sábana y con ayuda de otra persona." },
    { tema: "comida", t: "Comer proteínas y tomar agua ayuda a que la piel resista mejor.", r: "verdad", e: "La piel necesita proteínas, energía y agua para mantenerse firme y repararse." },
    { tema: "revise", t: "Una lesión por presión siempre empieza como una herida abierta.", r: "mito", e: "Suele empezar como una zona roja que no se pone blanca al presionar, o como piel morada o dura. A veces el daño empieza por dentro." },
    { tema: "piel", t: "Poner alcohol o colonia sobre la piel la protege.", r: "mito", e: "El alcohol y la colonia resecan la piel y la vuelven más frágil. Mejor una crema hidratante sin perfume." },
  ];
  const INSIGNIAS = {
    puntada: "Primera puntada",
    ojo: "Ojo atento",
    guardian: "Guardián de la piel",
    aprendiz: "Aprendiz de los 6 cuidados",
  };
  const ganadas = new Set(store.get("insignias", []));
  function renderInsignias(nueva) {
    $$(".insignia").forEach((li) => {
      const id = li.dataset.insignia;
      li.classList.toggle("is-ganada", ganadas.has(id));
      li.classList.toggle("is-nueva", id === nueva);
    });
  }
  function ganarInsignia(id) {
    if (ganadas.has(id)) return;
    ganadas.add(id);
    store.set("insignias", [...ganadas]);
    renderInsignias(id);
    toast(`¡Nueva insignia bordada: ${INSIGNIAS[id]}!`);
  }

  const quiz = { orden: [], i: 0, aciertos: 0, marcas: [] };
  const btnResp = $$("[data-respuesta]");
  function barajar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function iniciarQuiz() {
    quiz.orden = barajar(PREGUNTAS.map((_, i) => i));
    quiz.i = 0;
    quiz.aciertos = 0;
    quiz.marcas = [];
    $("#quizPregunta").hidden = false;
    $("#quizFinal").hidden = true;
    renderPregunta();
  }
  function renderHilo() {
    const box = $("#quizHilo");
    box.textContent = "";
    PREGUNTAS.forEach((_, i) => {
      const s = document.createElement("span");
      if (quiz.marcas[i] === true) s.className = "is-ok";
      else if (quiz.marcas[i] === false) s.className = "is-no";
      else if (i === quiz.i) s.className = "is-now";
      box.appendChild(s);
    });
  }
  function renderPregunta() {
    const q = PREGUNTAS[quiz.orden[quiz.i]];
    $("#quizPaso").textContent = `Pregunta ${quiz.i + 1} de ${PREGUNTAS.length}`;
    $("#quizPuntos").textContent = `${quiz.aciertos} ${quiz.aciertos === 1 ? "acierto" : "aciertos"}`;
    $("#quizAfirmacion").textContent = `«${q.t}»`;
    btnResp.forEach((b) => {
      b.disabled = false;
      b.classList.remove("is-correct", "is-wrong");
    });
    $("#quizFeedback").hidden = true;
    $("#quizSiguiente").hidden = true;
    renderHilo();
  }
  btnResp.forEach((b) =>
    b.addEventListener("click", () => {
      const q = PREGUNTAS[quiz.orden[quiz.i]];
      const ok = b.dataset.respuesta === q.r;
      quiz.marcas[quiz.i] = ok;
      if (ok) quiz.aciertos += 1;
      btnResp.forEach((o) => {
        o.disabled = true;
        if (o.dataset.respuesta === q.r) o.classList.add("is-correct");
        else if (o === b) o.classList.add("is-wrong");
      });
      $("#quizFeedbackTitulo").textContent = ok ? "¡Correcto!" : `No exactamente: es ${q.r === "mito" ? "un mito" : "verdad"}.`;
      $("#quizFeedbackTexto").textContent = q.e;
      $("#quizFeedback").hidden = false;
      const ultima = quiz.i === PREGUNTAS.length - 1;
      const sig = $("#quizSiguiente");
      sig.hidden = false;
      sig.firstChild.textContent = ultima ? "Ver mi resultado " : "Siguiente pregunta ";
      $("#quizPuntos").textContent = `${quiz.aciertos} ${quiz.aciertos === 1 ? "acierto" : "aciertos"}`;
      renderHilo();
      ganarInsignia("puntada");
      if (quiz.aciertos >= 5) ganarInsignia("ojo");
      sig.focus({ preventScroll: true });
    })
  );
  $("#quizSiguiente").addEventListener("click", () => {
    detenerLectura();
    if (quiz.i < PREGUNTAS.length - 1) {
      quiz.i += 1;
      renderPregunta();
      $("#quizAfirmacion").focus?.();
      return;
    }
    const n = quiz.aciertos;
    const mejor = Math.max(n, store.get("mejorPuntaje", 0));
    store.set("mejorPuntaje", mejor);
    const fallos = quiz.orden.filter((_, i) => quiz.marcas[i] === false).map((qi) => PREGUNTAS[qi].tema);
    const partidas = store.get("partidas", []);
    partidas.push({ fecha: new Date().toISOString(), aciertos: n, total: PREGUNTAS.length, fallos });
    store.set("partidas", partidas.slice(-60));
    renderProgreso();
    if (n >= 8) ganarInsignia("guardian");
    $("#quizPregunta").hidden = true;
    $("#quizFinal").hidden = false;
    $("#quizFinalTitulo").textContent = n >= 8 ? `¡${n} de 10! Es un guardián de la piel.` : n >= 5 ? `${n} de 10: ¡va muy bien!` : `${n} de 10: cada intento enseña.`;
    $("#quizFinalTexto").textContent = `Su mejor resultado: ${mejor} de 10. Repase los seis cuidados y vuelva a jugar cuando quiera.`;
    renderHilo();
    $("#quizOtraVez").focus({ preventScroll: true });
  });
  $("#quizOtraVez").addEventListener("click", iniciarQuiz);

  /* ---------- Mi progreso ---------- */
  const TEMA_NOMBRE = {
    posicion: "Cambie de posición",
    piel: "Piel limpia y seca",
    revise: "Revise la piel a diario",
    superficie: "Colchón y cojín adecuados",
    movimiento: "Muévase todo lo que pueda",
    comida: "Coma bien y tome agua",
  };
  const fechaCorta = (iso) => new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "short" }).replace(".", "");
  const fechaMini = (iso) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };
  function renderProgreso() {
    const todas = store.get("partidas", []);
    const resumen = $("#progresoResumen");
    const chart = $("#progresoChart");
    const reforzar = $("#progresoReforzar");
    const tablaBox = $("#progresoTablaBox");
    if (!todas.length) {
      chart.hidden = true;
      reforzar.hidden = true;
      tablaBox.hidden = true;
      return;
    }
    const primera = todas[0];
    const ultima = todas[todas.length - 1];
    const delta = ultima.aciertos - primera.aciertos;
    resumen.textContent = "";
    const linea = (txt, fuerte) => {
      const st = document.createElement("strong");
      st.textContent = fuerte;
      resumen.append(txt, st);
    };
    if (todas.length === 1) {
      linea("Primera partida: ", `${ultima.aciertos} de ${ultima.total}`);
      resumen.append(". Juegue otra vez otro día para ver si mejora.");
    } else {
      linea("Primera partida: ", `${primera.aciertos} de ${primera.total}`);
      linea(" · Última: ", `${ultima.aciertos} de ${ultima.total}`);
      resumen.append(delta > 0 ? ` · ¡Mejoró ${delta} ${delta === 1 ? "acierto" : "aciertos"}!` : delta === 0 ? " · Se mantiene igual." : ` · ${-delta} menos que la primera vez: repase los cuidados.`);
    }
    // columnas: últimas 10 partidas
    const visibles = todas.slice(-10);
    const offset = todas.length - visibles.length;
    const ol = $("#progresoCols");
    const tip = $("#progresoTip");
    ol.textContent = "";
    visibles.forEach((pt, i) => {
      const num = offset + i + 1;
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "progreso-col";
      const texto = `Partida ${num}, ${fechaCorta(pt.fecha)}: ${pt.aciertos} de ${pt.total}`;
      b.setAttribute("aria-label", texto);
      const barra = document.createElement("span");
      barra.className = "progreso-barra";
      barra.style.setProperty("--h", `${(pt.aciertos / pt.total) * 100}%`);
      const v = document.createElement("span");
      v.className = "progreso-valor";
      v.textContent = pt.aciertos;
      barra.appendChild(v);
      b.appendChild(barra);
      if (visibles.length <= 6 || i % 2 === visibles.length % 2 || i === visibles.length - 1) {
        const f = document.createElement("span");
        f.className = "progreso-fecha";
        f.textContent = fechaMini(pt.fecha);
        b.appendChild(f);
      }
      const mostrar = () => {
        tip.hidden = false;
        tip.textContent = "";
        const st = document.createElement("strong");
        st.textContent = `${pt.aciertos} de ${pt.total}`;
        tip.append(st, `Partida ${num} · ${fechaCorta(pt.fecha)}`);
        const plot = tip.parentElement.getBoundingClientRect();
        const r = b.getBoundingClientRect();
        const x = Math.min(Math.max(r.left + r.width / 2 - plot.left, 70), plot.width - 70);
        tip.style.setProperty("--x", `${x}px`);
      };
      b.addEventListener("pointerenter", mostrar);
      b.addEventListener("focus", mostrar);
      b.addEventListener("click", mostrar);
      b.addEventListener("pointerleave", () => (tip.hidden = true));
      b.addEventListener("blur", () => (tip.hidden = true));
      li.appendChild(b);
      ol.appendChild(li);
    });
    chart.hidden = false;
    // temas por reforzar según la última partida
    const temas = [...new Set(ultima.fallos || [])];
    reforzar.hidden = false;
    reforzar.textContent = "";
    if (!temas.length) {
      reforzar.textContent = "En su última partida acertó todo. ¡Excelente!";
    } else {
      reforzar.append("Para repasar: ");
      temas.forEach((t, i) => {
        const a = document.createElement("a");
        a.href = "#cuidados";
        a.textContent = TEMA_NOMBRE[t] || t;
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const tab = $(`[aria-controls="panel-${t}"]`);
          if (tab) seleccionarCuidado(tab);
          $("#cuidados").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        });
        reforzar.append(a, i < temas.length - 1 ? ", " : ".");
      });
    }
    // tabla
    const tbody = $("#progresoTabla");
    tbody.textContent = "";
    todas.forEach((pt, i) => {
      const tr = document.createElement("tr");
      [String(i + 1), fechaCorta(pt.fecha), `${pt.aciertos} de ${pt.total}`].forEach((v) => {
        const td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tablaBox.hidden = false;
  }

  /* ==========================================================
     Semáforo
     ========================================================== */
  const revisor = $("#revisor");
  const RESULTADOS = {
    verde: "Si no marca nada y la piel se ve sana, está en verde: siga con sus cuidados de cada día.",
    amarillo: "Amarillo: refuerce los cuidados y vigile. Quite el apoyo de esa zona, cambie de posición más seguido y vuelva a mirar en unas horas. Si no mejora, consulte.",
    rojo: "Rojo: consulte hoy a su equipo de salud (CESFAM o atención domiciliaria). Mientras tanto, no apoye a la persona sobre esa zona.",
    urgencia: "Urgencia: acuda ahora al servicio de urgencia más cercano (SAPU, SAR u hospital).",
  };
  function evaluarSemaforo() {
    const marcadas = $$("input:checked", revisor).map((i) => i.value);
    const nivel = marcadas.includes("urgencia") ? "urgencia" : marcadas.includes("rojo") ? "rojo" : marcadas.includes("amarillo") ? "amarillo" : "verde";
    const r = $("#revisorResultado");
    r.dataset.nivel = nivel;
    r.textContent = RESULTADOS[nivel];
    $$(".luz").forEach((l) => {
      l.classList.toggle("is-activa", marcadas.length > 0 && l.dataset.luz === nivel);
    });
  }
  revisor.addEventListener("change", evaluarSemaforo);
  revisor.addEventListener("reset", () => setTimeout(evaluarSemaforo, 0));

  /* ==========================================================
     Autoevaluación de riesgo
     ========================================================== */
  const riesgoForm = $("#riesgoForm");
  const CAMPOS = ["sensibilidad", "humedad", "actividad", "movilidad", "nutricion", "roce"];
  const NIVELES = [
    { max: 12, t: "Riesgo alto", d: "Converse pronto con su equipo de salud sobre un colchón o cojín especial y un plan de cambios de posición. Revise la piel al menos dos veces al día y use el registro de «Mi día»." },
    { max: 14, t: "Riesgo moderado", d: "Cambie de posición con regularidad, use cojín antiescaras al estar sentado y revise la piel todos los días. Comente el resultado con su equipo de salud." },
    { max: 18, t: "Riesgo bajo", d: "Mantenga los cuidados diarios: moverse, piel limpia y seca, buena alimentación y revisión de la piel." },
    { max: 23, t: "Sin riesgo aparente", d: "Siga activo. Si la salud cambia, por ejemplo tras una hospitalización o si pasa más tiempo en cama, vuelva a responder." },
  ];
  function evaluarRiesgo(guardar) {
    const datos = new FormData(riesgoForm);
    const valores = CAMPOS.map((c) => Number(datos.get(c)) || 0);
    if (guardar) store.set("riesgo", Object.fromEntries(CAMPOS.map((c, i) => [c, valores[i]])));
    const faltan = valores.filter((v) => !v).length;
    const res = $("#riesgoResultado");
    if (faltan) {
      res.hidden = true;
      $("#riesgoPendiente").hidden = false;
      $("#riesgoPendiente").textContent =
        faltan === 6 ? "Responda las 6 preguntas para ver el resultado." : `Le ${faltan === 1 ? "falta 1 pregunta" : `faltan ${faltan} preguntas`} para ver el resultado.`;
      return;
    }
    const total = valores.reduce((a, b) => a + b, 0);
    const nivel = NIVELES.find((n) => total <= n.max);
    $("#riesgoPendiente").hidden = true;
    res.hidden = false;
    $("#riesgoTitulo").textContent = nivel.t;
    $("#riesgoTexto").textContent = nivel.d;
    $("#riesgoPuntaje").textContent = total;
    $("#riesgoAguja").style.setProperty("--pos", `${((total - 6 + 0.5) / 18) * 100}%`);
  }
  riesgoForm.addEventListener("change", () => evaluarRiesgo(true));
  const riesgoGuardado = store.get("riesgo", null);
  if (riesgoGuardado) {
    CAMPOS.forEach((c) => {
      const v = riesgoGuardado[c];
      const inp = v && riesgoForm.querySelector(`input[name="${c}"][value="${v}"]`);
      if (inp) inp.checked = true;
    });
  }
  evaluarRiesgo(false);

  /* ==========================================================
     Lectura en voz alta
     ========================================================== */
  const tts = "speechSynthesis" in window ? window.speechSynthesis : null;
  let botonLeyendo = null;
  function vozEspanol() {
    const voces = tts.getVoices();
    const pref = ["es-CL", "es-419", "es-US", "es-MX", "es-AR", "es-ES"];
    for (const l of pref) {
      const v = voces.find((x) => x.lang && x.lang.replace("_", "-").toLowerCase() === l.toLowerCase());
      if (v) return v;
    }
    return voces.find((x) => x.lang && x.lang.toLowerCase().startsWith("es")) || null;
  }
  function textoDe(raiz) {
    const sel = "h2, h3, p, li, legend, label.opcion, .quiz-afirmacion";
    const nodos = $$(sel, raiz).filter((n) => {
      if (n.closest("svg, .no-leer, .cuidados-tabs, button, [hidden]")) return false;
      if (!n.getClientRects().length) return false;
      return !$$(sel, n).length;
    });
    return nodos.map((n) => n.textContent.replace(/\s+/g, " ").trim()).filter(Boolean).join(". ");
  }
  function detenerLectura() {
    if (!tts) return;
    tts.cancel();
    if (botonLeyendo) botonLeyendo.setAttribute("aria-pressed", "false");
    botonLeyendo = null;
  }
  function leer(btn) {
    if (botonLeyendo === btn) {
      detenerLectura();
      return;
    }
    detenerLectura();
    const id = btn.dataset.leer;
    const seccion = $("#" + id);
    let texto = "";
    if (id === "cuidados") {
      const panel = $(".cuidado-panel:not([hidden])");
      texto = textoDe(panel);
    } else if (id === "jugar") {
      texto = textoDe($("#quiz"));
    } else {
      texto = textoDe(seccion);
    }
    if (!texto) return;
    const u = new SpeechSynthesisUtterance(texto);
    const v = vozEspanol();
    if (v) u.voice = v;
    u.lang = v ? v.lang : "es-CL";
    u.rate = 0.92;
    u.onend = u.onerror = () => {
      if (botonLeyendo === btn) {
        btn.setAttribute("aria-pressed", "false");
        botonLeyendo = null;
      }
    };
    botonLeyendo = btn;
    btn.setAttribute("aria-pressed", "true");
    tts.speak(u);
  }
  if (tts) {
    tts.getVoices();
    $$("[data-leer]").forEach((b) => b.addEventListener("click", () => leer(b)));
  } else {
    $$("[data-leer]").forEach((b) => (b.hidden = true));
  }

  /* ==========================================================
     Búsqueda
     ========================================================== */
  const buscador = $("#buscador");
  const input = $("#buscadorInput");
  const resultados = $("#buscadorResultados");
  const norm = (s) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  const indice = $$("[data-buscar]").map((n) => {
    const [titulo, claves = ""] = n.dataset.buscar.split("|");
    const destino = n.id ? n : n.closest("[id]");
    const parrafo = n.querySelector("p");
    return {
      n,
      titulo,
      destino: destino ? destino.id : "inicio",
      resumen: parrafo ? parrafo.textContent.trim().slice(0, 110) : "",
      bolsa: norm(`${titulo} ${claves} ${n.textContent}`),
      cabeza: norm(`${titulo} ${claves}`),
    };
  });
  function buscar(q) {
    resultados.textContent = "";
    const palabras = norm(q).split(/\s+/).filter((w) => w.length > 1);
    if (!palabras.length) return;
    const hits = indice
      .map((it) => ({
        it,
        score: palabras.reduce((s, w) => s + (it.cabeza.includes(w) ? 3 : it.bolsa.includes(w) ? 1 : -99), 0),
      }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    if (!hits.length) {
      const li = document.createElement("li");
      li.className = "buscador-vacio";
      li.textContent = "No encontramos nada con esas palabras. Pruebe con otra, por ejemplo «talones» o «agua».";
      resultados.appendChild(li);
      return;
    }
    hits.forEach(({ it }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${it.destino}`;
      a.innerHTML = `<strong></strong><span></span>`;
      a.querySelector("strong").textContent = it.titulo;
      a.querySelector("span").textContent = it.resumen;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        buscador.close();
        if (it.n.classList.contains("cuidado-panel")) {
          const tab = $(`[aria-controls="${it.n.id}"]`);
          seleccionarCuidado(tab);
          $("#cuidados").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        } else {
          $("#" + it.destino).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
      li.appendChild(a);
      resultados.appendChild(li);
    });
  }
  $("#btnBuscar").addEventListener("click", () => {
    if (typeof buscador.showModal === "function") buscador.showModal();
    else buscador.setAttribute("open", "");
    input.focus();
  });
  $("#buscadorCerrar").addEventListener("click", () => buscador.close());
  buscador.addEventListener("click", (e) => {
    if (e.target === buscador) buscador.close();
  });
  input.addEventListener("input", () => buscar(input.value));
  $$("#buscadorSugerencias .chip").forEach((c) =>
    c.addEventListener("click", () => {
      input.value = c.textContent;
      buscar(input.value);
      input.focus();
    })
  );

  /* ==========================================================
     Navegación inferior: sección actual
     ========================================================== */
  const MAPA_NAV = { inicio: "#inicio", porque: "#porque", cuidados: "#porque", video: "#porque", revisar: "#porque", "mi-dia": "#mi-dia", jugar: "#jugar", alarma: "#alarma" };
  const navLinks = $$(".bottomnav a");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const destino = MAPA_NAV[en.target.id];
          navLinks.forEach((a) => {
            if (destino && a.getAttribute("href") === destino) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main > section").forEach((s) => io.observe(s));
  }

  /* ==========================================================
     Ciclo: reloj, cambio de día y avisos
     ========================================================== */
  function tick() {
    const k = dateKey();
    if (k !== diaKey) {
      diaKey = k;
      dia = cargarDia(k);
      renderTodoDia();
    } else {
      ultimoNuevo = null;
      renderEstado();
    }
    revisarAviso();
  }
  function renderTodoDia() {
    renderEstado();
    renderRegistro();
    renderAgua();
    renderChecks();
    renderSemana();
    preseleccionar();
  }

  renderIntervalo();
  renderAvisos();
  renderTodoDia();
  renderAprendidos();
  renderInsignias();
  renderProgreso();
  iniciarQuiz();
  setInterval(tick, 30000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.startsWith(PREFIX)) {
      dia = cargarDia(diaKey);
      renderTodoDia();
    }
  });
})();
