"use client";

import { CalendarClock, PhoneCall } from "lucide-react";
import { useModal } from "@/components/modals/modal-context";

/** The two contact routes that always work: book a call, or ask for a callback. */
export function ContactActions() {
  const { open } = useModal();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => open("talk", { source: "talk-to-expert" })}
        className="flex items-start gap-3 rounded-lg bg-[var(--fq-card)] p-5 text-left shadow-[var(--shadow-card)] transition-[background-color,transform,scale] hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <span>
          <strong className="block text-body font-bold text-ink">Book a 20-minute call</strong>
          <span className="text-body-sm text-ink-500">Pick a time that suits you. We call you.</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => open("callback", { source: "callback" })}
        className="flex items-start gap-3 rounded-lg bg-[var(--fq-card)] p-5 text-left shadow-[var(--shadow-card)] transition-[background-color,transform,scale] hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <span>
          <strong className="block text-body font-bold text-ink">Request a callback</strong>
          <span className="text-body-sm text-ink-500">Leave your number and we ring you back.</span>
        </span>
      </button>
    </div>
  );
}
