import { createHash } from "node:crypto";
import { env, integrations } from "@/lib/env";

/**
 * Mailchimp newsletter subscribe via their Marketing API.
 *
 * Upserts a member on the configured audience. If the email already
 * exists, Mailchimp returns 200 and the record is left alone.
 *
 * Dev fallback: logs to console when API key / audience ID unset.
 */

interface SubscribeResult {
  ok: boolean;
  status?: string; // "subscribed" | "pending" | "unchanged" etc.
  reason?: string;
  devMock?: boolean;
}

function memberHash(email: string): string {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

export async function subscribeNewsletter(
  email: string
): Promise<SubscribeResult> {
  if (!integrations.mailchimp) {
    console.info(
      `[mailchimp] not configured — dev mock subscribe for ${email}`
    );
    return { ok: true, status: "subscribed", devMock: true };
  }

  const url = `https://${env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members/${memberHash(email)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Basic ${Buffer.from(`anystring:${env.MAILCHIMP_API_KEY}`).toString("base64")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
      }),
    });
  } catch {
    return { ok: false, reason: "network-error" };
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as {
      title?: string;
    };
    return { ok: false, reason: data.title ?? `http-${res.status}` };
  }

  const data = (await res.json()) as { status?: string };
  return { ok: true, status: data.status };
}
