import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-cream-200 bg-white px-3 text-body text-ink placeholder:text-ink-300",
        "transition-colors duration-[var(--motion-fast)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "aria-[invalid=true]:border-warning aria-[invalid=true]:focus-visible:outline-warning",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[100px] w-full rounded-md border border-cream-200 bg-white px-3 py-2 text-body text-ink placeholder:text-ink-300",
      "transition-colors duration-[var(--motion-fast)]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      "aria-[invalid=true]:border-warning aria-[invalid=true]:focus-visible:outline-warning",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
