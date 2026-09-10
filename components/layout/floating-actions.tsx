"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompoundCta } from "@/components/ui/compound-cta";
import { useModal } from "@/components/modals/modal-context";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { site } from "@/lib/site";

/**
 * Bottom-right floating action cluster — S15 overlay plane carrying one S10
 * compound CTA. See `.fab` in prototype/index.html and the "Floating action
 * cluster" row of FQ/design-to-section-map.md §3.0.
 *
 * THE SHAPE: one dominant filled control (`Talk to an expert`) with two
 * subordinate 50px circular satellites (WhatsApp, Call) to its left. There is
 * no expand/collapse menu any more: a speed-dial hid the primary action behind
 * a second tap and gave the three destinations equal weight, which is the
 * opposite of what this plate is for.
 *
 * OPAQUE, NEVER GLASS. This cluster scrolls over cream, white and ink inside a
 * single page, so every surface here is a solid colour — a translucent or
 * blurred plane is unreadable over at least one of the three.
 *
 * ONE OWNER FOR THIS CORNER. The sticky cloud promo that used to share it is
 * retired (its offer lives in the mega-menu featured cell and the foot of the
 * mobile sheet), so the `lg:right-28` nudge that dodged it is gone, along with
 * its 2000ms timer and its localStorage dismissal key. Nothing else may be
 * positioned into this corner.
 *
 * UNCHANGED, DELIBERATELY: the cluster unmounts wholesale while any modal is
 * open (one overlay plane at a time — never a stacked FAB over a dialog), and
 * every entrance and hover motion is gated on `usePrefersReducedMotion`.
 *
 * KNOWN GAP, NOT FIXABLE FROM THIS FILE: the prototype pairs this cluster with
 * `body { padding-bottom: 96px }` so it cannot permanently occlude the last
 * band. That declaration belongs to app/globals.css, which another agent owns.
 */
export function FloatingActions() {
  const { state, open: openModal } = useModal();
  const reduced = usePrefersReducedMotion();

  // Hide the cluster entirely while any modal is up.
  if (state.type !== null) return null;

  return (
    <motion.div
      role="region"
      aria-label="Quick contact"
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }
      }
      className="fixed bottom-4 right-4 z-fab flex items-center gap-2.5 sm:bottom-6 sm:right-6"
    >
      <Button
        variant="ghost"
        size="iconRound"
        aria-label="WhatsApp us"
        asChild
        className={SATELLITE}
      >
        <a href={site.whatsapp.url} target="_blank" rel="noreferrer noopener">
          <MessageCircle className="h-5 w-5" aria-hidden />
        </a>
      </Button>

      <Button
        variant="ghost"
        size="iconRound"
        aria-label="Call us"
        asChild
        className={SATELLITE}
      >
        <a href={`tel:${site.phone.tel}`}>
          <Phone className="h-5 w-5" aria-hidden />
        </a>
      </Button>

      {/* aria-label is not belt-and-braces: below 640px the label span is
          display:none, which removes it from the accessibility tree too, so
          this is the button's only accessible name at that width. */}
      <CompoundCta
        aria-label="Talk to an expert"
        onClick={() => openModal("talk")}
        className={
          "shadow-float pl-2 pr-2 sm:pl-5 sm:pr-2 " +
          "[&_[data-cta-label]]:hidden sm:[&_[data-cta-label]]:inline " +
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        }
      >
        Talk to an expert
      </CompoundCta>
    </motion.div>
  );
}

/**
 * The subordinate satellite: a 50px opaque circle on the overlay plane —
 * white ground, hairline edge, ink glyph, `shadow-float`. Sized past the 44px
 * touch minimum because the cluster is thumb-reachable chrome, not a row
 * control. Ghost supplies the geometry; the colours are the prototype's.
 */
const SATELLITE =
  "h-[50px] w-[50px] border border-hairline-strong bg-white text-ink " +
  "shadow-float transition-transform duration-[var(--motion-base)] " +
  "hover:-translate-y-0.5 hover:bg-white " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";
