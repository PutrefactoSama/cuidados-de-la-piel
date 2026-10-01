/* CuidaPiel · Banco de preguntas para la evaluación de la hospitalización.

   Estructura
   - 6 dominios × 2 competencias = 12 competencias.
   - Cada competencia tiene dos ítems paralelos: forma A (ingreso) y forma B (alta).
     Miden lo mismo con distinta situación o redacción, para comparar sin memorizar.
   - Pool D: ítems del desafío diario (aprendizaje con retroalimentación). No se usan
     en las pruebas de ingreso ni de alta.

   Contenido basado en EPUAP/NPIAP/PPPIA 2019. Banco EN PROCESO DE VALIDACIÓN:
   ver docs/validacion-banco.md. Para exportarlo a planilla: node scripts/exportar-banco.mjs

   Campos: id, comp (competencia), dominio, forma (A | B | D), t (enunciado),
   op (alternativas), ok (índice de la correcta), e (explicación). */
(function (root) {
  "use strict";

  const DOMINIOS = {
    posicion: "Cambios de posición",
    piel: "Cuidado de la piel",
    revision: "Revisión de la piel",
    superficie: "Colchón, cojín y apoyos",
    nutricion: "Alimentación e hidratación",
    alarma: "Señales de alarma",
  };

  const COMPETENCIAS = {
    P1: { dominio: "posicion", nombre: "Inclinación lateral de 30° con apoyo" },
    P2: { dominio: "posicion", nombre: "Talones sin apoyo (flotando)" },
    S1: { dominio: "piel", nombre: "Manejo de la humedad y crema barrera" },
    S2: { dominio: "piel", nombre: "Cuidar la piel sin dañarla" },
    R1: { dominio: "revision", nombre: "Frecuencia y momento de la revisión" },
    R2: { dominio: "revision", nombre: "Interpretación de la prueba del dedo" },
    U1: { dominio: "superficie", nombre: "Evitar dispositivos inadecuados" },
    U2: { dominio: "superficie", nombre: "La superficie no reemplaza los cambios de posición" },
    N1: { dominio: "nutricion", nombre: "Proteínas en la alimentación" },
    N2: { dominio: "nutricion", nombre: "Hidratación según indicación médica" },
    A1: { dominio: "alarma", nombre: "Cuándo consultar hoy" },
    A2: { dominio: "alarma", nombre: "Cuándo acudir a urgencia" },
  };

  const ITEMS = [
    // ---------- Forma A (ingreso) ----------
    { id: "A-P1", comp: "P1", forma: "A", t: "Cuando la persona queda acostada de lado, ¿cómo debe quedar?", op: ["Completamente de lado, en ángulo recto (90°)", "Apenas inclinada, unos 30°, con una almohada en la espalda", "Boca abajo, para descansar la espalda"], ok: 1, e: "De lado completo, todo el peso cae sobre el hueso de la cadera. Unos 30° con almohada reparten el peso." },
    { id: "A-P2", comp: "P2", forma: "A", t: "¿Dónde va la almohada para que los talones no se apoyen en el colchón?", op: ["Debajo de las pantorrillas, con los talones en el aire", "Debajo de los talones", "No hace falta una almohada"], ok: 0, e: "La almohada va bajo las pantorrillas para que los talones queden «flotando»." },
    { id: "A-S1", comp: "S1", forma: "A", t: "Después de cambiar un pañal mojado, ¿qué corresponde hacer?", op: ["Frotar con alcohol para desinfectar", "Echar talco en abundancia", "Limpiar con suavidad, secar con toquecitos y aplicar crema barrera"], ok: 2, e: "La humedad debilita la piel. Limpiar con suavidad y proteger con crema barrera la cuida." },
    { id: "A-S2", comp: "S2", forma: "A", t: "Ve una zona enrojecida en la parte baja de la espalda. ¿Qué es lo correcto?", op: ["Masajearla para activar la circulación", "Quitarle el apoyo y vigilarla", "Frotarla con colonia"], ok: 1, e: "Masajear o frotar una zona roja puede dañar más los tejidos. Lo correcto es quitarle el apoyo." },
    { id: "A-R1", comp: "R1", forma: "A", t: "¿Cada cuánto conviene revisar la piel?", op: ["Todos los días, con buena luz", "Una vez por semana", "Solo cuando la persona se queja"], ok: 0, e: "La revisión diaria permite encontrar a tiempo una zona en riesgo." },
    { id: "A-R2", comp: "R2", forma: "A", t: "Presiona con el dedo una zona roja y NO se pone blanca. ¿Qué significa?", op: ["Que la piel está sana", "Que necesita un masaje", "Que puede ser una lesión por presión inicial: hay que quitar el apoyo y avisar"], ok: 2, e: "Una zona roja que no blanquea al presionar es una lesión por presión de categoría 1." },
    { id: "A-U1", comp: "U1", forma: "A", t: "¿Qué cojín es adecuado para estar sentado en el sillón?", op: ["Un cojín con forma de rosca, con hoyo al centro", "Un cojín antiescaras indicado por su equipo de salud", "Ninguno: es mejor una superficie dura"], ok: 1, e: "Las roscas aprietan la piel alrededor del hoyo. Se recomienda un cojín antiescaras." },
    { id: "A-U2", comp: "U2", forma: "A", t: "Si la persona tiene un colchón antiescaras…", op: ["Igual necesita cambios de posición regulares", "Ya no necesita cambiar de posición", "Debe pasar el día sentada"], ok: 0, e: "El colchón ayuda, pero no reemplaza los cambios de posición." },
    { id: "A-N1", comp: "N1", forma: "A", t: "¿Qué alimentos ayudan más a que la piel se mantenga firme y se repare?", op: ["Bebidas azucaradas", "Pan y galletas solamente", "Huevo, leche, legumbres, pescado o carne"], ok: 2, e: "La piel necesita proteínas para mantenerse firme y repararse." },
    { id: "A-N2", comp: "N2", forma: "A", t: "Si el médico no ha indicado limitar líquidos, ¿cuánta agua conviene al día?", op: ["Unos 6 a 8 vasos, en sorbos durante el día", "Un vaso al día", "Lo menos posible, para no mojar el pañal"], ok: 0, e: "Una buena hidratación ayuda a la piel. Si hay restricción médica, se sigue esa indicación." },
    { id: "A-A1", comp: "A1", forma: "A", t: "¿En cuál de estas situaciones hay que consultar hoy al equipo de salud?", op: ["La piel está un poco seca", "Aparece una ampolla o la piel se abre", "Las sábanas quedaron arrugadas"], ok: 1, e: "Una ampolla o una herida abierta requieren consultar el mismo día." },
    { id: "A-A2", comp: "A2", forma: "A", t: "La herida tiene mal olor y la persona tiene fiebre y está confundida. ¿Qué hace?", op: ["Espera al próximo control", "Le aplica crema y observa", "Acude a un servicio de urgencia"], ok: 2, e: "Mal olor, fiebre y confusión pueden indicar una infección grave: es una urgencia." },

    // ---------- Forma B (alta) ----------
    { id: "B-P1", comp: "P1", forma: "B", t: "Al girar a la persona hacia un costado, lo más seguro es…", op: ["Girarla del todo para que descanse la espalda", "Sentarla con la cabecera muy levantada", "Dejarla levemente inclinada, unos 30°, apoyada con almohadas"], ok: 2, e: "Unos 30° de inclinación, con almohada en la espalda y entre las rodillas, protegen la cadera." },
    { id: "B-P2", comp: "P2", forma: "B", t: "En la mañana los talones están rojos. ¿Qué ayuda más?", op: ["Dejarlos en el aire con una almohada bajo las pantorrillas", "Masajearlos", "Ponerles un guante con agua"], ok: 0, e: "Quitar todo el apoyo de los talones es lo que más los protege. No se masajean." },
    { id: "B-S1", comp: "S1", forma: "B", t: "La piel de la zona del pañal está húmeda e irritada. ¿Qué hace?", op: ["Deja el pañal más tiempo para no molestar", "Cambia el pañal seguido, limpia con suavidad y usa crema barrera", "Aplica colonia para refrescar"], ok: 1, e: "Cambio frecuente, limpieza suave y crema barrera (por ejemplo, de óxido de zinc) protegen la piel." },
    { id: "B-S2", comp: "S2", forma: "B", t: "¿Qué conviene usar para hidratar la piel seca?", op: ["Colonia", "Talco", "Crema hidratante sin perfume"], ok: 2, e: "La colonia y el alcohol resecan la piel. Una crema sin perfume la hidrata." },
    { id: "B-R1", comp: "R1", forma: "B", t: "¿Cuál es el momento más práctico para revisar la piel cada día?", op: ["Durante el aseo diario", "Solo en los controles médicos", "Cuando ya apareció una herida"], ok: 0, e: "Aprovechar el aseo diario permite revisar con calma y buena luz." },
    { id: "B-R2", comp: "R2", forma: "B", t: "Presiona una zona roja, se pone blanca y al soltar vuelve el color. ¿Qué indica?", op: ["Que es una herida grave", "Que la sangre todavía circula: quite el apoyo y vigile", "Que hay que masajearla"], ok: 1, e: "Si blanquea, la circulación se mantiene. Igual hay que quitar el apoyo y volver a revisar." },
    { id: "B-U1", comp: "U1", forma: "B", t: "¿Sirve poner un guante con agua bajo los talones?", op: ["Sí, es lo más recomendado", "Solo durante la noche", "No: es mejor una almohada bajo las pantorrillas"], ok: 2, e: "Los guantes con agua no se recomiendan. Los talones deben quedar en el aire." },
    { id: "B-U2", comp: "U2", forma: "B", t: "Aunque el cojín del sillón sea bueno, al estar sentado…", op: ["Hay que cambiar el apoyo o la posición seguido", "Puede quedarse todo el día igual", "No conviene moverse"], ok: 0, e: "Ningún cojín reemplaza los cambios de apoyo y de posición." },
    { id: "B-N1", comp: "N1", forma: "B", t: "Para que la piel resista mejor, en cada comida conviene incluir…", op: ["Dulces", "Proteínas", "Nada en especial"], ok: 1, e: "Las proteínas (huevo, lácteos, legumbres, pescado, carne) ayudan a la piel." },
    { id: "B-N2", comp: "N2", forma: "B", t: "El médico indicó limitar los líquidos por el corazón. ¿Qué hace con la meta de agua?", op: ["Igual toma 8 vasos", "Deja de tomar agua", "Sigue la cantidad que indicó su médico"], ok: 2, e: "Cuando hay restricción médica, manda la indicación del médico." },
    { id: "B-A1", comp: "A1", forma: "B", t: "En el talón aparece una zona morada o granate. ¿Qué hace?", op: ["La quita del apoyo y consulta hoy", "Espera una semana", "La masajea"], ok: 0, e: "Una zona morada puede ser daño profundo: se quita el apoyo y se consulta el mismo día." },
    { id: "B-A2", comp: "A2", forma: "B", t: "La herida tiene pus, el enrojecimiento se extiende y hay escalofríos. ¿Qué corresponde?", op: ["Lavar con colonia", "Acudir a un servicio de urgencia", "Esperar a ver si mejora"], ok: 1, e: "Pus, enrojecimiento que se extiende y escalofríos son señales de urgencia." },

    // ---------- Pool D (desafío diario) ----------
    { id: "D-01", comp: "U2", forma: "D", t: "¿Cómo deben quedar las sábanas bajo la persona?", op: ["Estiradas, sin arrugas ni migas", "Da igual, mientras estén limpias", "Con varias capas dobladas"], ok: 0, e: "Las arrugas y las migas aprietan y rozan la piel." },
    { id: "D-02", comp: "P1", forma: "D", t: "¿Hasta dónde conviene levantar la cabecera de la cama?", op: ["Lo más alto posible todo el día", "Lo más baja posible, no más de 30°, salvo para comer", "Siempre plana, incluso para comer"], ok: 1, e: "Con la cabecera alta, el cuerpo resbala y la piel del sacro sufre." },
    { id: "D-03", comp: "U2", forma: "D", t: "Si está sentado y puede moverse, ¿cada cuánto conviene cambiar el apoyo?", op: ["Una vez al día", "Nunca, para no cansarse", "Cada 15 a 30 minutos, inclinándose hacia adelante o a un lado"], ok: 2, e: "Sentado, el peso se concentra en los glúteos. Cambiar el apoyo seguido los protege." },
    { id: "D-04", comp: "R2", forma: "D", t: "En piel morena u oscura, ¿cómo se reconoce una zona en riesgo?", op: ["Solo por el color rojo", "Por calor, dureza, hinchazón, dolor o un tono más oscuro", "No se puede reconocer"], ok: 1, e: "En piel oscura el enrojecimiento cuesta verlo: el tacto y el dolor ayudan." },
    { id: "D-05", comp: "R1", forma: "D", t: "¿Dónde más hay que revisar, además de los huesos que se apoyan?", op: ["Bajo sondas, mascarillas de oxígeno y medias", "Solo en las manos", "En ninguna otra parte"], ok: 0, e: "Los dispositivos médicos también pueden producir lesiones por presión." },
    { id: "D-06", comp: "P1", forma: "D", t: "Para subir a la persona en la cama, lo mejor es…", op: ["Arrastrarla tomándola de los brazos", "Pedirle que se empuje con los talones", "Levantarla con una sábana entre dos personas"], ok: 2, e: "Arrastrar produce roce y daña la piel por dentro." },
    { id: "D-07", comp: "P1", forma: "D", t: "Acostada de lado, ¿qué evita que una rodilla apriete a la otra?", op: ["Una almohada entre las rodillas", "Cruzar las piernas", "Nada: no importa"], ok: 0, e: "La almohada entre las rodillas protege los huesos de las piernas." },
    { id: "D-08", comp: "N2", forma: "D", t: "¿Cuál es la mejor forma de ofrecer agua?", op: ["Todo junto en la noche", "En pequeños sorbos durante el día", "Solo con las comidas"], ok: 1, e: "Los sorbos repartidos durante el día son más fáciles de tomar." },
    { id: "D-09", comp: "N1", forma: "D", t: "La persona come muy poco y está bajando de peso. ¿Qué hace?", op: ["Esperar a que recupere el apetito", "Darle solo líquidos", "Avisar al equipo de salud: pueden indicar suplementos"], ok: 2, e: "La desnutrición aumenta el riesgo. El equipo puede ajustar la alimentación." },
    { id: "D-10", comp: "S2", forma: "D", t: "Los ácidos grasos hiperoxigenados (AGHO), ¿reemplazan los cambios de posición?", op: ["No: pueden ayudar, pero nunca los reemplazan", "Sí, con ellos basta", "Sí, si se aplican dos veces al día"], ok: 0, e: "La evidencia sobre los AGHO es incierta. Los cambios de posición siguen siendo la base." },
    { id: "D-11", comp: "S1", forma: "D", t: "Al secar la piel después del baño…", op: ["Se frota fuerte con la toalla", "Se seca con toquecitos, sobre todo en los pliegues", "Se deja húmeda para que se hidrate"], ok: 1, e: "Frotar daña la piel. La humedad en los pliegues la debilita." },
    { id: "D-12", comp: "R2", forma: "D", t: "Una zona roja sí se pone blanca al presionar. ¿Qué hace?", op: ["La masajea", "No hace nada", "Quita el apoyo de esa zona y la revisa en unas horas"], ok: 2, e: "Es una señal de aviso: quitar el apoyo permite que se recupere." },
    { id: "D-13", comp: "R2", forma: "D", t: "¿Puede una lesión por presión empezar por dentro, con la piel todavía entera?", op: ["Sí: el daño puede empezar cerca del hueso", "No, siempre empieza como herida", "Solo en personas jóvenes"], ok: 0, e: "Por eso importan la dureza, el calor, el dolor y los cambios de color." },
    { id: "D-14", comp: "P2", forma: "D", t: "¿Quién define cada cuánto cambiar de posición?", op: ["Siempre cada 6 horas", "Su equipo de salud, según su riesgo y su colchón (habitualmente cada 2 a 4 horas)", "Solo cuando la persona lo pide"], ok: 1, e: "La frecuencia se ajusta a cada persona. Use la que le indicó su equipo." },
    { id: "D-15", comp: "P1", forma: "D", t: "¿Por qué no conviene acostar a la persona completamente de lado (90°)?", op: ["Porque se enfría", "Porque cuesta más respirar", "Porque todo el peso cae sobre el hueso de la cadera"], ok: 2, e: "Con unos 30° de inclinación, el peso se reparte mejor." },
    { id: "D-16", comp: "A1", forma: "D", t: "Una zona está dura, caliente y dolorosa, aunque la piel siga entera. ¿Qué hace?", op: ["Consulta hoy a su equipo de salud", "Le pone una bolsa caliente", "La masajea con crema"], ok: 0, e: "Dureza, calor y dolor pueden indicar daño bajo la piel." },
    { id: "D-17", comp: "U2", forma: "D", t: "Si la persona puede moverse sola, ¿qué conviene?", op: ["Que se quede quieta para no cansarse", "Animarla a moverse por sí misma todo lo que pueda", "Moverla solo en la noche"], ok: 1, e: "El movimiento propio ayuda a la circulación y mantiene la fuerza." },
    { id: "D-18", comp: "S1", forma: "D", t: "Si hay incontinencia, ¿qué protege la piel?", op: ["Usar dos pañales a la vez", "Lavar con agua muy caliente", "Una crema barrera después de cada limpieza"], ok: 2, e: "La crema barrera forma una capa que protege de la humedad." },
  ].map((it) => Object.assign({ dominio: COMPETENCIAS[it.comp].dominio }, it));

  const banco = {
    version: "2026-10-01",
    estado: "En proceso de validación de contenido por expertos",
    DOMINIOS,
    COMPETENCIAS,
    ITEMS,
    forma(f) {
      return ITEMS.filter((i) => i.forma === f);
    },
    porId(id) {
      return ITEMS.find((i) => i.id === id);
    },
  };

  if (typeof module !== "undefined" && module.exports) module.exports = banco;
  else root.CUIDAPIEL_BANCO = banco;
})(typeof window !== "undefined" ? window : globalThis);
