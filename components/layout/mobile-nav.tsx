"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Phone, Search, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CompoundCta } from "@/components/ui/compound-cta";
import { TagPill } from "@/components/ui/tag-pill";
import { megaNav, headerCtas } from "@/content/navigation";
import { useModal } from "@/components/modals/modal-context";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/schema";

/**
 * Mobile navigation sheet — S35 rows + S13 chips + S01 terminating pill.
 * See `.sheet` / `.srow` / `.chiprow` / `.srch` in prototype/index.html and the
 * "Mobile nav sheet" row of FQ/design-to-section-map.md §3.0.
 *
 * The four things this fixes, in the order the map ranks them:
 *
 *  1. SEARCH. 30+ destinations with no search is the failure; the styling was
 *     never the problem. The index below is built from the same nav content, so
 *     it cannot drift from the rows.
 *  2. CHIPS SCOPE THE SUBTREE, NOT THE TOP LEVEL. A chip row across the top
 *     level would hide Buy and Download, which are reachable nowhere else on
 *     mobile. So the six top-level destinations stay as persistent rows and the
 *     chips live *inside* the 25-link Product & Services disclosure, where the
 *     thing they filter is visible.
 *  3. TOUCH TARGETS. Every row is >=48px (they were 33px); the two satellite
 *     icon buttons are the sanctioned 44px `size="iconRound"`.
 *  4. FIVE BUTTONS IN THREE ROWS -> one compound CTA + two circular icons.
 *     Buy and Download stop being buttons and become rows, which is what they
 *     always were.
 *
 * Deleted, both dead: the `comingSoon` sand-dot styling (zero nav items carry
 * the flag) and the `navigate()` early-return that suppressed navigation for
 * them.
 */

type ModalKey = NonNullable<NavLink["opensModal"]>;

interface RowLink {
  label: string;
  href: string;
  external?: boolean;
  opensModal?: ModalKey;
  /** Breadcrumb, shown under the label in search results only. */
  section?: string;
}

/** Chip that clears the Product & Services filter. */
const ALL_CHIP = "All";

/**
 * Every destination the sheet can reach, flattened once at module scope for
 * search. Derived from `megaNav` + `headerCtas` — no separate list to maintain.
 */
const SEARCH_INDEX: RowLink[] = [
  ...megaNav.flatMap<RowLink>((item) => {
    if (item.groups) {
      return item.groups.flatMap((group) =>
        group.children.map((child) => ({
          label: child.label,
          href: child.href,
          external: child.external,
          opensModal: child.opensModal,
          section: `${item.label} · ${group.label}`,
        }))
      );
    }
    if (item.children) {
      return item.children.map((child) => ({
        label: child.label,
        href: child.href,
        external: child.external,
        opensModal: child.opensModal,
        section: item.label,
      }));
    }
    return item.href
      ? [{ label: item.label, href: item.href, opensModal: item.opensModal }]
      : [];
  }),
  ...headerCtas
    .filter((cta) => !cta.opensModal)
    .map<RowLink>((cta) => ({
      label: cta.label,
      href: cta.href,
      external: cta.external,
    })),
];

/* ── S35 row: 48px minimum, a hairline is the entire chrome ─────────────── */
const ROW_BASE = [
  "flex min-h-12 w-full items-center gap-3 border-b border-hairline",
  "px-1 py-2 text-left text-[15px] font-semibold text-ink",
  "transition-colors hover:text-primary",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
].join(" ");

/** The inverted active state — solid ink, never a tint. */
const ROW_ACTIVE =
  "rounded-md border-transparent bg-ink px-3 text-cream-200 hover:text-cream-200";

const ROW_NESTED = "text-[14.5px] font-medium text-ink-700";

interface NavRowProps {
  link: RowLink;
  active: boolean;
  /** Right-aligned count / descriptor. */
  qualifier?: string;
  /** Second line under the label (search results). */
  sub?: string;
  nested?: boolean;
  onNavigate: () => void;
  onModal: (modal: ModalKey) => void;
}

