import { env, integrations } from "@/lib/env";
import type { LeadPayload } from "@/lib/schema";

/**
 * Transactional email via Resend HTTP API.
 *
 * Dev fallback: when RESEND_API_KEY is unset, formats the email and logs
 * it to the server console. Keeps the form flow testable without credentials.
 */

const RESEND_BASE = "https://api.resend.com";

interface SendResult {
  ok: boolean;
  id?: string;
  reason?: string;
  devMock?: boolean;
}

export async function sendMail(params: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (!integrations.email) {
    console.info("[email] RESEND_API_KEY not set — dev mock email:", {
      to: params.to,
      subject: params.subject,
      replyTo: params.replyTo,
      preview: params.text.slice(0, 200),
    });
    return { ok: true, id: "dev-mock", devMock: true };
  }

  let res: Response;
  try {
    res = await fetch(`${RESEND_BASE}/emails`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        reply_to: params.replyTo,
      }),
    });
  } catch {
    return { ok: false, reason: "network-error" };
  }

  if (!res.ok) {
    return { ok: false, reason: `http-${res.status}` };
  }
  const data = (await res.json()) as { id?: string };
  return { ok: true, id: data.id };
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Build an email body from a validated lead. */
export function renderLeadEmail(lead: LeadPayload & { utm?: Record<string, string> | undefined }) {
  const subject = `New lead — ${lead.name} · ${lead.source ?? "website"}`;
  const lines = [
    `Name: ${lead.name}`,
    `Phone: +91 ${lead.phone}`,
    `Email: ${lead.email}`,
    `Source: ${lead.source ?? "—"}`,
    `Consent: ${lead.consent ? "yes" : "no"}`,
    "",
    `Requirement:`,
    lead.requirement,
  ];
  if (lead.utm && Object.keys(lead.utm).length > 0) {
    lines.push("", "UTM:", ...Object.entries(lead.utm).map(([k, v]) => `  ${k}: ${v}`));
  }
  const text = lines.join("\n");

  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#2E1B45;line-height:1.5">
    <h2 style="margin:0 0 12px;font-size:20px">${escape(subject)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:6px 12px;background:#F7EFFA;width:120px">Name</td><td style="padding:6px 12px">${escape(lead.name)}</td></tr>
      <tr><td style="padding:6px 12px;background:#F7EFFA">Phone</td><td style="padding:6px 12px">+91 ${escape(lead.phone)}</td></tr>
      <tr><td style="padding:6px 12px;background:#F7EFFA">Email</td><td style="padding:6px 12px">${escape(lead.email)}</td></tr>
      <tr><td style="padding:6px 12px;background:#F7EFFA">Source</td><td style="padding:6px 12px">${escape(lead.source ?? "—")}</td></tr>
    </table>
    <h3 style="margin:20px 0 8px">Requirement</h3>
    <p style="margin:0;white-space:pre-line">${escape(lead.requirement)}</p>
    ${
      lead.utm && Object.keys(lead.utm).length > 0
        ? `<h3 style="margin:20px 0 8px">UTM</h3><pre style="background:#F6F0E4;padding:10px;border-radius:6px;margin:0;font-size:13px">${escape(
            Object.entries(lead.utm)
              .map(([k, v]) => `${k}: ${v}`)
              .join("\n")
          )}</pre>`
        : ""
    }
  </div>`;

  return { subject, text, html };
}

/** Send lead notification — uses LEAD_NOTIFY_TO as the recipient. */
export async function notifyLead(
  lead: LeadPayload & { utm?: Record<string, string> | undefined }
): Promise<SendResult> {
  const { subject, text, html } = renderLeadEmail(lead);
  const to = env.LEAD_NOTIFY_TO.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return sendMail({
    to,
    subject,
    text,
    html,
    replyTo: lead.email,
  });
}
