"use client";

import { useCms } from "@/lib/useCms";
import { assetUrl, telHref } from "@/lib/cms";

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

      {/* Leadership ? MD & CEO */}
      <div className="mt-12 max-w-3xl card card-accent !p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-4 h-52 sm:h-56 md:h-60 bg-black/5">
            <img
              src={assetUrl("/team/ceo.jpg")}
              alt="Annapureddy Naresh - Managing Director & CEO"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="md:col-span-8 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brass-dim">
              Leadership
            </p>
            <h2 className="mt-1.5 font-display text-xl text-ink md:text-2xl">
              Annapureddy Naresh
            </h2>
            <p className="mt-1 text-sm font-semibold text-brass-dim">
              Managing Director &amp; Chief Executive Officer
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Leading AVR Research &amp; Development Pvt. Ltd. with a focus on applied AI,
              embedded engineering, and practical R&amp;D mentorship that bridges academic
              innovation with real-world industry deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
