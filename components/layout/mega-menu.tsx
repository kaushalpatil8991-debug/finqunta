"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { headerCtas, megaNav } from "@/content/navigation";
import type {
  MegaMenuItem,
  NavGroup,
  NavLink as NavLinkType,
} from "@/lib/schema";
import { useModal } from "@/components/modals/modal-context";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag-pill";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/* ═══════════════════════════════════════════════════════════════════════
 * S18 — the mega-menu panel. Four link columns plus one featured cell.
 *
 * Target: `.mega` / `.mega-in` / `.mcol` / `.mchip` / `.mfeat` / `.mbtn` in
 * prototype/index.html; rationale in FQ/design-to-section-map.md §3.0, row
 * "Desktop mega-menu" (and row "Sticky cloud promo", whose verdict is DELETE →
 * dock into this featured cell).
 *
 * The plate's three moves, all of which this file implements:
 *   1. every column is headed by an OUTLINED LABEL CHIP (not a bare eyebrow);
 *   2. every column TERMINATES with a circular ↗ in the same fixed corner —
 *      decorative and aria-hidden, exactly as `.go` is on the prototype's
 *      testimonial cards. It is the family marker that makes four unrelated
 *      stacks read as one system; it is NOT a link, because the content model
 *      carries no group-level route and a fabricated one would be a dead route;
 *   3. one FEATURED CELL replaces the fifth bare column.
 *
 * What was deleted: the `SAND_DOT` / `comingSoon` branch. Zero entries in
 * content/navigation.ts carry the flag (SP1–SP4 shipped every listed route), so
 * it was 100% dead code painting nothing.
 * ═══════════════════════════════════════════════════════════════════════ */

/**
 * The panel plane. Map: "Panel gets ink/10 border + `shadow-float` — a soft
 * shadow on cream separates nothing."
 *
 * NOTE for whoever owns components/ui/navigation-menu.tsx: the Radix Viewport
 * that wraps this is `overflow-hidden` and carries its own `bg-white` +
 * `shadow-[var(--shadow-card-hover)]`, so the `shadow-float` declared here is
 * clipped by that ancestor and the soft card shadow is what actually paints.
 * The border lands correctly. Moving `shadow-float` onto the Viewport is a
 * one-word edit in that file, not this one.
 */
const PANEL = "rounded-lg border border-hairline bg-white shadow-float";

/** `.mchip` — the outlined label chip that heads every column. */
const CHIP =
  "inline-block rounded-pill border border-hairline-strong px-[11px] py-1 " +
  "text-[10.5px] font-bold uppercase leading-[1.4] tracking-[0.09em] text-ink-500";

/**
 * `.mcol li a` — a hairline row, not a rounded hover slab. Colour and a 5px
 * indent are the whole hover; the underline hairline is the whole chrome.
 */
const ROW =
  "block border-b border-hairline py-[7px] text-body-sm text-ink-700 " +
  "transition-[color,padding-left] duration-[var(--motion-fast)] ease-[var(--ease-out)] " +
  "hover:pl-[5px] hover:text-primary " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * `.mcol li a .d` — one-line descriptors on THREE routes only, keyed by href so
 * a label rewrite in content/navigation.ts cannot silently orphan them. The map
 * is explicit that these do not go on all 25 links: a descriptor on every row is
 * a wall of grey, and the three that carry one are the three the panel is
 * actually trying to sell. Copy ported verbatim from the prototype.
 */
const DESCRIPTORS: Record<string, string> = {
  "/tally-erp-9-products/tallyprime": "The current release, single and multi-user",
  "#cloud": "Hosted, 99.9% uptime, daily backup",
  "/tally-erp-9-add-ons-modules": "15+ modules across security and reporting",
};

interface MegaColumn {
  label: string;
  children: NavLinkType[];
}

/**
 * Five content groups → four rendered columns.
 *
 * content/navigation.ts is off-limits, and its "Product & Services" entry still
 * models five groups. The prototype ships four, folding Mobile Apps and
 * Solutions into one column — so the fold happens here, at render time, and
 * nowhere else. Rules:
 *   - a column that maps 1:1 to a group keeps the GROUP's own label, so no copy
 *     is invented where none needs to be;
 *   - only the genuine merge takes the prototype's heading ("Mobile & Solutions");
 *   - any group this plan does not name survives as its own column (see
 *     `toColumns` below), so restructuring the content file can never silently
 *     drop a link from the navigation.
 */
const COLUMN_PLAN: ReadonlyArray<{
  label: string;
  groups: readonly string[];
}> = [
  { label: "Tally Software", groups: ["Tally Software"] },
  { label: "Tally Services", groups: ["Tally Services"] },
  {
    label: "Mobile & Solutions",
    groups: ["Tally Mobile Apps", "Tally Solutions"],
  },
  { label: "Boosters & Add-Ons", groups: ["Boosters & Add-Ons"] },
];

