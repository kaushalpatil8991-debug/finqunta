import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

/**
 * Stateless HMAC signing for lead sessions.
 *
 * Flow: `submitLead` packs the validated lead + an `issuedAt` timestamp,
 * signs it, and hands the token to the client. The client sends the
 * same token to `/api/otp/verify` after entering the OTP. The server
 * checks the signature, confirms the timestamp is within TTL, then
 * actions the lead. No server-side session store required.
 *
 * If LEAD_SIGNING_SECRET is unset we fall back to a dev-only key so
 * the app compiles. Do NOT ship to production without setting a real
 * secret — `env.ts` surfaces this via the integrations flag so you can
 * assert on it at startup if desired.
 */
const DEV_SECRET = "dev-only-secret-do-not-use-in-production";
const SECRET = env.LEAD_SIGNING_SECRET || DEV_SECRET;

/** Default lead-session TTL (10 minutes). */
export const LEAD_SESSION_TTL_MS = 10 * 60 * 1000;

function toBase64Url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function fromBase64Url(str: string): Buffer {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

/**
 * Sign a JSON-serialisable payload with an appended timestamp.
 * Token shape: `<base64url(payloadJson)>.<base64url(hmacSha256)>`.
 */
export function signSession<T extends object>(payload: T): string {
  const body = JSON.stringify({ ...payload, issuedAt: Date.now() });
  const bodyPart = toBase64Url(Buffer.from(body, "utf-8"));
  const mac = createHmac("sha256", SECRET).update(bodyPart).digest();
  return `${bodyPart}.${toBase64Url(mac)}`;
}

/**
 * Verify a token signed by `signSession`. Returns the payload (including
 * the injected `issuedAt`) if valid and not expired. Returns null otherwise.
 */
export function verifySession<T>(token: string, ttlMs = LEAD_SESSION_TTL_MS):
  | (T & { issuedAt: number })
  | null {
  const [bodyPart, macPart] = token.split(".");
  if (!bodyPart || !macPart) return null;

  const expectedMac = createHmac("sha256", SECRET).update(bodyPart).digest();
  const providedMac = fromBase64Url(macPart);
  if (expectedMac.length !== providedMac.length) return null;
  if (!timingSafeEqual(expectedMac, providedMac)) return null;

  let parsed: (T & { issuedAt: number }) | null = null;
  try {
    parsed = JSON.parse(fromBase64Url(bodyPart).toString("utf-8")) as T & {
      issuedAt: number;
    };
  } catch {
    return null;
  }
  if (!parsed || typeof parsed.issuedAt !== "number") return null;
  if (Date.now() - parsed.issuedAt > ttlMs) return null;
  return parsed;
}
