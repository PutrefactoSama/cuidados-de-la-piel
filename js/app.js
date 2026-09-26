/**
 * ==========================================================================
 * PREVENCIÓN DE LESIONES POR PRESIÓN - LÓGICA INTERACTIVA Y RECURSOS UI/UX
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accesibilidad y Barra Superior
  initAccessibilityToolbar();

  // 2. Hotspots y Modales
  initHotspotsAndModals();

  // 3. Seguimiento de Progreso
  initProgressTracker();

  // 4. Lector de Voz (Text-to-Speech)
  initTextToSpeech();

  // 5. Autoevaluación de Riesgo
  initRiskChecklist();

  // 6. NUEVOS RECURSOS UI/UX INTERACTIVOS:
  initToolsTabBar();
  initBodyPressureMap();
  initFingerTestSimulator();
  initRotationTimerAndPlanner();
  initHydrationTracker();
  initQuickSearch();
  initGuidedTour();

  // 7. DASHBOARD DE NAVEGACIÓN MODULAR
  initDashboard();
});

/**
 * ==========================================================================
 * 1. ACCESIBILIDAD: TAMAÑO DE TEXTO Y ALTO CONTRASTE
 * ==========================================================================
 */
function initAccessibilityToolbar() {
  const body = document.body;
  const btnFontNormal = document.getElementById('btn-font-normal');
  const btnFontLg = document.getElementById('btn-font-lg');
  const btnFontXl = document.getElementById('btn-font-xl');
  const btnContrast = document.getElementById('btn-contrast');
  const btnPrint = document.getElementById('btn-print');

  const setFontSize = (size) => {
    body.classList.remove('font-lg', 'font-xl');
    [btnFontNormal, btnFontLg, btnFontXl].forEach(btn => btn?.classList.remove('active'));

    if (size === 'lg') {
      body.classList.add('font-lg');
      btnFontLg?.classList.add('active');
    } else if (size === 'xl') {
      body.classList.add('font-xl');
      btnFontXl?.classList.add('active');
    } else {
      btnFontNormal?.classList.add('active');
    }
    localStorage.setItem('cuidados_font_size', size);
  };

  btnFontNormal?.addEventListener('click', () => setFontSize('normal'));
  btnFontLg?.addEventListener('click', () => setFontSize('lg'));
  btnFontXl?.addEventListener('click', () => setFontSize('xl'));

  const savedFont = localStorage.getItem('cuidados_font_size') || 'normal';
  setFontSize(savedFont);

  btnContrast?.addEventListener('click', () => {
    const isHighContrast = body.classList.toggle('high-contrast');
    btnContrast.classList.toggle('active', isHighContrast);
    localStorage.setItem('cuidados_contrast', isHighContrast ? 'high' : 'normal');
  });

  if (localStorage.getItem('cuidados_contrast') === 'high') {
    body.classList.add('high-contrast');
    btnContrast?.classList.add('active');
  }

  btnPrint?.addEventListener('click', () => {
    window.print();
  });
}

/**
 * ==========================================================================
 * 2. CONTROL DE HOTSPOTS Y MODALES (<dialog>)
 * ==========================================================================
 */
function getSavedAdvice() {
  try {
    const saved = JSON.parse(localStorage.getItem('cuidados_visited_advice') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const visitedAdvice = new Set(getSavedAdvice());
const TOTAL_ADVICE = 7;

function initHotspotsAndModals() {
  const hotspots = document.querySelectorAll('.hotspot, .advice-card-btn');
  const dialogs = document.querySelectorAll('dialog.advice-dialog');
  let lastFocusedElement = null;

  hotspots.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target');
      const dialog = document.getElementById(targetId);

      if (dialog && typeof dialog.showModal === 'function') {
        lastFocusedElement = trigger;
        stopSpeaking();
        dialog.showModal();

        const adviceKey = trigger.getAttribute('data-advice-id');
        if (adviceKey) {
          markAdviceVisited(adviceKey);
        }

        const closeBtn = dialog.querySelector('.dialog-close-btn');
        closeBtn?.focus();
      }
    });
  });

  dialogs.forEach(dialog => {
    const closeButtons = dialog.querySelectorAll('.btn-close-dialog, .dialog-close-btn');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        stopSpeaking();
        dialog.close();
        lastFocusedElement?.focus();
      });
    });

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        stopSpeaking();
        dialog.close();
        lastFocusedElement?.focus();
      }
    });

    dialog.addEventListener('close', () => {
      stopSpeaking();
    });
  });
}

/**
 * ==========================================================================
 * 3. SEGUIMIENTO DE PROGRESO DE APRENDIZAJE
 * ==========================================================================
 */
function initProgressTracker() {
  visitedAdvice.forEach(adviceId => {
    document.querySelectorAll(`[data-advice-id="${adviceId}"]`).forEach(el => {
      el.classList.add('visited');
    });
  });
  updateProgressUI();
}