function NavRow({
  link,
  active,
  qualifier,
  sub,
  nested,
  onNavigate,
  onModal,
}: NavRowProps) {
  const className = cn(ROW_BASE, nested && ROW_NESTED, active && ROW_ACTIVE);

  const body = (
    <>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{link.label}</span>
        {sub ? (
          <span
            className={cn(
              "truncate text-[11.5px] font-medium",
              active ? "text-on-ink-muted" : "text-ink-500"
            )}
          >
            {sub}
          </span>
        ) : null}
      </span>
      {qualifier ? (
        <span
          className={cn(
            "shrink-0 text-[12px] font-medium",
            active ? "text-on-ink-muted" : "text-ink-500"
          )}
        >
          {qualifier}
        </span>
      ) : null}
    </>
  );

  const modal = link.opensModal;
  if (modal) {
    return (
      <button type="button" className={className} onClick={() => onModal(modal)}>
        {body}
      </button>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
        onClick={onNavigate}
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={className}
      onClick={onNavigate}
    >
      {body}
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [chip, setChip] = React.useState(ALL_CHIP);
  const [expanded, setExpanded] = React.useState("");
  const { open: openModal } = useModal();
  const pathname = usePathname();
  const searchId = React.useId();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setChip(ALL_CHIP);
      setExpanded("");
    }
  };

  const close = React.useCallback(() => setOpen(false), []);

  const handleModal = React.useCallback(
    (modal: ModalKey) => {
      setOpen(false);
      openModal(modal);
    },
    [openModal]
  );

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (link) =>
        link.label.toLowerCase().includes(q) ||
        (link.section?.toLowerCase().includes(q) ?? false)
    );
  }, [query]);

  const searching = query.trim().length > 0;
  const isActive = (href: string) => !href.startsWith("#") && pathname === href;

  const talkCta = headerCtas.find((cta) => cta.opensModal);
  const talkModal = talkCta?.opensModal;
  const linkCtas = headerCtas.filter((cta) => !cta.opensModal);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-hairline-strong bg-white text-ink transition-colors hover:border-primary hover:text-primary min-[1180px]:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        hideClose
        className="flex w-full max-w-[400px] flex-col gap-0 rounded-l-sheet p-0 shadow-float"
      >
        {/* Header — the credential pill from the utility bar, duplicated here
            so the proof reaches phones (map §3.0, Utility bar row). */}
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-[18px]">
          <SheetTitle className="sr-only">Finquanta navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Search the site, browse every section, or start a conversation.
          </SheetDescription>
          <TagPill left={site.partner.type} right={`Since ${site.founded}`} />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="iconRound"
              aria-label="Close menu"
              className="ml-auto border border-hairline-strong text-ink hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" aria-hidden />
            </Button>
          </SheetClose>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-6 pt-4">
          {/* Search — the map's first fix. Filters the same nav content. */}
          <div className="flex items-center gap-2.5 rounded-pill border border-hairline bg-cream-100 px-4 py-3 text-ink-500 focus-within:border-primary">
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <label htmlFor={searchId} className="sr-only">
              Search the site
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 30+ pages"
              autoComplete="off"
              className="min-w-0 flex-1 border-0 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-ink-500 [&::-webkit-search-cancel-button]:hidden"
            />
            {searching ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-pill text-ink-500 transition-colors hover:text-primary"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <p aria-live="polite" className="sr-only">
            {searching
              ? `${results.length} ${
                  results.length === 1 ? "page matches" : "pages match"
                } ${query.trim()}`
              : ""}
          </p>

          {searching ? (
            results.length > 0 ? (
              <nav aria-label="Search results" className="flex flex-col">
                {results.map((link) => (
                  <NavRow
                    key={`${link.section ?? "top"}-${link.label}`}
                    link={link}
                    sub={link.section}
                    active={isActive(link.href)}
                    onNavigate={close}
                    onModal={handleModal}
                  />
                ))}
              </nav>
            ) : (
              <p className="py-6 text-body-sm text-ink-500">
                No page matches{" "}
                <span className="font-semibold text-ink">{query.trim()}</span>.
                Try a product name, or clear the search to browse.
              </p>
            )
          ) : (
            <nav aria-label="Main">
              <Accordion
                type="single"
                collapsible
                value={expanded}
                onValueChange={setExpanded}
                className="w-full"
              >
                {megaNav.map((item, i) => {
                  const groups = item.groups;
                  const children = item.children;
                  const subtree = groups
                    ? groups.flatMap((group) => group.children)
                    : children ?? [];

                  // Direct destination — a plain 48px row.
                  if (subtree.length === 0) {
                    return item.href ? (
                      <NavRow
                        key={item.label}
                        link={{
                          label: item.label,
                          href: item.href,
                          opensModal: item.opensModal,
                        }}
                        active={isActive(item.href)}
                        onNavigate={close}
                        onModal={handleModal}
                      />
                    ) : null;
                  }

                  const visibleGroups = groups
                    ? groups.filter(
                        (group) => chip === ALL_CHIP || group.label === chip
                      )
                    : [];

                  // Top-level destination that owns a subtree. The row itself
                  // persists; the subtree is a disclosure so 25 links never
                  // push Buy and Download below the fold.
                  return (
                    <AccordionItem
                      key={item.label}
                      value={`item-${i}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="min-h-12 border-b border-hairline px-1 py-2 text-[15px] text-ink hover:text-primary">
                        <span className="flex-1 text-left">{item.label}</span>
                        <span className="shrink-0 text-[12px] font-medium text-ink-500">
                          {subtree.length} pages
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-3 pb-4 pt-3">
                        {/* S13 chips — scoped to this subtree, and only this
                            subtree. Never across the top level. */}
                        {groups ? (
                          <div
                            role="group"
                            aria-label={`Filter ${item.label} links`}
                            className="flex gap-[7px] overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                          >
                            {[ALL_CHIP, ...groups.map((g) => g.label)].map(
                              (label) => {
                                const pressed = chip === label;
                                return (
                                  <button
                                    key={label}
                                    type="button"
                                    aria-pressed={pressed}
                                    onClick={() => setChip(label)}
                                    className={cn(
                                      "flex min-h-9 flex-none items-center rounded-pill border px-[14px]",
                                      "text-[12.5px] font-semibold transition-colors",
                                      pressed
                                        ? "border-transparent bg-ink text-cream-200"
                                        : "border-hairline-strong bg-white text-ink-700 hover:border-primary hover:text-primary"
                                    )}
                                  >
                                    {label}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        ) : null}

                        {groups ? (
                          visibleGroups.map((group) => (
                            <div key={group.label}>
                              {chip === ALL_CHIP ? (
                                <p className="mb-1 text-eyebrow font-bold uppercase tracking-[0.09em] text-ink-500">
                                  {group.label}
                                </p>
                              ) : null}
                              <div className="flex flex-col">
                                {group.children.map((child) => (
                                  <NavRow
                                    key={child.label}
                                    link={child}
                                    nested
                                    active={isActive(child.href)}
                                    onNavigate={close}
                                    onModal={handleModal}
                                  />
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col">
                            {subtree.map((child) => (
                              <NavRow
                                key={child.label}
                                link={child}
                                nested
                                active={isActive(child.href)}
                                onNavigate={close}
                                onModal={handleModal}
                              />
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Buy and Download. Rows, not buttons — on mobile this sheet is
                  the only place they exist. Outside the Accordion root so they
                  stay clear of its roving-focus keyboard handling. */}
              <div className="flex flex-col">
                {linkCtas.map((cta) => (
                  <NavRow
                    key={cta.label}
                    link={cta}
                    active={isActive(cta.href)}
                    onNavigate={close}
                    onModal={handleModal}
                  />
                ))}
              </div>
            </nav>
          )}
        </div>

        {/* S01 terminating pill — one compound CTA, two 44px circular icons.
            Was five buttons across three rows. */}
        <div className="flex items-center gap-2.5 border-t border-hairline px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {talkCta && talkModal ? (
            <CompoundCta
              className="flex-1 justify-between"
              onClick={() => handleModal(talkModal)}
            >
              {talkCta.label}
            </CompoundCta>
          ) : null}
          <Button
            variant="ghost"
            size="iconRound"
            asChild
            className="border border-hairline-strong text-ink hover:border-primary hover:text-primary"
          >
            <a
              href={`tel:${site.phone.tel}`}
              aria-label="Call us"
              onClick={close}
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="iconRound"
            asChild
            className="border border-hairline-strong text-ink hover:border-primary hover:text-primary"
          >
            <a
              href={site.whatsapp.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp us"
              onClick={close}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
