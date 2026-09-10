import type { Metadata } from "next";
import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { CtaBand } from "@/components/page/cta-band";
import { site } from "@/lib/site";
import {
  careerHero,
  cultureNote,
  perks,
  openings,
} from "@/content/pages/career";
import type { JobOpening } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Finquanta is hiring Tally consultants, TDL developers, integrations engineers, and support leads across Mumbai and remote.",
  alternates: { canonical: "/career" },
};

const employmentLabel: Record<JobOpening["employment"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  intern: "Intern",
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow={careerHero.eyebrow}
        title={careerHero.title}
        sub={careerHero.sub}
        gradient={careerHero.gradient}
        crumbs={[{ label: "Home", href: "/" }, { label: "Career" }]}
      />

      <SectionBand tone="cream">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-serif-italic italic text-primary">
            &ldquo;A calm team that ships.&rdquo;
          </span>
          <p className="mt-4 text-body-lg text-ink-500">{cultureNote}</p>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="Perks & benefits"
          title="What it is like to work here."
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={perks} columns={3} />
        </div>
      </SectionBand>

      <SectionBand tone="cream-alt" id="openings">
        <SectionHeader
          eyebrow="Open roles"
          title={`${openings.length} current openings.`}
          lead="Apply via email — a one-page cover note plus CV is enough to start."
        />
        <ul className="mt-10 divide-y divide-cream-200 overflow-hidden rounded-lg border border-cream-200 bg-white">
          {openings.map((job) => (
            <li key={job.id}>
              <JobRow job={job} />
            </li>
          ))}
        </ul>
      </SectionBand>

      <CtaBand
        title="Don't see a role that fits?"
        sub={`Write to ${site.email} with a one-page note on where you would fit. We read everything.`}
        source="enquiry"
        primaryLabel="Say hello"
      />
    </>
  );
}

function JobRow({ job }: { job: JobOpening }) {
  const subject = encodeURIComponent(`Application: ${job.role}`);
  return (
    <div className="grid grid-cols-1 gap-4 p-6 transition-colors hover:bg-cream-100/50 md:grid-cols-[1.3fr_1fr_auto] md:items-center md:gap-6">
      <div>
        <h3 className="text-h4 font-semibold text-ink">{job.role}</h3>
        <p className="mt-1.5 text-body-sm text-ink-500">{job.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-caption text-ink-500">
        <Chip tone="plum">
          <Briefcase className="h-3 w-3" aria-hidden />
          {employmentLabel[job.employment]}
        </Chip>
        <Chip tone="cream">
          <MapPin className="h-3 w-3" aria-hidden />
          {job.location}
        </Chip>
        <Chip tone="sand">
          <GraduationCap className="h-3 w-3" aria-hidden />
          {job.experience}
        </Chip>
      </div>
      <Button asChild variant="outline" size="md">
        <a href={`mailto:${site.email}?subject=${subject}`}>
          Apply
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </Button>
    </div>
  );
}
