---
name: CuidaPiel
description: A pressure-injury prevention guide for Chilean patients and families, sewn as a Chilean arpillera in daylight, soft-dyed cloth stitched onto raw linen.
colors:
  fondo: "#f4eee3"
  cielo-dia: "#e4ebf1"
  barra: "#fbf8f2"
  cielo: "#3d4a86"
  cielo-hondo: "#2c3568"
  cielo-claro: "#8fa3c4"
  noche: "#ebe4d6"
  sol: "#e2b04a"
  sol-hondo: "#a87a22"
  sol-claro: "#f7e6bd"
  turquesa: "#2e6e6a"
  turquesa-claro: "#d8eae4"
  fucsia: "#95475f"
  fucsia-claro: "#f3dfe4"
  cordillera: "#3d6b4b"
  cordillera-claro: "#dceada"
  lila: "#5e5491"
  lila-claro: "#e5e1f2"
  naranjo: "#a6553a"
  naranjo-claro: "#f6dfd3"
  alarma: "#b3261e"
  alarma-claro: "#f9dcd8"
  tela-turquesa: "#dcebe6"
  tela-sol: "#f6e7c4"
  tela-fucsia: "#f3e1e5"
  tela-cordillera: "#e1ebdd"
  tela-lila: "#e8e4f3"
  tela-naranjo: "#f6e3d8"
  tela-cielo: "#e2e8f2"
  lienzo: "#fffdf8"
  lienzo-2: "#f3eee4"
  tinta: "#1f2547"
  tinta-suave: "#4a4f6e"
  hilo-tinta: "rgba(31, 37, 71, 0.28)"
  hilo-blanco: "rgba(255, 255, 255, 0.72)"
  piel-sana: "#f5b49a"
typography:
  display:
    fontFamily: "Londrina Solid, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 4.4vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Londrina Solid, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 1.5rem + 2.6vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.01em"
  title:
    fontFamily: "Londrina Solid, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 1.6vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.01em"
  title-sm:
    fontFamily: "Londrina Solid, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1
  numeral:
    fontFamily: "Londrina Solid, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "3.4rem"
    fontWeight: 400
    lineHeight: 1
  heading:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 800
    lineHeight: 1.2
  lead:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.15
  small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  patch: "26px 18px 28px 16px / 18px 26px 16px 28px"
  btn: "16px 12px 16px 12px / 12px 16px 12px 16px"
  tray: "18px"
  control: "14px"
  sm: "12px"
  tight: "10px"
  pill: "999px"
spacing:
  gutter: "16px"
  gutter-wide: "32px"
  list: "10px"
  stack: "22px"
  patch: "22px"
  patch-wide: "30px"
  band-gap: "44px"
  band-block: "56px"
  band-block-wide: "96px"
