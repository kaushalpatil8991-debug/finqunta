"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { PlaceholderFlag } from "@/components/ui/placeholder-flag";
import { TagPill } from "@/components/ui/tag-pill";
import { testimonials } from "@/content/testimonials";
import type { Sector, Testimonial } from "@/lib/schema";
import { cn } from "@/lib/utils";

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

/* ─────────────────────────── TAXONOMY ───────────────────────────
 * The bug this replaces: seven hand-written filter pills stood against NINE
 * sectors in the data. `Media` and `Exports` had no pill and were unreachable,
 * and six of the seven pills resolved to exactly one card — a single slide
 * stranded at 38% width. (FQ/design-to-section-map.md §3.1, row 9.)
 *
 * Two mechanisms stop that from coming back:
 *
 *  1. `SECTOR` is typed `Record<Sector, …>`. Adding a value to `SectorSchema`
 *     is a COMPILE ERROR until it is given a group here, so no sector can go
 *     unreachable again.
 *  2. The pills are derived from the content at module scope (`FILTERS`), not
 *     typed out by hand, and a group only earns a pill once the data backs it
 *     with `MIN_PER_GROUP` cards. A one-card filter cannot be rendered.
 *
 * `label` is the sector as it prints on a card's pill; `group` is the merged
 * bucket the filters expose. Cards keep their specific sector (the prototype
 * shows `Pharma ⎪ Sahyadri Pharma`), while the filters roll them up to four.
 */
type GroupId = "pharma" | "manufacturing" | "trade" | "services";

const SECTOR: Record<Sector, { label: string; group: GroupId }> = {
  Pharma: { label: "Pharma", group: "pharma" },
  Chemicals: { label: "Chemicals", group: "pharma" },
  Manufacturing: { label: "Manufacturing", group: "manufacturing" },
  // The `Media` record is Rangoli Textiles — a manufacturer mis-tagged in
  // content/testimonials.ts. It is grouped by what the company does. The
  // content file is owned elsewhere, so the tag itself is left untouched.
  Media: { label: "Media", group: "manufacturing" },
  Distribution: { label: "Distribution", group: "trade" },
  Retail: { label: "Retail", group: "trade" },
  Exports: { label: "Exports", group: "trade" },
  Services: { label: "Services", group: "services" },
  FinancialServices: { label: "Financial Services", group: "services" },
  // Catch-all. No record carries it today; it lands with the service trades so
  // that every sector in the schema stays reachable from a filter.
  Other: { label: "Other", group: "services" },
};

const GROUP_LABEL: Record<GroupId, string> = {
  pharma: "Pharma & Chemicals",
  manufacturing: "Manufacturing",
  trade: "Trade & Distribution",
  services: "Services & Finance",
};

const GROUP_ORDER: readonly GroupId[] = [
  "pharma",
  "manufacturing",
  "trade",
  "services",
];

/** A filter must resolve to a row, not to one lonely card. */
const MIN_PER_GROUP = 2;

const GROUP_COUNT = testimonials.reduce<Record<GroupId, number>>(
  (acc, t) => {
    const g = SECTOR[t.sector].group;
    acc[g] += 1;
    return acc;
  },
  { pharma: 0, manufacturing: 0, trade: 0, services: 0 }
);

type FilterId = GroupId | "all";

const FILTERS: ReadonlyArray<{ id: FilterId; label: string; count: number }> = [
  { id: "all", label: "All", count: testimonials.length },
  ...GROUP_ORDER.filter((id) => GROUP_COUNT[id] >= MIN_PER_GROUP).map((id) => ({
    id,
    label: GROUP_LABEL[id],
    count: GROUP_COUNT[id],
  })),
];