function toColumns(groups: NavGroup[]): MegaColumn[] {
  const byLabel = new Map(groups.map((g) => [g.label, g] as const));
  const claimed = new Set<string>();
  const columns: MegaColumn[] = [];

  for (const plan of COLUMN_PLAN) {
    const members = plan.groups
      .map((label) => byLabel.get(label))
      .filter((g): g is NavGroup => Boolean(g));
    if (members.length === 0) continue;

    for (const g of members) claimed.add(g.label);
    columns.push({
      label: members.length === 1 ? members[0].label : plan.label,
      children: members.flatMap((g) => g.children),
    });
  }

  // Safety net: never lose a group the plan does not know about.
  for (const g of groups) {
    if (!claimed.has(g.label)) {
      columns.push({ label: g.label, children: g.children });
    }
  }

  return columns;
}

/**
 * `megaNav` is a module constant, so the fold is computed once at import time
 * rather than on every hover.
 */
const COLUMNS_BY_ITEM = new Map<string, MegaColumn[]>(
  megaNav
    .filter((item) => Boolean(item.groups?.length))
    .map((item) => [item.label, toColumns(item.groups ?? [])] as const)
);

/**
 * `.mega-in` — N equal link columns plus a wider featured cell (1.15fr).
 * Enumerated rather than interpolated because Tailwind only emits classes it
 * can see in the source.
 *
 * The narrow fallback below uses an arbitrary 640px min-width variant rather
 * than the named `sm` one, on purpose. Tailwind v4 emits its named-breakpoint
 * block AFTER the arbitrary min-width block, so the named 640px rule — equal
 * specificity, later in the sheet — beats the 1180px template at every width
 * the panel is actually visible at, and the four columns silently collapse to
 * two. Keeping both steps in the arbitrary family sorts them by width, which is
 * what we want. Verified against the compiled stylesheet, not assumed.
 *
 * (Class names are deliberately not spelled out in this comment: Tailwind
 * scans comments too, and a quoted utility here would emit a real rule.)
 */
const GRID_TEMPLATE: Record<number, string> = {
  1: "min-[1180px]:grid-cols-[minmax(0,1fr)_1.15fr]",
  2: "min-[1180px]:grid-cols-[repeat(2,minmax(0,1fr))_1.15fr]",
  3: "min-[1180px]:grid-cols-[repeat(3,minmax(0,1fr))_1.15fr]",
  4: "min-[1180px]:grid-cols-[repeat(4,minmax(0,1fr))_1.15fr]",
  5: "min-[1180px]:grid-cols-[repeat(5,minmax(0,1fr))_1.15fr]",
};

/**
 * Map: "Stagger 45ms → 30ms, cap at 4 columns." Past four cells a staggered
 * reveal stops reading as choreography and starts reading as lag, so the delay
 * flattens instead of growing.
 */
function staggerDelay(index: number): React.CSSProperties {
  return { animationDelay: `${40 + Math.min(index, 3) * 30}ms` };
}

const CELL_IN = "motion-safe:animate-[fq-col-in_0.34s_var(--ease-out)_both]";

/**
 * `.go` — the S18 terminator. Decorative only: `aria-hidden` and
 * `pointer-events-none`, matching the prototype's own usage on `.tcard`.
 * Columns are grid items, so they stretch to the tallest of the row and every
 * terminator lands on one horizontal line — that alignment is the whole point.
 */
function ColumnTerminator({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0 right-0 grid h-8 w-8 place-items-center",
        "rounded-pill border border-hairline-strong text-[13px] leading-none text-ink-500",
        className
      )}
    >
      ↗
    </span>
  );
}

function MegaLink({ item }: { item: NavLinkType }) {
  const { open } = useModal();
  const descriptor = DESCRIPTORS[item.href];

  const handleClick = (e: React.MouseEvent) => {
    if (!item.opensModal) return;
    e.preventDefault();
    open(item.opensModal);
  };

  return (
    <NavigationMenuLink asChild>
      <Link href={item.href} onClick={handleClick} className={ROW}>
        {item.label}
        {descriptor ? (
          <span className="mt-0.5 block text-[11.5px] leading-[1.35] text-ink-500">
            {descriptor}
          </span>
        ) : null}
      </Link>
    </NavigationMenuLink>
  );
}

