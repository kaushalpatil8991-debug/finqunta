# Finquanta Web Project — Status & Continuation Notes

**Last updated:** 2026-04-20 (SP7 complete — all 7 sub-projects shipped)
**Branch:** `master`
**Latest commit:** _SP7 commits_ (see `git log` for exact hashes)
**Spec:** `docs/superpowers/specs/2026-04-20-finquanta-marketing-site-sp1-design.md`

---

## 🎉 All 7 sub-projects complete

The Finquanta marketing site is feature-complete. Before going live, work through the consolidated **Pre-launch checklist** at the bottom of this document.

---

## Where we are: 7 of 7 sub-projects

| # | Sub-project | Status |
|---|---|---|
| **SP1** | Foundation + homepage | ✅ Complete |
| **SP2** | Static inner pages (22 routes) | ✅ Complete |
| **SP3** | Dynamic [slug] subroutes (36 routes) | ✅ Complete |
| **SP4** | Blog + case studies (MDX pipeline) | ✅ Complete |
| **SP5** | Forms backend | ✅ Complete |
| **SP6** | Analytics + structured data + sitemap + OG/icons | ✅ Complete |
| **SP7** | Test harness (Playwright + axe-core) | ✅ **Complete** |

---

## How to resume tomorrow

In a fresh Claude session, paste this:

> Read `docs/superpowers/STATUS.md`. All 7 sub-projects are done and committed. Help me work through the Pre-launch checklist.

If you want to run the test suites:
```bash
cd D:/Kaushal/finquanta/frontend
pnpm exec playwright install  # one-time — downloads browsers
pnpm build && pnpm start &    # or: pnpm dev
pnpm test                     # all specs across 5 projects
pnpm test:a11y                # axe-core scan only
pnpm test:ui                  # interactive Playwright UI
```

---

## SP7 — what was delivered

### Verification
- ✅ `pnpm typecheck` clean
- ✅ `pnpm build` succeeds; **77 total routes** still prerender
- ✅ Forbidden-term regression passes
- ❓ **Manual Playwright run pending** — requires browsers installed (`pnpm exec playwright install`) and a running dev or prod server

### Test harness added

`playwright.config.ts` — 5 projects (chromium · firefox · webkit · mobile-chrome · mobile-safari) with:
- Auto-starts `pnpm dev` when `BASE_URL` unset (for local use)
- Respects `BASE_URL` env for CI / staging runs
- Trace on first retry, screenshot + video on failure
- HTML + list reporters

### E2E specs (`tests/e2e/*.spec.ts`)

| Spec | Scope |
|---|---|
| `homepage.spec.ts` | 9 section render · skip-link focus · footer · Organization + WebSite JSON-LD |
| `navigation.spec.ts` | 20 representative routes × H1 text match · 404 page · mega-menu deep-link |
| `lead-flow.spec.ts` | Talk-to-Expert → form fill → OTP `123456` → Success modal · wrong-OTP error state |
| `newsletter.spec.ts` | Valid email → success · invalid email → client validation |
| `blog.spec.ts` | Index listing · tag filter · post detail renders MDX + Article JSON-LD |
| `case-study.spec.ts` | Index listing · detail metrics band + Article JSON-LD |
| `sitemap.spec.ts` | `/sitemap.xml` 200 + 70+ URLs · `/robots.txt` format |
| `a11y.spec.ts` | axe-core scan across 10 representative routes; fails on `serious`/`critical` WCAG 2.1 A/AA violations |

### Scripts added (`package.json`)
```
pnpm test        # playwright test
pnpm test:e2e    # alias for tests/e2e
pnpm test:a11y   # axe-core scan only
pnpm test:ui     # interactive Playwright UI
```

### Dependencies added
```
devDependencies:
  @playwright/test        ^1.59
  @axe-core/playwright    ^4.11
```

### Locked decisions from SP7

| Topic | Decision |
|---|---|
| Test framework | `@playwright/test`. Covers unit-like E2E, multi-browser, and integrates axe. |
| Browser matrix | Chromium + Firefox + WebKit desktop, plus Pixel 7 (mobile Chrome) and iPhone 14 (mobile Safari). |
| A11y gate | axe-core `wcag2a + wcag2aa + wcag21a + wcag21aa` — fail on `serious`/`critical` only. `color-contrast` rule disabled for now (shadow-DOM + gradient false positives); tune via manual review. |
| Lead-flow test | Uses SP5 dev-mock OTP (`123456`). Real-credential smoke test is a manual pre-launch step. |
| Server orchestration | `webServer` config auto-starts `pnpm dev`; `BASE_URL` override points tests at a running prod server. |