components:
  button-primary:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.cielo-hondo}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0.6rem 1.4rem"
    height: "56px"
  button-cielo:
    backgroundColor: "{colors.cielo}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0.6rem 1.4rem"
    height: "56px"
  button-secondary:
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0.6rem 1.4rem"
    height: "56px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0.6rem 1.4rem"
    height: "56px"
  button-small:
    rounded: "{rounded.btn}"
    padding: "0.4rem 1rem"
    height: "48px"
  button-quiz-correct:
    backgroundColor: "{colors.cordillera}"
    textColor: "#ffffff"
    height: "72px"
  button-quiz-wrong:
    backgroundColor: "{colors.naranjo}"
    textColor: "#ffffff"
    height: "72px"
  listen:
    backgroundColor: "transparent"
    rounded: "{rounded.pill}"
    padding: "0.35rem 1rem 0.35rem 0.8rem"
    height: "48px"
  listen-pressed:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.cielo-hondo}"
  chip:
    backgroundColor: "#ffffff"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  patch:
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.patch}"
    padding: "{spacing.patch}"
  band:
    backgroundColor: "{colors.tela-turquesa}"
    textColor: "{colors.tinta}"
    padding: "56px 20px 64px"
  band-sol:
    backgroundColor: "{colors.tela-sol}"
    textColor: "{colors.tinta}"
  luz-verde:
    backgroundColor: "{colors.cordillera-claro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-amarillo:
    backgroundColor: "{colors.sol-claro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-rojo:
    backgroundColor: "{colors.alarma-claro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-urgencia:
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-bulbo:
    backgroundColor: "{colors.cordillera}"
    rounded: "{rounded.pill}"
    size: "64px"
  cuidado-tab:
    backgroundColor: "rgba(255, 255, 255, 0.55)"
    textColor: "{colors.cielo-hondo}"
    rounded: "{rounded.btn}"
    padding: "10px 16px 10px 12px"
    height: "60px"
  cuidado-tab-selected:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
  segmented:
    backgroundColor: "{colors.lienzo-2}"
    rounded: "{rounded.tray}"
    padding: "6px"
  segmented-option:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "6px 14px"
    height: "52px"
  segmented-option-selected:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
  option-tile:
    backgroundColor: "{colors.lienzo-2}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
    height: "52px"
  option-tile-selected:
    backgroundColor: "#dcf3f1"
  position-tile:
    backgroundColor: "{colors.lienzo-2}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
    height: "60px"
  position-tile-selected:
    backgroundColor: "#ffffff"
  cruz-row:
    backgroundColor: "{colors.lienzo-2}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  cruz-box:
    backgroundColor: "#ffffff"
    rounded: "{rounded.tight}"
    size: "44px"
  search-field:
    backgroundColor: "{colors.lienzo-2}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "56px"
  stepper-button:
    backgroundColor: "#ffffff"
    rounded: "{rounded.tight}"
    size: "48px"
  insignia:
    backgroundColor: "rgba(255, 255, 255, 0.55)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.tray}"
    padding: "10px 12px"
  topbar:
    backgroundColor: "{colors.barra}"
    textColor: "{colors.tinta}"
    height: "68px"
  bottomnav:
    backgroundColor: "{colors.barra}"
    textColor: "{colors.tinta}"
    height: "76px"
  toast:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
    rounded: "{rounded.btn}"
    padding: "14px 18px"
---

# Design System: CuidaPiel

## Overview

**Creative North Star: "The Daylight Arpillera"**

CuidaPiel is sewn, not printed. It takes the form of a Chilean arpillera: scraps of cloth stitched onto a sack-cloth ground to tell a story. Here the ground is raw linen in daylight, with a pale morning sky over a stitched cordillera, little houses and a sun. The cloth is soft-dyed rather than saturated, because the people who use it spend long hours beside a bed and a loud, dark page tires them. Each section of the guide is a band of washed fabric cut with pinking shears and sewn onto the linen with a running stitch. The reading happens on linen patches stitched onto the bands. Every daily action the family logs becomes another stitch: an arc of thread on the clock, a cross stitch on the checklist, an embroidered badge.

The system is built for older patients and carers with low vision, tremor and little digital experience, so the textile world never costs legibility. Body text is a large hyperlegible humanist sans on linen at about 15:1 contrast. Controls are fat and easy to hit, with 48px as the minimum and 56px for standard buttons. Every alarm carries an icon and words, never colour alone. The density is generous: one idea per patch and one decision per control. The display letters are blocky caps that look cut from felt and appliquéd on, which gives the page a handmade voice. The prose stays plain and calm. The system explicitly rejects the white clinical health app with its row of identical white cards and a teal accent.

Depth is cloth lying on cloth: linen ground, then band, then patch, with short, faint shadows tinted with ink. Motion means sewing. A new clock arc draws itself like a stitch pulled through, a knot pops in, and a new badge spins into place as if embroidered. All motion collapses when `prefers-reduced-motion` is set.

**Key Characteristics:**
- Raw linen as the permanent ground, with a pale daylight sky in the hero and no dark pages.
- Soft-dyed fabric bands (washes of each thread colour) with zigzag pinked edges and an inset running-stitch seam in the deeper thread.
- Linen reading patches with hand-cut asymmetric corners and a dashed thread dyed to match the patch.
- Londrina Solid uppercase display over Atkinson Hyperlegible Next body at 19px.
- A sun-yellow primary action, with a stitch earned only by primary actions and sewn-down surfaces.
- Clinical colour always paired with an icon and text, plus high-contrast and three text-size modes built in.

## Colors

