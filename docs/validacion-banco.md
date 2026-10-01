# Validación del banco de preguntas de CuidaPiel

**Estado:** en proceso de validación. Hoy las preguntas son material educativo basado en la Guía Internacional EPUAP/NPIAP/PPPIA 2019, y todavía no son un instrumento validado. Antes de publicar resultados de aprendizaje hay que completar al menos las fases 1 a 3.

## 1. Qué mide y cómo está armado

| Elemento | Contenido |
|---|---|
| Constructo | Conocimiento aplicado del paciente sobre la prevención de lesiones por presión en casa |
| Dominios (6) | Cambios de posición · Cuidado de la piel · Revisión de la piel · Colchón, cojín y apoyos · Alimentación e hidratación · Señales de alarma |
| Competencias (12) | 2 por dominio (ver `js/banco.js` → `COMPETENCIAS`) |
| Forma A (ingreso) | 12 ítems, uno por competencia, de opción múltiple con 3 alternativas |
| Forma B (alta) | 12 ítems **paralelos**: misma competencia, otra situación o redacción |
| Pool D (diario) | 18 ítems de aprendizaje con retroalimentación inmediata. **No** se usan en las pruebas, para no contaminar la comparación entre ingreso y alta |
| Desafíos prácticos | Almohadas (0–3), puntos de presión (0–5) y semáforo de la piel (0–5). Son medidas complementarias de habilidad, no parte del puntaje de las pruebas |

La única fuente de verdad es `js/banco.js`. Para obtener la planilla:

```bash
node scripts/exportar-banco.mjs                 # docs/banco-preguntas.csv y .json
python3 scripts/generar-planilla-validacion.py  # docs/validacion-expertos.xlsx (requiere openpyxl)
```

## 2. Fase 1 · Validez de contenido (panel de expertos)

- **Panel:** de 6 a 10 personas, por ejemplo enfermería de heridas o de atención domiciliaria, farmacia clínica, medicina (geriatría o fisiatría), kinesiología y nutrición. Conviene sumar a una persona cuidadora con experiencia como evaluadora de claridad.
- **Instrumento:** `docs/validacion-expertos.xlsx`. Cada experto o experta califica cada ítem de 1 a 4 en **relevancia** y en **claridad**.
- **Cálculo automático en la planilla:**
  - I-CVI = expertos que dan 3 o 4 ÷ expertos que evaluaron el ítem (Lynn 1986; Polit y Beck 2006).
  - κ\* (kappa modificado) = (I-CVI − Pc) ÷ (1 − Pc), con Pc = C(N, A) · 0,5ᴺ (Polit, Beck y Owen 2007).
  - S-CVI/Ave (promedio de los I-CVI) y S-CVI/UA (proporción de ítems con acuerdo universal), por forma, por dominio y para el banco completo.
  - Hoja «Formas paralelas»: verifica que los dos ítems de cada competencia (A y B) superen el umbral.
- **Criterios propuestos:** I-CVI ≥ 0,78 y κ\* > 0,74 por ítem; S-CVI/Ave ≥ 0,90 por forma (Polit y Beck 2006). Un ítem bajo el umbral se reescribe y vuelve a evaluarse en una segunda ronda. Si su pareja paralela también falla, se reemplaza la competencia completa.

## 3. Fase 2 · Comprensión (entrevistas cognitivas)

Con 5 a 10 pacientes hospitalizados de distinta escolaridad, aplique las formas A y B en voz alta. Pregunte «¿qué entiende con esta pregunta?» y «¿por qué eligió esa respuesta?». Ajuste la redacción y registre los cambios con la versión del banco (`banco.version`).

## 4. Fase 3 · Piloto psicométrico

- **Muestra:** 30 a 50 pacientes como orientación inicial. Defina el tamaño con su equipo de bioestadística.
- **Por ítem:**
  - Dificultad (*p*, proporción de aciertos). Idealmente entre 0,3 y 0,9, y se revisan los ítems que todos aciertan.
  - Discriminación: correlación punto-biserial corregida ≥ 0,20.
- **Confiabilidad:** KR-20 para cada forma. Con 12 ítems dicotómicos, un valor ≥ 0,70 es aceptable para comparar grupos.
- **Equivalencia de formas paralelas:** aplique A y B al mismo grupo el mismo día, en orden contrabalanceado. Espere medias sin diferencia relevante y una correlación alta entre formas.
- **Limitación conocida:** 2 ítems por dominio permiten describir la tendencia por tema, pero no estimar puntajes confiables por dominio. Para analizar por dominio, amplíe a 3 o 4 ítems por competencia.

## 5. Análisis de ingreso frente a alta

Cada dispositivo descarga un CSV con una fila por paciente. Los separadores son `;` y la codificación UTF-8 con BOM, lista para abrir en Excel en español. Las columnas son:

- `codigo`, `fecha_ingreso`, `fecha_alta`, `dias`
- `ingreso_total`, `alta_total` (0 a 12) y el puntaje por dominio (`ingreso_<dominio>`, `alta_<dominio>`, 0 a 2)
- una columna por ítem con 0 o 1: `A-P1` a `A-A2` y `B-P1` a `B-A2`
- `diarios_completos`, más el primer y el mejor intento de cada desafío práctico
- `version_banco`

Para el grupo, junte los CSV en una planilla (todas las filas tienen las mismas columnas). Análisis sugeridos:

- **Cambio total:** prueba de rangos con signo de Wilcoxon, o *t* pareada si la distribución lo permite, con su tamaño de efecto.
- **Cambio por competencia:** McNemar sobre los pares A/B de la misma competencia.
- **Ganancia normalizada:** (alta − ingreso) ÷ (12 − ingreso), útil cuando el puntaje de ingreso es alto.
- **Exposición:** los días con desafío diario completo y los desafíos prácticos realizados pueden explorarse como variables de exposición.

## 6. Ética y privacidad

- La app no pide nombre ni RUT y rechaza los textos con forma de RUT. Use **códigos seudónimos** asignados por el equipo. La tabla que une código y paciente queda fuera de la app, bajo custodia del investigador o investigadora responsable.
- Los datos quedan en el dispositivo hasta que se exportan. Defina quién descarga el CSV, dónde se guarda y cuándo se borra el dispositivo («Borrar mis datos» en el pie de página).
- Si se usará para investigación, se necesita la aprobación de un Comité Ético Científico acreditado y el consentimiento informado del paciente, según la normativa chilena aplicable: Ley 20.120 sobre investigación en seres humanos, Ley 20.584 sobre derechos y deberes de los pacientes, y Ley 19.628 de protección de datos con su reforma por la Ley 21.719. Confirme los requisitos vigentes con su comité.

## Referencias

1. Lynn MR. Determination and quantification of content validity. *Nurs Res.* 1986;35(6):382-5. PMID: 3640358.
2. Polit DF, Beck CT. The content validity index: are you sure you know what's being reported? Critique and recommendations. *Res Nurs Health.* 2006;29(5):489-97. PMID: 16977646.
3. Polit DF, Beck CT, Owen SV. Is the CVI an acceptable indicator of content validity? Appraisal and recommendations. *Res Nurs Health.* 2007;30(4):459-67. doi:10.1002/nur.20199. PMID: 17654487.
4. European Pressure Ulcer Advisory Panel, National Pressure Injury Advisory Panel, Pan Pacific Pressure Injury Alliance. *Prevention and Treatment of Pressure Ulcers/Injuries: Clinical Practice Guideline. The International Guideline.* Haesler E, ed. 2019.
