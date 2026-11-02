---
name: CuidaPiel
description: A pressure-injury prevention guide for Chilean patients and families, sewn as a Chilean arpillera in morning light, watercolour-dyed cloth stitched onto ivory linen.
colors:
  fondo: "#f8f4ec"
  cielo-dia: "#e9f0f7"
  barra: "#fcfaf6"
  noche: "#f2ede5"
  tinta: "#2f3649"
  tinta-suave: "#555c6c"
  cielo: "#526094"
  cielo-hondo: "#3c4773"
  cielo-medio: "#939dbe"
  cielo-claro: "#abb8ce"
  seleccion: "#e9edfa"
  sol: "#eac788"
  sol-hondo: "#a27734"
  sol-claro: "#f9eed6"
  turquesa: "#3e706c"
  turquesa-medio: "#689e99"
  turquesa-claro: "#ddf0ed"
  fucsia: "#915365"
  fucsia-medio: "#c07b8e"
  fucsia-claro: "#fae5ea"
  cordillera: "#4e7053"
  cordillera-medio: "#789d7d"
  cordillera-claro: "#e1f0e2"
  lila: "#686191"
  lila-medio: "#918ac0"
  lila-claro: "#eae9f9"
  naranjo: "#99583e"
  naranjo-medio: "#c67d61"
  naranjo-claro: "#fbe6de"
  alarma: "#b3261e"
  alarma-claro: "#fee4e2"
  tela-turquesa: "#e2f1ef"
  tela-sol: "#f8eed9"
  tela-fucsia: "#f8e9ec"
  tela-cordillera: "#e6f1e6"
  tela-lila: "#edebf8"
  tela-naranjo: "#fae9e3"
  tela-cielo: "#e9eef8"
  titulo-turquesa: "#275652"
  titulo-sol: "#674d2c"
  titulo-fucsia: "#71394a"
  titulo-cordillera: "#37563b"
  titulo-lila: "#4d4671"
  titulo-naranjo: "#753a22"
  titulo-cielo: "#3c4773"
  lienzo: "#fefdfa"
  lienzo-2: "#f4f1e9"
  hilo-tinta: "rgba(47, 54, 73, 0.2)"
  hilo-blanco: "rgba(255, 255, 255, 0.72)"
  piel-sana: "#f5b49a"
typography:
  display:
    fontFamily: "Londrina Solid, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 4.4vw, 4.75rem)"
    fontWeight: 400
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
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0.6rem 1.4rem"
    height: "56px"
  button-cielo:
    backgroundColor: "{colors.seleccion}"
    textColor: "{colors.tinta}"
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
    backgroundColor: "{colors.cordillera-claro}"
    textColor: "{colors.titulo-cordillera}"
    height: "72px"
  button-quiz-wrong:
    backgroundColor: "{colors.naranjo-claro}"
    textColor: "{colors.titulo-naranjo}"
    height: "72px"
  listen:
    backgroundColor: "transparent"
    rounded: "{rounded.pill}"
    padding: "0.35rem 1rem 0.35rem 0.8rem"
    height: "48px"
  listen-pressed:
    backgroundColor: "{colors.sol-claro}"
    textColor: "{colors.tinta}"
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
    backgroundColor: "{colors.lienzo}"
    rounded: "{rounded.pill}"
    size: "64px"
  cuidado-tab:
    backgroundColor: "rgba(255, 255, 255, 0.6)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.btn}"
    padding: "10px 16px 10px 12px"
    height: "60px"
  cuidado-tab-selected:
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
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
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
  option-tile:
    backgroundColor: "{colors.lienzo-2}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
    height: "52px"
  option-tile-selected:
    backgroundColor: "{colors.turquesa-claro}"
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
    backgroundColor: "{colors.lienzo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.btn}"
    padding: "14px 18px"
---

# Design System: CuidaPiel

## Overview

**Creative North Star: "The Morning Arpillera"**

