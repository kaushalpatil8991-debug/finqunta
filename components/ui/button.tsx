"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-[var(--motion-base)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[var(--shadow-card)] hover:bg-primary-600 hover:-translate-y-px hover:shadow-[var(--shadow-card-hover)]",
        secondary:
          "bg-primary-100 text-ink-700 hover:bg-primary-50",
        ghost:
          "bg-transparent text-ink-700 hover:bg-primary-50",
        outline:
          // Light surfaces only. A translucent outline on ink (the corpus's
          // `border-cream/30`) measures 2.55:1 and fails WCAG 1.4.11 — use
          // `tlinkOnInk`, or CompoundCta tone="sand", on an ink band instead.
          "border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary-50",
        sand:
          "bg-accent-sand text-ink hover:bg-accent-sand-100",
        link:
          "bg-transparent text-primary underline-offset-4 hover:underline",
        // ── Additive (S10 law): secondary is always a text link with an icon,
        // never a low-opacity outline. Pair with size="inline". ──
        tlink:
          "rounded-none border-b border-b-hairline-strong bg-transparent pb-[2px] text-ink hover:border-b-primary hover:text-primary",
        tlinkOnInk:
          "rounded-none border-b border-b-hairline-on-ink bg-transparent pb-[2px] text-cream-200 hover:border-b-accent-sand hover:text-accent-sand focus-visible:outline-cream-200",
      },
      size: {
        sm: "h-9 px-4 text-body-sm",
        md: "h-11 px-5 text-body",
        lg: "h-12 px-6 text-body-lg",
        icon: "h-10 w-10",
        // ── Additive ──
        /** Text-link scale: no box, no min-height. For variant tlink/link. */
        inline: "h-auto px-0 text-[15px]",
        /** Circular 44px icon button — the sanctioned mobile touch target. */
        iconRound: "h-11 w-11 rounded-pill p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
