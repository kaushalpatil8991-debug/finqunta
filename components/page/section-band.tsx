import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionBandProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The three sanctioned page surfaces, and only these three:
   * `cream` = ground (#FBF7F0) · `white` = surface (#FFFFFF) ·
   * `cream-alt` = band (#F6F0E4). Pages alternate them for stripe cadence.
   *
   * `primary-soft` (bg-primary-50) was removed: it was referenced by none of
   * the 74 call sites, and a fourth tinted ground is not one of the surfaces
   * the design system admits — plum is reserved for state and selection, so a
   * whole band washed in it would read as "this section is selected".
   */
  tone?: "cream" | "white" | "cream-alt";
  /** Vertical rhythm override. Default: section (96 desktop / 56 mobile). */
  compact?: boolean;
  /** Skip inner container wrapper. */
  bare?: boolean;
}

const toneClass: Record<NonNullable<SectionBandProps["tone"]>, string> = {
  cream: "bg-cream",
  white: "bg-white",
  "cream-alt": "bg-cream-100",
};

/**
 * Themed <section> wrapper that handles background tone + section rhythm +
 * page gutter container for inner-page layouts. Pages alternate tones
 * (cream → white → cream-alt) for visual stripe cadence.
 */
export function SectionBand({
  tone = "cream",
  compact,
  bare,
  className,
  children,
  ...props
}: SectionBandProps) {
  return (
    <section
      className={cn(
        toneClass[tone],
        compact
          ? "py-10 sm:py-12 md:py-16"
          : "py-section-mob md:py-section",
        className
      )}
      {...props}
    >
      {bare ? (
        children
      ) : (
        <div className="mx-auto max-w-[1280px] px-gutter sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg">
          {children}
        </div>
      )}
    </section>
  );
}
