import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";
import {
  pricingHero,
  tiers,
  pricingFaqs,
} from "@/content/pages/pricing";
import { TierCard } from "./tier-card";

export const metadata: Metadata = {
  title: "TallyPrime pricing — Starter, Growth, Enterprise",
  description:
    "Transparent TallyPrime pricing — Starter, Growth, and Enterprise tiers. Licence costs at MRP, services priced separately, no surprises.",
  alternates: { canonical: "/tallyprime-pricing" },
};

export default function TallyPricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(pricingFaqs)} />
      <PageHero
        eyebrow={pricingHero.eyebrow}
        title={pricingHero.title}
        sub={pricingHero.sub}
        gradient={pricingHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Three tiers"
          title="Start where you are, upgrade when you grow."
          align="center"
          lead="Licence costs paid to Tally; Finquanta's service fees shown separately on every quote."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </ul>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="FAQs"
            title="Pricing questions, answered plainly."
            align="center"
          />
          <div className="mt-8">
            <FaqAccordion items={pricingFaqs} />
          </div>
        </div>
      </SectionBand>

      <CtaBand
        title="Want a line-item quote with your numbers?"
        sub="Tell us team size and current setup — we send a priced, itemised quote in under 24 hours."
        source="enquiry"
        primaryLabel="Get a quote"
      />
    </>
  );
}
