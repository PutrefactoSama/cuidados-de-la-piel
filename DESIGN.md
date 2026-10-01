---
name: CuidaPiel
description: A pressure-injury prevention guide for Chilean patients and families, sewn as a Chilean arpillera, a stitched textile tableau under an indigo night sky.
colors:
  cielo: "#1f2a6e"
  cielo-hondo: "#141b4d"
  cielo-claro: "#3a4aa6"
  noche: "#0e1440"
  sol: "#f4b400"
  sol-claro: "#ffe08a"
  turquesa: "#0b6e75"
  turquesa-claro: "#8fe0d8"
  fucsia: "#a3195b"
  fucsia-claro: "#f8b4d4"
  cordillera: "#2b6e3a"
  cordillera-claro: "#b4e6a8"
  lila: "#5a3a93"
  lila-claro: "#d4c4f2"
  naranjo: "#c4501a"
  naranjo-claro: "#ffc6a3"
  alarma: "#b3261e"
  alarma-claro: "#ffd3cf"
  lienzo: "#fcfaf5"
  lienzo-2: "#f1eee6"
  tinta: "#141b4d"
  tinta-suave: "#3b4270"
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
    textColor: "#ffffff"
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
  patch-dark:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
    rounded: "{rounded.patch}"
    padding: "{spacing.patch}"
  band:
    backgroundColor: "{colors.turquesa}"
    textColor: "#ffffff"
    padding: "56px 20px 64px"
  band-sol:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.cielo-hondo}"
  luz-verde:
    backgroundColor: "{colors.cordillera}"
    textColor: "#ffffff"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-amarillo:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.cielo-hondo}"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-rojo:
    backgroundColor: "{colors.alarma}"
    textColor: "#ffffff"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-urgencia:
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.patch}"
    padding: "22px"
  luz-bulbo:
    backgroundColor: "#ffffff"
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
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "#ffffff"
    rounded: "{rounded.tray}"
    padding: "10px 12px"
  topbar:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
    height: "68px"
  bottomnav:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
    height: "76px"
  toast:
    backgroundColor: "{colors.cielo-hondo}"
    textColor: "#ffffff"
    rounded: "{rounded.btn}"
    padding: "14px 18px"
---

# Design System: CuidaPiel

## Overview

**Creative North Star: "The Night-Sky Arpillera"**

CuidaPiel is sewn, not printed. It takes the form of a Chilean arpillera: scraps of saturated cloth stitched onto a sack-cloth ground to tell a story. Here the ground is a deep indigo night sky with a stitched cordillera, little houses and a sun. Each section of the guide is a band of coloured fabric cut with pinking shears and sewn onto that sky with a running stitch. The reading happens on linen patches stitched onto the bands. Every daily action the family logs becomes another stitch: an arc of thread on the clock, a cross stitch on the checklist, an embroidered badge.

The system is built for older patients and carers with low vision, tremor and little digital experience, so the textile world never costs legibility. Body text is a large hyperlegible humanist sans on linen at about 15:1 contrast. Controls are fat and easy to hit, with 48px as the minimum and 56px for standard buttons. Every alarm carries an icon and words, never colour alone. The density is generous: one idea per patch and one decision per control. The display letters are blocky caps that look cut from felt and appliquéd on, which gives the page a handmade voice. The prose stays plain and calm. The system explicitly rejects the white clinical health app with its row of identical white cards and a teal accent.

Depth is cloth lying on cloth: sky, then band, then patch, with short, soft shadows tinted indigo. Motion means sewing. A new clock arc draws itself like a stitch pulled through, a knot pops in, and a new badge spins into place as if embroidered. All motion collapses when `prefers-reduced-motion` is set.

**Key Characteristics:**
- Deep indigo sky as the permanent ground, with no white pages.
- Saturated fabric bands with zigzag pinked edges and an inset running-stitch seam.
- Linen reading patches with hand-cut asymmetric corners and a dashed thread dyed to match the patch.
- Londrina Solid uppercase display over Atkinson Hyperlegible Next body at 19px.
- A sun-yellow primary action, with a stitch earned only by primary actions and sewn-down surfaces.
- Clinical colour always paired with an icon and text, plus high-contrast and three text-size modes built in.

