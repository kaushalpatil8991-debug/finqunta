"use client";

import * as React from "react";
import { X, Info } from "lucide-react";

interface DemoContentBannerProps {
  count: number;
}

/**
 * Dev-only banner that announces how many pieces of placeholder content are
 * rendered on the page. Counted server-side at page render. Dismissible;
 * dismissal persists in sessionStorage for the current session.
 */
export function DemoContentBanner({ count }: DemoContentBannerProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("fq.demo-banner.dismissed") === "1") {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="border-b border-accent-sand-100 bg-accent-sand-100/60 text-ink-700">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-gutter py-2 text-caption md:px-gutter-md lg:px-gutter-lg">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 shrink-0 text-[#7a5c0f]" aria-hidden />
          <span>
            <strong className="font-semibold">Demo content</strong> —{" "}
            <strong className="font-semibold tabular-nums">{count}</strong> items
            on this page are placeholders. Edit <code className="rounded bg-white/70 px-1">content/</code> files to customise.
          </span>
        </div>
        <button
          type="button"
          aria-label="Dismiss demo content banner"
          onClick={() => {
            try {
              window.sessionStorage.setItem("fq.demo-banner.dismissed", "1");
            } catch {}
            setVisible(false);
          }}
          className="rounded-sm p-1 text-ink-500 transition-colors hover:bg-white/60 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
