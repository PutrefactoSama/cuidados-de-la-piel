// Exporta el banco de preguntas (js/banco.js) a docs/banco-preguntas.csv y docs/banco-preguntas.json.
// Uso: node scripts/exportar-banco.mjs
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const banco = require(join(raiz, "js", "banco.js"));

const filas = banco.ITEMS.map((it) => ({
  id: it.id,
  forma: it.forma === "A" ? "A (ingreso)" : it.forma === "B" ? "B (alta)" : "D (diario)",
  dominio: banco.DOMINIOS[it.dominio],
  competencia: `${it.comp} · ${banco.COMPETENCIAS[it.comp].nombre}`,
  enunciado: it.t,
  alternativa_A: it.op[0],
  alternativa_B: it.op[1],
  alternativa_C: it.op[2],
  correcta: "ABC"[it.ok],
  explicacion: it.e,
}));

const celda = (v) => {
  const s = String(v);
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const cols = Object.keys(filas[0]);
const csv = "﻿" + [cols.join(";"), ...filas.map((f) => cols.map((c) => celda(f[c])).join(";"))].join("\r\n") + "\r\n";
mkdirSync(join(raiz, "docs"), { recursive: true });
writeFileSync(join(raiz, "docs", "banco-preguntas.csv"), csv);
writeFileSync(
  join(raiz, "docs", "banco-preguntas.json"),
  JSON.stringify({ version: banco.version, estado: banco.estado, dominios: banco.DOMINIOS, competencias: banco.COMPETENCIAS, items: banco.ITEMS }, null, 2)
);
console.log(`Banco ${banco.version}: ${filas.length} ítems exportados a docs/banco-preguntas.csv y docs/banco-preguntas.json`);
