import { env, integrations } from "@/lib/env";

/**
 * Verify a reCAPTCHA v3 token with Google's siteverify endpoint.
 *
 * Dev fallback: when RECAPTCHA_SECRET_KEY is unset, returns success with
 * a synthesised score of 1. Console-logs so the omission is visible.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  ip?: string
): Promise<{ ok: boolean; score: number; reason?: string }> {
  if (!integrations.recaptcha) {
    if (!token) return { ok: true, score: 1, reason: "dev-no-token" };
    console.warn(
      "[recaptcha] RECAPTCHA_SECRET_KEY not set — skipping verification"
    );
    return { ok: true, score: 1, reason: "dev-no-secret" };
  }
  if (!token) return { ok: false, score: 0, reason: "missing-token" };

  const body = new URLSearchParams({
    secret: env.RECAPTCHA_SECRET_KEY,
    response: token,
    ...(ip ? { remoteip: ip } : {}),
  });

  let res: Response;
  try {
    res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    return { ok: false, score: 0, reason: "network-error" };
  }
  if (!res.ok) {
    return { ok: false, score: 0, reason: `http-${res.status}` };
  }

  const data = (await res.json()) as {
    success: boolean;
    score?: number;
    "error-codes"?: string[];
  };

  const score = typeof data.score === "number" ? data.score : 0;
  if (!data.success) {
    return {
      ok: false,
      score,
      reason: (data["error-codes"] ?? ["unknown"]).join(","),
    };
  }
  if (score < env.RECAPTCHA_MIN_SCORE) {
    return { ok: false, score, reason: "score-below-threshold" };
  }
  return { ok: true, score };
}
