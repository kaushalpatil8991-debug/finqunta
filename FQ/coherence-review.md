# Coherence Review: Finquanta Site-Wide Plate Mapping

## 1. One site, or twenty brands?

**Verdict: one site's DNA is genuinely in here, but the document as written would ship a patchwork.** The convergence is real and it is being drowned by the method.

The mapping was produced **by page cluster**, but the codebase is organised **by component**. Every shared component therefore received 8 independent, contradictory instructions. That single structural mistake explains ~90% of the incoherence:

| Shared component | Distinct plates proposed | Fracture |
|---|---|---|
| `CtaBand` (pre-footer, ~20 routes) | **13** — S05, S06, S07, S10, S15, S17, S20, S22, S24, S30, S32, S34, S38 | Worst. One component, thirteen silhouettes. Several entries explicitly argue "differentiate by geometry per route" — which means forking the component 20 ways. |
| `PageHero` | **14** — S02, S06, S10, S16, S20, S21, S22, S23, S24, S27, S30, S31, S33, S34 | Every route gets a different hero language. |
| Utility bar | 3 — S18, S26, S33 | Global chrome cannot be three things. |
| Header | 3 — S35, S08, S11 | Same. |
| Mega-menu | 4 — S18, S29, S35, S07 | Same. |
| Mobile sheet | 5 — S01, S13, S15, S28, S35 | Same. |
| FAQ accordion | 7 — S01, S11, S14, S21, S30, S32, S37 | One Radix component, seven grammars. |
| Related-cards | 5 — S08, S12, S19, S25, S32 | Same component on 6 templates. |
| Detail-hero aside | 5 — S02, S10, S11, S34, S37 | Same. |

**Four deeper fractures that survive even after de-duplicating:**

1. **Six mutually exclusive accent laws.** S07 ("exactly four placements"), S13 ("accent = selection, three times, never twice for the same purpose"), S16 ("exactly one accent-flooded card per view"), S24 ("a distinct data type earns its own third hue"), S14 ("accent = live state only"), S27 ("hard three-colour, one accent block"). Adopted together they cancel out. One must win by fiat (see §4).

2. **Four radius vocabularies + seven notch proposals.** S33 square corners (10 uses, including utility bar, awards, specs, leadership), S22 organic mask (6 uses), S24 rounded-rectangle CTA, pills everywhere, plus concave notches proposed from S15, S21, S23, S27, S30, S31 and S08. If every band is notched, the notch stops meaning anything and starts reading as a rendering artefact.

3. **A photography dependency the project cannot meet.** S07, S31, S02, S25, S05, S12 and S36's colourway-as-card all require images. The repo has **zero** image files. Every one of those "adapt" notes admits it. A backbone built on those plates degrades, on day one, back to exactly the flat pastel state being criticised.

4. **Data integrity, not design.** 33 placeholder records; six fabricated award issuers; a malformed phone number; a personal gmail on a partner site; dead routes (`/personas/*`, `/our-clients`, `/career/[slug]`); `slice(0,10)` silently dropping two clients; asides hardcoded identically across all slugs; faux `Read more →` spans that are not links. Several sections (Awards, Clients, Testimonials, Trust Stats) cannot be designed until this is resolved — restyling them makes invented credentials look *more* fraudulent, not less.

**Where it already agrees** (this is the spine — take it): Footer → S05 (8/8 unanimous). Modal → S15 (7/8). Clients → S04 (6/7). Header → S35 (5/8). Mega-menu → S18 (5/8). Trust stats → S16 (5/8). Sticky promo → S28 (5/8, always meaning "dock it, delete the overlay"). FAB → "detached bar, refuse the glass" (7/8 in substance).

---

## 2. The backbone (8 plates whose DNA repeats) vs. the accents (used exactly once)

### Backbone — these become named components, not references