export function Testimonials() {
  const [filter, setFilter] = React.useState<FilterId>("all");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });
  const [snapCount, setSnapCount] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const visible = React.useMemo(
    () =>
      filter === "all"
        ? testimonials
        : testimonials.filter((t) => SECTOR[t.sector].group === filter),
    [filter]
  );

  const sync = React.useCallback((api: EmblaApi) => {
    setSnapCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  // Subscribe only. The seeding call lives in the effect below so that state
  // is only ever set from the external store's own event, never synchronously
  // inside an effect body.
  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  // Re-measure when the row changes, and start a narrowed row at its first card
  // instead of wherever the previous filter had been scrolled to. `reInit()`
  // emits Embla's own "reInit" event, which is also what seeds snapCount /
  // canPrev / canNext on first mount.
  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
  }, [emblaApi, filter]);

  // Derived filters guarantee every pill has cards behind it, so the only way
  // to reach zero is an empty content file — in which case render no band.
  if (testimonials.length === 0) return null;

  const activeLabel = FILTERS.find((f) => f.id === filter)?.label ?? "All";

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-b border-hairline bg-cream-100 py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeader
            eyebrow="Happy users"
            title={<span id="testimonials-heading">What our customers say</span>}
            lead="Quick reads from SMEs across pharma, distribution, manufacturing, services and more — in their own words."
          />
          <Button
            variant="tlink"
            size="inline"
            asChild
            className="justify-self-start md:justify-self-end"
          >
            <Link href="/case-study">
              All case studies
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter testimonials by sector"
            className="flex flex-wrap gap-[7px]"
          >
            {FILTERS.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${f.label}, ${f.count} testimonials`}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "flex-none rounded-pill border px-[14px] py-[7px] text-[12.5px] font-semibold",
                    "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    isActive
                      ? "border-transparent bg-ink text-cream-200"
                      : "border-hairline-strong bg-white text-ink-700 hover:border-ink-500 hover:text-ink"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Real controls. Dots alone are not one. */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="iconRound"
              aria-label="Previous testimonial"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </Button>
            <Button
              variant="outline"
              size="iconRound"
              aria-label="Next testimonial"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </div>

        <p role="status" className="sr-only">
          {`Showing ${visible.length} of ${testimonials.length} testimonials. Filter: ${activeLabel}.`}
        </p>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          className="mt-8"
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-5 flex">
              {visible.map((t, i) => (
                <div
                  key={t.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${visible.length}`}
                  className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {snapCount > 1 && (
            <div className="mt-6 flex justify-center gap-1">
              {Array.from({ length: snapCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1} of ${snapCount}`}
                  aria-current={selectedIndex === i ? "true" : undefined}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="group flex h-8 w-6 items-center justify-center rounded-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-1.5 rounded-pill transition-all",
                      selectedIndex === i
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-hairline-strong group-hover:bg-ink-500"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  // Manrope has zero Devanagari coverage; Lora has none either. The Marathi and
  // Hindi quotes get Noto Sans Devanagari, and `lang` is what makes the
  // fallback correct while the face is still loading.
  const devanagari = t.locale === "mr" || t.locale === "hi";

  return (
    <figure className="relative flex h-full flex-col gap-4 rounded-lg border border-hairline bg-white p-5 sm:p-6">
      {/* S18 — the terminator in the same fixed corner on every card, which is
          what makes ten unlike quotes read as one family. Decorative. */}
      <span
        aria-hidden
        className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-pill border border-hairline-strong text-[13px] text-ink-500"
      >
        ↗
      </span>

      {/* S16's number law is deliberately NOT applied here: every one of these
          records is fabricated, and lifting a figure out of an invented quote
          would present it as a measured outcome for a named company. */}
      <blockquote
        lang={t.locale}
        className={cn(
          "m-0 pr-10 text-[17px] leading-[1.55] text-ink",
          devanagari ? "font-devanagari" : "font-serif"
        )}
      >
        {t.quote}
      </blockquote>

      <figcaption className="mt-auto flex flex-col items-start gap-[7px]">
        {/* S26 — sector and company as two unlike facts in one lozenge. */}
        <TagPill
          className="max-w-full"
          left={SECTOR[t.sector].label}
          right={t.company}
        />
        <div>
          <div className="text-[14px] font-bold text-ink">{t.authorName}</div>
          <div className="text-[12.5px] text-ink-500">{t.authorTitle}</div>
        </div>
        {t.isPlaceholder ? <PlaceholderFlag /> : null}
      </figcaption>
    </figure>
  );
}
