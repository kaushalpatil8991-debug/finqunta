import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        plum: "bg-primary-100 text-ink-700",
        sand: "bg-accent-sand-100 text-[#7a5c0f]",
        success: "bg-[#dff0e6] text-[#1f5a3a]",
        info: "bg-[#dee7f5] text-[#1e3a78]",
        cream: "bg-cream-100 text-ink-700",
      },
    },
    defaultVariants: { tone: "plum" },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, tone, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(chipVariants({ tone, className }))}
      {...props}
    />
  )
);
Chip.displayName = "Chip";
