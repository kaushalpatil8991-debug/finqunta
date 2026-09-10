import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { CtaBand } from "@/components/page/cta-band";
import {
  integrationHero,
  integrationFeatures,
  integrationPromise,
} from "@/content/pages/integration";

export const metadata: Metadata = {
  title: "Tally integrations & APIs",
  description:
    "Connect Tally to e-commerce, payment gateways, CRMs, banking, logistics, and custom APIs — with monitored, reliable syncs.",
  alternates: { canonical: "/tally-integration" },
};

export default function TallyIntegrationPage() {
  return (
    <>
      <PageHero
        eyebrow={integrationHero.eyebrow}
        title={integrationHero.title}
        sub={integrationHero.sub}
        gradient={integrationHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Integrations" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Systems we connect"
          title="Six categories. Dozens of specific connectors."
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={integrationFeatures} columns={3} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl rounded-lg border border-cream-200 bg-cream p-8">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-primary">
            Our promise
          </p>
          <p className="mt-3 text-h3 font-semibold text-ink">
            No black boxes.
          </p>
          <p className="mt-3 text-body-lg text-ink-500">{integrationPromise}</p>
        </div>
      </SectionBand>

      <CtaBand
        title="Got an integration you cannot find a connector for?"
        sub="If it has an API — or a file format that holds still — we have probably wired it into Tally already. Send us the spec."
        source="enquiry"
        primaryLabel="Scope an integration"
      />
    </>
  );
}