The palette works like a bag of arpillera scraps left out in the sun: a raw linen ground, one ochre for action, a deep añil kept for selection, soft washes of five fabrics for the bands, the deeper thread of each fabric for icons and text, and a clinical red that never fades.

### Ground and ink
- **Raw Linen** (fondo): the ground of the whole page. Body text sits on it in tinta at 12.9:1.
- **Morning Sky** (cielo-dia): the top of the hero only, fading into raw linen behind the stitched cordillera.
- **Bar Linen** (barra): the top bar and the bottom nav, a shade lighter than the ground, with a dashed ink seam.
- **Toasted Linen** (noche): the footer cloth and its pinked edge.
- **Ink** (tinta): all text on linen and on band washes (12–15:1).
- **Faded Ink** (tinta-suave): secondary text, dates, notes and axis labels (6.3:1 or better on every wash).

### Añil (the one deep tone)
- **Añil** (cielo): the sky-coloured button ("Ya cambié de posición", "Siguiente pregunta"). White text reaches 8.3:1.
- **Deep Añil** (cielo-hondo): selected care tabs and segments, the toast, the chart tooltip, the "Esto le corresponde hoy" tag, the clock hand, the risk needle, and the halo around the focus ring. It is also the ink on ochre. Use it in small, selected things only; it is never a surface larger than a control.
- **Blue-Grey** (cielo-claro): the scrollbar thumb and the video frame thread.

### Action
- **Ochre** (sol): primary buttons, the focus outline, pressed toolbar toggles, the pressed listen button, numbered step discs, the care-tab icon disc, the slider thumb and text selection. Ink on ochre is deep añil (5.8:1) or tinta (7.5:1). Ochre is never a text colour.
- **Deep Ochre** (sol-hondo): the ring of the semáforo light that applies today, the thread of the ochre band and the star of a complete day, where ochre alone would fall under 3:1.
- **Pale Ochre** (sol-claro): the amarillo light, the "due now" state of the Mi día patch and the amarillo result box.

### Fabrics
Each fabric has three strengths. The **thread** (turquesa, fucsia, cordillera, lila, naranjo) is deep enough for text and icons on linen (5.2:1 or better) and for white text on it. The **wash** (`-claro`) grounds in-patch feedback. The **cloth** (`tela-*`) is the band ground, always under ink.
- **Lagoon** (turquesa / turquesa-claro / tela-turquesa): the cause and risk bands, the selected risk option, the right-side position and links in the footer.
- **Mulberry** (fucsia / fucsia-claro / tela-fucsia): the skin-check and carer bands, the brand mark, the cross-stitch X, the left-side position and the highlighted words in the carer headline.
- **Sage** (cordillera / cordillera-claro / tela-cordillera): the Mi día band, the verde light, learned tabs, correct answers and the "Haga" list.
- **Heather** (lila / lila-claro / tela-lila): the quiz band, progress chart bars, the seated position and the night arc on the clock.
- **Terracotta** (naranjo / naranjo-claro / tela-naranjo): the hospital-challenges band, wrong quiz answers and the "high" step of the risk scale.
- **Healthy Skin** (piel-sana): skin tone in the pressure diagrams and the start of the slider track.

### Clinical
- **Clinical Red** (alarma / alarma-claro): pressure points, "Evite", the rojo and urgencia lights, an overdue position change, the urgent result and the Alarma link in both navs. It keeps its full strength: it is the one colour on the page that is allowed to be loud.

### Neutral
- **Linen** (lienzo): every reading patch, the secondary button face, the urgencia light and earned badges, always under the faint `--trama-clara` weave.
- **Raw Linen Inset** (lienzo-2): the inset ground for controls inside a patch.
- **Ink Thread** (hilo-tinta): seams under the top bar, above the bottom nav, around the footer notice and on idle pillar tape.
- **White Thread** (hilo-blanco): the running stitch on añil, sage or red surfaces (sky buttons, the selected tab, learned discs).

**Accessibility modes.** `html[data-contraste="alto"]` redefines the tokens instead of restyling components, and it keeps its own black world on purpose: the ground, bars, bands and añil become `#000`, text on them becomes `#fff`, ochre becomes `#ffe500`, raw linen inset becomes `#fff`, and patches and lights gain a 3px black border with a 3px white outline. Alarm links, footer links and the carer highlight turn `#ffe500`. A new component inherits this mode only if it is coloured through tokens (`--fondo-fg`, `--barra-fg`, `--band-fg`).

