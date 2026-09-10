"use client";

import type { LeadSource } from "@/lib/schema";

/**
 * Typed dataLayer helpers. Safe to call from any client component —
 * no-ops when window.dataLayer isn't available (GTM unset or SSR).
 */

interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(event: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

/** Fire a generic named event with arbitrary payload. */
export function trackEvent(
  name: string,
  payload?: Record<string, unknown>
): void {
  push({ event: name, ...(payload ?? {}) });
}

/**
 * Fire the standard `lead_submitted` event on OTP verify success.
 * GTM is expected to fan this out to GA4 `generate_lead`, Meta Pixel
 * `Lead`, etc.
 */
export function trackLead(params: {
  source?: LeadSource;
  crmId?: string;
  devMock?: boolean;
}): void {
  push({
    event: "lead_submitted",
    lead_source: params.source ?? "website",
    crm_id: params.crmId,
    dev_mock: params.devMock ?? false,
  });
}

/** Newsletter subscribe confirmation. */
export function trackNewsletter(devMock = false): void {
  push({ event: "newsletter_subscribed", dev_mock: devMock });
}
