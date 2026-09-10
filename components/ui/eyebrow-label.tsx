import * as React from "react";
import { cn } from "@/lib/utils";

export const EyebrowLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-block text-eyebrow font-semibold uppercase tracking-[0.12em] text-primary",
      className
    )}
    {...props}
  />
));
EyebrowLabel.displayName = "EyebrowLabel";
