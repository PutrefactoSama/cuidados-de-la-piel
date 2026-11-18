# CuidaPiel · Guía interactiva para prevenir lesiones por presión

Aplicación web para **pacientes y familias** (Chile), pensada primero para el celular en casa y también para tablet en consulta u hospital. Enseña por qué aparecen las lesiones por presión («escaras»), ayuda a llevar los cuidados diarios y deja claro cuándo consultar.

Visualmente es una **arpillera chilena de mañana**: fondo de lino marfil, cordillera bajo un cielo claro, telas teñidas como acuarela, pespuntes finos y bordes de tijera zigzag. No hay superficies oscuras: la selección se marca con lino en relieve y un borde añil o miel, y los titulares van tono sobre tono. El único color intenso es el rojo clínico de las alarmas.

## Cómo se usa: un recorrido guiado

La app funciona como una guía que se explica sola. Muestra una pantalla a la vez y en cada momento dice cuál es el siguiente paso. Tiene cuatro destinos fijos (barra inferior en el celular y barra superior en el escritorio): **Inicio · Aprender · Mi día · ¿Cuándo consultar?**

| Pantalla | Qué encuentra el paciente |
|---|---|
| **Inicio** | Tres pasos numerados. **1 · Aprenda**: la siguiente lección pendiente con un solo botón (Empezar o Continuar donde quedó) y el avance «N de 8». **2 · Cuide cada día**: el reloj de cambios de posición con «Ya cambié de posición». **3 · Pida ayuda a tiempo**: acceso directo al semáforo. Debajo, «Más herramientas». |
| **Aprender** | Ruta de **8 lecciones cortas** (3 a 5 minutos), unidas por un hilo: ¿Por qué aparece una lesión?, Cambie de posición, Piel limpia y seca, Revise la piel a diario, Colchón y cojín, Muévase, Coma bien y tome agua, ¿Cuándo pedir ayuda? Cada lección avanza **un paso a la vez**: lo esencial (Haga / Evite) → práctica (simulador del corte de la piel, video, mapa de puntos de presión, prueba del dedo) → **compruebe lo aprendido** (frases de verdad o mito; si se equivoca, se explica y se vuelve a preguntar) → **hágalo hoy** (el aprendizaje queda registrado en «Mi día»). El botón «Siguiente» queda siempre a mano y «Escuchar» lee cada paso en voz alta al avanzar. El avance se guarda: al volver, la app ofrece seguir donde quedó. |
| **Mi día** | Reloj de hilo de 24 h con los cambios de posición (intervalo de 2, 3 o 4 h según el equipo de salud; 1 h si está sentado), aviso de cambio, registro de vasos de agua, lista de revisión diaria con punto cruz, resumen de 7 días e impresión. |
| **¿Cuándo consultar?** | Semáforo (verde, amarillo, rojo y urgencia) con un revisor de señales que indica qué hacer. |
| **Más herramientas** | **Repase jugando** (rondas de 10 frases elegidas al azar de un banco de 17, con insignias y «Mi progreso»), **¿Cuánto riesgo hay?** (autoevaluación orientativa de 6 preguntas inspirada en la escala de Braden), **Mis desafíos de hospitalización** (prueba de ingreso → desafío diario → 3 prácticos → prueba de alta, con CSV) y **Para quien cuida**. |

Cada pantalla tiene su propia dirección (`#/aprender/posicion/3`, `#/mi-dia`…), así que el botón Atrás del celular funciona y se puede compartir un enlace directo. Los enlaces de la versión anterior (`#porque`, `#revisar`, `#video`…) llevan a la lección que corresponde. Sin JavaScript, todo el contenido se muestra como una sola página.

Accesibilidad: tipografía Atkinson Hyperlegible Next (diseñada para baja visión), tres tamaños de letra, modo de alto contraste, lectura en voz alta en español, uso completo con teclado y respeto de `prefers-reduced-motion`.

**Privacidad:** todo se guarda solo en el dispositivo (`localStorage`). No hay servidor ni cuentas, y la página no publica números de teléfono.

## Base clínica

El contenido se revisó contra la evidencia:

- **EPUAP/NPIAP/PPPIA 2019**, guía internacional de prevención y tratamiento de lesiones por presión.
- **Cochrane 2026** (CD009958.pub4): la frecuencia de los cambios de posición tiene evidencia de certeza muy baja (2 h frente a 4 h, RR 1,05). Por eso el intervalo es configurable y se remite al equipo de salud.
- **Cochrane 2024** (CD009362.pub4): los ácidos grasos (AGHO) tienen evidencia de certeza muy baja. Se presentan como complemento que nunca reemplaza los cambios de posición.
- **Escala de Braden** (Bergstrom y Braden, 1987), con puntos de corte orientativos.

Se eliminaron afirmaciones sin respaldo de la versión anterior («95 % prevenible», «Protocolo Oficial», el aval institucional y un teléfono de ejemplo). El video se volvió a generar con el texto corregido.

## Evaluación durante la hospitalización

- El banco de preguntas está en `js/banco.js`: 12 competencias en 6 dominios, con formas paralelas A y B y un pool diario. **Está en proceso de validación.**
- El protocolo de validación (I-CVI, κ\*, S-CVI, entrevistas cognitivas, KR-20, análisis de ingreso frente a alta) está en `docs/validacion-banco.md`.
- La planilla para el panel de expertos, con fórmulas automáticas, es `docs/validacion-expertos.xlsx`. Se regenera con `node scripts/exportar-banco.mjs && python3 scripts/generar-planilla-validacion.py`.
- Cada paciente descarga al alta un CSV con una fila y las mismas columnas. Para analizar el grupo, basta juntar los archivos.

## Estructura

```
.
├── index.html               # Todas las pantallas y las 8 lecciones (una se muestra a la vez)
├── css/styles.css           # Arpillera de mañana: tokens, parches, bandas, accesibilidad, impresión
├── js/app.js                # Navegación por pantallas, lecciones por pasos, comprobación, reloj, agua, juego, mapa, prueba del dedo, semáforo, riesgo, voz
├── js/banco.js              # Banco de preguntas (formas A/B y pool diario)
├── js/desafios.js           # Desafíos de hospitalización: ingreso, diario, prácticos, alta, CSV
├── docs/                    # Protocolo de validación, banco exportado y planilla de expertos
├── scripts/                 # Exportación del banco y generador de la planilla
├── fonts/                   # Atkinson Hyperlegible Next y Londrina Solid (OFL), alojadas en el sitio
├── images/                  # Ilustraciones (WebP), íconos y póster del video
├── videos/                  # Video de rotación postural y su composición HyperFrames
├── manifest.webmanifest     # Permite «Agregar a pantalla de inicio»
├── PRODUCT.md / DESIGN.md   # Contexto de producto y sistema visual
└── render.yaml              # Despliegue en Render (sitio estático)
```

No requiere compilación ni dependencias: es HTML, CSS y JS sin compilar.

## Desarrollo local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

Para volver a generar el video: `cd videos/rotacion-postural && npm run render`.

## Despliegue en Render

Está configurado como **Static Site** (`render.yaml`): sin comando de compilación y publicando la carpeta `.`.
