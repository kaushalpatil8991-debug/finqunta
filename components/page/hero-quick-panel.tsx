"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/modals/modal-context";
import { site } from "@/lib/site";

/**
 * 2026-10-30 redesign — the right-hand column of every inner-page hero.
 *
 * The same idea as the home page's first screen: whoever lands on any page
 * sees, without scrolling, how to book a call and the four things most
 * visitors come for. It fills the empty right half of wide heroes, and on
 * phones it stacks under the title. The link to the page you are already on
 * is left out. Styles: `.fq-quick` in components/layout/chrome.css.
 */
const SHORTCUTS = [
  { href: "/tallyprime-pricing", title: "Buy TallyPrime", line: "from ₹22,500 + GST", price: true },
  { href: "/tally-services", title: "Setup & migration", line: "from Tally.ERP 9 or Excel" },
  { href: "/tally-gst", title: "GST & e-invoice", line: "set up properly, once" },
  { href: "/tally-services/amc-annual-support", title: "Support & AMC", line: "phone, remote or on-site" },
  { href: "/tally-customization", title: "Customisation", line: "invoices and reports your way" },
] as const;

export function HeroQuickPanel() {
  const { open } = useModal();
  const pathname = usePathname();
  const links = SHORTCUTS.filter((s) => s.href !== pathname).slice(0, 4);

  return (
    <aside className="fq-quick" aria-label="Quick help">
      <p className="fq-quick-k">Talk to a Tally expert</p>
      <p className="fq-quick-h">One Mumbai team for licences, setup, GST and support.</p>
      <div className="fq-quick-actions">
        <button type="button" className="fq-btn" onClick={() => open("talk")}>
          Book a 20-minute call
        </button>
        {site.confirmed.phone ? (
          <a className="fq-quick-phone" href={`tel:${site.phone.tel}`}>
            <span className="sr-only">Call </span>
            {site.phone.display}
          </a>
        ) : null}
      </div>
      <ul className="fq-quick-list">
        {links.map((s) => (
          <li key={s.href}>
            <Link href={s.href}>
              <strong>{s.title}</strong>
              <span>
                {"price" in s ? (
                  <>
                    from <b>₹22,500</b> + GST
                  </>
                ) : (
                  s.line
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