| # | Plate | Law it owns | Governs |
|---|---|---|---|
| 1 | **S35 DOMIO** | **Chrome = discrete floating objects; state = inversion, never tint** | Header, persona router, mega-menu triggers, mobile sheet rows, every nav list, active states site-wide. Kills the primary-50 wash + 2px underline everywhere at once. |
| 2 | **S18 MODERA** | **Family grammar: outlined label chip opens a card, circular ↗ closes it in a fixed corner** | Mega-menu columns, offerings cards, policy cards, related cards, newsletter card, download cards. This is the only tool in the corpus for "make N unrelated blocks read as one system". |
| 3 | **S38 chapter header** | **Section header = eyebrow left / lead centre / action right** | Replaces `SectionHeader` on ~40 bands. Fixes the centred-header-over-left-grid misalignment, the missing `lead` props, and the orphaned "View all →" links, in one component. |
| 4 | **S16 number law** | **Value ≥ 2.5× its label; exactly one accented cell per view** | Trust stats, testimonials metrics, case-study metric strips, outcomes, refund hero, pricing anchor, download version, delivery SLA, timeline years. Broadest single rule in the document. |
| 5 | **S11 fact law** | **Hairline label/value rows — no boxes, no zebra, no icons; the figure lives inside the CTA** | Refund matrix, delivery tiers, cloud specs, pricing comparison, product spec tables, open roles, FAQ hard values, EULA terms. The site currently renders all of this as prose; this is the corpus's only correct dense-data treatment. |
| 6 | **S36 list law** | **Iconless: bold label over a grey sub-line, hairline separators, zero glyphs** | Values, perks, commitments, deliverables, capabilities, benefits, pack contents, awards, cloud bullets. Deleting the 40/56px `primary-100` circular icon chip fixes ~12 sections simultaneously. |
| 7 | **S12 bento law** | **Unequal tiles, one invariant gutter, one typographic (non-card) tile per grid** | Values, offerings tabs, clients grid, blog index, related cards, feature grids with odd counts. Structurally eliminates every orphan-row bug in the document (4-into-3, 5-into-3, 2-of-3, 6-up). |
| 8 | **S15 sheet law** | **Notched sheet, CTA straddling the seam — and the notch exists ONLY on the overlay plane** | All five modals + mobile sheet. Reserving concave geometry to overlays is what stops the notch becoming noise. |

### One-off accents — each used exactly once, site-wide, and forbidden elsewhere

- **S05 → the footer.** Only. The site's closing signature.
- **S22 organic mask → /about-us hero.** Only. One shape per site, or it is not a differentiator.
- **S27 hard three-colour number block → /download hero.** Only. The version string is genuinely the content.
- **S33 square corners → the dev-only demo banner.** Only. Square = "not production UI". Remove it from awards, specs, leadership, utility bar, pain points.
- **S37 leader lines → /tally-integration hero.** Only. It is literally a connection diagram; everywhere else the fixed-crop fragility outweighs it.
- **S30 rag-fill → /tallyprime-pricing hero.** Only. The one fixed, non-CMS, non-localised H1 on a highest-intent page.
- **S02 staged render → /tally-mobile-apps/[slug] hero.** Only. The one page selling a phone app.
- **S04 marquee → exactly two seams:** below the clients band, and above the footer. It is the site's only chapter divider; it works because it is rare.
- **S24 → one token rule + one placement:** rectangles are buttons, pills are tags (site-wide token), and the result-card row on `/case-study`.
- **S31 numbered rail → capped at three:** hero carousel indicator, about-us timeline axis, long-document TOC. Component, not a plate reference.
- **S03 greybox → production loading/empty-state skeletons.** Never a visible band.

**Explicitly demote to "geometry only, palette discarded":** S09, S17, S28, S32, S26, S21, S19, S13 — every one of these is a dark/glass plate whose own critique names it as failing contrast. Take the shape, take none of the values, and never take backdrop-blur.

---

## 3. Wasted opportunities

There are no zero-use plates — but six plates have their **best idea permanently parked in the `alt` slot**, which is functionally the same as unused:

