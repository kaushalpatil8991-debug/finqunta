"use client";

import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns true if the user has requested reduced motion. Subscribes to live
 * changes so toggling the preference mid-session disables autoplay / entrance
 * animations without a reload.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setPrefersReduced(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    // Modern API; Safari < 14 needs addListener but we target current browsers.
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
