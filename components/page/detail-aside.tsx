"use client";

import * as React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { CompoundCta } from "@/components/ui/compound-cta";
import { Tag, TagPill } from "@/components/ui/tag-pill";
import { useModal } from "@/components/modals/modal-context";
import { cn } from "@/lib/utils";
import type { ChipProps } from "@/components/ui/chip";
import type { LeadSource } from "@/lib/schema";

interface DetailAsideProps {
  tagline?: string;
  /**
   * The shape is unchanged on purpose; six routes pass this literal and one of
   * them casts to `Parameters<typeof Chip>[0]["tone"]`. `ChipProps["tone"]`
   * resolves to the identical union, so the public signature stays compatible
   * while this file no longer pulls `Chip` into the client bundle.
   *
   * `tone` is now ACCEPTED AND IGNORED — see the S14 note on `pairChips`.
   */
  chips?: readonly { tone?: ChipProps["tone"]; label: string }[];
  bullets?: readonly string[];
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  source?: LeadSource;
  className?: string;
}

interface Pill {
  key: string;
  left: string;
  /** Absent → the single-fact `Tag` variant rather than the S26 composite. */
  right?: string;
}

/**
 * S26 — fold the flat chip list into two-part composite pills.
 *
 * The prop is a flat array (six call sites, frozen signature), but S26 wants
 * *pairs*: `price | tier`, `sync | interval`, `metric | label`. Every route
 * except mobile-apps already passes exactly two, so straight sequential pairing
 * is correct there.
 *
 * The odd case is deliberate: mobile-apps passes `["Live from Tally", "iOS 15+",
 * "Android 10+"]`. Pairing left-to-right would produce `Live from Tally | iOS
 * 15+` plus an orphan `Android 10+`. Letting the FIRST chip stand alone instead
 * yields `LIVE FROM TALLY` + `iOS 15+ | Android 10+` — the qualifier as a single
 * tag and the platform matrix as one object, which is what the pill is for.
 *
 * S14 — `tone` is intentionally dropped. Two routes ship a `success`-green chip
 * ("Upgrade-safe", "Android 10+"); the accent marks LIVE STATE and nothing else,
 * so the decorative green badge is retired here rather than by editing six
 * pages. This is a STATUS-SEMANTICS fix, not a contrast one: `Chip tone="success"`
 * renders #1F5A3A on #DFF0E6, which measures 6.87:1 and passes. (The 4.16:1
 * failure the design map cites is `--color-success` #3D8B5C on white — a
 * different pairing, and not what the chip actually painted.)
 */
function pairChips(chips: DetailAsideProps["chips"]): Pill[] {
  const list = chips ?? [];
  const out: Pill[] = [];
  let i = 0;

  if (list.length % 2 === 1) {
    out.push({ key: `0-${list[0].label}`, left: list[0].label });
    i = 1;
  }
  for (; i + 1 < list.length; i += 2) {
    out.push({
      key: `${i}-${list[i].label}`,
      left: list[i].label,
      right: list[i + 1].label,
    });
  }
  return out;
}

/**
 * Sidecar used inside the detail-page hero — the buy column. Shows the tagline,
 * the facts as S26 composite pills, a hairline fact list, and the conversion
 * pair, so there is always a call-to-action visible from the top of every
 * detail page. Shared by six detail templates.
 *
 * WHAT CHANGED, and why (FQ/design-to-section-map.md rows for the six detail
 * clusters — the aside is S11, not S34):
 *
 *  - SURFACE. `bg-white/70 backdrop-blur` became an opaque white card with an
 *    ink/10 hairline and `shadow-card`. The map's words: "the aside is weakest
 *    exactly where the CTA lives". A translucent panel also has to survive five
 *    different hero gradients behind it, and its edge disappeared on three.
 *
 *  - PRIMARY. `Button` -> `CompoundCta` (S10). This is THE primary control
 *    everywhere; `justify-between` pushes the circular end cap to the far edge,
 *    matching `.panel .cta` in prototype/index.html.
 *
 *  - SECONDARY. The outlined `Button` is gone. Secondary is always a text link
 *    with an icon (`.tlink`), never an outline: a low-contrast control boundary
 *    is the exact WCAG 1.4.11 failure this corpus keeps repeating, and an
 *    outline button of equal weight beside the primary flattens the hierarchy.
 *    It stays a `<button>` because it opens a modal, not a page.
 *
 *  - FACTS. S36/S11 — the icon purge. The `bg-primary` dot before each bullet is
 *    deleted; rows are separated by hairlines and nothing else. No boxes, no
 *    icons, no tick glyphs. Body at 16px ink-700, per the map.
 *
 *  - S16. Exactly one accented element per view, and it is the CTA. The tagline
 *    moved off `text-primary` (5.64:1 on white) onto ink (14.6:1) so plum reads
 *    once, on the button. It keeps `font-serif-italic italic` — that token is
 *    the Lora ROMAN face, so the `italic` class is what actually renders italic;
 *    the two must travel together or the tagline silently goes upright.
 *
 * STILL OPEN, because it needs a prop this file may not add: the map wants the
 * price/commitment inside the CTA and repeated as a fact row. `DetailAsideProps`
 * is frozen, so that lands with the content-model change that makes the chips
 * and bullets per-record.
 */