CuidaPiel is sewn, not printed. It takes the form of a Chilean arpillera: scraps of cloth stitched onto a sack-cloth ground to tell a story. Here the ground is ivory linen in morning light, with a pale sky over a stitched cordillera, little houses and a sun. The cloth is dyed like watercolour rather than saturated, and nothing on the page is a dark surface, because the people who use it spend long hours beside a bed and a loud, dark page tires them. Colour is spent tone on tone: each band writes its headline in a deeper ink of its own fabric. Each section of the guide is a band of washed fabric cut with pinking shears and sewn onto the linen with a running stitch. The reading happens on linen patches stitched onto the bands. Every daily action the family logs becomes another stitch: an arc of thread on the clock, a cross stitch on the checklist, an embroidered badge.

The system is built for older patients and carers with low vision, tremor and little digital experience, so the textile world never costs legibility. Body text is a large hyperlegible humanist sans in graphite ink on linen at about 11:1 contrast. Controls are fat and easy to hit, with 48px as the minimum and 56px for standard buttons. Every alarm carries an icon and words, never colour alone. The density is generous: one idea per patch and one decision per control. The display letters are blocky caps that look cut from felt and appliquéd on, which gives the page a handmade voice. The prose stays plain and calm. The system explicitly rejects the white clinical health app with its row of identical white cards and a teal accent.

Depth is cloth lying on cloth: linen ground, then band, then patch, with short, faint shadows tinted with ink. Motion means sewing. A new clock arc draws itself like a stitch pulled through, a knot pops in, and a new badge spins into place as if embroidered. All motion collapses when `prefers-reduced-motion` is set.

**Key Characteristics:**
- Ivory linen as the permanent ground, with a pale morning sky in the hero and no dark pages, bars or selected states.
- Watercolour fabric bands with zigzag pinked edges, a fine running-stitch seam in the mid thread, and the headline in the band's own deep ink.
- Linen reading patches with hand-cut asymmetric corners and a dashed thread dyed to match the patch.
- Londrina Solid uppercase display over Atkinson Hyperlegible Next body at 19px.
- A honey primary action, with a stitch earned only by primary actions and sewn-down surfaces; selection is a raised linen face with an añil or honey edge, never a dark fill.
- Clinical colour always paired with an icon and text, plus high-contrast and three text-size modes built in.

## Colors

The palette works like a bag of arpillera scraps left out in the morning sun: an ivory linen ground, graphite ink for reading, one honey for action, a soft añil for focus and selection, watercolour washes of five fabrics for the bands, a mid thread of each fabric for stitches and fills, a deep thread for icons and text, and a clinical red that never fades. No surface larger than a small control is dark.

### Ground and ink
- **Ivory Linen** (fondo): the ground of the whole page. Body text sits on it in tinta at 11:1.
- **Morning Sky** (cielo-dia): the top of the hero only, fading into ivory linen behind the stitched cordillera.
- **Bar Linen** (barra): the top bar and the bottom nav, a shade lighter than the ground, with a dashed ink seam.
- **Toasted Linen** (noche): the footer cloth and its pinked edge.
- **Graphite Ink** (tinta): all text on linen and on band washes (10–12:1). It is a softened indigo graphite, not navy, so large blocks of type do not weigh on the page.
- **Faded Ink** (tinta-suave): secondary text, dates, notes and axis labels (5.6:1 or better on every wash).

### Añil (focus and selection)
- **Soft Añil** (cielo): the focus ring, the edge of a selected segment, position tile, option or signal row, the checkbox accent, the slider thumb rim and the search field border. It reaches 5:1 or better on every light surface, so a 3px ring meets the focus-appearance contrast on its own.
- **Selection Wash** (seleccion): the face of the añil button ("Ya cambié de posición", "Siguiente pregunta"), checked signal rows and hovered search results.
- **Deep Añil** (cielo-hondo / titulo-cielo): ink on the añil cloth only. It is never a fill.
- **Mid Añil** (cielo-medio) and **Blue-Grey** (cielo-claro): the alarm-checker stitch, the video frame thread and the scrollbar thumb.