## Colors

The palette works like a bag of arpillera scraps: one deep indigo ground cloth, one sun yellow for action, five saturated patch fabrics, a clinical red, and warm linen for reading.

### Primary
- **Arpillera Night Indigo** (cielo): the ground of the whole page and of the hero sky. It is also the sky-coloured button and the default thread for neutral patches. White text on it reaches 13:1.
- **Deep Sky Indigo** (cielo-hondo): the top bar, bottom nav, selected tabs and segments, toast, dark patches (video frame, risk result), the clock hand, and the halo around the focus ring. It is the ink colour wherever text sits on sol yellow.
- **Dusk Indigo** (cielo-claro): limited to the scrollbar thumb on the deep-sky track.
- **Midnight** (noche): the footer cloth, the pillar ribbon ground (at 72%) and the search dialog backdrop (at 72%).

### Secondary
- **Arpillera Sun** (sol): the action colour. It fills primary buttons, the focus outline, pressed toolbar toggles, the pressed listen button, numbered step discs, the care-tab icon disc, the slider thumb and text selection. It is also one band fabric (Seis cuidados) and the amarillo light. Ink on sol is always cielo-hondo (8.8:1).
- **Pale Sun** (sol-claro): the "due now" state of the Mi día patch, the earned-badge border, the alarm link in the desktop nav, and the highlighted words in the carer headline.

### Tertiary
These are the patch fabrics. Each is a band ground carrying white text (6:1 or better), and each has a pale `-claro` tint for in-patch feedback grounds.
- **Lagoon Turquoise** (turquesa) / **Sea Glass** (turquesa-claro): the cause and risk bands. Turquoise also fills the selected risk option and the right-side position. Sea glass marks bullet icons and footer links on dark cloth.
- **Arpillera Fuchsia** (fucsia) / **Rose Wash** (fucsia-claro): the skin-check and carer bands, the brand mark, the cross-stitch X and the left-side position. Rose wash is the ground for pressure-point info.
- **Cordillera Green** (cordillera) / **Meadow Wash** (cordillera-claro): the Mi día band, the verde light, learned tabs, correct answers and the "Haga" list. Meadow wash is the ground for a good result.
- **Violet Hill** (lila) / **Lavender Wash** (lila-claro): the quiz band, progress chart bars, the seated position and the night arc on the clock. Lavender wash is the ground for quiz feedback.
- **Copper Orange** (naranjo) / **Apricot Wash** (naranjo-claro): wrong quiz answers and the "high" step of the risk scale, and nothing else.
- **Healthy Skin** (piel-sana): skin tone in the pressure diagrams. It starts the slider track that runs from healthy skin to red to bruise.

### Neutral
- **Linen** (lienzo): every reading patch, the secondary button face, and the ground of the urgencia light. It is always overlaid with the faint `--trama-clara` weave.
- **Raw Linen** (lienzo-2): the inset ground for controls inside a patch, including option tiles, checklist rows, segmented trays, steppers, the search field and result boxes.
- **Indigo Ink** (tinta): all text on linen (15.6:1).
- **Faded Ink** (tinta-suave): secondary text, dates, notes and axis labels (9:1 on linen).
- **White Thread** (hilo-blanco): the running stitch on dark or saturated cloth, ring borders on dark grounds, and the inner stitch of sky buttons.

**Accessibility modes.** `html[data-contraste="alto"]` redefines the tokens instead of restyling components. Sky and patch hues become `#000`, sol becomes `#ffe500`, raw linen becomes `#fff`, ink becomes `#000`, and patches and lights gain a 3px black border with a 3px white outline. A new component inherits this mode only if it is coloured through tokens.

### Named Rules
**The Sky Ground Rule.** The page is never white. Cielo is the ground under everything, and linen appears only as a sewn patch with its stitched edge.

