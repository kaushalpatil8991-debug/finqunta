"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";
import { useModal } from "@/components/modals/modal-context";
import type { PricingTier } from "@/lib/schema";

export function TierCard({ tier }: { tier: PricingTier }) {
  const { open } = useModal();
  return (
    <li
      className={cn(
        "relative flex h-full flex-col rounded-lg border bg-white p-8 shadow-[var(--shadow-card)]",
        tier.recommended
          ? "border-primary bg-primary-50/50 ring-1 ring-primary"
          : "border-cream-200"
      )}
    >
      {tier.recommended && (
        <div className="absolute -top-3 right-6">
          <Chip tone="plum">
            <Sparkles className="h-3 w-3" aria-hidden />
            Most popular
          </Chip>
        </div>
      )}
      <h3 className="text-h3 font-semibold text-ink">{tier.name}</h3>
      <p className="mt-2 text-body-sm text-ink-500">{tier.blurb}</p>
      <p className="mt-6 text-h2 font-bold text-ink tabular-nums-strict">
        {tier.priceNote}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-body-sm text-ink-700">
            <span
              aria-hidden
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        size="lg"
        variant={tier.recommended ? "primary" : "outline"}
        className="mt-8 w-full"
        onClick={() => open("enquiry", { source: "enquiry" })}
      >
        {tier.ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Button>
    </li>
  );
}