### Action
- **Honey** (sol): primary buttons, the selected care tab's disc, the "Esto le corresponde hoy" tag and text selection. Ink on honey is tinta (7.5:1). Honey is never a text colour.
- **Deep Honey** (sol-hondo): the edge and stitch of primary buttons, the selected care tab's border, the ring of the semáforo light that applies today, the amarillo bulb icon, pressed toggles and the star of a complete day, where honey alone would fall under 3:1.
- **Pale Honey** (sol-claro): the amarillo light, pressed toolbar and listen toggles, the "time to change" notice, the video key discs and the "due now" state of the Mi día patch.

### Fabrics
Each fabric has five strengths. The **thread** (turquesa, fucsia, cordillera, lila, naranjo) is deep enough for text and icons on linen and on every wash (4.5:1 or better). The **title** ink (`titulo-*`) writes the headline of its band (6.8:1 or better). The **mid thread** (`-medio`) dyes stitches, progress bars, chart columns, clock arcs and diagram fills. The **wash** (`-claro`) grounds in-patch feedback and judged answers. The **cloth** (`tela-*`) is the band ground, always under ink.
- **Lagoon** (turquesa): the cause and risk bands, the water patch, the selected risk option, the right-side position and links in the footer.
- **Mulberry** (fucsia): the skin-check and carer bands, the brand mark, the cross-stitch X, the left-side position and the highlighted words in the carer headline.
- **Sage** (cordillera): the Mi día band, the verde light, learned tabs, the care progress bar, correct answers and the "Haga" list.
- **Heather** (lila): the quiz band, progress chart bars, the seated position and the night arc on the clock.
- **Terracotta** (naranjo): the hospital-challenges band and its step discs, wrong quiz answers and the "high" step of the risk scale.
- **Healthy Skin** (piel-sana): skin tone in the pressure diagrams and the start of the slider track.

### Diagrams
The cross-section, body figures and cordillera use pale versions of the same fabrics, so the clinical marks on top stand out: dusty-rose muscle, butter fat, peach skin and a pale añil mattress, all labelled in tinta; figures in mid lagoon and heather; a light-wood chair. Blood vessels stay red and tissue damage stays maroon and plum, because they carry clinical meaning. The finger-test skins and the skin samples in the challenges keep realistic erythema.

### Clinical
- **Clinical Red** (alarma / alarma-claro): pressure points, "Evite", the rojo and urgencia lights and their solid bulbs, an overdue position change, the urgent result frame and the Alarma link in both navs. It keeps its full strength: it is the one colour on the page that is allowed to be loud, and the calm of everything else is what makes it read.

### Neutral
- **Linen** (lienzo): every reading patch, the secondary button face, selected tabs, segments and tiles, the toast, the chart tooltip, the verde and amarillo bulbs and earned badges, always under the faint `--trama-clara` weave where it is a patch.
- **Linen Inset** (lienzo-2): the inset ground for controls inside a patch and the video letterbox.
- **Ink Thread** (hilo-tinta): seams under the top bar, above the bottom nav, around the footer notice, the toast edge and the pillar tape.
- **White Thread** (hilo-blanco): the running stitch on the red bulb and on mid-thread fills (clock arcs, chart columns).

**Accessibility modes.** `html[data-contraste="alto"]` redefines the tokens instead of restyling components, and it keeps its own black world on purpose: the ground, bars, bands and añil become `#000`, text on them becomes `#fff`, band titles become `#fff`, honey and the selection wash become `#ffe500`, linen inset becomes `#fff`, and patches and lights gain a 3px black border with a 3px white outline. Focus returns to a 4px `#ffe500` ring with a 7px black halo, and selected segments turn `#ffe500`. Alarm links, footer links and the carer highlight turn `#ffe500`. A new component inherits this mode only if it is coloured through tokens (`--fondo-fg`, `--barra-fg`, `--band-fg`, `--band-titulo`, `--seleccion`, `--foco`).

### Named Rules
**The Linen Ground Rule.** The page is never dark and never pure white. Ivory linen is the ground under everything; reading happens on a lighter linen patch with its stitched edge.