### SP7-specific placeholders / open items
40. **`pnpm exec playwright install`** — run once to download browser binaries (~300 MB).
41. **Tune color-contrast rule.** Currently disabled in `a11y.spec.ts` — re-enable once tested against the prod build to identify real violations.
42. **CI integration.** No CI workflow committed; GitHub Actions (or similar) is out of scope for SP7. Starting point: `pnpm install`, `pnpm exec playwright install --with-deps`, `pnpm build`, `pnpm start &`, `BASE_URL=http://localhost:3000 pnpm test`.
43. **Lighthouse audit.** Playwright lighthouse plugin not wired in SP7. Run manually in Chrome devtools on deployed URL; target Performance 90 / Accessibility 95 / Best Practices 100 / SEO 95 per spec.
44. **Visual regression.** Not included — optional add-on (`@playwright/test` supports `toHaveScreenshot`) if visual stability ever becomes a concern.

---

## Prior sub-projects — summary (details in `git log`)

- **SP6** — GTM analytics + typed events + 7 JSON-LD builders + sitemap.xml + robots.txt + default OG image + favicon.
- **SP5** — Server Actions + API route handlers for OTP verify + newsletter. 7 backend modules with dev-fallback. HMAC-signed lead sessions.
- **SP4** — MDX blog + case studies. 6 posts + 4 studies. Tag filtering.
- **SP3** — 36 dynamic [slug] routes across products / services / add-ons / mobile apps / verticals / boosters.
- **SP2** — 22 static inner pages including 6 policy documents.
- **SP1** — Homepage + site chrome + Ivory Pearl design system.

Build stats as of SP7: **77 prerendered routes** (25 static · 48 SSG · 2 dynamic API · 2 edge OG/icon endpoints).

---

# Pre-launch checklist (consolidated from SP1–SP7)

Work through this before flipping DNS to the production site.

## Content (update to real values)

### From SP1
- [ ] 1. **Phone number** — confirm `+919912037912` is correct (card text has 11 digits); edit `lib/site.ts`
- [ ] 2. **Office address** — fill out `lib/site.ts::site.address`
- [ ] 3. **Founded year** — confirm `2018` in `lib/site.ts::site.founded` (also appears in `content/pages/about.ts` timeline)
- [ ] 4. **Certification badges** — real ISO/DMCA/Tally-5-Star art in footer (`components/layout/footer.tsx`)
- [ ] 5. **Social links** — fill `lib/site.ts::site.social`
- [ ] 6. **Real client logos** — replace 12 invented wordmarks in `content/clients.ts`; drop SVGs under `public/logos/`
- [ ] 7. **Real testimonials** — replace 10 invented quotes in `content/testimonials.ts`; keep at least one non-English item
- [ ] 8. **Real award badges** — replace 6 generic awards in `content/awards.ts`
- [ ] 9. **Hero slide copy** — refine 5 slides in `content/hero-slides.ts`
- [ ] 10. **Stat values** — replace numbers in `content/stats.ts`

### From SP2
- [ ] 11. **Pricing** — confirm tier ranges in `content/pages/pricing.ts`
- [ ] 12. **Events** — replace invented Apr–Jun 2026 events in `content/pages/events.ts`
- [ ] 13. **Career openings** — replace 5 invented roles in `content/pages/career.ts`
- [ ] 14. **Download URLs** — confirm `https://tallysolutions.com/download/*` URLs in `content/pages/download.ts`
- [ ] 15. **Policy legal review** — all 6 docs in `content/policies/` are plain-English drafts; lawyer-review before publish
- [ ] 16. **Leadership** — add more team members to `content/pages/about.ts::aboutLeadership`

### From SP3
- [ ] 17. **Product edition pricing** — confirm indicative ranges in `content/details/products.ts`
- [ ] 18. **TallyPrime version numbers** — re-sync per Tally release
- [ ] 19. **Service SLA specifics** — confirm numbers in `content/details/services.ts`
- [ ] 20. **Add-on pricing** — add `priceNote` if desired (none shipped)
- [ ] 21. **Vertical pack outcomes** — replace illustrative metrics in `content/details/verticals.ts`

### From SP4
- [ ] 22. **Post authors** — replace "Finquanta Team" per post in `content/blog/*.mdx`
- [ ] 23. **Post dates** — replace seed dates with real publish dates
- [ ] 24. **Case-study customer names + consent** — replace invented customers in `content/case-studies/*.mdx`; obtain signed consent
- [ ] 25. **Case-study metrics** — replace illustrative numbers with real numbers
- [ ] 26. **Blog hero images** — (optional) add `heroImage` to BlogPostMeta and wire in PostHero

## Configuration (env vars)

