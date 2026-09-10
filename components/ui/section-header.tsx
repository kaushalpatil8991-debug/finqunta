import * as React from "react";
import { EyebrowLabel } from "./eyebrow-label";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  /**
   * S38's third slot — the band's one action, sat on the same baseline as the
   * lead and pushed to the right edge. Additive: every call site that predates
   * it renders byte-identically without one.
   *
   * Left-aligned headers put it on the right and drop it below the text under
   * 760px. Centred headers put it under the lead instead — right-aligning an
   * action against centred text has nothing to align to, and reads as a stray.
   */
  action?: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

/**
 * S38 — eyebrow / lead / action.
 *
 * The title carries the serif voice (S19: Lora for human sentences, Manrope
 * for every number and control). Lora only began loading in its roman weights
 * with the font fix, so this is the first point at which a non-italic serif
 * heading is actually available; before that it would have silently fallen
 * back to Georgia.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  action,
  className,
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;
  const centered = align === "center";

  const text = (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
      <Heading
        className={cn(
          "mt-2 font-serif font-semibold tracking-tight text-balance text-ink",
          as === "h2"
            ? "text-h1-mob sm:text-h2 md:text-h1"
            : "text-h2-mob sm:text-h2"
        )}
      >
        {title}
      </Heading>
      {lead && (
        <p className="mt-3 text-body text-ink-500 sm:text-body-lg">{lead}</p>
      )}
    </div>
  );

  // No action: the original single-block header, `max-w-3xl` and all, so the
  // 65 existing call sites keep their exact measure.
  if (!action) {
    return (
      <header className={cn(centered && "mx-auto", className)}>{text}</header>
    );
  }

  // With an action the wrapper has to span the full band — otherwise the
  // `max-w-3xl` above would cap the whole row and strand the action mid-page
  // instead of at the right edge.
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        centered
          ? "items-center text-center"
          : "min-[760px]:flex-row min-[760px]:items-end min-[760px]:justify-between min-[760px]:gap-8",
        className
      )}
    >
      {text}
      <div className={cn("flex-none", !centered && "min-[760px]:pb-1")}>
        {action}
      </div>
    </header>
  );
}
