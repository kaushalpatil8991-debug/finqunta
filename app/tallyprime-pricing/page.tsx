import Link from "next/link";
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
        <p className="mt-8 text-center text-body text-ink-700">
          Thinking of renting instead of buying?{" "}
          <Link href="/tallyprime-buy-vs-rent" className="font-bold text-primary underline-offset-4 hover:underline">
            Compare the cost year by year
          </Link>
          .
        </p>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-5xl">
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
        sub="Tell us your team size and current setup, and we send a priced, itemised quote."
        source="enquiry"
        primaryLabel="Get a quote"
      />
    </>
  );
}
