import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FactList, FactRow } from "@/components/ui/fact-row";
import { TagPill } from "@/components/ui/tag-pill";
import { cn } from "@/lib/utils";
import type { CaseStudyMeta, CaseStudyMetric } from "@/lib/schema";

interface CaseStudyCardProps {
  study: CaseStudyMeta;
  className?: string;
}

/* ─────────────────────────────────────────────────────────────────────────
 * Metric type discriminator
 *
 * FQ/design-to-section-map.md, route /case-study, row "Case study card grid"
 * carries an explicit warning: do NOT set metrics[0] at display scale. Of the
 * 16 authored metric values only two are bare numerals; the rest are phrases
 * ("Month-end close: 6 days -> 2 days", "SKUs under BOM: 14 finished, 38
 * sub-assemblies"). One string renderer at 40px wraps to three lines in a
 * two-column card — S16's own documented break.
 *
 * The map's prescription (stated on the sibling detail-page metric strip and
 * applying verbatim here) is to "build a metric type discriminator (delta /
 * absolute / range / qualitative) rather than one string renderer". This is
 * that. All 16 authored values classify correctly:
 *
 *   transition  "6 days -> 2 days" | "3 weeks -> same day" | "1 full day -> 1 hour"
 *   figure      "-42% YoY" | "-68% vs baseline" | "2,200" | "4" | "7 weeks"
 *               "+/-3% (from +/-22%)" | "45 across 3 godowns"
 *   phrase      "14 finished, 38 sub-assemblies" | "9 active, 14 lifetime"
 *               "From 0 to 6" | "Batch-generated, 0 manual"
 *
 * Nothing here invents, rounds, re-groups or re-orders a number. It only
 * decides what SHAPE an authored string is, so the outcome half can carry the
 * S16 weight and the rest stays legible. Indian digit grouping is authored in
 * content/case-studies/*.mdx and passes through untouched.
 * ───────────────────────────────────────────────────────────────────────── */

type ParsedMetric =
  | { kind: "transition"; from: string; to: string }
  | { kind: "figure"; figure: string; qualifier?: string }
  | { kind: "phrase"; text: string };

/** Before/after. → is the arrow the content actually uses. */
const TRANSITION = /\s*(?:→|->)\s*/;
/** Leading numeral, optionally signed (-, −) or ±-prefixed, optional %. */
const LEADING_FIGURE = /^([+\-−±]?\d[\d,.]*\s*%?)(?:\s+(.+))?$/;
const HAS_DIGIT = /\d/;

function parseMetricValue(raw: string): ParsedMetric {
  const value = raw.trim();

  // 1. Before/after. Split only on a single arrow — two arrows is not a pair.
  const halves = value.split(TRANSITION);
  if (halves.length === 2 && halves[0] && halves[1]) {
    return { kind: "transition", from: halves[0], to: halves[1] };
  }

  // 2. Compound — two figure-bearing clauses joined by a comma. These must NOT
  //    be reduced to their first numeral: promoting "14" out of "14 finished,
  //    38 sub-assemblies" is exactly the malformed figure that S24's own break
  //    says makes proof read as invented. The test is comma-THEN-SPACE, so the
  //    Indian thousands separator in "2,200" is never treated as a split.
  const comma = value.indexOf(", ");
  if (
    comma > -1 &&
    HAS_DIGIT.test(value.slice(0, comma)) &&
    HAS_DIGIT.test(value.slice(comma + 1))
  ) {
    return { kind: "phrase", text: value };
  }

  // 3. Figure + gloss. A gloss may itself carry a digit ("45 across 3
  //    godowns") — there the leading numeral genuinely is the headline.
  const match = LEADING_FIGURE.exec(value);
  if (match) {
    return {
      kind: "figure",
      figure: match[1].trim(),
      qualifier: match[2]?.trim(),
    };
  }

  return { kind: "phrase", text: value };
}

/* S19: every number is Manrope, tabular, and never breaks mid-figure.
   Sand on ink measures 9.69:1; a plum flood on ink is 2.63:1 and reads as a
   smudge, which is why sand is the accent on every dark surface on this site. */
