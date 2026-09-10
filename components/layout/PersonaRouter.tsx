"use client";

import * as React from "react";
import Link from "next/link";
import { Briefcase, Calculator, ChevronDown, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const personas = [
  {
    label: "Business Owner",
    description: "Run accounts, GST, inventory",
    href: "/personas/business-owner",
    Icon: Briefcase,
  },
  {
    label: "Chartered Accountant",
    description: "Audit, advisory, client books",
    href: "/personas/ca",
    Icon: Calculator,
  },
  {
    label: "Accountant",
    description: "Day-to-day vouchers & reports",
    href: "/personas/accountant",
    Icon: UserRound,
  },
] as const;

/**
 * Compact persona selector for the header. A single pill button that
 * opens a small dropdown of the three audience routes. Keeps the
 * header lean on narrow desktops where the old inline triple-link
 * variant wrapped and collided with the mega-menu.
 */
export function PersonaRouter() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative hidden min-[1180px]:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-ink/10 bg-white/40 px-3 text-body-sm font-semibold text-ink-700 backdrop-blur-md transition-all",
          "hover:border-primary/30 hover:bg-white/70 hover:text-primary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          open && "border-primary/40 bg-white/80 text-primary"
        )}
      >
        <Users className="h-3.5 w-3.5" aria-hidden />
        <span>For my role</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-[var(--motion-base)]",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <div
        role="menu"
        aria-label="Choose your role"
        className={cn(
          "absolute right-0 top-[calc(100%+10px)] z-sticky w-[min(92vw,300px)] origin-top-right overflow-hidden rounded-xl border border-ink/10 bg-white/85 p-1.5 shadow-[0_20px_50px_rgb(46_27_69_/_0.16)] backdrop-blur-2xl transition-all duration-[var(--motion-base)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="px-3 pb-1.5 pt-2">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-primary">
            Tailored journeys
          </p>
        </div>
        {personas.map(({ label, description, href, Icon }) => (
          <Link
            key={label}
            href={href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary-50/80"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-body-sm font-semibold text-ink">
                {label}
              </span>
              <span className="text-caption text-ink-500">{description}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
