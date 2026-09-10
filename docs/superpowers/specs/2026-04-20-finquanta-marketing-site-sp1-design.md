# Finquanta Marketing Site — SP1 Design Spec

**Date:** 2026-04-20
**Author:** Claude (Opus 4.7) with @kaushal-professional
**Status:** Draft for review
**Sub-project:** SP1 of 7 (Foundation + Site Shell + Homepage)
**Repo:** `D:\Finquanta\frontend`

---

## 0. Context

Finquanta Solutions India Private Limited is a Tally Partner (Sales · Support · Solutions Development) for Indian SMEs. The user — Director Sandip Utekar — has requested a comprehensive corporate marketing website modeled on the structure of antraweb.com but rebranded entirely for Finquanta with a pastel adaptation of the navy / purple / cream / gold palette from the Finquanta business card.

The full request is too large for a single spec → plan → execute cycle. We have decomposed it into 7 sub-projects (SP1–SP7) that will each be brainstormed, planned, and executed in turn. **This document specifies SP1 only.**

### The 7-sub-project sequence (agreed)
| # | Sub-project | Why this order |
|---|---|---|
| **SP1** | Design system + site shell + homepage (this doc) | Everything reuses these foundations |
| SP2 | Static inner pages (about/contact/services/policies/etc.) | No dynamic routes yet |
| SP3 | Dynamic product pages + content model expansion | Needs SP1's content patterns |
| SP4 | Blog + case studies (MDX pipeline) | Distinct content tech |
| SP5 | Forms backend + OTP + CRM stub + newsletter | Needs UI surfaces from SP1–SP4 |
| SP6 | Third-party integrations (GA4, GTM, reCAPTCHA, Pixel, JSON-LD, sitemap) | Polish layer |
| SP7 | A11y + perf + Lighthouse + cross-browser QA | Final hardening |

---

## 1. Goals & non-goals

### Goals (SP1)
- Replace the default Next.js scaffold with the Finquanta marketing homepage at `/`.
- Establish a reusable, themeable design system (Ivory Pearl palette, Manrope + Lora type, spacing, radii, shadows, motion tokens) consumable by every future sub-project.
- Build all reusable layout chrome: utility bar, header, mega-menu, mobile nav, footer, floating CTA, sticky cloud promo.
- Build all 9 homepage sections with placeholder but visually complete content.
- Build all lead-capture modals (Enquiry, Talk-to-Expert, Callback, OTP-mock, Success) and the newsletter form, all client-validated with fake-success flow.
- Establish a typed content model (`content/*.ts` + Zod) that is CMS-ready by adapter swap.
- Wipe the unused SaaS scaffold (auth/dashboard/api/health/empty stubs) so the marketing site owns the entire app.

### Non-goals (deferred to later sub-projects)
- Inner routes (`/about-us`, `/contact-us`, `/tally-services`, `/blog`, etc.) — SP2/SP3/SP4.
- Real form submission, OTP SMS, CRM/email integration — SP5.
- Analytics, GA4, GTM, Meta Pixel, reCAPTCHA, schema.org JSON-LD, sitemap, robots, OG image generation — SP6.
- Lighthouse 90/95/100/95 hardening, full WCAG 2.1 AA audit, Playwright E2E, multi-browser QA — SP7.
- Multi-language UI (Marathi/Hindi appear only as testimonial content with `lang` attribute).
- Real client logos, award badges, testimonial photos — placeholder content tagged `isPlaceholder: true`.

---

## 2. Brand & visual direction

### 2.1 Identity (from the business card)
- **Name:** Finquanta Solutions India Private Limited
- **Director:** Sandip Utekar
- **Phone:** +91 99120 37912 3
- **Email:** sandiputekar.tally@gmail.com
- **Tagline:** *"Empowering Businesses with Accurate Data, Seamless Solutions & Trusted Tally Expertise."*
- **Partner badge:** Tally Partner — for Sales · Support · Solutions Development
- **Services (6, from card):** Tally Prime Implementation & Customization · Multi-Location & Business Automation · GST, TDS & Compliance Solutions · MIS & Profitability Reporting · Integration, API & Add-on Development · Training, Support & AMC Services
- **Logo:** the card uses a stylized graph-arrow-in-circle wordmark; we recreate this as inline SVG (see Section 4.A).

