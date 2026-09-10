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
  aboutTimeline,
  aboutLeadership,
} from "@/content/pages/about";

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

      <SectionBand tone="cream-alt">
        <SectionHeader
          eyebrow="Our journey"
          title="Where Finquanta has been."
          align="center"
        />
        <div className="mt-12">
          <ProcessSteps steps={aboutTimeline} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="Leadership"
          title="The person who picks up the phone."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutLeadership.map((leader) => (
            <li
              key={leader.id}
              className="flex flex-col rounded-lg border border-cream-200 bg-cream p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-4">
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
                <div>
                  <h3 className="text-h4 font-semibold text-ink">
                    {leader.name}
                  </h3>
                  <p className="text-body-sm text-ink-500">{leader.role}</p>
                </div>
              </div>
              <p className="mt-4 text-body-sm text-ink-500">{leader.bio}</p>
            </li>
          ))}
        </ul>
      </SectionBand>

      <SectionBand tone="cream">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <SectionHeader
            eyebrow="Contact"
            title={`Talk to ${site.director.name}`}
            lead={`${site.phone.display} · ${site.email}`}
          />
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${site.email}`}>
              Email the director
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>
      </SectionBand>

      <CtaBand
        title="Work with a Tally partner that answers the phone."
        sub="Pick up where the hero slides stop. Schedule a 30-minute call and get a written scope the same day."
        source="enquiry"
      />
    </>
  );
}