**The No Dark Surface Rule.** Nothing larger than a 64px bulb or a small marker is filled with a deep tone. Selection is a raised linen face with a 2px añil or deep-honey edge; feedback is a wash with a mid-thread border. Only clinical red may fill a bulb, a pressure point or the alarm button.

**The Quiet Cloth Rule.** Band grounds are watercolour washes, never full-strength fabric. Full strength is spent on threads: icons, small marks and text. If a surface larger than a control needs colour, use its `tela-*` cloth or `-claro` wash.

**The Tone on Tone Rule.** A band writes its headline, and the display sub-headings sewn directly on it, in its own `titulo-*` ink through `--band-titulo`. Body text stays graphite. Bare linen sections keep graphite headlines.

**The Dyed Thread Rule.** Stitches are never grey and never dark. On patches the 2px thread is the subject's mid thread (`--hilo: var(--<hue>-medio)`); on bands the seam is the mid thread at about 55%. On the red bulb the thread is white.

**The Honey Means Act Rule.** Honey marks what to do now: primary buttons, the selected tab's disc and today's light. On a honey surface the ink is always tinta.

**The Red Is Clinical Rule.** Alarma red is spent only on clinical warning. A wrong quiz answer is terracotta, never alarma.

**The Never Color Alone Rule.** Every status colour travels with an icon and words. The semáforo lights carry a bulb icon and a "Verde / Amarillo / Rojo / Urgencia" title, the Haga and Evite lists carry a check or a cross, and the risk scale carries labels.

## Typography

**Display Font:** Londrina Solid (400 for every headline, 900 only for the brand name; self-hosted), falling back to Atkinson Hyperlegible Next and system-ui
**Body Font:** Atkinson Hyperlegible Next (400, 700 and 800, self-hosted), falling back to system-ui, -apple-system, Segoe UI and Roboto

**Character:** Londrina Solid is a blocky, slightly uneven caps face that reads like felt letters cut and appliquéd onto cloth. It has the warmth of a handmade tableau and only shouts in uppercase. Atkinson Hyperlegible Next was drawn for low-vision readers, with distinct letterforms, open counters and sturdy weights. The pairing is handmade on top and clinical-clear underneath.

### Hierarchy
- **Display** (Londrina 400, clamp(2.6rem → 4.75rem), lh 0.94, uppercase): the hero headline only, max 12ch. Below 600px it locks to 2.45rem. The carer headline uses the same caps at clamp(2.4rem → 4rem). The 900 weight is kept for the brand name only, so no headline becomes a block of dark ink.
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

Depth is built from layered fabric: the linen ground, the band sewn onto it, and the lighter linen patch sewn onto the band. Each layer adds a short, faint shadow tinted with graphite ink `rgba(47, 54, 73, …)`, as if the cloth were lifting slightly off the cloth below. On a light page these shadows stay low (0.3 alpha or less, with a long negative spread) so the cloth reads as soft rather than heavy. Resting controls use the low shadow. Patches, lights and hovered buttons use the full one. Selection is shown by a raised linen face and a coloured edge, never by a dark fill or a bigger shadow, with one exception: the active semáforo light gains a 3px deep-honey ring and a slightly deeper drop.

