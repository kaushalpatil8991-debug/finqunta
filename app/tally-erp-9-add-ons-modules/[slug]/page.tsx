import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";
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
  addonDetailBySlug,
  addonSlugs,
} from "@/content/details/addons";

const BASE = "/tally-erp-9-add-ons-modules";

export function generateStaticParams() {
  return addonSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = addonDetailBySlug[slug];
  if (!a) return {};
  return {
    title: `${a.title} — Tally add-on module`,
    description: a.summary,
    alternates: { canonical: `${BASE}/${a.slug}` },
  };
}

export default async function AddonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = addonDetailBySlug[slug];
  if (!a) notFound();

  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[a.icon];
  const related = toRelatedItems(BASE, addonDetailBySlug, a.relatedSlugs);

  return (
    <>
      <DetailHero
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        sub={a.hero.sub}
        gradient={a.hero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Add-ons", href: BASE },
          { label: a.title },
        ]}
        aside={
          <DetailAside
            tagline={a.tagline}
            chips={[
              { tone: "plum", label: "TDL-based" },
              { tone: "success", label: "Upgrade-safe" },
            ]}
            bullets={[
              "Installs in 15 minutes",
              "Works on TallyPrime and above",
              "Free 14-day trial on AMC cover",
            ]}
            source="offerings"
            ctaPrimaryLabel="Request trial"
          />
        }
      />

      <SectionBand tone="cream">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="What it does" title={`Capabilities of ${a.title}.`} />
          {Icon && (
            <span
              aria-hidden
              className="hidden h-14 w-14 items-center justify-center rounded-md bg-white text-primary shadow-[var(--shadow-card)] md:flex"
            >
              <Icon className="h-6 w-6" />
            </span>
          )}
        </div>
        <div className="mt-10">
          <FeatureGrid items={a.features} columns={3} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="Why buy it"
            title="Benefits, in one line each."
            lead="What this add-on actually changes in your team's day."
          />
          <ul className="flex flex-col gap-3">
            {a.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-lg border border-primary-100 bg-primary-50 p-5"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <p className="text-body text-ink-700">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      {a.specs && a.specs.length > 0 && (
        <SectionBand tone="cream-alt">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <SectionHeader eyebrow="Specs" title="Technical at-a-glance" />
            <SpecTable rows={a.specs} />
          </div>
        </SectionBand>
      )}

      {a.faqs && a.faqs.length > 0 && (
        <SectionBand tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQs"
              title={`Questions about ${a.title}.`}
              align="center"
            />
            <div className="mt-8">
              <FaqAccordion items={a.faqs} />
            </div>
          </div>
        </SectionBand>
      )}

      {related.length > 0 && (
        <SectionBand tone="cream">
          <SectionHeader eyebrow="Related" title="Add-ons that pair well" />
          <div className="mt-8">
            <RelatedCards items={related} />
          </div>
        </SectionBand>
      )}

      <CtaBand
        title={`Try ${a.title} on your own Tally.`}
        sub="14-day trial, installed live with a Finquanta engineer. No payment up front."
        source="offerings"
        primaryLabel="Request trial"
      />
    </>
  );
}
