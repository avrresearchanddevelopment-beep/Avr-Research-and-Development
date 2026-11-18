export default function Loading() {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-24"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-slate">Loading…</p>
    </section>
  );
}