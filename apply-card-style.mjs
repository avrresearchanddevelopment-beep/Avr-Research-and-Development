// Run from the project root:  node apply-card-style.mjs
// Adds a shared card style + applies it site-wide, recolors home + projects pages.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const P = (...a) => path.join(root, ...a);
const read = (f) => fs.readFileSync(P(f), "utf8").replace(/^﻿/, "");
const write = (f, s) => { fs.mkdirSync(path.dirname(P(f)), { recursive: true }); fs.writeFileSync(P(f), s, "utf8"); };
let ok = 0, warn = 0;
function rep(f, from, to, all = true) {
  if (!fs.existsSync(P(f))) { console.log("MISSING  ", f); warn++; return; }
  let s = read(f);
  if (!s.includes(from)) { console.log("not found", f, "->", from.slice(0, 50)); warn++; return; }
  s = all ? s.split(from).join(to) : s.replace(from, to);
  write(f, s); ok++; console.log("patched  ", f);
}

/* ---------- 1. globals.css ---------- */
{
  let css = read("app/globals.css");
  if (!css.includes("/* ==== AVR card system ==== */")) {
    css = css.replace("--line: #e4ddd0;", "--line: #e4ddd0;\n  --card: #ffffff;\n  --paper-deep: #efe8db;");
    css = css.replace("--color-line: var(--line);", "--color-line: var(--line);\n  --color-card: var(--card);\n  --color-paper-deep: var(--paper-deep);");
    css += `

/* ==== AVR card system ==== */
.card {
  position: relative;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 1rem;
  padding: 1.75rem;
  box-shadow: 0 1px 2px rgba(59, 36, 22, 0.06), 0 10px 28px -14px rgba(59, 36, 22, 0.22);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  border-color: var(--steel);
  box-shadow: 0 2px 4px rgba(59, 36, 22, 0.06), 0 22px 44px -18px rgba(47, 106, 135, 0.38);
}
.card-flush { padding: 0; overflow: hidden; }
.card-flush img { transition: transform 0.5s ease; }
.card-flush:hover img { transform: scale(1.05); }
.card-accent::before {
  content: "";
  position: absolute; left: 0; right: 0; top: 0; height: 4px;
  border-radius: 1rem 1rem 0 0;
  background: linear-gradient(90deg, var(--steel), var(--brass));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s ease;
}
.card-accent:hover::before { transform: scaleX(1); }
.section-alt { background: var(--paper-deep); }
.hero-bg {
  background:
    radial-gradient(60rem 28rem at 85% -10%, rgba(47, 106, 135, 0.18), transparent 60%),
    radial-gradient(40rem 24rem at 0% 100%, rgba(138, 85, 48, 0.14), transparent 60%),
    var(--paper);
}
`;
    write("app/globals.css", css); ok++; console.log("patched   app/globals.css");
  } else console.log("globals.css already has card system");
}

/* ---------- 2. simple card swaps ---------- */
const sm = 'className="rounded-sm border border-line p-5"';
for (const f of ["app/(public)/products/page.tsx", "app/(public)/portfolio/page.tsx", "components/public/ModulePage.tsx"]) {
  rep(f, sm, 'className="card card-accent"');
}
rep("app/(public)/products/page.tsx", 'mt-12 grid gap-4', 'mt-14 grid gap-7');
rep("app/(public)/portfolio/page.tsx", 'mt-12 grid gap-4', 'mt-14 grid gap-7');
rep("components/public/ModulePage.tsx", 'mt-10 grid gap-6', 'mt-14 grid gap-7');
rep("app/(public)/gallery/page.tsx", 'className="overflow-hidden rounded-sm border border-line"', 'className="card card-flush"');
rep("app/(public)/gallery/page.tsx", 'mt-12 grid gap-4', 'mt-14 grid gap-7');
rep("app/(public)/gallery/page.tsx", 'className="p-3 text-sm text-slate"', 'className="p-4 text-sm text-slate"');
rep("components/public/ModulePage.tsx", 'className="mt-1 font-display text-lg text-ink"', 'className="mt-2 font-display text-lg text-ink"');

/* services */
rep("app/(public)/services/page.tsx", 'className="group relative overflow-hidden rounded-xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-steel hover:shadow-lg hover:shadow-steel/10"', 'className="card card-accent group overflow-hidden"');
rep("app/(public)/services/page.tsx", '              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-steel transition-transform duration-300 group-hover:scale-x-100" />\n', '');
rep("app/(public)/services/page.tsx", 'border-line bg-paper p-1"', 'border-line bg-card p-1 shadow-sm"');
rep("app/(public)/services/page.tsx", 'border-dashed border-line bg-paper px-8', 'border-dashed border-line bg-card px-8');
rep("app/(public)/services/page.tsx", 'mt-12 grid gap-6', 'mt-14 grid gap-7');

