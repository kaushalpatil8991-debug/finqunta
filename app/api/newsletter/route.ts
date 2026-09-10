import { NextResponse } from "next/server";
import { NewsletterPayloadSchema } from "@/lib/schema";
import { clientIpFromHeaders, consume } from "@/lib/backend/rate-limit";
import { verifyRecaptcha } from "@/lib/backend/recaptcha";
import { subscribeNewsletter } from "@/lib/backend/mailchimp";

/**
 * Newsletter subscribe endpoint.
 *
 * Validates payload, applies rate limit, verifies reCAPTCHA (if
 * configured), and calls Mailchimp. Gracefully falls back to console log
 * when API keys unset.
 */
export async function POST(req: Request) {
  const ip = clientIpFromHeaders(req.headers);
  const rl = consume(`news:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate-limited" as const },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "bad-json" as const },
      { status: 400 }
    );
  }

  const parsed = NewsletterPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid-payload" as const },
      { status: 400 }
    );
  }

  const recap = await verifyRecaptcha(parsed.data.recaptchaToken, ip);
  if (!recap.ok) {
    return NextResponse.json(
      { ok: false, error: "recaptcha-failed" as const },
      { status: 400 }
    );
  }

  const result = await subscribeNewsletter(parsed.data.email);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "subscribe-failed" as const, reason: result.reason },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, devMock: result.devMock });
}
