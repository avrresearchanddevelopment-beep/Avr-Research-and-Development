import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm text-brass-dim">404</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-sm text-slate">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border-t border-line pt-4 text-sm text-ink transition-colors hover:border-ink"
      >
        Back to home
      </Link>
    </section>
  );
}