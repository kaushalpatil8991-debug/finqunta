import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  verticalHero,
  verticalNote,
} from "@/content/pages/vertical-solutions";
import {
  verticalDetailBySlug,
  verticalSlugs,
} from "@/content/details/verticals";

const BASE = "/tally-erp-9-vertical-solutions";
const verticalCards = toRelatedItems(BASE, verticalDetailBySlug, verticalSlugs);

export const metadata: Metadata = {
  title: "Tally vertical solutions — industry-specific packs",
  description:
    "Preconfigured Tally packs for trading, manufacturing, pharma, retail, services, and NGOs. Ready-to-run masters, vouchers, and reports.",
  alternates: { canonical: "/tally-erp-9-vertical-solutions" },
};

export default function VerticalSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={verticalHero.eyebrow}
        title={verticalHero.title}
        sub={verticalHero.sub}
        gradient={verticalHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Vertical Solutions" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Packs we ship"
          title="Pick the industry — we hand you a Tally already set up for it."
          align="center"
          lead="Tap any industry for the full pack page with pain points, features, and outcomes."
        />
        <div className="mt-10">
          <RelatedCards items={verticalCards} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl rounded-lg border border-accent-sand-100 bg-accent-sand-100/40 p-8">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-[#7a5c0f]">
            How packs are priced
          </p>
          <p className="mt-3 text-body-lg text-ink-700">{verticalNote}</p>
        </div>
      </SectionBand>

      <CtaBand
        title="Don't see your industry?"
        sub="We have built vertical packs for construction, logistics, education, and import-export too. Tell us what you run — we will tell you what we can ship."
        source="enquiry"
        primaryLabel="Ask about your industry"
      />
    </>
  );
}
