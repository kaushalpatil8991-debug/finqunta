# Thirty-Eight Screens

**A forensic teardown of every UI design in `Downloads/FQ`.**

39 files &rarr; 38 unique designs. Every one measured, taken apart and catalogued: layout grid, typography, component inventory, pixel-accurate palette, the moves worth stealing and the places each one breaks. Followed by what the whole set adds up to.

| | |
|---|---|
| Source | `C:\Users\cando\Downloads\FQ` |
| Files | 39 (one exact duplicate) |
| Unique designs | 38 |
| Patterns catalogued | 29 |
| Dark-dominant | 28 of 38 |
| No UI accent at all | 25 of 38 |
| Text samples failing WCAG AA | 10 of 13 |
| Palettes | k-means, k=10, over cropped interface regions only |

---

## Contents

- [What this folder actually is](#provenance)
- [The structural DNA — one system across 38 screens](#dna)
- [Colour — restraint as the whole strategy](#colour)
- [Typography — four voices, and one of them is a mistake](#type)
- [The notch — the corpus's best idea](#geometry)
- [The component library hiding in here](#components)
- [The rare moves — used once or twice, worth more than the common ones](#rare)
- [Presentation craft — half of why these read as good](#staging)
- [What breaks the moment this meets real data](#critique)
- [If you were to build from this](#apply)
- [The 38 plates](#the-38-plates)
- [Pattern index](#pattern-index)
- [Contrast audit](#contrast-audit)
- [Extracted tokens](#extracted-tokens)
- [Filename crosswalk](#filename-crosswalk)

---

# Part one &mdash; Analysis

## What this folder actually is

Thirty-nine files. Thirty-eight unique designs — `Web ui Inspiration (2).jpeg` and `Web ui Inspiration (7).jpeg` are byte-identical (same MD5, same 53,662 bytes), so one is a duplicate save of the CREATORA smart-home dashboard.

Every file is 735 or 736 pixels wide. That is Pinterest's canonical pin width, so this is a Pinterest board downloaded in bulk rather than a curated design archive. Three consequences follow, and they shape everything below:

**The filenames are meaningless.** They are Pinterest's board titles, not descriptions. `Skeleton to final design.jpeg` contains a finished NFT dashboard and no skeleton. `Smooth Animated web design.jpeg` and `Sorelle Jewel Website Animation.jpeg` are static JPEGs with no animation in them. The ten `1152780835…` files are raw Pinterest IDs. Never use these names to find anything — use the ID system in this document.

**This is one designer's portfolio, not a survey of the field.** Thirty-six of the thirty-nine carry a `@bee_ui.ux` watermark. One carries `Vistora.club`. One is a meme repost. So the patterns that recur here recur because one person likes them — not because the industry has converged on them. Read every "this appears in 12 of 38 designs" below as *"this designer reaches for it constantly"*, which is still useful, but is a different claim.

The brand names confirm it. **LUMORA / LOMORA / LUMØRA** appears across nine designs spanning lighting, furniture, real estate and smart home. **DOMIO** appears twice, **Reson** twice, **WAVEN** twice. A designer reusing a house brand across verticals is building a portfolio, not shipping products.

**Nothing here has been pressure-tested.** Prices repeat (`$119` ×4, `$399` ×2, `$499` ×2, `$85,00,00` ×3). Ratings are five filled stars on every card. `#ModernHome` appears twice in one chip row. A cycling app reports `3.567 mg/dL` for blood pressure and calls it "Driving Time". These are comps, and comps never meet a database. That does not make them worthless — it means you should copy the *geometry* and re-derive the *content rules* yourself.

## The structural DNA — one system across 38 screens

Strip away the brands and there is a single, consistent design language underneath. It comes down to six rules.

**1 · The pill is the atom.** Thirty-three of thirty-eight designs build every non-card element out of a fully-rounded lozenge: navigation, filters, buttons, badges, tooltips, captions, dropdowns, even search fields. The radius is always half the height, so the shape survives any scale. Nothing here uses a 4px or 8px radius on a control. It is pill or it is card.

**2 · Cards get 16–24px; the outer frame gets ~32px.** There are exactly three radius values in the whole corpus. The device frame is the roundest thing on screen, cards sit inside at a smaller radius, and controls go fully round. That descending sequence — frame → card → control — is what makes these read as nested objects rather than stacked rectangles.

**3 · One gutter, used everywhere.** In every bento here, horizontal and vertical gaps are identical, and the outer padding equals the gutter. That is why the layouts read as a continuous field of tiles rather than as a page with margins. Column *widths* vary constantly (44/28/28, 26/33/41, 42/58) — but the gaps never do. Unequal columns plus a constant gutter is the entire recipe for "this looks editorial rather than templated".

**4 · Chrome floats.** In eight designs the navigation, search field, icon rail or transport bar is a separate object hovering above the content plane, often overlapping the content card's own edge. It is the single most identifiable move in the set. It looks expensive and it is the least responsive idea here — a floating nav has no defined behaviour when the viewport shrinks.

**5 · Surfaces are tinted, never neutral.** No design uses `#000000` as a background and none uses `#FFFFFF` as a dark-mode surface. Furniture and lighting sit on warm near-blacks (`#110C0A`, `#181717`). Audio and sci-fi sit on cool ones (`#050B11`, `#101011`). Web3 sits on violet-black (`#050509`). This is the most transferable single lesson in the folder: **your black should have a hue, and the hue should come from the category.**

**6 · Selection is inversion, not colour.** Eight designs indicate the active state by flipping a row or card to the opposite luminance — white in a dark list, black in a light one. No brand colour required. It is free hierarchy, it works in monochrome, and it survives any palette change.

## Colour — restraint as the whole strategy

Measuring the UI region of each image directly (k-means over the cropped interface, ignoring the mockup backdrop): **28 of 38 are dark-dominant, 7 are light-dominant, 3 are genuinely split** — a dark hero over a light body, or a light bento inside a black shell.

**Twenty-five of thirty-eight carry no saturated UI accent at all.** Every chromatic tone in the composition comes from the product photograph, the 3D render or the album artwork. The interface itself is greyscale plus a lens. This is a genuinely good strategy for e-commerce — the product becomes the only colourful thing on screen, so the eye has nowhere else to go — and a genuinely bad one for anything with state, because a colour that exists only inside a photograph cannot mean *error*, *live*, or *selected*.

The thirteen that do carry a UI accent cluster into a startlingly narrow band:

| Family | Designs | Values |
|---|---|---|
| Orange / rust / amber | 4 | `#F24402` fitness · `#CC3109` MODISK · `#E95203` property · `#E54E05` lamp |
| Crimson | 4 | `#83080C` streaming ×2 · `#A30C0A` Sorellé · crimson logo tile |
| Volt / lime | 3 | `#ABFE5C` Nike · `#B1C845` KUVA · `#B1DA54` smart home |
| Coral | 1 | `#CB675E` HORIZN |
| Blush | 1 | `#F8DDD3` promo tile |
| *No UI accent* | *25* | *greyscale + photography* |

There is no purple (violet appears once, as ambience), no true green, no pink, and no teal used as an accent. Gold appears exactly once, and only for star ratings — which is correct: a rating is a distinct data type and deserves its own hue.

**The accent-count rule.** In every design that gets this right, the accent appears **three or four times per screen, never more, and never twice for the same purpose.** Nike: active filter, active size, primary action, and nothing else is ever volt. KUVA: logo mark, the `20K+` figure, a dot on the primary CTA, and — the clever part — the brand livery painted on the photographed shipping container, so the colour reads as *found* rather than *applied*. Putting your accent inside the photography is the cheapest way to make a palette feel earned.

**The one-flooded-card rule.** The fitness app floods exactly one card per screen with orange and leaves its neighbours dark. That is the visual answer to "which of these numbers matters?", and it scales to any dashboard.

## Typography — four voices, and one of them is a mistake

The corpus uses four distinct typographic registers, and they map cleanly onto category:

**Geometric sans, sentence case, full stops.** Furniture, lighting, skincare, interiors. *"Where comfort meets contemporary design."* — *"Compact. Powerful. Reliable."* — *"Modern designs. Effortless comfort. Lasting quality."* The full stop after each phrase is the entire tone-of-voice decision: it makes a fragment read as a statement rather than a slogan. Cheapest brand-voice trick in the folder.

**Heavy condensed grotesque, uppercase, tight leading.** Sport, logistics, hardware, real estate. Leading runs around 0.85–1.05 so three lines form a solid block. `CRAFTING OBJECTS / FOR MODERN / HOMES` and `LOGISTICS / FOR EVERY / BUSINESS` are the same idea: break the headline so it makes a rectangle.

**High-contrast didone serif.** Luxury only — jewellery, beauty, dark furniture. Always paired with a neutral sans for the interface, and the serif never appears below ~16px or inside a control. MIRA, TELOSKIN and the dark LUMORA all follow this split exactly. Sorellé goes further and stacks an italic serif directly above a heavy sans uppercase *within one headline* — risky, and it works because both are set in the same gold at the same optical weight.

**Wide techno / squared display.** Gaming, VR, AI, architecture. Distinctive angular `A`, `R` and `E`, single-storey `a`, exaggerated thin `I` and `T`. It carries genre instantly.

The mistake is the same in all four: **the display type is enormous and the body copy is 8–11px at 40–55% opacity.** Across thirteen sampled text elements, ten fail WCAG AA for normal text and four fail even the 3:1 large-text floor. The two elements that pass do so at 21:1 — so this is not a measurement artefact. It is a deliberate choice to treat body copy as texture.

That choice is defensible in a portfolio shot, where nobody reads the paragraph. It is indefensible in a product. **If you take one correction from this whole document: set body copy at 15px and 80% opacity minimum, and let the layout absorb it.** Everything else here survives that change unharmed.

## The notch — the corpus's best idea

Eight designs use a **concave corner radius**: where two surfaces meet, the corner curves *inward*, so the modules interlock like puzzle pieces instead of stacking like bricks. It shows up at three scales, and it is the thing most worth taking from this folder.

**At component scale** — DOMIO's `CONTACT US` pill straddles the boundary between the hero image and the white sheet, and the sheet's outline curves around it. Reson's caption-bar arrow breaks its own bar's edge and sits in a white notch cut from the photograph. MODISK parks a white circular button in the seam between a white panel and a red block, so the button occupies negative space and costs zero layout.

**At panel scale** — LUMORA's real-estate hero notches where the text column meets the image. The Japan travel page carves both of its UI clusters *into* the photograph's corners, so the image's own silhouette does the framing.

**At page scale** — PowerCube's entire layout is one continuous interlocking curve. There is no straight dividing line anywhere in the composition.

The mechanic is simple: the inner radius should roughly match the outer radius, and the page background must show through the seam. Get that wrong and the effect collapses into a rounded rectangle with a bite taken out of it.

Its close relative is the **notched card silhouette**. The NFT feed and Reson both subtract a card's corner so a button sits *in* the card rather than on top of it — notch radius = button radius plus 4–6px of clearance. WAVEN does something subtler: a soft wave taken out of the *middle* of each album card's top edge, which carries no button at all and exists purely to give a fanned stack of near-identical rectangles a recognisable profile.

## The component library hiding in here

Eleven components recur often enough, and are specified tightly enough, to be lifted straight into a real design system.

**Compound CTA** (12 designs) — a text pill with a circular icon button set into its own end cap, sharing one silhouette. Circle diameter equals pill height, inset 2–3px, icon is always an arrow. Right-hand variant reads as "go"; the NFT app mirrors it to the left and it reads as "play". MIRA splits the two apart into separate objects, which reads calmer. Same parts, three tones.

**Number-first stat block** (8) — value set 2.5–3.5× its label, label always beneath or trailing, never above. `20 hr`, `120 / Signature Pieces`, `6,800+ / Islands`, `42:06 / Driving Time`. CREATORA takes it further and puts both sizes *inline in one sentence*: `**67%** Average usage`.

**Spec row** (5) — label left in ink, value right in grey, 1px hairline at ~8% opacity, no boxes, no zebra, no icons. Lumora Halo's `Light Source → Integrated LED · Brightness → 1200 Lumens · Color Temperature → 2700K–6500K` is the only place in 38 designs where dense factual data is handled properly.

**Two-part composite pill** (3) — one lozenge carrying two facts of *different types*, split by a hairline: `$390 | Loop Form`, `Min Bid 3.4 ETH + @creator`. More compact than a caption, more scannable than a tooltip.

**Floating annotation pill** (7) — a small pill over a product photo naming a feature. A leading dot upgrades it from caption to pinned marker. The best version, in the smart-home dashboard, runs a thin **leader line** from a specific point on the product to the pill — exhibition-diagram language, and the only annotation here that anchors to something rather than floating vaguely.

**Metric chip row** (4) — four pills maximum burned into a photo card's foot, each one value plus one unit, no labels: `24°C · 30% · 350W · 80%`, or `IMDb 9.2 · 2h 16m · Top 10 Today`.

**Capsule bar chart** (1, and it should be more) — bars with a radius of half their width, no axes, no gridlines, one bar filled black, its value in a floating pill above it. A chart reduced to exactly the two things anyone wants from it: the shape, and today's number.

**Segmented chip filter** (8) — one filled, the rest outlined. MODISK alternates fills purely for rhythm, which looks great and is a small trap: users will hunt for a meaning that isn't there.

**Inverted active row** (8) — flip the row to the opposite luminance. One per list, maximum.

**Overflow-crop** (7) — clip a list or carousel *mid-row* so a partial item shows. Communicates "more" with no scrollbar. Clip at a row boundary instead and it reads as an end.

**Position indicator** (3) — `01` … `04` down the right edge, or `1/3` beside carousel arrows. Always show the total; the total is the useful half.

## The rare moves — used once or twice, worth more than the common ones

The patterns that appear thirty times are the house style. The ones that appear once are the ideas.

**Type rag filled with interface** *(Reson)* — a three-line ragged-right headline whose short lines have UI dropped into the empty space: an avatar stack on line 2, a black CTA pill on line 3. Headline and controls become one optical block instead of two stacked ones. Freshest layout idea in the folder — and it only survives copy you control absolutely. Translate it and it collapses.

**Organic blob mask** *(TELOSKIN)* — a non-repeating hand-drawn curve cut into a black canvas, with the hero photograph inside it and the type sitting in whatever negative space the curve leaves. In a corpus built entirely from rectangles and pills, this is the single strongest differentiator, and it costs one SVG path. It is also the least responsive thing here; it needs redrawing per breakpoint.

**Vertical rotated wordmark as a structural column** *(MODISK)* — the brand name at ~150px cap height, rotated bottom-to-top, occupying and defining an entire grid column. Not decoration: it is the layout's anchor. Rotate the brand, never the data — PowerCube and LUMORA both rotate labels and prices, and nobody will read them.

**Vertical stagger** *(ambient lamp page)* — three product cards at three different y-offsets. One CSS value, and it is the difference between a catalogue and a magazine.

**Typographic tile in a photo grid** *(LUMORA furniture, LOMORA)* — one cell in the bento carries no photograph at all, just a colour field and a sentence. It is precisely what stops an image grid from reading as a moodboard. Budget one text tile per six to eight image tiles.

**Nav inside a content panel** *(HORIZN)* — ABOUT / SERVICES / CONTACT moved out of the header and into the coral poster panel. Frees the top bar entirely. Unconventional, and for portfolio work it reads as confidence.

**Square corners as a genre signal** *(The Awakening)* — the only design in 38 that refuses the radius. Against thirty-seven rounded siblings it reads instantly as clinical, archival, machine. Commit fully; one rounded element in a square-cornered layout looks like a bug.

**Merchandising slot docked to the nav rail** *(VR store)* — a mini product card with a `Get now` pill hanging off the bottom of the icon rail. The rail stops being pure navigation and becomes retail space.

**Ring-progress artwork** *(smart home)* — playback position drawn as a ring around circular album art instead of a bar beneath it. Compact, and it makes the art the control.

**Marquee ticker as a chapter divider** *(LOMORA, ×2)* — a full-bleed black bar with a short phrase repeating, clipped at both ends. Functions as a horizon line between page sections rather than as decoration.

**Price inside the CTA** *(Lumora Halo)* — `Buy $329`. One decision instead of two glances. The catch: put the price *only* there and a scanner who skips buttons never sees it.

**Footer-as-hero** *(LOMORA)* — hand the footer's entire height to the wordmark at maximum scale over the most atmospheric image on the page. The last impression, treated like the first.

## Presentation craft — half of why these read as good

Not one of these designs is presented as a flat rectangle on a white background, and that is doing more work than most people credit.

**Every UI sits on a real photograph or 3D render**, chosen to argue for the design: the furniture site on a bouclé sofa, the lighting site on terracotta plaster, the sportswear app on volcanic rock, the logistics site on corporate towers, the audio PDP on stone. The backdrop is not wallpaper — it is the product's context, and it does the mood work so the interface doesn't have to.

**Backdrops are almost always textured and directional.** Ribbed acoustic panels, louvred blinds, fabric weave, rock, plaster. Repeating texture gives the flat UI something to sit against so it reads as a physical object, and a raking light shaft across the frame supplies depth that the UI itself doesn't have.

**The best examples are composites, not mockups.** The LUMORA smart-home and CREATORA dashboards are lit *by* the room behind them, with window reflections falling across the glass. That sells the use context in a way a flat render cannot.

**Two designs ship both a flat version and an angled version** of the same comp. That is the right answer: the angled shot wins the feed, the flat shot lets someone actually read the work. If you only post the angled one, you are hiding a third of what you made.

And the folder contains one **greybox wireframe** — the same streaming layout with everything removed except three greys standing in for hierarchy — staged and lit exactly as carefully as the finished screens. Posting the skeleton beside the final is the cheapest possible proof that the *layout* is what's working, not the styling.

The lesson generalises past portfolio shots: **the environment you show a design in is part of the design argument.**

## What breaks the moment this meets real data

These are comps, and comps never meet a database. Six failure modes, all of them predictable:

**Text is treated as texture.** Ten of thirteen sampled text elements fail WCAG AA. Body copy runs 8–11px at 40–55% opacity throughout. The fix is one line — `15px / 80% opacity` — and every layout here survives it.

**Glass is used instead of a scrim.** Eight designs put text on blurred panels over photography. Blur reduces *detail*, not *luminance*, so contrast still depends entirely on what the photo happens to be doing behind the text. Every one of these needs a 40–60% tint of the text's opposite underneath it, and none of them has one.

**Content is optimistic.** One-line titles, identical prices, five-star everything, avatar stacks that prove nothing, `$85,00,00`, a shoe listed at $119 and priced at $129 on its own detail screen. Nothing in the folder shows an empty state, an error, a loading skeleton, a long title, a sold-out badge, or a zero. The greybox wireframe would have caught most of it, and even it uses uniform block widths.

**Floating chrome has no breakpoint story.** Detached navs and rails look superb at one viewport and have no defined behaviour at any other.

**Decorative controls outnumber real ones.** Attribute chips with no destination, hotspots with no order, filter chips with no filter, `SLIDE LEFT AND RIGHT` as an instruction rather than an affordance. Every one of those teaches a user to stop trusting that things are clickable.

**Multiple grammars inside one row.** Repeatedly, three cards side by side offer three different interaction models — swipe here, edit there, view over there — with nothing shared between them. Two designs in the *same brand family* use toggles and chevrons for the same list.

None of this makes the folder less useful. It means the right thing to take is the **geometry, the spacing system, the component silhouettes and the colour discipline** — and to bring your own content rules, contrast floors and state coverage.

## If you were to build from this

A shortest path, in order:

1. **Pick the tint of your black from the category.** Warm `#110C0A` for anything domestic or handmade; cool `#050B11` for anything technical; violet `#050509` for anything digital-native. Never `#000000`.
2. **Choose one accent and give it exactly three jobs.** Selected, live, primary action. Write them down. Anything else stays greyscale.
3. **Set one gutter value and never vary it.** Vary column widths freely; the constant gap is what makes unequal columns look deliberate.
4. **Three radii: 32 frame / 16–24 card / 999 control.** Descending, nested, no exceptions.
5. **Build five components first** — compound CTA, number-first stat block, spec row, segmented chip filter, inverted active row. Those five cover most of what the 38 designs actually do.
6. **Add exactly one signature move.** A notch, a rotated wordmark, an organic mask, a stagger. One. The corpus's best designs each have precisely one thing that isn't in the others.
7. **Then break it deliberately once**, the way The Awakening drops the radius entirely — but only where the genre asks for it.
8. **Set your contrast floor before you style anything.** 15px body, 4.5:1 minimum, a real scrim under every text-on-image. This is the one place where the corpus should be corrected rather than copied.

---

# Part two &mdash; The 38 plates

Each plate carries a stable ID (`S01`&ndash;`S38`). Use these, not the filenames &mdash; the filenames are Pinterest board titles and several of them describe the wrong thing entirely. Palette percentages are each colour's share of the interface's pixels.

## 01 &middot; S01 &mdash; Streaming / OTT dashboard

`Web ui Inspiration (9).jpeg`  ·  *duplicate of this file also in folder: `1152780835897946877.jpeg`*

**unnamed (Netflix-style)** &middot; Media & entertainment &middot; Tablet / desktop web app &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Dark shell, light island (dark-dominant by pixel share) |
| Accent | #83080C crimson (logo tile + poster art) |
| Surfaces | #0E0908 page · #1A1615 card · #F4F4F3 right panel · #FFFFFF active row |
| Measured palette | `#0e0908` 22% `#f4f4f3` 21% `#281f1e` 14% `#53110d` 10% `#56423f` 10% `#931712` 9% `#857977` 6% |
| Patterns | Circular icon buttons everywhere, Inverted active state, Light island in a dark shell (and its inverse), Metric chip row on media, Pill as the universal container |

**Layout.** Three-zone: 56px icon rail | fluid content column | 210px fixed browse panel. Content column is a 2-row bento — a 16:7 hero, then a 3-up row split roughly 44/28/28. Gutter is constant (~12px) in both axes; outer padding matches the gutter, so the whole thing reads as one continuous field of cards rather than a page with margins.

**Typography.** Neutral geometric sans throughout; all hierarchy carried by size + weight, no display face. Section labels ~16px semibold, metadata ~10px regular at 55–60% opacity.

**Components**

- Icon rail with labelled groups (MAIN / SETTINGS) — micro-labels above icon clusters, avatar pinned to the bottom
- Hero with a metadata chip row: • Now Streaming / IMDb 9.2 / Watch 96% / 2h 16m / Top 10 Today
- Continue-watching card with an inline scrub bar and '01:36 / 02:10 · 34 min left'
- Now-playing card: transport cluster with a white circular pause FAB, scrubber, PiP icon, 'Autoplay' toggle
- Browse list rows: circular art + title + '128 titles' + chevron; active row inverts to solid black
- Full-width black 'EXPLORE MORE' pill closing the panel

**Signature moves**

- The light-on-dark island: one white panel dropped into a black shell. It does more hierarchy work than any accent colour could — your eye lands there first, every time.
- Selection is shown by inverting the row, not by tinting it. No brand colour needed for state.
- Every card carries its own progress metadata, so the dashboard reads as 'resume' rather than 'browse'.

**Where it breaks**

- Metadata chips sit at roughly 3:1 contrast on the poster art — legible on a bright poster, invisible on a dark one. No scrim.
- Toggle switches inside media cards ('Autoplay', 'Watchlist') are unlabelled at rest; they read as decoration.
- The 210px browse panel is fixed — it has nowhere to go below ~1100px.

> **Take this.** The inverted-active-row list and the white-panel-in-dark-shell trick. Both are free hierarchy.

## 02 &middot; S02 &mdash; Same streaming dashboard, staged on a laptop

`1152780835897946877.jpeg`

**unnamed (Netflix-style)** &middot; Media & entertainment &middot; Laptop mockup, 3/4 perspective &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Dark shell, light island (dark-dominant by pixel share) |
| Accent | #931711 crimson |
| Surfaces | #080605 · #1E1615 · #F2F2F2 |
| Measured palette | `#f2f2f2` 17% `#1e1615` 15% `#080605` 14% `#3b3534` 12% `#931711` 9% `#888485` 9% `#55110c` 8% |
| Patterns | Light island in a dark shell (and its inverse) |

**Layout.** Identical to S01; the value here is the presentation, not the layout.

**Typography.** As S01 — this is the same comp re-staged.

**Components**

- Same as S01

**Signature moves**

- Perspective staging on a ribbed acoustic-panel backdrop. The repeating vertical ribs are doing the same job a studio softbox does: they give the screen a texture to sit against so the flat UI reads as a physical object.
- The angle is roughly 20° yaw / 8° pitch — enough to feel dimensional, shallow enough that the layout stays readable.

**Where it breaks**

- At this angle, the right panel's text is genuinely unreadable. A portfolio shot that hides a third of the work is a portfolio shot that undersells it.
- Pairing it with S01 (the flat version) is the fix — and this board contains both, which is the correct way to do it.

> **Take this.** Ship both: a flat, honest render for reading and an angled hero for the feed.

## 03 &middot; S03 &mdash; Greybox wireframe of the streaming dashboard

`1152780835897946878.jpeg`

**process artefact** &middot; Process / wireframe &middot; Skeleton &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Dark greybox (dark-dominant by pixel share) |
| Accent | none |
| Surfaces | #1F1F1F canvas · #333333 card · #D7D7D7 block · #FEFEFE frame |
| Measured palette | `#333333` 62% `#fefefe` 7% `#282828` 7% `#d7d7d7` 6% `#414141` 5% `#9e9e9d` 4% `#e8e8e8` 4% |
| Patterns | — |

**Layout.** Exposes the skeleton of S01 exactly: rail, hero, right panel, 3-up row. Three grey values do all the work — #333 for containers, #9E9E9E for secondary blocks, #D7D7D7 for primary blocks.

**Typography.** None. Every text run is a grey lozenge — the point is that no type decision has been made yet.

**Components**

- Rounded lozenges standing in for text (long = heading, short = label)
- Circles standing in for avatars and icon buttons
- A single wide lozenge standing in for a primary button

**Signature moves**

- Three-value greyscale as an information hierarchy. Lightest = most important. It proves the layout works before a single colour or word exists.
- The skeleton is lit and staged on a dark backdrop with a diagonal light shaft — treating a wireframe as a presentable artefact, not a throwaway.
- This is the single most instructive image in the folder: it is the same layout as S01/S02 with everything removed except structure.

**Where it breaks**

- Uniform block widths hide the real risk in the design — that titles vary from 4 to 40 characters. A skeleton that only ever shows 'medium' content will not catch overflow.
- No annotation of spacing values, so it documents arrangement but not the system underneath.

> **Take this.** Keep a greybox of every screen you build, and post it next to the final. It is the cheapest proof that the layout — not the styling — is what's working.

## 04 &middot; S04 &mdash; LOMORA lighting — scrolling page, mid-section

`1152780835907870145.jpeg`

**LOMORA** &middot; E-commerce / editorial &middot; Full-page scroll, floated on desert-rock photography &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Light (light-dominant by pixel share) |
| Accent | #18120B ink on white; warmth comes entirely from product photography |
| Surfaces | #FFFFFE page · #ECEAE8 tile · #18120B ticker bar |
| Measured palette | `#fffffe` 40% `#18120b` 14% `#3d2b1a` 9% `#c9c1be` 8% `#eceae8` 8% `#ae8c70` 5% `#773d1b` 4% |
| Patterns | Marquee ticker as chapter divider, Photography supplies the palette, Pill as the universal container, Typographic tile in a photo grid |

**Layout.** Editorial column ~55% of viewport with generous white gutters, then a full-bleed 4×2 product grid. The grid mixes photo tiles and text-only tiles in the same cells — the copy tiles ('Light Shapes Space / Crafted for slower living') act as visual rests inside an otherwise dense grid.

**Typography.** Two voices only: a geometric sans at ~28px/1.25 for section heads, and ~11px/1.6 body at ~60% ink. The ticker is uppercase, letter-spaced ~0.08em.

**Components**

- Black marquee ticker: 'Designed to Be Lived With ✦' repeating, clipped at both edges to imply continuous motion
- Two-column intro: heading left, single hero image right
- 4×2 uniform square grid with interleaved copy tiles
- Newsletter card: image left, headline + copy + black 'Join the List' pill right

**Signature moves**

- Copy-as-tile. Dropping a text cell into a photo grid is a rhythm device — it breaks the wallpaper effect without breaking the grid.
- The marquee bar is the only pure-black element in the light sections; it functions as a horizon line between chapters.
- The palette is white and ink. Every warm tone in the composition comes from photographed light, not from a token.

**Where it breaks**

- Body copy at ~11px against a 55%-ink grey is under 4.5:1 — comfortably below AA for that size.
- Eight square tiles with near-identical crops start to read as wallpaper by the second row; only the copy tiles rescue it.

> **Take this.** The copy-tile-in-photo-grid pattern, and the marquee-as-chapter-divider.

## 05 &middot; S05 &mdash; LOMORA lighting — footer-as-hero

`1152780835907870146.jpeg`

**LOMORA** &middot; E-commerce / editorial &middot; Full-page scroll on terracotta plaster &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Light page, black footer (split-dominant by pixel share) |
| Accent | #904924 terracotta (environmental, not a token) |
| Surfaces | #FEFEFE page · #020101 footer |
| Measured palette | `#fefefe` 22% `#020101` 14% `#25180e` 12% `#4e3220` 10% `#ab8261` 9% `#cbc1bc` 8% `#904924` 8% |
| Patterns | Photography supplies the palette |

**Layout.** Continuation of S04. The footer inverts to black and hands almost its entire height to the wordmark over a photograph.

**Typography.** The LOMORA wordmark is set at roughly 140px — around 45% of the container width — in a tight, heavy grotesque with near-zero tracking.

**Components**

- Footer nav as a single evenly-distributed row: Collection / Journal / About / Contact
- Oversized wordmark as the closing statement
- Dark product photography running under and behind the type

**Signature moves**

- Footer-as-hero. The last thing you see is the brand name at maximum scale over the most atmospheric image on the page — the inverse of the usual sitemap-and-legal-links footer.
- The nav row sits *above* the wordmark, so the type has an uninterrupted bottom edge and bleeds off the canvas.

**Where it breaks**

- No legal, contact, or utility links anywhere. Beautiful, and not shippable as-is.
- The wordmark's baseline sits on the image's horizon, so the letterforms fight the rocks behind them.

> **Take this.** Give the footer the brand's biggest typographic moment. It costs nothing and it is the last impression.

## 06 &middot; S06 &mdash; 'Furniture, Made to Belong' — hero

`1152780835907870267.jpeg`

**unnamed furniture** &middot; E-commerce / furniture &middot; Wide card floated on bouclé-sofa photography &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Light card, warm-brown media panel (light-dominant by pixel share) |
| Accent | #5D4C3E warm taupe; black for all CTAs |
| Surfaces | #EDECEC card · #FFFFFF chip · #5D4C3E media panel |
| Measured palette | `#edecec` 22% `#5d4c3e` 22% `#c3bcb5` 12% `#726152` 11% `#dad4d0` 8% `#867567` 7% `#aaa29c` 6% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Detached / floating chrome, Floating annotation pills over media, Photography supplies the palette, Pill as the universal container, Scroll / position indicator |

**Layout.** Split 42/58. Left column stacks category carousel → headline → body → tag chips. Right is a single media panel that runs full-bleed to the card's edge.

**Typography.** Headline in a geometric sans, ~46px, weight 700, leading ~1.05, broken deliberately into three short lines ('Furniture, / Made to / Belong.') so it forms a solid left-aligned block. Body ~11px at 55% ink.

**Components**

- Pill nav with a solid black active pill; 'Shop Furniture →' as a black pill at the opposite corner
- 3-up category carousel with white circular ‹ › buttons overlapping the outer edges of the strip
- Hashtag chips in two rows: #MinimalLiving #Scandinavian #SolidWood #ModernHome
- Floating white annotation pills over the product render: '• New Collection', '• Handcrafted'
- Vertical 01 / 02 / 03 stepper as circular outlined buttons on the panel's left edge

**Signature moves**

- Annotation pills with a leading dot. The dot is doing real work — it turns a floating label into something that reads as a pinned marker rather than a caption.
- The carousel arrows straddle the strip's edge instead of sitting inside it, which lets the images run wider than their controls.
- Hashtags as taxonomy. Cheap to build, instantly communicates category without a nav level.

**Where it breaks**

- #ModernHome appears twice in the chip set — a copy-paste that survived to final render.
- The 01/02/03 stepper has no active state, so it reads as decoration rather than position.
- White pills on a mid-brown panel sit at roughly 3.5:1 — fine at 14px, marginal at the 10px they're actually set in.

> **Take this.** Dot-prefixed annotation pills, and arrows that straddle the carousel edge.

## 07 &middot; S07 &mdash; KUVA — freight & logistics

`1152780835907870269.jpeg`

**KUVA** &middot; Logistics / B2B &middot; Wide card on a corporate-tower backdrop &middot; *Bold industrial*

| | |
|---|---|
| Mode | Dark card, white lower half (dark-dominant by pixel share) |
| Accent | #B1C845 lime (bright end ~#CAE258) |
| Surfaces | #0F1010 hero · #262726 mid · #FEFEFE lower panel |
| Measured palette | `#262726` 41% `#fefefe` 28% `#0f1010` 8% `#4a4b46` 6% `#e0e0de` 5% `#868380` 4% `#b3b3b5` 3% |
| Patterns | Inverted active state, Metric chip row on media, Number-first stat block, Pill as the universal container, Segmented chip filters |

**Layout.** Two stacked zones. Hero: full-width dark photo card with overlays at both lower corners. Below: a 3-column band at roughly 26 / 33 / 41 — deliberately unequal, so it reads as editorial rather than as a feature grid.

**Typography.** Headlines in a heavy condensed grotesque, uppercase, tight leading — 'LOGISTICS / FOR EVERY / BUSINESS'. Body ~9px light grey. The contrast between industrial display type and near-invisible body copy is the whole typographic idea.

**Components**

- Pill nav with white active pill; 'BOOK A CONSULTATION' pill with a lime leading dot
- Social-proof cluster: 3 overlapping avatars + '20K+' in lime + 'SHIPMENTS MOVED' micro-label
- Outlined filter chips: Warehousing / Sea freight / Air freight
- Circular ▶ button with a two-line caption to its right ('Discover the KUVA Cargo')
- Service rows: 44px rounded-square thumbnail + uppercase title + 2-line description
- Outlined 'Explore Services' pill

**Signature moves**

- One accent, used four times, never more: logo mark, the 20K+ number, a dot on the primary CTA, and the brand livery inside the photography. That last one is the clever part — the accent appears in the *product* photo, so the palette feels earned rather than applied.
- Unequal three-column band. Equal thirds would have made it a feature grid; unequal makes it a magazine spread.
- Service thumbnails carry violet/blue gradient backgrounds — the only non-lime colour, used to keep three near-identical truck photos from merging.

**Where it breaks**

- Body copy is ~8–9px at maybe 40% opacity. At real scale this is decorative text, not readable text.
- Three services, three thumbnails, three near-identical dark vehicle photos — the gradients are patching a photography problem that should have been solved in art direction.
- The lime never appears in the lower white half, so the two zones read as two different brands.

> **Take this.** Accent discipline — pick four placements and stop. And putting the brand colour inside the photography.

## 08 &middot; S08 &mdash; WAVEN — music player (opaque variant)

`1152780835907870270.jpeg`

**WAVEN** &middot; Media / music &middot; Wide app window on fog-and-towers photography &middot; *Glass & atmosphere*

| | |
|---|---|
| Mode | Dark glass (dark-dominant by pixel share) |
| Accent | #0E3658 → #809DBD sky gradient, sourced from the album artwork |
| Surfaces | #0F1010 shell · #252628 raised card · album-derived gradient panel |
| Measured palette | `#0f1010` 46% `#252628` 10% `#0e3658` 8% `#809dbd` 8% `#504747` 6% `#886c5b` 6% `#055a87` 5% |
| Patterns | Circular icon buttons everywhere, Coverflow depth by scale and luminance, Detached / floating chrome, Glassmorphism / blur panels, Notched card silhouette, Overflow-crop as a scroll affordance, Photography supplies the palette, Pill as the universal container |

**Layout.** 60/40 split: playlist column left, now-playing panel right. The nav pill and the icon rail are *outside* the shell, overlapping its top and left edges.

**Typography.** WAVEN wordmark letter-spaced ~0.2em — the only typographic flourish. Everything else is a quiet 11–13px sans.

**Components**

- Detached top nav pill (Discover / Playlists / Artists / Albums / Genres) floating over the card's top edge
- Detached vertical icon rail floating over the left edge, avatar at its foot
- Fanned album cards, each tilted a few degrees, with a soft wave notched out of the middle of the top edge and a translucent circular heart overlaid near the top-right
- Play FAB overlapping each card's lower edge
- Track rows: circular art, title/artist, 3:30, heart, ⋯
- Now-playing: full-bleed art, title, like count, scrubber with elapsed/remaining, transport row with a white circular pause

**Signature moves**

- Chrome that floats free of the window. Nav and rail are separate objects hovering above the surface, not edges of it — this is the single most-repeated structural idea in the whole folder.
- The mid-edge notch. A soft wave is subtracted from the middle of each card's top edge — not a corner cut and not a badge, just a dip in the silhouette. It gives a stack of near-identical rectangles a recognisable profile, which is exactly what a fanned carousel needs.
- The now-playing panel takes its colour from the album art, so the UI re-skins itself per track. Zero palette maintenance, infinite variety.

**Where it breaks**

- Detached chrome means the top nav overlaps content on shorter viewports with no defined behaviour.
- Track rows are ~34px tall with 4 targets each — under 44px, so this is a design that assumes a mouse.
- An art-derived panel colour means text contrast is whatever the artwork happens to give you. Needs a scrim rule, and there isn't one.

> **Take this.** Mid-edge silhouette notches on stacked cards, and art-derived panel tinting.

## 09 &middot; S09 &mdash; WAVEN — music player (glass variant)

`Web ui Inspiration.jpeg`

**WAVEN** &middot; Media / music &middot; Desktop app on the same fog photography &middot; *Glass & atmosphere*

| | |
|---|---|
| Mode | Dark glass, very low contrast (dark-dominant by pixel share) |
| Accent | none — colour comes only from album artwork |
| Surfaces | #0C0F13 · #1A1F24 · #2A353F · heavy blur throughout |
| Measured palette | `#1a1f24` 31% `#0c0f13` 25% `#2a353f` 15% `#7d96ac` 6% `#5f6469` 5% `#c0bab2` 5% `#a97d61` 4% |
| Patterns | Detached / floating chrome, Glassmorphism / blur panels, Overflow-crop as a scroll affordance, Photography supplies the palette, Pill as the universal container |

**Layout.** Three floating planes at different depths: chrome (nav pill, search pill, avatar) on top, a 5-up artwork carousel in the middle, two list panels below. A transport bar floats free at the bottom, detached from everything.

**Typography.** Sub-13px sans everywhere; 'Next up' and 'Popular Playlists' are the only things above 15px.

**Components**

- Detached search pill, nav pill and avatar — three separate floating objects, not one bar
- 5-up artwork carousel bleeding off both edges
- 'Next up' track list and 'Popular Playlists' 2-column grid side by side
- Floating transport bar: prev/pause/next, now-playing art + title, duration, heart, ⋯, shuffle, EQ

**Signature moves**

- Maximum-transparency treatment — the building behind the UI is visible through nearly every panel. This is Apple's visionOS/Liquid-Glass language applied to a music app.
- The floating transport bar is a genuinely good idea: playback control belongs to the session, not to the window, so it should live on its own plane.
- The carousel bleeds off both edges simultaneously, which communicates 'this scrolls' with no arrows at all.

**Where it breaks**

- This is the least accessible screen in the folder by a wide margin. Body text over a photographed building sits near 2:1 in places. It is a mood, not an interface.
- Panel edges are so soft that the boundary between 'Next up' and 'Popular Playlists' is inferred rather than seen.
- Compare it directly with S08 — the same app, opaque. S08 is the one you could ship.

> **Take this.** The detached transport bar. Not the transparency levels.

## 10 &middot; S10 &mdash; Ambient lamp brand — dark hero

`1152780835907870271.jpeg`

**unnamed (LOMORA family)** &middot; E-commerce / lighting &middot; Laptop on an orange-red armchair &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Dark (dark-dominant by pixel share) |
| Accent | #F3B55C lamp glow — photographic, not a token |
| Surfaces | #120F0E · #3F3D3A raised |
| Measured palette | `#120f0e` 46% `#391505` 14% `#632607` 12% `#3f3d3a` 7% `#f3b55c` 6% `#954006` 6% `#796c60` 4% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Floating annotation pills over media, Photography supplies the palette, Pill as the universal container |

**Layout.** 50/50 split. Left is a text column with a thumbnail carousel beneath; right is full-bleed product photography running to the card edge.

**Typography.** 'MODERN DESIGNS. / EFFORTLESS COMFORT. / LASTING QUALITY.' — three sentences, three lines, full stops on each. Uppercase, ~20px, letter-spaced. The full stop after each phrase is the entire tone-of-voice decision.

**Components**

- Pill nav, black, with a subtle raised active state
- 'Contact us' white pill with a black circular arrow nested at its right end
- 3-up thumbnail carousel with a ‹ › pair beneath, left-aligned
- Floating white annotation pills on the photo: 'Premium materials', 'Natural finish'
- 2×3 grid of small dark attribute chips: Sculptural / Best quality / Ambient Lamp / Quiet luxury / Elegant design

**Signature moves**

- The compound CTA — a pill with a circular icon button set inside its own end cap. It appears in nine designs across this folder and is the most reliably reusable component in the set.
- Attribute chips as a keyword cloud. They carry no interaction, they're SEO-and-mood furniture, and they fill the corner that would otherwise be dead space.
- The staging is a colour argument: an orange chair behind a UI whose only warmth is lamplight.

**Where it breaks**

- Five attribute chips with no affordance and no destination. Decorative UI trained on decorative UI.
- Body copy at ~9px, 45% opacity, on near-black — decorative again.
- Carousel arrows are bottom-left while the thumbnails are centre-left; the control doesn't align to the thing it controls.

> **Take this.** The compound pill+circle CTA. Copy it exactly.

## 11 &middot; S11 &mdash; LUMØRA Halo — product detail page

`1152780835907870273.jpeg`

**LUMØRA** &middot; E-commerce / PDP &middot; Tablet on a dark warm interior &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Light (light-dominant by pixel share) |
| Accent | #E54E05 → #FAC27A product orange |
| Surfaces | #FEFEFD page · #ECE0C9 warm tint · #000 CTA |
| Measured palette | `#fefefd` 53% `#ece0c9` 10% `#9f2f07` 7% `#fac27a` 6% `#e54e05` 6% `#c97746` 4% `#513529` 4% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Floating annotation pills over media, Pill as the universal container, Scroll / position indicator, Spec rows with hairline dividers, Two-part composite pill |

**Layout.** Genuine three-column PDP at roughly 28 / 40 / 32. Left = identity and buy. Centre = imagery. Right = specification and cross-sell. This is the most structurally complete e-commerce layout in the folder.

**Typography.** 'Lumora Halo' set at roughly 52px in a geometric sans, weight 600 — around 40% of the card width. Product name below at ~18px semibold. Body ~9.5px. The jump from 52 to 18 to 9.5 is a ratio of about 2.9 then 1.9 — aggressive, and it works because the middle tier is short.

**Components**

- LUMØRA wordmark with a slashed O
- Centred pill-container nav: Shop / Collection / Lighting / About / Journal / Support
- Black circular cart button next to a bare search icon
- 'Buy $329' black pill — price inside the button, not beside it
- Floating glass tooltip: 'Works with Apple Home, Alexa & Google Home' with a product thumbnail
- Colour selector: four dots + the resolved label 'Color - Orange'
- Spec table: Light Source → Integrated LED · Brightness → 1200 Lumens · Color Temperature → 2700K–6500K, hairline dividers, label left in ink, value right in grey
- 'One Size (Fits Every Space) / From Desk to Living Room' feature row with a resize glyph
- Cross-sell strip: thumbnail + 'Halo Floor Lamp' + '1/3' counter + outlined ‹ › buttons

**Signature moves**

- Price inside the CTA. 'Buy $329' is one decision instead of two glances, and it makes the button self-justifying.
- The spec table is the only place in 38 designs where dense factual data is handled properly: two columns, right-aligned values, hairline rules, no boxes.
- The compatibility tooltip floats over the product image rather than sitting in a features list — it answers the actual pre-purchase question at the moment you're looking at the thing.

**Where it breaks**

- No price shown anywhere except inside the button, so a scanner who skips CTAs never sees $329.
- 'Explore Collection' is an underlined text link sitting between two pill buttons — three different link affordances in one column.
- The right column stacks five unrelated content types with no visual grouping; it needs one divider more than it has.

> **Take this.** Price-in-button, the spec table, and the tooltip-over-product pattern. This screen is the most shippable in the folder.

## 12 &middot; S12 &mdash; LUMØRA furniture — bento homepage

`1152780835907870275.jpeg`

**LUMØRA** &middot; E-commerce / furniture &middot; Laptop on ribbed grey &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Light (split-dominant by pixel share) |
| Accent | #F8DDD3 blush promo tile against terracotta photography |
| Surfaces | #FEFEFE page · #F8DDD3 promo · #2A2421 photo tiles |
| Measured palette | `#fefefe` 27% `#0c0705` 15% `#473c36` 11% `#2a2421` 10% `#878384` 9% `#aeabab` 8% `#6a594f` 8% |
| Patterns | Pill as the universal container, Typographic tile in a photo grid |

**Layout.** Asymmetric bento: one large 5:4 tile, a 3:2, a portrait, and a square promo, packed with a constant ~10px gutter. Tile sizes are unequal but their *gaps* never vary — that's what holds it together.

**Typography.** 'Where comfort meets / contemporary design.' — sentence case, a light-weight geometric sans at ~26px. Sentence case plus a full stop is a distinctly softer voice than the uppercase used elsewhere in this same brand family.

**Components**

- Nav left, wordmark right — a deliberate inversion of the usual arrangement
- Image tiles with captions burned into the lower-left ('Bedroom Collection', 'Living Collection', 'Ambient Lighting')
- White circular ↗ FAB on the primary tile
- Blush promo tile: 'Save up to 20% on selected statement pieces.' as pure type, no image
- 'New Arrival' pill badge floating at a tile junction

**Signature moves**

- The typographic promo tile. One cell in the bento carries no photograph at all — it's a colour field with a sentence in it. That single tile prevents the grid from becoming a moodboard.
- Wordmark right, nav left. Small inversion, and it makes the header feel considered rather than defaulted.
- The 'New Arrival' badge is placed at the *seam* between two tiles, which ties them together.

**Where it breaks**

- Tile captions sit directly on photography with no gradient scrim — they survive on these images and would fail on lighter ones.
- The promo tile's copy is the only place a discount is mentioned; there's no repeat anywhere in the fold.

> **Take this.** One typographic tile per bento. It is the difference between a layout and a Pinterest board.

## 13 &middot; S13 &mdash; Nike — sneaker commerce app

`App UI Inspiration.jpeg`

**Nike (fan concept)** &middot; Mobile / e-commerce &middot; 3 phone screens on grey rock &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Dark (dark-dominant by pixel share) |
| Accent | #ABFE5C volt |
| Surfaces | #0D0D0D page · #1D1E1C card · #363737 raised |
| Measured palette | `#0d0d0d` 42% `#1d1e1c` 17% `#a0a3a7` 14% `#363737` 8% `#7f8386` 6% `#5d6162` 5% `#acf064` 3% |
| Patterns | Circular icon buttons everywhere, Inverted active state, Pill as the universal container, Segmented chip filters |

**Layout.** Standard mobile stack, ~16px side padding. The PDP screen introduces a vertical size-selector column at the left edge, which is the only structural surprise.

**Typography.** Heavy condensed uppercase for display ('RUN YOUR WAY', 'NIKE HYPERRUN X'), regular sans for everything else. The condensed face is doing the entire brand impersonation.

**Components**

- Onboarding: logo, display headline, product cut-out, volt progress dashes, 'SKIP'
- Segmented chip tabs: LIFESTYLE / RUNNING (volt, active) / TRAINING
- Product list rows: 48px rounded thumbnail + name + price, on a #1D1E1C card
- Vertical size selector: 7 / 7.5 (volt active) / 8 / ⌄ — a column, not a row
- Circular back and cart buttons; a square 'Fav' heart card
- Price sheet in a lighter grey, sitting under the product like a physical shelf
- 'ADD TO CART' volt button with a black swoosh chip and a '› › ›' chevron motif

**Signature moves**

- Volt appears exactly three times per screen and never twice for the same purpose — active filter, active size, primary action. Selection is *always* volt; nothing else ever is.
- The vertical size selector. Sizes are a short, ordered, numeric set — a column scans faster than a wrapping row and it frees the full width for the product.
- The '› › ›' chevrons inside the CTA imply swipe-to-confirm without building it.

**Where it breaks**

- The list prices every shoe at $119, and the detail screen prices the same NIKE HYPERRUN X at $129. Two screens in one comp, already contradicting each other.
- Volt on black is around 13:1 — excellent. Black text on volt is around 12:1 — also fine. But the grey secondary text on the #1D1E1C card is around 3.5:1, which fails at 12px.
- The size column shows a ⌄ affordance with no visible overflow indication — you can't tell there are more sizes until you interact.
- Prices repeat as '$119' on all four list rows, which is placeholder data doing real design work.

> **Take this.** One-accent-equals-selection as an absolute rule, and the vertical selector for short ordered sets.

## 14 &middot; S14 &mdash; Smart lighting app — onboarding, control, devices

`App UI Inspiration (1).jpeg`

**unnamed smart home** &middot; Mobile / IoT &middot; 3 phone screens on black rock &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Mixed — light, dark, light (dark-dominant by pixel share) |
| Accent | #B1DA54 lime, used only for live state |
| Surfaces | #FEFEFE onboarding · #27211C control gradient · #EEECEB devices |
| Measured palette | `#27211c` 27% `#fefefe` 27% `#0f0e0e` 23% `#eeeceb` 9% `#4c4b4b` 4% `#a8a4a4` 3% `#82150b` 3% |
| Patterns | Concave / inverted corner radius, Detached / floating chrome, Inverted active state, Light island in a dark shell (and its inverse), Pill as the universal container |

**Layout.** Screen 1: full-bleed image top, text bottom. Screen 2: centred single-object layout with controls pushed to the four edges. Screen 3: 2×2 card grid with a floating pill tab bar.

**Typography.** Geometric sans, sentence case, ~19px headings. 'Adaptive Light Control' and 'Your Smart Devices' are both two words per line — short lines are doing the layout work.

**Components**

- Onboarding 'next' as a black rounded shape bleeding off the bottom-right corner, with the white sheet notched around it
- Schedule chips stacked vertically on the left edge: 07:00 am / 09:00 pm
- Vertical temperature slider on the right edge with a lime thumb, labelled 25°C
- Large circular power button with a lime glyph, sitting on the lamp's glow
- Low ↔ High brightness track with '40%' in lime beneath
- Device cards in a 2×2 grid, each with an icon, a name and a toggle; the active card inverts to black
- Floating 3-icon pill tab bar

**Signature moves**

- The control screen puts the product at the centre and pushes every control to the frame's edges. You are operating the lamp, not a form about the lamp — the closest thing to direct manipulation in this whole folder.
- Lime marks live state and nothing else: the power glyph, the slider thumb, the percentage, the active device dot.
- The corner-bleeding next button with the sheet notched around it — geometry as affordance, no arrow needed.

**Where it breaks**

- '40%' and the Low↔High track are separated by ~30px of empty space; the number should sit on the thumb.
- Device toggles and the whole-card active state both indicate on/off. Two mechanisms for one property.
- Three screens, three different background treatments (white / brown gradient / light grey). Consistent enough to be a family, inconsistent enough to feel unresolved.

> **Take this.** Product-at-centre, controls-at-edges. And accent-as-liveness.

## 15 &middot; S15 &mdash; DOMIO — modular capsule homes

`App UI Inspiration (2).jpeg`

**DOMIO** &middot; Mobile / architecture &middot; 2 phone screens on grey rock &middot; *Bold industrial*

| | |
|---|---|
| Mode | Dark hero, light sheet (dark-dominant by pixel share) |
| Accent | #C86F5E clay, taken from the renders |
| Surfaces | #18151E · #33242C · #FAFAFA sheet |
| Measured palette | `#74767b` 21% `#fafafa` 18% `#33242c` 18% `#18151e` 15% `#4a4f57` 7% `#c86f5e` 6% `#905241` 5% |
| Patterns | Compound CTA (pill + nested circular button), Concave / inverted corner radius, Floating annotation pills over media, Hotspot markers, Overflow-crop as a scroll affordance, Photography supplies the palette, Pill as the universal container |

**Layout.** Full-bleed render occupying the top ~55%, then a white sheet with a large top radius sliding up over it. Screen 2 continues into a vertical feed of image cards.

**Typography.** 'LIVE SMARTER IN / A CAPSULE HOME' and 'CAPSULE X07 HOME' in a geometric uppercase with wide tracking and a distinctive single-storey 'a'. Body ~10px, sentence case, grey.

**Components**

- Circular '+' hotspot markers laid over the 3D render
- 'CONTACT US' / 'BOOK NOW' black pill with a white circular ↗, straddling the sheet's top edge with the sheet notched around it
- A two-line caption ('Modular homes that adapt as your life evolves') sitting in the notch beside the pill
- Image cards with a chip row burned in: Lounge / Kitchen / Bedroom / Terrace, plus a thumbnail selector

**Signature moves**

- The notched sheet edge. The CTA overlaps the boundary between image and sheet, and the sheet's outline curves around it. It welds the two zones into one object instead of two stacked blocks — the most sophisticated single geometric move in the folder.
- Hotspot markers turn a render into an explorable object and set an expectation of tap-to-reveal.
- The caption occupies the notch — dead space converted into content.

**Where it breaks**

- Hotspots have no numbering, ordering or labels, so there's no reading order.
- The image-card chip row (Lounge/Kitchen/...) sits over photography with no scrim and is barely legible.
- Screen 2's second card is cropped by the phone frame with no partial-row cue beyond the crop itself.

> **Take this.** The notched sheet edge with a CTA straddling it. It is the highest-craft detail here.

## 16 &middot; S16 &mdash; Cycling tracker — greeting, live stats, summary

`App Ui design Inspiration.jpeg`

**unnamed fitness** &middot; Mobile / fitness &middot; 3 phone screens on dark texture &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Dark (dark-dominant by pixel share) |
| Accent | #F24402 orange |
| Surfaces | #0E0F11 page · #232224 card · #353636 raised |
| Measured palette | `#0e0f11` 25% `#232224` 19% `#353636` 15% `#48494a` 14% `#575758` 12% `#696a6d` 5% `#838386` 5% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Number-first stat block, Pill as the universal container, Spec rows with hairline dividers |

**Layout.** Screen 1 is a hero stack. Screen 2 is a stat bento: full-width image, one wide metric card, then a 2-up row. Screen 3 is map + hero metric + a spec list.

**Typography.** 'Enjoy Your / Biking' in a geometric sans at ~24px, semibold, sentence case. Data uses a much larger tabular treatment — '42:06', '3.567', '122', '16.8' all sit around 28–34px.

**Components**

- Greeting row: avatar + 'GOOD EVENING 👋' in orange caps
- 'Get Started' orange pill with a black circular arrow at its right end
- Metric card: big number, unit beneath, label to the side, bookmark button
- One card flooded with accent orange while its neighbour stays dark — colour as emphasis, not decoration
- Map card with an orange route polyline and a white-ringed endpoint dot
- Summary list: label left, value right, hairline dividers, tiny leading icons

**Signature moves**

- Number-first metric cards. The value is set 3× the label; you read '42:06' before you read 'Driving Time'. Every dashboard in this folder that works does this.
- Exactly one card per screen is flooded with the accent. It is the visual answer to 'which number matters?'
- The route drawn as a bare polyline over an abstracted road mesh, with no map chrome at all — the route is the data, the map is texture.

**Where it breaks**

- '3.567 mg/dL — Avg blood pressure' is medically wrong twice: blood pressure is mmHg, not mg/dL, and it isn't a single decimal. Placeholder data that will get quoted back at you in a review.
- 'Driving Time' on a cycling app.
- The Screen 2 header has a back button and a grid button but no title, so the screen has no name.

> **Take this.** Number-first cards, and one accent-flooded card per view.

## 17 &middot; S17 &mdash; NFT marketplace — feed and bid detail

`Modern NFT marketplace app ui design.jpeg`

**unnamed / @beezz** &middot; Mobile / web3 &middot; 2 phone screens on electric-blue satin &middot; *Glass & atmosphere*

| | |
|---|---|
| Mode | Dark (dark-dominant by pixel share) |
| Accent | #4C6CD9 electric blue — from the artwork and the backdrop, not a UI token |
| Surfaces | #0A0A0D shell · #1C2738 glass |
| Measured palette | `#0a0a0d` 32% `#109be1` 13% `#6685d7` 13% `#1c2738` 11% `#122292` 10% `#205cb8` 6% `#b9c8d5` 6% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Glassmorphism / blur panels, Notched card silhouette, Photography supplies the palette, Pill as the universal container, Two-part composite pill, Type rag filled with interface |

**Layout.** Single-column feed with full-width rounded cards. Screen 2 is full-bleed art above a content sheet.

**Typography.** 'NFT MARKETPLACE' in a heavy geometric uppercase, ~26px, split across two lines with an inline pill breaking line one. Body ~9px grey with a 'More' truncation link.

**Components**

- Inline media pill set *inside* the headline — a lozenge of images/emoji occupying the space after 'NFT'
- White rounded-square ↗ button seated in a notch cut from the card's lower-left corner — the card's own outline curves around it
- Circular glass back and heart buttons over artwork
- Floating glass bid bar: 'Min Bid / 3.4 ETH' + creator avatar + @handle
- 'Make Bid' white pill with a black circular ▸ at its *left* end
- Body copy truncated with an inline 'More'

**Signature moves**

- Media inside the headline. A pill of imagery sits in the type's own line, so the headline is part illustration. It is the most unusual typographic idea in the folder and the hardest to reproduce with real content.
- The compound CTA reversed — the circular button on the left instead of the right. Same component, mirrored, and it changes the read from 'go' to 'play'.
- The bid bar packs price and provenance into one 40px strip: what it costs and who made it, the two facts that matter.

**Where it breaks**

- The inline headline pill only works at exactly this string length. Localise it and it breaks.
- Glass buttons over a bright blue artwork sit near 2.5:1.
- Truncated body copy on a *detail* page — the detail page is where the copy should be complete.

> **Take this.** The bid-bar composite (price + creator in one strip) and the mirrored compound CTA.

## 18 &middot; S18 &mdash; MODERA — NFT marketplace dashboard

`Skeleton to final design.jpeg`

**MODERA (posted by Vistora.club)** &middot; Desktop / web3 &middot; Wide app window on violet light-streaks &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Very dark, violet-tinted (dark-dominant by pixel share) |
| Accent | #575C7D violet-grey; white for primary actions |
| Surfaces | #050509 page · #10111A card · #1C1F2B raised |
| Measured palette | `#050509` 34% `#10111a` 21% `#1c1f2b` 20% `#303340` 9% `#6a7279` 4% `#4a4f58` 4% `#88969c` 3% |
| Patterns | Circular icon buttons everywhere, Glassmorphism / blur panels, Photography supplies the palette, Pill as the universal container, Segmented chip filters |

**Layout.** The most conventional dashboard here: utility bar, filter row, then a 3-column bento at roughly 33/34/33 where the right column subdivides into three stacked utility cards. Left column is a single tall card; middle stacks 2. A real, buildable grid.

**Typography.** Uniform sans, 11–20px. 'Trending now🔥' at ~18px is the largest thing on the screen. This is a UI that refuses a display face — appropriate for a marketplace where the artwork is the content.

**Components**

- Utility bar: logo, wide search field with a circular submit, 'App' chip, lock chip, user chip with avatar
- Filter icon + category pills: Art (active) / Collectibles / Avatars / Domains / Music / Games
- Featured card with a floating glass price badge 'Ξ 0.32 / Dreamspace' and a ★ 4.9 rating chip
- 'SLIDE LEFT AND RIGHT' instruction bar with ← → circular buttons — the affordance spelled out in words
- Utility cards each headed by an outlined label chip and closed by a circular ↗
- Inline email capture: field + white 'Subscribe for Drops' button, inside a card

**Signature moves**

- Label chips as card headers. Each right-column card opens with a small outlined chip (TOP CREATORS, JOIN THE COMMUNITY, MARKETPLACE INFO) rather than a plain heading. It makes a stack of unrelated cards read as one family.
- Every card terminates in a circular ↗ in the same corner. Repetition at a fixed position is what turns three cards into a system.
- Writing 'SLIDE LEFT AND RIGHT' out in full is unfashionable and completely honest about the interaction.

**Where it breaks**

- The violet is atmospheric rather than functional; nothing is ever violet *because* of what it is.
- Six category pills, one filter icon and a search field all do filtering, in three different visual languages.
- The file is named 'Skeleton to final design' and contains neither a skeleton nor a progression — treat every filename in this folder as unreliable.

> **Take this.** Chip-as-card-header, and the fixed-corner ↗ repeated across a card family.

## 19 &middot; S19 &mdash; MIRA — fine jewellery

`Smooth Animated web design.jpeg`

**MIRA** &middot; E-commerce / luxury &middot; Tablet in a dark studio with a light shaft &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Near-black (dark-dominant by pixel share) |
| Accent | none — pure monochrome |
| Surfaces | #010101 · #0F0F0F · #FFFFFF pills |
| Measured palette | `#0f0f0f` 33% `#010101` 20% `#404144` 11% `#555559` 8% `#67696d` 6% `#818288` 6% `#9e9fa3` 6% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Photography supplies the palette, Pill as the universal container, Serif for brand, sans for interface |

**Layout.** Three equal image panels with an ~8px gutter, filling roughly 70% of the card height. Below, a single bar: wordmark | description | CTA cluster. Radical restraint — four elements total.

**Typography.** The only high-contrast didone serif in the folder, used twice: once in the logo lozenge and once as an oversized bottom-bar wordmark with a rule beneath it. Everything else is 9px uppercase sans, tracked wide.

**Components**

- White pill lozenge containing the serif logo
- Circular search and bag buttons, then a black 'Contact' pill with an inset icon square
- 3-up product panel grid, edge to edge
- Bottom bar: serif wordmark + rule, two-line description, 'EXPLORE MORE' white pill, separate white circular →

**Signature moves**

- Serif for the brand, sans for the interface. Two typefaces with two jobs and no overlap. This is how luxury retail actually splits type, and it's the only design here that does it properly.
- Zero colour. On jewellery, any hue would compete with metal and stone — the restraint is a merchandising decision, not an aesthetic one.
- The pill and the circular arrow are *separate* objects here rather than a compound button, which reads calmer. Same parts, more air.

**Where it breaks**

- Three products, no prices, no names, no hover state implied. It is a poster, not a shop.
- The 9px tracked uppercase description is at the absolute floor of legibility.
- Panel 1 is grey, panels 2 and 3 are black — inconsistent art direction inside a three-image row.

> **Take this.** Serif-for-brand / sans-for-UI, and the split pill+circle (calmer than the compound version).

## 20 &middot; S20 &mdash; Sorellé — bridal jewellery (meme-framed)

`Sorelle Jewel Website Animation.jpeg`

**Sorellé** &middot; E-commerce / luxury &middot; Website above a designer-vs-developer meme &middot; *Bold industrial*

| | |
|---|---|
| Mode | Deep crimson (dark-dominant by pixel share) |
| Accent | #A30C0A crimson ground with champagne-gold type |
| Surfaces | #5B0505 → #0E0404 radial gradient |
| Measured palette | `#4e0404` 23% `#0e0404` 21% `#2a090c` 16% `#6c0607` 13% `#8b0809` 10% `#af0c0d` 6% `#603330` 4% |
| Patterns | Coverflow depth by scale and luminance, Overflow-crop as a scroll affordance, Serif for brand, sans for interface |

**Layout.** Single hero. Search pill left, wordmark centred, two circular buttons right. Headline left, a small right-aligned paragraph opposite it, then a 5-card coverflow carousel across the base.

**Typography.** The most interesting mix in the folder: an italic serif ('For the') stacked directly above a heavy sans uppercase ('WOMAN YOU ARE'), both in champagne gold. Two voices in one sentence — script for intimacy, sans for assertion.

**Components**

- Coverflow: centre card largest and elevated, neighbours stepped down in scale and brightness, outermost cards cropped by the canvas
- Search as a pill in the header's left slot rather than an icon
- Centred script wordmark
- Right-aligned support paragraph balancing the left headline

**Signature moves**

- Depth via scale and luminance rather than perspective. Each step out from the centre is smaller and darker, so the row has a focal point without any 3D transform.
- The crimson radial gradient is the entire brand identity — no cards, no panels, just a lit field with jewellery floating in it.
- Serif + sans stacked in one headline. Rare, risky, and here it works because both are set in the same gold at the same optical weight.

**Where it breaks**

- Gold on crimson is around 3:1 — the headline survives at that size, the paragraph does not.
- Five cards with no active indicator or counter; you cannot tell where you are in the set.
- The meme framing beneath ('The Designer' / 'The Developer', identical faces) is engagement bait and tells you the pin was optimised for saves, not for craft. Judge the top third only.

> **Take this.** Coverflow depth by scale + luminance, and the serif/sans stacked headline.

## 21 &middot; S21 &mdash; VEXON — gaming controllers

`web design UI inspiration.jpeg`

**VEXON** &middot; E-commerce / tech &middot; Tablet on a blue prism backdrop &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Near-black (dark-dominant by pixel share) |
| Accent | none — white on #111111 |
| Surfaces | #111111 page · #1E1F20 card · #B2B2B3 product tile |
| Measured palette | `#111111` 62% `#1e1f20` 16% `#b2b2b3` 7% `#323335` 5% `#040505` 4% `#4e4e4f` 2% `#666a71` 2% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Concave / inverted corner radius, Photography supplies the palette, Pill as the universal container, Spec rows with hairline dividers |

**Layout.** 40/60. Left is a bento of product tiles with concave corner notches; right is headline, CTA cluster, then a numbered feature list.

**Typography.** A wide techno display face — 'STEP INTO WORLDS / BEYOND REALITY. / PLAY WITHOUT LIMITS.' — with squared terminals and a distinctive angular 'E'. Micro-copy is 7–8px tracked uppercase.

**Components**

- 'VIEW IN 3D' ghost circular button — a large, low-contrast affordance with no border
- Product tiles with inverted corner radii that interlock with their neighbours
- A circular masked product image with a dotted leader line to its caption
- Product cards: name + price + circular '+' add button
- CTA cluster: white 'EXPLORE' pill + circular ↗ + a small product lozenge, all inline
- Numbered feature rows: 01 / description / right-aligned code, hairline rules

**Signature moves**

- Inverted corner radii. Where two tiles meet, the corner curves *inward*, so the tiles interlock like puzzle pieces instead of stacking. This is the folder's defining geometric device and it appears in seven designs.
- The dotted leader line from the circular image to its spec caption — technical-drawing language borrowed into UI.
- The numbered feature list with right-aligned codes reads like a spec sheet, which is exactly right for hardware.

**Where it breaks**

- Feature text is ~7px and grey on near-black — genuinely unreadable at 1×.
- 'VEXON ONE $499' and 'ECLIPSE VRX $499' — same price, and the second card's product is cropped by the frame.
- The techno display face has poor character differentiation at small sizes; it is a display-only choice being used at 8px.

> **Take this.** Inverted corner radii, and the dotted leader-line caption.

## 22 &middot; S22 &mdash; TELOSKIN — skincare

`web design UI inspiration (1).jpeg`

**TELOSKIN** &middot; E-commerce / beauty &middot; Tablet on beige with driftwood and roses &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Black card, warm blob (dark-dominant by pixel share) |
| Accent | #9D7D5F warm sand |
| Surfaces | #181717 card · #9D7D5F → #BE9F82 organic mask |
| Measured palette | `#181717` 28% `#9d7d5f` 27% `#aa8a6d` 14% `#2a2725` 14% `#be9f82` 4% `#5e3a1e` 4% `#5b5652` 3% |
| Patterns | Organic / blob masking, Photography supplies the palette, Pill as the universal container, Serif for brand, sans for interface |

**Layout.** A single black canvas with an organic, hand-drawn beige shape cut out of its centre. The product photograph lives inside the cut-out; the black wraps around it in soft irregular curves.

**Typography.** A high-contrast didone serif for 'TELO SKINCARE' at ~40px and for 'Nature's Care In a Bottle' at ~16px. Body is a 9px sans. Serif for beauty, sans for function — same split as MIRA.

**Components**

- Sparkle glyph + wordmark, centred nav, bag icon + avatar
- Organic blob mask holding the hero photography
- Oversized serif wordmark set into the black negative space at the lower left
- 'Begin your skincare journey' + white 'SHOP NOW' pill at the lower right

**Signature moves**

- The organic mask. Everything else in this folder is built from rectangles and pills; this one is built from a curve that does not repeat. It is the single strongest differentiator in the whole set, and it costs one SVG path.
- The black negative space is the layout. Type sits in the areas the blob leaves behind rather than in a grid.
- Serif type on an organic shape reads as 'botanical' without a single leaf illustration.

**Where it breaks**

- A non-repeating organic mask does not respond to breakpoints. It needs to be re-drawn per size, or it will crop badly.
- The paragraph at the top right is ~8px grey on black — decorative.
- The nav is centred while the wordmark is left — but the blob's asymmetry already pulls right, so the header ends up feeling off-balance.

> **Take this.** The organic mask, used exactly once per page. It is the cheapest way to look unlike everyone else.

## 23 &middot; S23 &mdash; POWERCUBE X — GaN charger

`web design UI inspiration (2).jpeg`

**PowerCube** &middot; E-commerce / hardware &middot; White page on a black louvre backdrop &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Light page, black modules (dark-dominant by pixel share) |
| Accent | #832822 → #C8310B product red |
| Surfaces | #FDFDFC page · #0D0C0C modules · #24201F raised |
| Measured palette | `#0d0c0c` 37% `#24201f` 14% `#fdfdfc` 11% `#3e3c3b` 8% `#979391` 8% `#5c5a5a` 7% `#787776` 7% |
| Patterns | Concave / inverted corner radius, Photography supplies the palette, Pill as the universal container, Spec rows with hairline dividers, Vertical rotated type |

**Layout.** Interlocking bento built entirely from concave notches. The white page and the black modules cut into each other so there is no straight dividing line anywhere in the composition.

**Typography.** 'Compact. / Powerful. / Reliable.' — three words, three lines, three full stops. ~22px semibold. The rhythm *is* the headline; the full stops are the tone.

**Components**

- Black circular logo mark, black search field with a nested pill inside it
- Large hero photo tile with the headline burned into its lower left
- Product cards: heart + bag circular buttons pinned top-right, photo, name, edition in parentheses, price
- A dark spec card with a bulleted feature list
- Vertical rotated text ('Ultra Slim Design') running up a card's edge
- An angled product cut-out overlapping two cells at once

**Signature moves**

- Notch-driven interlock at the whole-page level, not just per component. The page silhouette is one continuous curve.
- Product edition names in parentheses — '(Midnight Edition)', '(Sandstone Edition)' — a small typographic convention that instantly signals a considered product line.
- A cut-out product photo bridging two cells welds the grid together where the notches would otherwise fragment it.

**Where it breaks**

- Both product cards read '$399'. Placeholder pricing again.
- Rotated text is unreadable to screen readers and to anyone in a hurry; it is decoration priced as content.
- Nine visual modules with no clear entry point — the eye has no obvious first stop.

> **Take this.** Page-level notch interlock, and parenthetical edition naming.

## 24 &middot; S24 &mdash; LUMORA — real estate

`web design UI inspiration (3).jpeg`

**LUMORA** &middot; Real estate / marketplace &middot; Dark card on a hot orange gradient &middot; *Bold industrial*

| | |
|---|---|
| Mode | Dark (dark-dominant by pixel share) |
| Accent | #E95203 orange, plus #F5C518-family gold for star ratings |
| Surfaces | #120D09 page · #313435 card · #E95203 CTA |
| Measured palette | `#111111` 54% `#19242a` 15% `#59575c` 6% `#22647f` 6% `#43342f` 5% `#7e8c94` 4% `#a04f25` 3% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Concave / inverted corner radius, Number-first stat block, Pill as the universal container |

**Layout.** Hero split ~45/55 with a concave notch where the text block meets the image, then a 3-up card row at equal thirds.

**Typography.** 'HOMES MADE / FOR TODAY' in a wide grotesque uppercase at ~30px, tight leading. Card titles ~12px semibold, prices ~10px grey.

**Components**

- Sparkle + wordmark, centred nav, circular bell + avatar
- Orange 'Explore homes' button — a rounded *rectangle*, not a pill, and the only one in the folder
- Concave notch joining the text column to the hero image
- Social proof: 3 overlapping avatars + '100k+ / Happy clients', floated over the image's lower edge
- Property cards: 56px thumbnail, title, 'Price: $85,00,00', 5 gold stars, circular ↗

**Signature moves**

- Rounded-rectangle CTA in a folder of pills. It reads as more literal and more clickable — pills read as tags, rectangles read as buttons.
- The gold star row is the only chromatic third colour in any of these designs, and it's justified: ratings are a distinct data type and deserve their own hue.
- Social proof placed at the seam between hero image and card row, so it belongs to both.

**Where it breaks**

- '$85,00,00' is malformed, and it appears three times. So do 'Skyline Villa' and the 5-star rating — three identical cards.
- Five filled stars on every property is not a rating system, it's wallpaper.
- Orange on near-black at ~5:1 is fine for the button, but the orange gradient *behind* the card competes with the button that's meant to be the focal point.

> **Take this.** The rectangle-vs-pill distinction, and giving ratings their own colour.

## 25 &middot; S25 &mdash; LUMORA — smart home

`web design UI inspiration (4).jpeg`

**LUMORA** &middot; IoT / dashboard &middot; Glass card composited into a real dark living room &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Dark glass (dark-dominant by pixel share) |
| Accent | none — greyscale with photographic warmth |
| Surfaces | #07080B · #212328 · #36373F |
| Measured palette | `#252526` 23% `#0f0f0f` 19% `#35373a` 14% `#828383` 11% `#4c4c4c` 8% `#8c9da7` 8% `#676665` 7% |
| Patterns | Circular icon buttons everywhere, Detached / floating chrome, Floating annotation pills over media, Glassmorphism / blur panels, Inverted active state, Photography supplies the palette, Pill as the universal container, Segmented chip filters |

**Layout.** Hero card with room chips floating at its top-right, then a 3-up utility row at roughly 40/28/32.

**Typography.** 'YOUR SMART / HOME, YOUR WAY.' in a wide techno face with an angular 'A' and 'R'. UI text 9–11px.

**Components**

- Nav with a filled grey active pill; search as a wide pill; avatar
- Room chips: Room 01 / Room 02 / Room 03 in a rounded container that overlaps the hero's top edge
- White 'View video' pill
- Floating glass camera card: thumbnail + 'Camera on cafe n4' + '12:00 - 5:00' + circular ›
- Smart-lock card with a '› › ›' dotted swipe track between two circular buttons
- '75%' stat card with a circular pencil (edit) button
- Room card with a white 'View' pill

**Signature moves**

- The composite. This isn't a mockup on a background — the UI is lit *by* the room behind it, with the window reflections falling across the glass. It sells the product context in a way a flat render cannot.
- The swipe-to-unlock track with chevrons between two circular buttons: a physical gesture drawn as a component.
- Room chips overlapping the hero's edge rather than sitting in the nav — filters that belong to the content, positioned on the content.

**Where it breaks**

- Glass over a dark room means text contrast varies with the photograph. In the lower-left card it is genuinely poor.
- '75%' with no unit and no label above the fold — 75% of what?
- Three utility cards, three different interaction models (swipe, edit, view). No shared card grammar.

> **Take this.** Compositing the UI into a real photograph of its own use context. And the swipe track.

## 26 &middot; S26 &mdash; LUMORA — dark luxury furniture

`web design UI inspiration (5).jpeg`

**LUMORA** &middot; E-commerce / furniture &middot; Tablet on a dark sofa &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Very dark warm (dark-dominant by pixel share) |
| Accent | #856750 warm bronze from photography |
| Surfaces | #0F0D0B · #241F1A · #39332D |
| Measured palette | `#020202` 29% `#13110f` 14% `#2b2521` 11% `#3f3830` 10% `#91867d` 8% `#584f47` 7% `#d2ccc7` 7% |
| Patterns | Photography supplies the palette, Pill as the universal container, Serif for brand, sans for interface, Two-part composite pill, Vertical rotated type |

**Layout.** Vertical nav rail on the left (~90px), then a 3-up product row, then a 2-up row of one wide image card and one dark text card.

**Typography.** The LUMORA wordmark is set in a high-contrast serif with a sparkle glyph; 'Modern Living, Redefined' and 'EVERY PIECE, EVERY STYLE' are also serif. Prices and labels are sans. Serif for voice, sans for data.

**Components**

- Vertical side nav in a rounded dark panel, with a • bullet marking the active item and a ⌄ at the foot
- 'New Collection' badge pinned to the rail's bottom corner
- Two-part price pills: '$390 | Loop Form' — price and product name in one lozenge, split by a divider
- Glass caption block over the lifestyle image with a serif heading
- Vertical rotated tab on an image's right edge: 'Drift Lounge $620'
- Dark card with a serif heading and a circular →

**Signature moves**

- The two-part price pill. Price and name in a single component, divided by a hairline. It is more compact than a caption and more scannable than a tooltip — the best small component in the folder.
- A vertical nav rail on a *retail* site, which is unusual and buys the content full horizontal width.
- Serif for every human sentence, sans for every number. A clean, enforceable rule.

**Where it breaks**

- The vertical rail's items are ~9px grey on near-black and the active bullet is tiny — navigation should never be the least legible thing on screen.
- The rotated 'Drift Lounge $620' tab is unreadable without tilting your head, and it carries a price.
- At these luminance levels, a phone at 40% brightness in daylight shows a black rectangle.

> **Take this.** The two-part price pill, and the serif-sentences / sans-numbers rule.

## 27 &middot; S27 &mdash; MODISK — rugged SSD

`web design UI inspiration (6).jpeg`

**MODISK** &middot; E-commerce / hardware &middot; Black-framed page on grey concrete &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Light modules in a black frame (light-dominant by pixel share) |
| Accent | #CC3109 red-orange |
| Surfaces | #040303 frame · #FEFEFE panel · #CC3109 accent block |
| Measured palette | `#fefefe` 27% `#c8310b` 17% `#040303` 14% `#c8c6c8` 9% `#e5e5e8` 9% `#aba6a7` 6% `#272121` 5% |
| Patterns | Circular icon buttons everywhere, Concave / inverted corner radius, Number-first stat block, Pill as the universal container, Segmented chip filters, Vertical rotated type |

**Layout.** Swiss/brutalist bento in four zones: a rotated-wordmark column, a white statement panel, a red statistic block, and a full-height photography column on the right. Modules interlock via concave notches; the black frame shows through every seam.

**Typography.** The most confident typography in the folder. A heavy neo-grotesque, uppercase, at three scales: the rotated MODISK wordmark (~150px cap height), the headline (~19px), and a single numeral '20' at ~46px with a small 'hr' hung off its baseline.

**Components**

- Vertical rotated wordmark, bottom-to-top, in ultra-bold black on white
- Spec chips alternating filled-black and outlined: SHOCKPROOF ● / IP68 RATING ○ / DUSTPROOF ● / SMART SLEEP MODE ● / THERMAL STABILITY ○
- Orange lightning glyph + 'UP TO 1050 MB/S'
- A white circular ↗ sitting in the concave notch between the white panel and the red block
- Big-numeral statistic: '20' with 'hr' as a subscript, plus '• Charging Time 90 minutes'
- Bulleted spec card with an outlined 'EXPLORE NOW' pill

**Signature moves**

- The rotated wordmark as a structural column. It isn't decoration — it occupies and defines a whole grid column, and it's the reason the layout has an anchor.
- Alternating chip fills. Filled/outlined/filled/filled/outlined creates a rhythm across a chip set that would otherwise be a grey mush. Nothing semantic about it — pure visual pacing.
- The circular button parked *in* the notch. The negative space between two modules becomes the button's home, so the button costs no layout space at all.
- Three colours, hard-edged: black, white, one red. No gradient, no glass, no blur, anywhere.

**Where it breaks**

- The alternating chip fill has no meaning, which means a user will look for one and fail to find it.
- The right photo column carries two unrelated product shots stacked with no caption or hierarchy.
- '20 hr' battery and '90 minutes' charging both live in the red block, but the '90 minutes' is set at 9px against a 46px numeral — the second fact is effectively hidden.

> **Take this.** The rotated structural wordmark, the button-in-the-notch, and hard three-colour discipline. This is the most reproducible design here.

## 28 &middot; S28 &mdash; VR / AR eyewear store

`web design UI inspiration (7).jpeg`

**unnamed** &middot; E-commerce / tech &middot; Black card in a sci-fi corridor &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Near-black (82% of pixels below 6% luminance) (dark-dominant by pixel share) |
| Accent | #CB4606 amber — from the goggle lens, echoed nowhere in the chrome |
| Surfaces | #010101 · #111213 · #2C2C2C |
| Measured palette | `#010101` 56% `#111213` 12% `#2c2c2c` 9% `#454546` 6% `#767576` 4% `#f2f4f6` 4% `#cfd1d3` 4% |
| Patterns | Compound CTA (pill + nested circular button), Overflow-crop as a scroll affordance, Photography supplies the palette, Pill as the universal container, Segmented chip filters |

**Layout.** Left icon rail, then a hero occupying ~70% of the height with the model cut out and bleeding across the panel, then a promo card lower right.

**Typography.** A wide techno display with an exaggerated tall thin 'I' and 'T' — 'STEP INTO / THE FUTURE'. Subtitle 'EXPERIENCE IMMERSIVE REALITY' tracked out to ~0.25em. Micro-copy 7–8px.

**Components**

- Vertical icon rail with avatar, plus a mini product card ('NEW') and a white 'Get now' pill hanging off its foot
- Outlined category chips: VR Glasses / AR Glasses / MR Glasses — cut as slanted parallelograms, not pills. The only place in the whole corpus where a filter chip is not fully rounded
- Search field with a circular icon button inside it
- '›››' chevron motif preceding a 3-up thumbnail strip that runs off the right edge
- Promo card: '40% OFF / ON ALL GLASSES' + outlined 'SHOP NOW' pill + product render

**Signature moves**

- A product card docked to the bottom of the nav rail. The rail stops being pure navigation and becomes a merchandising slot — an unusual and quite commercial idea.
- The thumbnail strip deliberately runs off-canvas as its own scroll affordance, preceded by chevrons that point at the overflow.
- The only warm colour on screen is inside the product. The interface itself has no accent at all, so the goggles read as the hero by default.
- Slanted chips instead of pills. One shape decision, and the filter row stops reading as generic UI and starts reading as visor geometry.

**Where it breaks**

- This is the darkest design in the folder — 82% of its pixels are below 6% luminance. Almost every text element is under 4.5:1.
- The rail's icons have no labels or tooltips and several are ambiguous at 12px.
- '40% OFF' is the largest text on the lower half but sits in the least prominent corner.

> **Take this.** The merchandising slot docked to the nav rail, and letting the product supply the only colour.

## 29 &middot; S29 &mdash; CREATORA — smart home dashboard

`Web ui Inspiration (2).jpeg`  ·  *duplicate of this file also in folder: `Web ui Inspiration (7).jpeg`*

**CREATORA** &middot; IoT / dashboard &middot; Tablet composited into a warm-lit lounge &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Light bento on a black shell (light-dominant by pixel share) |
| Accent | none — pure greyscale, with one green product render |
| Surfaces | #0C0D0D shell · #FAFAFA card · #E6E8E7 inner · #ACACAA muted |
| Measured palette | `#fafafa` 32% `#0c0d0d` 18% `#acacaa` 9% `#e6e8e7` 9% `#c5c7c5` 8% `#1c1f1e` 7% `#403c3a` 6% |
| Patterns | Capsule bar chart, Circular icon buttons everywhere, Inverted active state, Light island in a dark shell (and its inverse), Metric chip row on media, Number-first stat block, Overflow-crop as a scroll affordance, Photography supplies the palette, Pill as the universal container, Segmented chip filters |

**Layout.** Black top bar, then a 2-row bento at roughly 22/48/30 over 25/45/30. Six cards, one gutter value, no nesting deeper than two levels. The most disciplined grid in the folder.

**Typography.** One sans, four sizes: 15px card titles, 12px row labels, 10px sub-labels, and 20px for the two hero percentages. Mixed-size inline runs ('**67%** Average usage') let a stat and its caption share a single line.

**Components**

- Segmented tabs as icon+label pills, active one filled white
- Media card: album art, 'Smart TV / Living room', prev · black circular pause · next
- Room photo card with a '• Live' chip and a footer row of metric chips (24°C · 30% · 350W · 80%)
- 'Living room ⌄' dropdown pill floated on the photo
- Rooms card: circular icon + name + 'n devices' + iOS toggle, active rows dark, inactive rows grey
- Energy chart: seven fully-rounded capsule bars, exactly one (Thursday) filled black, a pill tooltip carrying that bar's value floating above it, day labels beneath, no axes and no gridlines
- Lights card: product render, room dropdown, ‹ ›, device row with toggle, black brightness slider at 70%

**Signature moves**

- Light bento inside a black shell. Inverting the usual dark-dashboard convention makes dense data far easier to read while the frame still feels premium. The single best structural decision in the folder.
- Capsule bar charts. Bars with a radius equal to half their width, no axes, no gridlines, exactly one bar highlighted, its value in a floating pill. A chart reduced to the two things a person actually wants: the shape, and today's number. (The tooltip's own digits are set so small they're at the edge of legibility, which is the pattern's one flaw.)
- The Rooms list is deliberately clipped by the card's lower edge so a partial row shows — scroll signalled by cropping instead of a scrollbar.
- Mixed-size inline text: '67%' at 20px sitting in the same line as 'Average usage' at 10px. Two hierarchy levels in one line of prose.

**Where it breaks**

- No accent colour anywhere, so nothing is ever urgent. A smart-home dashboard with no way to say 'this needs you' is missing a state.
- Grey-on-grey sub-labels ('2 devices') sit near 3:1.
- Both the Lights card and the Rooms card control lights, in two different ways.

> **Take this.** All of it. The light-bento-in-dark-shell, the capsule chart, the clipped list, mixed-size inline stats.

## 30 &middot; S30 &mdash; Reson — craft furniture

`Web ui Inspiration (3).jpeg`

**Reson** &middot; E-commerce / furniture &middot; Light card on woven-chair photography &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Light (light-dominant by pixel share) |
| Accent | #CDA275 desert sand, from photography; black for every control |
| Surfaces | #FEFEFE page · #E6E6E6 stat card · #313435 dark cards |
| Measured palette | `#fefefe` 36% `#313435` 13% `#cda275` 11% `#e6e6e6` 7% `#14110f` 7% `#767171` 6% `#685444` 6% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Concave / inverted corner radius, Notched card silhouette, Number-first stat block, Photography supplies the palette, Pill as the universal container, Type rag filled with interface |

**Layout.** 45/55 split, hero image right. The left column is where the real idea is: the headline is a three-line ragged-right block, and the ragged space in lines 2 and 3 is *filled with UI*.

**Typography.** A heavy condensed grotesque, uppercase, at ~40px with ~0.85 leading — 'CRAFTING OBJECTS / FOR MODERN / HOMES'. Stat numerals ('120', '25+') are set at ~26px against 9px labels.

**Components**

- Stat block: a black '120 / Signature Pieces' card sitting inside a larger light-grey container whose lower half carries '25+ / Design Awards', an overlapping-circles glyph and a black circular →
- 'NEW COLLECTION / Autumn 2026 · 12 Signature Pieces' image card with a corner ↗
- Avatar stack tucked into the headline's line-2 rag
- Black 'EXPLORE COLLECTION ↗' compound pill tucked into the line-3 rag
- Tracked-out uppercase footer links: COLLECTIONS / MATERIALS / LOOKBOOK / JOURNAL
- Tinted glass caption bar on the hero: 'ELOISE LOUNGE CHAIR' + 'Designed for contemporary living' + a black circular ↗ half-outside the bar in a white notch

**Signature moves**

- Filling the type's rag with interface. An avatar stack on one line, a CTA on the next — the headline and the controls occupy one optical block instead of stacking. Nobody else in this folder does it and it is the freshest layout idea here.
- A black card nested inside a grey one, so two stats read as a set with a hierarchy rather than as twins — and the nesting means one border does the work of two.
- The caption bar's circular button breaks the bar's own boundary and sits in a white notch cut from the image — the notch language applied at component scale.

**Where it breaks**

- Rag-filling only works at this exact string length in this exact language. Translate 'CRAFTING OBJECTS FOR MODERN HOMES' into German and the layout collapses.
- The avatar stack has no label, so it's social proof that proves nothing.
- The footer links look like a nav but sit below the fold of a hero — an orphan row.

> **Take this.** Rag-filling — but only for a hero you control the copy of. And the notched caption-bar button.

## 31 &middot; S31 &mdash; Japan travel — immersive hero

`Web ui Inspiration (4).jpeg`

**unnamed travel** &middot; Travel / editorial &middot; Translucent frame over shrine photography &middot; *Glass & atmosphere*

| | |
|---|---|
| Mode | Dark, photo-driven (dark-dominant by pixel share) |
| Accent | none — white and glass only |
| Surfaces | #07080B · #212328 glass · #FCFCFD notched panels |
| Measured palette | `#07080b` 23% `#36373f` 18% `#212328` 15% `#484850` 13% `#fcfcfd` 10% `#605c61` 8% `#7d777a` 6% |
| Patterns | Circular icon buttons everywhere, Concave / inverted corner radius, Glassmorphism / blur panels, Number-first stat block, Photography supplies the palette, Pill as the universal container, Scroll / position indicator |

**Layout.** One full-bleed photograph with UI carved into its corners. Nothing sits *on* the image in a rectangle — every element is notched into it.

**Typography.** 'EXPERIENCES / THAT GO BEYOND / DESTINATIONS' in a wide condensed uppercase at ~26px with ~1.15 leading. Stat numerals at ~17px over 8px labels.

**Components**

- Top-left: logo + nav with an underline on the active item
- Top-right, in a notched cut-out: a white pill holding Instagram / X / Facebook circular icons plus a black 'Explore Now ↗' pill
- Circular ▶ + 'WATCH MOVIE'
- Right edge: a vertical scroll indicator, '01' at the top, '04' at the bottom, a thin track between
- Bottom-right glass card: 'EXPERIENCE JAPAN' + copy + outlined 'Explore Japan' button
- Bottom-left, in a concave notch: a white stat bar — 6,800+ Islands / 2,000+ Years of History / 2,000+ Temples & Shrines

**Signature moves**

- UI carved into the photograph rather than laid on top of it. Both corner clusters are notches subtracted from the image, so the image's silhouette is doing the framing. The most elegant use of the notch idiom in the folder.
- The 01–04 vertical scroll indicator gives the page a length before you've scrolled. Rare, and genuinely useful.
- Three stats, one bar, no icons. '6,800+ Islands' is a fact that sells a country better than any adjective.

**Where it breaks**

- '2,000+' appears twice with two different units, which reads as a copy error even though it may be true.
- The nav sits directly on unscrimmed photography and is the least legible element on screen.
- Notched corners mean the photograph's crop is load-bearing — change the image and the composition breaks.

> **Take this.** Carving UI into the image's corners, and the numbered scroll indicator.

## 32 &middot; S32 &mdash; LUMORA — furniture, warm dark

`Web ui Inspiration (5).jpeg`

**LUMORA** &middot; E-commerce / furniture &middot; Tablet against a curtained brown wall &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Warm dark (dark-dominant by pixel share) |
| Accent | #856750 bronze from photography |
| Surfaces | #110C0A · #2C2018 · #402F24 |
| Measured palette | `#4e3c30` 24% `#372820` 18% `#856750` 12% `#1d1411` 11% `#5c504e` 8% `#b8957f` 8% `#6e4930` 7% |
| Patterns | Detached / floating chrome, Floating annotation pills over media, Hotspot markers, Photography supplies the palette, Pill as the universal container, Segmented chip filters |

**Layout.** Hero card, then a 3-up row at roughly 42/26/32. Room chips float at the hero's top-right, overlapping its edge.

**Typography.** 'FURNITURE DESIGNED FOR / MODERN LIVING' in a wide grotesque uppercase, ~22px. Card headings ~13px sentence case. A cleaner, less mannered voice than S26's serif treatment of the same brand.

**Components**

- Sparkle + LUMORA, centred nav, white 'Contact Us' pill
- Room filter chips in a rounded container: Living / Bedroom / Workspace
- White 'Shop Collection' rounded-rectangle button
- 'Signature Lounge Chair' card with a 'Featured' chip and a 'Shop now' text link
- 'Refined Forms / Simplified components for cleaner design' card with a circular ↗
- 'Closer Look' card with circular '+' hotspot markers on the product photo

**Signature moves**

- The whole composition sits inside a 20-luminance-point band. Everything is brown-black on brown-black, and separation comes entirely from edge radius and a 1px lighter border. It's the most tonally unified design here.
- Room chips as content-level filters floated on the hero, not in the nav — the same move as S25, so it's a house pattern rather than a one-off.
- 'Closer Look' with hotspots is a third interaction model in a three-card row, and unlike S25 it's labelled, so it works.

**Where it breaks**

- Tonal unity costs contrast: body copy sits near 2.5:1 in places.
- Three cards, three CTA types again (chip+link, circular arrow, hotspots).
- 'Refined Forms — simplified components for cleaner design' is design-speak in a furniture store.

> **Take this.** Tonal-band composition — separation by radius and hairline instead of by luminance. Handle with care.

## 33 &middot; S33 &mdash; THE AWAKENING — synthetic consciousness

`Web ui Inspiration (6).jpeg`

**unnamed concept** &middot; Concept / editorial &middot; Sharp-cornered frame, cinematic &middot; *Glass & atmosphere*

| | |
|---|---|
| Mode | Very dark teal (dark-dominant by pixel share) |
| Accent | #0F282C teal-black; a cyan-white glint from the render |
| Surfaces | #050B11 · #0E2024 · #142F36 |
| Measured palette | `#0e2024` 29% `#142f36` 20% `#050b11` 13% `#303e42` 9% `#415055` 9% `#556466` 7% `#292a2b` 7% |
| Patterns | Photography supplies the palette, Square corners as genre signal |

**Layout.** Full-bleed portrait, centred. UI is pushed entirely to the left and right margins, leaving the face untouched. Corners are square — the only framed interface here that refuses the radius. (Two others have square edges, but only because they are uncropped full-page screenshots rather than framed devices.)

**Typography.** The only monospace/techno pairing in the folder. 'THE' in a light weight above 'AWAKENING' in a heavy one, both uppercase, at ~30px. Status cards use a squared, terminal-style face. 'SUBJECT 001' is letter-spaced ~0.2em.

**Components**

- Nav items with leading bullet dots: • ARCHIVE / • RESEARCH (active) / • EVOLUTION
- Centred sparkle brand mark, circular grid button at the top right
- Outlined status cards: 'ACTIVE / STATUS' and '009 / VERSION'
- Outlined tag chips: CORE LINK / GENESIS 001 / AWARENESS / COGNITION / NEURAL SYNC
- 'SUBJECT 001' thumbnail card with a caption bar

**Signature moves**

- Square corners as a deliberate genre signal. Every other framed interface here is rounded; this one is hard-edged, and it instantly reads as clinical, archival, machine.
- Status cards borrowed from instrumentation — value on top, tiny label beneath, thin outline, no fill. 'ACTIVE / STATUS' is a readout, not a badge.
- Type weight, not colour, carries the headline: light 'THE' over heavy 'AWAKENING'. The contrast is structural.
- The subject's face is kept clear of every element — the layout is composed around the image rather than over it.

**Where it breaks**

- The five tag chips carry no data and no destination; they are set dressing pretending to be filters.
- Contrast is the worst here of anything in the folder: outlined chips at maybe 1.8:1 against the background.
- Nothing indicates what any control does. It is a poster with UI-shaped ornament — beautiful, and not an interface.

> **Take this.** Square corners when you want 'machine'. Instrumentation-style status cards. Weight-contrast headlines.

## 34 &middot; S34 &mdash; HORIZN — architecture study

`Web ui Inspiration (8).jpeg`

**HORIZN®** &middot; Architecture / portfolio &middot; Dark card on a red reflective backdrop &middot; *Glass & atmosphere*

| | |
|---|---|
| Mode | Dark with a coral panel (dark-dominant by pixel share) |
| Accent | #CB675E coral / salmon gradient |
| Surfaces | #0E0B11 · #332A33 · #CB675E panel |
| Measured palette | `#0e0e11` 41% `#332a33` 14% `#c36058` 12% `#924644` 8% `#4a565f` 6% `#e68374` 5% `#f8eee6` 4% |
| Patterns | Circular icon buttons everywhere, Pill as the universal container |

**Layout.** 60/40. Left is thumbnails → headline → body → social row. Right is a tall coral panel that carries its own nav.

**Typography.** 'SPACE DEFINED / BY LIGHT AND / SILENCE' in a wide rounded-techno uppercase with single-storey 'a' and a distinctive 'n' — roughly 26px, tight leading. Body ~8px.

**Components**

- 3-up project thumbnails with glass caption chips: SHELTER / VOLUME / HORIZON
- Circular outlined ↵ button beside the body copy
- Social row: a pill container holding INSTAGRAM / FACEBOOK / TWITTER / DISCORD, plus a separate 'FOLLOW US →' pill
- Right panel: 'HORIZN®' chip top-left, right-aligned nav (ABOUT US / OUR SERVICES / CONTACT), 3D dome render
- Glass 'Quiet Dome' card with a heart button, and a circular grid button

**Signature moves**

- Nav inside a content panel. Moving ABOUT/SERVICES/CONTACT into the coral column instead of the top bar frees the header entirely and makes the panel feel like a poster within the page. Unconventional and it works.
- The coral gradient panel is the only large chromatic field in the folder that isn't photography — a designed colour, not a sampled one.
- Social links split into two components (a container pill for the platforms, a separate pill for the action) so 'where I am' and 'what to do' stay distinct.

**Where it breaks**

- Nav inside the panel will be missed by anyone scanning the top bar for it.
- The ® on HORIZN in a student-style study is a small credibility tell.
- Coral against near-black at these values is around 4.5:1 — fine for the panel, marginal for the small nav text sitting on it.

> **Take this.** Nav-in-panel for portfolio work, and splitting social-presence from social-action.

## 35 &middot; S35 &mdash; DOMIO — interior design browser

`Web ui Inspiration (10).jpeg`

**DOMIO** &middot; Real estate / interiors &middot; Glass card composited into a lounge &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Dark glass (dark-dominant by pixel share) |
| Accent | none — warm neutrals from photography |
| Surfaces | #0E0D0D · #222121 · #443F3D · #FFFFFF cards |
| Measured palette | `#222121` 17% `#716b69` 13% `#443f3d` 11% `#877e7a` 10% `#0e0d0d` 9% `#9f9691` 9% `#fcfcfc` 9% |
| Patterns | Circular icon buttons everywhere, Detached / floating chrome, Glassmorphism / blur panels, Inverted active state, Light island in a dark shell (and its inverse), Photography supplies the palette, Pill as the universal container, Serif for brand, sans for interface |

**Layout.** Three columns at roughly 22/50/28. Left stacks an image card over a white text card; centre is one hero; right is a list panel over an image card.

**Typography.** 'Modern Minimalist / Architecture' in sentence case, ~19px, with a rule underlining only the first line. Row labels 11px, counts 9px grey.

**Components**

- Floating control cluster over the hero: a circular hamburger + a white pill nav (Home/Collections/Saved) + a black 'CONTACT' pill — three separate objects on one line
- Headline set directly on the photograph, positioned so the room's own lit ceiling edge runs between its two lines
- Avatar stack + 'Designed By' floated on the image's lower left
- Glass 'View Japandi' pill with an inline thumbnail
- 'Design Styles' list: thumbnail + name + 'n Homes' + chevron; active row inverts to white
- White 'EXPLORE ALL STYLES' pill closing the list
- Image card with a centred 'EXPLORE' label

**Signature moves**

- The headline is placed so the photograph's illuminated ceiling edge falls between its two lines, and it reads as a typographic rule. It isn't one — there is no drawn divider here. Worth knowing both ways round: the effect is free when the image gives it to you, and unrepeatable when it doesn't.
- Chrome as three separate floating objects rather than one bar. Same idea as WAVEN, applied to a browse page.
- The list panel here is the light island in a dark shell again — the same device as S01, in a different vertical.

**Where it breaks**

- The hero's pill nav and the 'Design Styles' list are two different navigations with no visual distinction between navigating and filtering — and the pill nav sits on unscrimmed photography.
- The white text card in the left column has nothing to do with the image above it; they're glued together by grid position only.

> **Take this.** Chrome as three separate floating objects, and the light list-island in a dark shell.

## 36 &middot; S36 &mdash; Reson — wireless speaker PDP

`Web ui Inspiration (11).jpeg`

**Reson** &middot; E-commerce / audio &middot; Dark card on volcanic rock &middot; *Dark product / hardware*

| | |
|---|---|
| Mode | Very dark, deliberately low-contrast (dark-dominant by pixel share) |
| Accent | #8DA7B3 mist blue — the product's own colourway |
| Surfaces | #101011 page · #1A1B1E card · #282B32 raised · #2E3B45 tint |
| Measured palette | `#1a1b1e` 37% `#282b32` 15% `#2e3b45` 12% `#0f0f11` 11% `#7e8691` 7% `#474d56` 6% `#606973` 4% |
| Patterns | Circular icon buttons everywhere, Photography supplies the palette, Pill as the universal container, Spec rows with hairline dividers |

**Layout.** 50/50 hero. Left is one large product image; right stacks a statement card, a five-row feature list, a section bar, and two colourway cards. Vertical rhythm on the right is strict — every row is the same height.

**Typography.** Small and even throughout: 13px headings, 10px labels, 8px sub-labels. There is no display type anywhere. The product is the display element.

**Components**

- '✦ Reson' wordmark with a four-item micro-nav
- Product card with a glass 'Mist Blue' caption pill in its lower-right corner
- Statement card: 'Designed to Sound Better. / Built to Look Better.' with body copy anchored to the card's bottom
- Feature list: five rows, each a bold label over a grey sub-line, separated by hairlines and no icons
- 'Find Your Style' bar with an 'Explore Finishes' link at the opposite end
- Colourway cards: 'Matte Black' and 'Arctic Silver', each with a small label chip at the top left

**Signature moves**

- Colourway-as-card. Each finish gets its own photographed card rather than a swatch dot, so you buy the object you can see. For a product where finish *is* the differentiator, this is the correct pattern.
- The five-row feature list with no icons at all. Most designers would add five glyphs; leaving them out keeps the eye on the words and the rhythm.
- Copy anchored to the bottom of its card, leaving deliberate empty space above. Silence used as a layout element on a product about sound.

**Where it breaks**

- Roughly 74% of pixels sit below 6% luminance and the text is grey. This is the second-least-legible design in the folder.
- 'Explore Finishes' and the two colourway cards do the same job, ten pixels apart.
- Only two of three colourways are shown, with no 'view all' — an incomplete set presented as complete.

> **Take this.** Colourway-as-photographed-card, and iconless feature lists.

## 37 &middot; S37 &mdash; Smart home dashboard with icon rail

`Web ui Inspiration (12).jpeg`

**unnamed (CREATORA family)** &middot; IoT / dashboard &middot; Tablet composited into a warm lounge &middot; *Data & dashboards*

| | |
|---|---|
| Mode | Light bento on a black shell (light-dominant by pixel share) |
| Accent | a single crimson logo tile; otherwise greyscale |
| Surfaces | #0D0A07 shell · #F1F2F2 card · #ECEDEC inner |
| Measured palette | `#ecedec` 30% `#fdfdfd` 14% `#222223` 9% `#0d0e0e` 9% `#a3a2a0` 8% `#b9b9b8` 8% `#cbd4d8` 6% |
| Patterns | Circular icon buttons everywhere, Detached / floating chrome, Floating annotation pills over media, Glassmorphism / blur panels, Inverted active state, Light island in a dark shell (and its inverse), Metric chip row on media, Number-first stat block, Pill as the universal container |

**Layout.** Adds a 48px icon rail to S29's layout, then a 2-row bento at roughly 55/45 over 40/26/34. Same gutter, same radii.

**Typography.** Identical system to S29 — one sans at 15/12/10, with big numerals for stats.

**Components**

- Icon rail with a crimson logo tile, MAIN and SETTINGS groups, avatar at the foot
- Room photo card with a '• Live' chip and metric chips (24°C · 50% · 350W · 80%)
- Rooms card: rows with chevrons, active row inverted to black, closed by a black '+ ADD ROOM' pill
- Vacuum card with leader-line callouts — thin lines running from the product to floating pills ('70% Filter status', '10:00 AM Next cleaning')
- Three stat chips beneath: black circular icon + value + label (75 m² area cleaned · 30 min cleaning time · 80% battery charge)
- Lights card, dark, with a white brightness slider at 70%
- Speakers card with circular album art wrapped in a ring progress indicator, 0:34 / 2:27, transport row

**Signature moves**

- Leader-line callouts. Thin lines connect points on the product photo to floating label pills — the exhibition-diagram idiom brought into a dashboard. It's the most advanced annotation pattern in the folder and the only one that anchors to a specific point rather than floating vaguely.
- Ring-progress album art. Playback position drawn as a circle around the artwork instead of a bar beneath it — compact, and it makes the art the control.
- '+ ADD ROOM' as a black pill terminating the list. Every list in a well-built dashboard should end with its own create action; this is the only one here that does.

**Where it breaks**

- Compare with S29: that one uses toggles in the Rooms list, this one uses chevrons. Same brand family, two different row grammars.
- The three stat chips duplicate the leader-line callouts' job — the same card explains itself twice.
- Ring progress has no visible scrub affordance, so it reads as output-only.

> **Take this.** Leader-line callouts and ring-progress artwork. And ending lists with a create action.

## 38 &middot; S38 &mdash; Ambient lamp brand — full page scroll

`Web ui Inspiration (1).jpeg`

**unnamed (LOMORA family)** &middot; E-commerce / lighting &middot; Full page on amber driftwood photography &middot; *Warm minimal retail*

| | |
|---|---|
| Mode | Dark hero, light body (split-dominant by pixel share) |
| Accent | #472008 warm brown from photography |
| Surfaces | #14100E hero · #FEFEFE body · #000000 marquee |
| Measured palette | `#fefefe` 30% `#14100e` 28% `#472008` 9% `#4c4236` 6% `#7a654f` 6% `#988770` 6% `#d2ccc0` 5% |
| Patterns | Circular icon buttons everywhere, Compound CTA (pill + nested circular button), Marquee ticker as chapter divider, Overflow-crop as a scroll affordance, Photography supplies the palette, Pill as the universal container, Vertical stagger on a card row |

**Layout.** Three chapters: dark hero (S10's comp), a light editorial section, then the black marquee. The editorial section runs a three-column head (label / paragraph / CTA) above a 3-up product row whose cards sit at *different vertical offsets*.

**Typography.** 'THE EDIT' and 'OUR PHILOSOPHY' as ~11px tracked uppercase eyebrow labels; product names ~10px on glass. The page has no large type after the hero — everything is small, quiet and evenly weighted.

**Components**

- Three-part section header: 'THE EDIT' left, 'OUR PHILOSOPHY' + paragraph centre, 'Enter Collection' compound pill right
- Staggered 3-up product cards — each card offset vertically from its neighbour
- Glass caption bars burned into each card's foot: name + 'Warm ceramic lighting' + a heart button
- A ‹ › circular pair floating above the row, right-aligned
- Black marquee ticker: 'Designed to Be Lived With ✦'

**Signature moves**

- Vertical stagger. Three cards at three different y-offsets turn a product row into an editorial composition. It costs one CSS value and it is the difference between a catalogue and a magazine.
- The three-part section header — label, paragraph, action — is a reusable chapter opener that works for any section on any site.
- The marquee ticker recurs from S04, confirming a shared design system across these brand comps rather than one-off styling.

**Where it breaks**

- Staggered cards make the row's bottom edge ragged, which fights the section below it.
- Product names are ~9px white on glass over photography, at maybe 3:1.
- The carousel arrows sit above the row and right-aligned, far from the cards they move.

> **Take this.** Vertical stagger on a product row, and the three-part chapter header.

---

# Part three &mdash; Pattern index

Twenty-nine recurring devices, ordered by frequency. The count is the number of designs using each. Remember the caveat: this is one designer's portfolio, so these frequencies describe personal habits, not industry consensus.

### Pill as the universal container &mdash; 33/38

Every non-card element in this corpus is a pill: nav, chips, buttons, badges, tooltips, captions, dropdowns, even the search field. Radius is always half the height, so the shape is scale-independent.

*Rule of thumb:* radius: 999px on anything under ~56px tall; 16–24px on anything above.

*Seen in:* S01, S04, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S21, S22, S23, S24, S25, S26, S27, S28, S29, S30, S31, S32, S34, S35, S36, S37, S38

### Photography supplies the palette &mdash; 24/38

The interface is greyscale or near-monochrome; every saturated tone in the composition comes from the product photograph, the 3D render or the album artwork. The 'accent' is a lens, not a token. Twenty-five designs carry no UI accent at all — these twenty-four plus the greybox wireframe, which has no photography either.

*Rule of thumb:* if the accent only exists in the photo, it cannot carry state. Budget a real UI accent separately.

*Seen in:* S04, S05, S06, S08, S09, S10, S15, S17, S18, S19, S21, S22, S23, S25, S26, S28, S29, S30, S31, S32, S33, S35, S36, S38

### Circular icon buttons everywhere &mdash; 22/38

Every secondary action — back, close, next, like, cart, expand, play — is a perfect circle. Diameter is consistent within a screen and usually 32, 40 or 48px.

*Rule of thumb:* one diameter per screen for icon-only actions; the FAB may be larger.

*Seen in:* S01, S06, S08, S10, S11, S13, S16, S17, S18, S19, S21, S24, S25, S27, S29, S30, S31, S34, S35, S36, S37, S38

### Compound CTA (pill + nested circular button) &mdash; 12/38

A text pill with a circular icon button set into its own end cap, sharing one silhouette. Right-hand variant means 'go'; left-hand variant means 'play'. Occasionally split into two separate objects for a calmer read.

*Rule of thumb:* circle diameter = pill height; circle inset 2–3px; icon is always an arrow (→ ↗ ▸).

*Seen in:* S06, S10, S11, S15, S16, S17, S19, S21, S24, S28, S30, S38

### Concave / inverted corner radius &mdash; 8/38

Where two surfaces meet, the corner curves inward so the modules interlock instead of stacking. Used at component scale (a button sitting in a notch), at panel scale (text block meeting a hero image) and at whole-page scale.

*Rule of thumb:* inner radius ≈ outer radius; the background colour must show through the seam or the effect collapses.

*Seen in:* S14, S15, S21, S23, S24, S27, S30, S31

### Detached / floating chrome &mdash; 8/38

Navigation, search, rails and transport bars float as separate objects above the content plane rather than being edges of the window. Often overlapping the content card's boundary.

*Rule of thumb:* chrome sits on its own z-plane with its own shadow; the content card's corners stay visible behind it.

*Seen in:* S06, S08, S09, S14, S25, S32, S35, S37

### Inverted active state &mdash; 8/38

Selection is shown by flipping a row or card to the opposite luminance — black in a light list, white in a dark one — instead of tinting it with a brand colour. Free hierarchy with no palette cost.

*Rule of thumb:* one inverted item per list, maximum.

*Seen in:* S01, S07, S13, S14, S25, S29, S35, S37

### Number-first stat block &mdash; 8/38

The value is set two to three times the size of its label, so the number is read before the caption. Sometimes as a card, sometimes as a bar, sometimes inline where a large number and a small caption share one line.

*Rule of thumb:* value : label size ratio between 2.5:1 and 3.5:1; label always beneath or trailing, never above.

*Seen in:* S07, S16, S24, S27, S29, S30, S31, S37

### Segmented chip filters &mdash; 8/38

A row of pills where one is filled and the rest are outlined or ghosted. Sometimes alternating fills purely for rhythm rather than for meaning.

*Rule of thumb:* filled = selected. If fills alternate for rhythm instead, users will hunt for a meaning that isn't there.

*Seen in:* S07, S13, S18, S25, S27, S28, S29, S32

### Glassmorphism / blur panels &mdash; 8/38

Translucent panels with heavy backdrop blur over photography. Beautiful; the leading cause of the corpus's contrast failures.

*Rule of thumb:* blur alone is not a scrim. Add a 40–60% tint of the text's opposite, or lose the text.

*Seen in:* S08, S09, S17, S18, S25, S31, S35, S37

### Floating annotation pills over media &mdash; 7/38

Small pills laid over a product photograph or render, naming a feature. A leading dot upgrades a caption into a pinned marker. The most advanced form connects to the product with a thin leader line.

*Rule of thumb:* two to three per image, never more; a dot or a leader line to signal 'pinned', not 'captioned'.

*Seen in:* S06, S10, S11, S15, S25, S32, S37

### Overflow-crop as a scroll affordance &mdash; 7/38

A list or carousel is deliberately clipped by its container so a partial row or card shows. Communicates 'more below/beside' without a scrollbar or an arrow.

*Rule of thumb:* clip mid-row, not at a row boundary — a clean edge reads as an end.

*Seen in:* S08, S09, S15, S20, S28, S29, S38

### Light island in a dark shell (and its inverse) &mdash; 6/38

A single white or near-white panel dropped into an otherwise dark interface. The eye goes there first, unconditionally. Its inverse — a light bento inside a black frame — is the strongest structural idea in the corpus.

*Rule of thumb:* use once per screen; the island should hold the densest data.

*Seen in:* S01, S02, S14, S29, S35, S37

### Spec rows with hairline dividers &mdash; 5/38

Label left in ink, value right in grey, separated by a 1px rule at ~8% opacity. No boxes, no zebra striping, no icons. The only pattern in the corpus that handles dense factual data properly.

*Rule of thumb:* hairline at 6–10% of the text colour; row height 1.6–2× the text size.

*Seen in:* S11, S16, S21, S23, S36

### Serif for brand, sans for interface &mdash; 5/38

A high-contrast didone or transitional serif reserved for the wordmark and headline; a neutral geometric sans for every control, label and number.

*Rule of thumb:* the serif never appears below ~16px and never inside a control.

*Seen in:* S19, S20, S22, S26, S35

### Metric chip row on media &mdash; 4/38

A row of small pills burned into the foot of a photo card carrying live readings or metadata — 24°C · 30% · 350W · 80%, or IMDb 9.2 · 2h 16m · Top 10 Today.

*Rule of thumb:* four chips maximum; each is one value plus one unit, no labels.

*Seen in:* S01, S07, S29, S37

### Vertical rotated type &mdash; 3/38

A wordmark or label rotated 90° along a column or card edge. As a structural column it anchors a layout; as a label it is decoration that costs legibility.

*Rule of thumb:* rotate the brand, never the data. A rotated price is a price nobody reads.

*Seen in:* S23, S26, S27

### Two-part composite pill &mdash; 3/38

One lozenge carrying two related values split by a hairline — '$390 | Loop Form', 'Min Bid / 3.4 ETH' + creator. More compact than a caption, more scannable than a tooltip.

*Rule of thumb:* the two halves must be facts of different types (price+name, price+person), never two of the same.

*Seen in:* S11, S17, S26

### Notched card silhouette &mdash; 3/38

A piece is subtracted from a card's outline. Two variants: a corner notch, where a button sits inside the card rather than on top of it (the NFT feed card, Reson's caption bar); and a mid-edge notch, where a soft wave in the top edge simply gives a stack of near-identical rectangles a recognisable profile (WAVEN's fanned album cards).

*Rule of thumb:* for a button: notch radius = button radius + 4–6px clearance. For a silhouette wave: 12–18% of the edge's length, centred, or it reads as damage.

*Seen in:* S08, S17, S30

### Scroll / position indicator &mdash; 3/38

A vertical track numbered 01 to 04 down the right edge, or an 'n/total' counter beside carousel arrows. Gives the page a length before you scroll it.

*Rule of thumb:* show total, not just position — the total is the useful half.

*Seen in:* S06, S11, S31

### Hotspot markers &mdash; 2/38

Circular + markers laid over a render, implying tap-to-reveal. Turns a static image into an explorable object.

*Rule of thumb:* number them, or they have no reading order.

*Seen in:* S15, S32

### Marquee ticker as chapter divider &mdash; 2/38

A full-bleed black bar with a short phrase repeating, clipped at both edges to imply continuous horizontal motion. Functions as a horizon line between page sections.

*Rule of thumb:* uppercase, ~0.08em tracking, a ✦ or • between repeats, clipped at both ends.

*Seen in:* S04, S38

### Type rag filled with interface &mdash; 2/38

A ragged-right headline whose short lines have UI dropped into the empty space — an avatar stack on one line, a CTA on the next — so headline and controls occupy one optical block.

*Rule of thumb:* only for copy you control absolutely. It does not survive translation or a CMS.

*Seen in:* S17, S30

### Coverflow depth by scale and luminance &mdash; 2/38

A carousel where each step out from the centre is smaller and darker, producing depth with no 3D transform and no perspective.

*Rule of thumb:* scale step ~0.88, luminance step ~15%; crop the outermost card at the canvas edge.

*Seen in:* S08, S20

### Typographic tile in a photo grid &mdash; 2/38

One cell in an image bento carries no photograph — just a colour field and a sentence. It is what stops a grid from reading as a moodboard.

*Rule of thumb:* one text tile per six to eight image tiles.

*Seen in:* S04, S12

### Organic / blob masking &mdash; 1/38

A non-repeating hand-drawn curve masking the hero, so the layout is defined by negative space rather than by rectangles. The single strongest differentiator available, and the least responsive.

*Rule of thumb:* once per page; redraw per breakpoint; never let text depend on the curve's edge.

*Seen in:* S22

### Capsule bar chart &mdash; 1/38

Bars with a radius of half their width, no axes, no gridlines, one bar filled with the emphasis colour and its value shown in a floating pill above it.

*Rule of thumb:* highlight exactly one bar; put the number in a pill on that bar, not on an axis.

*Seen in:* S29

### Vertical stagger on a card row &mdash; 1/38

Cards in a row offset vertically from one another, turning a catalogue grid into an editorial composition.

*Rule of thumb:* offset by 8–12% of card height; keep the *tops* irregular and let the section below absorb the ragged bottom.

*Seen in:* S38

### Square corners as genre signal &mdash; 1/38

Refusing the radius entirely. In a corpus this rounded, hard corners read instantly as clinical, archival, technical.

*Rule of thumb:* commit fully — a single rounded element in a square-cornered layout looks like a mistake.

*Seen in:* S33

---

# Part four &mdash; Contrast audit

Thirteen text elements sampled directly from the pixels. Background is the median of the darker (or lighter) 40% of the sampled region; text colour is the 97th-percentile extreme, so anti-aliasing doesn't drag the reading toward the ground. Values are approximate &mdash; these are 735px-wide JPEGs &mdash; but the ranking is reliable, and the elements that pass do so at 21:1, which rules out a systematic downward bias.

| Plate | Element | Text | Background | Ratio | AA normal (4.5:1) | AA large (3:1) |
|---|---|---|---|---:|:---:|:---:|
| S27 | MODISK headline (black on white) | `#000000` | `#ffffff` | 21.00:1 | PASS | PASS |
| S28 | VR store subtitle (white on black) | `#ffffff` | `#000000` | 21.00:1 | PASS | PASS |
| S07 | KUVA body copy (on white panel) | `#3c3d3f` | `#ffffff` | 10.87:1 | PASS | PASS |
| S13 | Nike list price | `#818181` | `#1b1b1b` | 4.42:1 | **FAIL** | PASS |
| S09 | WAVEN track title (glass) | `#75797c` | `#0c0d11` | 4.42:1 | **FAIL** | PASS |
| S29 | CREATORA sub-label ('2 devices') | `#797979` | `#fafafa` | 4.17:1 | **FAIL** | PASS |
| S31 | Japan travel nav | `#86848e` | `#232833` | 4.01:1 | **FAIL** | PASS |
| S33 | The Awakening body copy | `#687a7e` | `#0f2226` | 3.66:1 | **FAIL** | PASS |
| S10 | Ambient lamp body copy | `#656565` | `#111111` | 3.24:1 | **FAIL** | PASS |
| S01 | Streaming metadata chip (on poster) | `#c87571` | `#85201d` | 2.81:1 | **FAIL** | **FAIL** |
| S11 | Lumora Halo body copy | `#a7a7a7` | `#ffffff` | 2.39:1 | **FAIL** | **FAIL** |
| S36 | Reson feature sub-line | `#545454` | `#191919` | 2.32:1 | **FAIL** | **FAIL** |
| S21 | VEXON numbered feature rows | `#444444` | `#111111` | 1.94:1 | **FAIL** | **FAIL** |

---

# Part five &mdash; Extracted tokens

The corpus's own system, written down. Surfaces and accents are measured values; radius, spacing and type scales are inferred from consistent ratios across the set. The type scale is corrected upward &mdash; the corpus's real body size fails legibility, and every layout in it survives the fix.

```css
/* ── Surfaces ─────────────────────────────────────────────
   Never #000 and never #FFF. Every "black" in this corpus
   carries a hue tint; that tint is what makes it read as a
   material rather than as an absence.                     */
--bg-warm-900:  #110C0A;   /* furniture, lighting, hospitality */
--bg-neutral-900:#0D0D0D;  /* sportswear, hardware, general    */
--bg-cool-900:  #050B11;   /* sci-fi, audio, machine           */
--bg-violet-900:#050509;   /* web3, nightlife                  */
--surface-800:  #1A1B1E;   /* raised card on a dark page       */
--surface-700:  #2C2C2E;   /* nested / hover                   */
--paper-000:    #FEFEFE;   /* the light island                 */
--paper-050:    #F4F4F3;   /* card inside a light bento        */
--paper-100:    #ECEDEC;   /* inner well, chart ground         */

/* ── Accents. Pick ONE. ────────────────────────────────── */
--accent-volt:  #ABFE5C;   /* sport, energy, live state        */
--accent-lime:  #B1C845;   /* logistics, industrial            */
--accent-orange:#F24402;   /* fitness, action                  */
--accent-rust:  #CC3109;   /* rugged hardware                  */
--accent-amber: #E95203;   /* property, warmth                 */
--accent-coral: #CB675E;   /* architecture, editorial          */
--accent-blue:  #4C6CD9;   /* web3, digital-native             */
--accent-crimson:#83080C;  /* entertainment, luxury            */

/* ── Radius ───────────────────────────────────────────── */
--r-pill:   999px;  /* anything ≤56px tall — no exceptions   */
--r-card:   16px;
--r-panel:  24px;
--r-frame:  32px;   /* the outermost device frame            */
--r-notch:  24px;   /* concave seam; match the panel radius  */

/* ── Spacing. One gutter value, used everywhere. ───────── */
--gap: 20px;        /* at 1440px. Outer padding == gutter.   */

/* ── Type scale (1440px) ──────────────────────────────── */
--t-display: 56px / 1.02 / 700;   /* hero, ≤3 lines         */
--t-h1:      30px / 1.15 / 600;
--t-h2:      20px / 1.25 / 600;
--t-body:    15px / 1.55 / 400;   /* NOT 11px. See below.   */
--t-label:   13px / 1.4  / 500;
--t-micro:   11px / 1.3  / 500;   /* tracked 0.08em, caps   */
--t-stat:    32px / 1.0  / 600;   /* number-first blocks    */

/* ── Elevation ────────────────────────────────────────── */
--shadow-float: 0 8px 32px rgb(0 0 0 / .35);
--hairline:     1px solid rgb(255 255 255 / .08);

/* ── The scrim you will forget and then need ─────────── */
--scrim: linear-gradient(to top, rgb(0 0 0 / .72), transparent 60%);
```

---

# Filename crosswalk

The folder's filenames are Pinterest board titles and are unreliable. Look designs up here.

| File | Plate | Design |
|---|---|---|
| `1152780835897946877.jpeg` | S01 | Streaming / OTT dashboard *(duplicate file)* |
| `1152780835897946877.jpeg` | S02 | Same streaming dashboard, staged on a laptop |
| `1152780835897946878.jpeg` | S03 | Greybox wireframe of the streaming dashboard |
| `1152780835907870145.jpeg` | S04 | LOMORA lighting — scrolling page, mid-section |
| `1152780835907870146.jpeg` | S05 | LOMORA lighting — footer-as-hero |
| `1152780835907870267.jpeg` | S06 | 'Furniture, Made to Belong' — hero |
| `1152780835907870269.jpeg` | S07 | KUVA — freight & logistics |
| `1152780835907870270.jpeg` | S08 | WAVEN — music player (opaque variant) |
| `1152780835907870271.jpeg` | S10 | Ambient lamp brand — dark hero |
| `1152780835907870273.jpeg` | S11 | LUMØRA Halo — product detail page |
| `1152780835907870275.jpeg` | S12 | LUMØRA furniture — bento homepage |
| `App Ui design Inspiration.jpeg` | S16 | Cycling tracker — greeting, live stats, summary |
| `App UI Inspiration (1).jpeg` | S14 | Smart lighting app — onboarding, control, devices |
| `App UI Inspiration (2).jpeg` | S15 | DOMIO — modular capsule homes |
| `App UI Inspiration.jpeg` | S13 | Nike — sneaker commerce app |
| `Modern NFT marketplace app ui design.jpeg` | S17 | NFT marketplace — feed and bid detail |
| `Skeleton to final design.jpeg` | S18 | MODERA — NFT marketplace dashboard |
| `Smooth Animated web design.jpeg` | S19 | MIRA — fine jewellery |
| `Sorelle Jewel Website Animation.jpeg` | S20 | Sorellé — bridal jewellery (meme-framed) |
| `web design UI inspiration (1).jpeg` | S22 | TELOSKIN — skincare |
| `web design UI inspiration (2).jpeg` | S23 | POWERCUBE X — GaN charger |
| `web design UI inspiration (3).jpeg` | S24 | LUMORA — real estate |
| `web design UI inspiration (4).jpeg` | S25 | LUMORA — smart home |
| `web design UI inspiration (5).jpeg` | S26 | LUMORA — dark luxury furniture |
| `web design UI inspiration (6).jpeg` | S27 | MODISK — rugged SSD |
| `web design UI inspiration (7).jpeg` | S28 | VR / AR eyewear store |
| `web design UI inspiration.jpeg` | S21 | VEXON — gaming controllers |
| `Web ui Inspiration (1).jpeg` | S38 | Ambient lamp brand — full page scroll |
| `Web ui Inspiration (10).jpeg` | S35 | DOMIO — interior design browser |
| `Web ui Inspiration (11).jpeg` | S36 | Reson — wireless speaker PDP |
| `Web ui Inspiration (12).jpeg` | S37 | Smart home dashboard with icon rail |
| `Web ui Inspiration (2).jpeg` | S29 | CREATORA — smart home dashboard |
| `Web ui Inspiration (3).jpeg` | S30 | Reson — craft furniture |
| `Web ui Inspiration (4).jpeg` | S31 | Japan travel — immersive hero |
| `Web ui Inspiration (5).jpeg` | S32 | LUMORA — furniture, warm dark |
| `Web ui Inspiration (6).jpeg` | S33 | THE AWAKENING — synthetic consciousness |
| `Web ui Inspiration (7).jpeg` | S29 | CREATORA — smart home dashboard *(duplicate file)* |
| `Web ui Inspiration (8).jpeg` | S34 | HORIZN — architecture study |
| `Web ui Inspiration (9).jpeg` | S01 | Streaming / OTT dashboard |
| `Web ui Inspiration.jpeg` | S09 | WAVEN — music player (glass variant) |

---

**Families.** *Warm minimal retail* (11) &middot; *Dark product / hardware* (7) &middot; *Data & dashboards* (10) &middot; *Glass & atmosphere* (6) &middot; *Bold industrial* (4)

- **Warm minimal retail** — S04, S05, S06, S10, S11, S12, S22, S26, S30, S32, S38
- **Dark product / hardware** — S13, S19, S21, S23, S27, S28, S36
- **Data & dashboards** — S01, S02, S03, S14, S16, S18, S25, S29, S35, S37
- **Glass & atmosphere** — S08, S09, S17, S31, S33, S34
- **Bold industrial** — S07, S15, S20, S24