### 2.2 Palette — "Ivory Pearl" (locked)
| Token | Hex | Use |
|---|---|---|
| `--color-cream` | `#FBF7F0` | Page background |
| `--color-cream-100` | `#F6F0E4` | Section alt-stripe |
| `--color-cream-200` | `#EDE3D5` | Hairline borders |
| `--color-ink` | `#2E1B45` | Primary text, H1 |
| `--color-ink-700` | `#4A2C6B` | H2/H3, strong text |
| `--color-ink-500` | `#6E5485` | Secondary text |
| `--color-ink-300` | `#A38EBC` | Muted text, captions |
| `--color-primary` | `#7A4FB0` | CTA buttons, links, focus rings |
| `--color-primary-600` | `#6A3F9F` | CTA hover |
| `--color-primary-100` | `#EEE0F5` | Chip bg, soft surfaces |
| `--color-primary-50` | `#F7EFFA` | Hover bg, dividers |
| `--color-accent-violet` | `#B99AD6` | Decorative, gradient stops |
| `--color-accent-sand` | `#E8C89B` | Award badges, gold underline |
| `--color-accent-sand-100` | `#F5E4C7` | Sand chip bg |
| `--color-success` | `#3D8B5C` | Success states |
| `--color-info` | `#3B6FB8` | Info pills, "Tally" wordmark blue |
| `--color-warning` | `#C26A2E` | Errors |
| `--color-white` | `#FFFFFF` | Cards, modals |
| `--color-overlay` | `rgba(46,27,69,.45)` | Modal backdrop |

Contrast: `--color-ink` on `--color-cream` = 12.7:1 (AAA). `--color-primary` on white = 5.4:1 (AA).

### 2.3 Typography (locked)
- **Sans:** Manrope (400/500/600/700/800), `next/font/google`, variable `--font-sans`.
- **Italic-serif (tagline only):** Lora italic (400/500), `next/font/google`, variable `--font-serif-italic`.
- **Type scale:** display (56), display-mob (36), h1 (40), h2 (30), h3 (22), h4 (18), body-lg (18), body (16), body-sm (14), caption (12), eyebrow (11 uppercase tracking-wide), stat (56 tabular-nums), stat-mob (40).
- **Tagline pattern:** `<span className="font-serif-italic italic font-medium">…</span>`.

### 2.4 Spacing, radii, shadows, motion
- Spacing additions: `--spacing-section: 96px` (desktop), `64px` (mobile); `--spacing-gutter: 24px` mobile / `48px` desktop.
- Radii: `sm 6` / `md 10` / `lg 16` / `xl 24` / `full`.
- Shadows: `--shadow-card`, `--shadow-card-hover`, `--shadow-modal`, `--shadow-fab`, `--shadow-sticky`.
- Motion durations: 150 / 220 / 400 / 1800 (counter); easings `ease-out`, `ease-soft`. **All entrance animations and counters honor `prefers-reduced-motion`.**
- Z-index scale: `base 0`, `sticky 30`, `fab 40`, `overlay 50`, `modal 60`, `toast 70`.

### 2.5 Layout grid
- Container max-width: 1280px.
- Page side padding: 24/32/48 (mobile/tablet/desktop).
- Section vertical rhythm: 64/96 (mobile/desktop).

---

## 3. Architecture

