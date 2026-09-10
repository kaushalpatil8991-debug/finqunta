import * as React from "react";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Breadcrumbs } from "@/components/page/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { HeroGradient } from "@/lib/schema";

interface Crumb {
  label: string;
  href?: string;
}

interface DetailHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  gradient?: HeroGradient;
  crumbs?: Crumb[];
  /** Aside rendered in the right column on lg+. Stacks on mobile. */
  aside?: React.ReactNode;
  className?: string;
}

const gradientClass: Record<HeroGradient, string> = {
  plum: "gradient-plum",
  mist: "gradient-mist",
  sand: "gradient-sand",
  violet: "gradient-violet",
  "cream-gold": "gradient-cream-gold",
};

/**
 * S27 -- two-column detail hero for the six [slug] templates: identity column
 * on the left, conversion aside on the right. Collapses to stacked on mobile.
 *
 * WHAT CHANGED, AND WHY.
 *
 * 1. HeroArc is gone. This file carried its own private copy of the three-ring
 *    SVG that was deleted from PageHero -- same motif, same defects: it was
 *    `hidden sm:block` so mobile got nothing, its white strokes ran at 25-55%
 *    opacity over pastel grounds (roughly 1.1:1 on the palest two, i.e.
 *    invisible), and it was identical on all 36 routes, so it differentiated
 *    nothing. S27 rules out the decorative motif regardless of whether it
 *    happens to be visible.
 *
 * 2. The flat ground is now the default, matching PageHero. `gradient` is
 *    still honoured when passed -- all six templates currently pass one from
 *    `content/details/*.ts`, where each cluster spends five distinct tokens
 *    across its slugs, so unilaterally ignoring the prop here would silently
 *    discard a per-slug decision owned by content. Only the default moved:
 *    absent a token, the band paints the sanctioned tint (--color-cream-100),
 *    which is also the one ground on which every element in this hero clears
 *    AA (see 3).
 *
 * 3. The sub moved from ink-500 to ink-700. Measured, on the gradient tokens
 *    content actually ships:
 *      ink-500 #6E5485 on gradient-violet's #B99AD6 end = 2.65:1  FAILS
 *                      on gradient-plum's   #C7B8F5 end = 3.55:1  FAILS
 *                      on cream-gold's      #E8C89B end = 4.03:1  FAILS
 *      ink-700 #4A2C6B on the same three    = 4.64 / 6.23 / 7.06  all pass
 *    That is a live AA failure on three of the five tokens, i.e. on roughly
 *    half of the 36 slugs, and ink-700 clears 4.5:1 on all ten gradient stops
 *    and on cream-100 (9.93:1). The prototype hero sets its sub in ink-700
 *    for the same reason.
 *
 * 4. The H1 is Lora roman at 600 (S19). It was `font-bold` -- Lora is loaded
 *    at 400/500/600 only (app/layout.tsx), so 700 was synthesising a fake
 *    bold. It is also capped at --text-h1 (2.5rem) instead of --text-display
 *    (3.5rem): at lg this column is 1.4fr of a two-column grid, ~680px, and
 *    the longest shipped title is 88 characters, which sets to four lines at
 *    3.5rem and pushes the sub below the fold.
 *
 * S16 note: the hero deliberately holds no figure of its own. Proof on this
 * template lives in the `aside` (price, commitment, hairline fact rows), and
 * S16 allows exactly one accented element per view -- the aside's CTA is it.
 */
export function DetailHero({
  eyebrow,
  title,
  sub,
  gradient,
  crumbs,
  aside,
  className,
}: DetailHeroProps) {
  // Per-instance id. The literal "detail-hero-heading" emitted a duplicate id
  // on any page rendering two heroes, and pointed both aria-labelledby
  // references at whichever one parsed first.
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        // No `overflow-hidden`: the only thing that needed clipping was the
        // arc, and the rule was also clipping the aside card's shadow and any
        // focus ring landing on the band's edge.
        "relative border-b border-hairline",
        gradient ? gradientClass[gradient] : "bg-cream-100",
        className
      )}
    >
      {crumbs && crumbs.length > 0 && (
        <JsonLd data={breadcrumbSchema(crumbs)} />
      )}
      <div
        className={cn(
          "relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-8 px-gutter py-12 sm:gap-10 sm:px-gutter-sm sm:py-16 md:px-gutter-md md:py-20 lg:gap-14 lg:px-gutter-lg lg:py-24",
          // Two columns only when there is something to put in the second one.
          // With the template applied unconditionally, an aside-less call site
          // left the H1 pinned to 58% of the container against dead space.
          aside && "lg:grid-cols-[1.4fr_1fr]"
        )}
      >
        <div>
          {crumbs && crumbs.length > 0 && (
            <Breadcrumbs items={crumbs} className="mb-5 sm:mb-6" />
          )}
          {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
          {/* S19: Lora roman carries the human sentence; text-balance keeps
              the rag even, which matters most on the 80-90 character titles
              this template ships. */}
          <h1
            id={headingId}
            className="mt-3 max-w-3xl text-balance font-serif text-h1-mob font-semibold leading-tight tracking-tight text-ink sm:text-display-mob md:text-h1"
          >
            {title}
          </h1>
          {sub && (
            <p className="mt-4 max-w-2xl text-body text-ink-700 sm:mt-5 sm:text-body-lg">
              {sub}
            </p>
          )}
        </div>
        {aside && <div className="lg:pt-2">{aside}</div>}
      </div>
    </section>
  );
}
