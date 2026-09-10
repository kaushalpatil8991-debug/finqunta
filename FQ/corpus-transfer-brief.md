# The 38-Screen Corpus vs. Finquanta — A Transfer Brief

## 1. The structural DNA — one system, six rules

Strip the brands and all 38 plates run on the same six-rule engine. **(1) The pill is the atom** — 33/38 build every non-card element (nav, chips, buttons, badges, tooltips, search) as a fully-rounded lozenge, radius always half the height. There is no 4px or 8px radius on a control anywhere: it is pill or it is card. **(2) Three radii, descending** — frame ~32px → card 16–24px → control 999px. That nesting is what makes screens read as stacked *objects* rather than stacked rectangles. **(3) One gutter, everywhere** — horizontal gap = vertical gap = outer padding. Column *widths* vary wildly (44/28/28, 26/33/41, 42/58); the gap never does. Unequal columns + constant gutter is the whole recipe for "editorial, not templated". **(4) Chrome floats** — 8/38 detach nav/rails/transport onto their own z-plane, often overlapping the content card's edge. Most identifiable move in the set, and the least responsive. **(5) Surfaces are tinted, never neutral** — no `#000`, no `#FFF`. The black carries a hue drawn from the category. **(6) Selection is inversion, not colour** — flip a row to the opposite luminance. Free hierarchy, survives any repalette.

The corpus is one designer's Pinterest portfolio (36/39 watermarked `@bee_ui.ux`), so frequencies describe personal habit, not industry consensus. Take the geometry; re-derive the content rules.

## 2. Colour strategy and the token set

28/38 dark-dominant, 7 light, 3 split. **25 of 38 carry no saturated UI accent at all** — every chromatic tone comes from the product photograph. Brilliant for e-commerce (the product is the only colourful thing); useless for anything with state, because a colour that lives inside a photo cannot mean *error*, *live*, or *selected*. The 13 that do use an accent cluster into a narrow band: orange/rust (`#F24402`, `#CC3109`, `#E95203`), crimson (`#83080C`), volt/lime (`#ABFE5C`, `#B1C845`), coral (`#CB675E`). No purple, no teal, no true green.

Two rules do the real work: the **accent-count rule** (accent appears 3–4× per screen, never twice for the same purpose) and the **one-flooded-card rule** (flood exactly one card, leave neighbours dark — the visual answer to "which number matters?").

Extracted tokens: surfaces `--bg-warm-900 #110C0A` / `--bg-cool-900 #050B11` / `--bg-violet-900 #050509` / `--surface-800 #1A1B1E` / `--paper-000 #FEFEFE`; radii `999 / 16 / 24 / 32`; one `--gap: 20px`; type scale `56 / 30 / 20 / 15 / 13 / 11` with `--t-stat 32`; `--shadow-float 0 8px 32px rgb(0 0 0 /.35)`; `--hairline 1px rgb(255 255 255 /.08)`; and a `--scrim` gradient. Note the body size was **corrected upward** by the analyst: the corpus's real body copy is 8–11px at 40–55% opacity, and 10 of 13 sampled text elements fail WCAG AA.

## 3. The 29-pattern index, sorted by transferability to a dense B2B/ERP site

**Highly transferable (use now).** Spec rows with hairline dividers (5/38) — the *only* pattern in the corpus that handles dense factual data properly, and exactly what a Tally feature/edition comparison needs. Number-first stat block (8/38, value 2.5–3.5× label). Segmented chip filters (8/38). Inverted active state (8/38). Circular icon buttons at one diameter per screen (22/38). Compound CTA (12/38). Light island in a dark shell (6/38) — invert it: one *dark* island in a light B2B page, holding the densest data. Position indicator (3/38). Capsule bar chart (1/38, and it should be more). Two-part composite pill (3/38) — perfect for "₹18,000 | Silver Edition". Typographic tile in a photo grid (2/38).

