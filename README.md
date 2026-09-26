# 🛡️ Cuidados de la Piel: Guía Interactiva para la Prevención de Lesiones por Presión

Una aplicación web educativa e interactiva diseñada especialmente para adultos mayores, familiares y cuidadores de personas en situación de reposo o movilidad reducida.

---

## 🌟 Características Principales

1. **🏨 Habitación Interactiva Guiada (Interactive Hotspots)**:
   - Navegación visual sobre puntos clave de la habitación (Cama, Alimentación, Superficies de apoyo, Movilización, Revisión de piel, Higiene y Apoyo al cuidador).
   - Diálogos modales accesibles `<dialog>` con explicaciones clínicas claras y comprensibles.
   - Modo de paseo guiado automático (*Guided Tour*).

2. **🗂️ Dashboard Modular por Tarjetas**:
   - Tarjetas categorizadas (*Cama y Posturas, Piel e Higiene, Nutrición y Agua, Herramientas, Alertas*).
   - Métricas en tiempo real del progreso de aprendizaje y registro de cuidados.

3. **🔍 Buscador Inteligente en Tiempo Real**:
   - Panel de resultados instantáneo insensible a tildes y mayúsculas con coincidencia difusa y apertura directa de consejos.

4. **♿ Accesibilidad Universal (a11y)**:
   - Control de tamaño de texto (Normal / Grande / Extra Grande).
   - Modo de Alto Contraste para personas con baja visión.
   - Narrador por voz integrado (**Text-to-Speech**) en español para lectura automática de consejos.
   - Navegación completa por teclado y semántica HTML5 pura.

5. **🛠️ Herramientas Prácticas y Simuladores**:
   - **🎯 Mapa Anatómico de Presión**: Zonas críticas según la postura (Boca arriba, De lado 30°, Sentado en silla).
   - **👆 Simulador de la "Prueba del Dedo"**: Diferenciación táctil e interactiva entre eritema blanqueable (piel sana) y no blanqueable (Lesión Grado 1).
   - **⏰ Temporizador y Planificador de 2 Horas**: Cuenta regresiva y tabla de horarios (08:00 a 22:00) persistente en `localStorage`.
   - **💧 Registro Diario de Hidratación**: Rastreador interactivo de 8 vasos de agua con cálculo de litros.

---

## 🚀 Despliegue en Render

Este proyecto está configurado para desplegarse como un **Static Site** en [Render](https://render.com).

### Pasos para desplegar:
1. Conecta tu cuenta de GitHub a **Render**.
2. Selecciona **New +** -> **Static Site**.
3. Elige el repositorio `PutrefactoSama/cuidados-de-la-piel`.
4. Render detectará automáticamente el archivo `render.yaml`:
   - **Build Command**: *(dejar vacío)*
   - **Publish Directory**: `.`
5. Haz clic en **Create Static Site**. ¡Tu aplicación estará en vivo con HTTPS en segundos!

---

## 💻 Estructura del Proyecto

```
.
├── index.html            # Estructura principal, modales y componentes accesibles
├── css/
│   └── styles.css        # Diseño responsivo, alto contraste, modales y animaciones
├── js/
│   └── app.js           # Lógica interactiva, búsqueda en vivo, TTS, mapa anatómico y temporizador
├── images/               # Ilustraciones y recursos visuales
├── render.yaml           # Configuración de despliegue en Render
├── .gitignore            # Archivos excluidos del control de versiones
└── README.md             # Documentación del proyecto
```

---

## 👥 Créditos y Enfoque Clínico
Desarrollado con base en las guías clínicas de prevención de úlceras por presión (NPUAP/EPUAP), promoviendo los 4 pilares esenciales: **Observe, Cuide, Prevenga y Acompañe**.
