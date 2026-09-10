import { SectionHeader } from "@/components/ui/section-header";
import { PlaceholderFlag } from "@/components/ui/placeholder-flag";
import { awards } from "@/content/awards";
import type { Award } from "@/lib/schema";

/**
 * S18 family grammar — a label chip opens each card, and the same terminator
 * closes it in the same fixed corner on all of them, which is what makes N
 * unrelated blocks read as one system. Here the chip is the year and the
 * terminator is the issuer line, pinned to the card foot above a hairline by
 * `mt-auto` so it lands on the same baseline whatever the copy above it does.
 *
 * Deliberately NO circular ↗ in that corner. S18's arrow is a *navigation*
 * terminator and these cards go nowhere; the prototype's `.acard` omits it for
 * that reason (contrast `.bcard .go` on Offerings, which are links). Adding one
 * here would be exactly the faux affordance the map condemns elsewhere. If a
 * future ledger route makes these cards clickable, the arrow belongs top-right
 * at `absolute top-5 right-5`, which is why the card is `relative`.
 *
 * Purged in this rewrite (FQ/design-to-section-map.md §3.1 row 11 and
 * §"6. The icon-chip purge"):
 *  - the six identical 80×96 medal SVGs — six repetitions of one glyph
 *    distinguish nothing, and a clinical trophy makes invented issuers look
 *    audited;
 *  - the hover Tooltip. The description was the section's only content and
 *    touch users never saw it, while the lead copy ("Hover for the story
 *    behind each badge") instructed a gesture that does not exist on mobile.
 *    The description now sits in the card, and the lead is gone.
 *
 * With the Tooltip goes the last hook in this file, so it is a server
 * component — no "use client".
 */

/* ═══════════════════════════════════════════════════════════════════════
 * EDITORIAL GATE — three of six records are withheld from render.
 *
 * All six entries in content/awards.ts are `isPlaceholder: true`, but they are
 * not equally dangerous. Presenting an award you were not given, attributed to
 * a NAMED ISSUING BODY, is the one placeholder on this page with legal
 * exposure — it is a false statement about a third party, not just unverified
 * copy about ourselves. So the band renders only records whose issuer is Tally
 * Solutions, the one body Finquanta actually has a partner relationship with,
 * and flags the whole band as unverified.
 *
 * WITHHELD until the client supplies a certificate or a public citation:
 *   1. a-customer-success-2023  "Outstanding Customer Success"
 *        issuer: "Western Region Partners Forum"   — body does not exist.
 *   2. a-client-delight-2024    "Client Delight Award"
 *        issuer: "SME Excellence Forum"            — body does not exist.
 *   3. a-integration-2023       "Integration Specialist of the Year"
 *        issuer: "Tally Solutions Partner Awards"  — reads as the name of a
 *        formal awards programme rather than the company; not the same entity
 *        as Tally Solutions and not verifiable as written.
 *
 * The records stay in content/awards.ts on purpose — deleting them would lose
 * the copy and hide the debt. Verify an issuer, and its card appears here the
 * moment the string matches. Do not widen this filter to a substring test:
 * "Tally Solutions Partner Awards" would pass it, which is the whole problem.
 * ═══════════════════════════════════════════════════════════════════════ */
const VERIFIABLE_ISSUER = "Tally Solutions";

const shownAwards = awards.filter((award) => award.issuer === VERIFIABLE_ISSUER);

export function Awards() {
  // If verification ever empties the list, drop the band rather than shipping a
  // heading over nothing.
  if (shownAwards.length === 0) return null;

  return (
    <section
      id="awards"
      aria-labelledby="awards-heading"
      className="border-b border-hairline bg-cream-100 py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        {/* S38 section header — lead left, action right, aligned on the
            baseline. The "action" slot carries the band-level placeholder flag
            instead of a CTA. */}
        <div className="mb-[34px] grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeader
            eyebrow="Recognition"
            title={
              <span id="awards-heading">Awards and partner recognition.</span>
            }
          />
          <PlaceholderFlag
            className="justify-self-start"
            title="All six award records in content/awards.ts are unverified sample data. Three are shown here; three more are withheld because their issuing bodies cannot be verified."
          >
            All six fabricated
          </PlaceholderFlag>
        </div>

        <ul className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {shownAwards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </ul>

        <p className="mt-[22px] text-[13px] leading-[1.5] text-ink-500">
          Issuers like &ldquo;Western Region Partners Forum&rdquo; and
          &ldquo;SME Excellence Forum&rdquo; do not exist. Naming a real body as
          the issuer of an award you were not given is the one placeholder here
          with legal exposure &mdash; three shown instead of six until they are
          verified.
        </p>
      </div>
    </section>
  );
}

function AwardCard({ award }: { award: Award }) {
  return (
    <li className="relative flex flex-col gap-[11px] rounded-lg border border-hairline bg-white p-[22px]">
      {/* S18 label chip: the card header, same slot on every card. */}
      <span className="text-[11px] font-bold tracking-[0.08em] text-ink-500 tabular-nums-strict">
        {award.year}
      </span>

      {/* S19: 17px clears the 16px serif floor, so the title is Lora. */}
      <h3 className="font-serif text-[17px] font-semibold leading-[1.3] tracking-normal text-ink">
        {award.title}
      </h3>

      <p className="text-[13.5px] leading-[1.5] text-ink-500">
        {award.description}
      </p>

      {/* The family terminator — hairline + issuer, pinned to the card foot. */}
      <p className="mt-auto border-t border-hairline pt-[11px] text-[12px] text-ink-500">
        <span className="sr-only">Issued by </span>
        {award.issuer}
      </p>
    </li>
  );
}
