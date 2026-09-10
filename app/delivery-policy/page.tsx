import type { Metadata } from "next";
import { PolicyLayout } from "@/components/page/policy-layout";
import { deliveryPolicy } from "@/content/policies/delivery-policy";

export const metadata: Metadata = {
  title: deliveryPolicy.title,
  description: deliveryPolicy.summary,
  alternates: { canonical: `/${deliveryPolicy.slug}` },
};

export default function DeliveryPolicyPage() {
  return <PolicyLayout doc={deliveryPolicy} />;
}
