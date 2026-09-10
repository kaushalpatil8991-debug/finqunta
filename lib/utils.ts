import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The project's custom font-size tokens, from the `--text-*` scale in
 * styles/tokens.css.
 *
 * tailwind-merge has to be told about these. It classifies an unrecognised
 * `text-*` class as a COLOUR, so `text-h3` and `text-ink` landed in the same
 * conflict group and one silently deleted the other — with no build error and
 * no missing CSS, since the rule is emitted correctly and simply never reaches
 * the element. Measured before this fix, EyebrowLabel rendered as
 *   class="inline-block font-semibold uppercase tracking-[0.12em] text-primary"
 * in the prerendered HTML: `text-eyebrow` (0.6875rem) was gone and the eyebrow
 * fell back to inherited 16px on every page that uses it. Card titles, dialog
 * titles, inputs, labels, tabs, tooltips and the accordion trigger all lost
 * their size the same way.
 *
 * Keep this list in sync with the `--text-*` tokens in styles/tokens.css.
 */
const FONT_SIZE_TOKENS = [
  "display",
  "display-mob",
  "h1",
  "h1-mob",
  "h2",
  "h2-mob",
  "h3",
  "h3-mob",
  "h4",
  "h4-mob",
  "body-lg",
  "body",
  "body-sm",
  "caption",
  "eyebrow",
  "stat",
  "stat-mob",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZE_TOKENS] }],
    },
  },
});

/** Merge + dedupe Tailwind classnames. Used pervasively. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with Indian digit grouping: 831678 -> "8,31,678". */
export function formatIndianNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

/** Indian mobile (10 digits, starts 6-9). Used by LeadPayloadSchema. */
export const indianMobileRegex = /^[6-9]\d{9}$/;

/** Coerce "9 91 20 37912" into "9912037912" for the phone field. */
export function stripPhone(input: string): string {
  return input.replace(/\D+/g, "");
}
