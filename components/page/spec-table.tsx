import * as React from "react";
import { cn, formatIndianNumber } from "@/lib/utils";
import type { SpecRow } from "@/lib/schema";

interface SpecTableProps {
  rows: readonly SpecRow[];
  /** Optional caption-style title above the table. */
  title?: string;
  /** Two-column (stacked on mobile) by default. */
  layout?: "list" | "grid";
  className?: string;
}

/**
 * S11 — the fact-row law, applied to the detail-page spec ledger.
 *
 * Stated negatively, because that is where the corpus kept failing:
 * **no box, no zebra, no icons, no tick glyphs.** The hairline rules ARE the
 * structure. The previous build wrapped the `dl` in `rounded-lg border
 * border-cream-200 bg-white` — a white card on a cream-alt band, whose 1.2:1
 * edge was invisible anyway, so it paid for a box and got no boundary.
 *
 * THE LAYOUT RULE THAT MATTERS: the label/value pair never stacks. The old
 * component collapsed to one column below `sm`, which turned a six-row
 * specification into six paragraphs — on the one viewport where an evaluator
 * is most likely to be comparing two products. The comparison IS the content,
 * so the two columns hold at every width and the ledger pans horizontally
 * inside its own scroll region instead of reflowing.
 *
 * Column sizing supersedes the contract's "drop to 1fr/1fr when rows < 5"
 * note: the label track is `max-content`, so it is exactly as wide as the
 * longest label in THIS table and the value column takes everything else.
 * That fixes the short-column complaint (TSS has four rows, and a fixed 1.4fr
 * value column left it stranded) for every row count, with no branch.
 *
 * See `.frow` / `.cdl` in prototype/index.html; type sizes and weights are
 * kept identical to `FactRow` so the two S11 surfaces read as one family.
 */

/**
 * Values that are short scalars get a right-aligned, one-line column — the
 * clean right edge an evaluator scans, and the reason for tabular figures.
 * Values that are sentences do not: FQ/design-to-section-map.md overturns S11
 * for exactly this case ("60–110-character sentences ... wrap into a ragged
 * block when right-aligned"). So the decision is made per table, from the
 * data, and the column is uniform either way — never mixed alignment.
 *
 * 28 chars is the boundary: "Monthly subscription" (20) is a scalar;
 * "Finquanta sync service on your TallyPrime server" (47) is a sentence.
 * Every spec table currently authored lands in sentence mode.
 */
const SCALAR_MAX = 28;

/**
 * A figure inside free text: a digit run, not glued to a word character and
 * not part of a dotted / hyphenated / slashed identifier.
 *
 * The guards are the whole point. Spec values are dense with numbers that must
 * NOT be grouped — "Windows Server 2019 / 2022", "TLS 1.3", "AES-256",
 * "iOS 15+", "8-core CPU · 32 GB RAM". Grouping a year into "2,019" is the bug
 * this rule usually ships with.
 */
const FIGURE = /(^|[^\w.,/-])(\d[\d,]*\d|\d)(?![\w,]|\.\d)/g;

/**
 * S16's digit grouping, applied to any figure in a value: 150000 -> 1,50,000,
 * and western grouping normalised to Indian (150,000 -> 1,50,000).
 *
 * Only runs of 5+ digits, or runs that already carry a separator, are touched —
 * four digits and fewer are years, versions, build numbers and seat counts,
 * where a comma is wrong. Known limitation: a bare 6-digit PIN code would be
 * grouped; no spec value in `content/details/*` contains one.
 */
function groupIndianDigits(text: string): string {
  return text.replace(FIGURE, (match, lead: string, figure: string) => {
    const digits = figure.replace(/,/g, "");
    if (digits.length < 5 && !figure.includes(",")) return match;
    if (digits.length > 15) return match; // past Number's safe integer range
    const n = Number(digits);
    return Number.isSafeInteger(n) ? lead + formatIndianNumber(n) : match;
  });
}

export function SpecTable({
  rows,
  title,
  layout = "list",
  className,
}: SpecTableProps) {
  const scalar = rows.every((r) => r.value.trim().length <= SCALAR_MAX);

  // `grid` splits one ledger into two side-by-side ledgers at md, reading down
  // then across. Two real `<dl>`s rather than one four-column grid: a `dl` may
  // only contain dt/dd groups (or one div per group), and two lists keep each
  // hairline rule continuous across its own pair instead of breaking it into
  // four segments at the column gutters.
  const half = Math.ceil(rows.length / 2);
  const ledgers =
    layout === "grid" && rows.length >= 4
      ? [rows.slice(0, half), rows.slice(half)]
      : [rows];

  const columns = scalar
    ? // A min-content floor on the value track so a nowrap value can never
      // overflow leftwards over its own label; it widens the ledger instead,
      // and the scroll region below absorbs it.
      "grid-cols-[minmax(6.5rem,max-content)_minmax(min-content,1fr)]"
    : // 15rem is the narrowest a sentence value stays readable at. It is also
      // what forces the deliberate horizontal scroll on a phone rather than a
      // reflow: 6.5rem + 24px gutter + 15rem is about 368px.
      "grid-cols-[minmax(6.5rem,max-content)_minmax(15rem,1fr)]";

  return (
    <div className={className}>
      {title && (
        // A quiet ink micro-label, not the plum eyebrow this used to be: the
        // band header above already spends the view's one accent (S16), and
        // the contract's grouped form puts two of these on a single view
        // ("Platform" / "Licensing") — which is how grouping is expressed with
        // no schema change: render one SpecTable per group.
        <p className="mb-4 text-eyebrow font-bold uppercase tracking-[0.12em] text-ink">
          {title}
        </p>
      )}

      {/* The ledger is allowed to be wider than the viewport, so the scroll
          container has to be reachable by keyboard (WCAG 2.1.1). role +
          aria-label, not aria-labelledby: an id here would have to come from
          React.useId(), and that drags a hook — and "use client" — into a
          component that is otherwise fully static on all four routes. */}
      <div
        role="region"
        aria-label={title ? `${title} specifications` : "Specifications"}
        tabIndex={0}
        className={cn(
          "overflow-x-auto",
          ledgers.length > 1 && "md:grid md:grid-cols-2 md:gap-x-12"
        )}
      >
        {ledgers.map((ledger, li) => (
          <dl key={li} className={cn("m-0 grid", columns)}>
            {ledger.map((row, i) => (
              // Labels can repeat inside a table, so the key carries the index.
              <React.Fragment key={`${i}-${row.label}`}>
                {/* pr-6 rather than a grid column-gap: a gap would cut the
                    hairline into two segments per row, and the continuous rule
                    is the only structure this pattern has. */}
                <dt className="border-t border-hairline py-4 pr-6 font-sans text-[15px] font-bold text-ink">
                  {row.label}
                </dt>
                <dd
                  className={cn(
                    // font-sans is explicit, not inherited: S19 puts every
                    // number in Manrope, and this also renders inside MDX
                    // prose, where an ancestor may be serif.
                    // ink-700, not ink-500 — an evaluator scans the values.
                    "m-0 border-t border-hairline py-4 font-sans text-[14.5px] leading-[1.55] text-ink-700 tabular-nums-strict",
                    scalar && "whitespace-nowrap text-right"
                  )}
                >
                  {groupIndianDigits(row.value)}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        ))}
      </div>
    </div>
  );
}
