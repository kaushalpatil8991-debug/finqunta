"use client";

import * as React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { CompoundCta } from "@/components/ui/compound-cta";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { useModal } from "@/components/modals/modal-context";
import type { LeadSource } from "@/lib/schema";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  source?: LeadSource;
  primaryLabel?: string;
  secondaryLabel?: string;
}

/**
 * S38 + S10 — the pre-footer band, shared by 25 routes.
 *
 * THE LAW OF THIS BAND: every route carries the SAME geometry — ink ground,
 * eyebrow + claim + proof on the left, the action on the right — and
 * differentiates by CONTENT ONLY, never by geometry. That is the whole reason
 * this is one component and not twenty-five.
 *
 * Colours, measured on --color-ink #2E1B45:
 *   eyebrow  accent-sand   9.69:1
 *   claim    cream-200    12.18:1
 *   proof    on-ink-muted  7.10:1  (cream-200 here would flatten claim
 *                                   against proof; that is this token's job)
 *   ink-500 as text on ink is 2.41:1 and is forbidden. NOTE: ink-300 measures
 *   5.26:1 and does NOT fail — the "ink-300 is 2.41:1" note that appeared in
 *   styles/tokens.css and newsletter.tsx confused it with ink-500.
 *
 * Fixed here:
 *  - The secondary was a `border-cream/30` outline. That border composites to
 *    #6C5D78 on ink = 2.56:1, below the 3:1 WCAG 1.4.11 needs for a control
 *    boundary. Secondary is now a text link with an icon, which is the
 *    documented pattern and has no boundary to fail.
 *  - `preserveAspectRatio="none"` stretched a 1440x320 viewBox over a band
 *    whose real height runs ~200px (desktop) to ~420px (mobile), so the three
 *    "circles" rendered as ellipses at every width and the distortion changed
 *    per route. Now `xMidYMid slice`, which crops instead of deforming.
 *  - The heading id was the hardcoded literal "cta-band-heading", so any page
 *    rendering two bands emitted duplicate ids and pointed both
 *    aria-labelledby references at the first. Now per-instance via useId.
 *
 * NOT fixed here, because it is route work and not component work: all 25 call
 * sites fall through to the default eyebrow, so every page on the site
 * currently ends with the identical "Ready when you are", and none override
 * `secondaryLabel`. Varying the *ask* per route is the point of the band.
 */
export function CtaBand({
  eyebrow = "Ready when you are",
  title,
  sub,
  source,
  primaryLabel = "Talk to an expert",
  secondaryLabel = "Request a callback",
}: CtaBandProps) {
  const { open } = useModal();
  const headingId = React.useId();
  const leadArgs = source ? { source } : undefined;

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-ink text-cream"
    >
      <BandArt />
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-gutter py-12 sm:gap-8 sm:px-gutter-sm sm:py-16 md:flex-row md:items-center md:justify-between md:px-gutter-md md:py-20 lg:px-gutter-lg">
        <div className="max-w-2xl">
          <EyebrowLabel className="text-accent-sand">{eyebrow}</EyebrowLabel>
          {/* S19: Lora roman for the human sentence. Every control and number
              in this band stays sans. */}
          <h2
            id={headingId}
            className="mt-3 text-balance font-serif text-h1-mob font-semibold leading-tight text-cream-200 sm:text-h1"
          >
            {title}
          </h2>
          {sub && (
            <p className="mt-3 text-body text-on-ink-muted sm:text-body-lg">
              {sub}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          {/* S10 — the compound CTA is THE primary control, everywhere. */}
          <CompoundCta
            tone="sand"
            className="w-full justify-between sm:w-auto sm:justify-start"
            onClick={() => open("talk", leadArgs)}
          >
            {primaryLabel}
          </CompoundCta>

          {/* Secondary is a text link with an icon — never an outline. */}
          <button
            type="button"
            onClick={() => open("callback", leadArgs)}
            className="inline-flex cursor-pointer items-center gap-2 border-b border-hairline-on-ink pb-0.5 text-body font-semibold text-cream-200 transition-colors hover:border-accent-sand hover:text-accent-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-sand"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {secondaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

function BandArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 320"
      // `slice` crops the artwork to fill the band and keeps the rings round.
      // `none` deformed them into ellipses at every breakpoint.
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cta-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A4FB0" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#B99AD6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#E8C89B" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect width="1440" height="320" fill="url(#cta-grad)" />
      <circle cx="1280" cy="80" r="120" stroke="#E8C89B" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <circle cx="1280" cy="80" r="60" stroke="#E8C89B" strokeWidth="1" strokeOpacity="0.25" fill="none" />
      <circle cx="160" cy="260" r="140" stroke="#B99AD6" strokeWidth="1" strokeOpacity="0.25" fill="none" />
    </svg>
  );
}
