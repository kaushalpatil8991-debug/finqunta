import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  boostersHero,
  boostersPromise,
} from "@/content/pages/boosters";
import {
  boosterDetailBySlug,
  boosterSlugs,
} from "@/content/details/boosters";

const BASE = "/tally-erp-9-solution-boosters";
const boosterCards = toRelatedItems(BASE, boosterDetailBySlug, boosterSlugs);

export const metadata: Metadata = {
  title: "Tally solution boosters — productivity packs",
  description:
    "Bundles of our most-installed TDLs and utilities — daily desk, reconciliation, reporting, MIS, operations, and compliance.",
  alternates: { canonical: "/tally-erp-9-solution-boosters" },
};

export default function BoostersPage() {
  return (
    <>
      <PageHero
        eyebrow={boostersHero.eyebrow}
        title={boostersHero.title}
        sub={boostersHero.sub}
        gradient={boostersHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Solution Boosters" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Six booster packs"
          title="Curated bundles — not random add-ons."
          align="center"
          lead="Tap any pack for the full page with contents, features, and FAQs."
        />
        <div className="mt-10">
          <RelatedCards items={boosterCards} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl rounded-lg border border-cream-200 bg-cream-100 p-8 text-center">
          <p className="font-serif-italic italic text-primary">
            All TDL-based. All upgrade-safe.
          </p>
          <p className="mt-3 text-body-lg text-ink-700">{boostersPromise}</p>
        </div>
      </SectionBand>

      <CtaBand
        title="See boosters running on your own Tally."
        sub="Free 14-day trial on any single pack. Active-cover clients get the full set during evaluation."
        source="enquiry"
        primaryLabel="Request booster trial"
      />
    </>
  );
}
