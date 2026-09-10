import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { BlogFilter } from "@/components/page/blog-filter";
import { CtaBand } from "@/components/page/cta-band";
import { blogPosts, blogTags } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Finquanta blog — practical writing on Tally, GST, MIS, cloud migration, add-ons, and AMC partnerships for Indian SMEs.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Finquanta blog"
        title="Practical writing on Tally, GST, and SME operations."
        sub="No sales pitches, no clickbait — just writing that answers the questions we field most often from our customers. Filter by tag below."
        gradient="plum"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          eyebrow={`${blogPosts.length} posts`}
          title="Latest writing."
        />
        <div className="mt-10">
          <BlogFilter posts={blogPosts} tags={blogTags} />
        </div>
      </SectionBand>

      <CtaBand
        title="Got a Tally question we should write about?"
        sub="Tell us what's on your mind — posts that answer real customer questions rank highest in our queue."
        source="enquiry"
        primaryLabel="Suggest a topic"
      />
    </>
  );
}
