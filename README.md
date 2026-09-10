This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

This app is configured to deploy on Netlify as a full Next.js server (App Router, Server Actions, API routes all supported). The relevant config lives in `netlify.toml` and `.nvmrc`.

### One-time setup

1. Push the repo to GitHub / GitLab / Bitbucket.
2. In Netlify, **Add new site → Import from Git** and pick the repo.
3. Leave the build command and publish directory as detected — Netlify reads them from `netlify.toml`:
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Node version: `22` (from `.nvmrc` / `NODE_VERSION`)
4. Add the environment variables below under **Site settings → Environment variables** before the first deploy. Values marked *(public)* are safe to expose via `NEXT_PUBLIC_*`; the rest must stay server-only.

### Required environment variables

Copy the values you use locally (see `.env.example`) into Netlify. Anything left unset falls back to the dev stubs documented in `lib/env.ts`, which is fine for a preview but **not** for production.

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical site URL, e.g. `https://finquanta.netlify.app` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | public | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | server | reCAPTCHA v3 secret |
| `RECAPTCHA_MIN_SCORE` | server | Default `0.5` |
| `MSG91_AUTH_KEY` | server | MSG91 authkey (OTP) |
| `MSG91_OTP_TEMPLATE_ID` | server | MSG91 OTP template id |
| `MSG91_SENDER_ID` | server | DLT sender id, 6 chars alpha |
| `RESEND_API_KEY` | server | Resend API key for lead email |
| `LEAD_NOTIFY_TO` | server | Comma-separated recipient list |
| `LEAD_FROM_EMAIL` | server | Verified Resend sender |
| `MAILCHIMP_API_KEY` | server | Newsletter provider key |
| `MAILCHIMP_AUDIENCE_ID` | server | Mailchimp list id |
| `MAILCHIMP_DC` | server | Datacenter suffix, e.g. `us1` |
| `LEAD_SIGNING_SECRET` | server | 32+ char HMAC secret — set a real value before prod |
| `RATE_LIMIT_MAX` | server | In-memory rate limit; single-instance only |
| `RATE_LIMIT_WINDOW` | server | Rate limit window in seconds |
| `NEXT_PUBLIC_GTM_ID` | public | GTM container id (analytics) |

### Notes on the free tier

- **Rate limiting is in-memory.** Netlify Functions are serverless; each cold instance starts with a fresh counter. For production traffic, swap `lib/rate-limit.ts` for a shared store (Upstash Redis, Netlify Blobs) before relying on it.
- **Image optimisation** works out of the box through the Next.js runtime; no extra config needed.
- **Server Actions** run on Netlify Functions. Watch the Functions timeout (10s on the free plan) if you add long-running work.

### Learn more

- [Netlify — Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying)
