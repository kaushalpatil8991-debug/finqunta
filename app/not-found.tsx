import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-gutter py-section text-center">
      <p className="text-eyebrow uppercase tracking-[0.12em] text-primary">
        404
      </p>
      <h1 className="text-h1 font-bold text-ink">
        We could not find that page.
      </h1>
      <p className="max-w-prose text-body-lg text-ink-500">
        The link you followed may be outdated, or the page may have moved.
        Head back to the homepage and try again.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-body-sm font-semibold text-white transition-colors hover:bg-primary-600"
      >
        Back to home
      </Link>
    </main>
  );
}
