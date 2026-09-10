import { env } from "@/lib/env";

/**
 * In-memory per-key token bucket rate limiter.
 *
 * Good enough for a single-server deploy. For multi-instance (Vercel,
 * multi-container), swap for a Redis-backed limiter — see STATUS.md.
 *
 * We pin the Map on globalThis so hot-reload doesn't reset limits in dev.
 */
interface Bucket {
  count: number;
  resetAt: number;
}

const globalAny = globalThis as unknown as {
  __finquantaRateLimit?: Map<string, Bucket>;
};

const store: Map<string, Bucket> =
  globalAny.__finquantaRateLimit ?? new Map<string, Bucket>();
globalAny.__finquantaRateLimit = store;

const MAX = env.RATE_LIMIT_MAX;
const WINDOW_MS = env.RATE_LIMIT_WINDOW * 1000;

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Consume one token from the bucket for `key`. If the bucket is empty
 * within the current window, returns `ok: false` with the reset time.
 */
export function consume(key: string): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    const fresh: Bucket = { count: 1, resetAt: now + WINDOW_MS };
    store.set(key, fresh);
    return { ok: true, remaining: MAX - 1, resetAt: fresh.resetAt };
  }

  if (existing.count >= MAX) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: MAX - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Extract the client IP from a Next request Headers-like object.
 * Falls back to "unknown" when no header is set (local dev / direct Node).
 */
export function clientIpFromHeaders(
  headers: Headers | Record<string, string | string[] | undefined>
): string {
  const get = (name: string): string | null => {
    if (headers instanceof Headers) return headers.get(name);
    const v = (headers as Record<string, string | string[] | undefined>)[
      name.toLowerCase()
    ];
    return Array.isArray(v) ? v[0] ?? null : v ?? null;
  };
  const forwarded = get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return get("x-real-ip") ?? "unknown";
}
