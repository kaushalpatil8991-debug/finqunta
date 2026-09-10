import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Smartphone, Check } from "lucide-react";
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
import { toRelatedItems } from "@/lib/related";
import {
  mobileAppDetailBySlug,
  mobileAppSlugs,
} from "@/content/details/mobile-apps";

const BASE = "/tally-mobile-apps";

export function generateStaticParams() {
  return mobileAppSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = mobileAppDetailBySlug[slug];
  if (!m) return {};
  return {
    title: `${m.title} — Tally mobile app`,
    description: m.summary,
    alternates: { canonical: `${BASE}/${m.slug}` },
  };
}

export default async function MobileAppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = mobileAppDetailBySlug[slug];
  if (!m) notFound();

  const related = toRelatedItems(BASE, mobileAppDetailBySlug, m.relatedSlugs);

  const platformChips = m.platforms.map((p) => ({
    tone: (p === "ios" ? "sand" : "success") as Parameters<
      typeof Chip
    >[0]["tone"],
    label: p === "ios" ? "iOS 15+" : "Android 10+",
  }));

  return (
    <>
      <DetailHero
        eyebrow={m.hero.eyebrow}
        title={m.hero.title}
        sub={m.hero.sub}
        gradient={m.hero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Mobile Apps", href: BASE },
          { label: m.title },
        ]}
        aside={
          <DetailAside
            tagline={m.tagline}
            chips={[{ tone: "plum", label: "Live from Tally" }, ...platformChips]}
            bullets={[
              "Syncs every 10 minutes; on-demand refresh anytime",
              "Role-based — users see only their scope",
              "Works offline; re-syncs when connected",
            ]}
            source="offerings"
            ctaPrimaryLabel="Book a demo"
          />
        }
      />

      <SectionBand tone="cream">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="What it does"
            title={`Inside ${m.title}.`}
          />
          <span
            aria-hidden
            className="hidden h-14 w-14 items-center justify-center rounded-md bg-white text-primary shadow-[var(--shadow-card)] md:flex"
          >
            <Smartphone className="h-6 w-6" />
          </span>
        </div>
        <div className="mt-10">
          <FeatureGrid items={m.features} columns={3} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="Capabilities"
            title="How the app plays with your existing setup."
          />
          <ul className="flex flex-col gap-3">
            {m.capabilities.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-lg border border-cream-200 bg-cream-100 p-5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <p className="text-body text-ink-700">{c}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      {m.specs && m.specs.length > 0 && (
        <SectionBand tone="cream-alt">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <SectionHeader eyebrow="Specs" title="Technical at-a-glance" />
            <SpecTable rows={m.specs} />
          </div>
        </SectionBand>
      )}

      {m.faqs && m.faqs.length > 0 && (
        <SectionBand tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQs"
              title={`Questions about ${m.title}.`}
              align="center"
            />
            <div className="mt-8">
              <FaqAccordion items={m.faqs} />
            </div>
          </div>
        </SectionBand>
      )}

      {related.length > 0 && (
        <SectionBand tone="cream">
          <SectionHeader eyebrow="Related" title="Other mobile apps" />
          <div className="mt-8">
            <RelatedCards items={related} />
          </div>
        </SectionBand>
      )}

      <CtaBand
        title={`See ${m.title} on your own data.`}
        sub="30-minute demo on a sandbox Tally — with your own users and your own roles."
        source="offerings"
        primaryLabel="Book a demo"
      />
    </>
  );
}
