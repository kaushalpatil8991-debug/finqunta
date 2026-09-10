import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { ProcessSteps } from "@/components/page/process-steps";
import { CtaBand } from "@/components/page/cta-band";
import {
  customizationHero,
  customizationFeatures,
  customizationProcess,
  customizationNote,
} from "@/content/pages/customization";

export const metadata: Metadata = {
  title: "Tally customisation — TDL, vouchers, reports",
  description:
    "Shape Tally to your SOPs. Custom vouchers, invoice formats, reports, validations, and workflow automations — all TDL-based.",
  alternates: { canonical: "/tally-customization" },
};

export default function TallyCustomizationPage() {
  return (
    <>
      <PageHero
        eyebrow={customizationHero.eyebrow}
        title={customizationHero.title}
        sub={customizationHero.sub}
        gradient={customizationHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Tally Customisation" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="What we build"
          title="Six kinds of customisation we ship every month."
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={customizationFeatures} columns={3} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="How we work"
          title="Predictable steps, no surprises."
          align="center"
        />
        <div className="mt-12">
          <ProcessSteps steps={customizationProcess} />
        </div>
      </SectionBand>

      <SectionBand tone="cream-alt">
        <div className="mx-auto max-w-3xl rounded-lg border border-primary-100 bg-primary-50 p-8 text-center">
          <p className="font-serif-italic italic text-primary">
            Upgrade-safe by design.
          </p>
          <p className="mt-2 text-body-lg text-ink-700">{customizationNote}</p>
        </div>
      </SectionBand>

      <CtaBand
        title="Have a workflow that Tally does not handle out of the box?"
        sub="Share a few bullet points — we reply with a first-pass scope in 48 hours, free of charge."
        source="enquiry"
      />
    </>
  );
}
