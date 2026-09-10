import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { DetailHero } from "@/components/page/detail-hero";
import { DetailAside } from "@/components/page/detail-aside";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { ProcessSteps } from "@/components/page/process-steps";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  serviceDetailBySlug,
  serviceSlugs,
} from "@/content/details/services";

const BASE = "/tally-services";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceDetailBySlug[slug];
  if (!s) return {};
  return {
    title: `${s.title} — Tally service`,
    description: s.summary,
    alternates: { canonical: `${BASE}/${s.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceDetailBySlug[slug];
  if (!s) notFound();

  const related = toRelatedItems(BASE, serviceDetailBySlug, s.relatedSlugs);

  return (
    <>
      <DetailHero
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        sub={s.hero.sub}
        gradient={s.hero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Tally Services", href: BASE },
          { label: s.title },
        ]}
        aside={
          <DetailAside
            tagline={s.tagline}
            chips={[
              { tone: "plum", label: "Written SLAs" },
              { tone: "sand", label: "Named engineer" },
            ]}
            bullets={[
              "Quote in 24 hours",
              "Onboarding audit before cover starts",
              "Quarterly reviews, not silent delivery",
            ]}
            source="enquiry"
            ctaPrimaryLabel="Scope a contract"
          />
        }
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="What's included"
          title={`Inside ${s.title}.`}
        />
        <div className="mt-10">
          <FeatureGrid items={s.features} columns={3} />
        </div>
      </SectionBand>

      {s.process && s.process.length > 0 && (
        <SectionBand tone="white">
          <SectionHeader
            eyebrow="How we work"
            title="From first call to steady-state support."
            align="center"
          />
          <div className="mt-12">
            <ProcessSteps steps={s.process} />
          </div>
        </SectionBand>
      )}

      {s.deliverables && s.deliverables.length > 0 && (
        <SectionBand tone="cream-alt">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <SectionHeader
              eyebrow="Deliverables"
              title="What you walk away with, in writing."
              lead="Every item below appears in your Service Agreement. No 'best efforts' language."
            />
            <ul className="grid grid-cols-1 gap-3">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex gap-3 rounded-lg border border-cream-200 bg-white p-5"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-body text-ink-700">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </SectionBand>
      )}

      {s.faqs && s.faqs.length > 0 && (
        <SectionBand tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQs"
              title={`Questions about ${s.title}.`}
              align="center"
            />
            <div className="mt-8">
              <FaqAccordion items={s.faqs} />
            </div>
          </div>
        </SectionBand>
      )}

      {related.length > 0 && (
        <SectionBand tone="cream">
          <SectionHeader eyebrow="Related" title="Services that pair well" />
          <div className="mt-8">
            <RelatedCards items={related} />
          </div>
        </SectionBand>
      )}

      <CtaBand
        title={`Ready to scope ${s.title}?`}
        sub="30-minute scoping call; written quote and SoW same day."
        source="enquiry"
        primaryLabel="Scope a contract"
      />
    </>
  );
}
