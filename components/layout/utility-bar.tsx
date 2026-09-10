import Link from "next/link";
import { site } from "@/lib/site";
import { TagPill } from "@/components/ui/tag-pill";

/**
 * S26 — 42px top strip. The credential is a two-part composite pill
 * (`Tally Partner ⎪ Since 2018`): two unlike facts in one sand-100 lozenge
 * split by a hairline, so a claim and its date read as one object rather than
 * as two competing chips. A filled chip on cream measures ~1.2:1, which is why
 * the fill-based hierarchy the bar used to reach for cannot work here.
 *
 * Contact links stay bare — no icons, no dividers — at 13px ink-500, hovering
 * to plum. The strip is md+ only; phone and email are reachable via
 * FloatingActions on mobile, and the mobile sheet header carries its own copy
 * of the credential pill so the proof still reaches phones.
 *
 * Not sticky and not blurred: the prototype paints it on the solid ground and
 * lets it scroll away under the sticky header, which owns the blur.
 * See `.util` / `.tag2` in prototype/index.html.
 */
export function UtilityBar() {
  return (
    <div className="hidden border-b border-hairline bg-cream-100 md:block">
      <div className="mx-auto flex h-[42px] max-w-[1280px] items-center gap-5 px-gutter-md lg:px-gutter-lg">
        <TagPill left={site.partner.type} right={`Since ${site.founded}`} />
        <nav
          aria-label="Utility"
          className="ml-auto flex items-center gap-[22px] text-[13px] text-ink-500"
        >
          <a
            href={`tel:${site.phone.tel}`}
            className="transition-colors hover:text-primary"
          >
            <span className="sr-only">Call </span>
            {site.phone.display}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-primary"
          >
            <span className="sr-only">Email </span>
            {site.email}
          </a>
          <Link href="/career" className="transition-colors hover:text-primary">
            Careers
          </Link>
        </nav>
      </div>
    </div>
  );
}
