# CuidaPiel · Guía interactiva para prevenir lesiones por presión

Aplicación web para **pacientes y familias** (Chile), pensada primero para el celular en casa y también para tablet en consulta u hospital. Enseña por qué aparecen las lesiones por presión («escaras»), ayuda a llevar los cuidados diarios y deja claro cuándo consultar.

Visualmente es una **arpillera chilena**: cielo índigo con cordillera, parches de tela cosidos, pespuntes y bordes de tijera zigzag.

## Qué puede hacer el paciente

| Sección | Interacción |
|---|---|
| **¿Por qué aparece?** | Simulador del corte de la piel: al mover el «hilo» del tiempo, la presión aplasta los vasos y el tejido cambia de color. Un botón muestra cómo vuelve la sangre al cambiar de posición. |
| **Seis cuidados** | Recorrido por pestañas (cambios de posición, piel limpia y seca, revisión diaria, colchón y cojín, movimiento, alimentación e hidratación), con listas «Haga / Evite». Cada cuidado se puede marcar como aprendido. |
| **Video** | Animación de la rotación postural, compuesta con HyperFrames (`videos/rotacion-postural/`). |
| **Revisar la piel** | Mapa de puntos de presión en tres posturas (boca arriba, de lado, sentado) y simulador de la **prueba del dedo** (zona que blanquea y zona que no). |
| **Mi día** | Reloj de hilo de 24 h con los cambios de posición (intervalo de 2, 3 o 4 h según el equipo de salud; 1 h si está sentado), registro de vasos de agua, lista de revisión diaria con punto cruz y resumen de los últimos 7 días. Se puede imprimir. |
| **Aprenda jugando** | Diez afirmaciones «¿mito o verdad?», insignias bordadas y **Mi progreso**: historial de partidas con gráfico, comparación entre la primera y la última, y temas para repasar. |
| **¿Cuándo pedir ayuda?** | Semáforo (verde, amarillo, rojo y urgencia) con un revisor de señales que indica qué hacer. |
| **Mi riesgo** | Autoevaluación orientativa de 6 preguntas inspirada en la escala de Braden (puntaje de 6 a 23). |
| **Para quien cuida** | Apoyo a la persona cuidadora. |

Accesibilidad: tipografía Atkinson Hyperlegible Next (diseñada para baja visión), tres tamaños de letra, modo de alto contraste, lectura en voz alta en español, uso completo con teclado y respeto de `prefers-reduced-motion`.

**Privacidad:** todo se guarda solo en el dispositivo (`localStorage`). No hay servidor ni cuentas, y la página no publica números de teléfono.

## Base clínica

El contenido se revisó contra la evidencia:

- **EPUAP/NPIAP/PPPIA 2019**, guía internacional de prevención y tratamiento de lesiones por presión.
- **Cochrane 2026** (CD009958.pub4): la frecuencia de los cambios de posición tiene evidencia de certeza muy baja (2 h frente a 4 h, RR 1,05). Por eso el intervalo es configurable y se remite al equipo de salud.
- **Cochrane 2024** (CD009362.pub4): los ácidos grasos (AGHO) tienen evidencia de certeza muy baja. Se presentan como complemento que nunca reemplaza los cambios de posición.
- **Escala de Braden** (Bergstrom y Braden, 1987), con puntos de corte orientativos.

Se eliminaron afirmaciones sin respaldo de la versión anterior («95 % prevenible», «Protocolo Oficial», el aval institucional y un teléfono de ejemplo). El video se volvió a generar con el texto corregido.

## Estructura

```
.
├── index.html               # Página única con todo el contenido
├── css/styles.css           # Mundo arpillera: tokens, parches, bandas, accesibilidad, impresión
├── js/app.js                # Interacciones: reloj, agua, juego, mapa, prueba del dedo, semáforo, riesgo, TTS
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