function markAdviceVisited(adviceId) {
  visitedAdvice.add(adviceId);
  localStorage.setItem('cuidados_visited_advice', JSON.stringify([...visitedAdvice]));

  document.querySelectorAll(`[data-advice-id="${adviceId}"]`).forEach(el => {
    el.classList.add('visited');
  });

  updateProgressUI();
}

function updateProgressUI() {
  const count = visitedAdvice.size;
  const percentage = Math.round((count / TOTAL_ADVICE) * 100);

  const counterEl = document.getElementById('progress-count');
  const fillEl = document.getElementById('progress-fill');
  const messageEl = document.getElementById('progress-status-text');

  if (counterEl) counterEl.textContent = `${count} de ${TOTAL_ADVICE}`;
  if (fillEl) fillEl.style.width = `${percentage}%`;

  if (messageEl) {
    if (count === 0) {
      messageEl.textContent = 'Seleccione los puntos de la habitación para descubrir los cuidados esenciales.';
    } else if (count < TOTAL_ADVICE) {
      messageEl.textContent = `Ha revisado ${count} de ${TOTAL_ADVICE} cuidados esenciales. Puede continuar cuando quiera.`;
    } else {
      messageEl.textContent = 'Recorrido completo. Ya revisó todos los cuidados esenciales de la guía.';
    }
  }
}

/**
 * ==========================================================================
 * 4. NARRACIÓN POR VOZ (TEXT-TO-SPEECH) PARA ADULTOS MAYORES
 * ==========================================================================
 */
let currentSpeech = null;

function initTextToSpeech() {
  if (!('speechSynthesis' in window)) {
    document.querySelectorAll('.dialog-tts-control').forEach(el => {
      el.style.display = 'none';
    });
    return;
  }

  const speechButtons = document.querySelectorAll('.btn-speech');

  speechButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (!dialog) return;

      if (window.speechSynthesis.speaking) {
        stopSpeaking();
        if (btn.classList.contains('speaking')) {
          return;
        }
      }

      const title = dialog.querySelector('.dialog-header h3')?.innerText || '';
      const body = dialog.querySelector('.dialog-body')?.innerText || '';
      const fullTextToRead = `${title}. ${body.replace(/Escuchar consejo|Detener audio|¿Prefiere escuchar la explicación\?/gi, '')}`;

      speakText(fullTextToRead, btn);
    });
  });
}

function speakText(text, buttonElement) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 0.92;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(v => v.lang.startsWith('es'));
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  utterance.onstart = () => {
    if (buttonElement) {
      buttonElement.classList.add('speaking');
      buttonElement.innerHTML = `
        <svg class="svg-icon" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
        </svg>
        <span>Detener audio</span>
      `;
    }
  };

  utterance.onend = resetSpeechButtons;
  utterance.onerror = resetSpeechButtons;

  currentSpeech = utterance;
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  resetSpeechButtons();
}

function resetSpeechButtons() {
  document.querySelectorAll('.btn-speech').forEach(btn => {
    btn.classList.remove('speaking');
    btn.innerHTML = `
      <svg class="svg-icon" viewBox="0 0 24 24">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
      </svg>
      <span>Escuchar consejo</span>
    `;
  });
}

/**
 * ==========================================================================
 * 5. AUTOEVALUACIÓN RÁPIDA DE FACTORES DE RIESGO
 * ==========================================================================
 */
function initRiskChecklist() {
  const checkboxes = document.querySelectorAll('.risk-check-input');
  const resultBox = document.getElementById('risk-evaluation-result');

  if (!checkboxes.length || !resultBox) return;

  const evaluateRisk = () => {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    if (checkedCount === 0) {
      resultBox.innerHTML = `
        <div style="color: var(--text-muted); font-size: 0.95rem; margin-top: 10px;">
          Seleccione las situaciones presentes para recibir una orientación general.
        </div>
      `;
    } else if (checkedCount <= 2) {
      resultBox.innerHTML = `
        <div style="background: var(--success-light); color: #166534; padding: 14px 18px; border-radius: var(--radius-sm); margin-top: 12px; font-weight: 600; border-left: 4px solid var(--success);">
          <strong>${checkedCount} ${checkedCount === 1 ? 'situación identificada' : 'situaciones identificadas'}:</strong> Revise la piel con regularidad y confirme que la rutina de cambios de posición, higiene, alimentación e hidratación esté adaptada a la persona.
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div style="background: var(--danger-light); color: #9f1239; padding: 14px 18px; border-radius: var(--radius-sm); margin-top: 12px; font-weight: 600; border-left: 4px solid var(--danger);">
          <strong>Conviene solicitar una valoración (${checkedCount} situaciones):</strong> Consulte al equipo de salud para acordar una rutina individual y elegir apoyos adecuados. Si nota un cambio persistente de color, dolor, calor o piel abierta, alivie la presión sobre la zona y pida orientación.
        </div>
      `;
    }
  };

  checkboxes.forEach(cb => {
    cb.addEventListener('change', evaluateRisk);
  });
}