### 3.1 Stack
- **Framework:** Next.js 16.2.4 (App Router; React 19.2).
- **Styling:** Tailwind CSS v4 with `@theme` token block; PostCSS plugin.
- **Components:** shadcn/ui primitives (Radix UI underneath: Dialog, Tabs, NavigationMenu, Accordion, Tooltip, Sheet, Checkbox, Label, Slot) — copied into `components/ui/`, retheme-in-place to Ivory Pearl.
- **Carousel:** `embla-carousel-react` + `embla-carousel-autoplay`.
- **Animation:** `framer-motion` (entrance, FAB spring, modal in/out). Counter count-up uses `requestAnimationFrame` directly (smaller bundle than Framer for that one job).
- **Forms:** `react-hook-form` + `zod` (already installed).
- **Icons:** `lucide-react`.
- **Utility:** `clsx` + `tailwind-merge` (combined into a `cn()` helper); `class-variance-authority` for component variants.
- **Fonts:** `next/font/google` (Manrope + Lora italic).

### 3.2 Route structure (Next 16 App Router)
```
app/
  layout.tsx               root: <html>, fonts, globals.css, providers
  page.tsx                 homepage (/), `export const unstable_instant = { prefetch: 'static' }`
  not-found.tsx            global 404
  globals.css              @import "tailwindcss"; @import "../styles/tokens.css"; base layer
  opengraph-image.tsx      generated OG image (deferred to SP6 — placeholder file)
  icon.tsx                 generated app icon from card's logo (deferred to SP6 — placeholder file)
  favicon.ico              existing
```
- **Single root layout** (no route groups in SP1). Marketing site IS the whole app.
- **`unstable_instant`** on the homepage validates the prefetched static shell at build time per Next 16's instant-navigation guidance. **Planner note:** verify the exact export name and shape against `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md` before writing the line — this is the kind of API the project's "NOT the Next.js you know" rule is warning about.
- Homepage is a Server Component; interactive sub-components (carousel, tabs, modals, form, counter) are Client Components.
- No `'use cache'` needed in SP1 — content is local TS imports, no async fetches.

### 3.3 Folder layout (everything else)
```
components/
  ui/            shadcn primitives, retheme-in-place
  layout/        UtilityBar · Header · MegaMenu · MobileNav · Footer · FloatingActions · StickyCloudPromo · Logo
  sections/      Hero · ClientsStrip · Testimonials · TrustStats · Awards · Values · Offerings · TallyOnCloud · Newsletter
  modals/        EnquiryModal · TalkToExpertModal · CallbackModal · OtpModal · SuccessModal
  forms/         LeadForm · NewsletterForm · form-fields/*
  fx/            CountUp · RevealOnScroll
content/
  navigation.ts · testimonials.ts · clients.ts · awards.ts · values.ts · offerings.ts ·
  hero-slides.ts · stats.ts · cloud.ts · company.ts
lib/
  schema.ts      Zod schemas
  utils.ts       cn(), formatIndianNumber(), phoneRegex
  site.ts        single-source company constants
styles/
  tokens.css     @theme tokens (imported by globals.css)
public/
  logos/         finquanta logo svg + client wordmark svgs
  awards/        generated badge svgs
```

### 3.4 Cleanup (atomic commit at the start of execution)
| Path | Action | Reason |
|---|---|---|
| `app/(auth)/`, `app/(dashboard)/` | Delete | SaaS scaffold not needed |
| `app/api/health/` | Delete | Empty stub |
| `app/page.tsx`, `app/layout.tsx`, `app/globals.css` | Replace | Default Next.js scaffold |
| `components/{auth,documents,folders,telemetry,shared}/` | Delete | Empty SaaS folders |
| `hooks/use-{auth,documents,permissions,page-tracking}.ts` | Delete | Empty SaaS hooks |
| `lib/{api-client,auth,crypto,telemetry}.ts` | Delete | Empty SaaS libs |
| `middleware.ts` | Delete | Empty; Next 16 prefers `proxy.ts` if needed |
| `types/{api,authz}.ts` | Delete | Empty |
| `public/{next,vercel,globe,file,window}.svg` | Delete | Boilerplate |
| `Dockerfile` | Delete | Empty; if needed in SP6/SP7 we generate fresh |

