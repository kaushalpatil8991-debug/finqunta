import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RelatedItem } from "@/lib/schema";

interface RelatedCardsProps {
  items: readonly RelatedItem[];
  className?: string;
}

/**
 * S18 — the card family. Twelve call sites share this grid (six category
 * indexes and six detail-page "related" bands), so it is the single largest
 * lever the corpus has for making unrelated blocks read as one system.
 *
 * The three moves S18 actually prescribes, and what each replaced:
 *
 *  1. An OUTLINED LABEL CHIP as the card header (`.mchip` in
 *     prototype/index.html). It replaces the `primary-100` circular icon tile
 *     this component used to render — the site-wide icon-chip purge (S36).
 *     That tile was also dead weight: most detail schemas carry no `icon`
 *     field, so `toRelatedItems` passed `undefined` and the tile rendered on
 *     almost no route. Deleting it also deletes the
 *     `import * as Icons from "lucide-react"` namespace import and its
 *     dynamic `Icons[item.icon]` lookup, which defeats tree-shaking and drags
 *     the whole icon set into all twelve of these routes.
 *
 *  2. A CIRCULAR ARROW IN THE SAME FIXED CORNER on every card (`.bcard .go`).
 *     Repetition at a fixed position is the entire mechanism — it is what
 *     makes N unlike cards read as one family. It is positioned against the
 *     card rather than placed in flow, so a two-line title or a wrapped chip
 *     can never shift it out of register with its neighbours.
 *
 *  3. THE WHOLE CARD IS THE LINK. The old faux `Read the full page →` span
 *     was neither focusable nor clickable — the anchor wrapped the card and
 *     the span merely looked like a control, so a screen reader announced the
 *     same five-word link name on every card in the grid. Now a stretched
 *     pseudo-element on the title anchor makes the whole card clickable while
 *     the accessible name is just the destination title, and the corner arrow
 *     (aria-hidden) is the only "go" affordance drawn. `/tally-services`
 *     already tells the reader "Tap any card for the full service page", so
 *     the per-card repetition was contradicting its own section header.
 *
 * IDs: this component mints no `id`, so there is no hardcoded
 * `aria-labelledby` target to duplicate when a route renders the grid twice —
 * the trap `PageHero` and `CtaBand` were fixed for. The list is named with a
 * plain `aria-label` derived from the category instead: no id, no
 * `React.useId()`, and it reads correctly both on an index grid and in a
 * detail page's related band.
 */

/**
 * `RelatedItem` carries no category field and `lib/schema.ts` is out of scope,
 * so the chip text is derived from the `base` path every call site already
 * passes. Singular nouns — the chip labels *this* card's destination.
 */
const CATEGORY_LABEL: Record<string, string> = {
  "/tally-erp-9-products": "Tally product",
  "/tally-erp-9-add-ons-modules": "Add-on module",
  "/tally-erp-9-solution-boosters": "Booster pack",
  "/tally-erp-9-vertical-solutions": "Industry pack",
  "/tally-mobile-apps": "Mobile app",
  "/tally-services": "Service",
};

function categoryLabel(base: string): string {
  const known = CATEGORY_LABEL[base];
  if (known) return known;
  // Unknown base: fall back to the last path segment with the prefixes every
  // category route shares stripped off, so a new category still reads
  // sensibly ("/tally-erp-9-widgets" → "widgets") instead of an empty chip.
  const segment = base.split("/").filter(Boolean).pop() ?? "page";
  return segment
    .replace(/^tally-/, "")
    .replace(/^erp-9-/, "")
    .replace(/-/g, " ");
}

/**
 * Column count is chosen from the item count instead of one `length >= 3`
 * gate. That gate left two cards stretched across the full 1184px container,
 * and sent four cards (the mobile-apps index) into a 3-column grid that
 * renders 3 + 1 with a hole in it. Per the design map the sanctioned fix for
 * a pair is to constrain the measure; four gets a clean 2×2 that opens into a
 * single row at xl.
 */
function gridClass(count: number): string {
  if (count === 1) return "max-w-xl";
  if (count === 2) return "max-w-4xl md:grid-cols-2";
  if (count === 4) return "md:grid-cols-2 xl:grid-cols-4";
  return "md:grid-cols-2 lg:grid-cols-3";
}

/**
 * Grid of "related detail pages" link cards. Used on every SP3 category index
 * and at the foot of every SP3 detail page to cross-link across a category.
 */
export function RelatedCards({ items, className }: RelatedCardsProps) {
  if (items.length === 0) return null;

  // Every call site builds its list from a single `base`, so the list name
  // comes from the first item.
  const listLabel = categoryLabel(items[0].base);

  return (
    <ul
      aria-label={`${listLabel} pages`}
      className={cn(
        "grid grid-cols-1 gap-4 sm:gap-5",
        gridClass(items.length),
        className
      )}
    >
      {items.map((item) => (
        <li key={`${item.base}${item.slug}`} className="h-full">
          {/*
            `group` drives the corner arrow's hover fill; `relative` is the
            containing block the stretched link resolves against.

            Hover physics follow the prototype's `.bcard`: the border firms to
            the strong hairline and the card lifts. The plum accent belongs to
            the arrow alone, so hover never washes the whole card in it. The
            resting border is ink/10 (`border-hairline`), not `cream-200` —
            cream-200 on a cream band measures ~1.2:1 and the card edge simply
            disappeared.

            The focus ring sits on the card, not on the anchor, because the
            card is the hit area; `focus-within` rather than `:has()` so the
            indicator never depends on selector support.
          */}
          <article
            className={cn(
              "group relative flex h-full flex-col rounded-lg border border-hairline bg-white p-5 sm:p-6",
              "shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-150 ease-out",
              "hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-[var(--shadow-card-hover)]",
              "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary",
              "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            )}
          >
            {/* Card header. `pr-12` keeps a long chip clear of the arrow's
                fixed corner. The chip is a tag, so it is a pill (S24), and it
                is Manrope — serif never sets an 11px label (S19). ink-500 on
                white is 6.4:1. */}
            <div className="pr-12">
              <span className="inline-flex items-center rounded-pill border border-hairline-strong px-[11px] py-1 font-sans text-eyebrow font-bold uppercase tracking-[0.09em] text-ink-500">
                {categoryLabel(item.base)}
              </span>
            </div>

            {/* The fixed corner. Offsets track the card padding at each step so
                the circle lands in the same place on every card in the row. */}
            <span
              aria-hidden
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-pill border border-hairline-strong text-ink-500 transition-colors duration-150 group-hover:border-transparent group-hover:bg-primary group-hover:text-white sm:right-6 sm:top-6"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>

            {/* S19: the title is a human sentence, so it takes Lora roman at
                18px — never below 16px, never inside a control. */}
            <h3 className="mt-4 font-serif text-h4-mob font-semibold text-balance text-ink sm:text-h4">
              <Link
                href={`${item.base}/${item.slug}`}
                className="outline-none after:absolute after:inset-0 after:rounded-lg"
              >
                {item.title}
              </Link>
            </h3>

            <p className="mt-2 text-body-sm text-ink-500">{item.blurb}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
