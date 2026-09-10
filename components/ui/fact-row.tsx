import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * S11 — the hairline label/value row, and the list that holds it.
 *
 * The law, stated negatively because that is where the corpus keeps failing:
 * **no boxes, no icons, no zebra striping, no tick glyphs.** A hairline above
 * each row is the entire chrome. It is what replaces the six identical check
 * bullets on the Cloud band and the six identical medal SVGs on Awards — a
 * ranked spec table reads as a specification; a row of ticks reads as a
 * brochure.
 *
 * Layout: a fixed 200px label column against a fluid value column, collapsing
 * to stacked below 640px.
 *
 * Renders semantic `<dl>` / `<dt>` / `<dd>`, so a screen reader gets the
 * label-value pairing that the visual grid conveys.
 *
 * See `.frow` and `.cdl` in prototype/index.html.
 */

export type FactListProps = React.HTMLAttributes<HTMLDListElement>;

export const FactList = React.forwardRef<HTMLDListElement, FactListProps>(
  ({ className, ...props }, ref) => (
    <dl ref={ref} className={cn("m-0", className)} {...props} />
  )
);
FactList.displayName = "FactList";

export interface FactRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The left column. Bold, ink — the thing being specified. */
  label: React.ReactNode;
  /**
   * The right column. Pass either `value` or `children`; `value` wins when
   * both are given.
   */
  value?: React.ReactNode;
}

export const FactRow = React.forwardRef<HTMLDivElement, FactRowProps>(
  ({ className, label, value, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-1 border-t border-hairline py-4",
        "sm:grid-cols-[200px_1fr] sm:gap-6",
        className
      )}
      {...props}
    >
      <dt className="text-[15px] font-bold text-ink">{label}</dt>
      <dd className="m-0 text-[14.5px] leading-[1.55] text-ink-500">
        {value ?? children}
      </dd>
    </div>
  )
);
FactRow.displayName = "FactRow";
