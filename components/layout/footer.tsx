"use client";

import Link from "next/link";
import { useModal } from "@/components/modals/modal-context";
import { site } from "@/lib/site";

/**
 * 2026-10-30 redesign footer. Styles: `.fq-foot` in components/layout/chrome.css.
 *
 * Content follows home_page_content.md §10: link columns, the legal identity
 * block (Companies (Incorporation) Rules 2014, Rule 26) and the trademark line.
 * Lines whose facts are not confirmed — registered office, CIN, GSTIN, phone,
 * domain email, grievance officer — are not rendered at all. No "© 2018–",
 * no Gmail, no 11-digit phone.
 */
const COLUMNS = [
  {
    title: "Products",
    links: [
      { href: "/tally-erp-9-products/tallyprime", label: "TallyPrime" },
      { href: "/tally-erp-9-products/tallyprime-server", label: "TallyPrime Server" },
      { href: "/tally-erp-9-products/tally-software-services", label: "TSS" },
      { href: "/tally-erp-9-products/tally-virtual-user", label: "Tally Virtual User" },
      { href: "/tally-erp-9-products/auditors-edition", label: "Auditor's Edition" },
      { href: "/tallyprime-pricing", label: "Pricing" },
      { href: "/tallyprime-buy-vs-rent", label: "Buy or rent?" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/tally-services", label: "Setup & migration" },
      { href: "/tally-services/training", label: "Training" },
      { href: "/tally-services/amc-annual-support", label: "Support & AMC" },
      { href: "/tally-customization", label: "Customisation" },
      { href: "/tally-integration", label: "Integrations" },
      { href: "/tally-gst", label: "GST setup" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about-us", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/events", label: "Events" },
      { href: "/career", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms-and-conditions", label: "Terms & conditions" },
      { href: "/refund-policy", label: "Refund policy" },
      { href: "/cancellation-policy", label: "Cancellation policy" },
      { href: "/delivery-policy", label: "Delivery policy" },
      { href: "/policies", label: "All policies" },
    ],
  },
] as const;

export function Footer() {
  const { open } = useModal();
  return (
    <footer className="fq-foot" id="contact">
      <div className="fq-wrap">
        <div className="fq-foot-top">
          <div className="fq-foot-brand">
            <Link href="/" className="fq-mark" aria-label={`${site.shortName} home`}>
              <i aria-hidden="true" />
              {site.shortName}
            </Link>
            <p>{site.tagline}</p>
            <button type="button" className="fq-btn" onClick={() => open("talk")}>
              Book a 20-minute call
            </button>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="fq-foot-h">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="fq-legal">
          <strong>{site.name}</strong>
          {site.facts.cin || site.facts.gstin ? (
            <span>
              {site.facts.cin ? <span className="fq-legal-item">CIN: {site.facts.cin}</span> : null}
              {site.facts.gstin ? <span className="fq-legal-item">GSTIN: {site.facts.gstin}</span> : null}
            </span>
          ) : null}
          {site.confirmed.phone && site.confirmed.email ? (
            <span>
              <span className="fq-legal-item">Phone: <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></span>
              <span className="fq-legal-item">Email: <a href={`mailto:${site.email}`}>{site.email}</a></span>
            </span>
          ) : null}
          <span>
            Tally, TallyPrime and TSS are trademarks of Tally Solutions Pvt. Ltd. {site.name} is an
            independent Tally partner.
          </span>
          <span>© {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
