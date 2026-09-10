import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The visible marker for fabricated content.
 *
 * The audit's finding is that 33 invented records — client names, testimonial
 * quotes, award issuers, stat figures — are currently presented as proof. Until
 * each is verified or removed, every one of them carries this flag. It is
 * deliberately **visible, not decorative**: it renders real text a screen
 * reader announces, in the corrected warning colour, and carries a `title`
 * explaining what the reader is looking at.
 *
 * `data-placeholder="true"` is on the element so a build-time assertion (or an
 * e2e test) can count flags and fail a production branch when any remain.
 *
 * See `.ph` in prototype/index.html.
 */

const DEFAULT_TITLE =
  "Placeholder content — this record is unverified sample data and must not be read as proof.";

export interface PlaceholderFlagProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visible label. Defaults to "Placeholder". */
  children?: React.ReactNode;
  /** Hover/inspect explanation. Defaults to a sentence naming the problem. */
  title?: string;
}

export const PlaceholderFlag = React.forwardRef<
  HTMLSpanElement,
  PlaceholderFlagProps
>(({ className, children = "Placeholder", title = DEFAULT_TITLE, ...props }, ref) => (
  <span
    ref={ref}
    data-placeholder="true"
    title={title}
    className={cn(
      "inline-flex items-center gap-[5px] align-middle",
      "rounded-pill bg-warning-tint px-[7px] py-[2px]",
      "font-sans text-[9.5px] font-bold uppercase tracking-[0.08em]",
      "whitespace-nowrap text-warning",
      // The dot is the marker's only ornament and is purely presentational,
      // so it is drawn as a pseudo-element rather than an announced node.
      "before:block before:h-[5px] before:w-[5px] before:rounded-full",
      "before:bg-current before:content-['']",
      className
    )}
    {...props}
  >
    {children}
  </span>
));
PlaceholderFlag.displayName = "PlaceholderFlag";
