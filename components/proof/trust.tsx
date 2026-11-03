import { ArrowUpRight, BadgeCheck, Quote, Star } from "lucide-react";
import { proof, hasTrustContent } from "@/content/proof";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Trust & proof blocks. Every block renders only real, confirmed content from
 * content/proof.ts and lib/site.ts. With nothing filled in, production renders
 * nothing; `next dev` shows a dashed outline naming the file to edit.
 */

const isDev = process.env.NODE_ENV === "development";

export function ProofSlot({ what, where = "content/proof.ts", className }: { what: string; where?: string; className?: string }) {
  if (!isDev) return null;
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-dashed border-primary/40 bg-primary-50/60 p-5 text-body-sm text-ink-700",
        className
      )}
    >
      <p className="font-bold text-primary">Not shown on the live site yet</p>
      <p className="mt-1">
        {what} Add it in <code className="rounded bg-white/70 px-1.5 py-0.5 text-caption">{where}</code>.
      </p>
    </div>
  );
}

export function PartnerBadge({ className }: { className?: string }) {
  const { partnerCategory, partnerUrl } = site.facts;
  if (!partnerCategory) return <ProofSlot what="Tally partner category and verification link." where="lib/site.ts → facts" className={className} />;
  const body = (
    <>
      <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <span>
        <strong className="block text-ink">Tally {partnerCategory}</strong>
        {partnerUrl ? <span className="text-caption text-ink-500">Check it on Tally&apos;s partner locator</span> : null}
      </span>
      {partnerUrl ? <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-500" aria-hidden /> : null}
    </>
  );
  const cls = cn(
    "inline-flex items-center gap-3 rounded-lg bg-[var(--fq-card)] px-4 py-3 text-body-sm shadow-[var(--shadow-card)]",
    className
  );
  return partnerUrl ? (
    <a href={partnerUrl} target="_blank" rel="noopener noreferrer" className={cn(cls, "")}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function ReviewsBadge({ className }: { className?: string }) {
  const { rating, count, url } = proof.reviews;
  if (rating === null || url === null) return <ProofSlot what="Google review rating, count and link." className={className} />;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-lg bg-[var(--fq-card)] px-4 py-3 text-body-sm shadow-[var(--shadow-card)]",
        className
      )}
    >
      <Star className="h-5 w-5 shrink-0 fill-[var(--color-amber-ink)] text-amber-ink" aria-hidden />
      <span>
        <strong className="block text-ink tabular-nums">
          {rating.toFixed(1)} on Google{count !== null ? `, ${count} reviews` : ""}
        </strong>
        <span className="text-caption text-ink-500">Read the reviews</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-500" aria-hidden />
    </a>
  );
}

export function ClientsWall({ className }: { className?: string }) {
  if (proof.clients.length === 0) return <ProofSlot what="Client names or logos (with their permission)." className={className} />;
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {proof.clients.map((c) => (
        <li
          key={c.name}
          className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-lg bg-[var(--fq-card)] px-4 py-4 text-center"
        >
          {c.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.logo} alt={c.name} className="max-h-10 w-auto max-w-[140px] object-contain" />
          ) : (
            <span className="text-body font-bold text-ink">{c.name}</span>
          )}
          {c.sector ? <span className="text-caption text-ink-500">{c.sector}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export function TestimonialList({ className }: { className?: string }) {
  if (proof.testimonials.length === 0) return <ProofSlot what="Customer quotes (real, with permission)." className={className} />;
  return (
    <ul className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {proof.testimonials.map((t) => (
        <li
          key={t.name + t.quote.slice(0, 12)}
          className="flex h-full flex-col gap-4 rounded-lg bg-[var(--fq-card)] p-6 shadow-[var(--shadow-card)]"
        >
          <Quote className="h-6 w-6 text-primary" aria-hidden />
          <blockquote className="text-body text-ink-700">{t.quote}</blockquote>
          <figcaption className="mt-auto text-body-sm">
            <strong className="block text-ink">{t.name}</strong>
            <span className="text-ink-500">{[t.role, t.company].filter(Boolean).join(", ")}</span>
            {t.source ? <span className="block text-caption text-ink-500">{t.source}</span> : null}
          </figcaption>
        </li>
      ))}
    </ul>
  );
}

/**
 * The full proof section: partner badge + reviews, client wall, quotes.
 * Returns null in production when there is nothing real to show.
 */
export function TrustSection({ title = "Businesses that work with us", className }: { title?: string; className?: string }) {
  const any = hasTrustContent() || Boolean(site.facts.partnerCategory);
  if (!any && !isDev) return null;
  return (
    <div className={cn("grid gap-8", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-[20ch] text-h2 font-extrabold tracking-tight text-ink">{title}</h2>
        <div className="flex flex-wrap gap-3">
          <PartnerBadge />
          <ReviewsBadge />
        </div>
      </div>
      <ClientsWall />
      <TestimonialList />
    </div>
  );
}
