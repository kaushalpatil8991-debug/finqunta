"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "./modal-context";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { trackLead } from "@/lib/analytics";

/**
 * SP5 OTP modal. Posts the entered code to /api/otp/verify which verifies
 * against MSG91 (or accepts the `123456` mock when MSG91 env is unset).
 * On success, transitions to the SuccessModal; on failure, shakes + shows
 * a live error.
 */
const RESEND_COOLDOWN_S = 30;
const MOCK_OTP = "123456";

interface OtpModalProps {
  open: boolean;
  phone?: string;
  onClose: () => void;
}

export function OtpModal({ open, phone, onClose }: OtpModalProps) {
  const { open: openModal, state } = useModal();
  const reduced = usePrefersReducedMotion();

  const [digits, setDigits] = React.useState<string[]>(Array(6).fill(""));
  const [error, setError] = React.useState<string | null>(null);
  const [shake, setShake] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(RESEND_COOLDOWN_S);
  const [submitting, setSubmitting] = React.useState(false);
  const inputs = React.useRef<Array<HTMLInputElement | null>>([]);

  const sessionToken = state.sessionToken;
  const isDevMock = state.devMock ?? false;

  // Reset state on each open and start the resend timer.
  React.useEffect(() => {
    if (!open) return;
    setDigits(Array(6).fill(""));
    setError(null);
    setShake(false);
    setCooldown(RESEND_COOLDOWN_S);
    setSubmitting(false);
    requestAnimationFrame(() => inputs.current[0]?.focus());

    const id = window.setInterval(() => {
      setCooldown((c) => (c <= 0 ? 0 : c - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [open]);

  const setDigitAt = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = cleaned;
      return next;
    });
    if (cleaned && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setDigits(next);
    const lastFilled = Math.min(pasted.length, 5);
    inputs.current[lastFilled]?.focus();
  };

  const submit = async (codeOverride?: string) => {
    const code = codeOverride ?? digits.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      triggerShake();
      return;
    }
    if (!sessionToken || !phone) {
      setError("Your session expired. Please start the form again.");
      triggerShake();
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionToken, phone, code }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        if (res.status === 429) {
          setError("Too many attempts. Please wait a minute before retrying.");
        } else if (data.error === "expired") {
          setError("Your session expired. Please start the form again.");
        } else {
          setError("That OTP did not match. Please try again.");
        }
        triggerShake();
        return;
      }

      trackLead({
        source: state.source,
        crmId: (data as { crmId?: string }).crmId,
        devMock: (data as { devMock?: boolean }).devMock,
      });

      setError(null);
      openModal("success", {
        successTitle: "Thanks — we will reach out within one business day",
        successBody: `Your enquiry from +91 ${phone} is logged. A consultant will call to confirm your needs and next steps.`,
      });
    } catch {
      setError("Network error. Please check your connection and retry.");
      triggerShake();
    } finally {
      setSubmitting(false);
    }
  };

  const triggerShake = () => {
    if (reduced) return;
    setShake(true);
    window.setTimeout(() => setShake(false), 350);
  };

  // Auto-submit when all 6 digits are entered.
  React.useEffect(() => {
    if (digits.every((d) => d !== "") && open) submit(digits.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits, open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify your mobile number</DialogTitle>
          <DialogDescription>
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-ink">
              +91 {phone ?? "your number"}
            </span>
            .
            {isDevMock && (
              <>
                {" "}
                For this demo, the code is{" "}
                <span className="rounded bg-primary-100 px-1.5 font-mono text-ink-700">
                  {MOCK_OTP}
                </span>
                .
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center gap-1.5 sm:gap-2"
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setDigitAt(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              aria-label={`Digit ${i + 1} of 6`}
              aria-invalid={!!error}
              className="h-11 w-9 rounded-md border border-cream-200 bg-white text-center text-h4 font-bold text-ink focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-12 sm:w-10 sm:text-h3"
            />
          ))}
        </motion.div>

        <div
          role="alert"
          aria-live="polite"
          className="mt-3 min-h-[1.25rem] text-center text-caption text-warning"
        >
          {error}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            disabled={cooldown > 0}
            onClick={() => setCooldown(RESEND_COOLDOWN_S)}
            className="text-body-sm font-semibold text-primary disabled:cursor-not-allowed disabled:text-ink-300"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
          </button>
          <Button
            onClick={() => submit()}
            variant="primary"
            size="sm"
            disabled={submitting}
          >
            {submitting ? "Verifying…" : "Verify"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
