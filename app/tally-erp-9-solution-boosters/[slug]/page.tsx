import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { DetailHero } from "@/components/page/detail-hero";
import { DetailAside } from "@/components/page/detail-aside";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { SpecTable } from "@/components/page/spec-table";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  boosterDetailBySlug,
  boosterSlugs,
} from "@/content/details/boosters";

const BASE = "/tally-erp-9-solution-boosters";

export function generateStaticParams() {
  return boosterSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = boosterDetailBySlug[slug];
  if (!b) return {};
  return {
    title: `${b.title} — Tally booster pack`,
    description: b.summary,
    alternates: { canonical: `${BASE}/${b.slug}` },
  };
}

export default async function BoosterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = boosterDetailBySlug[slug];
  if (!b) notFound();

  const related = toRelatedItems(BASE, boosterDetailBySlug, b.relatedSlugs);

  return (
    <>
      <DetailHero
        eyebrow={b.hero.eyebrow}
        title={b.hero.title}
        sub={b.hero.sub}
        gradient={b.hero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Solution Boosters", href: BASE },
          { label: b.title },
        ]}
        aside={
          <DetailAside
            tagline={b.tagline}
            chips={[
              { tone: "plum", label: "Bundled pack" },
              { tone: "success", label: "Upgrade-safe" },
            ]}
            bullets={[
              "Installs in under 30 minutes",
              "Full 14-day trial on AMC",
              "Team training included",
            ]}
            source="offerings"
            ctaPrimaryLabel="Request trial"
          />
        }
      />

      <SectionBand tone="cream">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="What's in the pack"
            title={`Inside the ${b.title}.`}
            lead="Every contents line is a deployable utility — not a slide in a brochure."
          />
          <ul className="flex flex-col gap-3">
            {b.contents.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-lg border border-cream-200 bg-white p-5"
              >
                <Package className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <p className="text-body text-ink-700">{c}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="Feature highlights"
          title="The moves that save daily time."
          align="center"
        />
        <div className="mt-10">
          <FeatureGrid items={b.features} columns={2} />
        </div>
      </SectionBand>

      {b.specs && b.specs.length > 0 && (
        <SectionBand tone="cream-alt">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <SectionHeader eyebrow="Specs" title="Technical at-a-glance" />
            <SpecTable rows={b.specs} />
          </div>
        </SectionBand>
      )}

      {b.faqs && b.faqs.length > 0 && (
        <SectionBand tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQs"
              title={`Questions about the ${b.title}.`}
              align="center"
            />
            <div className="mt-8">
              <FaqAccordion items={b.faqs} />
            </div>
          </div>
        </SectionBand>
      )}

      {related.length > 0 && (
        <SectionBand tone="cream">
          <SectionHeader eyebrow="Related" title="Other booster packs" />
          <div className="mt-8">
            <RelatedCards items={related} />
          </div>
        </SectionBand>
      )}

      <CtaBand
        title={`Put the ${b.title} on your Tally this week.`}
        sub="14-day trial, installed live. See the time-savings on your own team before committing."
        source="offerings"
        primaryLabel="Request trial"
      />
    </>
  );
}
