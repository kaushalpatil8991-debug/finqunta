import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { CaseStudyCard } from "@/components/page/case-study-card";
import { CtaBand } from "@/components/page/cta-band";
import { caseStudies } from "@/content/case-studies";
import { ProofSlot } from "@/components/proof/trust";

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
        title="Customer stories, with their numbers."
        sub="Each story covers the setup a customer had, what we changed, and what they measured afterwards. We publish one only when the customer agrees to be named."
        gradient="sand"
        crumbs={[{ label: "Home", href: "/" }, { label: "Case studies" }]}
      />

      <SectionBand tone="cream">
        {caseStudies.length > 0 ? (
          <>
            <SectionHeader
              title="From distribution to NGOs."
              lead="Short reads with numbers you can measure against your own setup."
            />
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {caseStudies.map((c) => (
                <li key={c.slug} className="relative">
                  <CaseStudyCard study={c} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="grid gap-4">
            <SectionHeader
              title="The first stories are being written up."
              lead="We are collecting customer sign-off before publishing. Want to hear how a similar business set up Tally? Book a call and ask."
            />
            <ProofSlot what="Case studies are hidden until confirmed. List the real ones in proof.confirmedCaseStudies." />
          </div>
        )}
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
