import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { HeroGradient } from "@/lib/schema";

interface Crumb {
  label: string;
  href?: string;
}

interface PostHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  date: string;
  author: string;
  readMinutes: number;
  tags: readonly string[];
  gradient?: HeroGradient;
  crumbs?: Crumb[];
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
 * `date` is a plain ISO calendar date ("2026-04-02"), which `new Date()` reads
 * as UTC midnight. Formatting it in the viewer's zone therefore renders the
 * previous day for anyone west of UTC — and, because this page is statically
 * rendered on a UTC builder and hydrated in the reader's browser, that is also
 * a hydration mismatch. Pinning the zone to UTC prints the authored date, and
 * prints the same string on both sides of hydration.
 */
function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** "how-to" is a tag slug, not a word. Only display formatting — no content edit. */
function topicLabel(tag: string) {
  return tag.replace(/-/g, " ");
}

/**
 * S27 ground + S16 meta row — the editorial masthead for /blog/[slug].
 *
 * WHY THE WASH WENT. The per-post gradient used to be the ground, and it broke
 * two things the design map records as live failures: `ink-500` meta over
 * `gradient-plum` / `gradient-violet` measures ~4.0–4.3:1 and fails AA on three
 * of the six posts, and the plum tag chips were `bg-primary-100 #EEE0F5` —
 * *exactly* `gradient-plum`'s start colour, so they had no surface contrast at
 * all. S27's take is hard three-colour discipline: no gradient, no glass, no
 * blur. The ground is now the flat sanctioned band tint (`--color-cream-100`),
 * which puts the byline at ~9.9:1 (ink-700) and its labels at ~5.5:1 (ink-500).
 *
 * The `gradient` prop is unchanged and still load-bearing: it paints a 3px
 * identity edge at the top of the band, so each post keeps its own colour
 * without any text ever sitting on a wash.
 *
 * S31 is deliberately NOT used here. It is capped at three sanctioned uses and
 * this is not one of them — this file has no position indicator to dress, the
 * column is centred with no empty right half to hang a rail in, and a rail in a
 * non-sticky band scrolls away before the first H2. The article body's rail is
 * a different component.
 *
 * The decorative `PostArc` (three white rings at 20–55% opacity) was deleted
 * with the wash: white on cream-100 measures ~1.05:1, so it was invisible, and
 * S27 rules the motif out regardless.
 */
export function PostHero({
  eyebrow,
  title,
  date,
  author,
  readMinutes,
  tags,
  gradient = "plum",
  crumbs,
  className,
}: PostHeroProps) {
  // Per-instance id. The literal "post-hero-heading" emitted duplicate ids and
  // aimed every aria-labelledby at the first one if a page rendered two heroes.
  const headingId = React.useId();

  const allCrumbs = crumbs ?? [];
  // The route passes [Home, Blog, <full post title>]. The trailing crumb has no
  // href because it *is* this page, and it repeated the H1 verbatim on the line
  // directly above it. Ancestors stay visible; the current page is announced to
  // assistive tech only — the H1 states it for everyone else.
  const last = allCrumbs.length > 1 ? allCrumbs[allCrumbs.length - 1] : undefined;
  const currentLabel = last && !last.href ? last.label : undefined;
  const trail = currentLabel ? allCrumbs.slice(0, -1) : allCrumbs;
  // The JSON-LD keeps the complete list — the visual trim is presentational and
  // must not shorten the BreadcrumbList Google reads.

  // The eyebrow was "Finquanta blog" on all six posts: identical everywhere and
  // redundant with the "Blog" crumb one line above. It now carries the post's
  // primary tag, which is the one thing that differs post to post. This is also
  // where the dropped tag chips survive — the reader has just come from a card
  // that showed the full tag set, and the route still ships every tag in the
  // OpenGraph metadata.
  const topic = eyebrow ?? (tags.length > 0 ? topicLabel(tags[0]) : undefined);

  return (
    <section
      aria-labelledby={headingId}
      className={cn("border-b border-hairline bg-cream-100", className)}
    >
      {allCrumbs.length > 0 && <JsonLd data={breadcrumbSchema(allCrumbs)} />}
      {/* The only surviving use of the per-post gradient: a 3px identity edge. */}
      <div aria-hidden className={cn("h-[3px] w-full", gradientClass[gradient])} />
      {/*
       * Same container as SectionBand (max-w-[1280px] + page gutters) with the
       * max-w-3xl column nested inside it, so the H1 sits on exactly the same
       * measure as the article body below. The old `mx-auto max-w-3xl px-gutter`
       * subtracted the gutter from the 768px column instead, which indented the
       * hero 20–48px relative to the prose it introduces.
       */}
      <div className="mx-auto max-w-[1280px] px-gutter py-12 sm:px-gutter-sm sm:py-16 md:px-gutter-md md:py-20 lg:px-gutter-lg lg:py-24">
        <div className="mx-auto max-w-3xl">
          {trail.length > 0 && (
            /*
             * Rendered locally rather than with the shared `Breadcrumbs`: that
             * component marks its last item as aria-current="page" and strips
             * its link, which would be a lie about /blog once the title crumb
             * is trimmed. Styling matches it exactly.
             */
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-body-sm text-ink-500 sm:mb-6"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                {trail.map((item, i) => (
                  <li
                    key={`${item.label}-${i}`}
                    className="flex items-center gap-1.5"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="rounded-sm font-medium text-ink-700 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {i < trail.length - 1 && (
                      <ChevronRight
                        className="h-3.5 w-3.5 text-ink-300"
                        aria-hidden
                      />
                    )}
                  </li>
                ))}
                {currentLabel && (
                  <li className="sr-only" aria-current="page">
                    {currentLabel}
                  </li>
                )}
              </ol>
            </nav>
          )}

          {topic && <EyebrowLabel>{topic}</EyebrowLabel>}

          {/* S19: Lora roman carries the human sentence; text-balance keeps the
              rag off a one-word last line. font-semibold, not bold — Lora is
              loaded at 400/500/600, so `font-bold` was synthesising 700.
              The ramp was `sm:text-h1 md:text-display-mob`, i.e. 30 → 40 → 36px:
              the title visibly SHRANK crossing 768px. Now 30 → 36 → 40, and it
              stops at 40px because a 61–140 character post title set at
              --text-display (56px) in a 768px measure runs to five lines. */}
          <h1
            id={headingId}
            className="mt-3 text-balance font-serif text-h1-mob font-semibold leading-tight tracking-tight text-ink sm:text-display-mob md:text-h1"
          >
            {title}
          </h1>

          {/*
           * S16 meta row, icon-free. The three calendar / user / clock lucide
           * glyphs are gone: they restated their own values, and S36's icon
           * purge applies to any decorative glyph standing in front of a label.
           * A <dl> gives a screen reader the label/value pairing the grid shows.
           *
           * Not FactRow: that primitive is the vertical spec table (fixed 200px
           * label column, one pair per line). A masthead byline is three short
           * pairs on one line — same law, different axis.
           *
           * S19: every value here is Manrope, and the digits are tabular.
           */}
          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-t border-hairline pt-5 sm:mt-8">
            <div>
              <dt className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ink-500">
                Published
              </dt>
              <dd className="m-0 mt-1.5 text-body-sm font-semibold tabular-nums text-ink-700">
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ink-500">
                Written by
              </dt>
              <dd className="m-0 mt-1.5 text-body-sm font-semibold text-ink-700">
                {author}
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ink-500">
                Reading time
              </dt>
              <dd className="m-0 mt-1.5 text-body-sm font-semibold tabular-nums text-ink-700">
                {readMinutes} min
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
