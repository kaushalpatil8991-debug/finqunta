import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { RelatedCards } from "@/components/page/related-cards";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import { addonsHero, addonsPromise } from "@/content/pages/addons";
import {
  addonDetailBySlug,
  addonSlugs,
} from "@/content/details/addons";

const BASE = "/tally-erp-9-add-ons-modules";
const addonCards = toRelatedItems(BASE, addonDetailBySlug, addonSlugs);

export const metadata: Metadata = {
  title: "Tally add-on modules",
  description:
    "Standalone TDL modules — smart backups, file attachments, sheet magic, audit trail, bulk mailer, WhatsApp share, and more.",
  alternates: { canonical: "/tally-erp-9-add-ons-modules" },
};

export default function AddonsPage() {
  return (
    <>
      <PageHero
        eyebrow={addonsHero.eyebrow}
        title={addonsHero.title}
        sub={addonsHero.sub}
        gradient={addonsHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Add-On Modules" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow="Nine popular add-ons"
          title="Small installs that solve specific problems."
          align="center"
          lead="Tap any add-on for the full page with features, benefits, and specs."
        />
        <div className="mt-10">
          <RelatedCards items={addonCards} />
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl rounded-lg border border-primary-100 bg-primary-50 p-8 text-center">
          <p className="font-serif-italic italic text-primary">
            Pick what you need. Skip the rest.
          </p>
          <p className="mt-3 text-body-lg text-ink-700">{addonsPromise}</p>
        </div>
      </SectionBand>

      <CtaBand
        title="Need an add-on we do not list?"
        sub="Tell us the problem. We either already have a module for it, or we can scope a quick one — usually under two weeks."
        source="enquiry"
        primaryLabel="Ask for an add-on"
      />
    </>
  );
}
