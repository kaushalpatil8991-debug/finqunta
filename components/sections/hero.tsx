"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompoundCta } from "@/components/ui/compound-cta";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { ShotPlaceholder } from "@/components/ui/shot-placeholder";
import { heroSlides } from "@/content/hero-slides";
import { stats } from "@/content/stats";
import type { HeroSlide } from "@/lib/schema";
import { useModal } from "@/components/modals/modal-context";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn, formatIndianNumber } from "@/lib/utils";

/**
 * S27 flat ground · S16 proof · S31 numbered rail.
 *
 * Five near-identical pastel slides are cut to TWO — a slide change was
 * imperceptible, so the carousel cost motion and bought nothing. The gradient
 * grounds and the decorative per-slide SVG motifs are gone with them: S27 is a
 * hard three-colour discipline, no gradient, no glass, no blur. `heroSlides`
 * is still the single source of copy; only the first two records render.
 *
 * The dot rail that sat under the CTA row is replaced by the S31 numbered rail
 * (01 / 0n with a continuous track) at the right edge of the media column, and
 * prev/next/pause now live in the trust cluster — visible at every width, not
 * from `lg`.
 *
 * WCAG 2.2.2 (Level A): autoplay that lasts longer than five seconds needs a
 * mechanism to pause it. `stopOnInteraction` is not that mechanism, so there is
 * a real, visible, labelled pause button — and under `prefers-reduced-motion`
 * the carousel never autoplays at all (`playOnInit: false`, and the effect
 * below only ever calls `play()` when motion is welcome).
 */

/** S31 rail is drawn for exactly two positions. Raising this needs a rail that
 *  renders one track segment per gap, not one per slide. */
const SLIDE_LIMIT = 2;
/** The three figures the trust cluster carries, in `content/stats.ts` order. */
const TRUST_LIMIT = 3;
const AUTOPLAY_DELAY = 6500;
/** px — the continuous track the position mark travels down. */
const RAIL_TRACK = 74;

const slides = heroSlides.slice(0, SLIDE_LIMIT);
const trust = stats.slice(0, TRUST_LIMIT);

/**
 * The hero's two image slots. `public/` is empty and the asset budget is fixed,
 * so each slot renders its own brief until the shoot happens — including the
 * scrub requirement, which is a client-confidentiality obligation and not a
 * nice-to-have. Art direction, not site copy: it is deliberately not in
 * `content/*.ts`.
 */
