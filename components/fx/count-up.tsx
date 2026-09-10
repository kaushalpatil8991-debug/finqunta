"use client";

import * as React from "react";
import { formatIndianNumber } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface CountUpProps {
  /** Target value to count to. */
  to: number;
  /** Animation duration in ms. */
  durationMs?: number;
  /** Rendered prefix (e.g., "$" — unused by default). */
  prefix?: string;
  /** Rendered suffix (e.g., "+"). */
  suffix?: string;
  /** Root element className. */
  className?: string;
}

/**
 * Counts from 0 → `to` the first time it scrolls into view, over `durationMs`,
 * rendering with Indian digit grouping. Respects prefers-reduced-motion
 * (renders the target immediately).
 */
export function CountUp({
  to,
  durationMs = 1800,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = React.useState(reduced ? to : 0);
  const elRef = React.useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = React.useRef(false);

  React.useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const el = elRef.current;
    if (!el) return;

    const animate = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const start = performance.now();
      let rafId = 0;
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / durationMs);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(to * eased));
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs, reduced]);

  return (
    <span ref={elRef} className={className}>
      {prefix}
      {formatIndianNumber(value)}
      {suffix}
    </span>
  );
}