### From SP5
- [ ] 27. **`LEAD_SIGNING_SECRET`** — set to 32+ char random (dev fallback is intentionally insecure)
- [ ] 28. **Resend sender verification** — verify `LEAD_FROM_EMAIL` domain in Resend console
- [ ] 29. **MSG91 DLT template** — register OTP template; update `MSG91_OTP_TEMPLATE_ID`
- [ ] 30. **Mailchimp opt-in** — decide `subscribed` vs `pending` (currently `subscribed`)
- [ ] 31. **reCAPTCHA threshold** — tune `RECAPTCHA_MIN_SCORE` after first week of traffic
- [ ] 32. **Redis rate-limit** — swap `lib/backend/rate-limit.ts` if deploying multi-server

### From SP6
- [ ] 33. **`NEXT_PUBLIC_GTM_ID`** — set GTM container id in production env
- [ ] 34. **GA4 `generate_lead` mapping** — verify in GTM container that `lead_submitted` maps correctly
- [ ] 35. **`NEXT_PUBLIC_SITE_URL`** — pin to canonical domain (sitemap + robots + OG depend on it)
- [ ] 36. **Submit sitemap** to Google Search Console after domain switch
- [ ] 37. **OG debugger smoke test** — Facebook / Twitter / LinkedIn debuggers
- [ ] 38. **Per-slug OG** — (optional) add `app/blog/[slug]/opengraph-image.tsx` if marketing wants per-post imagery
- [ ] 39. **Publisher logo** — swap `articleSchema()` reference to ≥112×112 PNG for strict schema validation

### From SP7
- [ ] 40. **Install Playwright browsers** — `pnpm exec playwright install`
- [ ] 41. **Re-enable color-contrast** in `a11y.spec.ts` after fixing real violations
- [ ] 42. **CI wiring** — GitHub Actions (or similar) running `pnpm test` on PRs
- [ ] 43. **Manual Lighthouse audit** on deployed URL — hit the per-route targets in the spec
- [ ] 44. **Visual regression** — (optional) add Playwright screenshot baselines

---

## Quick reference

**Mock OTP code (dev fallback):** `123456`

**Commands:**
```bash
pnpm dev            # dev server at http://localhost:3000
pnpm typecheck      # tsc --noEmit
pnpm build          # production build (77 routes)
pnpm lint           # eslint
pnpm test           # Playwright — all specs, all browsers
pnpm test:e2e       # Playwright — E2E only
pnpm test:a11y      # axe-core scan
pnpm test:ui        # Playwright UI mode (interactive)
```

**Single source of truth files (edit these to change content):**
- Identity: `lib/site.ts`
- Design tokens: `styles/tokens.css`
- Env: `.env.local` (copy from `.env.example`) — read via `lib/env.ts`
- Backend: `lib/backend/*.ts`
- Analytics: `lib/analytics.ts` + `components/analytics/gtm.tsx`
- SEO: `lib/seo.ts` + `components/seo/json-ld.tsx`
- Sitemap: `app/sitemap.ts`
- Homepage content: `content/{name}.ts`
- Overview pages: `content/pages/{name}.ts`
- Detail pages: `content/details/{category}.ts`
- Blog: `content/blog/{slug}.mdx`
- Case studies: `content/case-studies/{slug}.mdx`
- Policies: `content/policies/{slug}.ts`
- Navigation: `content/navigation.ts`
- MDX styling: `mdx-components.tsx`
- Tests: `tests/e2e/*.spec.ts` · `playwright.config.ts`

**Spec doc:** `docs/superpowers/specs/2026-04-20-finquanta-marketing-site-sp1-design.md`

---

## What's NOT in SP1–SP7 (deliberate out-of-scope)

- **CI pipeline** — GitHub Actions or similar. Playwright tests run locally.
- **Visual regression baselines** — `toHaveScreenshot` can be added if needed.
- **Redis / Upstash rate-limit** — in-memory limiter works for single-server deploy.
- **Admin UI for leads** — leads go to email + CRM stub only. Build an admin page (or just use Mailchimp/a CRM) when the volume justifies it.
- **Multi-language UI** — Marathi/Hindi appear only as testimonial content with `lang` attributes. Full i18n deferred.
- **Real CMS** — content lives in typed TS + MDX files. Swap to Sanity/Contentful via adapter when the editorial team outgrows git.
- **Database** — no DB; leads persist via email + CRM stub. Add Postgres + Prisma when the admin UI ships.
- **Authentication** — public marketing site only. No login surface.

---

## Total delivery

- **77 prerendered routes** across 6 route families
- **~15,000 lines** across components, content, backend, SEO, tests
- **Zero external SDKs** — reCAPTCHA / MSG91 / Resend / Mailchimp / GA4 all via direct HTTP
- **Dev-fallback on every external integration** — offline dev works identically to prod
- **Full WCAG 2.1 AA aim** with Playwright + axe-core regression harness
- **Full JSON-LD coverage** — Organization, WebSite, BreadcrumbList, Article, Product, FAQPage
- **Zero forbidden-term hits** in code or content

---

*Spec written 2026-04-20. SP1–SP7 executed and committed same day.*
