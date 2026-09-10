import * as React from "react";
import { cn } from "@/lib/utils";

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "base" | "lg";
}

/**
 * Long-form body wrapper for policies and long copy. Styles child
 * h2/h3/h4/p/ul/ol/li/a/strong/blockquote/table to the Ivory Pearl tokens
 * without loading a full Typography plugin.
 *
 * Headings take the serif voice (S19: Lora roman for human sentences, Manrope
 * for every number and control). Table styling is new — PolicyLayout can now
 * emit a two-column matrix, and before this there were no table rules at all,
 * so one would have rendered as unstyled browser default.
 */
export function Prose({
  className,
  size = "base",
  ...props
}: ProseProps) {
  return (
    <div
      className={cn(
        // text color + line-height for readability
        "text-ink-500",
        size === "lg"
          ? "text-body leading-[1.7] sm:text-body-lg"
          : "text-body leading-[1.65]",
        // headings — serif voice, mobile-safe sizes that scale up from sm:
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-h2-mob [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:tracking-tight [&_h2]:text-balance sm:[&_h2]:mt-12 sm:[&_h2]:text-h2",
        "[&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:font-serif [&_h3]:text-h3-mob [&_h3]:font-semibold [&_h3]:text-ink sm:[&_h3]:mt-8 sm:[&_h3]:text-h3",
        "[&_h4]:mt-5 [&_h4]:mb-1.5 [&_h4]:text-h4-mob [&_h4]:font-semibold [&_h4]:text-ink-700 sm:[&_h4]:mt-6 sm:[&_h4]:text-h4",
        // paragraphs
        "[&_p]:my-4",
        // lists
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:my-1.5 [&_li]:marker:text-primary",
        // inline
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        // blockquote
        "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-ink-700 [&_blockquote]:italic",
        "[&_code]:rounded [&_code]:bg-cream-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-body-sm [&_code]:text-ink",
        // tables — S11 hairline rows: no boxes, no fills, no zebra striping.
        // Figures line up, so digits are tabular.
        "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-body-sm",
        "[&_td]:tabular-nums [&_th]:align-top [&_td]:align-top",
        className
      )}
      {...props}
    />
  );
}