/* contact */
rep("components/public/ContactForm.tsx", 'className="rounded-sm border border-line p-6"', 'className="card hover:!translate-y-0 hover:!border-line p-8 md:p-10"');
rep("components/public/ContactForm.tsx", 'border-line bg-paper px-3 py-2', 'border-line bg-card px-3 py-2.5');

/* about: bullet list into cards */
rep("app/(public)/about/page.tsx", 'className="border-t border-line pt-4 text-sm text-ink"', 'className="card card-accent !p-5 text-sm text-ink"');
rep("app/(public)/about/page.tsx", 'flex flex-col gap-4', 'flex flex-col gap-5');

/* home components (if used) */
rep("components/home/Highlights.tsx", 'className="group border-t border-line pt-6 transition-colors"', 'className="card card-accent group block"');
rep("components/home/Highlights.tsx", 'mt-10 grid gap-8', 'mt-14 grid gap-7');
rep("components/home/Hero.tsx", 'rounded-sm border border-line bg-paper px-5 py-4 shadow-sm', 'rounded-xl border border-line bg-card px-5 py-4 shadow-lg');
rep("components/home/Hero.tsx", 'overflow-hidden rounded-sm border border-line bg-ink/[0.02]', 'overflow-hidden rounded-2xl border border-line bg-card');
rep("components/home/Hero.tsx", 'rounded-sm bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-brass-dim', 'rounded-full bg-steel px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-steel-dim hover:shadow-lg');
rep("components/home/Hero.tsx", 'rounded-sm border border-line px-5 py-3 text-sm text-ink transition-colors hover:border-ink', 'rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-steel hover:text-steel');

/* ---------- 3. Home page (was dark navy/teal) ---------- */
write("app/(public)/page.tsx", `import Link from "next/link";

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
`); ok++; console.log("rewrote   app/(public)/page.tsx");

/* ---------- 4. Projects page ---------- */
{
  let s = read("app/(public)/projects/page.tsx");
  const rp = (a, b) => { if (!s.includes(a)) { console.log("not found projects:", a.slice(0, 40)); warn++; } else s = s.split(a).join(b); };
  rp('min-h-screen bg-gray-50/50 py-16', 'min-h-screen py-20');
  rp('text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4', 'font-display text-4xl text-ink sm:text-5xl mb-5');
  rp('text-lg text-gray-500 max-w-2xl mx-auto', 'text-lg text-slate max-w-2xl mx-auto');
  rp('flex flex-wrap justify-center gap-3 mb-16', 'flex flex-wrap justify-center gap-3 mb-20');
  rp('"bg-blue-900 text-white shadow-blue-900/25 scale-105 ring-2 ring-blue-900 ring-offset-2 ring-offset-gray-50"', '"bg-steel text-white shadow-steel/30 scale-105' );
  rp('"bg-white text-gray-600 hover:bg-gray-100 hover:text-blue-900 border border-gray-200"', '"bg-card text-slate hover:text-steel hover:border-steel border border-line"');
  rp('grid gap-8 sm:grid-cols-2 lg:grid-cols-3', 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3');
  rp('className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"', 'className="card card-accent"');
  rp('text-xs font-semibold uppercase tracking-wide text-blue-900', 'text-xs font-semibold uppercase tracking-wide text-brass-dim');
  rp('mt-2 text-lg font-bold text-gray-900', 'mt-3 font-display text-lg text-ink');
  rp('mt-2 text-sm text-gray-500 line-clamp-3', 'mt-3 text-sm leading-relaxed text-slate line-clamp-3');
  rp('mt-3 text-xs text-gray-400', 'mt-4 border-t border-line pt-3 text-xs text-slate');
  rp('bg-white rounded-3xl shadow-sm border border-gray-100 p-12', 'bg-card rounded-3xl shadow-sm border border-line p-12');
  rp('bg-blue-50 mb-8', 'bg-steel/10 mb-8');
  rp('text-blue-600', 'text-steel');
  rp('text-2xl font-bold text-gray-900 mb-3', 'font-display text-2xl text-ink mb-3');
  rp('text-gray-500 text-base', 'text-slate text-base');
  rp('text-blue-900 bg-blue-50 hover:bg-blue-100', 'text-steel bg-steel/10 hover:bg-steel/20');
  write("app/(public)/projects/page.tsx", s); ok++; console.log("patched   app/(public)/projects/page.tsx");
}

console.log(`\nDone: ${ok} changes, ${warn} warnings (warnings mean that spot was already changed or differs - harmless).`);
console.log("Now restart:  npm run dev");