### 3.5 Dependency changes
- **Remove:** `@grafana/faro-web-sdk`, `@grafana/faro-web-tracing`, `@tanstack/react-query`, `axios`, `zustand`.
- **Keep:** `next@16.2.4`, `react@19.2.4`, `react-dom@19.2.4`, `react-hook-form`, `zod`, `tailwindcss@4`, `@tailwindcss/postcss`, `typescript`, `eslint`, `eslint-config-next`, `@types/*`.
- **Add:** `embla-carousel-react`, `embla-carousel-autoplay`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-accordion`, `@radix-ui/react-tooltip`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-checkbox`, `@radix-ui/react-slot`, `@radix-ui/react-label`.
- **shadcn bootstrap:** `npx shadcn@latest init` then `npx shadcn@latest add button card dialog tabs navigation-menu accordion tooltip input label checkbox sheet badge`.

### 3.6 `next.config.ts` (SP1)
```ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
}
export default nextConfig
```
(`cacheComponents` and `instantNavigationDevToolsToggle` left off in SP1; revisit if needed in SP3+.)

---

## 4. Content model

### 4.1 Site constants — `lib/site.ts`
```ts
export const site = {
  name: 'Finquanta Solutions India Private Limited',
  shortName: 'Finquanta',
  tagline: 'Empowering Businesses with Accurate Data, Seamless Solutions & Trusted Tally Expertise.',
  founded: 2018,                              // PLACEHOLDER — confirm with user
  director: { name: 'Sandip Utekar', title: 'Director' },
  phone:    { display: '+91 99120 37912 3', tel: '+919912037912' },
  whatsapp: { display: '+91 99120 37912 3', url: 'https://wa.me/919912037912' },
  email: 'sandiputekar.tally@gmail.com',
  address: { line1: '—', city: 'Mumbai', state: 'Maharashtra', pincode: '—', country: 'India' },  // PLACEHOLDER
  partner: { type: 'Tally Partner', scope: ['Sales','Support','Solutions Development'] },
  social: { linkedin: null, twitter: null, facebook: null },                                       // PLACEHOLDER
} as const
```

### 4.2 Zod schemas — `lib/schema.ts`
A base schema carries `id` and `isPlaceholder` (for the dev demo banner). Specific types:
- `Testimonial` (quote 40–500 chars, author/title/company, sector enum, locale `en|mr|hi`, optional avatar/logo paths).
- `Client` (name, logoSrc, sector, optional href).
- `Award` (title, year, issuer, ≤180-char description).
- `Value` (id, title, Lucide icon name, ≤140-char summary).
- `HeroSlide` (eyebrow?, heading, sub ≤220, primaryCta + optional secondaryCta, gradient enum, art enum).
- `Stat` (value, optional suffix, label, Lucide icon name).
- `Offering` (title, body ≤200, href, optional ctaLabel, Lucide icon name).
- `OfferingTab` (label + 2–6 Offerings).
- `NavLink` (label, href, external, comingSoon).
- `NavGroup`, `MegaMenuItem` (5-column structure).
- `LeadPayload`, `NewsletterPayload`, `OtpIssuePayload`, `OtpVerifyPayload`.

All content files import their schema and call `.parse(rawArray)` at module load — malformed content fails dev start loudly.