**Needs adaptation.** Pill-as-universal-container — survives at chip/badge scale, but a pill *search field* in a product filter reads consumer; keep 999px under 56px, use 10–16px above. Metric chip row (4/38) — repoint from °C/W to licence counts and SLA figures. Overflow-crop (7/38) — signals "more" without a scrollbar, but needs a real scrollbar fallback for keyboard users. Floating annotation pills + leader lines (7/38) — excellent over a Tally screenshot; needs a scrim. Concave/notched corners (8/38) — the corpus's best idea, but budget it as *one* signature move, not a system. Detached floating chrome (8/38) — no breakpoint story; only safe on a sticky header. Serif-for-brand/sans-for-interface (5/38). Vertical stagger (1/38). Coverflow depth (2/38).

**Do not use.** Photography-supplies-the-palette (24/38) — a Tally reseller has no hero product photography; this is the corpus's load-bearing assumption and it does not hold. Glassmorphism/blur panels (8/38) — the direct cause of the contrast failures. Vertical rotated type (3/38). Organic blob masking (1/38). Type rag filled with interface (2/38) — dies on CMS copy. Marquee ticker (2/38). Hotspot markers without numbering (2/38). Notched card silhouette as a *wave* (3/38). Square-corners-as-genre-signal (1/38) — contradicts the existing system.

## 4. The honest gap

Four specific tensions, not one general one:

**Photography vs. no photography.** 24/38 outsource all colour to a hero image. Finquanta sells software licences and implementation services — the only imagery available is UI screenshots, staff photos and logos, none of which carry a palette. Remove the photograph and 24 of these designs become grey boxes. The corpus's colour discipline (accent × 3 jobs) transfers; its colour *source* does not.

**Sparse vs. dense.** These are comps with one-line titles and four bullet points. A Tally reseller site has edition-comparison tables, GST feature matrices, module lists, pricing tiers, downloads and a blog. The 20px constant gutter and 32px frame radius that make a 5-element hero sing become wasteful at 40 rows. Only the spec row scales.

**Dark vs. light.** 28/38 dark. Finquanta is `#FBF7F0` cream — correct for Indian SME B2B, where dark reads as gaming/crypto and quietly damages trust. Most of the corpus's surface tokens are therefore inapplicable as values, applicable as *method* ("your ground should carry a hue"). Finquanta already does this: cream is a hued white, not `#FFF`.

**Image-led vs. text-led, consumer vs. B2B.** The corpus optimises for a 3-second feed impression. Finquanta optimises for a purchase decision researched over weeks, read on a mid-range Android on 4G, often by a finance manager over 45. Portfolio-shot legibility choices (11px at 45% opacity, text on blur) are not merely suboptimal here — they are disqualifying. And nothing in 38 plates shows an empty state, an error, a loading skeleton, a long title, or a zero. Every one of those exists on this site.

## 5. Current token system vs. corpus — what would change

Finquanta's system is already stronger where it counts. Type scale is close to the *corrected* corpus values (body 16px/1.55 vs. corpus-corrected 15/1.55; display 56px/1.05 vs. 56/1.02; stat 56 vs. 32 — Finquanta's is bolder). `--spacing-gutter: 20px` matches `--gap: 20px` exactly. Colour has a real, ownable accent (`--color-primary #7A4FB0`) plus semantic success/info/warning the corpus lacks entirely.

Three things would actually change:

**Radius.** Finquanta runs `6 / 10 / 16 / 24` — a conventional soft-UI ramp. The corpus's `999 / 16–24 / 32` is a different philosophy: controls are *fully* round, cards are cards, and there is no 6px anywhere. Adopting even partially means adding `--radius-pill: 999px` and applying it to chips, badges and utility-bar elements — the cheapest single upgrade available, and it costs nothing structurally.

**Shadows and hairlines.** Current shadows are all soft ink-tinted lifts (`0 2px 8px rgb(46 27 69 /.05)`) — correct for light. Missing is the corpus's `--hairline` primitive: a 1px rule at 6–10% of the text colour, which is what makes spec rows work without boxes or zebra striping. Add `--hairline: 1px solid rgb(46 27 69 / .08)`.

**A scrim token and an accent contract.** Any text over an image or gradient (`gradient-plum`, `gradient-violet`) needs a declared `--scrim`, not a hope. And `--color-primary` should be given exactly three written jobs — selected, primary action, live/current — with everything else falling back to ink and cream.

What should *not* change: the cream ground, Manrope + Lora, the semantic colour set, the 96/56px section rhythm, and the body-copy contrast. On contrast, Finquanta is already right and the corpus is wrong.