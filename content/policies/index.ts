import { z } from "zod";
import { privacyPolicy } from "./privacy-policy";
import { termsAndConditions } from "./terms-and-conditions";
import { refundPolicy } from "./refund-policy";
import { deliveryPolicy } from "./delivery-policy";
import { cancellationPolicy } from "./cancellation-policy";
import { endUserLicenseAgreement } from "./end-user-license-agreement";
import { PageHeroSchema, PolicyDocSchema, type PageHero, type PolicyDoc } from "@/lib/schema";

/**
 * Finquanta's 6 published policy documents. Each is a PolicyDoc with a
 * `slug` that matches its route. Revalidated through the Zod array below.
 */
export const policies: readonly PolicyDoc[] = z
  .array(PolicyDocSchema)
  .parse([
    privacyPolicy,
    termsAndConditions,
    refundPolicy,
    deliveryPolicy,
    cancellationPolicy,
    endUserLicenseAgreement,
  ]);

/** Lookup by slug — used by individual policy routes. */
export const policyBySlug: Record<string, PolicyDoc> = Object.fromEntries(
  policies.map((p) => [p.slug, p])
);

export const policiesHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Policies",
  title: "The rules we run Finquanta by.",
  sub: "Six plain-English documents covering privacy, terms, refunds, delivery, cancellation, and the end-user licence for our own TDL modules. Last updated 1 April 2026.",
  gradient: "cream-gold",
});
