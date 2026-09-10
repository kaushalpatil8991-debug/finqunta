import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { DetailHero } from "@/components/page/detail-hero";
import { DetailAside } from "@/components/page/detail-aside";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  verticalDetailBySlug,
  verticalSlugs,
} from "@/content/details/verticals";

const BASE = "/tally-erp-9-vertical-solutions";

export function generateStaticParams() {
  return verticalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = verticalDetailBySlug[slug];
  if (!v) return {};
  return {
    title: `${v.title} — Tally vertical pack`,
    description: v.summary,
    alternates: { canonical: `${BASE}/${v.slug}` },
  };
}

export default async function VerticalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = verticalDetailBySlug[slug];
  if (!v) notFound();

  const related = toRelatedItems(BASE, verticalDetailBySlug, v.relatedSlugs);

  return (
    <>
      <DetailHero
        eyebrow={v.hero.eyebrow}
        title={v.hero.title}
        sub={v.hero.sub}
        gradient={v.hero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Vertical Solutions", href: BASE },
          { label: v.title },
        ]}
        aside={
          <DetailAside
            tagline={v.tagline}
            chips={[
              { tone: "sand", label: "Industry-tuned" },
              { tone: "plum", label: "2-week go-live" },
            ]}
            bullets={[
              "Preconfigured masters for your industry",
              "Audit-ready reports on day one",
              "No extra licence — runs on your TallyPrime",
            ]}
            source="enquiry"
            ctaPrimaryLabel="Scope the pack"
          />
        }
      />

      <SectionBand tone="cream">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="Pain points we address"
            title="The headaches this pack resolves."
            lead="Every pain below maps to a specific feature lower on this page."
          />
          <ul className="flex flex-col gap-3">
            {v.painPoints.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-lg border border-accent-sand-100 bg-accent-sand-100/40 p-5"
              >
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#7a5c0f]"
                  aria-hidden
                />
                <p className="text-body text-ink-700">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="What's in the pack"
          title={`The ${v.title} configuration.`}
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={v.features} columns={3} tone="sand" />
        </div>
      </SectionBand>

      <SectionBand tone="cream-alt">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="Outcomes"
            title="Measurable changes our customers report."
          />
          <ul className="flex flex-col gap-3">
            {v.outcomes.map((o) => (
              <li
                key={o}
                className="flex items-start gap-3 rounded-lg border border-cream-200 bg-white p-5"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-success"
                  aria-hidden
                />
                <p className="text-body text-ink-700">{o}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      {v.faqs && v.faqs.length > 0 && (
        <SectionBand tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQs"
              title={`Questions about the ${v.title} pack.`}
              align="center"
            />
            <div className="mt-8">
              <FaqAccordion items={v.faqs} />
            </div>
          </div>
        </SectionBand>
      )}

      {related.length > 0 && (
        <SectionBand tone="cream">
          <SectionHeader eyebrow="Related" title="Other industry packs" />
          <div className="mt-8">
            <RelatedCards items={related} />
          </div>
        </SectionBand>
      )}

      <CtaBand
        title={`Get the ${v.title} pack running in 2 weeks.`}
        sub="Scoping call + written SoW this week; go-live in 2 weeks flat."
        source="enquiry"
        primaryLabel="Scope the pack"
      />
    </>
  );
}