**The Dyed Thread Rule.** Stitches are never grey. On dark or saturated cloth the thread is white (hilo-blanco). On linen it is the patch's hue mixed into deep indigo: `color-mix(in srgb, <hue> 82%, var(--cielo-hondo))`.

**The Sun Means Act Rule.** Sol yellow marks what to do now: primary buttons, the focus ring, pressed toggles and numbered steps. On a sol surface the ink is always cielo-hondo.

**The Red Is Clinical Rule.** Alarma red is spent only on clinical warning: pressure points, "Evite", the rojo light, a position change that is overdue, and the urgencia thread. A wrong quiz answer is naranjo, never alarma.

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

The layout is mobile-first and stacks in a single column, with two-column splits from 960px (hero, causes, care tour) and 1000px (Mi día, quiz, semáforo, skin check). Content sits in a 1200px wrap with a 16px gutter (32px at 700px and up). Sections alternate between fabric bands and stretches of bare sky. Bands are inset from the viewport edges by 6px (20px at 700px and up), capped at 1360px, separated by 44px of visible sky, and padded 56px top and 64px bottom (96px and 104px at 900px and up). Sky sections without a band are padded 40/48px (64/72px at 900px and up).

Each section opens with a section head made of three parts: the headline, one sentence of intro, and the Escuchar button. At 900px and up the button moves to the top-right column. Inside a section the stack gap is 22px, list rows sit 8–12px apart, and patches are padded 22px (30px at 700px and up).

The top bar is sticky at 68px. Below 900px a fixed 76px bottom nav carries five destinations, with Alarma always last and always in sol. The page's scroll padding clears both bars. The full desktop nav appears only from 1180px. On phones the care tabs become a horizontal scroll-snap strip. At 960px and up they become a sticky 300px column beside the panel.

Print collapses everything to black on white. Bands, zigzags, stitches and interactive tools are dropped, and every care panel is printed. "Imprimir mi día" prints only the day summary and the semáforo.

### Named Rules
**The Inset Band Rule.** A band never touches the viewport edge and never butts against the next band. The sky must always show around it.

## Elevation & Depth

Depth is built from layered fabric: the sky ground, the band sewn onto it, and the linen patch sewn onto the band. Each layer adds a short, soft shadow tinted with indigo `rgba(10, 14, 50, …)`, as if the cloth were lifting slightly off the cloth below. Resting controls use the low shadow. Patches, lights and hovered buttons use the full one. Selection is shown by colour fill and a stitch, never by a bigger shadow, with one exception: the active semáforo light gains a 5px sol ring and a deeper drop.

### Shadow Vocabulary
- **Sombra baja** (`0 4px 10px -4px rgba(10, 14, 50, 0.45), 0 1px 2px rgba(10, 14, 50, 0.2)`): resting buttons, the selected care tab, the selected position tile, stepper keys, the slider thumb and the chart tooltip.
- **Sombra** (`0 10px 22px -10px rgba(10, 14, 50, 0.55), 0 2px 5px rgba(10, 14, 50, 0.22)`): patches, semáforo lights, the toast and button hover.
- **Band drop** (`0 18px 30px -18px rgba(5, 8, 30, 0.7)`): under each fabric band only.
- **Dialog drop** (`0 30px 60px -20px rgba(5, 8, 30, 0.7)`): the search dialog over a midnight backdrop at 72%.
- **Active light** (`0 0 0 5px var(--sol), 0 22px 34px -16px rgba(5, 8, 30, 0.8)`): the semáforo light that applies today.

### Named Rules
**The Cloth-on-Cloth Rule.** Shadows are short, soft and indigo-tinted. Never use black, never use a hard offset, and never use a glow.

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
- **Ghost:** transparent with white text and a solid 2.5px white border at 85%. It only appears on dark cloth: the hero's "¿Cuándo consultar?" (hidden below 600px because the bottom nav carries Alarma) and the footer's "Borrar mis datos".
- **Hover / Focus / Active:** see the Lift Rule. Focus uses the global ring: a 4px solid sol outline, a 3px offset and a 7px cielo-hondo halo. Disabled buttons sit at 50% opacity with no lift.
- **Small:** 48px tall, padded 0.4rem 1rem, with 1rem text. The full-width variant stretches to the patch.
- **Quiz answers:** 72px tall with 1.375rem text. After judging, the correct answer turns cordillera and the wrong one naranjo, both in white. The other answers fade to 45%.
- **Listen (Escuchar):** a pill 48px tall with a 2px solid currentColor border, a speaker icon and 700 text. When pressed it turns sol with an indigo border.