### Shadow Vocabulary
- **Sombra baja** (`0 6px 14px -10px rgba(47, 54, 73, 0.3), 0 1px 2px rgba(47, 54, 73, 0.06)`): resting buttons, the selected care tab, the selected position tile, stepper keys, the slider thumb and the chart tooltip.
- **Sombra** (`0 14px 30px -20px rgba(47, 54, 73, 0.28), 0 1px 3px rgba(47, 54, 73, 0.06)`): patches, semáforo lights, the toast and button hover.
- **Band drop** (`0 16px 28px -26px rgba(47, 54, 73, 0.22)`): under each fabric band only.
- **Dialog drop** (`0 30px 60px -24px rgba(47, 54, 73, 0.45)`): the search dialog over an ink backdrop at 35%.
- **Active light** (`0 0 0 3px var(--sol-hondo), 0 18px 30px -20px rgba(47, 54, 73, 0.3)`): the semáforo light that applies today.

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
- **Primary (sol):** a honey face with graphite ink, a 2px deep-honey edge at 40% and an inner running stitch inset 5px, drawn in 2px dashes of deep honey at 55%. Use one per decision: "Empezar el recorrido", "Lo aprendí", "Registrar cambio", "Jugar otra vez" and "Imprimir mi día".
- **Añil (cielo):** a pale selection-wash face with graphite ink, a 2px añil edge at 38% and an añil inner stitch at 42%. It is the primary action on linen when the moment is a quick log or a step forward rather than a commitment, for example "Ya cambié de posición", "Siguiente pregunta" and the learned state "Aprendido".
- **Secondary (linen):** a linen face with graphite ink and a solid 2px border of ink at 18%, with no stitch. Use it for "Siguiente cuidado", "Activar aviso", the Verdad and Mito answers before they are judged, and "Cerrar".
- **Ghost:** transparent with ink text and a solid 2px ink border at 32%. It appears on bare linen: the hero's "¿Cuándo consultar?" (hidden below 600px because the bottom nav carries Alarma) and the footer's "Borrar mis datos".
- **Hover / Focus / Active:** see the Lift Rule. Focus uses the global ring: a 3px solid añil outline (`--foco`) at a 3px offset, with no halo. Disabled buttons sit at 50% opacity with no lift.
- **Small:** 48px tall, padded 0.4rem 1rem, with 1rem text. The full-width variant stretches to the patch.
- **Quiz answers:** 72px tall with 1.375rem text. After judging, the correct answer turns to a sage wash with a mid-sage edge and sage ink, and the wrong one to a terracotta wash with a mid-terracotta edge and terracotta ink. The other answers fade to 45%.
- **Listen (Escuchar):** a pill 48px tall with a 2px border of currentColor at 34%, a speaker icon and 700 text. When pressed it turns pale honey with a deep-honey border.

### Chips
- **Style:** search suggestions are white pills with a solid 2px border of ink at 35%, 700 text at 1rem, and raw linen on hover.
- **Pillar ribbon (hero):** the four pillars (Observe, Cuide, Prevenga, Acompañe) are embroidered tape. They are linen pills with the low shadow and a 2px ink-thread running stitch, uppercase Londrina at 1.25rem tracked 0.04em, and a 22px icon. They are decorative, not interactive.

### Cards / Containers
- **Patch (the reading card):** linen with the `--trama-clara` weave, hand-cut patch corners, the full shadow, and padding of 22px (30px at 700px and up). An inner running stitch of 2px dashes sits 9px in, dyed with the patch's `--hilo` (the mid thread of its subject). Each patch takes the thread of its subject: lagoon for causes, water and risk, mulberry for care, map, finger test and checklist, sage for the clock and Mi día, heather for quiz and progress, and mid añil for the alarm checker. The video frame and the risk result are ordinary linen patches (blue-grey and lagoon threads); there is no dark patch.
- **Band (section fabric):** one cloth wash (`tela-turquesa`, `tela-sol`, `tela-fucsia`, `tela-cordillera`, `tela-lila` or `tela-naranjo`) under the faint `--trama-oscura` weave, with zigzag top and bottom edges and an inset 2px dashed seam in the band's mid thread at about 55%. The headline is set in the band's `titulo-*` ink; body text on a band is always graphite. Short lists and icon rows can sit directly on band cloth. Longer reading goes on a patch.
- **Inner notices:** results, suggestions and alerts inside a patch are radius 12–16px boxes on a `-claro` tint of the relevant hue, with 700 text at 1.0625–1.125rem. They never carry a stitch.

