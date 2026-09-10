import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { CaseStudyCard } from "@/components/page/case-study-card";
import { CtaBand } from "@/components/page/cta-band";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Finquanta case studies — real SME outcomes from our Tally, cloud, and add-on engagements across distribution, pharma, manufacturing, and NGO sectors.",
  alternates: { canonical: "/case-study" },
};

export default function CaseStudyIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Real engagements. Real numbers. Real customers."
        sub="Every case study here is a customer we shipped against — with the setup they had, the stack we deployed, and the measurable outcome. Names are the customer's actual business."
        gradient="sand"
        crumbs={[{ label: "Home", href: "/" }, { label: "Case studies" }]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow={`${caseStudies.length} case studies`}
          title="From distribution to NGOs."
          lead="Short reads (5–8 minutes) with the numbers you can measure against your own setup."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((c) => (
            <li key={c.slug} className="relative">
              <CaseStudyCard study={c} />
            </li>
          ))}
        </ul>
      </SectionBand>

      <CtaBand
        title="Want your own engagement to become a case study?"
        sub="We write them up with customer sign-off after a successful rollout. Every one teaches the next customer something useful."
        source="enquiry"
        primaryLabel="Scope an engagement"
      />
    </>
  );
}
