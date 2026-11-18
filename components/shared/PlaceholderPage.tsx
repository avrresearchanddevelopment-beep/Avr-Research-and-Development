type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Shared shell for sections whose real content/data model hasn't been
 * built yet. Swap this out page-by-page as each section is implemented —
 * do not fork this into copies.
 */
export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">{eyebrow}</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink md:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-md text-base text-slate">{description}</p>
    </section>
  );
}
