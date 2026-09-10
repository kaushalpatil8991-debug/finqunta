import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { SectionHeader } from "@/components/ui/section-header";
import { DetailHero } from "@/components/page/detail-hero";
import { DetailAside } from "@/components/page/detail-aside";
import { SectionBand } from "@/components/page/section-band";
import { FeatureGrid } from "@/components/page/feature-grid";
import { SpecTable } from "@/components/page/spec-table";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { productSchema, faqSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { toRelatedItems } from "@/lib/related";
import {
  productDetailBySlug,
  productSlugs,
} from "@/content/details/products";

const BASE = "/tally-erp-9-products";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productDetailBySlug[slug];
  if (!p) return {};
  return {
    title: `${p.title} — Tally product`,
    description: p.summary,
    alternates: { canonical: `${BASE}/${p.slug}` },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = productDetailBySlug[slug];
  if (!p) notFound();

  const related = toRelatedItems(BASE, productDetailBySlug, p.relatedSlugs);

  return (
    <>
      <JsonLd data={productSchema(p)} />
      {p.faqs && p.faqs.length > 0 && <JsonLd data={faqSchema(p.faqs)} />}
      <DetailHero
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        sub={p.hero.sub}
        gradient={p.hero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Tally Software", href: BASE },
          { label: p.title },
        ]}
        aside={
          <DetailAside
            tagline={p.tagline}
            chips={[
              { tone: "plum", label: "Tally Partner" },
              { tone: "sand", label: "Same-day activation" },
            ]}
            bullets={[
              "Sourced directly from Tally Solutions at MRP",
              "Activation + training included",
              "Active-cover clients get free upgrades",
            ]}
            source="offerings"
            ctaPrimaryLabel="Get a quote"
          />
        }
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="What you get"
          title={`Inside ${p.title}.`}
        />
        <div className="mt-10">
          <FeatureGrid items={p.features} columns={3} />
        </div>
      </SectionBand>

      {p.editions && p.editions.length > 0 && (
        <SectionBand tone="white">
          <SectionHeader
            eyebrow="Editions"
            title={`${p.editions.length} editions of ${p.title}.`}
            align="center"
            lead="Start where you are, upgrade in-place when you grow."
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {p.editions.map((e) => (
              <li
                key={e.id}
                className={cn(
                  "flex flex-col rounded-lg border border-cream-200 bg-white p-8 shadow-[var(--shadow-card)]"
                )}
              >
                <h3 className="text-h3 font-semibold text-ink">{e.name}</h3>
                <p className="mt-2 text-body-sm text-ink-500">{e.blurb}</p>
                <p className="mt-6 text-h2 font-bold text-ink tabular-nums-strict">
                  {e.priceNote}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {e.includes.map((i) => (
                    <li key={i} className="flex gap-2.5 text-body-sm text-ink-700">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary"
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </SectionBand>
      )}

      <SectionBand tone="cream-alt">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <SectionHeader
            eyebrow="At a glance"
            title="The essentials, in one table."
            lead="Technical facts for evaluators; the shape of the product without sales narrative."
          />
          <SpecTable rows={p.specs} />
        </div>
      </SectionBand>

      {p.faqs && p.faqs.length > 0 && (
        <SectionBand tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQs"
              title={`Questions about ${p.title}.`}
              align="center"
            />
            <div className="mt-8">
              <FaqAccordion items={p.faqs} />
            </div>
          </div>
        </SectionBand>
      )}

      {related.length > 0 && (
        <SectionBand tone="cream">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="Related" title="You might also want" />
            <Chip tone="cream">In the Tally product line</Chip>
          </div>
          <div className="mt-8">
            <RelatedCards items={related} />
          </div>
        </SectionBand>
      )}

      <CtaBand
        title={`Ready to take ${p.title} for a drive?`}
        sub="Free demo with your own sandbox data, under 30 minutes. No obligation."
        source="offerings"
        primaryLabel="Book a demo"
      />
    </>
  );
}
