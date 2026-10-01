/* CuidaPiel · Mis desafíos de hospitalización.
   Prueba de ingreso (forma A), desafío diario (pool D), desafíos prácticos,
   prueba de alta (forma B) y resumen exportable. Todo se guarda solo en este equipo. */
(() => {
  "use strict";

  const BANCO = window.CUIDAPIEL_BANCO;
  const app = document.getElementById("desafiosApp");
  if (!BANCO || !app) return;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Almacenamiento ---------- */
  const KEY = "cuidapiel:eval";
  const ARCHIVO = "cuidapiel:evalArchivo";
  const leer = (k, d) => {
    try {
      const v = localStorage.getItem(k);
      return v === null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  };
  const escribir = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* sin almacenamiento: la sesión sigue en memoria */
    }
  };
  const nuevoEstado = () => ({ codigo: "", inicio: null, pre: null, post: null, enCurso: null, diarios: {}, practicos: {} });
  let ev = Object.assign(nuevoEstado(), leer(KEY, {}));
  const guardar = () => escribir(KEY, ev);

  /* ---------- Utilidades ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fechaCL = (iso) => {
    const d = new Date(iso);
    return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
  };
  const diasEntre = (a, b) => {
    const d0 = new Date(a);
    const d1 = new Date(b);
    d0.setHours(0, 0, 0, 0);
    d1.setHours(0, 0, 0, 0);
    return Math.round((d1 - d0) / 86400000);
  };
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const icon = (id, cls = "icon icon-sm") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 4200);
  }
  function enfocar(sel) {
    const n = $(sel, app);
    if (!n) return;
    n.setAttribute("tabindex", "-1");
    n.focus({ preventScroll: true });
    const top = n.getBoundingClientRect().top;
    if (top < 90 || top > window.innerHeight * 0.7) n.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  const FORMA_A = BANCO.forma("A");
  const FORMA_B = BANCO.forma("B");
  const POOL_D = BANCO.forma("D");
  const DOMINIOS = Object.keys(BANCO.DOMINIOS);

  function puntaje(prueba) {
    if (!prueba) return null;
    const ok = prueba.ok || {};
    const total = Object.values(ok).filter(Boolean).length;
    const porDominio = {};
    DOMINIOS.forEach((d) => (porDominio[d] = 0));
    Object.entries(ok).forEach(([id, bien]) => {
      if (bien) porDominio[BANCO.porId(id).dominio] += 1;
    });
    return { total, de: Object.keys(ok).length, porDominio };
  }

  /* ==========================================================
     Vistas
     ========================================================== */
  function render() {
    if (ev.enCurso) return vistaPrueba();
    if (!ev.inicio || !ev.pre) return vistaInicio();
    if (!ev.post) return vistaPanel();
    return vistaResumen();
  }

  /* ---------- Inicio ---------- */
  function vistaInicio() {
    app.innerHTML = `
      <div class="desafios-grid">
        <div class="patch desafio-intro">
          <h3 class="h3">Cómo funciona</h3>
          <ol class="pasos">
            <li><span class="paso-num">1</span><div><strong>Prueba de ingreso</strong><span>12 preguntas, unos 5 minutos. Muestra lo que ya sabe.</span></div></li>
            <li><span class="paso-num">2</span><div><strong>Un desafío cada día</strong><span>3 preguntas con explicación y 3 desafíos prácticos para tocar y aprender.</span></div></li>
            <li><span class="paso-num">3</span><div><strong>Prueba de alta</strong><span>Otras 12 preguntas, parecidas a las del ingreso, para ver cuánto aprendió.</span></div></li>
          </ol>
          <p class="desafio-nota">Sus respuestas quedan solo en este equipo. Al alta podrá descargar o imprimir el resumen para su equipo de salud. Las preguntas están en proceso de validación por un panel de expertos.</p>
        </div>
        <form class="patch desafio-inicio" id="formInicio" novalidate>
          <h3 class="h3">Empezar</h3>
          <label class="campo" for="codigoPaciente">
            <span class="campo-label">Código que le dio su equipo (opcional)</span>
            <input id="codigoPaciente" name="codigo" type="text" inputmode="text" autocomplete="off" maxlength="16" placeholder="Por ejemplo: CP-0042" value="${esc(ev.codigo || "")}" aria-describedby="codigoAyuda codigoError">
          </label>
          <p class="campo-ayuda" id="codigoAyuda">Use solo el código que le entregue enfermería o farmacia. No escriba su nombre ni su RUT.</p>
          <p class="campo-error" id="codigoError" role="alert"></p>
          <button class="btn btn-sol btn-block" type="submit">${icon("arrow-right")}Comenzar la prueba de ingreso</button>
        </form>
      </div>`;
    const form = $("#formInicio", app);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const valor = $("#codigoPaciente", app).value.trim();
      const error = $("#codigoError", app);
      const pareceRut = /^\d{1,2}\.?\d{3}\.?\d{3}-?[\dkK]$/.test(valor) || /^\d{7,9}[\dkK]?$/.test(valor.replace(/[.-]/g, ""));
      if (valor && pareceRut) {
        error.textContent = "Eso parece un RUT. Por privacidad, use el código que le dio su equipo, no sus datos personales.";
        $("#codigoPaciente", app).setAttribute("aria-invalid", "true");
        return;
      }
      if (valor && !/^[A-Za-z0-9-]{2,16}$/.test(valor)) {
        error.textContent = "El código solo puede tener letras, números y guiones (máximo 16).";
        $("#codigoPaciente", app).setAttribute("aria-invalid", "true");
        return;
      }
      ev.codigo = valor.toUpperCase();
      ev.inicio = ev.inicio || new Date().toISOString();
      ev.enCurso = { tipo: "pre", i: 0, resp: {} };
      guardar();
      render();
      enfocar(".prueba-pregunta");
    });
  }

  /* ---------- Prueba de ingreso o alta ---------- */
  function vistaPrueba() {
    const c = ev.enCurso;
    const items = c.tipo === "pre" ? FORMA_A : FORMA_B;
    const it = items[c.i];
    const elegido = c.resp[it.id];
    const nombre = c.tipo === "pre" ? "Prueba de ingreso" : "Prueba de alta";
    const ultima = c.i === items.length - 1;
    app.innerHTML = `
      <div class="patch prueba">
        <div class="quiz-meta"><span>${nombre}</span><span>Pregunta ${c.i + 1} de ${items.length}</span></div>
        <div class="quiz-hilo" aria-hidden="true">${items.map((x, i) => `<span class="${i < c.i ? "is-ok" : i === c.i ? "is-now" : ""}"></span>`).join("")}</div>
        <p class="prueba-pregunta" id="pruebaPregunta">${esc(it.t)}</p>
        <div class="alternativas" role="radiogroup" aria-labelledby="pruebaPregunta">
          ${it.op.map((o, i) => `<button type="button" class="alternativa" role="radio" aria-checked="${elegido === i}" data-i="${i}" tabindex="${elegido === i || (elegido === undefined && i === 0) ? 0 : -1}"><span class="alt-marca" aria-hidden="true">${"ABC"[i]}</span><span>${esc(o)}</span></button>`).join("")}
        </div>
        <p class="desafio-nota">En esta prueba no se muestran las respuestas correctas hasta el final. Responda lo que haría usted.</p>
        <div class="prueba-acciones">
          <button class="btn" type="button" id="pruebaAtras" ${c.i === 0 ? "disabled" : ""}>${icon("chevron-left")}Anterior</button>
          <button class="btn btn-sol" type="button" id="pruebaSig" ${elegido === undefined ? "disabled" : ""}>${ultima ? "Terminar y ver resultado" : "Siguiente"}${icon(ultima ? "check" : "chevron-right")}</button>
        </div>
      </div>`;
    const alts = $$(".alternativa", app);
    const elegir = (b) => {
      c.resp[it.id] = Number(b.dataset.i);
      guardar();
      alts.forEach((a) => {
        const on = a === b;
        a.setAttribute("aria-checked", String(on));
        a.tabIndex = on ? 0 : -1;
      });
      $("#pruebaSig", app).disabled = false;
    };
    alts.forEach((b, i) => {
      b.addEventListener("click", () => elegir(b));
      b.addEventListener("keydown", (e) => {
        let j = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % alts.length;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + alts.length) % alts.length;
        if (j !== null) {
          e.preventDefault();
          alts[j].focus();
          elegir(alts[j]);
        }
      });
    });
    $("#pruebaAtras", app).addEventListener("click", () => {
      c.i = Math.max(0, c.i - 1);
      guardar();
      render();
      enfocar(".prueba-pregunta");
    });
    $("#pruebaSig", app).addEventListener("click", () => {
      if (c.resp[it.id] === undefined) return;
      if (!ultima) {
        c.i += 1;
        guardar();
        render();
        enfocar(".prueba-pregunta");
        return;
      }
      const ok = {};
      items.forEach((x) => (ok[x.id] = c.resp[x.id] === x.ok));
      const registro = { fecha: new Date().toISOString(), resp: Object.assign({}, c.resp), ok };
      if (c.tipo === "pre") ev.pre = registro;
      else ev.post = registro;
      const tipo = c.tipo;
      ev.enCurso = null;
      guardar();
      render();
      if (tipo === "pre") {
        verRevision = "pre";
        render();
      }
      enfocar("h3");
      toast(tipo === "pre" ? "Prueba de ingreso guardada." : "Prueba de alta guardada. ¡Felicitaciones!");
    });
  }

  /* ---------- Panel de la hospitalización ---------- */
  let verRevision = null;
  let practicoAbierto = null;

  function filaDominios(p) {
    return DOMINIOS.map((d) => {
      const n = p.porDominio[d];
      return `<li><span class="dom-nombre">${esc(BANCO.DOMINIOS[d])}</span><span class="puntos-dom" role="img" aria-label="${n} de 2">${[0, 1].map((k) => `<i class="${k < n ? "is-on" : ""}"></i>`).join("")}</span></li>`;
    }).join("");
  }

  function revisionPrueba(registro, items) {
    return `<ul class="revision-lista">${items
      .map((it) => {
        const bien = registro.ok[it.id];
        return `<li class="${bien ? "is-bien" : "is-mal"}">${icon(bien ? "circle-check" : "circle-x", "icon")}<div><strong>${esc(it.t)}</strong><span>${bien ? "Correcto" : `Respuesta correcta: ${esc(it.op[it.ok])}`}. ${esc(it.e)}</span></div></li>`;
      })
      .join("")}</ul>`;
  }

  function diaHospital() {
    return ev.inicio ? diasEntre(ev.inicio, new Date()) : 0;
  }
  function itemsDelDia(n) {
    const base = (n * 3) % POOL_D.length;
    return [0, 1, 2].map((k) => POOL_D[(base + k) % POOL_D.length]);
  }
  function racha() {
    let r = 0;
    const d = new Date();
    if (!ev.diarios[dateKey(d)]?.completo) d.setDate(d.getDate() - 1);
    while (ev.diarios[dateKey(d)]?.completo) {
      r += 1;
      d.setDate(d.getDate() - 1);
    }
    return r;
  }
  function diasCompletos() {
    return Object.values(ev.diarios).filter((x) => x.completo).length;
  }

  function vistaPanel() {
    const p = puntaje(ev.pre);
    const hoy = dateKey();
    const diario = ev.diarios[hoy];
    const nDia = diaHospital();
    const totalDias = nDia + 1;
    const puntadas = Array.from({ length: Math.min(totalDias, 14) }, (_, k) => {
      const d = new Date(ev.inicio);
      d.setDate(d.getDate() + (totalDias > 14 ? totalDias - 14 : 0) + k);
      const hecho = ev.diarios[dateKey(d)]?.completo;
      return `<i class="${hecho ? "is-on" : ""}" title="${fechaCL(d.toISOString())}"></i>`;
    }).join("");

    app.innerHTML = `
      <div class="desafios-grid">
        <div class="desafio-col">
          <section class="patch" aria-labelledby="ingresoTit">
            <h3 class="h3" id="ingresoTit">Mi prueba de ingreso</h3>
            <p class="resultado-grande"><strong>${p.total} de ${p.de}</strong> correctas · ${fechaCL(ev.pre.fecha)}${ev.codigo ? ` · Código ${esc(ev.codigo)}` : ""}</p>
            <ul class="dominios">${filaDominios(p)}</ul>
            <button class="link-btn" type="button" id="verRevisionPre" aria-expanded="${verRevision === "pre"}">${verRevision === "pre" ? "Ocultar las respuestas" : "Ver las respuestas y explicaciones"}</button>
            ${verRevision === "pre" ? revisionPrueba(ev.pre, FORMA_A) : ""}
          </section>

          <section class="patch diario" aria-labelledby="diarioTit">
            <h3 class="h3" id="diarioTit">Desafío de hoy</h3>
            <p class="diario-dia">Día ${nDia + 1} de su hospitalización · Racha: <strong>${racha()} ${racha() === 1 ? "día" : "días"}</strong></p>
            <div class="puntadas-dias" role="img" aria-label="Días con el desafío completo: ${diasCompletos()} de ${totalDias}">${puntadas}</div>
            <div id="diarioCuerpo"></div>
          </section>
        </div>

        <div class="desafio-col">
          <section class="patch practicos" aria-labelledby="practicosTit">
            <h3 class="h3" id="practicosTit">Desafíos prácticos</h3>
            <div id="practicoCuerpo"></div>
          </section>

          <section class="patch alta" aria-labelledby="altaTit">
            <h3 class="h3" id="altaTit">Prueba de alta</h3>
            <p>Hágala el día en que se va a su casa. Son 12 preguntas parecidas a las del ingreso.</p>
            <button class="btn btn-cielo btn-block" type="button" id="btnAlta">${icon("arrow-right")}Comenzar la prueba de alta</button>
          </section>
        </div>
      </div>`;

    $("#verRevisionPre", app).addEventListener("click", () => {
      verRevision = verRevision === "pre" ? null : "pre";
      render();
      enfocar("#verRevisionPre");
    });
    $("#btnAlta", app).addEventListener("click", () => {
      if (nDia === 0 && !window.confirm("Hizo la prueba de ingreso hoy. Lo ideal es hacer la de alta al irse a su casa. ¿Quiere comenzarla igual?")) return;
      ev.enCurso = { tipo: "post", i: 0, resp: {} };
      guardar();
      render();
      enfocar(".prueba-pregunta");
    });
    renderDiario(diario, nDia);
    renderPracticos();
  }

  /* ---------- Desafío diario ---------- */
  function renderDiario(diario, nDia) {
    const cuerpo = $("#diarioCuerpo", app);
    const hoy = dateKey();
    const items = itemsDelDia(nDia);
    const estado = ev.diarios[hoy] || { ids: items.map((x) => x.id), resp: {}, completo: false };
    if (estado.completo) {
      const bien = Object.values(estado.resp).filter((r) => r.ok).length;
      cuerpo.innerHTML = `<p class="diario-listo">${icon("badge-check", "icon")}<span><strong>¡Desafío de hoy completo!</strong> ${bien} de 3 correctas. Vuelva mañana por uno nuevo.</span></p>`;
      return;
    }
    const idx = estado.ids.findIndex((id) => !estado.resp[id]);
    const it = BANCO.porId(estado.ids[idx]);
    cuerpo.innerHTML = `
      <p class="diario-paso">Pregunta ${idx + 1} de 3</p>
      <p class="prueba-pregunta diario-pregunta">${esc(it.t)}</p>
      <div class="alternativas">${it.op.map((o, i) => `<button type="button" class="alternativa" data-i="${i}"><span class="alt-marca" aria-hidden="true">${"ABC"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>
      <div class="quiz-feedback" id="diarioFeedback" hidden></div>
      <button class="btn btn-cielo" type="button" id="diarioSig" hidden>${idx === 2 ? "Terminar el desafío de hoy" : "Siguiente pregunta"}${icon("arrow-right")}</button>`;
    const alts = $$(".alternativa", cuerpo);
    alts.forEach((b) =>
      b.addEventListener("click", () => {
        const i = Number(b.dataset.i);
        const ok = i === it.ok;
        estado.resp[it.id] = { r: i, ok };
        ev.diarios[hoy] = estado;
        guardar();
        alts.forEach((a) => {
          a.disabled = true;
          if (Number(a.dataset.i) === it.ok) a.classList.add("is-correct");
          else if (a === b) a.classList.add("is-wrong");
        });
        const fb = $("#diarioFeedback", cuerpo);
        fb.hidden = false;
        fb.innerHTML = `<strong>${ok ? "¡Correcto!" : "No exactamente."}</strong><span>${esc(it.e)}</span>`;
        const sig = $("#diarioSig", cuerpo);
        sig.hidden = false;
        sig.focus({ preventScroll: true });
      })
    );
    $("#diarioSig", cuerpo).addEventListener("click", () => {
      if (Object.keys(estado.resp).length === 3) {
        estado.completo = true;
        ev.diarios[hoy] = estado;
        guardar();
        toast(`¡Desafío de hoy completo! Racha: ${racha()} ${racha() === 1 ? "día" : "días"}.`);
        render();
        enfocar("#diarioTit");
        return;
      }
      renderDiario(estado, nDia);
      enfocar(".diario-pregunta");
    });
  }

  /* ---------- Desafíos prácticos ---------- */
  const PRACTICOS = {
    almohadas: { titulo: "Ponga las almohadas", desc: "Elija dónde van las almohadas para proteger talones, cadera y rodillas.", icono: "bed-double", max: 3 },
    puntos: { titulo: "Encuentre los puntos de presión", desc: "Toque en la figura las 5 zonas que más sufren boca arriba.", icono: "eye", max: 5 },
    piel: { titulo: "¿Qué hago con esta piel?", desc: "Lea cada situación y elija el color del semáforo.", icono: "triangle-alert", max: 5 },
  };
  function registrarPractico(id, puntos) {
    const r = ev.practicos[id] || { primero: null, mejor: 0, intentos: 0 };
    r.intentos += 1;
    if (r.primero === null) r.primero = puntos;
    r.mejor = Math.max(r.mejor, puntos);
    r.fecha = new Date().toISOString();
    ev.practicos[id] = r;
    guardar();
  }
  function renderPracticos() {
    const cuerpo = $("#practicoCuerpo", app);
    if (practicoAbierto) return abrirPractico(practicoAbierto, cuerpo);
    cuerpo.innerHTML = `<ul class="practicos-lista">${Object.entries(PRACTICOS)
      .map(([id, p]) => {
        const r = ev.practicos[id];
        return `<li><span class="practico-icono">${icon(p.icono, "icon")}</span><div><strong>${p.titulo}</strong><span>${p.desc}</span>${r ? `<span class="practico-mejor">Mejor resultado: ${r.mejor} de ${p.max}</span>` : ""}</div><button class="btn btn-sm" type="button" data-practico="${id}">${r ? "Repetir" : "Practicar"}</button></li>`;
      })
      .join("")}</ul>`;
    $$("[data-practico]", cuerpo).forEach((b) =>
      b.addEventListener("click", () => {
        practicoAbierto = b.dataset.practico;
        renderPracticos();
        enfocar("#practicoTitulo");
      })
    );
  }
  function cerrarPractico() {
    practicoAbierto = null;
    renderPracticos();
    enfocar("#practicosTit");
  }
  function cabeceraPractico(id) {
    return `<div class="practico-cab"><h4 id="practicoTitulo">${PRACTICOS[id].titulo}</h4><button class="link-btn" type="button" id="practicoVolver">${icon("chevron-left")}Volver</button></div>`;
  }

  function abrirPractico(id, cuerpo) {
    if (id === "almohadas") return practicoAlmohadas(cuerpo);
    if (id === "puntos") return practicoPuntos(cuerpo);
    return practicoPiel(cuerpo);
  }

  // 1) Almohadas: paso 1 boca arriba (talones) y paso 2 de lado (espalda y rodillas)
  function practicoAlmohadas(cuerpo) {
    let puntos = 0;
    const paso1 = () => {
      cuerpo.innerHTML = `${cabeceraPractico("almohadas")}
        <p class="practico-consigna">Paso 1 de 2. Está boca arriba. ¿Dónde pone la almohada para que los talones queden en el aire?</p>
        <div class="practico-figura"><svg viewBox="0 88 400 126" aria-hidden="true"><use href="#fig-supino-sin" width="400" height="230" id="almUse"/><g id="almExtra"></g></svg></div>
        <div class="alternativas" id="almOps">
          <button type="button" class="alternativa" data-op="talones"><span class="alt-marca" aria-hidden="true">A</span><span>Debajo de los talones</span></button>
          <button type="button" class="alternativa" data-op="pantorrillas"><span class="alt-marca" aria-hidden="true">B</span><span>Debajo de las pantorrillas</span></button>
          <button type="button" class="alternativa" data-op="rodillas"><span class="alt-marca" aria-hidden="true">C</span><span>Solo debajo de las rodillas</span></button>
        </div>
        <div class="quiz-feedback" id="almFb" hidden></div>
        <button class="btn btn-cielo" type="button" id="almSig" hidden>Paso 2${icon("arrow-right")}</button>`;
      $("#practicoVolver", cuerpo).addEventListener("click", cerrarPractico);
      const extra = $("#almExtra", cuerpo);
      const POS = { talones: [368, 166, 20], rodillas: [262, 162, 20] };
      $$("#almOps .alternativa", cuerpo).forEach((b) =>
        b.addEventListener("click", () => {
          const op = b.dataset.op;
          const ok = op === "pantorrillas";
          $$("#almOps .alternativa", cuerpo).forEach((a) => {
            a.disabled = true;
            if (a.dataset.op === "pantorrillas") a.classList.add("is-correct");
            else if (a === b) a.classList.add("is-wrong");
          });
          if (ok) {
            puntos += 1;
            $("#almUse", cuerpo).setAttribute("href", "#fig-supino");
          } else {
            const [x, y, rx] = POS[op];
            extra.innerHTML = `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="7" fill="#fff" stroke="#141b4d" stroke-width="2"/><circle cx="370" cy="160" r="12" fill="none" stroke="#b3261e" stroke-width="4"/>`;
          }
          const fb = $("#almFb", cuerpo);
          fb.hidden = false;
          fb.innerHTML = ok
            ? "<strong>¡Correcto!</strong><span>Con la almohada bajo las pantorrillas y las rodillas apenas dobladas, los talones quedan flotando.</span>"
            : `<strong>No exactamente.</strong><span>${op === "talones" ? "Bajo los talones, la presión sigue sobre el talón." : "Solo bajo las rodillas, los talones siguen apoyados en el colchón."} La almohada va bajo las pantorrillas.</span>`;
          $("#almSig", cuerpo).hidden = false;
          $("#almSig", cuerpo).focus({ preventScroll: true });
        })
      );
      $("#almSig", cuerpo).addEventListener("click", () => {
        paso2();
        enfocar(".practico-consigna");
      });
    };
    const paso2 = () => {
      cuerpo.innerHTML = `${cabeceraPractico("almohadas")}
        <p class="practico-consigna">Paso 2 de 2. Está de lado, inclinado unos 30°. Marque los 2 lugares donde van las almohadas.</p>
        <div class="practico-figura"><svg viewBox="0 84 400 130" aria-hidden="true"><use href="#fig-lado-sin" width="400" height="230"/><g id="almExtra2"></g></svg></div>
        <div class="alternativas" id="almOps2">
          <button type="button" class="alternativa" role="checkbox" aria-checked="false" data-op="espalda"><span class="alt-marca" aria-hidden="true">${icon("check")}</span><span>En la espalda</span></button>
          <button type="button" class="alternativa" role="checkbox" aria-checked="false" data-op="rodillas"><span class="alt-marca" aria-hidden="true">${icon("check")}</span><span>Entre las rodillas</span></button>
          <button type="button" class="alternativa" role="checkbox" aria-checked="false" data-op="cadera"><span class="alt-marca" aria-hidden="true">${icon("check")}</span><span>Debajo de la cadera</span></button>
        </div>
        <div class="quiz-feedback" id="almFb2" hidden></div>
        <button class="btn btn-sol" type="button" id="almRevisar">Revisar</button>`;
      $("#practicoVolver", cuerpo).addEventListener("click", cerrarPractico);
      const DIBUJO = {
        espalda: '<rect x="96" y="96" width="132" height="18" rx="9" fill="#fff" stroke="#141b4d" stroke-width="2"/>',
        rodillas: '<ellipse cx="300" cy="150" rx="24" ry="9" fill="#fff" stroke="#141b4d" stroke-width="2"/>',
        cadera: '<ellipse cx="228" cy="168" rx="26" ry="7" fill="#fff" stroke="#b3261e" stroke-width="2"/>',
      };
      const extra = $("#almExtra2", cuerpo);
      const ops = $$("#almOps2 .alternativa", cuerpo);
      const dibujar = () => {
        extra.innerHTML = ops
          .filter((o) => o.getAttribute("aria-checked") === "true")
          .map((o) => DIBUJO[o.dataset.op])
          .join("");
      };
      ops.forEach((o) =>
        o.addEventListener("click", () => {
          o.setAttribute("aria-checked", String(o.getAttribute("aria-checked") !== "true"));
          dibujar();
        })
      );
      $("#almRevisar", cuerpo).addEventListener("click", (e) => {
        const marcadas = ops.filter((o) => o.getAttribute("aria-checked") === "true").map((o) => o.dataset.op);
        const buenas = marcadas.filter((m) => m !== "cadera").length;
        const malas = marcadas.includes("cadera") ? 1 : 0;
        const p2 = Math.max(0, buenas - malas);
        puntos += p2;
        ops.forEach((o) => {
          o.disabled = true;
          if (o.dataset.op !== "cadera") o.classList.add("is-correct");
          else if (o.getAttribute("aria-checked") === "true") o.classList.add("is-wrong");
        });
        extra.innerHTML = DIBUJO.espalda + DIBUJO.rodillas;
        registrarPractico("almohadas", puntos);
        const fb = $("#almFb2", cuerpo);
        fb.hidden = false;
        fb.innerHTML = `<strong>Resultado: ${puntos} de 3.</strong><span>Van en la espalda, para mantener la inclinación de 30°, y entre las rodillas. Debajo de la cadera la almohada aprieta justo el hueso que hay que proteger.</span>`;
        e.currentTarget.outerHTML = `<button class="btn btn-cielo" type="button" id="almFin">${icon("check")}Listo</button>`;
        $("#almFin", cuerpo).addEventListener("click", cerrarPractico);
        $("#almFin", cuerpo).focus({ preventScroll: true });
      });
    };
    paso1();
  }

  // 2) Puntos de presión boca arriba
  function practicoPuntos(cuerpo) {
    const ZONAS = [
      { id: "nuca", n: "Nuca", x: 44, y: 154, ok: true },
      { id: "omoplatos", n: "Omóplatos", x: 100, y: 166, ok: true },
      { id: "pecho", n: "Pecho", x: 125, y: 120, ok: false },
      { id: "codo", n: "Codos", x: 165, y: 156, ok: true },
      { id: "abdomen", n: "Abdomen", x: 200, y: 118, ok: false },
      { id: "sacro", n: "Sacro", x: 232, y: 166, ok: true },
      { id: "muslo", n: "Muslo", x: 285, y: 132, ok: false },
      { id: "talones", n: "Talones", x: 368, y: 154, ok: true },
    ];
    const [vx, vy, vw, vh] = [0, 88, 400, 126];
    cuerpo.innerHTML = `${cabeceraPractico("puntos")}
      <p class="practico-consigna">Toque las 5 zonas que más sufren cuando la persona está boca arriba. Luego toque «Revisar».</p>
      <div class="practico-figura mapa-stage practico-mapa">
        <svg viewBox="${vx} ${vy} ${vw} ${vh}" aria-hidden="true"><use href="#fig-supino" width="400" height="230"/></svg>
        <div>${ZONAS.map((z) => `<button type="button" class="zona" role="checkbox" aria-checked="false" aria-label="${z.n}" data-z="${z.id}" style="left:${(((z.x - vx) / vw) * 100).toFixed(2)}%;top:${(((z.y - vy) / vh) * 100).toFixed(2)}%"><span aria-hidden="true">${icon("check", "z-check")}${icon("x", "z-x")}</span></button>`).join("")}</div>
      </div>
      <p class="practico-cuenta" id="zonasCuenta" aria-live="polite">0 de 5 marcadas</p>
      <div class="quiz-feedback" id="zonasFb" hidden></div>
      <button class="btn btn-sol" type="button" id="zonasRevisar">Revisar</button>`;
    $("#practicoVolver", cuerpo).addEventListener("click", cerrarPractico);
    const botones = $$(".zona", cuerpo);
    const contar = () => {
      const n = botones.filter((b) => b.getAttribute("aria-checked") === "true").length;
      $("#zonasCuenta", cuerpo).textContent = `${n} de 5 marcadas`;
    };
    botones.forEach((b) =>
      b.addEventListener("click", () => {
        b.setAttribute("aria-checked", String(b.getAttribute("aria-checked") !== "true"));
        contar();
      })
    );
    $("#zonasRevisar", cuerpo).addEventListener("click", (e) => {
      let buenas = 0;
      let malas = 0;
      botones.forEach((b) => {
        const z = ZONAS.find((x) => x.id === b.dataset.z);
        const marcada = b.getAttribute("aria-checked") === "true";
        b.disabled = true;
        if (z.ok) {
          b.classList.add(marcada ? "is-correct" : "is-faltante");
          if (marcada) buenas += 1;
        } else if (marcada) {
          b.classList.add("is-wrong");
          malas += 1;
        }
        b.setAttribute("aria-label", `${z.n}: ${z.ok ? "zona de riesgo" : "no es zona de riesgo"}${marcada ? ", la marcó" : ""}`);
      });
      const pts = Math.max(0, buenas - malas);
      registrarPractico("puntos", pts);
      const fb = $("#zonasFb", cuerpo);
      fb.hidden = false;
      fb.innerHTML = `<strong>Resultado: ${pts} de 5.</strong><span>Boca arriba sufren la nuca, los omóplatos, los codos, el sacro y los talones: son huesos con poca grasa encima. ${malas ? "El pecho, el abdomen y el muslo no se apoyan en el colchón en esta posición." : ""}</span>`;
      e.currentTarget.outerHTML = `<button class="btn btn-cielo" type="button" id="zonasFin">${icon("check")}Listo</button>`;
      $("#zonasFin", cuerpo).addEventListener("click", cerrarPractico);
      $("#zonasFin", cuerpo).focus({ preventScroll: true });
    });
  }

  // 3) Semáforo: ¿qué hago con esta piel?
  function practicoPiel(cuerpo) {
    const CASOS = [
      { t: "Zona roja en el sacro. Al presionarla con el dedo se pone blanca y luego vuelve el color.", r: "amarillo", e: "Si blanquea, la sangre circula: quite el apoyo y vuelva a mirar en unas horas.", piel: "#e0685c" },
      { t: "Zona roja en el talón que NO se pone blanca al presionar.", r: "rojo", e: "Es una lesión por presión inicial: no la apoye y consulte hoy.", piel: "#b8323e" },
      { t: "La piel del codo está entera, sin cambios de color ni dolor.", r: "verde", e: "Piel sana: siga con sus cuidados de cada día.", piel: "#f2b8a0" },
      { t: "Herida en la cadera con pus y mal olor. La persona tiene fiebre y está confundida.", r: "urgencia", e: "Puede ser una infección grave: acuda a un servicio de urgencia.", piel: "#7a2a3e" },
      { t: "Apareció una ampolla en el talón.", r: "rojo", e: "Una ampolla es una lesión: quite el apoyo y consulte hoy.", piel: "#d77d6b" },
    ];
    const orden = CASOS.map((_, i) => i).sort(() => Math.random() - 0.5);
    const LUCES = [
      ["verde", "Verde", "circle-check"],
      ["amarillo", "Amarillo", "eye"],
      ["rojo", "Rojo", "triangle-alert"],
      ["urgencia", "Urgencia", "hospital"],
    ];
    let paso = 0;
    let pts = 0;
    const mostrar = () => {
      const c = CASOS[orden[paso]];
      cuerpo.innerHTML = `${cabeceraPractico("piel")}
        <p class="practico-consigna">Situación ${paso + 1} de ${CASOS.length}</p>
        <div class="caso"><span class="caso-piel" style="--piel-caso:${c.piel}" aria-hidden="true"></span><p>${esc(c.t)}</p></div>
        <div class="luces-botones" role="group" aria-label="Elija un color del semáforo">
          ${LUCES.map(([id, n, ic]) => `<button type="button" class="luz-btn luz-btn-${id}" data-r="${id}">${icon(ic, "icon")}<span>${n}</span></button>`).join("")}
        </div>
        <div class="quiz-feedback" id="pielFb" hidden></div>
        <button class="btn btn-cielo" type="button" id="pielSig" hidden>${paso === CASOS.length - 1 ? "Ver resultado" : "Siguiente situación"}${icon("arrow-right")}</button>`;
      $("#practicoVolver", cuerpo).addEventListener("click", cerrarPractico);
      $$(".luz-btn", cuerpo).forEach((b) =>
        b.addEventListener("click", () => {
          const ok = b.dataset.r === c.r;
          if (ok) pts += 1;
          $$(".luz-btn", cuerpo).forEach((o) => {
            o.disabled = true;
            if (o.dataset.r === c.r) o.classList.add("is-correct");
            else if (o === b) o.classList.add("is-wrong");
          });
          const fb = $("#pielFb", cuerpo);
          fb.hidden = false;
          fb.innerHTML = `<strong>${ok ? "¡Correcto!" : `Corresponde: ${LUCES.find((l) => l[0] === c.r)[1]}.`}</strong><span>${esc(c.e)}</span>`;
          const sig = $("#pielSig", cuerpo);
          sig.hidden = false;
          sig.focus({ preventScroll: true });
        })
      );
      $("#pielSig", cuerpo).addEventListener("click", () => {
        if (paso < CASOS.length - 1) {
          paso += 1;
          mostrar();
          enfocar(".practico-consigna");
          return;
        }
        registrarPractico("piel", pts);
        cuerpo.innerHTML = `${cabeceraPractico("piel")}<div class="quiz-feedback"><strong>Resultado: ${pts} de ${CASOS.length}.</strong><span>Repase el semáforo en «¿Cuándo pedir ayuda?» cuando quiera.</span></div><button class="btn btn-cielo" type="button" id="pielFin">${icon("check")}Listo</button>`;
        $("#practicoVolver", cuerpo).addEventListener("click", cerrarPractico);
        $("#pielFin", cuerpo).addEventListener("click", cerrarPractico);
        $("#pielFin", cuerpo).focus({ preventScroll: true });
      });
    };
    mostrar();
  }

  /* ---------- Resumen al alta ---------- */
  function vistaResumen() {
    const a = puntaje(ev.pre);
    const b = puntaje(ev.post);
    const dif = b.total - a.total;
    const dias = diasEntre(ev.inicio, ev.post.fecha) + 1;
    const prac = Object.entries(PRACTICOS)
      .map(([id, p]) => {
        const r = ev.practicos[id];
        return `<li><span>${p.titulo}</span><strong>${r ? `${r.mejor} de ${p.max}` : "No realizado"}</strong></li>`;
      })
      .join("");
    app.innerHTML = `
      <div class="desafios-grid">
        <section class="patch resumen" aria-labelledby="resumenTit">
          <h3 class="h3" id="resumenTit">Resumen de mi hospitalización</h3>
          <p class="resumen-meta">${ev.codigo ? `<span>Código ${esc(ev.codigo)}</span> · ` : ""}<span>Ingreso ${fechaCL(ev.pre.fecha)}</span> · <span>Alta ${fechaCL(ev.post.fecha)}</span> · <span>${dias} ${dias === 1 ? "día" : "días"}</span></p>
          <div class="resumen-totales">
            <div><span>Ingreso</span><strong>${a.total}<small>/${a.de}</small></strong></div>
            <span class="resumen-flecha" aria-hidden="true">${icon("arrow-right", "icon")}</span>
            <div><span>Alta</span><strong>${b.total}<small>/${b.de}</small></strong></div>
            <p class="resumen-dif">${dif > 0 ? `¡Mejoró ${dif} ${dif === 1 ? "respuesta" : "respuestas"}!` : dif === 0 ? "Mantuvo su resultado." : "Bajó un poco: repase los temas marcados."}</p>
          </div>
          <table class="tabla-dominios">
            <caption class="sr-only">Respuestas correctas por tema, al ingreso y al alta (de 2 en cada tema)</caption>
            <thead><tr><th scope="col">Tema</th><th scope="col">Ingreso</th><th scope="col">Alta</th></tr></thead>
            <tbody>${DOMINIOS.map((d) => `<tr><th scope="row">${esc(BANCO.DOMINIOS[d])}</th><td><span class="puntos-dom pre" role="img" aria-label="${a.porDominio[d]} de 2">${[0, 1].map((k) => `<i class="${k < a.porDominio[d] ? "is-on" : ""}"></i>`).join("")}</span></td><td><span class="puntos-dom post" role="img" aria-label="${b.porDominio[d]} de 2">${[0, 1].map((k) => `<i class="${k < b.porDominio[d] ? "is-on" : ""}"></i>`).join("")}</span></td></tr>`).join("")}</tbody>
          </table>
        </section>
        <div class="desafio-col">
          <section class="patch" aria-labelledby="actividadTit">
            <h3 class="h3" id="actividadTit">Durante la hospitalización</h3>
            <ul class="resumen-lista">
              <li><span>Desafíos diarios completos</span><strong>${diasCompletos()} de ${dias} ${dias === 1 ? "día" : "días"}</strong></li>
              ${prac}
            </ul>
          </section>
          <section class="patch" aria-labelledby="compartirTit">
            <h3 class="h3" id="compartirTit">Compartir con su equipo</h3>
            <p>Descargue el resumen o muéstrelo a enfermería o farmacia antes de irse.</p>
            <div class="resumen-acciones">
              <button class="btn btn-sol" type="button" id="btnCsv">${icon("arrow-down")}Descargar resumen (CSV)</button>
              <button class="btn" type="button" id="btnCopiar">${icon("list-checks")}Copiar resumen</button>
              <button class="btn" type="button" id="btnImprimirResumen">${icon("printer")}Imprimir</button>
            </div>
            <button class="link-btn" type="button" id="btnNueva">Comenzar una nueva hospitalización</button>
          </section>
        </div>
      </div>
      <details class="patch revision-final"><summary>Ver respuestas de la prueba de alta</summary>${revisionPrueba(ev.post, FORMA_B)}</details>`;

    $("#btnCsv", app).addEventListener("click", descargarCsv);
    $("#btnCopiar", app).addEventListener("click", async () => {
      const txt = textoResumen();
      try {
        await navigator.clipboard.writeText(txt);
        toast("Resumen copiado.");
      } catch (e) {
        window.prompt("Copie este resumen:", txt);
      }
    });
    $("#btnImprimirResumen", app).addEventListener("click", () => {
      document.documentElement.classList.add("imprimiendo-desafios");
      window.print();
    });
    $("#btnNueva", app).addEventListener("click", () => {
      if (!window.confirm("¿Comenzar una nueva hospitalización? El resumen actual se guardará en el historial de este equipo y los desafíos empezarán de cero.")) return;
      const archivo = leer(ARCHIVO, []);
      archivo.push(filaCsv());
      escribir(ARCHIVO, archivo.slice(-20));
      ev = nuevoEstado();
      guardar();
      verRevision = null;
      practicoAbierto = null;
      render();
      enfocar("h3");
    });
  }
  window.addEventListener("afterprint", () => document.documentElement.classList.remove("imprimiendo-desafios"));

  /* ---------- Exportación ---------- */
  function filaCsv() {
    const a = puntaje(ev.pre);
    const b = puntaje(ev.post);
    const fila = {
      codigo: ev.codigo || "",
      fecha_ingreso: ev.pre ? fechaCL(ev.pre.fecha) : "",
      fecha_alta: ev.post ? fechaCL(ev.post.fecha) : "",
      dias: ev.post ? diasEntre(ev.inicio, ev.post.fecha) + 1 : "",
      ingreso_total: a ? a.total : "",
      alta_total: b ? b.total : "",
    };
    DOMINIOS.forEach((d) => {
      fila[`ingreso_${d}`] = a ? a.porDominio[d] : "";
      fila[`alta_${d}`] = b ? b.porDominio[d] : "";
    });
    FORMA_A.forEach((it) => (fila[it.id] = ev.pre ? Number(!!ev.pre.ok[it.id]) : ""));
    FORMA_B.forEach((it) => (fila[it.id] = ev.post ? Number(!!ev.post.ok[it.id]) : ""));
    fila.diarios_completos = diasCompletos();
    Object.keys(PRACTICOS).forEach((id) => {
      fila[`practico_${id}_primero`] = ev.practicos[id] ? ev.practicos[id].primero : "";
      fila[`practico_${id}_mejor`] = ev.practicos[id] ? ev.practicos[id].mejor : "";
    });
    fila.version_banco = BANCO.version;
    return fila;
  }
  function descargarCsv() {
    const fila = filaCsv();
    const cols = Object.keys(fila);
    const celda = (v) => {
      const s = String(v);
      return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = "﻿" + cols.join(";") + "\r\n" + cols.map((c) => celda(fila[c])).join(";") + "\r\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cuidapiel_${(ev.codigo || "sin-codigo").toLowerCase()}_${dateKey()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast("Resumen descargado.");
  }
  function textoResumen() {
    const a = puntaje(ev.pre);
    const b = puntaje(ev.post);
    const prac = Object.entries(PRACTICOS)
      .map(([id, p]) => `${p.titulo.toLowerCase()} ${ev.practicos[id] ? `${ev.practicos[id].mejor}/${p.max}` : "—"}`)
      .join(", ");
    return `CuidaPiel · ${ev.codigo ? `Código ${ev.codigo} · ` : ""}Ingreso ${a.total}/${a.de} (${fechaCL(ev.pre.fecha)}) · Alta ${b.total}/${b.de} (${fechaCL(ev.post.fecha)}) · Desafíos diarios: ${diasCompletos()} días · Prácticos: ${prac} · Banco ${BANCO.version}`;
  }

  render();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      ev = Object.assign(nuevoEstado(), leer(KEY, {}));
      render();
    }
  });
})();