### Inputs / Fields
- **Option tiles (radio):** raw linen, radius 14px, at least 52px tall, with a 3px transparent border and a custom 22px ring in faded ink. When selected the tile gets a turquoise border, a pale turquoise ground and a filled turquoise dot.
- **Position tiles:** raw linen, at least 60px tall, with a 22px dot in the position's colour. When selected the tile turns linen with a 3px solid añil border and the low shadow.
- **Signal rows (checkbox):** raw linen, 56px tall, with a native 30px checkbox using añil as its accent colour. When checked the row gets the selection wash and a 2px inset añil ring.
- **Search field:** linen inset with a 2.5px solid añil border, radius 14px, a 56px input and 1.25rem text. Focus puts the 3px añil ring around the whole field.
- **Thread slider:** a 48px hit area and a 12px track graded from healthy skin through red to bruise, with a white dashed thread along its centre. The track runs from healthy skin through a soft red to a muted plum. The thumb is a 40px linen disc with a 4px añil rim.
- **Stepper:** a raw linen tray holding 48px white keys (radius 10px, low shadow, 800 at 1.5rem) around a bold count.
- **Focus on custom inputs:** the 3px añil ring offset 2px on the visible tile or box.

### Navigation
- **Top bar:** sticky, 68px, bar linen, with a 2px dashed ink seam along the bottom. The brand is a 40px mulberry mark with a stitched inner square and a sol heart, plus "CUIDAPIEL" in Londrina 900 at 1.75rem. The brand name hides at narrow widths and large text sizes. The tools (Buscar, Letra, Contraste) are at least 56×52px, with the icon stacked over a caption below 700px and in a row from 700px. A pressed tool turns pale honey with a 2px deep-honey edge. The desktop links (from 1180px) are 48px tall, 700 at 1rem, in ink. The alarm link is clinical red.
- **Bottom nav (below 900px):** fixed, 76px plus the safe area, bar linen, with a dashed ink seam and a faint upward shadow. It has five equal columns, each with a 26px icon over a 700 label. Alarma is always clinical red, and the current item gets an ink wash at 7%.
- **Care tabs:** at least 60px tall, with hand-cut button corners, translucent white at 60% with a hairline ink edge on the honey cloth, and graphite 800 text. A 38px linen disc with a deep-honey edge holds the care's icon in honey ink. The selected tab turns opaque linen with a 2px deep-honey edge, the low shadow, an inner deep-honey stitch and a honey disc, the only tab state that is sewn down. A learned care turns its disc to a sage wash with a sage icon.
- **Segmented control:** a raw linen tray (radius 18px, 6px padding) of 52px options (48px for the interval picker), 800 at 1.0625rem. The selected option rises as a linen chip with a 2px añil edge, graphite text and the low shadow; hover is ink at 8%.

### Semáforo Lights (signature)
The alarm traffic light is a stack of four sewn patches. Each has hand-cut corners, the light weave, a 2px dashed inner stitch inset 8px in its own thread, and a 64px circular bulb holding a 32px icon. The title is Atkinson 800 at 1.375rem and always names the colour, followed by what you see and a white "what to do" box. The calm lights stay calm and the serious ones keep their weight. **Verde** is a sage wash with a linen bulb ringed in mid sage, a sage circle-check icon and a sage title. **Amarillo** is a pale-honey wash with a linen bulb ringed in honey, a deep-honey eye icon and a graphite title. **Rojo** is a clinical-red wash with a solid red bulb, a white triangle-alert icon and a red title. **Urgencia** is linen framed by a solid 3px red border plus the red thread, with a red bulb, a hospital icon and a red title, so it reads as the most serious light without a dark surface. The light that applies today scales to 1.02, gains the 3px deep-honey ring and shows a honey "Esto le corresponde hoy" pill tag in graphite ink. The checker's urgent result is a blush box framed by a 3px red inset ring, in graphite text.

### Do / Avoid Lists
Inside a care panel, the "Haga" and "Evite" lists open with a verb label (800 at 1.125rem, uppercase, tracked 0.04em) in cordillera or alarma that carries its check or cross icon. Each item has a 28px icon disc (meadow wash with a green check, or blush with a red cross, stroke 3) in a 30px column.

### Cross-Stitch Checklist (signature)
The daily checks are linen rows (radius 14px) with a 44px white box (radius 10px, solid 2.5px border of faded ink at 75%). Checking a row stitches an X in fuchsia: the two 4.5px strokes draw in sequence (260ms, with the second delayed 160ms) and the box border turns fuchsia. Completing all five shows a meadow-wash "revisión completa" notice with a sewn star medallion.