### Named Rules
**The Linen Ground Rule.** The page is never dark and never pure white. Raw linen is the ground under everything; reading happens on a lighter linen patch with its stitched edge.

**The Quiet Cloth Rule.** Band grounds are washes, never full-strength fabric. Full strength is spent on threads: icons, small fills, stitches and text. If a surface larger than a control needs colour, use its `tela-*` cloth.

**The Dyed Thread Rule.** Stitches are never grey. On linen and on band washes the thread is the patch's hue: `color-mix(in srgb, <hue> 82%, var(--cielo-hondo))` on patches and the hue at about 40–50% on bands. On añil, sage or red surfaces the thread is white.

**The Ochre Means Act Rule.** Ochre marks what to do now: primary buttons, the focus ring, pressed toggles and numbered steps. On an ochre surface the ink is always deep añil or tinta.

**The Red Is Clinical Rule.** Alarma red is spent only on clinical warning. A wrong quiz answer is terracotta, never alarma.

**The Never Color Alone Rule.** Every status colour travels with an icon and words. The semáforo lights carry a bulb icon and a "Verde / Amarillo / Rojo / Urgencia" title, the Haga and Evite lists carry a check or a cross, and the risk scale carries labels.

## Typography

**Display Font:** Londrina Solid (400 and 900, self-hosted), falling back to Atkinson Hyperlegible Next and system-ui
**Body Font:** Atkinson Hyperlegible Next (400, 700 and 800, self-hosted), falling back to system-ui, -apple-system, Segoe UI and Roboto

**Character:** Londrina Solid is a blocky, slightly uneven caps face that reads like felt letters cut and appliquéd onto cloth. It has the warmth of a handmade tableau and only shouts in uppercase. Atkinson Hyperlegible Next was drawn for low-vision readers, with distinct letterforms, open counters and sturdy weights. The pairing is handmade on top and clinical-clear underneath.

### Hierarchy
- **Display** (Londrina 900, clamp(2.6rem → 4.75rem), lh 0.94, uppercase): the hero headline only, max 12ch. Below 600px it locks to 2.45rem. The carer headline uses the same 900 caps at clamp(2.4rem → 4rem).
- **Headline** (Londrina 400, clamp(2.15rem → 3.4rem), lh 0.98, uppercase): section titles, max 16ch.
- **Title** (Londrina 400, clamp(2rem → 2.75rem), lh 0.98, uppercase): the title of each care panel. The quiz statement uses the same voice at clamp(1.9rem → 2.6rem), lh 1.04.
- **Title-sm** (Londrina 400, 1.75–1.9rem, lh 1, uppercase): sub-headings set on cloth (risk factors, last 7 days, badges, footer) and the "Mi día" patch title.
- **Numeral** (Londrina 400, lh 1): live readouts. The next change time is 3.4rem. The hero count is 2.6rem, the water count 2.4rem and the hours on the slider 2rem.
- **Heading** (Atkinson 800, 1.4rem, lh 1.2): headings inside patches, semáforo lights (1.375rem) and point info.
- **Lead** (Atkinson 400, 1.25rem, rising to 1.375rem at 900px and up, lh 1.5, max 38ch): the hero intro and section intros (1.25rem, max 54ch).
- **Body** (Atkinson 400, 1.1875rem / 19px, lh 1.55): all prose. List items inside patches sit at 1.0625–1.125rem, lh 1.45.
- **Label** (Atkinson 800, 1.125rem, lh 1.15): button text, in sentence case. Small buttons, chips and listen buttons use 700–800 at 1rem. Legends are 800 at 1.125–1.25rem.
- **Small** (Atkinson 400–700, 1rem, lh 1.45): notes, dates and footer text. Chart axes and tool captions are the only text below 1rem (0.8125–0.875rem), and both are always paired with a larger value or an icon.

### Named Rules
**The Felt Caps Rule.** Londrina Solid is set in uppercase and used only for display: headlines, panel titles, the brand, numerals and the pillar ribbon. Buttons, labels, legends and prose are always set in Atkinson Hyperlegible Next.

