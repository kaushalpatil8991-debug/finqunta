import { SectionHeader } from "@/components/ui/section-header";
import { CountUp } from "@/components/fx/count-up";
import { PlaceholderFlag } from "@/components/ui/placeholder-flag";
import { stats } from "@/content/stats";
import type { Stat } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Trust stats band — S16, the number law.
 * (FQ/design-to-section-map.md §3.1 row 10; prototype `.stats` / `.sgrid` /
 * `.scell`.)
 *
 * Three rules govern this band and nothing else does:
 *
 *  1. The value is at least 2.5× its label. Here it runs 30/12 (2.5×) at the
 *     two-column breakpoint up to 42/12 (3.5×) on a wide desktop — Manrope,
 *     tabular, Indian digit grouping, and never the serif (S19: serif never
 *     inside a control and never on a number).
 *  2. Exactly ONE accented cell in the view. The band previously flooded all
 *     five with an identical plum icon chip on ink, which is five accents, i.e.
 *     none. One cell inverts to the ink ground with a sand value (9.69:1); the
 *     other four are white on the cream ground with a hairline edge.
 *  3. No icons. The four (five) identical circular icon chips are gone — part
 *     of the site-wide icon-chip purge (§3.0 item 6). `Stat.icon` is still in
 *     the schema and still populated in content/stats.ts, because other routes
 *     read it; this band simply no longer renders it. The number is the proof.
 *
 * This is a server component: nothing here holds state or an event handler.
 * `CountUp` carries its own "use client" and keeps its IntersectionObserver
 * trigger, its Indian grouping and its prefers-reduced-motion short-circuit.
 */

/**
 * The accent is DERIVED, never authored — which is what guarantees "exactly
 * one" survives a content edit. The single largest figure wins; first
 * occurrence takes a tie. On today's content that resolves to `s-tickets`
 * (18,500+), which is the cell the prototype flags `.hot`.
 */
const accentedStatId = stats.reduce<Stat | null>(
  (best, stat) => (best === null || stat.value > best.value ? stat : best),
  null
)?.id;

export function TrustStats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="border-b border-hairline bg-cream py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        <SectionHeader
          eyebrow="By the numbers"
          title={
            <span id="stats-heading" className="font-serif font-semibold">
              Your trusted Tally growth partner
            </span>
          }
          lead="Real work, real customers. Here is what Finquanta has quietly delivered across Indian SMEs."
        />

        <ul className="mt-[34px] grid grid-cols-2 gap-gutter sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <StatCell
              key={stat.id}
              stat={stat}
              accented={stat.id === accentedStatId}
            />
          ))}
        </ul>

        {/* Every figure in this band is PLACEHOLDER in content/stats.ts, and a
            number band that cannot be sourced is the one thing worse than no
            number band. The flag stays until each figure has a source and an
            "as of" date. */}
        <p className="mt-5 text-[13px] text-ink-500">
          <PlaceholderFlag />{" "}
          Conservative but unsourced. Every figure needs a source before launch
          — numbers are the whole argument of this band.
        </p>
      </div>
    </section>
  );
}

function StatCell({ stat, accented }: { stat: Stat; accented: boolean }) {
  return (
    <li
      className={cn(
        "flex flex-col gap-[10px] rounded-lg border px-4 py-5 sm:px-[22px] sm:py-[26px]",
        accented
          ? // The one accented cell. Inversion, not tint (S35) — and sand on
            // ink, because a plum flood on ink measures 2.63:1 and reads as a
            // smudge rather than as emphasis.
            "border-transparent bg-ink"
          : "border-hairline bg-white"
      )}
    >
      <CountUp
        to={stat.value}
        suffix={stat.suffix ?? ""}
        className={cn(
          // S19: every number is Manrope, tabular, and never wraps mid-figure.
          "font-sans font-extrabold leading-[0.95] tracking-[-0.025em]",
          "tabular-nums-strict whitespace-nowrap",
          // ≥ 2.5× the 12px label at every step.
          "text-[30px] sm:text-[34px] xl:text-[42px]",
          accented ? "text-accent-sand" : "text-ink"
        )}
      />
      <span
        className={cn(
          "text-[12px] font-semibold leading-[1.35] tracking-[0.05em]",
          // cream-200 would flatten this against the value; on-ink-muted is
          // 7.1:1 on ink. ink-500/ink-300 on ink are forbidden (2.41:1).
          accented ? "text-on-ink-muted" : "text-ink-500"
        )}
      >
        {stat.label}
      </span>
    </li>
  );
}