| Plate | The idea that keeps getting demoted | Where it should go — decisively |
|---|---|---|
| **S19 MIRA** | Serif for human sentences, sans for every number and every control, zero overlap. Cited ~8× as an alt, adopted nowhere. | Make it a **site-wide type law**. Lora is already loaded and currently does nothing but decorate one word per band. This is free brand voice. |
| **S10** | The compound CTA — "the most reliably reusable component in the set; copy it exactly." Used 4× total. | Make it **the** primary button, everywhere. CTAs are the site's weakest recurring element and this is the corpus's most-recommended component. |
| **S14** | Accent = liveness. The site has **no status colour system at all** — `success #3D8B5C` appears as one orphan green chip. | Adopt as the state law: green/warning are status-only, never decorative. Fixes the orphan chips on add-on and booster asides in one rule. |
| **S03** | The three-value lozenge vocabulary as the spec for real skeletons and empty states. Cited 6×, always as a dev-banner alt. | Ship it as production loading + empty states, which the codebase entirely lacks (tab-switch grid collapse, carousel filters returning one card). |
| **S25** | Product-in-situ composite — the single answer to "we have no photography and cannot fake it." Used 5×, always alt. | Make it the **art-direction brief** for the three commissioned photographs, not a layout. |
| **S26** | The two-part composite pill — two unlike facts in one hairline-split lozenge. Cited 7×, adopted as primary ~3×. | Make it a **utility component**: credential lockup, client + sector, price + tier, sync + interval, spec + value. It is the answer to every "two facts, 36px of space" problem in the document. |

---

## 4. The reconciling token set

Four surfaces. Two accents, each bound to one ground. Five radii. Seven type steps. Nothing else.

### Surfaces
| Token | Hex | Use |
|---|---|---|
| `ground` | `#FBF7F0` | Page body. Default. |
| `surface` | `#FFFFFF` | Cards, panels, sheets. |
| `band` | `#F6F0E4` | The **only** alternating band tint. Retire the third cream. |
| `ink` | `#2E1B45` | Inversion: footer, one stat band, one CTA band, active rows. Maximum **three** ink surfaces per scroll. |

### Text
| Token | Hex | Rule |
|---|---|---|
| `ink` | `#2E1B45` | Headings on light. |
| `ink-700` | `#4A2C6B` | **All body copy on light.** Replaces ink-500 for sentences. |
| `ink-500` | `#6E5485` | Captions and metadata on light only (6.0:1 on ground). **Never on ink** — that pairing is 2.4:1 and is the site's worst failure. |
| `cream-200` | `#EDE3D5` | All text on ink (12.2:1). Every footer link moves here. |
| `ink-300` `#A38EBC` | — | **Delete.** Its only current use is ink-on-ink at ~2.4:1. |

### Accents — the law that resolves all six conflicting rules
> **Plum is the light-ground accent and means state/selection. Sand is the dark-ground accent and means proof/emphasis. Exactly one accented element per viewport. Nothing else is ever coloured.**

| Token | Hex | On | Ratio | Meaning |
|---|---|---|---|---|
| `plum` | `#7A4FB0` | ground/surface | 5.5:1 | Active item, selected chip, primary button, the one flooded cell. |
| `plum-100` | `#EEE0F5` | — | — | Hover only. **Not** an icon-chip fill (that treatment is deleted). |
| `sand` | `#E8C89B` | ink | 9.7:1 | The single high-luminance anchor on any dark band: credential pill, one flooded stat, primary on ink. |
| `success` | `#3D8B5C` | — | — | **Live state only** (S14). Never "included", never a tick. |
| `warning` | `#C26A2E` | — | — | Form errors only, ≥14px. |

### Lines
`hairline` = `#2E1B45` at 10% on light; `#EDE3D5` at 15% on ink. **Retire `cream-200` as a border on cream** — at ~2% luminance delta it is invisible, which is why the TOC rules and card edges vanish.

### Radius
| Token | Value | Bound to |
|---|---|---|
| `r-button` | `8px` | Buttons. Rectangles are buttons (S24). |
| `r-card` | `16px` | Cards, panels, banners. |
| `r-pill` | `999px` | Tags, chips, nav containers, status. **Never a submit control.** |
| `r-sheet` / notch | `28px` | Overlay plane only — modals, mobile sheet. Concave radius = 28px, one per screen. |
| `r-none` | `0px` | **Reserved.** Dev-only chrome. Never ships. |

### Type
| Step | Size/LH | Use |
|---|---|---|
| display | 56/1.05 | Hero H1, hero stat values |
| h1 | 40/1.10 | Chapter bands — max 4 per page |
| h2 | 28/1.15 | Sections inside a band |
| h3 | 20/1.30 | Card titles — must outrank body |
| body-lg | 18/1.6 | Leads |
| body | 16/1.6 | **Floor for all sentence copy.** Kills 14px bodies. |
| caption | 13/1.4 | **Absolute floor.** Kills every 9–12px import. |
| micro | 11/1.2, +0.08em caps | Eyebrows, chips, stat labels |

