import type { LeadPayload } from "@/lib/schema";

/**
 * CRM stub — logs every captured lead to the server console with a
 * [crm] prefix for downstream log ingestion.
 *
 * Future: swap this one function's body for a HubSpot / Zoho / Salesforce
 * API call. The call site (app/api/otp/verify/route.ts) stays unchanged.
 *
 * For now the lead is ALSO emailed to LEAD_NOTIFY_TO via email.ts, so
 * this stub exists mainly to make the seam explicit and future-proof.
 */
export async function pushLeadToCrm(
  lead: LeadPayload & { utm?: Record<string, string> | undefined }
): Promise<{ ok: boolean; id?: string }> {
  const record = {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    requirement: lead.requirement,
    source: lead.source ?? "website",
    consent: lead.consent,
    utm: lead.utm ?? null,
    capturedAt: new Date().toISOString(),
  };
  console.info("[crm] lead captured:", JSON.stringify(record));
  return { ok: true, id: `stub-${Date.now()}` };
}
