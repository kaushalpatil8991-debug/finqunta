import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { CaseStudyCard } from "@/components/page/case-study-card";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { caseStudySchema } from "@/lib/seo";
import {
  caseStudies,
  caseStudyBySlug,
  caseStudySlugs,
} from "@/content/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug[slug];
  if (!study) return {};
  return {
    title: `${study.title} — ${study.customer}`,
    description: study.excerpt,
    alternates: { canonical: `/case-study/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.excerpt,
      publishedTime: study.date,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyBySlug[slug];
  if (!study) notFound();

  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={caseStudySchema(study)} />
      <PageHero
        eyebrow={`Case study · ${study.sector}`}
        title={study.title}
        sub={study.summary}
        gradient={study.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case studies", href: "/case-study" },
          { label: study.customer },
        ]}
      >
        <Chip tone="plum">
          <Building2 className="h-3 w-3" aria-hidden />
          {study.customer}
        </Chip>
        <Chip tone="cream">
          <CalendarDays className="h-3 w-3" aria-hidden />
          {formatDate(study.date)}
        </Chip>
      </PageHero>

      <SectionBand tone="cream-alt" compact>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {study.metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-lg border border-cream-200 bg-white p-5"
            >
              <p className="text-caption font-semibold uppercase tracking-wide text-primary">
                {m.label}
              </p>
              <p className="mt-2 text-h3 font-bold text-ink tabular-nums-strict">
                {m.value}
              </p>
            </li>
          ))}
        </ul>
      </SectionBand>

      <SectionBand tone="cream">
        <article className="mx-auto max-w-3xl">
          <Body />
        </article>
      </SectionBand>

      {related.length > 0 && (
        <SectionBand tone="white">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="More case studies" title="Other engagements" />
            <Button asChild variant="ghost" size="sm">
              <Link href="/case-study">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All case studies
              </Link>
            </Button>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {related.map((c) => (
              <li key={c.slug} className="relative">
                <CaseStudyCard study={c} />
              </li>
            ))}
          </ul>
        </SectionBand>
      )}

      <CtaBand
        title="Ready to talk about your own engagement?"
        sub="30-minute scoping call; written SoW the same day. No obligation."
        source="enquiry"
        primaryLabel="Scope an engagement"
      />
    </>
  );
}