Plus two hard rules: **numbers are Manrope tabular with Indian grouping, always; sentences may be Lora italic, controls never are, and serif never drops below 16px** (S19). And: **stat value ≥ 2.5× its label** (S16).

---

## 5. Top 10 to redesign first

Ranked by (routes affected) × (severity) × (shippable without new assets).

| # | Section | Plate | Why it pays off most |
|---|---|---|---|
| 1 | **Footer** | S05 + token fix | Every page. `#6E5485` on `#2E1B45` = **2.4:1** across 23 links — the site's worst defect, and it is a token swap plus one wordmark lockup. 8/8 plate agreement. Ships in a day. |
| 2 | **`CtaBand` system** | S38 header + S10 compound CTA | ~20 routes ending identically, with 13 conflicting proposals in this doc. Rebuild as **one** component with three content slots (claim / proof / action) and differentiate by **content and proof only, never geometry**. Also kills `preserveAspectRatio="none"` BandArt, which distorts on every route. |
| 3 | **The number law** | S16 | Not a section — a rule applied to trust stats, testimonials, case-study strips, outcomes, refund hero, pricing, download, delivery SLA, timeline. Highest breadth per unit of work. Blocked only on sourcing the figures, which must happen anyway. |
| 4 | **The fact-row law** | S11 | Refund matrix, delivery tiers, cloud specs, pricing comparison, product specs, open roles. All of it currently ships as prose. This is the single biggest content-shape mismatch in the audit and needs one component. **Prerequisite:** `PolicyDoc.body` must change from `string[]` to a discriminated union — that one type change unblocks all six legal documents. |
| 5 | **Sticky header + right cluster** | S35 | Every page. Invisible at scroll 0, visibly half-built between 1180–1380px. Collapse the 560/1380/1480 CTA ladder to two fixed objects; move Buy/Download into the mega-menu. Deletes three breakpoints. |
| 6 | **The icon-chip purge** | S36 | The `primary-100` circular chip appears on offerings cards, values, cloud bullets, commitments, perks, benefits, deliverables, capabilities, awards. Deleting it improves ~12 sections and breaks the Awards→Values rhythm collision for free. Pure subtraction. |
| 7 | **Mega-menu** | S18 | The primary desktop discovery surface: 25 flat rows, no entry point, no descriptions. Label chips + one featured cell + four columns. Also the new home for Buy/Download and the sticky cloud promo. |
| 8 | **Mobile nav sheet** | S35 rows + S13 chips + search | Majority of Indian SME traffic. 30+ links, no search, five buttons in three rows. Also delete the `comingSoon` dot styling and the `navigate()` early-return dead code while in the file. |
| 9 | **Offerings tabbed grid** | S12 bento + min-height | Densest genuine content on the site (24 cards, 6 tabs, zero placeholders). Reserve tab height first — the grid currently collapses and jumps the page on every tab change; that is a bug, not a design note. Then one anchor card per tab, and replace the faux `Read more →` spans with real affordances. |
| 10 | **Modal layer + one inline enquiry surface** | S15 + structural | **100% of conversion** runs through an overlay with no shareable URL, no SEO surface and no fallback. One sheet shell for all five dialogs, mounted lazily, plus one real inline form in the scroll body (the Cloud band). This is business-critical, not cosmetic. |

**Deliberately excluded from the top 10: the hero carousel.** It is the most important 580px on the site and it is #1 by impact — but every proposed fix (S07, S31, S06, S02) is blocked on photography that does not exist. Do not restyle it. Instead, run it as a parallel workstream with a fixed asset budget: **3 product screenshots** (TallyPrime desktop, TallyPrime in a hosted browser session, one mobile app screen), **3 photographs** (support desk, an implementation visit, a shop counter running Tally), **12 client logo SVGs**, **1 founder portrait**, **2 certificate scans**. Until those land, cut the carousel from five near-identical pastel slides to two, restore the plum eyebrow, and move the numbered rail (S31) out from under the CTA row. Everything in the ten above ships with zero new assets.

**One gate before any of it:** the placeholder audit. Fabricated award issuers, invented client names, a malformed phone number and a personal gmail address will each be made *more* conspicuous by better typography. Fix the data, or cut the sections, first.