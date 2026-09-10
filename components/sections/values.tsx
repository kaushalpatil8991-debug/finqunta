import { SectionHeader } from "@/components/ui/section-header";
import { values } from "@/content/values";
import type { ValueItem } from "@/lib/schema";

/**
 * S36 — iconless rows: a bold label over a grey sub-line, hairline separators,
 * zero glyphs. The 56px `primary-100` circular icon chip is deliberately gone
 * (FQ/design-to-section-map.md §3.1 row 12, and §"6. The icon-chip purge"):
 * the identical chip appeared on Offerings, Cloud, commitments, perks, benefits,
 * deliverables and capabilities, so it distinguished nothing anywhere.
 *
 * Server component — no hooks, no handlers.
 */
export function Values() {
  return (
    <section
      aria-labelledby="values-heading"
      className="border-b border-hairline bg-cream py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        <SectionHeader
          eyebrow="How we work"
          title={
            <span id="values-heading">
              Six commitments, and what each one costs us.
            </span>
          }
        />

        {/* Row gap is 0 by design — the hairline is the separator, not a gap.
            3 columns on desktop, 2 at md, 1 below. */}
        <ul className="mt-[34px] grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-11">
          {values.map((v) => (
            <ValueRow key={v.id} item={v} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ValueRow({ item }: { item: ValueItem }) {
  return (
    <li className="border-t border-hairline py-[18px]">
      {/* S19: 15px is below the 16px serif floor, so the label stays sans. */}
      <h3 className="mb-[5px] font-sans text-[15px] font-bold leading-[1.3] tracking-normal text-ink">
        {item.title}
      </h3>
      <p className="text-[13.5px] leading-[1.5] text-ink-500">{item.summary}</p>
    </li>
  );
}
