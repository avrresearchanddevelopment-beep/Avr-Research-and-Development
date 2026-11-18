"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm text-brass-dim">Something went wrong</p>
      <h1 className="mt-2 font-display text-3xl text-ink">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate">
        An unexpected error occurred. You can try again, and if it keeps
        happening please contact us.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 border-t border-line pt-4 text-sm text-ink transition-colors hover:border-ink"
      >
        Try again
      </button>
    </section>
  );
}