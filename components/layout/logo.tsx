import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Colour treatment. */
  mode?: "plum" | "mono-ink" | "mono-cream";
  /** Render only the mark (no wordmark). */
  iconOnly?: boolean;
  /** Render only the wordmark (no mark). */
  wordmarkOnly?: boolean;
  /** Size of the icon. Wordmark scales automatically. */
  size?: number;
  className?: string;
}

/**
 * Stylised graph-arrow-in-circle mark + FINQUANTA wordmark, inline SVG
 * recreated from the business card in Ivory Pearl colours.
 */
export function Logo({
  mode = "plum",
  iconOnly = false,
  wordmarkOnly = false,
  size = 36,
  className,
}: LogoProps) {
  const color =
    mode === "plum"
      ? "text-primary"
      : mode === "mono-cream"
      ? "text-cream"
      : "text-ink";

  return (
    <Link
      href="/"
      aria-label={`${site.shortName} — home`}
      className={cn(
        "inline-flex items-center gap-2 font-bold tracking-tight",
        color,
        className
      )}
    >
      {!wordmarkOnly && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="shrink-0"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="currentColor"
            strokeWidth="2.25"
            opacity="0.55"
          />
          {/* rising bars */}
          <rect x="11" y="28" width="4" height="9" rx="1" fill="currentColor" />
          <rect x="19" y="23" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="27" y="17" width="4" height="20" rx="1" fill="currentColor" />
          {/* upward trajectory arrow */}
          <path
            d="M12 20.5 L24 13.5 L36 9"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36 9 L36 15 M36 9 L30 11"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {!iconOnly && (
        <span className="text-h4 leading-none tracking-tight sm:text-h3">
          {site.shortName}
        </span>
      )}
    </Link>
  );
}
