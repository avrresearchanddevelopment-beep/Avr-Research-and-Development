import Link from "next/link";

const features = [
  {
    title: "Streamlined Interview Automation",
    body: "Intelligent, integrated software agents using tri-modal cross-attention fusion for real-time candidate evaluation.",
    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  },
  {
    title: "Intelligent Document Understanding",
    body: "AI-based systems designed to extract, analyze, and structure complex enterprise data autonomously.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Blockchain EHR Security",
    body: "Dual-layered hybrid blockchain architectures securing Electronic Health Records with AI-enabled data analysis.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
];

export default function HomePage() {
  return (
    <div className="font-sans selection:bg-steel selection:text-white">
      <section className="hero-bg border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pb-28 pt-28 text-center md:pt-36">
          <p className="mb-6 inline-block rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brass-dim shadow-sm">
            AVR Research &amp; Development
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-6xl">
            Intelligent Solutions <br />
            <span className="text-steel">Engineered for Tomorrow</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate">
            We pioneer multi-modal AI systems and enterprise-grade frameworks to solve complex industry challenges, and help students ship real projects.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="rounded-full bg-steel px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-steel/25 transition-all hover:-translate-y-0.5 hover:bg-steel-dim">
              Explore our projects
            </Link>
            <Link href="/services" className="rounded-full border border-line bg-card px-8 py-3.5 text-base font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-steel hover:text-steel">
              Our services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-center text-sm font-medium text-brass-dim">What we do</p>
          <h2 className="mt-3 text-center font-display text-3xl text-ink md:text-4xl">Research that ships</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card card-accent group !p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <h3 className="mb-3 font-display text-xl text-ink">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
