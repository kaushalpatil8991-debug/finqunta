import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

/**
 * Global MDX component overrides — maps HTML elements produced by MDX to
 * Ivory Pearl styled variants. Loaded by @next/mdx for every .mdx file.
 *
 * Required at the project root for App Router + @next/mdx to compile.
 */
const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-12 mb-4 text-display-mob font-bold leading-tight tracking-tight text-ink md:text-h1"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 mb-4 scroll-mt-28 text-h2 font-bold tracking-tight text-ink"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 scroll-mt-28 text-h3 font-semibold text-ink"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mt-6 mb-2 scroll-mt-28 text-h4 font-semibold text-ink-700"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-body leading-[1.7] text-ink-500">{children}</p>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = typeof href === "string" && /^https?:/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
          {...props}
        >
          {children}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="my-4 list-disc pl-6 text-body text-ink-500 marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal pl-6 text-body text-ink-500 marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="my-1.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-primary bg-primary-50 py-3 pl-5 pr-4 text-body italic text-ink-700">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded-sm bg-cream-100 px-1.5 py-0.5 text-body-sm text-ink">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-cream-200 bg-ink p-5 text-body-sm text-cream">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-cream-200" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-cream-200">
      <table className="w-full text-body-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-cream-100 text-left text-ink">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-cream-200 px-4 py-2.5 text-ink-500">
      {children}
    </td>
  ),
  img: ({ alt, ...rest }) => (
    <Image
      sizes="100vw"
      className="my-8 w-full rounded-lg border border-cream-200"
      width={1280}
      height={720}
      style={{ width: "100%", height: "auto" }}
      {...(rest as Omit<ImageProps, "alt">)}
      alt={alt ?? ""}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