### Chips
- **Style:** search suggestions are white pills with a solid 2px border of indigo at 35%, 700 text at 1rem, and raw linen on hover.
- **Pillar ribbon (hero):** the four pillars (Observe, Cuide, Prevenga, Acompañe) are embroidered tape. They are midnight pills at 72% with a 3px white running stitch, uppercase Londrina at 1.25rem tracked 0.04em, and a 22px icon. They are decorative, not interactive.

### Cards / Containers
- **Patch (the reading card):** linen with the `--trama-clara` weave, hand-cut patch corners, the full shadow, and padding of 22px (30px at 700px and up). An inner running stitch of 3.5px dashes sits 9px in, dyed with the patch's `--hilo` (the patch hue mixed 82% into cielo-hondo). Each patch takes the thread of its subject: turquoise for causes, water and risk, fuchsia for care, map, finger test and checklist, cordillera for the clock and Mi día, lila for quiz and progress, and indigo for the alarm checker. **Dark patch:** a cielo-hondo face with white text and thread at 50%, used for the video frame and the risk result.
- **Band (section fabric):** one saturated hue (turquesa, sol, fucsia, cordillera or lila) under the faint `--trama-oscura` weave, with zigzag top and bottom edges and an inset 3px dashed white-thread seam (indigo at 50% on the sol band). Text on a band is white, or ink on sol. Short lists and icon rows can sit directly on band cloth. Longer reading goes on a patch.
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
- **Top bar:** sticky, 68px, deep sky, with a 2px dashed white seam at 28% along the bottom. The brand is a 40px fuchsia mark with a stitched inner square and a sol heart, plus "CUIDAPIEL" in Londrina 900 at 1.75rem. The brand name hides at narrow widths and large text sizes. The tools (Buscar, Letra, Contraste) are at least 56×52px, with the icon stacked over a caption below 700px and in a row from 700px. A pressed tool turns sol. The desktop links (from 1180px) are 48px tall, 700 at 1rem, and white at 90%. The alarm link is pale sun.
- **Bottom nav (below 900px):** fixed, 76px plus the safe area, deep sky, with a dashed seam on top. It has five equal columns, each with a 26px icon over a 700 label. Alarma is always sol, and the current item gets a white wash at 10%.
- **Care tabs:** at least 60px tall, with hand-cut button corners, translucent white at 55% on the sol band and indigo 800 text. A 38px sol disc holds the care's icon. The selected tab turns deep sky with white text, the low shadow and an inner 2px white stitch, the only tab state that is sewn down. A learned care turns its disc cordillera.
- **Segmented control:** a raw linen tray (radius 18px, 6px padding) of 52px options (48px for the interval picker), 800 at 1.0625rem. The selected option is deep sky with white text, and hover is indigo at 8%.

### Semáforo Lights (signature)
The alarm traffic light is a stack of four sewn patches. Each is a hue patch with the dark weave, hand-cut corners, a 3px dashed inner stitch inset 8px, and a 64px circular bulb holding a 32px icon. The title is Atkinson 800 at 1.375rem and always names the colour, followed by what you see and an inset "what to do" box. **Verde** is cordillera with a white bulb and a circle-check icon. **Amarillo** is sol with indigo ink, an indigo bulb and an eye icon. **Rojo** is alarma with a white bulb and a triangle-alert icon. **Urgencia** is linen with an alarma thread, an alarma bulb and a hospital icon. The light that applies today scales to 1.02, gains the sol ring and shows an indigo "Esto le corresponde hoy" pill tag.

