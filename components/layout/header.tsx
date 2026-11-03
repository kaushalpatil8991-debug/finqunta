"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/modals/modal-context";
import { site } from "@/lib/site";

/**
 * 2026-10-30 redesign — frosted lavender bar, nav centred in a glass pill,
 * one dark-purple action. Styles live in components/layout/chrome.css
 * (`.fq-hdr`), shared with the footer.
 *
 * The seven links are exactly the ones home_page_content.md §1 allows:
 * Products · Services · Pricing · How we work · About · Blog · Contact.
 * Testimonials, case studies, events, persona links and the mega-menu are
 * deliberately gone — they lead to invented content or to 404s.
 *
 * Below 1060px the nav collapses into a dropdown sheet opened by "Menu".
 */
const NAV = [
  { href: "/tally-erp-9-products", label: "Products" },
  { href: "/tally-services", label: "Services" },
  { href: "/tallyprime-pricing", label: "Pricing" },
  { href: "/#how", label: "How we work" },
  { href: "/about-us", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { open } = useModal();
  const pathname = usePathname();
  // The sheet remembers which route it was opened on, so navigating closes it
  // without an effect.
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const menu = openOn === pathname;
  const setMenu = (v: boolean | ((m: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(menu) : v) ? pathname : null);
  const navId = React.useId();

  // Escape closes the sheet.
  React.useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menu]);

  const isActive = (href: string) =>
    !href.includes("#") && href !== "/" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="fq-hdr">
      <div className="fq-wrap fq-hdr-row">
        <Link href="/" className="fq-mark" aria-label={`${site.shortName} home`}>
          <i aria-hidden="true" />
          {site.shortName}
        </Link>

        <button
          type="button"
          className="fq-menu-btn"
          aria-expanded={menu}
          aria-controls={navId}
          onClick={() => setMenu((m) => !m)}
        >
          {menu ? "Close" : "Menu"}
        </button>

        <nav
          id={navId}
          aria-label="Main"
          className={menu ? "fq-nav open" : "fq-nav"}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setMenu(false);
          }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="fq-hdr-right">
          {/* Click-to-call, once the 10-digit number is confirmed (lib/site.ts). */}
          {site.confirmed.phone ? (
            <a className="fq-hdr-phone" href={`tel:${site.phone.tel}`}>
              <span className="sr-only">Call </span>
              {site.phone.display}
            </a>
          ) : null}
          <button type="button" className="fq-btn fq-hdr-cta" onClick={() => open("talk")}>
            Book a call
          </button>
        </div>
      </div>
    </header>
  );
}
