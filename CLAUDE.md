@AGENTS.md

> **AGENTS.md is currently inapplicable.** It describes the GSD framework and points at
> `.planning/`, `ROADMAP.md` and `PROJECT.md` — none of which exist in this repo. Ignore
> those references until they are created.

## Stack

Next.js 16 (App Router, Turbopack) · React · TypeScript · Tailwind v4 · Radix ·
`class-variance-authority` · `lucide-react` · zod-validated content in `content/*.ts`.

Design tokens live in `styles/tokens.css` under `@theme`, so a token name mints a utility class.
Design contract: `FQ/design-to-section-map.md` (per-section spec, measured contrast, build order)
and `prototype/index.html` (the approved static reference build).

## Environment

- **Not a git repository.** There is no undo — copy any file you are about to rewrite before a
  multi-file change.
- A `next dev` server is often already running on **:4001**. A second `next dev` refuses to start
  and prints the PID to kill.
- Playwright browsers are **not** downloaded. Launch with `chromium.launch({ channel: 'msedge' })`
  rather than running `npx playwright install`.
- Bash heredocs here mangle apostrophes and backslashes. Write non-trivial Python/JS to a file and
  run that instead of inlining it.
- Python stdout is cp1252 — wrap it before printing project text, or non-ASCII throws:
  `sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')`.

## Verifying

`npm run typecheck` · `npm run build` · `npm run lint` · `npm run test` (Playwright).

**A green build does not mean a correct page.** Three failure classes pass `tsc` *and* `next build`
silently, so always render the route and read the served HTML:

- Tailwind v4 drops an unresolvable class with **no error and no style**. A class hand-authored
  inside `@layer utilities` emits nothing when used with a variant — declare it with `@utility`.
- `tailwind-merge` classifies an unknown `text-*` as a *colour*, so a custom size token and a colour
  token in the same `cn()` evict each other. Any new `--text-*` token must also be registered in
  `lib/utils.ts` via `extendTailwindMerge`, or it silently vanishes at runtime.
- CSS layout bugs. A grid/flex child containing `w-max` content needs `min-w-0`, or the track sizes
  to its content and scrolls the whole page sideways.

## Conventions

- Never hardcode an id referenced by `aria-labelledby` / `aria-controls` — use `React.useId()`.
  Hardcoded literals emit duplicates when a page renders the component twice.
- Colour a component through CSS custom properties set **on the element**, never via a descendant
  selector: `:root:not([data-theme="light"]) .cta` outranks `.panel .cta` and silently wins.
- Type voice: `font-serif` (Lora roman) for human sentences; `font-sans` (Manrope) for every number
  and every control. Serif never inside a control.
- Radius: rectangles are buttons (`rounded-md`), pills are tags (`rounded-pill`). A pill is never a
  submit control.
- Contrast on ink surfaces is measured and documented at the top of `styles/tokens.css` — read it
  there rather than re-deriving. A 30%-opacity border on ink is 2.56:1 and fails WCAG 1.4.11, so
  secondary actions are text links with an icon, not outlined buttons.

## Known gaps

- `/personas/ca`, `/personas/accountant`, `/personas/business-owner` are linked but 404.
- `lib/site.ts` carries a malformed phone number (one digit too many) and a personal Gmail address.
- ~33 records across `content/` are flagged `isPlaceholder` — invented client names, testimonials and
  awards. They render with a visible placeholder marker; do not present them as real proof.
- `components/page/policy-layout.tsx` and `prose.tsx` are blocked on `PolicyDoc.body` being
  `z.array(z.string())`; it needs a discriminated union before the six legal documents can render
  tables or callouts.
