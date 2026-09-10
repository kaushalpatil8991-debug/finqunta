import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The labelled photography placeholder — and, at the same time, the shot list.
 *
 * `public/` is empty and the asset budget is fixed at 3 screenshots, 3
 * photographs, 12 logo SVGs, 1 portrait and 2 certificate scans. Rather than
 * ship a grey box or a stock image, every un-shot slot renders its own brief:
 * the shot number, the crop, the subject, and the art-direction note (including
 * the scrubbing rules for party names, GSTINs and balances). When the shoot
 * happens, the brief is on the page.
 *
 * `id` here is the shot identifier ("SHOT 01"), not a DOM id — the DOM `id`
 * attribute is intentionally not settable through it.
 *
 * See `.shot` in prototype/index.html.
 */

export interface ShotPlaceholderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /** Shot identifier, shown top-left. e.g. `"SHOT 01"`. */
  id: string;
  /** What is in frame, shown as the headline. e.g. `"TallyPrime on desktop"`. */
  subject: string;
  /** CSS aspect-ratio, e.g. `"16/10"`. Rendered top-right as `16:10`. */
  ratio?: string;
  /** Art direction: crop, what to scrub, brand-usage clearance. */
  note?: string;
}

export const ShotPlaceholder = React.forwardRef<
  HTMLDivElement,
  ShotPlaceholderProps
>(({ className, id, subject, ratio = "16/10", note, style, ...props }, ref) => (
  <div
    ref={ref}
    style={{ ["--fq-ar" as string]: ratio, ...style }}
    className={cn(
      "relative flex aspect-[var(--fq-ar,16/10)] flex-col justify-end gap-[3px]",
      "overflow-hidden rounded-lg p-4",
      "border border-dashed border-shot-line [background:var(--shot-surface)]",
      className
    )}
    {...props}
  >
    <span className="absolute left-[14px] top-3 font-sans text-[10px] font-extrabold uppercase tracking-[0.11em] text-ink-500">
      {id}
    </span>
    <span className="absolute right-[14px] top-3 font-sans text-[10px] font-bold tracking-[0.06em] tabular-nums text-ink-500">
      {ratio.replace("/", ":")}
    </span>
    <span className="text-[15px] font-bold leading-[1.3] text-ink">
      {subject}
    </span>
    {note ? (
      <span className="text-[11.5px] leading-[1.4] text-ink-500">{note}</span>
    ) : null}
  </div>
));
ShotPlaceholder.displayName = "ShotPlaceholder";
