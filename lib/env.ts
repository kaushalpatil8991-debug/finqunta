import { z } from "zod";

/**
 * Environment variable reader. Validates once at module load; returns a
 * frozen object the rest of the backend library consumes.
 *
 * Design: all integration-specific variables are OPTIONAL. When unset, the
 * corresponding backend module falls back to a dev-safe stub (console log
 * instead of network call; mock OTP `123456` accepted). This lets
 * `pnpm dev` and `pnpm build` work with no env at all — and the same code
 * path runs real integrations in staging/prod when env is supplied.
 */
const rawSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().default(""),
  RECAPTCHA_SECRET_KEY: z.string().default(""),
  RECAPTCHA_MIN_SCORE: z.coerce.number().min(0).max(1).default(0.5),

  MSG91_AUTH_KEY: z.string().default(""),
  MSG91_OTP_TEMPLATE_ID: z.string().default(""),
  MSG91_SENDER_ID: z.string().default("FINQTA"),

  RESEND_API_KEY: z.string().default(""),
  LEAD_NOTIFY_TO: z.string().default("sandiputekar.tally@gmail.com"),
  LEAD_FROM_EMAIL: z.string().default("website@finquanta.example"),

  MAILCHIMP_API_KEY: z.string().default(""),
  MAILCHIMP_AUDIENCE_ID: z.string().default(""),
  MAILCHIMP_DC: z.string().default("us1"),

  LEAD_SIGNING_SECRET: z.string().default(""),

  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(8),
  RATE_LIMIT_WINDOW: z.coerce.number().int().positive().default(60),

  // SP6 — analytics + SEO
  NEXT_PUBLIC_GTM_ID: z.string().default(""),
});

const parsed = rawSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  RECAPTCHA_MIN_SCORE: process.env.RECAPTCHA_MIN_SCORE,

  MSG91_AUTH_KEY: process.env.MSG91_AUTH_KEY,
  MSG91_OTP_TEMPLATE_ID: process.env.MSG91_OTP_TEMPLATE_ID,
  MSG91_SENDER_ID: process.env.MSG91_SENDER_ID,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_NOTIFY_TO: process.env.LEAD_NOTIFY_TO,
  LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL,

  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_DC: process.env.MAILCHIMP_DC,

  LEAD_SIGNING_SECRET: process.env.LEAD_SIGNING_SECRET,

  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW,

  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
});

/** Frozen, read-only view of validated environment variables. */
export const env = Object.freeze(parsed);

/** Presence flags for each optional integration. */
export const integrations = Object.freeze({
  recaptcha: Boolean(parsed.RECAPTCHA_SECRET_KEY),
  sms: Boolean(parsed.MSG91_AUTH_KEY && parsed.MSG91_OTP_TEMPLATE_ID),
  email: Boolean(parsed.RESEND_API_KEY),
  mailchimp: Boolean(
    parsed.MAILCHIMP_API_KEY && parsed.MAILCHIMP_AUDIENCE_ID
  ),
  analytics: Boolean(parsed.NEXT_PUBLIC_GTM_ID),
});

export const isProd = parsed.NODE_ENV === "production";
