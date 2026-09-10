/**
 * RETIRED — renders nothing.
 *
 * Per FQ/design-to-section-map.md §3.0, row "Sticky cloud promo" (verdict:
 * **DELETE** — dock into the S18 featured cell): the fixed bottom-right overlay,
 * its 2000ms reveal timer, its `fq.cloud-promo.dismissed-v1` localStorage key and
 * the `lg:right-28` offset that dodged the floating-action cluster are all gone.
 * Nothing here schedules work, touches storage or paints a layer any more.
 *
 * WHERE THE OFFER WENT
 *   - Desktop: the mega-menu featured cell (`.mfeat` in prototype/index.html —
 *     "Most asked for" / "TallyPrime on Cloud" / the 30-minute walkthrough line,
 *     alongside the evicted Buy and Download CTAs). Owned by the header/mega-menu.
 *   - Mobile: the foot of the navigation sheet. Owned by the mobile sheet.
 *
 * WHY IT WENT: the map's editorial fix — "free demo" was asked five times in one
 * scroll (hero slide, Offerings Cloud card, Cloud band, FAB, this promo). Cut to
 * two. An uninvited overlay that outranks the page it covers was the first to go.
 *
 * FOLLOW-UP (not this agent's file): app/layout.tsx still imports and renders
 * <StickyCloudPromo />. That import and its call site should be deleted and this
 * file removed with them. The component is kept as a no-op — with its exported
 * name and its (empty) props signature intact — purely so that layout keeps
 * compiling until whoever owns app/layout.tsx makes that edit.
 *
 * Deliberately NOT a client component: with no hooks, no effects and no event
 * handlers left, "use client" would only ship a module to the browser to render
 * nothing.
 */
export function StickyCloudPromo() {
  return null;
}