/**
 * ==========================================================================
 * 6. PESTAÑAS DE HERRAMIENTAS INTERACTIVAS
 * ==========================================================================
 */
function initToolsTabBar() {
  const tabButtons = document.querySelectorAll('.tool-tab-btn');
  const tabPanes = document.querySelectorAll('.tool-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(targetId)?.classList.add('active');
    });
  });
}

/**
 * ==========================================================================
 * 7. MAPA ANATÓMICO CORPORAL INTERACTIVO SEGÚN POSTURA
 * ==========================================================================
 */
const postureData = {
  supine: {
    title: 'Zonas de Mayor Presión: Boca Arriba (Decúbito Supino)',
    badge: '5 puntos críticos',
    points: [
      {
        name: 'Sacro (Rabadilla / Columna baja)',
        risk: 'Alto',
        riskClass: 'point-high',
        tip: 'Soporta hasta el 40% del peso en cama. Nunca eleve la cabecera más de 30 grados para no cizallar la piel.'
      },
      {
        name: 'Talones y Tendón de Aquiles',
        risk: 'Alto',
        riskClass: 'point-high',
        tip: 'Coloque un cojín o almohada suave debajo de las pantorrillas para que los talones queden suspendidos en el aire.'
      },
      {
        name: 'Occipital (Nuca / Cabeza)',
        risk: 'Medio',
        riskClass: 'point-medium',
        tip: 'Alterne suavemente la rotación de la cabeza hacia la derecha o izquierda en cada cambio de postura.'
      },
      {
        name: 'Omóplatos y Codos',
        risk: 'Medio',
        riskClass: 'point-medium',
        tip: 'Evite sábanas arrugadas bajo la espalda y proteja los codos con ropa suave de algodón.'
      }
    ]
  },
  lateral: {
    title: 'Zonas de Mayor Presión: De Lado 30° (Decúbito Lateral)',
    badge: '5 puntos críticos',
    points: [
      {
        name: 'Caderas (Trocánteres mayores)',
        risk: 'Alto',
        riskClass: 'point-high',
        tip: 'Use la inclinación y los apoyos indicados para aliviar la zona sin comprometer la comodidad ni la seguridad.'
      },
      {
        name: 'Tobillos (Maléolos) y Rodillas (Cóndilos)',
        risk: 'Alto',
        riskClass: 'point-high',
        tip: 'Coloque una almohada entre las rodillas y tobillos para impedir el roce directo entre huesos.'
      },
      {
        name: 'Hombro y Costillas',
        risk: 'Medio',
        riskClass: 'point-medium',
        tip: 'Asegúrese de que el brazo inferior quede ligeramente adelantado para no comprimir la circulación del hombro.'
      },
      {
        name: 'Orejas y Pómulos',
        risk: 'Bajo',
        riskClass: 'point-medium',
        tip: 'Verifique que la oreja no quede doblada sobre la almohada.'
      }
    ]
  },
  seated: {
    title: 'Zonas de Mayor Presión: Sentado en Silla / Sillón',
    badge: '4 puntos críticos',
    points: [
      {
        name: 'Isquion (Huesos de los Glúteos)',
        risk: 'Alto',
        riskClass: 'point-high',
        tip: 'Considere una superficie de redistribución adecuada y cambie los puntos de apoyo según el plan individual.'
      },
      {
        name: 'Sacro y Cóccix',
        risk: 'Alto',
        riskClass: 'point-high',
        tip: 'Evite que la persona se resbale en la silla, ya que la fricción constante desprende las capas de piel.'
      },
      {
        name: 'Omóplatos y Columna Dorsal',
        risk: 'Medio',
        riskClass: 'point-medium',
        tip: 'Coloque el respaldo bien ajustado y cómodo, manteniendo la postura erguida y simétrica.'
      },
      {
        name: 'Huecos Poplíteos (Detrás de rodillas) y Pies',
        risk: 'Medio',
        riskClass: 'point-medium',
        tip: 'Asegúrese de que los pies queden apoyados firmemente sobre el suelo o sobre reposapiés, sin que el borde de la silla corte la circulación.'
      }
    ]
  }
};

function initBodyPressureMap() {
  const postureButtons = document.querySelectorAll('.posture-btn');
  const titleEl = document.getElementById('posture-map-title');
  const badgeEl = document.getElementById('posture-map-badge');
  const containerEl = document.getElementById('body-points-container');

  const renderPosture = (key) => {
    const data = postureData[key];
    if (!data || !containerEl) return;

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;

    containerEl.innerHTML = data.points.map(pt => `
      <div class="body-point-item ${pt.riskClass}">
        <h5>
          <span>🎯 ${pt.name}</span>
          <span style="font-size: 0.8rem; padding: 2px 8px; border-radius: 9999px; background: rgba(0,0,0,0.06); font-weight: 700;">
            Riesgo ${pt.risk}
          </span>
        </h5>
        <p>${pt.tip}</p>
      </div>
    `).join('');
  };

  postureButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      postureButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const postureKey = btn.getAttribute('data-posture');
      renderPosture(postureKey);
    });
  });

  renderPosture('supine');
}

