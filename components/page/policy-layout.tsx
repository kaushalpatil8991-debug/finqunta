import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { Prose } from "@/components/page/prose";
import { CtaBand } from "@/components/page/cta-band";
import { cn } from "@/lib/utils";
import type { PolicyBlock, PolicyDoc } from "@/lib/schema";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * The document's class, used as the hero eyebrow. All six previously shared the
 * literal "Policy", which is redundant with the breadcrumb directly above it and
 * identical on every sibling — so the one line with room to differentiate the
 * documents was spent saying nothing. These are categories, not legal copy.
 */
const DOC_CLASS: Record<string, string> = {
  "privacy-policy": "Data & privacy",
  "terms-and-conditions": "Contract terms",
  "refund-policy": "Payments",
  "cancellation-policy": "Payments",
  "delivery-policy": "Fulfilment",
  "end-user-license-agreement": "Licensing",
};

/**
 * Shared layout for all six policy documents: hero, a sticky section jump list,
 * the document body, and the pre-footer CTA band.
 *
 * `PolicySection.body` is now a list of typed blocks rather than bare strings,
 * so a section can be a paragraph run, a list, a two-column matrix, or a
 * callout. Every existing section is still a paragraph run — the schema coerces
 * legacy strings — so this change adds capability without touching a word of
 * the legal text. Moving the refund / delivery / cancellation matrices onto
 * `type: "table"` is a content decision for whoever owns the wording.
 */
export function PolicyLayout({ doc }: { doc: PolicyDoc }) {
  const tocId = React.useId();

  return (
    <>
      <PageHero
        eyebrow={DOC_CLASS[doc.slug] ?? "Policy"}
        title={doc.title}
        sub={doc.summary}
        gradient="cream-gold"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Policies", href: "/policies" },
          { label: doc.title },
        ]}
      >
        <p className="text-body-sm text-ink-700">
          Last updated{" "}
          <time dateTime={doc.lastUpdated} className="font-semibold tabular-nums">
            {formatDate(doc.lastUpdated)}
          </time>
        </p>
      </PageHero>

      <SectionBand tone="cream">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1fr_2.5fr] lg:gap-14">
          <aside
            aria-labelledby={tocId}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p
              id={tocId}
              className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-primary"
            >
              On this page
            </p>
            {/* The numbers are rendered, not left to ::marker. Tailwind's
                preflight sets `list-style: none` on every ol, so the previous
                markup shipped an ordered list that displayed no numbers at
                all — measured `list-style-type: none` on the live page. */}
            <ol className="mt-4 flex flex-col border-l border-hairline-strong text-body-sm">
              {doc.sections.map((s, i) => (
                <li key={`sec-${i + 1}`}>
                  <a
                    href={`#sec-${i + 1}`}
                    className="flex gap-2.5 rounded-sm py-1.5 pl-4 text-ink-500 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span
                      aria-hidden
                      className="pt-px text-caption font-semibold tabular-nums text-ink-300"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
            <Button asChild variant="ghost" size="sm" className="mt-6">
              <Link href="/policies">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All policies
              </Link>
            </Button>
          </aside>

          <article className="rounded-lg border border-hairline bg-white p-6 sm:p-8 md:p-12">
            <Prose size="lg">
              <p className="mb-8 text-body text-ink-700 sm:mb-10 sm:text-body-lg">
                {doc.intro}
              </p>
              {doc.sections.map((section, i) => (
                <section key={`sec-${i + 1}`} className="scroll-mt-24" id={`sec-${i + 1}`}>
                  <h2>{section.heading}</h2>
                  {section.body.map((block, bi) => (
                    <PolicyBlockView key={bi} block={block} />
                  ))}
                </section>
              ))}
            </Prose>
          </article>
        </div>
      </SectionBand>

      <CtaBand
        eyebrow="Questions?"
        title="We read every policy question that comes in."
        sub="Email us and we will get back within two working days — often same day."
        source="enquiry"
        primaryLabel="Ask a policy question"
      />
    </>
  );
}

function PolicyBlockView({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      );
    }

    // S11 — the only pattern in the corpus that handles dense factual data.
    // Scrolls rather than reflowing on mobile: for a condition/consequence
    // matrix the comparison IS the content, so collapsing it into stacked
    // paragraphs would destroy the thing the reader came for.
    case "table":
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-body-sm">
            {block.caption && (
              <caption className="mb-3 text-left text-caption uppercase tracking-[0.08em] text-ink-500">
                {block.caption}
              </caption>
            )}
            <thead>
              <tr>
                {block.columns.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="border-b border-hairline-strong pb-2 pr-6 text-left text-caption font-semibold uppercase tracking-[0.08em] text-ink-500 last:pr-0"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  <th
                    scope="row"
                    className="border-b border-hairline py-3 pr-6 text-left align-top font-semibold text-ink"
                  >
                    {row[0]}
                  </th>
                  <td className="border-b border-hairline py-3 align-top text-ink-500">
                    {row[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // Legally load-bearing terms must not render as ordinary paragraphs. The
    // rule carries the emphasis, not colour alone — this survives forced-colors
    // mode and a black-and-white print, which a policy page will get.
    case "callout":
      return (
        <aside
          className={cn(
            "my-6 border-l-2 py-1 pl-4",
            block.tone === "warning"
              ? "border-accent-sand"
              : "border-primary"
          )}
        >
          {block.title && (
            <p className="!mb-1 !mt-0 text-body-sm font-semibold uppercase tracking-[0.06em] text-ink">
              {block.title}
            </p>
          )}
          <p className="!my-0 text-ink-700">{block.text}</p>
        </aside>
      );
  }
}
