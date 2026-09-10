import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/schema";

interface ProcessStepsProps {
  steps: readonly ProcessStep[];
  className?: string;
}

/**
 * S31 — the numbered rail: `01` … `0n` markers strung on one continuous track.
 *
 * Why numbering is legitimate here when the site-wide rule is suspicious of it:
 * a process genuinely *is* a sequence. "Scope & quote" cannot happen after
 * "Quarterly reviews". The numeral is not decoration, it is the ordering fact,
 * so it earns the spine position and the track that joins the markers.
 *
 * What was removed and why (FQ/design-to-section-map.md, the `ProcessSteps`
 * rows on /tally-services, /tally-services/[slug], /tally-customization and
 * the /about-us journey band):
 *
 *  · The `bg-primary-50` circular chip holding a serif-italic numeral — the
 *    site-wide icon-chip purge (S36). A tinted disc behind every marker also
 *    spent the view's one accent four times over.
 *  · The 1px dashed `ink-300` connector. It was invisible at 1px, and at
 *    `sm:grid-cols-2` it was drawn at the row break pointing into empty space.
 *    A rail cannot be faked from a 4-up grid; it has to be a single column.
 *  · The white card, its `cream-200` border and its shadow. cream-200 on white
 *    is ~1.2:1, so the "card" was an invisible box costing 24px of padding on
 *    every side, and equal-height cards made one long step body inflate all
 *    four. Stacked rows have no such coupling — which also retires the
 *    "same component changes density between slugs" complaint, because rows
 *    grow downward instead of padding sideways.
 *
 * Type (S19): every numeral is Manrope and `tabular-nums`, so 01/02/03/04 sit
 * on one optical axis against the track. Titles are short labels, not human
 * sentences, so they stay sans and bold — the `.vrow`/FactRow grammar.
 *
 * Colour: no accent at all. A process is a sequence in which *all* steps
 * happen; tinting step one asserts a rank the content does not have, and S16
 * allows exactly one accented element per view — the band's plum eyebrow
 * already spends it.
 *
 * Serves four routes, one of which (/about-us) is a company timeline rather
 * than a process, so nothing here may say the word "step" in visible copy.
 *
 * ⚠ GOTCHA — why the static class strings below are plain literals, not cn():
 * tailwind-merge has no knowledge of this project's custom type scale, so it
 * classifies an unrecognised `text-<name>` as a *colour* utility and then drops
 * it as a conflict with the real colour beside it. Measured against the version
 * of tailwind-merge in this repo:
 *
 *     twMerge("text-h3 text-ink-500")      -> "text-ink-500"   // size lost
 *     twMerge("text-body-sm text-ink-500") -> "text-ink-500"   // size lost
 *     twMerge("text-[15px]/[1.35] text-ink") -> unchanged      // arbitrary ok
 *
 * The marker had exactly this bug when it went through cn(): it rendered at the
 * inherited 16px instead of 22/28px, silently. Any class string here that pairs
 * a `text-<token>` *size* with a `text-<token>` *colour* must therefore stay a
 * plain literal. cn() is still used wherever the classes are conditional and
 * carry no type tokens (the track, the row padding, the caller's className).
 */
export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  if (steps.length === 0) return null;

  // A one-item "sequence" has nothing to connect; a lone 12px stub hanging off
  // a single marker would read as a rendering fault.
  const hasTrack = steps.length > 1;

  return (
    // `role="list"` is not redundant: Tailwind's preflight sets
    // `list-style: none`, which makes VoiceOver drop list semantics — and the
    // list semantics are what tell a screen-reader user "3 of 4" without the
    // markup having to spell it out in copy that would be wrong on /about-us.
    // Capped at ~44rem and centred: the four call sites all sit under a
    // centred SectionHeader, and a full 1280px measure would strand the rail
    // at the far left of the band.
    <ol role="list" className={cn("mx-auto w-full max-w-[44rem]", className)}>
      {steps.map((s, i) => {
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;
        // Displayed marker comes from the authored `step`, not the array
        // index, so the rail always agrees with the content file. Padded to
        // two digits for the 01/0n rail form; the pad zero is hidden from
        // assistive tech so it announces "1", not "zero one".
        const padded = s.step < 10;

        return (
          // Three columns: marker · track · content. The track is a real 1px
          // grid column rather than an absolutely-positioned overlay, so it is
          // continuous by construction — each row's segment paints its full row
          // height and the rows are flush siblings, leaving no seam for a
          // rounding error to open up.
          <li
            key={s.step}
            className="grid grid-cols-[2.5rem_1px_1fr] gap-x-3 sm:grid-cols-[3.25rem_1px_1fr] sm:gap-x-6"
          >
            {/*
              Plain literal, not cn() — see the GOTCHA in the header block.

              The fixed 24px box at the row top puts every marker's optical
              centre at exactly 12px, which is what the track's `mt-3` and `h-3`
              below are measured against, at every breakpoint. `leading-none`
              lets the 28px numeral overflow that 24px box harmlessly instead of
              moving the offset, so one pair of track offsets serves both sizes.
            */}
            <span className="flex h-6 items-center justify-end text-h3 font-semibold leading-none tabular-nums text-ink-500 sm:text-[1.75rem]">
              {/* One inner span so "0" and the digit stay a single inline text
                  run — as two bare flex items they would be laid out as
                  separate boxes rather than kerned as one numeral. */}
              <span>
                {padded && <span aria-hidden="true">0</span>}
                {s.step}
              </span>
            </span>

            {hasTrack ? (
              <span
                aria-hidden="true"
                className={cn(
                  "w-px bg-hairline-strong",
                  // Grid items stretch by default, so a middle segment spans
                  // its whole row: marker centre of this row to marker centre
                  // of the next. The first starts at its own marker centre,
                  // the last stops at its own — the track therefore runs
                  // exactly 01 → 0n and terminates on a number, not in air.
                  isFirst && "mt-3",
                  isLast && "h-3"
                )}
              />
            ) : (
              // Keeps the three-column shape (and the marker's alignment)
              // identical whether or not a track is drawn.
              <span aria-hidden="true" />
            )}

            {/* The gap between rows lives inside the content cell, never as a
                list gap or li margin — margin between rows would cut the
                track into four floating dashes. */}
            <div className={cn(!isLast && "pb-7 sm:pb-10")}>
              <h3 className="text-balance text-[15px]/[1.35] font-bold text-ink sm:text-h4">
                {s.title}
              </h3>
              {/* ~56ch keeps the longest body (the AMC steps run to 150
                  characters) at a readable measure instead of one 90ch line. */}
              <p className="mt-1.5 max-w-[56ch] text-body-sm text-ink-500">
                {s.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
