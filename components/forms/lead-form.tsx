"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  LeadPayloadSchema,
  type LeadPayload,
  type LeadSource,
} from "@/lib/schema";
import { useModal } from "@/components/modals/modal-context";
import { stripPhone } from "@/lib/utils";
import { submitLead } from "@/app/actions/lead";
import { getRecaptchaToken } from "@/lib/client/recaptcha";
import { captureUtm } from "@/lib/client/utm";

interface LeadFormProps {
  source: LeadSource;
  /** Override the requirement field's placeholder for source-specific copy. */
  requirementPlaceholder?: string;
  submitLabel?: string;
}

export function LeadForm({
  source,
  requirementPlaceholder = "Tell us a bit about what you need…",
  submitLabel = "Continue",
}: LeadFormProps) {
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
      source,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: LeadPayload) => {
    setSubmitting(true);
    setServerError(null);

    const recaptchaToken = await getRecaptchaToken("lead");
    const utm = captureUtm();

    const result = await submitLead({
      ...data,
      recaptchaToken,
      utm,
    });

    setSubmitting(false);

    if (!result.ok) {
      setServerError(errorMessage(result.error));
      return;
    }
    open("otp", {
      phone: data.phone,
      source,
      sessionToken: result.sessionToken,
      devMock: result.devMock,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit as never)}
      className="flex flex-col gap-3 sm:gap-4"
      noValidate
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Field id="name" label="Your name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Sandip Utekar"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field id="phone" label="Mobile number" error={errors.phone?.message}>
          <div className="flex h-11 w-full overflow-hidden rounded-md border border-cream-200 bg-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
            <span className="inline-flex items-center bg-cream-100 px-3 text-body-sm font-semibold text-ink-500">
              +91
            </span>
            <input
              id="phone"
              type="tel"
              autoComplete="tel-national"
              placeholder="9912037912"
              maxLength={10}
              inputMode="numeric"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="flex-1 bg-transparent px-3 text-body text-ink placeholder:text-ink-300 focus:outline-none"
              {...register("phone", {
                onChange: (e) => setValue("phone", stripPhone(e.target.value)),
              })}
            />
          </div>
        </Field>
      </div>

      <Field id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourcompany.in"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field
        id="requirement"
        label="What can we help with?"
        error={errors.requirement?.message}
      >
        <Textarea
          id="requirement"
          rows={4}
          placeholder={requirementPlaceholder}
          aria-invalid={!!errors.requirement}
          aria-describedby={errors.requirement ? "requirement-error" : undefined}
          {...register("requirement")}
        />
      </Field>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          {...register("consent")}
          onCheckedChange={(checked) =>
            setValue("consent", checked === true, { shouldValidate: true })
          }
        />
        <label
          htmlFor="consent"
          className="text-body-sm leading-snug text-ink-500"
        >
          I agree to be contacted by Finquanta about this enquiry and have read
          the privacy and terms.
        </label>
      </div>
      {errors.consent && (
        <p
          id="consent-error"
          role="alert"
          className="-mt-2 text-caption text-warning"
        >
          {errors.consent.message}
        </p>
      )}

      {serverError && (
        <p role="alert" className="text-caption text-warning">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="mt-2 w-full">
        {submitting && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        )}
        {submitting ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

function errorMessage(code?: string): string {
  switch (code) {
    case "rate-limited":
      return "Too many attempts right now. Please try again in a minute.";
    case "recaptcha-failed":
      return "We could not verify this submission. Please refresh and retry.";
    case "otp-send-failed":
      return "We could not send the OTP. Please confirm your mobile number and retry.";
    case "invalid-payload":
      return "Something is not quite right with the form. Check the fields and retry.";
    default:
      return "Something went wrong. Please try again in a moment.";
  }
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-caption text-warning">
          {error}
        </p>
      )}
    </div>
  );
}