/**
 * ==========================================================================
 * 8. SIMULADOR INTERACTIVO DE LA PRUEBA DEL DEDO
 * ==========================================================================
 */
function initFingerTestSimulator() {
  const patchHealthy = document.getElementById('patch-healthy');
  const feedbackHealthy = document.getElementById('feedback-healthy');
  const patchUnblanchable = document.getElementById('patch-unblanchable');
  const feedbackUnblanchable = document.getElementById('feedback-unblanchable');

  // Caso A: Piel Sana
  const runHealthyTest = () => {
    patchHealthy?.classList.add('pressed');
    if (feedbackHealthy) {
      feedbackHealthy.innerHTML = `
        <div style="color: var(--primary-dark); font-weight: 700; margin-bottom: 4px;">
          ⏳ Presionando durante 3 segundos...
        </div>
        <p style="font-size: 0.85rem;">Observe el cambio de color mostrado en este ejemplo educativo.</p>
      `;
    }

    setTimeout(() => {
      patchHealthy?.classList.remove('pressed');
      if (feedbackHealthy) {
        feedbackHealthy.innerHTML = `
          <div style="color: var(--success); font-weight: 700; margin-bottom: 4px;">
            Ejemplo: el color se aclara
          </div>
          <p style="font-size: 0.88rem; color: #166534;">
            Al retirar la presión, el ejemplo recupera su color. Compare siempre con el tono habitual de la piel de la persona.
          </p>
        `;
      }
    }, 1800);
  };

  // Caso B: Lesión Grado 1 (No blanqueable)
  const runUnblanchableTest = () => {
    patchUnblanchable?.classList.add('pressed');
    if (feedbackUnblanchable) {
      feedbackUnblanchable.innerHTML = `
        <div style="color: var(--danger); font-weight: 700; margin-bottom: 4px;">
          ⏳ Presionando durante 3 segundos...
        </div>
        <p style="font-size: 0.85rem;">Observe si la piel se pone blanca o permanece roja.</p>
      `;
    }

    setTimeout(() => {
      patchUnblanchable?.classList.remove('pressed');
      if (feedbackUnblanchable) {
        feedbackUnblanchable.innerHTML = `
          <div style="color: var(--danger); font-weight: 700; margin-bottom: 4px;">
            Atención: el color persiste
          </div>
          <p style="font-size: 0.88rem; color: #9f1239;">
            En este ejemplo el color <strong>no se aclara</strong>. En una situación real, alivie la presión, no masajee la zona y contacte al equipo de salud.
          </p>
        `;
      }
    }, 1800);
  };

  patchHealthy?.addEventListener('click', runHealthyTest);
  patchUnblanchable?.addEventListener('click', runUnblanchableTest);
}

/**
 * ==========================================================================
 * 9. TEMPORIZADOR Y PLANIFICADOR DE 2 HORAS
 * ==========================================================================
 */
let timerInterval = null;
let timerSeconds = 7200; // 2 horas (120 minutos)
let isTimerRunning = false;

