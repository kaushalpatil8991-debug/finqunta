import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { CtaBand } from "@/components/page/cta-band";
import { policies, policiesHero } from "@/content/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Finquanta's privacy, terms, refund, delivery, cancellation, and EULA documents — in plain English.",
  alternates: { canonical: "/policies" },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PoliciesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow={policiesHero.eyebrow}
        title={policiesHero.title}
        sub={policiesHero.sub}
        gradient={policiesHero.gradient}
        crumbs={[{ label: "Home", href: "/" }, { label: "Policies" }]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow={`${policies.length} documents`}
          title="Everything you might want to read before signing."
          align="center"
        />
        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {policies.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="group flex h-full flex-col rounded-lg border border-cream-200 bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <p className="text-caption text-ink-500">
                  Updated {formatDate(p.lastUpdated)}
                </p>
                <h3 className="mt-2 text-h4 font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-body-sm text-ink-500">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-body-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                  Read in full
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionBand>

      <CtaBand
        title="Cannot find what you are looking for?"
        sub="If you need any policy document attached to a quote or invoice, ask — we email them with every engagement."
        source="enquiry"
        primaryLabel="Ask for a policy doc"
      />
    </>
  );
}
