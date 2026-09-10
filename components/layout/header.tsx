"use client";

import { CompoundCta } from "@/components/ui/compound-cta";
import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { PersonaRouter } from "./PersonaRouter";
import { headerCtas } from "@/content/navigation";
import { useModal } from "@/components/modals/modal-context";
import { cn } from "@/lib/utils";

/**
 * S35 — chrome as discrete objects on ONE bar; state is inversion, never tint.
 * See FQ/design-to-section-map.md §3.0 "Sticky header" and build order #5, and
 * `.hdr` / `.nav` / `.right` in prototype/index.html.
 *
 * Four things changed, all of them laws rather than preferences:
 *
 * 1. THE BAR HAS A REAL GROUND. It was defined only by `backdrop-blur` over a
 *    transparent border, so at scroll 0 on cream there was no bar — three
 *    container-less objects floated on the page. It is now `cream/92` + an
 *    ink/10 hairline at every scroll position, which also retires the
 *    scroll-condense state (h-16 → h-14): the prototype's bar is one fixed
 *    68px object, and `scroll-padding-top: 80px` in globals.css still clears it.
 *
 * 2. THE NAV IS AN OPAQUE PILL CONTAINER — white ground, hairline, 4px pad —
 *    and the active item INVERTS to solid ink instead of taking a `primary-50`
 *    wash plus a 2px inset underline. See NAV_ITEM below.
 *
 * 3. TWO FIXED OBJECTS ON THE RIGHT, not a 560/1380/1480 reveal ladder: the
 *    persona pill and one compound `Talk to Expert`. `Buy` and `Download` are
 *    deliberately not rendered here — they move into the mega-menu's featured
 *    cell — which is why `headerCtas` is filtered rather than mapped. The
 *    content file is unchanged; the header just stops consuming two of its rows.
 *
 * 4. The `.fq-sheen` animation loop and its plum drop-shadow are deleted.
 *
 * DO NOT REMOVE `backdrop-blur-[10px]`. It is load-bearing beyond the visual:
 * a backdrop-filter makes this header the containing block for the mega-menu's
 * `position: fixed` viewport, which is how that panel resolves `top-full` to
 * the header's own bottom edge with no JS (see components/ui/navigation-menu.tsx).
 */

/**
 * The S35 inverted-active law, applied from the container that owns it.
 *
 * The durable home for these rules is `navigationMenuTriggerStyle` in
 * components/ui/navigation-menu.tsx, which still ships `hover:bg-primary-50`
 * and `shadow-[inset_0_-2px_0_…]`; that file belongs to another owner, so the
 * law is enforced here and one change retires the wash + underline everywhere
 * the nav appears.
 *
 * The child chain is the Radix DOM — Root `<nav>` ▸ List's relative `<div>` ▸
 * `<ul>` ▸ `<li>` ▸ trigger/link — and it is a child chain rather than a
 * descendant selector on purpose: the mega panel's own links render inside the
 * viewport (`nav ▸ div.fixed ▸ …`) and must keep their own hover treatment.
 */
const NAV_ITEM = [
  // Pills inside a pill. S24: pills are tags and containers, never submits.
  "[&>nav>div>ul>li>:is(a,button)]:h-9",
  "[&>nav>div>ul>li>:is(a,button)]:rounded-pill",
  "[&>nav>div>ul>li>:is(a,button)]:px-[15px]",
  // Hover is a colour step — no wash, no underline. Actives are excluded so a
  // hovered active item stays inverted.
  "[&>nav>div>ul>li>:is(a,button):not([data-state=open]):not([data-active]):not([aria-current=page]):hover]:bg-transparent",
  "[&>nav>div>ul>li>:is(a,button):not([data-state=open]):not([data-active]):not([aria-current=page]):hover]:text-ink",
  "[&>nav>div>ul>li>:is(a,button):not([data-state=open]):not([data-active]):not([aria-current=page]):hover]:shadow-none",
  // Open / active inverts to solid ink. cream-200 on ink is 12.18:1; ink-300
  // and ink-500 on ink are forbidden (2.41:1).
  "[&>nav>div>ul>li>:is([data-state=open],[data-active],[aria-current=page])]:bg-ink",
  "[&>nav>div>ul>li>:is([data-state=open],[data-active],[aria-current=page])]:text-cream-200",
  "[&>nav>div>ul>li>:is([data-state=open],[data-active],[aria-current=page])]:shadow-none",
].join(" ");

/**
 * The header keeps exactly one CTA, taken from the same `headerCtas` rows the
 * old ladder mapped over. `Buy` and `Download` stay in the content file for the
 * mega-menu featured cell to consume.
 */
const talkCta = headerCtas.find((cta) => cta.opensModal === "talk");

export function Header() {
  const { open } = useModal();

  return (
    <header className="sticky top-0 z-sticky w-full border-b border-hairline bg-cream/92 backdrop-blur-[10px] backdrop-saturate-150">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-5 px-gutter md:px-gutter-md lg:px-gutter-lg">
        <Logo className="shrink-0" />

        {/* S35: the nav is an opaque pill CONTAINER, not a row of bare links. */}
        <div
          className={cn(
            "ml-3.5 hidden min-w-0 items-center rounded-pill border border-hairline bg-white p-1 min-[1180px]:flex",
            NAV_ITEM
          )}
        >
          <MegaMenu />
        </div>

        {/* Two fixed objects, one breakpoint: below 1180px both hand over to
            the sheet trigger, which carries the same links plus Buy/Download. */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <PersonaRouter />

          {talkCta ? (
            <CompoundCta
              className="hidden min-[1180px]:inline-flex"
              onClick={() => open("talk")}
            >
              {talkCta.label}
            </CompoundCta>
          ) : null}

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