**The 19-Pixel Floor Rule.** Body text is 1.1875rem. Reading text never drops below 1rem, and every size is set in rem, so the Letra control (100%, 112.5% and 125% on `html[data-texto]`) scales the whole page.

## Layout

The layout is mobile-first and stacks in a single column, with two-column splits from 960px (hero, causes, care tour) and 1000px (Mi día, quiz, semáforo, skin check). Content sits in a 1200px wrap with a 16px gutter (32px at 700px and up). Sections alternate between fabric bands and stretches of bare linen. Bands are inset from the viewport edges by 6px (20px at 700px and up), capped at 1360px, separated by 44px of visible linen, and padded 56px top and 64px bottom (96px and 104px at 900px and up). Linen sections without a band are padded 40/48px (64/72px at 900px and up).

Each section opens with a section head made of three parts: the headline, one sentence of intro, and the Escuchar button. At 900px and up the button moves to the top-right column. Inside a section the stack gap is 22px, list rows sit 8–12px apart, and patches are padded 22px (30px at 700px and up).

The top bar is sticky at 68px. Below 900px a fixed 76px bottom nav carries five destinations, with Alarma always last and always in sol. The page's scroll padding clears both bars. The full desktop nav appears only from 1180px. On phones the care tabs become a horizontal scroll-snap strip. At 960px and up they become a sticky 300px column beside the panel.

Print collapses everything to black on white. Bands, zigzags, stitches and interactive tools are dropped, and every care panel is printed. "Imprimir mi día" prints only the day summary and the semáforo.

### Named Rules
**The Inset Band Rule.** A band never touches the viewport edge and never butts against the next band. The linen must always show around it.

## Elevation & Depth

Depth is built from layered fabric: the linen ground, the band sewn onto it, and the lighter linen patch sewn onto the band. Each layer adds a short, faint shadow tinted with ink `rgba(31, 37, 71, …)`, as if the cloth were lifting slightly off the cloth below. On a light page these shadows stay low (0.3 alpha or less) so the cloth reads as soft rather than heavy. Resting controls use the low shadow. Patches, lights and hovered buttons use the full one. Selection is shown by colour fill and a stitch, never by a bigger shadow, with one exception: the active semáforo light gains a 4px deep-ochre ring and a slightly deeper drop.

### Shadow Vocabulary
- **Sombra baja** (`0 4px 10px -6px rgba(31, 37, 71, 0.32), 0 1px 2px rgba(31, 37, 71, 0.08)`): resting buttons, the selected care tab, the selected position tile, stepper keys, the slider thumb and the chart tooltip.
- **Sombra** (`0 10px 24px -14px rgba(31, 37, 71, 0.32), 0 2px 5px rgba(31, 37, 71, 0.08)`): patches, semáforo lights, the toast and button hover.
- **Band drop** (`0 16px 28px -24px rgba(31, 37, 71, 0.45)`): under each fabric band only.
- **Dialog drop** (`0 30px 60px -24px rgba(31, 37, 71, 0.45)`): the search dialog over an ink backdrop at 35%.
- **Active light** (`0 0 0 4px var(--sol-hondo), 0 18px 30px -18px rgba(31, 37, 71, 0.45)`): the semáforo light that applies today.

### Named Rules
**The Cloth-on-Cloth Rule.** Shadows are short, faint and ink-tinted. Never use black, never use a hard offset, and never use a glow.

**The Lift Rule.** A button rises 2px and gains the full shadow on hover, and sinks 1px with a near-flat shadow when pressed (180ms on `--ease-out`).

## Shapes

The forms are cut by hand. Patches, semáforo lights, carer tips and the search dialog use an asymmetric elliptical radius (`26px 18px 28px 16px / 18px 26px 16px 28px`), so no two corners match. Buttons, care tabs and the toast use a smaller hand-cut radius (`16px 12px 16px 12px / 12px 16px 12px 16px`). Controls nested inside a patch are calmer and more regular: 14px tiles and rows, 18px trays and badge rows, 12px small rows and inner notices, and 10px check boxes and stepper keys. Ribbons, chips, the listen button and the "today" tag are pills. Bulbs, number discs, points and badges are circles.

