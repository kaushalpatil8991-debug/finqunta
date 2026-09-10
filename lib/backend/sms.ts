import { env, integrations } from "@/lib/env";

/**
 * MSG91 OTP integration — issue + verify.
 *
 * MSG91's OTP product (v5) generates + verifies OTPs server-side; the
 * Finquanta backend simply calls issue and verify.
 *
 * Dev fallback: when MSG91 env is unset, `sendOtp` logs the invented OTP
 * (always `123456`) and `verifyOtp` accepts only `123456`. Matches the SP1
 * mock behaviour so the dev experience is unchanged.
 */

const MSG91_BASE = "https://control.msg91.com/api/v5";
const DEV_MOCK_OTP = "123456";

interface IssueResult {
  ok: boolean;
  messageId?: string;
  reason?: string;
  devMock?: boolean;
}

interface VerifyResult {
  ok: boolean;
  reason?: string;
  devMock?: boolean;
}

/** Send an OTP to the given 10-digit Indian mobile. */
export async function sendOtp(phone: string): Promise<IssueResult> {
  if (!integrations.sms) {
    console.warn(
      `[sms] MSG91 not configured — dev mock: OTP for +91${phone} is ${DEV_MOCK_OTP}`
    );
    return { ok: true, messageId: "dev-mock", devMock: true };
  }

  const url = new URL(`${MSG91_BASE}/otp`);
  url.searchParams.set("mobile", `91${phone}`);
  url.searchParams.set("template_id", env.MSG91_OTP_TEMPLATE_ID);
  url.searchParams.set("authkey", env.MSG91_AUTH_KEY);
  url.searchParams.set("sender", env.MSG91_SENDER_ID);

  let res: Response;
  try {
    res = await fetch(url.toString(), { method: "POST" });
  } catch {
    return { ok: false, reason: "network-error" };
  }
  if (!res.ok) return { ok: false, reason: `http-${res.status}` };

  const data = (await res.json()) as { type?: string; message?: string };
  if (data.type !== "success") {
    return { ok: false, reason: data.message ?? "msg91-failure" };
  }
  return { ok: true, messageId: data.message };
}

/** Verify an OTP code for the given 10-digit Indian mobile. */
export async function verifyOtp(
  phone: string,
  code: string
): Promise<VerifyResult> {
  if (!integrations.sms) {
    if (code === DEV_MOCK_OTP) return { ok: true, devMock: true };
    return { ok: false, reason: "wrong-code", devMock: true };
  }

  const url = new URL(`${MSG91_BASE}/otp/verify`);
  url.searchParams.set("mobile", `91${phone}`);
  url.searchParams.set("otp", code);
  url.searchParams.set("authkey", env.MSG91_AUTH_KEY);

  let res: Response;
  try {
    res = await fetch(url.toString(), { method: "GET" });
  } catch {
    return { ok: false, reason: "network-error" };
  }
  if (!res.ok) return { ok: false, reason: `http-${res.status}` };

  const data = (await res.json()) as { type?: string; message?: string };
  if (data.type !== "success") {
    return { ok: false, reason: data.message ?? "wrong-code" };
  }
  return { ok: true };
}

export { DEV_MOCK_OTP };