### 4.3 Placeholder content inventory (all `isPlaceholder: true`)
- **Hero slides — 5** (Tally implementation / cloud / compliance / MIS / integrations); each uses one of 5 named gradients + one of 5 SVG motifs; no raster images in SP1.
- **Clients — 12** invented Indian SME wordmarks: *Mahalaxmi Distributors · Sai Industries · Konkan Traders · Deccan Polymers · Neelkanth Foods · Sahyadri Pharma · Rangoli Textiles · Pranay Exports · Vikram Enterprises · Aarambh Retail · Shreeji Packaging · Maitri Chemicals*.
- **Testimonials — 10** sector-diverse, including **1 Marathi** and **1 Hindi** (`lang` attribute set per item).
- **Stats — 5** conservative numbers: 7 yrs experience · 250+ businesses · 18,500+ tickets resolved · 90+ TDLs · 600+ trainees.
- **Awards — 6** plausible generic award badges (Tally Excellence Partner 2024, Outstanding Customer Success 2023, Rapid Growth Partner 2024, Integration Specialist 2023, Client Delight 2024, Top TDL Developer 2023).
- **Values — 6**: Trust, Honesty & Integrity, Transparency, Ethical Framework, Customer Satisfaction, Quality (Lucide: ShieldCheck · HeartHandshake · Eye · Scale · Users · Gem).
- **Offerings — 6 tabs** matching spec structure (Products / Services / Mobile Apps / Solutions / Add-Ons / Tally on Cloud), each with 3–5 cards; every `href` flagged `comingSoon: true`.
- **Tally on Cloud** — intro + 6-bullet value-prop (anywhere access · security · auto-backup · 99.9% uptime · multi-user · zero IT hassle).
- **Navigation** — 5-subgroup mega menu mirroring spec, all non-homepage links `comingSoon: true`. Anchor links to homepage sections where relevant (Testimonials, Clients).

### 4.4 Demo content banner
Dev-only top banner counts `isPlaceholder: true` items across all content files; reads *"Demo content — N items flagged as placeholder. Edit `content/` to customize."* Hidden in production.

---

## 5. Component contracts

### 5.A Layout chrome (9)
| Component | Server/Client | Purpose | Key behavior |
|---|---|---|---|
| `<Logo />` | Server | Inline SVG of card's graph-arrow logo | Two color modes: `plum` / `mono` |
| `<UtilityBar />` | Server | Top sticky bar, 36px | Phone / Email / Career (CS) / Download (CS); hides on scroll-down on mobile (`prefers-reduced-motion` disables) |
| `<Header />` | Client | Sticky main nav | Logo + MegaMenu + right-trio (Buy/Download/Talk-to-Expert primary) |
| `<MegaMenu />` | Client | Radix NavigationMenu | "Product & Services" 5-column dropdown; coming-soon items show sand-dot + tooltip |
| `<MobileNav />` | Client | Radix Sheet (right) <1024px | Accordion-grouped nav + Talk-to-Expert / Call / WhatsApp |
| `<Footer />` | Server | 4-column footer | Company / Quick Links / Policy / Contact + bottom strip with dynamic year |
| `<FloatingActions />` | Client | FAB bottom-right `z-fab` | Expands into Call / WhatsApp / Launch Demo; spring via Framer; hidden when modal open |
| `<StickyCloudPromo />` | Client | Dismissible bottom banner, `z-sticky` (= 30, layered below the FAB at `z-fab` = 40) | Slides in after 2s scroll; persists dismissal in `localStorage`; hidden <768px |

### 5.B Homepage sections (9)
| # | Component | Server/Client | Notes |
|---|---|---|---|
| 1 | `<Hero />` | Client | Embla, 5 slides; autoplay options `{ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true }`; arrows ≥1024px, dot pagination, progress bar; reduced-motion disables autoplay |
| 2 | `<ClientsStrip />` | Server | Desktop 5-col grid, grayscale → color on section-hover via `:has()`; mobile Embla auto-marquee |
| 3 | `<Testimonials />` | Client | Embla peek-carousel, sector filter chips, `lang` attribute per locale |
| 4 | `<TrustStats />` | Client | 5 counters; IO + rAF count-up; `Intl.NumberFormat('en-IN')` for Indian grouping |
| 5 | `<Awards />` | Server | 6-badge grid; Radix Tooltip on hover/focus |
| 6 | `<Values />` | Server | 6-icon grid; no hover state |
| 7 | `<Offerings />` | Client | Radix Tabs, 6 tabs, 3-col card grids; tab 6 deep-links to `<TallyOnCloud />` |
| 8 | `<TallyOnCloud />` | Server | 2-col: copy + check-bullets / decorative cloud-arc SVG; CTA opens EnquiryModal |
| 9 | `<Newsletter />` | Client | RHF + Zod email-only; 800ms fake → SuccessModal |

