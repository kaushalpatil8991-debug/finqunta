import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  mobileAppsHero,
  mobileAppsCapabilities,
} from "@/content/pages/mobile-apps";
import {
  mobileAppDetailBySlug,
  mobileAppSlugs,
} from "@/content/details/mobile-apps";

const BASE = "/tally-mobile-apps";
const appCards = toRelatedItems(BASE, mobileAppDetailBySlug, mobileAppSlugs);

export const metadata: Metadata = {
  title: "Tally mobile apps — dashboards, approvals, orders",
  description:
    "Four companion mobile apps for TallyPrime — business dashboard, customer profiling, transaction approvals, and sales order booking.",
  alternates: { canonical: "/tally-mobile-apps" },
};

export default function TallyMobileAppsPage() {
  return (
    <>
      <PageHero
        eyebrow={mobileAppsHero.eyebrow}
        title={mobileAppsHero.title}
        sub={mobileAppsHero.sub}
        gradient={mobileAppsHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Mobile Apps" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Four apps"
          title="Built to mirror how your team actually works away from the desk."
          align="center"
          lead="Tap any app for the detail page with features, capabilities, and specs."
        />
        <div className="mt-10">
          <RelatedCards items={appCards} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="How they connect"
          title="Real-time, role-aware, and offline-tolerant."
        />
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {mobileAppsCapabilities.map((cap) => (
            <li
              key={cap.title}
              className="flex gap-3 rounded-lg border border-cream-200 bg-cream-100 p-5"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div>
                <p className="text-body font-semibold text-ink">{cap.title}</p>
                <p className="mt-1 text-body-sm text-ink-500">{cap.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionBand>

      <CtaBand
        title="See your Tally data on your phone by next week."
        sub="Demo uses your actual sandbox data — you see exactly what your team will see before you commit."
        source="enquiry"
        primaryLabel="Book a mobile demo"
      />
    </>
  );
}
