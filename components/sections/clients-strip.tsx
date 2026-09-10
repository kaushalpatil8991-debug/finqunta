import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { PlaceholderFlag } from "@/components/ui/placeholder-flag";
import { clients } from "@/content/clients";
import type { Client } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * S04 marquee + S12 typographic tile — see `.clients` / `.cl-grid` / `.marquee`
 * in prototype/index.html and the "Clients logo strip" row of
 * FQ/design-to-section-map.md §3.1.
 *
 * The argument lives in the typographic tile on the left, not in the logos: the
 * map's ruling is that "nine fabricated company names presented as social proof
 * is worse than an empty band", so the band leads with a count that is sourced
 * from content/stats.ts (`s-customers`, 250) and treats the wordmarks as what
 * they are — twelve un-shot asset slots, rendered in the dashed placeholder
 * surface, under one PlaceholderFlag that says so in words.
 *
 * Three fixes carried over from the audit:
 *   1. `slice(0, 10)` silently dropped two of the twelve records. All twelve
 *      render now, in both the animated track and the reduced-motion scroller.
 *   2. `mask-image` edge fades. Without them the track hard-clips wordmarks
 *      mid-letter at both edges, which reads as a rendering fault.
 *   3. The band's only CTA was a `/our-clients` link wrapped in a coming-soon
 *      tooltip. The map: "Build /our-clients or delete the link; a coming-soon
 *      tooltip on the band's only CTA is a broken promise." The route does not
 *      exist, so the link is gone.
 *
 * Server component — the marquee, its pause behaviour and its reduced-motion
 * fallback are all CSS, so no hook and no event handler is needed.
 */
export function ClientsStrip() {
  const hasPlaceholders = clients.some((client) => client.isPlaceholder);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="border-b border-hairline py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        <div
          className={cn(
            "grid grid-cols-1 gap-7",
            "min-[900px]:grid-cols-[1fr_1.9fr] min-[900px]:items-center min-[900px]:gap-11"
          )}
        >
          {/* S12 — the one non-card cell, carrying the argument. */}
          <div>
            {/* The prototype's `.eyebrow` is 11px/700/.09em in ink-500, not
                the primary plum: the accent law spends plum on live state, and
                this band already spends its one accent on the marquee. Size and
                tracking are restated because `cn` runs through tailwind-merge,
                which classifies the custom `text-eyebrow` step as a text
                *colour* and drops it the moment a colour is passed in. */}
            <EyebrowLabel className="mb-3 text-[11px] font-bold tracking-[0.09em] text-ink-500">
              Who we work with
            </EyebrowLabel>
            <h2
              id="clients-heading"
              className="text-balance font-serif text-h3 font-semibold text-ink md:text-h2"
            >
              250+ Indian SMEs run their books on Tally we set up.
            </h2>
            <p className="mt-[10px] text-[15px] leading-[1.6] text-ink-500">
              Distribution, manufacturing, pharma, textiles and exports &mdash;
              mostly across Maharashtra and Gujarat.
            </p>
          </div>

          {/* S04 — the marquee. The focus ring is drawn on this outer wrapper
              rather than on the scroller itself: `mask-image` masks an
              element's own outline, so a ring on the masked element would fade
              out at the same 8% edges the wordmarks do. */}
          <div
            className={cn(
              // `min-w-0` is load-bearing: as a grid item this wrapper defaults
              // to `min-width: auto`, so the `w-max` track inside would size the
              // column to its full ~4300px content width — scrolling the whole
              // page sideways and crushing the copy column next to it. The
              // scroller's own `overflow-hidden` cannot help, because it is the
              // wrapper, not the scroller, that the grid measures.
              "min-w-0 rounded-lg",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
              "has-[:focus-visible]:outline-primary"
            )}
          >
            <div
              role="group"
              aria-label="Client wordmarks"
              // Focusable so the track can be paused from the keyboard, and so
              // the reduced-motion fallback (a horizontal scroller) can be
              // scrolled with the arrow keys.
              tabIndex={0}
              className={cn(
                "fq-cl-marquee relative overflow-hidden focus-visible:outline-none",
                "[-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
                "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
              )}
            >
              <div className="fq-cl-track flex w-max">
                <ul className="flex">
                  {clients.map((client) => (
                    <li key={client.id} className="mr-[14px] flex-none">
                      <ClientWordmark client={client} />
                    </li>
                  ))}
                </ul>
                {/* The loop's second half. Purely visual — announcing twelve
                    company names twice is the kind of duplication a marquee
                    quietly inflicts on screen-reader users. Removed entirely
                    under reduced motion, where there is no loop to seam. */}
                <ul className="fq-cl-clone flex" aria-hidden="true">
                  {clients.map((client) => (
                    <li key={`${client.id}-loop`} className="mr-[14px] flex-none">
                      <ClientWordmark client={client} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {hasPlaceholders && (
          <p className="mt-[22px] text-[13px] leading-[1.6] text-ink-500">
            <PlaceholderFlag />{" "}
            All twelve wordmarks are invented. Ship real logos only with written
            permission &mdash; the guide is explicit that fabricated client names
            are worse than an empty band.
          </p>
        )}
      </div>

      {/*
        Keyframes and the two state rules that Tailwind has no variant for:
        pausing a descendant's animation from the ancestor's :hover /
        :focus-within, and swapping the clip for a scroller under reduced
        motion. Everything else on this band is a utility class.
        Class names are namespaced `fq-cl-` because the map licenses a second
        S04 marquee above the footer, owned by another file.
      */}
      <style>{`
        @keyframes fq-cl-marquee {
          to { transform: translateX(-50%); }
        }
        .fq-cl-track {
          animation: fq-cl-marquee 46s linear infinite;
        }
        /* WCAG 2.2.2 — pointer and keyboard both stop the movement. */
        .fq-cl-marquee:hover .fq-cl-track,
        .fq-cl-marquee:focus-within .fq-cl-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .fq-cl-track { animation: none; }
          .fq-cl-clone { display: none; }
          .fq-cl-marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}

/**
 * One un-shot logo slot. Until the twelve client logo SVGs land (with written
 * permission — they are on the fixed asset budget in the map's §6), the cell is
 * drawn in the same dashed placeholder surface the photography slots use, so a
 * missing asset never passes for a delivered one.
 *
 * `sector` is a real field on ClientSchema, so the second line adds information
 * rather than repeating the name at a smaller size.
 */
function ClientWordmark({ client }: { client: Client }) {
  return (
    <div
      className={cn(
        "flex h-[76px] flex-col justify-center gap-[3px] px-[22px]",
        "rounded-lg border border-dashed border-shot-line",
        // The prototype's flat --shot-fill. tokens.css only exposes the hatched
        // composite (--shot-surface); the hatch belongs to photography slots.
        "bg-[#efe7da]"
      )}
    >
      <span className="whitespace-nowrap font-serif text-[15px] font-semibold text-ink-700">
        {client.name}
      </span>
      <span className="text-[10px] uppercase tracking-[0.07em] text-ink-500">
        {client.sector}
      </span>
    </div>
  );
}
