import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * S10 — the compound CTA. The corpus calls it "the most reliably reusable
 * component in the set". It is *the* primary button, everywhere; secondary is
 * always a text link with an icon, never a low-opacity outline.
 *
 * Geometry, reconciled with the S24 radius law: the container is a **10px
 * rectangle** (rectangles are buttons, pills are tags), and the circular icon
 * button is set into its end cap. S10 describes a pill container; that half of
 * the plate loses to S24. See `.cta` in prototype/index.html.
 *
 * COLOUR CONTRACT — read before restyling. Every colour rides on four custom
 * properties set *on the element itself* by the `tone` variant:
 *
 *   --cta-bg  --cta-bg-h  --cta-fg  --cta-i  (+ --cta-focus)
 *
 * They are never set by a descendant selector such as `.panel .cta`, because a
 * descendant rule loses a specificity race against a `:root:not(...)` rule and
 * the label silently renders white-on-white. To place this button on a new
 * surface, add a `tone`, or override the custom properties at the call site —
 * never add a colour rule that targets the button from an ancestor.
 */

const compoundCtaVariants = cva(
  [
    "inline-flex cursor-pointer items-center gap-[14px] whitespace-nowrap",
    "rounded-md border-0 py-2 pl-5 pr-2",
    // Manrope, never the serif — S19 keeps the serif out of every control.
    "font-sans text-[15px] font-bold leading-[1.2]",
    "bg-[color:var(--cta-bg)] text-[color:var(--cta-fg)]",
    "transition-[background-color,transform] duration-[160ms] ease-[var(--ease-soft)]",
    "hover:-translate-y-px hover:bg-[color:var(--cta-bg-h)]",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px]",
    "focus-visible:outline-[color:var(--cta-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      tone: {
        /** Default. Plum on any light surface — ground, surface or band. */
        plum: [
          "[--cta-bg:var(--color-primary)]",
          "[--cta-bg-h:var(--color-primary-600)]",
          "[--cta-fg:#fff]",
          "[--cta-i:rgba(255,255,255,0.22)]",
          "[--cta-focus:var(--color-primary)]",
        ].join(" "),
        /** On an ink surface — CTA band, footer, inverted hero. Sand is the
         *  dark-ground accent; ink-on-sand is 9.69:1. */
        sand: [
          "[--cta-bg:var(--color-accent-sand)]",
          "[--cta-bg-h:#f0d6ae]",
          "[--cta-fg:var(--color-ink)]",
          "[--cta-i:rgba(46,27,69,0.16)]",
          "[--cta-focus:var(--color-cream-200)]",
        ].join(" "),
        /** Inside the S34 plum enquiry panel — white ground, plum label. */
        invert: [
          "[--cta-bg:#fff]",
          "[--cta-bg-h:var(--color-cream-200)]",
          "[--cta-fg:var(--color-primary)]",
          "[--cta-i:rgba(122,79,176,0.16)]",
          "[--cta-focus:#fff]",
        ].join(" "),
      },
    },
    defaultVariants: { tone: "plum" },
  }
);

const ICON_CLASS =
  "grid h-[34px] w-[34px] flex-none place-items-center rounded-pill " +
  "bg-[color:var(--cta-i)] text-[15px] not-italic leading-none";

export type CompoundCtaTone = NonNullable<
  VariantProps<typeof compoundCtaVariants>["tone"]
>;

export interface CompoundCtaProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof compoundCtaVariants> {
  /** Render an `<a href>` instead of a `<button>`. */
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  /**
   * Merge onto the single child element (e.g. `next/link`). The child's own
   * children become the label; the icon end cap is appended inside it.
   */
  asChild?: boolean;
  /** Glyph inside the circular end cap. Defaults to an arrow. */
  icon?: React.ReactNode;
}

export const CompoundCta = React.forwardRef<HTMLElement, CompoundCtaProps>(
  (
    {
      className,
      tone,
      href,
      asChild = false,
      icon = "→",
      children,
      type,
      ...props
    },
    ref
  ) => {
    const rootClass = cn(compoundCtaVariants({ tone }), className);

    const iconNode = (
      <i aria-hidden="true" data-cta-icon="" className={ICON_CLASS}>
        {icon}
      </i>
    );

    // asChild: keep the consumer's element (Link, a, custom) as the rendered
    // node, but rebuild its children so the label still sits in its own <span>.
    // Chrome that hides the label at narrow widths (the floating cluster) keys
    // off [data-cta-label], so the wrapper is part of the contract.
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return (
        <Slot ref={ref} className={rootClass} {...props}>
          {React.cloneElement(
            child,
            undefined,
            <>
              <span data-cta-label="">{child.props.children}</span>
              {iconNode}
            </>
          )}
        </Slot>
      );
    }

    const Comp = (href ? "a" : "button") as React.ElementType;

    return (
      <Comp
        ref={ref}
        className={rootClass}
        {...(href ? { href } : { type: type ?? "button" })}
        {...props}
      >
        <span data-cta-label="">{children}</span>
        {iconNode}
      </Comp>
    );
  }
);
CompoundCta.displayName = "CompoundCta";

export { compoundCtaVariants };
