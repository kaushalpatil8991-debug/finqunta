"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useModal } from "@/components/modals/modal-context";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/schema";

/**
 * S11 hairline rows + S01 terminating pill — the shared FAQ list (10 routes).
 *
 * WHAT CHANGED, AND WHY
 *
 * 1. THE BOX IS GONE. This was a rounded white card with a cream-200 outline.
 *    S11's law is stated negatively because that is where the corpus keeps
 *    failing: no boxes, no zebra striping, no icons — the rules ARE the
 *    structure. Dropping the card also fixes the two routes the map flags,
 *    where a white card sat on a white band and had no presence at all, and it
 *    lets the list inherit whatever `SectionBand` tone the page sets instead of
 *    punching a white hole through a cream band. (The one surviving glyph is
 *    the primitive's chevron — that is the disclosure affordance, not S36's
 *    purged decorative icon chip.)
 *
 * 2. THE FIRST ROW IS OPEN. Six closed rows hide every persuasive answer on the
 *    page; the map calls this out on all ten routes. `defaultValue` (not
 *    `value`) keeps the widget uncontrolled, so `collapsible` still lets a
 *    reader close everything — Radix semantics are untouched.
 *
 * 3. A RIGHT-ALIGNED HARD VALUE IN THE CLOSED STATE. The whole point of S11
 *    here: the closed list should teach something. See `hardValue()` below —
 *    it QUOTES a figure already present in the answer, never synthesizes one.
 *
 * 4. NO INVERSION ON THE OPEN ROW. S01 supplies the pill and the row grammar,
 *    NOT its inverted active row: inversion means "selected", and a disclosure
 *    widget is not a selection. (A dark slab inside a light list also reads as
 *    "disabled" and is toner-hostile on a page people print.) Open state is
 *    signalled typographically — ink-700 → ink, plus the chevron the primitive
 *    already rotates.
 *
 * TYPE VOICE (S19). Questions and values sit INSIDE a control, so both are
 * Manrope; the serif never enters a control. Values are `tabular-nums` and are
 * lifted verbatim, so Indian digit grouping (₹22,500) survives as authored.
 * Answers are the human sentences at 16px / ink-700 (11.27:1 on white).
 *
 * CONTRAST, measured, for the terminating pill's boundary. A hairline-strong
 * outline (ink at 18%) composites on white to #D9D6DD = 1.44:1 and fails WCAG
 * 1.4.11, which needs 3:1 for a control boundary — the same defect as the
 * `border-cream/30` secondary on the CTA band. The pill is therefore outlined
 * in solid `primary`, measured on all three sanctioned `SectionBand` grounds:
 * 5.64:1 on white, 5.28:1 on cream, 4.97:1 on cream-100 — every one of them
 * clears both the 3:1 boundary minimum and the 4.5:1 text minimum, so the same
 * plum works as outline AND label wherever a route drops this list. It is also
 * this view's ONE accented element (S16).
 *
 * JSON-LD is untouched: the `FAQPage` graph is emitted by the routes via
 * `faqSchema(items)` in lib/seo.ts. This component renders `q`/`a` verbatim, so
 * the visible copy and the structured data cannot drift.
 *
 * IDs: none are hardcoded. Radix mints trigger/content ids per instance, so a
 * page rendering two accordions emits no duplicates.
 */

/**
 * Ordered by how binding the figure is: money, then a quantity with a unit,
 * then a hyphenated SLA compound, then a bare percentage, then a statutory
 * date. First hit wins.
 *
 * This is deliberately an EXTRACTOR, not an authoring surface. `Faq` carries
 * only `q`/`a` and content is owned elsewhere, so the only way to honour "pull
 * one hard value into the right column" without inventing facts is to quote one
 * the answer already states. Nothing is computed, rounded or rephrased; the one
 * normalisation is pluralising the unit of a digit range ("a 12–18 month
 * window" → `12–18 months`), because the source writes it as a compound
 * adjective that reads as a typo once lifted out of its noun phrase.
 *
 * When the schema eventually grows a real `value` field, delete all of this and
 * read the field.
 */
