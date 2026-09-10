"use server";

import { headers } from "next/headers";
import { LeadPayloadSchema, type LeadPayload } from "@/lib/schema";
import { clientIpFromHeaders, consume } from "@/lib/backend/rate-limit";
import { verifyRecaptcha } from "@/lib/backend/recaptcha";
import { sendOtp } from "@/lib/backend/sms";
import { signSession } from "@/lib/backend/signing";

export interface SubmitLeadResult {
  ok: boolean;
  /** Opaque signed token the client passes to /api/otp/verify. */
  sessionToken?: string;
  /** Informational — set when dev fallbacks are in play. */
  devMock?: boolean;
  /** Error code for the client to branch on. */
  error?:
    | "invalid-payload"
    | "rate-limited"
    | "recaptcha-failed"
    | "otp-send-failed";
  /** Human-readable reason (never shown as-is to end users). */
  reason?: string;
}

/**
 * Server Action invoked by the LeadForm on submit. Validates payload,
 * applies rate limit, verifies reCAPTCHA, issues an OTP, and returns a
 * signed session token the client sends back with the OTP to verify.
 */
export async function submitLead(
  raw: LeadPayload
): Promise<SubmitLeadResult> {
  const parsed = LeadPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "invalid-payload" };
  }
  const lead = parsed.data;

  const h = await headers();
  const ip = clientIpFromHeaders(h);

  const rl = consume(`lead:${ip}`);
  if (!rl.ok) return { ok: false, error: "rate-limited" };

  const recap = await verifyRecaptcha(lead.recaptchaToken, ip);
  if (!recap.ok) {
    return { ok: false, error: "recaptcha-failed", reason: recap.reason };
  }

  const send = await sendOtp(lead.phone);
  if (!send.ok) {
    return { ok: false, error: "otp-send-failed", reason: send.reason };
  }

  const sessionToken = signSession({ lead });
  return { ok: true, sessionToken, devMock: send.devMock };
}
