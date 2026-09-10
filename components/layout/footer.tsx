import Link from "next/link";
import { site } from "@/lib/site";
import { footerColumns } from "@/content/navigation";
import { ComingSoonTooltip } from "@/components/ui/coming-soon-tooltip";
import { PlaceholderFlag } from "@/components/ui/placeholder-flag";
import { TagPill } from "@/components/ui/tag-pill";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/schema";

/**
 * Footer — S05 closing wordmark band + S18 label-chip columns.
 * See FQ/design-to-section-map.md §3.0 (Footer row) and §6 build order item 1,
 * and `.ftr` / `.wordmark` / `.fgrid` / `.fbot` in prototype/index.html.
 *
 * THE CONTRAST FIX, which is the reason this file was first in the build order:
 * every link here was ink-500 (#6E5485) on `bg-ink` (#2E1B45) = 2.41:1,
 * hovering to plum = 2.63:1 — a WCAG AA failure on 23 links on every page of
 * the site. All link text is now cream-200 (12.18:1 on ink), hovering to sand.
 * The muted descriptor colour is on-ink-muted (7.1:1). ink-300, ink-500 and
 * plum are forbidden as text colours on this surface. The global focus ring is
 * plum, which measures 2.63:1 against ink and fails WCAG 1.4.11, so every
 * focusable element here overrides it to sand.
 *
 * S05 ships with no legal, contact or utility links and is not shippable on its
 * own, so it supplies the wordmark band *above* the link grid. The four-column
 * grid stays: the seven statutory policy links are non-negotiable for Indian
 * payment-gateway onboarding.
 *
 * Placeholders: `site.address` has no street line or PIN code and the content
 * layer carries no GSTIN at all. Rather than print a plausible-looking fake,
 * both are marked with PlaceholderFlag. `site.social` is still three nulls, so
 * there is nothing to render — populate it in lib/site.ts or drop the concept.
 */

const CONTAINER =
  "mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg";

/**
 * The one link treatment on this surface. `block` + 5px padding gives a 31px
 * target, clearing the 24px minimum of WCAG 2.5.8.
 */
const FOOTER_LINK =
  "block py-[5px] text-body-sm text-cream-200 transition-colors " +
  "hover:text-accent-sand focus-visible:outline-accent-sand";

/** Values lib/site.ts uses to mean "not supplied yet". */
const UNSET = new Set(["", "-", "—", "–", "TBD", "tbd"]);
const isUnset = (value: string) => UNSET.has(value.trim());

const STREET_TITLE =
  "Placeholder — the registered street address and PIN code have not been " +
  "supplied. This is not a verified postal address.";

const GSTIN_TITLE =
  "Placeholder — no GSTIN exists in the site content. A real GSTIN is " +
  "required before payment-gateway onboarding; do not read this as proof of " +
  "registration.";

/** S18 — the outlined label chip that heads each column. */
function ColumnHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-3.5">
      <span className="inline-block rounded-pill border border-hairline-on-ink px-[11px] py-1 text-[10.5px] font-bold uppercase tracking-[0.09em] text-on-ink-muted">
        {children}
      </span>
    </h2>
  );
}

function LinkList({ items }: { items: NavLink[] }) {
  return (
    <ul className="flex flex-col gap-px">
      {items.map((item) => {
        const content = (
          <Link
            href={item.href}
            className={cn(
              FOOTER_LINK,
              // Was ink-300 (2.41:1). on-ink-muted is 7.1:1 and still
              // reads as demoted against the cream-200 of a live link.
              item.comingSoon && "text-on-ink-muted"
            )}
          >
            {item.label}
          </Link>
        );
        return (
          <li key={item.label}>
            {item.comingSoon ? (
              <ComingSoonTooltip
                label={`${item.label} page coming soon`}
                withDot={false}
              >
                <span className="inline-block cursor-help">{content}</span>
              </ComingSoonTooltip>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const streetMissing =
    isUnset(site.address.line1) || isUnset(site.address.pincode);

  return (
    <footer className="mt-16 bg-ink text-on-ink-muted">
      <div className={cn(CONTAINER, "pb-10")}>
        {/* ── S05 — the closing signature ─────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-7 border-b border-hairline-on-ink pt-14 pb-11">
          <p className="font-serif text-[clamp(3rem,11vw,8rem)] leading-[0.86] tracking-[-0.035em] text-cream-200">
            {site.shortName}
          </p>
          {/* 14px, so this stays sans: S19 keeps serif at 16px and above. */}
          <p className="mb-2 max-w-[34ch] text-body-sm text-on-ink-muted">
            {site.tagline}
          </p>
        </div>

        {/* ── S18 — four columns under label chips ────────────────────── */}
        <div className="grid grid-cols-1 gap-7 pt-11 pb-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[34px]">
          <section aria-labelledby="footer-company">
            <ColumnHeading id="footer-company">Company</ColumnHeading>
            <LinkList items={footerColumns.company} />
          </section>

          <section aria-labelledby="footer-quick-links">
            <ColumnHeading id="footer-quick-links">Quick Links</ColumnHeading>
            <LinkList items={footerColumns.quickLinks} />
          </section>

          <section aria-labelledby="footer-policy">
            <ColumnHeading id="footer-policy">Policy</ColumnHeading>
            <LinkList items={footerColumns.policy} />
          </section>

          <section aria-labelledby="footer-contact">
            <ColumnHeading id="footer-contact">Contact</ColumnHeading>
            <address className="not-italic">
              <ul className="flex flex-col gap-px">
                <li>
                  <a href={`tel:${site.phone.tel}`} className={FOOTER_LINK}>
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className={cn(FOOTER_LINK, "break-words")}
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
              <p className="mt-3 text-body-sm text-on-ink-muted">
                {streetMissing ? null : (
                  <>
                    {site.address.line1}
                    <br />
                  </>
                )}
                {site.address.city}, {site.address.state},{" "}
                {site.address.country}
                {streetMissing ? (
                  <>
                    {" "}
                    &middot; street address{" "}
                    <PlaceholderFlag title={STREET_TITLE}>
                      to be supplied
                    </PlaceholderFlag>
                  </>
                ) : (
                  <> {site.address.pincode}</>
                )}
              </p>
            </address>
            {/* S26 — one composite pill replaces the three chips that stood
                here, including the "Certifications coming" placeholder the
                map requires removing. */}
            <TagPill
              className="mt-4"
              left={site.partner.type}
              right={`Since ${site.founded}`}
            />
          </section>
        </div>

        {/* ── Statutory foot ──────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-hairline-on-ink pt-6 text-[13px]">
          <p className="max-w-[52ch] leading-[1.55] text-on-ink-muted">
            &copy; {site.founded}&ndash;{year} {site.name}. All rights
            reserved. &middot; GSTIN{" "}
            <PlaceholderFlag title={GSTIN_TITLE}>to be supplied</PlaceholderFlag>
          </p>
          <p className="sm:ml-auto">
            <Link
              href="/privacy-policy"
              className="text-cream-200 transition-colors hover:text-accent-sand focus-visible:outline-accent-sand"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
