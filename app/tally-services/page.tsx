import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { RelatedCards } from "@/components/page/related-cards";
import { ProcessSteps } from "@/components/page/process-steps";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  servicesHero,
  servicesProcess,
  servicesFaqs,
} from "@/content/pages/services";
import {
  serviceDetailBySlug,
  serviceSlugs,
} from "@/content/details/services";

const BASE = "/tally-services";
const serviceCards = toRelatedItems(BASE, serviceDetailBySlug, serviceSlugs);

export const metadata: Metadata = {
  title: "Tally services — AMC, support, training, sync",
  description:
    "Annual cover, onsite and remote support, data synchronisation, and Tally training — from a partner with written SLAs.",
  alternates: { canonical: "/tally-services" },
};

export default function TallyServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        sub={servicesHero.sub}
        gradient={servicesHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Tally Services" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Services we run"
          title="Everything around Tally — not Tally itself."
          align="center"
          lead="Tap any card for the full service page with process, deliverables, and FAQs."
        />
        <div className="mt-10">
          <RelatedCards items={serviceCards} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="How AMC works"
          title="Four steps from first call to ongoing cover."
          align="center"
        />
        <div className="mt-12">
          <ProcessSteps steps={servicesProcess} />
        </div>
      </SectionBand>

      <SectionBand tone="cream-alt">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="FAQs"
            title="Questions customers ask before signing."
            align="center"
          />
          <div className="mt-8">
            <FaqAccordion items={servicesFaqs} />
          </div>
        </div>
      </SectionBand>

      <CtaBand
        title="Move from break-fix to calm cover."
        sub="Book a 30-minute scoping call. We send a written AMC quote the same day with SLAs in plain language."
        source="enquiry"
        primaryLabel="Scope an AMC"
      />
    </>
  );
}