const FIGURE_TYPE =
  "font-sans font-extrabold leading-[0.95] tracking-[-0.025em] " +
  "tabular-nums-strict text-accent-sand";
/* S16 ratio against the 11.5px label: 29/11.5 = 2.52x, 32/11.5 = 2.78x.
   Both steps clear 2.5x, including the mobile one. */
const FIGURE_SIZE = "text-[29px] sm:text-[32px]";
/* on-ink-muted is 7.10:1 on ink. ink-500 (2.41:1) and any 30%-opacity cream
   are forbidden on this ground. */
const GLOSS_TYPE =
  "font-sans text-[12.5px] font-semibold leading-[1.35] text-on-ink-muted";

function MetricValue({ parsed }: { parsed: ParsedMetric }) {
  if (parsed.kind === "transition") {
    // "6 days" at label scale, a directional glyph, "2 days" at value scale.
    // The before-half and the arrow are one nowrap unit, so the glyph can never
    // be orphaned at the end of a wrapped line.
    return (
      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={cn(
            GLOSS_TYPE,
            "tabular-nums-strict inline-flex items-center gap-1.5 whitespace-nowrap"
          )}
        >
          {parsed.from}
          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </span>
        <span className={cn(FIGURE_TYPE, FIGURE_SIZE, "whitespace-nowrap")}>
          {parsed.to}
        </span>
      </span>
    );
  }

  if (parsed.kind === "figure") {
    return (
      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className={cn(FIGURE_TYPE, FIGURE_SIZE, "whitespace-nowrap")}>
          {parsed.figure}
        </span>
        {parsed.qualifier ? (
          <span className={GLOSS_TYPE}>{parsed.qualifier}</span>
        ) : null}
      </span>
    );
  }

  // S16's documented break: a compound fact has no single number to enlarge,
  // so it keeps the accent colour and the cell geometry but not display scale.
  // Inflating one half of it would be the fabrication the contract warns about.
  return (
    <span
      className={cn(FIGURE_TYPE, "block text-[17px] leading-[1.3] sm:text-[18px]")}
    >
      {parsed.text}
    </span>
  );
}

/**
 * S30 — the dark stat nested in the lighter card, and this card's ONE accented
 * element (S16). Everything else is ink / hairline / sand-100 tag ground.
 *
 * `flex-col-reverse` puts the value on top visually while keeping `dt` before
 * `dd` in the DOM, which is what `<dl>` requires and what a screen reader
 * announces as a label/value pair.
 */
function HeadlineMetric({ metric }: { metric: CaseStudyMetric }) {
  return (
    <div className="flex flex-col-reverse gap-2 rounded-md bg-ink px-4 py-4 sm:px-5 sm:py-[18px]">
      <dt className="text-[11.5px] font-semibold uppercase leading-[1.35] tracking-[0.06em] text-on-ink-muted">
        {metric.label}
      </dt>
      <dd className="m-0">
        <MetricValue parsed={parseMetricValue(metric.value)} />
      </dd>
    </div>
  );
}

/**
 * S24 result card. The /case-study grid is S24's one sanctioned use.
 *
 * Fixed data grammar, identical on every card — repetition at a fixed position
 * is what makes four unrelated engagements read as one family (S18):
 *
 *   sector-pipe-customer composite pill  ->  title  ->  excerpt
 *   ->  one accented outcome cell  ->  one hairline outcome row
 *   ->  a circular arrow in the same fixed corner, every time.
 *
 * S24 token law: rectangles are buttons, pills are tags. Nothing rectangular
 * here is clickable except the card itself, and the pill is never a control.
 *
 * Used by /case-study (index, 4-up) and /case-study/[slug] ("Other
 * engagements", always exactly 2).
 */
