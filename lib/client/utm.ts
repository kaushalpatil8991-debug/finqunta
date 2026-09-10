"use client";

import type { Utm } from "@/lib/schema";

/**
 * Capture standard UTM parameters from the current URL + document
 * referrer. Safe to call on the server — returns {} when window is
 * not available.
 */
export function captureUtm(): Utm {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => {
    const v = params.get(key);
    return v ? v.slice(0, 120) : undefined;
  };
  const referrer = document.referrer ? document.referrer.slice(0, 240) : undefined;
  const utm: Utm = {
    source: pick("utm_source"),
    medium: pick("utm_medium"),
    campaign: pick("utm_campaign"),
    term: pick("utm_term"),
    content: pick("utm_content"),
    referrer,
  };
  // Drop undefined keys so the payload is tidy.
  return Object.fromEntries(
    Object.entries(utm).filter(([, v]) => v !== undefined)
  ) as Utm;
}
