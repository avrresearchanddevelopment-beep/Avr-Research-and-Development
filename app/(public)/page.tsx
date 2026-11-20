"use client";

import { SmartLink } from "@/components/shared/SmartLink";
import { ICONS, ICON_ORDER } from "@/components/public/icons";
import { useCms } from "@/lib/useCms";

export default function HomePage() {
  const { cms, s } = useCms();

  return (
    <div className="font-sans selection:bg-steel selection:text-white">
      <section className="hero-bg border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pb-28 pt-28 text-center md:pt-36">
          <p className="mb-6 inline-block rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brass-dim shadow-sm">
            {s("hero_badge", "AVR Research & Development")}
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-6xl">
            {s("hero_title_1", "Intelligent Solutions")} <br />
            <span className="text-steel">{s("hero_title_2", "Engineered for Tomorrow")}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate">{s("hero_subtitle")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {s("hero_button_1_label") && (
              <SmartLink
                href={s("hero_button_1_url", "/projects")}
                className="rounded-full bg-steel px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-steel/25 transition-all hover:-translate-y-0.5 hover:bg-steel-dim"
              >
                {s("hero_button_1_label")}
              </SmartLink>
            )}
            {s("hero_button_2_label") && (
              <SmartLink
                href={s("hero_button_2_url", "/services")}
                className="rounded-full border border-line bg-card px-8 py-3.5 text-base font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-steel hover:text-steel"
              >
                {s("hero_button_2_label")}
              </SmartLink>
            )}
          </div>
        </div>
      </section>

      {cms.highlights.length > 0 && (
        <section className="section-alt">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="text-center text-sm font-medium text-brass-dim">{s("features_eyebrow", "What we do")}</p>
            <h2 className="mt-3 text-center font-display text-3xl text-ink md:text-4xl">
              {s("features_title", "Research that ships")}
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cms.highlights.map((f, i) => (
                <div key={`${f.title}-${i}`} className="card card-accent group !p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-6 w-6 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={ICONS[f.icon] ?? ICONS[ICON_ORDER[i % ICON_ORDER.length]]}
                      />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-display text-xl text-ink">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