function initRotationTimerAndPlanner() {
  const display = document.getElementById('timer-display');
  const btnToggle = document.getElementById('btn-timer-toggle');
  const btnReset = document.getElementById('btn-timer-reset');
  const btnText = document.getElementById('timer-btn-text');
  const dashboardTimer = document.getElementById('dash-metric-timer');

  const updateDisplay = () => {
    if (!display) return;
    const h = Math.floor(timerSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((timerSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (timerSeconds % 60).toString().padStart(2, '0');
    display.textContent = `${h}:${m}:${s}`;
  };

  const startTimer = () => {
    if (isTimerRunning) return;
    isTimerRunning = true;
    if (btnText) btnText.textContent = 'Pausar';
    if (dashboardTimer) dashboardTimer.textContent = 'En curso';

    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        if (btnText) btnText.textContent = 'Iniciar';
        if (dashboardTimer) dashboardTimer.textContent = 'Revisar ahora';
        alert('Recordatorio: revise el plan de cambio de posición y observe la piel antes de mover a la persona.');
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    if (btnText) btnText.textContent = 'Reanudar';
    if (dashboardTimer) dashboardTimer.textContent = 'En pausa';
  };

  btnToggle?.addEventListener('click', () => {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  btnReset?.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSeconds = 7200;
    updateDisplay();
    if (btnText) btnText.textContent = 'Iniciar';
    if (dashboardTimer) dashboardTimer.textContent = 'Sin iniciar';
  });

  updateDisplay();

  // Guardar checkboxes de la tabla en localStorage
  const checkboxes = document.querySelectorAll('.schedule-check');
  checkboxes.forEach((cb, index) => {
    const saved = localStorage.getItem(`schedule_check_${index}`);
    if (saved === 'true') cb.checked = true;

    cb.addEventListener('change', () => {
      localStorage.setItem(`schedule_check_${index}`, cb.checked);
    });
  });
}

/**
 * ==========================================================================
 * 10. REGISTRO DIARIO DE HIDRATACIÓN (8 VASOS)
 * ==========================================================================
 */
function initHydrationTracker() {
  const container = document.getElementById('glasses-container');
  const countDisplay = document.getElementById('glasses-count-display');
  const adviceText = document.getElementById('hydration-advice-text');
  if (!container) return;

  const TOTAL_GLASSES = 8;
  let filledGlasses = parseInt(localStorage.getItem('cuidados_hydration_count') || '0', 10);

  const renderGlasses = () => {
    container.innerHTML = '';
    for (let i = 1; i <= TOTAL_GLASSES; i++) {
      const isFilled = i <= filledGlasses;
      const glassBtn = document.createElement('button');
      glassBtn.type = 'button';
      glassBtn.className = `glass-btn ${isFilled ? 'filled' : ''}`;
      glassBtn.setAttribute('aria-label', `Vaso de agua número ${i}`);
      glassBtn.innerHTML = `
        <svg class="svg-icon" viewBox="0 0 24 24">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
        <span style="font-size: 0.82rem; font-weight: 700;">Vaso ${i}</span>
      `;

      glassBtn.addEventListener('click', () => {
        if (i === filledGlasses) {
          filledGlasses = i - 1;
        } else {
          filledGlasses = i;
        }
        localStorage.setItem('cuidados_hydration_count', filledGlasses);
        renderGlasses();
        updateHydrationUI();
      });

      container.appendChild(glassBtn);
    }
  };

  const updateHydrationUI = () => {
    if (countDisplay) countDisplay.textContent = `${filledGlasses}`;
    
    const summaryEl = document.getElementById('hydration-summary-text');
    if (summaryEl) {
      summaryEl.innerHTML = `Registros de hoy: <span style="color: var(--primary);">${filledGlasses}</span> de 8. Adapte esta referencia a la meta indicada.`;
    }

    if (adviceText) {
      if (filledGlasses === 0) {
        adviceText.textContent = 'Registre los líquidos a medida que se ofrecen durante el día.';
      } else if (filledGlasses < 5) {
        adviceText.textContent = 'Buen avance. Continúe según la tolerancia y la meta individual.';
      } else if (filledGlasses < 8) {
        adviceText.textContent = 'Casi completa los ocho registros de referencia.';
      } else {
        adviceText.textContent = 'Registro completo. Compruebe que coincide con la meta indicada para la persona.';
      }
    }
  };

  renderGlasses();
  updateHydrationUI();
}

/**
 * ==========================================================================
 * 11. BÚSQUEDA RÁPIDA DE CONSEJOS EN TIEMPO REAL CON PANEL FLOTANTE
 * ==========================================================================
 */
const knowledgeBase = [
  {
    id: 'cama',
    type: 'modal',
    target: 'dialog-cama',
    title: 'Cambios de posición en la cama',
    category: 'Cuidado esencial',
    iconSvg: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
    keywords: 'cama rotacion cambio posicion decubito supino lateral derecho izquierdo 2 horas reloj postura almohada entre piernas talones suspendidos aire sabana entremetida mover girar voltear horario',
    snippet: 'Organice un horario individual, cambie los puntos de apoyo y observe la piel en cada movimiento.'
  },
  {
    id: 'comida',
    type: 'modal',
    target: 'dialog-comida',
    title: 'En la Comida: Alimentación e Hidratación',
    category: 'Cuidado esencial',
    iconSvg: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    keywords: 'comida alimentacion nutricion hidratacion agua liquidos 6 8 vasos proteinas carnes huevos pescado salmon lacteos legumbres vitaminas frutas verduras zinc cicatrizacion tragar papillas',
    snippet: 'Ideas para una alimentación equilibrada y un registro de hidratación adaptado a cada persona.'
  },
  {
    id: 'asiento',
    type: 'modal',
    target: 'dialog-asiento',
    title: 'En el Asiento: Superficies Adecuadas y Cojines',
    category: 'Cuidado esencial',
    iconSvg: '<rect x="3" y="11" width="18" height="9" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    keywords: 'asiento colchon antiescaras aire alternante cojin cojines viscoelastico silla de ruedas rosquilla flotador sabanas arrugas ropa algodon botones costuras presion peso',
    snippet: 'Colchones de aire alternante y cojines viscoelásticos. Mantener sábanas completamente estiradas y sin arrugas.'
  },
  {
    id: 'movilidad',
    type: 'modal',
    target: 'dialog-movilidad',
    title: 'Movimiento y cambios de apoyo',
    category: 'Cuidado esencial',
    iconSvg: '<circle cx="12" cy="5" r="2.5"/><path d="M9 20l3-6 3 6M6 11l6-2 6 2M12 9v5"/>',
    keywords: 'movilice active paciente movilidad ejercicios suaves articulaciones circulacion sangre oxigeno brazos piernas tobillos flexiones caminar andador baston pausas silla',
    snippet: 'Movimientos y cambios de apoyo acordes con la movilidad, la comodidad y la seguridad de la persona.'
  },
  {
    id: 'revision',
    type: 'modal',
    target: 'dialog-revision',
    title: 'Cómo observar la piel',
    category: 'Cuidado esencial',
    iconSvg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    keywords: 'revise piel inspeccion diaria zonas criticas puntos apoyo occipital cabeza nuca hombros omoplatos codos sacro rabadilla caderas trocanter gluteos rodillas talones tobillos prueba dedo eritema no blanqueable foto',
    snippet: 'Observe zonas de apoyo y cambios de color, temperatura, textura o dolor.'
  },
  {
    id: 'higiene',
    type: 'modal',
    target: 'dialog-higiene',
    title: 'Cuidado de la Piel: Mantener Limpia y Seca',
    category: 'Cuidado esencial',
    iconSvg: '<path d="M12 2v4M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>',
    keywords: 'higiene piel limpia seca bano agua tibia jabon neutro ph 5.5 secar sin frotar toques suaves cremas hidratantes agho aceites barrera humedad orina heces incontinencia panal no masajear huesos',
    snippet: 'Aseo suave con agua tibia, secado dando toques sin frotar, cremas barrera para incontinencia y jamás masajear huesos.'
  },
  {
    id: 'recuerde',
    type: 'modal',
    target: 'dialog-recuerde',
    title: 'Recuerde: Mensaje para el Cuidador',
    category: 'Apoyo al cuidador',
    iconSvg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    keywords: 'recuerde pensamiento cuidador prevenir es mas facil que tratar 4 pilares observe cuide prevenga acompane autocuidado espalda levantar ayuda familiares gracias por cuidar carino tratamiento',
    snippet: 'Prevenir es más fácil que tratar. Pilares: Observe, Cuide, Prevenga, Acompañe y cuide su propia espalda al movilizar.'
  },
  {
    id: 'riesgos',
    type: 'section',
    target: 'seccion-riesgo',
    title: '¿Quiénes tienen mayor riesgo de lesiones?',
    category: 'Factores de Riesgo',
    iconSvg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    keywords: 'quienes tienen mayor riesgo factores inmovilidad encamado adultos mayores edad vejez silla de ruedas incontinencia humedad sudor diabetes enfermedades cronicas desnutricion evaluacion',
    snippet: 'Personas con movilidad reducida, adultos mayores, usuarios de silla de ruedas, piel con incontinencia o diabetes.'
  },
  {
    id: 'consulta_alarma',
    type: 'section',
    target: 'seccion-consulta',
    title: '¿Cuándo consultar al equipo de salud? (Signos de Alerta)',
    category: 'Signos de Alarma',
    iconSvg: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>',
    keywords: 'cuando consultar signos alarma alerta enrojecimiento persistente piel abierta ampollas llagas grietas dolor calor inflamacion hinchazon coloracion oscura morada negra necrosis olor medico enfermera',
    snippet: 'Consulte si nota rojez que no desaparece al presionar, ampollas, piel abierta, calor local, dolor o tejido oscuro.'
  },
  {
    id: 'herramienta_mapa',
    type: 'tool',
    target: 'tab-body-map',
    toolTab: 'tab-body-map',
    title: 'Mapa de zonas de apoyo',
    category: 'Apoyo para la rutina',
    iconSvg: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/>',
    keywords: 'mapa anatomico puntos presion postura boca arriba de lado 30 lateral sentado isquion sacro talones hombros condilos maleolos',
    snippet: 'Explore interactivamente qué huesos reciben mayor presión al estar boca arriba, de lado o sentado.'
  },
  {
    id: 'herramienta_dedo',
    type: 'tool',
    target: 'tab-finger-sim',
    toolTab: 'tab-finger-sim',
    title: 'Práctica para observar una zona enrojecida',
    category: 'Aprendizaje visual',
    iconSvg: '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
    keywords: 'simulador prueba del dedo eritema blanqueable no blanqueable lesion grado 1 sangre capilares rojez blanqueo',
    snippet: 'Compare ejemplos educativos y reconozca por qué un cambio persistente necesita atención.'
  },
  {
    id: 'herramienta_reloj',
    type: 'tool',
    target: 'tab-timer-planner',
    toolTab: 'tab-timer-planner',
    title: 'Recordatorio y plan diario',
    category: 'Apoyo para la rutina',
    iconSvg: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    keywords: 'temporizador reloj cronometro alarma rotacion cada 2 horas planificador horario 08:00 10:00 12:00 14:00 tabla rutina diaria',
    snippet: 'Active un intervalo de referencia y marque los cambios de posición realizados durante el día.'
  },
  {
    id: 'herramienta_agua',
    type: 'tool',
    target: 'tab-hydration',
    toolTab: 'tab-hydration',
    title: 'Registro diario de hidratación',
    category: 'Apoyo para la rutina',
    iconSvg: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    keywords: 'registro agua vasos meta hidratacion diaria 8 vasos 2 litros líquidos beber contador',
    snippet: 'Registre los líquidos y adapte la referencia a la meta indicada para la persona.'
  },
  {
    id: 'video_educativo',
    type: 'section',
    target: 'video-educativo',
    title: 'Video Guía: Rotación cada 2 Horas y Regla de los 30°',
    category: 'Video y Animación',
    iconSvg: '<polygon points="5 3 19 12 5 21 5 3"/>',
    keywords: 'video animacion motion graphic rotacion 2 horas regla 30 grados trocanter talones flotantes explicacion visual postura reloj',
    snippet: 'Animación pedagógica que muestra el ciclo de giros y cómo evitar apoyar a 90° sobre la cadera.'
  }
];

function normalizeText(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita tildes
    .trim();
}

function initQuickSearch() {
  const searchInput = document.getElementById('quick-search-input');
  const clearBtn = document.getElementById('search-clear');
  const dropdown = document.getElementById('search-results-dropdown');
  const resultsList = document.getElementById('search-results-list');
  const resultsCount = document.getElementById('search-results-count');
  const closeDropdownBtn = document.getElementById('search-close-dropdown');

  if (!searchInput || !dropdown || !resultsList) return;

  const renderResults = (query) => {
    const rawQuery = query.trim();
    const cleanQuery = normalizeText(rawQuery);

    if (!cleanQuery || cleanQuery.length < 1) {
      dropdown.classList.remove('active');
      clearBtn?.classList.remove('visible');
      return;
    }

    clearBtn?.classList.add('visible');

    // Palabras individuales de la búsqueda
    const words = cleanQuery.split(/\s+/).filter(w => w.length > 0);

    // Filtrar la base de conocimiento
    const matches = knowledgeBase.filter(item => {
      const fullCorpus = normalizeText(`${item.title} ${item.category} ${item.keywords} ${item.snippet}`);
      return words.every(word => fullCorpus.includes(word));
    });

    dropdown.classList.add('active');

    if (matches.length === 0) {
      if (resultsCount) resultsCount.textContent = 'Sin resultados';
      resultsList.innerHTML = `
        <div class="search-no-results">
          <h4>No se encontraron consejos exactos para "${rawQuery}"</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted);">Pruebe haciendo clic en una de estas sugerencias frecuentes:</p>
          <div class="search-suggestions-chips">
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('talones')">Talones</button>
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('rotación')">Rotación 2h</button>
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('agua')">Agua / Hidratación</button>
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('colchón')">Colchón antiescaras</button>
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('almohada')">Almohadas de apoyo</button>
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('rojez')">Prueba de rojez</button>
            <button type="button" class="suggestion-chip" onclick="applySearchQuery('higiene')">Higiene sin frotar</button>
          </div>
        </div>
      `;
      return;
    }

    if (resultsCount) {
      resultsCount.textContent = `${matches.length} resultado${matches.length > 1 ? 's' : ''} encontrado${matches.length > 1 ? 's' : ''}`;
    }

    resultsList.innerHTML = matches.map(item => {
      // Resaltar términos encontrados
      let highlightedSnippet = item.snippet;
      words.forEach(w => {
        if (w.length > 1) {
          const regex = new RegExp(`(${w})`, 'gi');
          highlightedSnippet = highlightedSnippet.replace(regex, '<span class="result-highlight">$1</span>');
        }
      });

      return `
        <div class="search-result-item" data-id="${item.id}" data-type="${item.type}" data-target="${item.target}" data-tab="${item.toolTab || ''}">
          <div class="result-item-icon">
            <svg class="svg-icon" viewBox="0 0 24 24">
              ${item.iconSvg}
            </svg>
          </div>
          <div class="result-item-content">
            <div class="result-item-title">
              <span>${item.title}</span>
              <span class="result-item-category">${item.category}</span>
            </div>
            <div class="result-item-snippet">${highlightedSnippet}</div>
          </div>
        </div>
      `;
    }).join('');

    // Agregar listeners a cada resultado
    resultsList.querySelectorAll('.search-result-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const type = itemEl.getAttribute('data-type');
        const target = itemEl.getAttribute('data-target');
        const tab = itemEl.getAttribute('data-tab');

        dropdown.classList.remove('active');

        if (type === 'modal') {
          const dialog = document.getElementById(target);
          if (dialog && typeof dialog.showModal === 'function') {
            stopSpeaking();
            dialog.showModal();
            const adviceKey = itemEl.getAttribute('data-id');
            if (adviceKey) markAdviceVisited(adviceKey);
          }
        } else if (type === 'section') {
          const sec = document.getElementById(target);
          if (sec) {
            sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            sec.style.transition = 'box-shadow 0.3s';
            sec.style.boxShadow = '0 0 0 4px var(--primary)';
            setTimeout(() => { sec.style.boxShadow = ''; }, 2000);
          }
        } else if (type === 'tool') {
          const toolsSection = document.getElementById('herramientas-ui');
          toolsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

          if (tab) {
            const tabBtn = document.querySelector(`.tool-tab-btn[data-tab="${tab}"]`);
            tabBtn?.click();
          }
        }
      });
    });
  };

  // Eventos de entrada
  searchInput.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length > 0) {
      dropdown.classList.add('active');
    }
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    dropdown.classList.remove('active');
    clearBtn.classList.remove('visible');
    searchInput.focus();
  });

  closeDropdownBtn?.addEventListener('click', () => {
    dropdown.classList.remove('active');
  });

  // Cerrar al presionar Escape o al hacer clic afuera
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.quick-search-section')) {
      dropdown.classList.remove('active');
    }
  });
}