const HARD_VALUE_PATTERNS: readonly RegExp[] = [
  // Money, including Indian scale words. "₹5 crore", "₹22,500"
  /₹\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:crore|cr|lakh|lakhs))?/i,
  // Quantity + unit, with an optional range and an optional binding qualifier
  // (the qualifier matters: "from 1 attendee" is a floor, "1 attendee" is not).
  /\b(?:from|up\s?to|at\s?least|under|over)?\s?\d+(?:\s?[–-]\s?\d+)?\s?(?:minutes?|mins?|hours?|hrs?|days?|weeks?|months?|years?|MB|GB|TB|attendees?|users?|sessions?)\b/i,
  // Hyphenated compound plus the noun it binds. "2-hour response", "24-hour notice"
  /\b\d+-(?:minute|hour|day|week|month|year)(?:\s(?:response|notice|window|call|SLA|cover))?\b/i,
  /\bsub-hour\b/i,
  /\b\d+(?:\.\d+)?\s?%/,
  /\b\d{1,2}\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}\b/,
];

/** Longer than this stops being a value and starts being a second sentence. */
const MAX_VALUE_CHARS = 18;

function hardValue(answer: string): string | null {
  for (const pattern of HARD_VALUE_PATTERNS) {
    // No /g flag anywhere above, so `exec` carries no lastIndex between calls.
    const match = pattern.exec(answer);
    if (!match) continue;
    let value = match[0].trim().replace(/\s+/g, " ");
    if (/\d\s?[–-]\s?\d/.test(value)) {
      value = value.replace(
        /(month|week|day|year|hour|minute|user|session|attendee)$/i,
        "$1s"
      );
    }
    if (value.length <= MAX_VALUE_CHARS) return value;
  }
  return null;
}

interface FaqAccordionProps {
  items: readonly Faq[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const { open } = useModal();

  // Content arrays are module constants, so this recomputes once per route.
  const values = React.useMemo(() => items.map((item) => hardValue(item.a)), [
    items,
  ]);

  // An empty list would otherwise render an orphan terminating pill under
  // nothing. Callers that pass an optional `faqs` already guard, but the two
  // index routes do not.
  if (items.length === 0) return null;

  return (
    <div className={cn(className)}>
      {/* The root closes the list with the hairline that each row opens with. */}
      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="border-b border-hairline"
      >
        {items.map((item, i) => (
          <AccordionItem
            key={`faq-${i}`}
            value={`faq-${i}`}
            // The primitive draws a bottom rule in cream-200; S11 wants one
            // hairline per row, drawn on top, so rows read as a ledger.
            className="border-b-0 border-t border-hairline"
          >
            <AccordionTrigger className="group gap-4 py-5 font-sans text-[16px] font-bold text-ink-700 data-[state=open]:text-ink">
              <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <span className="text-balance">{item.q}</span>
                {values[i] && (
                  <span className="font-sans text-[13.5px] font-bold tabular-nums text-ink-500 sm:whitespace-nowrap sm:text-right">
                    {/* Closed rows hide their panel from assistive tech too, so
                        without this the value would be a sighted-only scan aid.
                        The prefix frames it inside the button's name. */}
                    <span className="sr-only">Key figure: </span>
                    {values[i]}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            {/* pr-8 keeps the measure clear of the chevron column.
                `text-[16px]`, not `text-body`: tailwind-merge cannot tell a
                custom `text-body` token from a text COLOUR, so it treats it as
                one and `text-ink-700` evicts it — the answer would silently
                render at the primitive's 14px. An arbitrary length parses as a
                font size and survives the merge. */}
            <AccordionContent className="max-w-[68ch] pb-6 pr-8 pt-0 text-[16px] leading-[1.6] text-ink-700">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* S01 — the full-width pill that terminates the list. It opens the
          enquiry modal, so S24 holds: this is not a submit control (the submit
          inside the modal stays a 10px rectangle), and the pill radius here is
          S01's own row-terminator grammar, not a tag. */}
      <button
        type="button"
        onClick={() => open("talk", { source: "talk-to-expert" })}
        className={cn(
          "group mt-6 flex w-full cursor-pointer items-center justify-between gap-4",
          "rounded-pill border border-primary bg-transparent px-5 py-3.5 text-left",
          "font-sans text-[15px] leading-tight text-ink-500",
          "transition-colors duration-[var(--motion-fast)]",
          "hover:bg-primary hover:text-white",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        )}
      >
        <span>
          Still have a question?{" "}
          <span className="font-bold text-primary group-hover:text-white">
            Talk to an expert
          </span>
        </span>
        <span
          aria-hidden
          className="grid h-9 w-9 flex-none place-items-center rounded-pill border border-primary text-primary transition-colors group-hover:border-white group-hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