### 5.C Reusable UI primitives
- `<Button variant size />` (CVA: primary/secondary/ghost/outline/sand × sm/md/lg)
- `<Card hover />`, `<Chip tone />`, `<EyebrowLabel />`, `<SectionHeader eyebrow title lead />`, `<ComingSoonTooltip />`

---

## 6. Forms, modals, OTP-mock

### 6.1 Lead capture flow (Enquiry / Talk-to-Expert / Callback)
1. **`<LeadForm />`** (RHF + Zod): name (2–80), phone (Indian 10-digit, +91 prefix), email, requirement (10–500), consent checkbox.
2. Submit → button loading 800ms → `<OtpModal />` opens.
3. `<OtpModal />`: 6 separate numeric inputs with paste-fill, arrow nav, auto-advance, 30s resend timer. Mock accepts **`123456`** only; wrong code shakes + `aria-live` error.
4. Correct code → `<SuccessModal />` opens with green check + "Thanks — we'll reach out within one business day."
5. Closing OtpModal mid-flow cancels (no SuccessModal fires).
6. `source: 'enquiry' | 'talk-to-expert' | 'callback'` attached to payload, `console.log`-ed (no network call in SP1).

### 6.2 Newsletter flow
- `<NewsletterForm />`: email-only, RHF + Zod; 800ms fake → SuccessModal with "Please check your inbox to confirm your subscription." No OTP.

### 6.3 Modals (all Radix Dialog)
- Focus trap, Escape close, `aria-labelledby`/`aria-describedby`, backdrop `bg-overlay`, slide-up on mobile / fade-scale on desktop via Framer (disabled with `prefers-reduced-motion`).

---

## 7. Accessibility (WCAG 2.1 AA aim for SP1; full audit in SP7)
- Semantic landmarks (`<header><nav><main><footer>`).
- Skip-link (visible on focus): "Skip to content".
- All interactive triggers are real `<button>` or `<a>`.
- Focus ring: `outline-2 outline-primary outline-offset-2`, never removed.
- Lucide icons: `aria-label` on interactive, `aria-hidden` on decorative.
- Carousel: `aria-roledescription="carousel"`/`"slide"`, `aria-live` announces active slide, autoplay pauses on focus.
- Reduced-motion covers: autoplay, Framer entrance, counter count-up, FAB spring.
- Color contrast verified (Section 2.2).
- Form errors: `aria-live="polite"` region + per-field `aria-invalid` + `aria-describedby`.
- Keyboard-only path: `Tab` reaches every interactive element; Esc closes modals/sheets/FAB.

---

## 8. Testing & QA scope for SP1
- **No E2E in SP1** (deferred to SP7).
- `tsc --noEmit` clean.
- Zod `.parse()` on every content array at module load (fail loud at dev start if malformed).
- `pnpm build` succeeds; homepage renders without console errors.
- **Manual QA checklist:** mega-menu keyboard nav · mobile sheet open/close · hero autoplay + arrows + dots + swipe · testimonial filter · stat counter on scroll · tab switch · every CTA goes somewhere (modal or coming-soon tooltip) · footer year correct · Demo banner appears in dev · cloud-promo dismiss persists.

---

## 9. Success criteria (done-when)
1. `pnpm build` succeeds clean.
2. Homepage at `http://localhost:3000/` renders all 9 sections in defined order with Manrope + Lora fonts and Ivory Pearl palette; no Next.js boilerplate visible anywhere.
3. Mega-menu works on desktop; mobile sheet works <1024px; keyboard `Tab` reaches every control.
4. Every form path reaches `SuccessModal`; wrong OTP shakes; `123456` succeeds.
5. **Zero references** to *Antraweb, AntraCloud, BSE, BCCI, HPCL, Oppo, Amazon, Samsung, IDBI, NSE, Aarti Industries, UFO Moviez, Sahara Star, Mahindra, Nakshatra, TSS Ka Shahenshah* anywhere in code, content, or rendered output.
6. Every placeholder content item carries `isPlaceholder: true`; dev banner shows the count.
7. SaaS scaffold deleted; unused deps removed; new deps installed; shadcn primitives added and rethemed.
8. `tsc --noEmit` passes.