// Función global para sugerencias
window.applySearchQuery = function(term) {
  const searchInput = document.getElementById('quick-search-input');
  if (searchInput) {
    searchInput.value = term;
    searchInput.focus();
    searchInput.dispatchEvent(new Event('input'));
  }
};

/**
 * ==========================================================================
 * 12. PASEO GUIADO PASO A PASO POR LA HABITACIÓN
 * ==========================================================================
 */
function initGuidedTour() {
  const btnStart = document.getElementById('btn-start-tour');
  if (!btnStart) return;

  const hotspots = Array.from(document.querySelectorAll('.hotspot'));
  let tourIndex = 0;

  btnStart.addEventListener('click', () => {
    tourIndex = 0;
    startNextTourStep();
  });

  const startNextTourStep = () => {
    hotspots.forEach(h => h.classList.remove('highlight-tour'));

    if (tourIndex < hotspots.length) {
      const current = hotspots[tourIndex];
      current.classList.add('highlight-tour');
      current.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Simular apertura del consejo tras un breve momento
      setTimeout(() => {
        current.click();
        tourIndex++;
      }, 700);
    }
  };
}

/**
 * ==========================================================================
 * 13. DASHBOARD DE NAVEGACIÓN MODULAR POR TARJETAS
 * ==========================================================================
 */