function MegaColumnBlock({
  column,
  index,
}: {
  column: MegaColumn;
  index: number;
}) {
  return (
    <div
      className={cn("relative flex flex-col pb-11", CELL_IN)}
      style={staggerDelay(index)}
    >
      <h3 className="mb-3.5">
        <span className={CHIP}>{column.label}</span>
      </h3>
      <ul className="flex flex-col">
        {column.children.map((child) => (
          <li key={`${child.label}-${child.href}`}>
            <MegaLink item={child} />
          </li>
        ))}
      </ul>
      <ColumnTerminator />
    </div>
  );
}

/**
 * The evicted header CTAs. Everything in `headerCtas` that is a real route
 * (i.e. not a modal opener) belongs to the featured cell now; "Talk to an
 * expert" stays in the header, where it is the site's one primary control.
 * The first survivor is the solid sand button, the rest are text links — S10:
 * secondary is a text link, never a low-contrast outline.
 */
const FEATURED_CTAS = headerCtas.filter((cta) => !cta.opensModal);

/**
 * `.mfeat` — the fifth column, rebuilt as an ink card. It is the new home of
 * the deleted sticky cloud promo (see the header comment in
 * components/layout/sticky-cloud-promo.tsx, now a no-op) and of the Buy /
 * Download CTAs evicted from the header. Copy is the prototype's, which is the
 * promo's own offer restated once instead of a fifth "free demo" ask.
 */
function FeaturedCell({ index }: { index: number }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3.5 rounded-lg bg-ink p-[22px]",
        CELL_IN
      )}
      style={staggerDelay(index)}
    >
      <Tag className="self-start">Most asked for</Tag>

      {/* S19: serif is allowed here — 19px, and not inside a control. */}
      <h3 className="font-serif text-[19px] font-medium leading-[1.25] text-cream-200">
        TallyPrime on Cloud
      </h3>

      <p className="text-[13px] leading-[1.5] text-on-ink-muted">
        Your Tally, your data, on any device — with daily backups and no server
        to babysit. Book a 30-minute walkthrough.
      </p>

      {FEATURED_CTAS.length > 0 ? (
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          {FEATURED_CTAS.map((cta, i) => {
            const isPrimary = i === 0;
            return (
              <Button
                key={cta.label}
                asChild
                variant={isPrimary ? "sand" : "tlinkOnInk"}
                // size="sm" on both, so the pair shares one font-size class.
                // (`size="inline"` would add a second one, and tailwind-merge
                // cannot dedupe a custom `text-body-*` against an arbitrary
                // px value — the winner would then be stylesheet order.)
                size="sm"
                className={isPrimary ? undefined : "h-auto px-0"}
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Desktop mega menu. Renders each MegaMenuItem as either:
 *  - a multi-column S18 panel (if `groups`), or
 *  - a single dropdown in the same idiom (if `children`), or
 *  - a direct link.
 */
export function MegaMenu() {
  const { open: openModal } = useModal();

  const handleTopLevelClick =
    (item: MegaMenuItem) => (e: React.MouseEvent) => {
      if (!item.opensModal) return;
      e.preventDefault();
      openModal(item.opensModal);
    };

  return (
    <NavigationMenu className="hidden min-[1180px]:flex">
      <NavigationMenuList>
        {megaNav.map((item) => {
          const columns = COLUMNS_BY_ITEM.get(item.label);

          return (
            <NavigationMenuItem key={item.label}>
              {columns ? (
                // S18 panel — link columns + featured cell
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div
                      className={cn(
                        PANEL,
                        "grid w-[min(96vw,1180px)] max-w-full grid-cols-1 gap-8 p-8 min-[640px]:grid-cols-2",
                        GRID_TEMPLATE[columns.length] ??
                          "min-[1180px]:grid-cols-5"
                      )}
                    >
                      {columns.map((column, gi) => (
                        <MegaColumnBlock
                          key={column.label}
                          column={column}
                          index={gi}
                        />
                      ))}
                      <FeaturedCell index={columns.length} />
                    </div>
                  </NavigationMenuContent>
                </>
              ) : item.children ? (
                // Single dropdown — same chip / hairline-row / terminator idiom
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div
                      className={cn(
                        PANEL,
                        "relative flex w-[min(95vw,290px)] max-w-full flex-col p-6 pb-14",
                        CELL_IN
                      )}
                      style={staggerDelay(0)}
                    >
                      <h3 className="mb-3.5">
                        <span className={CHIP}>{item.label}</span>
                      </h3>
                      <ul className="flex flex-col">
                        {item.children.map((child) => (
                          <li key={`${child.label}-${child.href}`}>
                            <MegaLink item={child} />
                          </li>
                        ))}
                      </ul>
                      <ColumnTerminator className="bottom-6 right-6" />
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                // Direct link
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href ?? "#"}
                    onClick={handleTopLevelClick(item)}
                    className={navigationMenuTriggerStyle}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