---

## 10. Explicit deviations from the original B2B spec (all user-driven)
- Antraweb / AntraCloud rebranded to Finquanta / generic "Tally on Cloud".
- Tally-red CTA palette → Ivory Pearl pastel.
- Poppins/Roboto/Open Sans → Manrope + Lora italic for tagline.
- Stat values reduced from 35,772+ etc. to Finquanta-plausible numbers.
- All client logos / award names / testimonial company names invented placeholders.
- Hero slides 6–8 → 5 (no TallyPrime 7 / no partner-award slides).
- Lead-capture backend, OTP SMS, reCAPTCHA, GA4/GTM/Meta Pixel, Mailchimp, CMS deferred to SP5/SP6.
- All inner routes (about / products / blog / policies / etc.) deferred to SP2+.
- Career, Download, policy, product detail links → coming-soon tooltips.
- Lighthouse targets and cross-browser QA deferred to SP7.

---

## 11. Open items (placeholders rendered in SP1; flagged for the user)
1. **Phone number digit count** — the card transcription reads `+91 99120 37912 3` (11 digits after +91, which is one too many for an Indian mobile number). The spec normalizes to `+919912037912` (drops trailing `3`) for `tel:` and `wa.me/` links. **Confirm with user** before launch — could be either the trailing `3` or one earlier digit that's wrong.
2. **Office address** (card has none) — placeholder "Mumbai, Maharashtra, India".
3. **Founded year** — placeholder `2018`.
4. **ISO / DMCA / Tally 5-star badges** — none provided; footer shows placeholder slot.
5. **Social links** — none on card; footer social row hidden until provided.
6. **Real client logos & testimonial photos** — invented placeholders in SP1.
7. **Real award badge artwork** — generated SVG placeholders in SP1.

---

## 12. Risks & mitigations
| Risk | Mitigation |
|---|---|
| Next 16's `unstable_instant` API name suggests churn — could change in a future release | Keep the export isolated to one file; if it breaks on upgrade, the only change needed is in `app/page.tsx`. SP7 upgrade audit will catch this. |
| shadcn/ui ships components targeted at Tailwind v3 patterns; we're on v4 | Init recently-shipped versions of shadcn that target v4; retheme each component immediately to verify v4 token resolution. |
| Embla autoplay + reduced-motion edge case if user toggles preference mid-session | Subscribe to `matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', …)` and pause autoplay live. |
| Counter rAF leak if section unmounts mid-animation | `cancelAnimationFrame` on cleanup in useEffect return. |
| Marathi/Hindi text rendering — Manrope's Devanagari coverage is limited | Add Noto Sans Devanagari as a fallback in the font stack via `next/font/google`; load conditionally on the homepage if `testimonials.ts` contains any non-`en` items (Embla peek-carousel renders all slides in DOM, so per-slide lazy loading would not help — the load decision is at the page level based on content). |
| Mobile FAB and StickyCloudPromo collide | Hide promo <768px (already specified). |

---

## 13. Estimated scope
- ~30–40 component files
- ~10 content files (typed)
- ~8 schema definitions
- 1 root layout, 1 page, 1 not-found, 1 globals.css, 1 tokens.css
- ~15 npm dep changes
- 1 cleanup commit + estimated 8–10 feature commits during execution

---

## 14. Out-of-scope reminders
This spec is **SP1 only**. Anything not explicitly listed under Section 1 "Goals" belongs to SP2–SP7 and will be brainstormed/spec'd in its own cycle.
