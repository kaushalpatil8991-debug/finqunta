"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

interface ComingSoonTooltipProps {
  children: React.ReactNode;
  /** Custom message; defaults to "Detailed page coming in the next release". */
  label?: string;
  /** Whether to show the small sand-coloured dot indicator on the trigger. */
  withDot?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function ComingSoonTooltip({
  children,
  label = "Detailed page coming in the next release",
  withDot = true,
  side = "top",
  className,
}: ComingSoonTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Slot
            className={cn(
              "relative",
              withDot &&
                "after:absolute after:-right-1.5 after:-top-0.5 after:h-1.5 after:w-1.5 after:rounded-full after:bg-accent-sand",
              className
            )}
          >
            {children}
          </Slot>
        </TooltipTrigger>
        <TooltipContent side={side}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
