"use client";

/**
 * Lightweight reCAPTCHA v3 client. Loads the script on demand and
 * resolves to a token for a given action — or to `undefined` when the
 * site key is not configured (dev fallback).
 *
 * Usage:
 *   const token = await getRecaptchaToken("lead");
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  if (!SITE_KEY) return Promise.resolve();

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-finquanta-recaptcha="1"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("recaptcha-load-failed")));
      return;
    }
    const el = document.createElement("script");
    el.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    el.async = true;
    el.defer = true;
    el.dataset.finquantaRecaptcha = "1";
    el.addEventListener("load", () => resolve());
    el.addEventListener("error", () => reject(new Error("recaptcha-load-failed")));
    document.head.appendChild(el);
  });

  return scriptPromise;
}

/**
 * Get a reCAPTCHA v3 token for a given action. Returns undefined if
 * the site key is not configured (dev) — server will honour that.
 */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  if (typeof window === "undefined") return undefined;
  if (!SITE_KEY) return undefined;
  try {
    await loadScript();
    if (!window.grecaptcha) return undefined;
    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(SITE_KEY, { action });
          resolve(token);
        } catch (err) {
          reject(err);
        }
      });
    });
  } catch {
    return undefined;
  }
}
