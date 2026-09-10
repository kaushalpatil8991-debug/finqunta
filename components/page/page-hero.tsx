import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { HeroGradient } from "@/lib/schema";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  gradient?: HeroGradient;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}

const gradientClass: Record<HeroGradient, string> = {
  plum: "gradient-plum",
  mist: "gradient-mist",
  sand: "gradient-sand",
  violet: "gradient-violet",
  "cream-gold": "gradient-cream-gold",
};

/**
 * S27 — inner-page hero band: eyebrow → H1 → sub, on a hard three-colour
 * ground. No gradient, no glass, no blur, no decorative motif.
 *
 * WHY THE GROUND CHANGED. The `gradient` prop offers five washes, but an audit
 * of all 18 call sites found 17 of them on the same plum one (16 by falling
 * through to the old default, 1 explicit). Every inner page on the site opened
 * identically, so the wash was carrying no information — it was just the thing
 * that happened to be the default. The default is now `flat`, which paints the
 * sanctioned band tint (--color-cream-100) and lets the page's own content do
 * the differentiating.
 *
 * The prop still accepts all five gradients, so any route that wants one back
 * says so explicitly — the capability is unchanged, only the default moved.
 *
 * The decorative HeroArc went with it: three white rings at 25–55% opacity
 * read on a saturated wash, but on the cream band they sit at roughly 1.1:1
 * and are invisible, and S27 rules out the motif regardless.
 *
 * Only 1 of the 18 call sites passes `children`, so 17 inner pages currently
 * open with no call to action. That is route work, not component work, but it
 * is the most valuable thing to fix on this component's call sites.
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  gradient,
  crumbs,
  children,
  className,
}: PageHeroProps) {
  // Per-instance id: the literal "page-hero-heading" meant any page rendering
  // two heroes emitted duplicate ids and aimed both aria-labelledby references
  // at the first one.
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "relative overflow-hidden border-b border-hairline",
        gradient ? gradientClass[gradient] : "bg-cream-100",
        className
      )}
    >
      {crumbs && crumbs.length > 0 && (
        <JsonLd data={breadcrumbSchema(crumbs)} />
      )}
      <div className="relative mx-auto max-w-[1280px] px-gutter py-12 sm:px-gutter-sm sm:py-16 md:px-gutter-md md:py-20 lg:px-gutter-lg lg:py-28">
        {crumbs && crumbs.length > 0 && (
          <Breadcrumbs items={crumbs} className="mb-5 sm:mb-6" />
        )}
        {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
        {/* S19: Lora roman for the human sentence. */}
        <h1
          id={headingId}
          className="mt-3 max-w-4xl text-balance font-serif text-h1-mob font-semibold leading-tight tracking-tight text-ink sm:text-display-mob md:text-display"
        >
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-body text-ink-500 sm:mt-5 sm:text-body-lg">
            {sub}
          </p>
        )}
        {children && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-body-sm text-ink-500", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded-sm font-medium text-ink-700 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    isLast ? "font-semibold text-ink" : "text-ink-500"
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-ink-300" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
