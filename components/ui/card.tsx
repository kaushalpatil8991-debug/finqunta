import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-transparent bg-[var(--fq-card)] shadow-[var(--shadow-card)]",
        hover &&
          "transition-[transform,scale,box-shadow,border-color,background-color,color,opacity] duration-[var(--motion-base)] hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardBody.displayName = "CardBody";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-h3 font-semibold text-ink", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";
