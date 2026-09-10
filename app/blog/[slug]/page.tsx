import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBand } from "@/components/page/section-band";
import { PostHero } from "@/components/page/post-hero";
import { PostCard } from "@/components/page/post-card";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPostSchema } from "@/lib/seo";
import { blogPostBySlug, blogPosts, blogSlugs } from "@/content/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      tags: [...post.tags],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  const related = blogPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <PostHero
        title={post.title}
        date={post.date}
        author={post.author}
        readMinutes={post.readMinutes}
        tags={post.tags}
        gradient={post.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <SectionBand tone="cream">
        <article className="mx-auto max-w-3xl">
          <Post />
        </article>
      </SectionBand>

      {related.length > 0 && (
        <SectionBand tone="white">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="Related reading" title="Keep going" />
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All posts
              </Link>
            </Button>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} className="relative">
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </SectionBand>
      )}

      <CtaBand
        title="Want this in your inbox?"
        sub="Monthly newsletter — one email, one good idea, no spam. Subscribe at the bottom of any page."
        source="enquiry"
        primaryLabel="Talk to an expert"
      />
    </>
  );
}