Two textile edges recur. One is the **pinked edge**, a 14px zigzag with 7px teeth along the top and bottom of every band (top only on the footer). The other is the **running stitch**, a dashed line inset from an edge: 3.5px inset 9px on patches, 3px inset 8px on lights, 3px inset 5px on primary buttons, and 3px offset 9–14px inward on bands. The same dashed thread runs as a 2px seam under the top bar, above the bottom nav and between blocks inside patches. Inside SVG diagrams it appears as a `6 5` dash.

### Named Rules
**The Hand-Cut Corner Rule.** Surfaces that represent a piece of cloth (patches, lights, buttons, tabs) use the asymmetric radii above. Symmetric radii are kept for controls nested inside cloth.

**The Earned Stitch Rule.** The running stitch marks only what is sewn down: patch and light edges, the primary sol and cielo buttons, section seams, the selected care tab, and embroidered ornaments (pillar ribbon, badges, thread clock, brand mark). Idle secondary buttons, checkboxes, radio and position tiles, chips, inputs and tiles keep solid edges, because older users with little digital experience read a dashed-only outline as a placeholder or a disabled control.

## Components

### Buttons
Buttons are sewn patches, chunky and tactile.
- **Shape:** hand-cut corners (`{rounded.btn}`), at least 56px tall, padded 0.6rem 1.4rem, with Atkinson 800 at 1.125rem in sentence case. The icon (1.15em) sits 0.6rem from the text.
- **Primary (sol):** a sun-yellow face with indigo ink and an inner running stitch inset 5px, drawn in 3px dashes of the ink colour at 38%. Use one per decision: "Empezar el recorrido", "Lo aprendí", "Registrar cambio", "Jugar otra vez" and "Imprimir mi día".
- **Sky (cielo):** an indigo face with white text and a white-thread inner stitch. It is the primary action on linen when the moment is a quick log or a step forward rather than a commitment, for example "Ya cambié de posición" and "Siguiente pregunta".
- **Secondary (linen):** a linen face with indigo ink and a solid 2px border of indigo at 22%, with no stitch. Use it for "Siguiente cuidado", "Activar aviso", the Verdad and Mito answers before they are judged, and "Cerrar".
- **Ghost:** transparent with ink text and a solid 2px ink border at 40%. It appears on bare linen: the hero's "¿Cuándo consultar?" (hidden below 600px because the bottom nav carries Alarma) and the footer's "Borrar mis datos".
- **Hover / Focus / Active:** see the Lift Rule. Focus uses the global ring: a 4px solid sol outline, a 3px offset and a 7px cielo-hondo halo. Disabled buttons sit at 50% opacity with no lift.
- **Small:** 48px tall, padded 0.4rem 1rem, with 1rem text. The full-width variant stretches to the patch.
- **Quiz answers:** 72px tall with 1.375rem text. After judging, the correct answer turns cordillera and the wrong one naranjo, both in white. The other answers fade to 45%.
- **Listen (Escuchar):** a pill 48px tall with a 2px solid currentColor border, a speaker icon and 700 text. When pressed it turns sol with an indigo border.

### Chips
- **Style:** search suggestions are white pills with a solid 2px border of indigo at 35%, 700 text at 1rem, and raw linen on hover.
- **Pillar ribbon (hero):** the four pillars (Observe, Cuide, Prevenga, Acompañe) are embroidered tape. They are linen pills with the low shadow and a 2.5px ink-thread running stitch, uppercase Londrina at 1.25rem tracked 0.04em, and a 22px icon. They are decorative, not interactive.

### Cards / Containers
- **Patch (the reading card):** linen with the `--trama-clara` weave, hand-cut patch corners, the full shadow, and padding of 22px (30px at 700px and up). An inner running stitch of 3.5px dashes sits 9px in, dyed with the patch's `--hilo` (the patch hue mixed 82% into cielo-hondo). Each patch takes the thread of its subject: turquoise for causes, water and risk, fuchsia for care, map, finger test and checklist, cordillera for the clock and Mi día, lila for quiz and progress, and indigo for the alarm checker. The video frame and the risk result are ordinary linen patches (blue-grey and lagoon threads); there is no dark patch.
- **Band (section fabric):** one cloth wash (`tela-turquesa`, `tela-sol`, `tela-fucsia`, `tela-cordillera`, `tela-lila` or `tela-naranjo`) under the faint `--trama-oscura` weave, with zigzag top and bottom edges and an inset 2.5px dashed seam in the band's own thread at about 40–50%. Text on a band is always ink. Short lists and icon rows can sit directly on band cloth. Longer reading goes on a patch.
- **Inner notices:** results, suggestions and alerts inside a patch are radius 12–16px boxes on a `-claro` tint of the relevant hue, with 700 text at 1.0625–1.125rem. They never carry a stitch.

