"use client";

import { useCms } from "@/lib/useCms";

export default function AboutPage() {
  const { cms, s } = useCms();
  const { paragraphs, points } = cms.about;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">{s("about_eyebrow", "About Us")}</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink md:text-5xl">
        {s("about_title", "About AVR Research & Development Pvt Ltd")}
      </h1>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="max-w-xl space-y-5 text-base leading-relaxed text-slate">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {points.length > 0 && (
          <ul className="flex flex-col gap-5">
            {points.map((point, i) => (
              <li key={i} className="card card-accent !p-5 text-sm text-ink">
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
