import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * S26 — the two-part composite pill. Two *unlike* facts in one lozenge, split
 * by a hairline: `Tally 5-Star Partner ⎪ Since 2018`, `Pharma ⎪ Sahyadri
 * Pharma`. It is the corpus's tool for making a credential and its date, or a
 * sector and its company, read as one object instead of two chips.
 *
 * Pills are tags (S24). This is never a control: if it needs to be clicked,
 * it is the wrong component. Sand-100 ground with sand-ink text is 9.0:1.
 *
 * See `.tag2` (composite) and `.tag` (single) in prototype/index.html.
 */

const PILL_BASE =
  "inline-flex rounded-pill bg-accent-sand-100 font-sans text-sand-ink " +
  "text-[11.5px] font-bold";

export interface TagPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The category / qualifier half. */
  left: React.ReactNode;
  /** The specific half — the company, the date, the figure. */
  right: React.ReactNode;
}

/** Two-part composite pill. Not uppercased — these halves carry proper nouns. */
export const TagPill = React.forwardRef<HTMLSpanElement, TagPillProps>(
  ({ className, left, right, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        PILL_BASE,
        "items-stretch overflow-hidden tracking-[0.05em]",
        className
      )}
      {...props}
    >
      <span className="flex items-center whitespace-nowrap px-3 py-[5px]">
        {left}
      </span>
      <span className="flex items-center whitespace-nowrap border-l border-sand-hairline px-3 py-[5px]">
        {right}
      </span>
    </span>
  )
);
TagPill.displayName = "TagPill";

export type TagProps = React.HTMLAttributes<HTMLSpanElement>;

/** Single-part variant — one fact, uppercased. `Most asked for`, `Since 2018`. */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        PILL_BASE,
        "items-center gap-[7px] whitespace-nowrap px-3 py-[5px]",
        "uppercase tracking-[0.06em]",
        className
      )}
      {...props}
    />
  )
);
Tag.displayName = "Tag";
