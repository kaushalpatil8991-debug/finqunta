"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardBody } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoonTooltip } from "@/components/ui/coming-soon-tooltip";
import { offeringTabs } from "@/content/offerings";
import type { Offering } from "@/lib/schema";
import { useModal } from "@/components/modals/modal-context";
import { cn } from "@/lib/utils";

/**
 * S12 bento + S18 grammar (FQ/design-to-section-map.md §3.1, row 13).
 *
 * - Height is RESERVED on every TabsContent at the 4-column layout. Without it
 *   the grid collapses from two rows to one on a tab change and the page jumps
 *   under the reader's cursor. That is a bug, not a design note.
 * - Every card carries the S18 terminator: a circular arrow in the SAME fixed
 *   corner, which is what makes 24 unrelated blocks read as one family.
 * - One featured (ink-ground) cell per tab, and only where the tab is deep
 *   enough to need an anchor. The 2-card Cloud tab stays an equal pair.
 * - The whole card is the link. The faux "Read more" spans are gone; the only
 *   label left is a real ctaLabel where the record carries one.
 * - Zero placeholder records in this content file, so nothing here is flagged.
 */

/**
 * S16: exactly one accented cell per view. Conditional on >= 4 items - a
 * 2-card tab has nothing to anchor. The anchor is the first card carrying a
 * real action (TallyPrime "Free trial", "View all add-ons" / "Browse"),
 * falling back to the lead card, which is the flagship on every tab.
 */
function featuredIndexFor(items: readonly Offering[]): number {
  if (items.length < 4) return -1;
  const withCta = items.findIndex((item) => Boolean(item.ctaLabel));
  return withCta === -1 ? 0 : withCta;
}

/**
 * The pill rail hides its scrollbar, so without this there is nothing telling
 * a reader that more tabs exist off-screen. Measured rather than assumed: a
 * static mask would fade a rail that fits, which is a defect of its own.
 */
function useEdgeFade() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [fade, setFade] = React.useState<"none" | "start" | "end" | "both">(
    "none"
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow <= 1) {
        setFade("none");
        return;
      }
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= overflow - 1;
      setFade(atStart ? "end" : atEnd ? "start" : "both");
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return { ref, fade };
}

export function Offerings() {
  const { ref: railRef, fade } = useEdgeFade();

  return (
    <section
      id="offerings"
      aria-labelledby="offerings-heading"
      className="border-b border-hairline bg-cream-100 py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        <SectionHeader
          eyebrow="We cater to your needs"
          title={<span id="offerings-heading">Everything Tally, under one roof</span>}
          lead="Products, services, apps, integrations, boosters and add-ons — browse by what you need most."
          align="left"
        />

        <Tabs defaultValue={offeringTabs[0]!.id} className="mt-8">
          {/* Left-aligned to the grid it governs. The chrome (ground, hairline,
              radius) sits on the wrapper so the edge fade masks only the pills
              and never eats the container's own border. */}
          <div className="w-max max-w-full rounded-pill border border-hairline bg-white p-[5px]">
            <TabsList
              ref={railRef}
              aria-label="Offerings"
              data-fade={fade}
              className={cn(
                "flex w-full flex-nowrap justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                "data-[fade=start]:[mask-image:linear-gradient(to_right,transparent_0,black_28px)]",
                "data-[fade=end]:[mask-image:linear-gradient(to_right,black_calc(100%_-_28px),transparent_100%)]",
                "data-[fade=both]:[mask-image:linear-gradient(to_right,transparent_0,black_28px,black_calc(100%_-_28px),transparent_100%)]"
              )}
            >
              {offeringTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "shrink-0 rounded-pill px-[18px] py-[9px] text-[14px] font-semibold text-ink-700",
                    "hover:text-ink",
                    "data-[state=active]:bg-ink data-[state=active]:text-cream-200 data-[state=active]:shadow-none"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {offeringTabs.map((tab) => {
            const featured = featuredIndexFor(tab.items);
            return (
              <TabsContent
                key={tab.id}
                value={tab.id}
                /* THE RESERVED HEIGHT. Two card rows at the 4-column layout, so
                   switching Add-Ons (5 cards) to Cloud (2) no longer collapses
                   the grid and yanks the scroll position. Released below lg,
                   where the column count changes and a fixed reservation would
                   only open dead space. */
                className="mt-[26px] w-full lg:min-h-[452px]"
              >
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {tab.items.map((item, i) => (
                    <OfferingCard
                      key={item.id}
                      item={item}
                      featured={i === featured}
                    />
                  ))}
                </ul>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

function OfferingCard({
  item,
  featured = false,
}: {
  item: Offering;
  featured?: boolean;
}) {
  const { open } = useModal();

  const content = (
    <Card
      hover
      className={cn(
        "relative flex h-full min-h-[210px] flex-col border-hairline shadow-none",
        "hover:border-hairline-strong hover:shadow-[var(--shadow-card)]",
        featured && "border-transparent bg-ink hover:border-transparent"
      )}
    >
      <CardBody className="flex flex-1 flex-col gap-[9px] p-[22px]">
        {/* S18 terminator: same glyph, same corner, on every card. */}
        <span
          aria-hidden
          className={cn(
            "absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-pill",
            "border border-hairline-strong text-ink-500",
            "transition-colors duration-[var(--motion-fast)]",
            "group-hover:border-transparent group-hover:bg-primary group-hover:text-white",
            "group-focus-visible:border-transparent group-focus-visible:bg-primary group-focus-visible:text-white",
            featured &&
              "border-hairline-on-ink text-on-ink-muted group-hover:bg-accent-sand group-hover:text-ink group-focus-visible:bg-accent-sand group-focus-visible:text-ink"
          )}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>

        <h3
          className={cn(
            "pr-[38px] font-serif text-[16.5px] font-semibold leading-[1.3]",
            featured ? "text-cream-200" : "text-ink"
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "text-[13.5px] leading-[1.5]",
            featured ? "text-on-ink-muted" : "text-ink-500"
          )}
        >
          {item.body}
        </p>

        {/* Only a real ctaLabel earns a line. The "Read more" fallback that ran
            on 18 of the 24 cards was a faux affordance - the card is the link. */}
        {item.ctaLabel ? (
          <span
            className={cn(
              "mt-auto text-[11.5px] font-bold uppercase tracking-[0.06em]",
              featured ? "text-accent-sand" : "text-primary"
            )}
          >
            {item.ctaLabel}
          </span>
        ) : null}
      </CardBody>
    </Card>
  );

  const affordance =
    "group block h-full w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  if (item.comingSoon) {
    return (
      <li className="h-full">
        <ComingSoonTooltip withDot={false} className="block h-full">
          <button type="button" className={affordance}>
            {content}
          </button>
        </ComingSoonTooltip>
      </li>
    );
  }

  // Demo-opens-modal path (the "Free demo" cloud card).
  if (item.href === "#talk") {
    return (
      <li className="h-full">
        <button
          type="button"
          onClick={() => open("talk", { source: "offerings" })}
          className={affordance}
        >
          {content}
        </button>
      </li>
    );
  }

  return (
    <li className="h-full">
      <Link href={item.href} className={affordance}>
        {content}
      </Link>
    </li>
  );
}