### Inputs / Fields
- **Option tiles (radio):** raw linen, radius 14px, at least 52px tall, with a 3px transparent border and a custom 22px ring in faded ink. When selected the tile gets a turquoise border, a pale turquoise ground and a filled turquoise dot.
- **Position tiles:** raw linen, at least 60px tall, with a 22px dot in the position's colour. When selected the tile turns white with a 3px solid deep-indigo border and the low shadow.
- **Signal rows (checkbox):** raw linen, 56px tall, with a native 30px checkbox using deep indigo as its accent colour. When checked the row gets a lavender-grey ground and a 3px inset deep-indigo ring.
- **Search field:** raw linen with a 3px solid deep-indigo border, radius 14px, a 56px input and 1.25rem text. Focus puts a 4px sol outline around the whole field.
- **Thread slider:** a 48px hit area and a 12px track graded from healthy skin through red to bruise, with a white dashed thread along its centre. The thumb is a 40px sol disc with a 4px deep-indigo rim.
- **Stepper:** a raw linen tray holding 48px white keys (radius 10px, low shadow, 800 at 1.5rem) around a bold count.
- **Focus on custom inputs:** a 4px sol outline offset 2px on the visible tile or box.

### Navigation
- **Top bar:** sticky, 68px, bar linen, with a 2px dashed ink seam along the bottom. The brand is a 40px mulberry mark with a stitched inner square and a sol heart, plus "CUIDAPIEL" in Londrina 900 at 1.75rem. The brand name hides at narrow widths and large text sizes. The tools (Buscar, Letra, Contraste) are at least 56×52px, with the icon stacked over a caption below 700px and in a row from 700px. A pressed tool turns sol. The desktop links (from 1180px) are 48px tall, 700 at 1rem, in ink. The alarm link is clinical red.
- **Bottom nav (below 900px):** fixed, 76px plus the safe area, bar linen, with a dashed ink seam and a faint upward shadow. It has five equal columns, each with a 26px icon over a 700 label. Alarma is always clinical red, and the current item gets an ink wash at 7%.
- **Care tabs:** at least 60px tall, with hand-cut button corners, translucent white at 55% on the ochre cloth and ink 800 text. A 38px sol disc holds the care's icon. The selected tab turns deep añil with white text, the low shadow and an inner 2px white stitch, the only tab state that is sewn down. A learned care turns its disc cordillera.
- **Segmented control:** a raw linen tray (radius 18px, 6px padding) of 52px options (48px for the interval picker), 800 at 1.0625rem. The selected option is deep añil with white text, and hover is indigo at 8%.

### Semáforo Lights (signature)
The alarm traffic light is a stack of four sewn patches. Each has hand-cut corners, the light weave, a 3px dashed inner stitch inset 8px in its own thread, and a 64px circular bulb holding a 32px icon. The title is Atkinson 800 at 1.375rem and always names the colour, followed by what you see and a white "what to do" box. **Verde** is a sage wash with a sage bulb, a white circle-check icon and a sage title. **Amarillo** is a pale-ochre wash with an ochre bulb, a deep-añil eye icon and an ink title. **Rojo** is a clinical-red wash with a red bulb, a white triangle-alert icon and a red title. **Urgencia** is linen framed by a solid 3px red border plus the red thread, with a red bulb, a hospital icon and a red title, so it reads as the most serious light without a dark surface. The light that applies today scales to 1.02, gains the deep-ochre ring and shows a deep-añil "Esto le corresponde hoy" pill tag.

### Do / Avoid Lists
Inside a care panel, the "Haga" and "Evite" lists open with a verb label (800 at 1.125rem, uppercase, tracked 0.04em) in cordillera or alarma that carries its check or cross icon. Each item has a 28px icon disc (meadow wash with a green check, or blush with a red cross, stroke 3) in a 30px column.

