"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NewsletterPayloadSchema, type NewsletterPayload } from "@/lib/schema";
import { useModal } from "@/components/modals/modal-context";
import { getRecaptchaToken } from "@/lib/client/recaptcha";
import { trackNewsletter } from "@/lib/analytics";

export function NewsletterForm() {
  const { open } = useModal();
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterPayload>({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: NewsletterPayload) => {
    const parsed = NewsletterPayloadSchema.safeParse(data);
    if (!parsed.success) return;

    setSubmitting(true);
    setServerError(null);

    const recaptchaToken = await getRecaptchaToken("newsletter");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: parsed.data.email,
          recaptchaToken,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !body.ok) {
        if (res.status === 429) {
          setServerError("Too many attempts right now. Please retry in a minute.");
        } else {
          setServerError("We could not subscribe you just now. Please retry.");
        }
        return;
      }

      reset();
      trackNewsletter((body as { devMock?: boolean }).devMock);
      open("success", {
        successTitle: "Thanks — please check your inbox",
        successBody:
          "We sent a confirmation email. Click the link inside to confirm your subscription.",
      });
    } catch {
      setServerError("Network error. Please check your connection and retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-start"
      noValidate
    >
      <div className="flex-1">
        <Label htmlFor="newsletter-email" className="sr-only">
          Email address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@yourcompany.in"
          aria-invalid={!!errors.email || !!serverError}
          aria-describedby={
            errors.email
              ? "newsletter-email-error"
              : serverError
                ? "newsletter-server-error"
                : undefined
          }
          {...register("email", {
            required: "Enter your email address",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p
            id="newsletter-email-error"
            role="alert"
            className="mt-1 text-caption text-warning"
          >
            {errors.email.message}
          </p>
        )}
        {serverError && !errors.email && (
          <p
            id="newsletter-server-error"
            role="alert"
            className="mt-1 text-caption text-warning"
          >
            {serverError}
          </p>
        )}
      </div>
      <Button type="submit" disabled={submitting} className="sm:w-auto">
        {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {submitting ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
