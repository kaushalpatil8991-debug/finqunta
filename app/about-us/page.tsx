import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { ProcessSteps } from "@/components/page/process-steps";
import { CtaBand } from "@/components/page/cta-band";
import { site } from "@/lib/site";
import {
  aboutHero,
  aboutMission,
  aboutPillars,
} from "@/content/pages/about";
import { proof, hasTrustContent } from "@/content/proof";
import { ProofSlot, TrustSection } from "@/components/proof/trust";

export const metadata: Metadata = {
  title: "About Finquanta",
  description:
    "Finquanta Solutions is a Tally Partner for Indian SMEs — implementation, customisation, cloud, and long-term support.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        sub={aboutHero.sub}
        gradient={aboutHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <SectionBand tone="cream">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <SectionHeader
            eyebrow="Our mission"
            title={
              <>
                Take accounting{" "}
                <span className="font-serif-italic italic font-medium text-primary">
                  plumbing
                </span>{" "}
                off every SME&apos;s plate.
              </>
            }
          />
          <p className="text-body-lg text-ink-500">{aboutMission}</p>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="What we stand for"
          title="Four commitments we make on every engagement."
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={aboutPillars} columns={4} />
        </div>
      </SectionBand>

      {proof.milestones.length > 0 ? (
        <SectionBand tone="cream-alt">
          <SectionHeader
            eyebrow="Our journey"
            title="Where Finquanta has been."
            align="center"
          />
          <div className="mt-12">
            <ProcessSteps
              steps={proof.milestones.map((m, i) => ({
                step: i + 1,
                title: `${m.year}: ${m.title}`,
                body: m.body ?? "",
              }))}
            />
          </div>
        </SectionBand>
      ) : process.env.NODE_ENV === "development" ? (
        <SectionBand tone="cream-alt">
          <ProofSlot what="Company history (year founded and milestones). The old draft timeline is hidden because it was never confirmed." />
        </SectionBand>
      ) : null}

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="Leadership"
          title="The person who picks up the phone."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proof.team.map((leader) => (
            <li
              key={leader.name}
              className="flex flex-col rounded-lg border border-transparent bg-cream p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-4">
                {leader.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={leader.photo} alt="" className="h-14 w-14 rounded-full object-cover" />
                ) : (
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-h3 font-bold text-primary"
                >
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                )}
                <div>
                  <h3 className="text-h4 font-semibold text-ink">
                    {leader.name}
                  </h3>
                  <p className="text-body-sm text-ink-500">{leader.role}</p>
                </div>
              </div>
              {leader.bio ? (
                <p className="mt-4 text-body-sm text-ink-500">{leader.bio}</p>
              ) : null}
            </li>
          ))}
        </ul>
        <ProofSlot className="mt-6" what="Team photos, roles and short bios (one or two sentences each)." />
      </SectionBand>

      {hasTrustContent() || site.facts.partnerCategory || process.env.NODE_ENV === "development" ? (
        <SectionBand tone="cream-alt">
          <TrustSection />
        </SectionBand>
      ) : null}

      <SectionBand tone="cream">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <SectionHeader
            eyebrow="Contact"
            title={`Talk to ${site.director.name}`}
            lead={
              site.confirmed.phone && site.confirmed.email
                ? `${site.phone.display} · ${site.email}`
                : "Book a 20-minute call and we'll ring you back to fix a time."
            }
          />
          {site.confirmed.email ? (
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${site.email}`}>
                Email the director
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          ) : null}
        </div>
      </SectionBand>

      <CtaBand
        title="Work with a Tally partner that answers the phone."
        sub="Book a 20-minute call. Tell us about your setup and we will suggest the next step."
        source="enquiry"
      />
    </>
  );
}
