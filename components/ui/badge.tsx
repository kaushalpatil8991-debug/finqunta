import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-caption font-semibold",
  {
    variants: {
      tone: {
        plum: "bg-primary text-white",
        sand: "bg-accent-sand text-ink",
        ink: "bg-ink text-cream",
        outline: "border border-primary text-primary",
      },
    },
    defaultVariants: { tone: "plum" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ tone, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
