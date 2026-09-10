"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Loader2 } from "lucide-react";

import { CompoundCta } from "@/components/ui/compound-cta";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { FactList, FactRow } from "@/components/ui/fact-row";
import { PlaceholderFlag } from "@/components/ui/placeholder-flag";
import { useModal } from "@/components/modals/modal-context";
import { submitLead } from "@/app/actions/lead";
import { getRecaptchaToken } from "@/lib/client/recaptcha";
import { captureUtm } from "@/lib/client/utm";
import { LeadPayloadSchema, type LeadPayload } from "@/lib/schema";
import { stripPhone } from "@/lib/utils";
import { cloudBullets, cloudIntro } from "@/content/cloud";

/**
 * S11 hairline spec rows + S34 chromatic enquiry panel.
 *
 * Two things changed structurally here (FQ/design-to-section-map.md §3.1 row 14):
 *
 * 1. The six identical check bullets are gone. A row of ticks reads as a
 *    brochure; a hairline label/value table reads as a specification, which is
 *    what an SME owner comparing hosting is actually shopping for. No boxes,
 *    no icons, no zebra striping — the border-top hairline is the whole chrome.
 *    The 400×340 clip-art SVG (and its invalid <Cloud>-inside-<svg> nesting)
 *    is deleted; the panel takes that column.
 *
 * 2. This band now hosts **the site's one inline enquiry surface** (build order
 *    #10). 100% of conversion previously ran through an overlay with no
 *    shareable URL and no no-JS fallback. The panel is a real form in the
 *    scroll body, posting to the same `submitLead` action the modal LeadForm
 *    uses and handing off to the same OTP → success chain — no new endpoint.
 *
 * Colour contract for the panel: plum ground, **white** text (5.89:1), body at
 * 16px. Never cream on violet (2.27:1). The global `:focus-visible` ring is
 * plum, which is invisible on plum, so every control inside the panel
 * re-declares a white ring.
 */

/**
 * The map is explicit that an uptime figure is an SLA and a data-centre claim
 * is a DPDP-relevant representation: both ship as visible TKs until the client
 * signs them off, not as copy. Keyed off the content titles so `content/cloud.ts`
 * stays untouched.
 */
const NEEDS_SIGN_OFF = new Set<string>([
  "Auto backup & recovery",
  "99.9% uptime",
]);

const SIGN_OFF_TITLE =
  "Unverified service commitment — this uptime, retention and data-centre claim needs client sign-off before it goes to production.";