### Do / Avoid Lists
Inside a care panel, the "Haga" and "Evite" lists open with a verb label (800 at 1.125rem, uppercase, tracked 0.04em) in cordillera or alarma that carries its check or cross icon. Each item has a 28px icon disc (meadow wash with a green check, or blush with a red cross, stroke 3) in a 30px column.

### Cross-Stitch Checklist (signature)
The daily checks are linen rows (radius 14px) with a 44px white box (radius 10px, solid 3px indigo border at 45%). Checking a row stitches an X in fuchsia: the two 4.5px strokes draw in sequence (260ms, with the second delayed 160ms) and the box border turns fuchsia. Completing all five shows a meadow-wash "revisión completa" notice with a sewn star medallion.

### Thread Clock (signature)
The 24-hour dial is a pale indigo face with a dashed outer ring, hour dots (larger at 0, 6, 12 and 18) and a lavender night arc from 22:00 to 07:00. Each period in a position is drawn as a 12px arc of coloured thread (supine is sol, right side turquesa, left side fucsia, seated lila) with a white running stitch along it. A knot (8.5px with a 3px white rim) marks each change. The next change is a dashed white circle, and the current time is an indigo hand with a sol hub. A newly logged arc sews itself in over 900ms and its knot pops in after 600ms.

### Progress Chart
This is a column chart of quiz scores. The columns are lila bars (at most 24px wide, rounded 4px at the top) with a white dashed thread down the centre, value labels in 800 at 0.9375rem with tabular figures, and dates beneath. The gridlines are hairline indigo-grey with a darker baseline. Hover or focus tints the column lila at 8%, deepens the bar and shows a deep-sky pill tooltip. A data table is always available under a disclosure.

### Embroidered Badges
The badges are rows on band cloth (white at 10%, a solid 2px white border at 25%, radius 18px). Each holds a 76px circular badge in a patch hue with a dashed inner ring and a simple appliqué motif. Unearned badges are greyscale at 45% opacity. Earned badges get a white ground at 18% and a pale-sun border. A newly earned badge spins in with the 900ms `bordado` keyframe.

### Toast
The toast is a deep-sky slip with hand-cut button corners, white 700 text and the full shadow. It rises 24px into place over 320ms, above the bottom nav on phones.

## Do's and Don'ts

### Do:
- **Do** set every page on the cielo sky and put any reading longer than a short list on a linen patch with the `--trama-clara` weave.
- **Do** give every patch its own thread: `--hilo: color-mix(in srgb, <patch hue> 82%, var(--cielo-hondo))`, 3.5px dashed, inset 9px.
- **Do** keep every touch target at 48px or more: 56px buttons, 48px small buttons and listen pills, 60px tabs and position tiles, and 52px option tiles and segments.
- **Do** pair every status colour with an icon and words, as the semáforo, the Haga/Evite lists and judged quiz answers do.
- **Do** use the one focus ring everywhere: a 4px sol outline, a 3px offset and a 7px cielo-hondo halo (4px sol, 2px offset on custom tiles).
- **Do** set sizes in rem and colours through `:root` tokens, so the Letra sizes (112.5% and 125%) and `html[data-contraste="alto"]` reach every new component.
- **Do** draw icons from the Lucide stroke sprite at stroke 2.1 with round caps and joins, sized 1.5em (1.15em in buttons), and coloured by currentColor.
- **Do** animate on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`), keep control transitions at 160–180ms, and let `prefers-reduced-motion` collapse everything to 1ms.

### Don't:
- **Don't** build the white clinical health app: a white page of identical cards with a teal accent.
- **Don't** put a running stitch on an idle secondary button, checkbox, radio or position tile, chip, input or tile. Those keep solid edges.
- **Don't** set Londrina Solid in lowercase, in buttons, in form labels or in paragraphs.
- **Don't** use grey. Borders are indigo at 22–45% alpha or white thread, and shadows are tinted indigo. Never use black shadows or hard offset shadows.
- **Don't** spend alarma red on anything but clinical warning. Quiz mistakes are naranjo.
- **Don't** let a band run to the viewport edge or touch the next band.
- **Don't** add a small uppercase label above a headline. A section head is its headline, one sentence and the Escuchar button.