### Cross-Stitch Checklist (signature)
The daily checks are linen rows (radius 14px) with a 44px white box (radius 10px, solid 3px indigo border at 45%). Checking a row stitches an X in fuchsia: the two 4.5px strokes draw in sequence (260ms, with the second delayed 160ms) and the box border turns fuchsia. Completing all five shows a meadow-wash "revisión completa" notice with a sewn star medallion.

### Thread Clock (signature)
The 24-hour dial is a pale linen face with a dashed outer ring, hour dots (larger at 0, 6, 12 and 18) and a lavender night arc from 22:00 to 07:00. Each period in a position is drawn as a 12px arc of coloured thread (supine is sol, right side turquesa, left side fucsia, seated lila) with a white running stitch along it. A knot (8.5px with a 3px white rim) marks each change. The next change is a dashed white circle, and the current time is an indigo hand with a sol hub. A newly logged arc sews itself in over 900ms and its knot pops in after 600ms.

### Progress Chart
This is a column chart of quiz scores. The columns are lila bars (at most 24px wide, rounded 4px at the top) with a white dashed thread down the centre, value labels in 800 at 0.9375rem with tabular figures, and dates beneath. The gridlines are hairline indigo-grey with a darker baseline. Hover or focus tints the column lila at 8%, deepens the bar and shows a deep-sky pill tooltip. A data table is always available under a disclosure.

### Embroidered Badges
The badges are rows on the heather cloth (white at 55%, a solid 2px heather border at 22%, radius 18px). Each holds a 76px circular badge in a patch hue with a dashed inner ring and a simple appliqué motif. Unearned badges are greyscale at 45% opacity. Earned badges get a linen ground and an ochre border. A newly earned badge spins in with the 900ms `bordado` keyframe.

### Toast
The toast is a deep-añil slip with hand-cut button corners, white 700 text and the full shadow. It rises 24px into place over 320ms, above the bottom nav on phones.

## Do's and Don'ts

### Do:
- **Do** set every page on raw linen (`--fondo`) and put any reading longer than a short list on a linen patch with the `--trama-clara` weave.
- **Do** give every patch its own thread: `--hilo: color-mix(in srgb, <patch hue> 82%, var(--cielo-hondo))`, 3.5px dashed, inset 9px.
- **Do** keep every touch target at 48px or more: 56px buttons, 48px small buttons and listen pills, 60px tabs and position tiles, and 52px option tiles and segments.
- **Do** pair every status colour with an icon and words, as the semáforo, the Haga/Evite lists and judged quiz answers do.
- **Do** use the one focus ring everywhere: a 4px ochre outline, a 3px offset and a 7px deep-añil halo (4px ochre, 2px offset on custom tiles). On linen the añil halo is what carries the 3:1 contrast, so never drop it.
- **Do** set sizes in rem and colours through `:root` tokens, so the Letra sizes (112.5% and 125%) and `html[data-contraste="alto"]` reach every new component.
- **Do** draw icons from the Lucide stroke sprite at stroke 2.1 with round caps and joins, sized 1.5em (1.15em in buttons), and coloured by currentColor.
- **Do** animate on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`), keep control transitions at 160–180ms, and let `prefers-reduced-motion` collapse everything to 1ms.

### Don't:
- **Don't** build the white clinical health app: a white page of identical cards with a teal accent.
- **Don't** put a running stitch on an idle secondary button, checkbox, radio or position tile, chip, input or tile. Those keep solid edges.
- **Don't** set Londrina Solid in lowercase, in buttons, in form labels or in paragraphs.
- **Don't** use grey. Borders are ink at 22–45% alpha or a fabric thread, and shadows are tinted with ink. Never use black shadows or hard offset shadows.
- **Don't** spend alarma red on anything but clinical warning. Quiz mistakes are terracotta.
- **Don't** paint a large surface in a full-strength thread or in añil. Large surfaces take a `tela-*` cloth or linen.
- **Don't** let a band run to the viewport edge or touch the next band.
- **Don't** add a small uppercase label above a headline. A section head is its headline, one sentence and the Escuchar button.