const HERO_SHOTS = [
  {
    id: "SHOT 01",
    subject: "TallyPrime on desktop",
    note: "Company dashboard. Scrub party names, GSTINs and balances. Clear Tally brand usage before publishing.",
  },
  {
    id: "SHOT 02",
    subject: "TallyPrime in a hosted browser session",
    note: "Show the browser chrome — the point is that it is not a local install. Same scrubbing rules as Shot 01.",
  },
] as const;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { open } = useModal();
  const canRotate = slides.length > 1;

  // Lazy state, not a ref: the plugin instance has to be readable during render
  // to be handed to Embla, and it must stay identical across renders or the
  // carousel re-initialises and the rotation restarts.
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: AUTOPLAY_DELAY,
      // Never started implicitly — the effect below owns it, so reduced-motion
      // users get a static hero rather than one that rotates once and stops.
      playOnInit: false,
      // MUST stay false while `stopOnMouseEnter` is true. With both true, the
      // hover-pause is permanent: moving the pointer across the hero once
      // killed the rotation for the rest of the session and it never resumed,
      // which is what made the carousel read as broken. False is the pairing
      // the plugin documents for "pause on hover, resume on mouse leave".
      // Deliberate navigation still stops rotation for good, because the
      // prev/next/dot handlers below call `stopRotation()` explicitly.
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    // `duration` is Embla's friction factor, NOT milliseconds. Measured on this
    // hero (350px of travel, time to 95% of it — the point the eye reads as
    // "arrived"): 24, which is effectively Embla's default of 25, takes ~490ms.
    // 18 takes ~367ms. Input latency is only 3ms either way, so the click is
    // already instant; it is the animation that reads as slow.
    { loop: true, align: "start", duration: 18 },
    [autoplay]
  );
  const [selected, setSelected] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    emblaApi
      .on("select", onSelect)
      .on("autoplay:play", onPlay)
      .on("autoplay:stop", onStop);
    onSelect();
    return () => {
      emblaApi
        .off("select", onSelect)
        .off("autoplay:play", onPlay)
        .off("autoplay:stop", onStop);
    };
  }, [emblaApi]);

  // Reduced motion is re-read live, so toggling the OS preference mid-session
  // stops the rotation without a reload.
  React.useEffect(() => {
    if (!canRotate) return;
    const plugin = emblaApi?.plugins()?.autoplay;
    if (!plugin) return;
    if (reduced) plugin.stop();
    else plugin.play();
  }, [emblaApi, reduced, canRotate]);

  const stopRotation = React.useCallback(() => {
    emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi]);

  // `jump` skips the scroll animation when the user has asked for less motion.
  const goTo = React.useCallback(
    (index: number) => {
      stopRotation();
      emblaApi?.scrollTo(index, reduced);
    },
    [emblaApi, reduced, stopRotation]
  );

  const goPrev = React.useCallback(() => {
    stopRotation();
    emblaApi?.scrollPrev(reduced);
  }, [emblaApi, reduced, stopRotation]);

  const goNext = React.useCallback(() => {
    stopRotation();
    emblaApi?.scrollNext(reduced);
  }, [emblaApi, reduced, stopRotation]);

  const togglePlay = React.useCallback(() => {
    const plugin = emblaApi?.plugins()?.autoplay;
    if (!plugin) return;
    if (plugin.isPlaying()) plugin.stop();
    else plugin.play();
  }, [emblaApi]);

  const handleCta = (cta: HeroSlide["primaryCta"]) => {
    if (cta.opensModal) {
      open(
        cta.opensModal === "talk"
          ? "talk"
          : cta.opensModal === "callback"
          ? "callback"
          : "enquiry"
      );
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Finquanta featured services"
      className="relative overflow-hidden border-b border-hairline bg-cream-100"
    >
      <div className="mx-auto max-w-[1280px] px-gutter pt-12 md:px-gutter-md md:pt-16 lg:px-gutter-lg">
        {/* The viewport must clip; the rail must not. Hence the wrapper. */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {slides.map((slide, i) => {
                const shot = HERO_SHOTS[i] ?? HERO_SHOTS[0];
                const primary = slide.primaryCta;
                const secondary = slide.secondaryCta;
                const isActive = selected === i;
                // One h1 per page: the off-screen slide keeps the same visual
                // scale but drops a level in the outline.
                const Heading = (i === 0 ? "h1" : "h2") as React.ElementType;

                return (
                  <div
                    key={slide.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${i + 1} of ${slides.length}`}
                    // Off-screen slides leave the tab order and the a11y tree —
                    // otherwise the hero ships two headings and two CTA pairs.
                    inert={!isActive}
                    className="min-w-0 flex-[0_0_100%]"
                  >
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                      <div>
                        {slide.eyebrow ? (
                          <EyebrowLabel className="mb-3">
                            {slide.eyebrow}
                          </EyebrowLabel>
                        ) : null}
                        <Heading className="mb-[18px] max-w-[15ch] font-serif text-display-mob font-semibold leading-[1.05] tracking-[-0.015em] text-ink lg:text-display">
                          {slide.heading}
                        </Heading>
                        <p className="mb-7 max-w-[48ch] text-body text-ink-700 md:text-body-lg">
                          {slide.sub}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-[22px] gap-y-4">
                          {primary.opensModal ? (
                            <CompoundCta onClick={() => handleCta(primary)}>
                              {primary.label}
                            </CompoundCta>
                          ) : (
                            <CompoundCta asChild>
                              <Link href={primary.href}>{primary.label}</Link>
                            </CompoundCta>
                          )}

                          {/* S10: secondary is a text link with an icon, never
                              a low-opacity outline. */}
                          {secondary ? (
                            secondary.opensModal ? (
                              <Button
                                variant="tlink"
                                size="inline"
                                onClick={() => handleCta(secondary)}
                              >
                                {secondary.label}
                                <ArrowRight className="h-4 w-4" aria-hidden />
                              </Button>
                            ) : (
                              <Button variant="tlink" size="inline" asChild>
                                <Link href={secondary.href}>
                                  {secondary.label}
                                  <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                              </Button>
                            )
                          ) : null}
                        </div>
                      </div>

                      <ShotPlaceholder
                        id={shot.id}
                        subject={shot.subject}
                        ratio="16/10"
                        note={shot.note}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* S31 — numbered rail with a continuous track. Sits in the page
              gutter, so it is only shown where that gutter exists. */}
          {canRotate ? (
            <div className="absolute right-[-30px] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2.5 text-[11px] font-bold leading-none tabular-nums min-[1241px]:flex">
              {slides.map((slide, i) => (
                <React.Fragment key={slide.id}>
                  {i > 0 ? (
                    <span
                      aria-hidden
                      className="relative h-[74px] w-px bg-hairline-strong"
                    >
                      <span
                        className="absolute -left-px w-[3px] rounded-[2px] bg-primary transition-[top,height] duration-300 motion-reduce:transition-none"
                        style={{
                          height: `${RAIL_TRACK / slides.length}px`,
                          top: `${(selected * RAIL_TRACK) / slides.length}px`,
                        }}
                      />
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}: ${slide.heading}`}
                    aria-current={selected === i ? "true" : undefined}
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-pill transition-colors duration-[var(--motion-base)] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      selected === i ? "text-ink" : "text-ink-500"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </div>

        {/* S16 — the first proof point, above the fold. Figures come from
            content/stats.ts; the trust-stats band owns their sourcing note. */}
        <div className="mt-10 flex flex-wrap items-center border-t border-hairline md:mt-[52px]">
          {trust.map((stat, i) => (
            <div
              key={stat.id}
              className={cn(
                "flex flex-col gap-[5px] pb-[18px] pr-5 pt-4 sm:pb-[22px] sm:pr-8 sm:pt-5",
                i === 0 ? "pl-0" : "pl-5 sm:pl-8",
                i < trust.length - 1 && "border-r border-hairline"
              )}
            >
              <span className="text-[30px] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-ink">
                {formatIndianNumber(stat.value)}
                {stat.suffix ?? ""}
              </span>
              <span className="text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.07em] text-ink-500">
                {stat.label}
              </span>
            </div>
          ))}

          {canRotate ? (
            <div className="ml-auto flex items-center gap-2 max-md:w-full max-md:justify-end max-md:border-t max-md:border-hairline max-md:py-3">
              <HeroControl label="Previous slide" onClick={goPrev}>
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </HeroControl>
              <HeroControl
                label={playing ? "Pause slideshow" : "Play slideshow"}
                onClick={togglePlay}
              >
                {playing ? (
                  <Pause className="h-4 w-4" aria-hidden />
                ) : (
                  <Play className="h-4 w-4" aria-hidden />
                )}
              </HeroControl>
              <HeroControl label="Next slide" onClick={goNext}>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </HeroControl>
            </div>
          ) : null}
        </div>
      </div>

      {/* Live region. Silent while the carousel rotates on its own (APG: an
          auto-rotating carousel must not narrate over the user), polite once
          the user is driving it. */}
      <div
        className="sr-only"
        role="status"
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        Slide {selected + 1} of {slides.length}:{" "}
        {slides[selected]?.heading}
      </div>
    </section>
  );
}

/** 38px circular carousel control — hairline chrome, plum on hover. */
function HeroControl({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-[38px] w-[38px] flex-none place-items-center rounded-pill border border-hairline-strong bg-white text-ink-700 transition-colors duration-[var(--motion-base)] hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {children}
    </button>
  );
}
