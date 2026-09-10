"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-sticky flex justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none flex-nowrap items-center gap-0.5", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

const triggerStyle =
  "inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-md bg-transparent px-2.5 text-body-sm font-semibold text-ink-700 transition-[background-color,color,box-shadow] duration-[var(--motion-base)] ease-[var(--ease-out)] hover:bg-primary-50 hover:text-ink hover:shadow-[inset_0_-2px_0_var(--color-primary)] data-[state=open]:bg-primary-50 data-[state=open]:shadow-[inset_0_-2px_0_var(--color-primary)] data-[active]:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(triggerStyle, "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-px h-3.5 w-3.5 transition duration-[var(--motion-base)] group-data-[state=open]:rotate-180"
      aria-hidden
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName =
  NavigationMenuPrimitive.Trigger.displayName;

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full md:absolute md:w-auto",
      "data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in",
      "data-[motion=from-start]:slide-in-from-left-4 data-[motion=from-end]:slide-in-from-right-4",
      "data-[motion=to-start]:slide-out-to-left-4 data-[motion=to-end]:slide-out-to-right-4",
      "data-[motion=from-start]:fade-in-0 data-[motion=from-end]:fade-in-0",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName =
  NavigationMenuPrimitive.Content.displayName;

export const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  // `position: fixed` escapes the narrow, centered NavigationMenu root (whose
  // `left-0` made the wide mega panel shoot off-screen over the CTAs). The
  // header carries `backdrop-filter`, so it is the containing block for this
  // fixed child — `top-full` therefore resolves to the header's own bottom
  // edge and tracks scroll + condense + the (non-sticky) utility-bar offset
  // with no JS. `inset-x-0` spans the full-width header so the panel centers
  // on the viewport and is clamped to never overflow.
  <div className="fixed inset-x-0 top-full z-overlay flex justify-center px-4">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        "origin-top relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg bg-white shadow-[var(--shadow-card-hover)]",
        // Size to content (mega ≈ 1080px, dropdown ≈ 240px) but never exceed the viewport.
        "max-w-[calc(100vw-2rem)] md:w-[var(--radix-navigation-menu-viewport-width)]",
        "transition-[width,height] duration-[var(--motion-base)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

export { triggerStyle as navigationMenuTriggerStyle };
