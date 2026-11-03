import * as React from "react";
import { cn } from "@/lib/utils";

export const EyebrowLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-block text-body-sm font-bold text-primary",
      className
    )}
    {...props}
  />
));
EyebrowLabel.displayName = "EyebrowLabel";
