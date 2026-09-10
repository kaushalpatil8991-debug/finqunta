import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { RelatedCards } from "@/components/page/related-cards";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { CtaBand } from "@/components/page/cta-band";
import { toRelatedItems } from "@/lib/related";
import {
  productsHero,
  productsIntro,
  productsBullets,
  productsFaqs,
} from "@/content/pages/products";
import {
  productDetailBySlug,
  productSlugs,
} from "@/content/details/products";

const BASE = "/tally-erp-9-products";
const productCards = toRelatedItems(BASE, productDetailBySlug, productSlugs);

export const metadata: Metadata = {
  title: "Tally software — TallyPrime · Server · Auditor · TSS",
  description:
    "Buy and support the full TallyPrime product line from one partner. Finquanta sells at MRP, activates same day, and wraps it in training and support.",
  alternates: { canonical: "/tally-erp-9-products" },
};

export default function TallyProductsPage() {
  return (
    <>
      <PageHero
        eyebrow={productsHero.eyebrow}
        title={productsHero.title}
        sub={productsHero.sub}
        gradient={productsHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Product & Services" },
          { label: "Tally Software" },
        ]}
      />

      <SectionBand tone="cream">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="The line-up"
            title="Six editions, one partner."
          />
          <p className="text-body-lg text-ink-500">{productsIntro}</p>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          eyebrow="Editions we support"
          title="Pick the one that fits today — upgrade when you need more."
          align="center"
          lead="Tap any card for the full page with features, editions, specs, and FAQs."
        />
        <div className="mt-10">
          <RelatedCards items={productCards} />
        </div>
      </SectionBand>

      <SectionBand tone="cream-alt">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <SectionHeader
            eyebrow="What we add"
            title="Buying from Finquanta vs buying from the internet."
            lead="Same Tally product, same price. Difference is everything around it."
          />
          <ul className="grid grid-cols-1 gap-4">
            {productsBullets.map((b) => (
              <li
                key={b.title}
                className="flex gap-3 rounded-lg border border-cream-200 bg-white p-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-body font-semibold text-ink">{b.title}</p>
                  <p className="mt-1 text-body-sm text-ink-500">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="FAQs"
            title="Questions we get every week."
            align="center"
          />
          <div className="mt-8">
            <FaqAccordion items={productsFaqs} />
          </div>
        </div>
      </SectionBand>

      <CtaBand
        title="Get a Tally quote in under 24 hours."
        sub="Tell us your team size and stack; we send a line-item quote the same day."
        source="enquiry"
      />
    </>
  );
}