export function TallyOnCloud() {
  return (
    <section
      id="cloud"
      aria-labelledby="cloud-heading"
      className="border-b border-hairline bg-cream py-section-mob md:py-section"
    >
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        {/* S38 section header — eyebrow, lead, sub. */}
        <div className="mb-8 max-w-[56ch] md:mb-[34px]">
          <EyebrowLabel className="text-ink-500">Tally on Cloud</EyebrowLabel>
          <h2
            id="cloud-heading"
            className="mt-3 text-balance font-serif text-h1-mob font-semibold text-ink md:text-h1"
          >
            Your Tally, hosted properly.
          </h2>
          <p className="mt-2.5 text-body text-ink-500">{cloudIntro}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* S11 — the spec table. */}
          <FactList>
            {cloudBullets.map((bullet) => (
              <FactRow key={bullet.title} label={bullet.title}>
                {bullet.body}
                {NEEDS_SIGN_OFF.has(bullet.title) ? (
                  <>
                    {" "}
                    <PlaceholderFlag title={SIGN_OFF_TITLE}>
                      TK — needs sign-off
                    </PlaceholderFlag>
                  </>
                ) : null}
              </FactRow>
            ))}
          </FactList>

          <CloudEnquiryPanel />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 * S34 — the chromatic panel. The site's one inline enquiry surface.
 * ═══════════════════════════════════════════════════════════════════════ */

const INPUT_CLASS = [
  "w-full rounded-md border border-white/30 bg-white/15",
  "px-[14px] py-3 text-[15px] text-white placeholder:text-white/70",
  "focus:border-white focus:bg-white/20",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
].join(" ");

const ERROR_CLASS = "m-0 text-body-sm font-semibold text-accent-sand-100";

function CloudEnquiryPanel() {
  const { open } = useModal();
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.input<typeof LeadPayloadSchema>>({
    resolver: zodResolver(LeadPayloadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      requirement: "",
      consent: false,
      source: "cloud",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: LeadPayload) => {
    setSubmitting(true);
    setServerError(null);

    const recaptchaToken = await getRecaptchaToken("lead");
    const utm = captureUtm();

    const result = await submitLead({ ...data, recaptchaToken, utm });

    setSubmitting(false);

    if (!result.ok) {
      setServerError(errorMessage(result.error));
      return;
    }

    // Same hand-off the modal LeadForm makes — OTP verifies the number, then
    // the success modal closes the loop. The capture happened in the page.
    open("otp", {
      phone: data.phone,
      source: "cloud",
      sessionToken: result.sessionToken,
      devMock: result.devMock,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit as never)}
      noValidate
      aria-busy={submitting}
      aria-labelledby="cloud-panel-heading"
      className="flex flex-col gap-4 rounded-xl bg-primary p-6 sm:p-[30px] lg:sticky lg:top-[92px]"
    >
      <div>
        <h3
          id="cloud-panel-heading"
          className="text-balance font-serif text-[23px] font-semibold leading-[1.15] text-white"
        >
          See it on your own data.
        </h3>
        <p className="mt-2 text-body leading-[1.55] text-white/90">
          A 30-minute call. We load a copy of your company file and you drive.
        </p>
      </div>

      <PanelField id="cf-name" label="Name" error={errors.name?.message}>
        <input
          id="cf-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={INPUT_CLASS}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          {...register("name")}
        />
      </PanelField>

      <PanelField id="cf-phone" label="Phone" error={errors.phone?.message}>
        <div className="flex overflow-hidden rounded-md border border-white/30 bg-white/15 focus-within:border-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white">
          <span className="inline-flex items-center bg-white/15 px-3 text-[15px] font-semibold text-white/85">
            +91
          </span>
          <input
            id="cf-phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            placeholder="9912037912"
            className="w-full flex-1 bg-transparent px-[14px] py-3 text-[15px] text-white placeholder:text-white/70 focus:outline-none"
            aria-invalid={!!errors.phone}
            aria-describedby={
              errors.phone ? "cf-phone-hint cf-phone-error" : "cf-phone-hint"
            }
            {...register("phone", {
              onChange: (e) => setValue("phone", stripPhone(e.target.value)),
            })}
          />
        </div>
        <p id="cf-phone-hint" className="m-0 text-body-sm text-white/85">
          We text a 6-digit code to confirm this number.
        </p>
      </PanelField>

      <PanelField id="cf-email" label="Email" error={errors.email?.message}>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          placeholder="you@yourcompany.in"
          className={INPUT_CLASS}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          {...register("email")}
        />
      </PanelField>

      <PanelField
        id="cf-requirement"
        label="What can we help with?"
        error={errors.requirement?.message}
      >
        <textarea
          id="cf-requirement"
          rows={3}
          placeholder="How many users, which TallyPrime release, what you run today…"
          className={`${INPUT_CLASS} resize-y`}
          aria-invalid={!!errors.requirement}
          aria-describedby={errors.requirement ? "cf-requirement-error" : undefined}
          {...register("requirement")}
        />
      </PanelField>

      <div className="flex items-start gap-3">
        <input
          id="cf-consent"
          type="checkbox"
          className="mt-0.5 h-[18px] w-[18px] flex-none accent-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "cf-consent-error" : undefined}
          {...register("consent")}
        />
        <label
          htmlFor="cf-consent"
          className="text-body-sm leading-snug text-white/90"
        >
          I agree to be contacted by Finquanta about this enquiry and have read
          the privacy and terms.
        </label>
      </div>
      {errors.consent && (
        <p id="cf-consent-error" role="alert" className={ERROR_CLASS}>
          {errors.consent.message}
        </p>
      )}

      <CompoundCta
        tone="invert"
        type="submit"
        disabled={submitting}
        className="w-full justify-between"
        icon={
          submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            "→"
          )
        }
      >
        {submitting ? "Sending…" : "Book the demo"}
      </CompoundCta>

      {serverError && (
        <p role="alert" className={ERROR_CLASS}>
          {serverError}
        </p>
      )}

      <p className="m-0 text-body-sm text-white/85">
        No obligation · we reply within one working day
      </p>
    </form>
  );
}

interface PanelFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function PanelField({ id, label, error, children }: PanelFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11.5px] font-bold uppercase tracking-[0.07em] text-white/85"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className={ERROR_CLASS}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Same code→sentence map the modal form uses; the panel must never show a raw code. */
function errorMessage(code?: string): string {
  switch (code) {
    case "rate-limited":
      return "Too many attempts right now. Please try again in a minute.";
    case "recaptcha-failed":
      return "We could not verify this submission. Please refresh and retry.";
    case "otp-send-failed":
      return "We could not send the code. Please confirm your mobile number and retry.";
    case "invalid-payload":
      return "Something is not quite right with the form. Check the fields and retry.";
    default:
      return "Something went wrong and this was not sent. Please try again in a moment.";
  }
}