export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
  // Which metric earns the accented cell. Not blindly metrics[0]: on
  // nagpur-manufacturer that is "14 finished, 38 sub-assemblies", a compound
  // phrase, and rendering it at phrase scale while the other three cards show a
  // 32px figure breaks the very repetition S18 relies on. So the accented slot
  // takes the first metric whose SHAPE can carry display scale, and the other
  // one drops to the hairline row — which is the shape S11 built for phrases.
  //
  // Both metrics are still shown, in a deterministic order. No figure is
  // invented, altered or re-grouped; only the slot each one occupies is chosen.
  // Falls back to metrics[0] when every value is a phrase.
  const headlineIndex = Math.max(
    0,
    study.metrics.findIndex((m) => parseMetricValue(m.value).kind !== "phrase")
  );
  const headline = study.metrics[headlineIndex]; // schema guarantees min 2, max 4
  const second = study.metrics.find((_, i) => i !== headlineIndex);

  // Not React.useId(): this is a server component, and adding a hook would drag
  // a static card across the client boundary for the sake of an id. The slug is
  // unique per page by construction — the index renders each study once, and
  // `related` filters the current slug out — so this cannot emit a duplicate.
  const headingId = `case-study-${study.slug}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg",
        "border border-hairline bg-white p-5 shadow-[var(--shadow-card)] sm:p-6",
        "transition-all duration-[var(--motion-base)]",
        // Neutral hover. The accent budget is spent on the ink cell below, so
        // the card edge darkens rather than turning plum.
        "hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-[var(--shadow-card-hover)]",
        "focus-within:ring-2 focus-within:ring-primary",
        className
      )}
    >
      {/* S18 terminator — same glyph, same corner, same size on every card.
          Decorative: the accessible name comes from the title link. */}
      <span
        aria-hidden
        className={cn(
          "absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-pill",
          "border border-hairline-strong text-ink-500",
          "transition-colors duration-[var(--motion-fast)]",
          "group-hover:border-ink group-hover:text-ink",
          "group-focus-within:border-ink group-focus-within:text-ink"
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>

      {/* S26 composite pill as the card header — "Pharma | Sahyadri Pharma",
          exactly the sector/company pairing the prototype's `.tag2` shows. The
          right padding is the arrow's fixed gutter.

          TagPill's halves are nowrap by default. At 11.5px bold,
          "Engineering Manufacturing | Deccan Polymers" measures ~340px, while a
          one-column card at a 320px viewport offers ~204px inside that gutter —
          so below `sm` the halves are allowed to wrap rather than be clipped by
          TagPill's own `overflow-hidden`. A truncated customer name on the page
          that sells proof is not an acceptable failure mode. The child selector
          out-specifies TagPill's utility (0,2,0 vs 0,1,0) in both directions. */}
      <div className="pr-[44px]">
        <TagPill
          left={study.sector}
          right={study.customer}
          className="max-w-full [&>span]:whitespace-normal sm:[&>span]:whitespace-nowrap"
        />
      </div>

      {/* S19 — the title is a human sentence, so it is Lora roman, balanced,
          and well above the 16px serif floor. */}
      <h3
        id={headingId}
        className="mt-3.5 text-balance font-serif text-h3-mob font-semibold text-ink sm:text-h3"
      >
        <Link
          href={`/case-study/${study.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {study.title}
        </Link>
      </h3>

      <p className="mt-2.5 text-body-sm text-ink-500">{study.excerpt}</p>

      {/* Two metrics per card, not one: the map notes this grid is the route's
          core proof section and currently its shortest band. A single `<dl>`
          holds both, so the accented cell and the hairline row read as one
          ledger rather than as a box plus a leftover. */}
      <FactList className="mt-auto pt-6">
        {headline ? <HeadlineMetric metric={headline} /> : null}

        {/* S11 — the second outcome is a hairline label/value row. No box, no
            icon, no zebra striping. FactRow's 200px spec-table column is
            re-scaled to card width and the value is right-aligned so it pairs
            with its label across the gap. */}
        {second ? (
          <FactRow
            label={second.label}
            value={second.value}
            className={cn(
              "mt-4 py-3 sm:grid-cols-[1fr_auto] sm:gap-4",
              "[&>dt]:text-[13px] [&>dt]:leading-[1.35]",
              "[&>dd]:text-[13px] [&>dd]:tabular-nums-strict sm:[&>dd]:text-right"
            )}
          />
        ) : null}
      </FactList>
    </article>
  );
}
