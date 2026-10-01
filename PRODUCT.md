# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pacientes y sus familiares o cuidadores en Chile. Son personas con movilidad reducida, que pasan mucho tiempo en cama o sentadas, y quienes las acompañan. Lo usan sobre todo en el celular en casa y también en tablet durante la consulta o en el hospital. Suelen ser personas mayores, con poca experiencia digital y a veces con baja visión. Su tarea es entender cómo se forma una lesión por presión, aplicar los cuidados todos los días y saber cuándo consultar.

## Product Purpose

Es una guía interactiva para prevenir lesiones por presión (escaras) en casa. Tiene que lograr que el paciente o su familia:
1. entienda por qué se produce una lesión por presión;
2. aplique los cuidados diarios: cambios de posición, revisión de la piel, higiene, alimentación e hidratación, y superficies de apoyo;
3. reconozca las señales de alarma y sepa cuándo consultar;
4. compruebe lo aprendido mientras juega.

Se considera un éxito si el paciente vuelve a la app como herramienta diaria y no la abre una sola vez.

## Positioning

Traduce la guía clínica internacional a acciones que una familia puede hacer en casa, con herramientas para el día a día (recordatorio de cambios de posición, registro de agua, lista de revisión) y aprendizaje mediante el juego. No es un folleto digital.

## Operating Context

- Se usa en casa, junto a la cama o al sillón, a menudo con una sola mano y con el celular.
- También en tablet, en una consulta farmacéutica o de enfermería y en el hospital.
- El paciente o la familia vuelven varias veces al día para registrar cambios de posición, vasos de agua y la revisión de la piel.

## Capabilities and Constraints

- Sitio estático (HTML, CSS y JS sin compilación) desplegado en Render como Static Site (`render.yaml`, se publica la carpeta `.`).
- Los datos del usuario se guardan solo en el dispositivo (`localStorage`). No hay servidor ni cuentas.
- Funciones que hay que conservar: recorrido por los cuidados esenciales, video de rotación postural (`videos/rotacion-postural.mp4`), reloj y planificador de cambios de posición, mapa de puntos de presión por postura, simulación de la prueba del dedo (blanqueo), lista diaria de revisión de la piel, registro de agua, evaluación orientativa de riesgo inspirada en la escala de Braden, búsqueda, lectura en voz alta (TTS), tamaño de texto, alto contraste e impresión.
- Idioma: español de Chile. Terminología: «lesión por presión» (con «escara» como sinónimo popular), CESFAM, equipo de salud, sillón, pañal.
- **No se publica ningún número de teléfono** (indicación explícita del usuario). Para consultar se remite al «equipo de salud / CESFAM» y, en una urgencia, al «servicio de urgencia más cercano».

## Brand Commitments

- Nombre: CuidaPiel.
- Pilares de la infografía original: Observe, Cuide, Prevenga y Acompañe.
- Lema de la infografía: «Cuidar su piel es cuidar su bienestar».
- Tono: cercano y respetuoso. Al paciente se le trata de «usted».

## Evidence on Hand

- La fuente principal del contenido es la infografía original `images/infografia_guia.jpg`.
- Ilustraciones de escenas existentes en `images/` (habitación, postura en cama, sillón con cojín, movilización, hidratación, cuidado de la piel).
- Video de rotación postural en `videos/rotacion-postural.mp4`, compuesto con HyperFrames en `videos/rotacion-postural/`.
- Referencia clínica: Guía Internacional EPUAP/NPIAP/PPPIA 2019 (prevención y tratamiento de lesiones por presión).
- No hay aval institucional, testimonios, estadísticas propias ni teléfonos verificados. No deben inventarse.

## Product Principles

1. **Lo clínico, correcto antes que vistoso.** Cada consejo debe coincidir con la guía EPUAP/NPIAP/PPPIA 2019. Las cifras no respaldadas se suavizan o se eliminan.
2. **Hacer antes que leer.** Cada idea se convierte en una acción que el paciente toca, marca o prueba.
3. **Herramienta diaria, no folleto.** El progreso y los registros se guardan en el dispositivo y animan a volver.
4. **Saber cuándo pedir ayuda.** Las señales de alarma son siempre visibles y no se esconden detrás de un juego.
5. **Acompañar al cuidador.** Se reconoce su esfuerzo y se le recuerda que no está solo.

## Accessibility & Inclusion

Personas mayores con baja visión, temblor o poca experiencia digital: objetivo WCAG 2.2 AA. Texto base grande (de 18 px o más), zonas táctiles de al menos 48 px, contraste alto, lectura en voz alta en español, tamaño de texto ajustable y modo de alto contraste, uso completo con teclado y respeto de `prefers-reduced-motion`. El color nunca es la única señal (en el semáforo de alarma también se usan iconos y texto).