function initDashboard() {
  const filterButtons = document.querySelectorAll('.filter-pill-btn');
  const cards = document.querySelectorAll('.dash-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.transition = 'all 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  updateDashboardCardsStatus();
}

function updateDashboardCardsStatus() {
  // Sincronizar tarjetas visitadas
  visitedAdvice.forEach(adviceKey => {
    const card = document.querySelector(`.dash-card[data-card-id="${adviceKey}"]`);
    if (card) {
      card.classList.add('card-visited');
      const actionBtn = card.querySelector('.btn-card-action span');
      if (actionBtn && !actionBtn.textContent.includes('✓')) {
        actionBtn.textContent = '✓ Explorado (Ver más)';
      }
    }
  });

  // Actualizar métricas del dashboard
  const progressMetric = document.getElementById('dash-metric-progress');
  if (progressMetric) {
    progressMetric.textContent = `${visitedAdvice.size} / ${TOTAL_ADVICE}`;
  }

  const waterMetric = document.getElementById('dash-metric-water');
  if (waterMetric) {
    const waterCount = parseInt(localStorage.getItem('cuidados_hydration_count') || '0', 10);
    waterMetric.textContent = `${waterCount} / 8 registros`;
  }
}

// Helpers globales para botones del Dashboard
window.openAdviceModal = function(dialogId, adviceId) {
  const dialog = document.getElementById(dialogId);
  if (dialog && typeof dialog.showModal === 'function') {
    stopSpeaking();
    dialog.showModal();
    if (adviceId) {
      markAdviceVisited(adviceId);
      updateDashboardCardsStatus();
    }
  }
};

window.listenModalAudio = function(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;

  const title = dialog.querySelector('.dialog-header h3')?.innerText || '';
  const body = dialog.querySelector('.dialog-body')?.innerText || '';
  const fullText = `${title}. ${body.replace(/Escuchar consejo|Detener audio|¿Prefiere escuchar la explicación\?/gi, '')}`;

  const speechBtn = dialog.querySelector('.btn-speech');
  speakText(fullText, speechBtn);
};

window.openToolTab = function(tabId) {
  const toolsSection = document.getElementById('herramientas-ui');
  toolsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const tabBtn = document.querySelector(`.tool-tab-btn[data-tab="${tabId}"]`);
  tabBtn?.click();
};

window.scrollToSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    section.style.transition = 'box-shadow 0.4s';
    section.style.boxShadow = '0 0 0 4px var(--primary)';
    setTimeout(() => { section.style.boxShadow = ''; }, 2000);
  }
};