export function DetailAside({
  tagline,
  chips,
  bullets,
  ctaPrimaryLabel = "Talk to an expert",
  ctaSecondaryLabel = "Request a callback",
  source,
  className,
}: DetailAsideProps) {
  const { open } = useModal();
  // Never a hardcoded literal: six routes render this component and a hardcoded
  // id would collide the moment a page mounts two of them.
  const taglineId = React.useId();
  const leadArgs = source ? { source } : undefined;
  const pills = pairChips(chips);

  return (
    <aside
      aria-labelledby={tagline ? taglineId : undefined}
      className={cn(
        "rounded-lg border border-hairline bg-white p-5 shadow-[var(--shadow-card)] sm:p-6",
        // Sticky on desktop, anchored 24px below the 68px sticky header — the
        // same 92px offset the prototype's `.panel` uses.
        // PRECONDITION, and it lives in components/page/detail-hero.tsx which is
        // not mine to edit: the hero grid sets `items-start`, so the cell that
        // wraps this card shrink-wraps to the card's own height and sticky has
        // no travel. That cell needs `lg:self-stretch` for this to move. The
        // declaration below is correct and inert until then.
        "lg:sticky lg:top-[92px]",
        className
      )}
    >
      {tagline && (
        // S19 — Lora for the human sentence. `font-serif-italic` binds the
        // family; `italic` is what slants it. Do not separate them.
        <p
          id={taglineId}
          className="text-balance font-serif-italic text-body-lg italic text-ink"
        >
          {tagline}
        </p>
      )}

      {pills.length > 0 && (
        // MEASURED, and it contradicts the token comment: TagPill paints
        // sand-ink #8A5A16 on sand-100 #F5E4C7, which is 4.73:1 — NOT the 9.0:1
        // asserted in styles/tokens.css and components/ui/tag-pill.tsx. At
        // 11.5px bold that is normal-size text (bold only counts as large from
        // 18.66px), so the bar is 4.5:1 and the pill passes with ~0.2 to spare.
        // Do not darken the ground or lighten the text on the strength of a
        // 9:1 margin that is not there. Neither file is mine to correct.
        <ul className="mt-4 flex flex-wrap gap-2">
          {pills.map((p) => (
            <li key={p.key}>
              {p.right === undefined ? (
                <Tag>{p.left}</Tag>
              ) : (
                <TagPill left={p.left} right={p.right} />
              )}
            </li>
          ))}
        </ul>
      )}

      {bullets && bullets.length > 0 && (
        // S11/S36 — hairline rows. The rule above each row is the entire
        // chrome, and the leading rule also divides the list from the pills.
        <ul className="mt-5">
          {bullets.map((b) => (
            <li
              key={b}
              className="border-t border-hairline py-3 text-body text-ink-700"
            >
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-col items-start gap-4">
        {/* S10 — the compound CTA is the primary control and the one accent. */}
        <CompoundCta
          className="w-full justify-between"
          onClick={() => open("talk", leadArgs)}
        >
          {ctaPrimaryLabel}
        </CompoundCta>

        {/* Secondary is a text link with an icon — never an outline (the
            `.tlink` recipe: hairline-strong underline, plum on hover). */}
        <button
          type="button"
          onClick={() => open("callback", leadArgs)}
          className="inline-flex cursor-pointer items-center gap-2 border-b border-hairline-strong pb-0.5 text-[15px] font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {ctaSecondaryLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
