import { cn } from "@/lib/utils";
import type { Feature } from "@/lib/schema";

interface FeatureGridProps {
  items: readonly Feature[];
  columns?: 2 | 3 | 4;
  tone?: "plum" | "sand";
  className?: string;
}

/**
 * S36 — the iconless list. A bold label over a grey sub-line, separated by
 * hairlines, in 2–4 columns. No cards, no boxes, no glyphs.
 *
 * This component was the largest single site of the icon-chip purge
 * (FQ/design-to-section-map.md §"6. The icon-chip purge — S36"): the same
 * 40px `primary-100` square carrying a lucide glyph shipped on Offerings
 * cards, Values, Cloud bullets, About commitments, Career perks, add-on
 * benefits, service deliverables and mobile capabilities. A treatment that
 * appears identically on nine unrelated sections distinguishes nothing on any
 * of them — and the glyphs were literally repeating (the same `Sparkles` on
 * every benefit of every page), so four different outcomes read as one thing.
 * The chip, the lucide import and the `Card` wrapper are all deleted here.
 * `Feature.icon` stays in the schema and in `content/*` untouched; this
 * component simply stops reading it.
 *
 * Why rows beat cards for this data: feature counts across the eleven routes
 * that use this grid are 4, 4, 4, 5 and 6. Three columns orphan a cell on most
 * of them. Rows absorb any count and are honest about how short the copy is.
 *
 * Structure notes:
 *   · Hairline is `border-top` per cell, with a zero row-gap, so the rules
 *     line up into a continuous ledger down the page. The column gap is the
 *     only gutter (prototype `.vgrid { gap: 0 44px }`).
 *   · Rows size to content. S36's own documented fragility is its equal-height
 *     rhythm, so no `h-full` / `min-height` is imported here.
 *   · Nothing in a row is interactive, so there is no hover state — the old
 *     `Card hover` lift implied a click target that never existed.
 *
 * See `.vgrid` / `.vrow` in prototype/index.html and the S36 rows of
 * FQ/design-to-section-map.md (values grid, perks, "what you get",
 * capabilities, "what's in the pack", deliverables).
 */
export function FeatureGrid({
  items,
  columns = 3,
  tone = "plum",
  className,
}: FeatureGridProps) {
  // Unchanged from the card build so no route's breakpoints shift.
  const gridClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <ul
      className={cn(
        // gap-y-0 is load-bearing: the hairlines ARE the separation, and a row
        // gap would break them into floating stubs.
        "grid grid-cols-1 gap-y-0 gap-x-8 md:gap-x-10 lg:gap-x-11",
        gridClass,
        className
      )}
    >
      {items.map((item) => (
        <FeatureCell key={item.id} item={item} tone={tone} />
      ))}
    </ul>
  );
}

function FeatureCell({ item, tone }: { item: Feature; tone: "plum" | "sand" }) {
  /**
   * `tone` survives the purge because one route passes tone="sand"
   * (/tally-erp-9-vertical-solutions/[slug]) and the prop contract is frozen.
   * With the chip gone the only thing left for it to colour is the rule, so
   * sand warms the hairline instead of filling a square. Both rules land at
   * the same visual weight — rgb(46 27 69 / 0.10) composites to ~#E8E5EA on
   * white and accent-sand is #E8C89B, so the variant is a hue change, not a
   * contrast change. A separator is decorative, not a control boundary, so
   * WCAG 1.4.11's 3:1 does not apply — and no boundary here is ever the only
   * thing carrying meaning.
   */
  const ruleClass = tone === "sand" ? "border-accent-sand" : "border-hairline";

  return (
    <li className={cn("border-t py-[18px]", ruleClass)}>
      {/*
        S19: Manrope, not Lora — a label is not a human sentence, and the
        prototype sets the row label in Manrope explicitly. `font-sans` is
        stated rather than inherited so the rows keep their voice if this grid
        is ever dropped inside a serif prose context.

        Size: the prototype's values list runs 15px, and the design map asks
        the product "What you get" titles up to 20px so they outrank the 16px
        hero sub. 17/19px splits that — 20px semibold breaks the two-word
        About pillars onto three lines in the columns={4} layout, which is the
        one call site with no room to spare.
      */}
      <h3 className="font-sans text-[17px] font-semibold leading-snug text-balance text-ink sm:text-[19px]">
        {item.title}
      </h3>
      <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink-500">
        {item.body}
      </p>
    </li>
  );
}