### Thread Clock (signature)
The 24-hour dial is a pale linen face with a dashed outer ring, hour dots (larger at 0, 6, 12 and 18) and a lavender night arc from 22:00 to 07:00. Each period in a position is drawn as a 12px arc of mid thread (supine is honey, right side lagoon, left side mulberry, seated heather) with a white running stitch along it. A knot (8.5px with a 3px white rim) marks each change. The next change is a dashed white circle, and the current time is a 3px graphite hand with a honey hub. A newly logged arc sews itself in over 900ms and its knot pops in after 600ms.

### Progress Chart
This is a column chart of quiz scores. The columns are mid-heather bars (at most 24px wide, rounded 4px at the top) with a white dashed thread down the centre, value labels in 800 at 0.9375rem with tabular figures, and dates beneath. The gridlines are hairline graphite at 10% with a 30% baseline. Hover or focus tints the column heather at 8%, deepens the bar to the heather thread and shows a linen tooltip with a heather edge. A data table is always available under a disclosure.

### Embroidered Badges
The badges are rows on the heather cloth (white at 55%, a solid 2px heather border at 22%, radius 18px). Each holds a 76px circular badge in a mid thread (honey, lagoon, mulberry or sage) with a dashed inner ring and a simple appliqué motif. Unearned badges are greyscale at 45% opacity. Earned badges get a linen ground and a honey border. A newly earned badge spins in with the 900ms `bordado` keyframe.

### Toast
The toast is a linen slip with hand-cut button corners, a 1.5px ink-thread edge, graphite 700 text and the full shadow. It rises 24px into place over 320ms, above the bottom nav on phones.

## Do's and Don'ts

### Do:
- **Do** set every page on ivory linen (`--fondo`) and put any reading longer than a short list on a linen patch with the `--trama-clara` weave.
- **Do** give every patch its own thread: `--hilo: var(--<patch hue>-medio)`, 2px dashed, inset 9px.
- **Do** keep every touch target at 48px or more: 56px buttons, 48px small buttons and listen pills, 60px tabs and position tiles, and 52px option tiles and segments.
- **Do** pair every status colour with an icon and words, as the semáforo, the Haga/Evite lists and judged quiz answers do.
- **Do** use the one focus ring everywhere: a 3px añil outline (`--foco`) at a 3px offset (2px on custom tiles). Añil reaches 5:1 on every light surface, so the ring needs no halo.
- **Do** show selection as a raised linen face with an añil or deep-honey edge, and feedback as a wash with a mid-thread edge.
- **Do** set sizes in rem and colours through `:root` tokens, so the Letra sizes (112.5% and 125%) and `html[data-contraste="alto"]` reach every new component.
- **Do** draw icons from the Lucide stroke sprite at stroke 2.1 with round caps and joins, sized 1.5em (1.15em in buttons), and coloured by currentColor.
- **Do** animate on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`), keep control transitions at 160–180ms, and let `prefers-reduced-motion` collapse everything to 1ms.

### Don't:
- **Don't** build the white clinical health app: a white page of identical cards with a teal accent.
- **Don't** put a running stitch on an idle secondary button, checkbox, radio or position tile, chip, input or tile. Those keep solid edges.
- **Don't** set Londrina Solid in lowercase, in buttons, in form labels or in paragraphs.
- **Don't** use grey. Borders are graphite ink at 18–45% alpha or a fabric thread, and shadows are tinted with ink. Never use black shadows or hard offset shadows.
- **Don't** spend alarma red on anything but clinical warning. Quiz mistakes are terracotta.
- **Don't** fill a tab, segment, button, toast, tooltip or tag with añil, navy or any deep thread. Large surfaces take a `tela-*` cloth, a `-claro` wash or linen.
- **Don't** set a headline in Londrina 900; it is reserved for the brand name.
- **Don't** let a band run to the viewport edge or touch the next band.
- **Don't** add a small uppercase label above a headline. A section head is its headline, one sentence and the Escuchar button.
