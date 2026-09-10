import { NextResponse } from "next/server";
import {
  LeadSessionSchema,
  OtpVerifyPayloadSchema,
  type LeadSession,
} from "@/lib/schema";
import { clientIpFromHeaders, consume } from "@/lib/backend/rate-limit";
import { verifyOtp } from "@/lib/backend/sms";
import { verifySession } from "@/lib/backend/signing";
import { notifyLead } from "@/lib/backend/email";
import { pushLeadToCrm } from "@/lib/backend/crm";

interface Body {
  sessionToken: string;
  phone: string;
  code: string;
}

/**
 * Verify the OTP against MSG91 (or dev mock) and, on success:
 *   1. decode the signed lead session,
 *   2. email the lead to LEAD_NOTIFY_TO,
 *   3. push to the CRM stub.
 *
 * Response shape:
 *   { ok: true, devMock?: boolean }
 *   { ok: false, error: "wrong-code" | "expired" | "rate-limited" | ... }
 */
export async function POST(req: Request) {
  const ip = clientIpFromHeaders(req.headers);
  const rl = consume(`otp:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate-limited" as const },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "bad-json" as const },
      { status: 400 }
    );
  }

  const parsed = OtpVerifyPayloadSchema.safeParse({
    phone: body.phone,
    code: body.code,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid-payload" as const },
      { status: 400 }
    );
  }

  const session = verifySession<LeadSession>(body.sessionToken ?? "");
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "expired" as const },
      { status: 400 }
    );
  }
  const leadParsed = LeadSessionSchema.safeParse(session);
  if (!leadParsed.success) {
    return NextResponse.json(
      { ok: false, error: "expired" as const },
      { status: 400 }
    );
  }

  if (leadParsed.data.lead.phone !== parsed.data.phone) {
    return NextResponse.json(
      { ok: false, error: "phone-mismatch" as const },
      { status: 400 }
    );
  }

  const check = await verifyOtp(parsed.data.phone, parsed.data.code);
  if (!check.ok) {
    return NextResponse.json(
      { ok: false, error: "wrong-code" as const },
      { status: 400 }
    );
  }

  // Side-effects run in parallel; we don't block response on transient errors.
  const [, crm] = await Promise.all([
    notifyLead(leadParsed.data.lead),
    pushLeadToCrm(leadParsed.data.lead),
  ]);

  return NextResponse.json({
    ok: true,
    devMock: check.devMock,
    crmId: crm.id,
  });
}
