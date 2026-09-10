import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { CtaBand } from "@/components/page/cta-band";
import { gstHero, gstFeatures, gstFaqs } from "@/content/pages/tally-gst";

export const metadata: Metadata = {
  title: "Tally GST — e-invoice, e-way bill, returns",
  description:
    "End-to-end GST workflow inside your Tally — invoicing, e-invoice generation, e-way bill automation, and GSTR-1/3B preparation.",
  alternates: { canonical: "/tally-gst" },
};

export default function TallyGstPage() {
  return (
    <>
      <PageHero
        eyebrow={gstHero.eyebrow}
        title={gstHero.title}
        sub={gstHero.sub}
        gradient={gstHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Tally GST" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="GST workflow in Tally"
          title="Six moving parts — all wired together, all monitored."
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={gstFeatures} columns={3} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="FAQs"
            title="GST questions we hear most often."
            align="center"
          />
          <div className="mt-8">
            <FaqAccordion items={gstFaqs} />
          </div>
        </div>
      </SectionBand>

      <CtaBand
        title="Simplify your GST workflow by month-end."
        sub="Two-week GST setup and team training, included with Growth-tier engagements."
        source="enquiry"
        primaryLabel="Book a GST review"
      />
    </>
  );
}
