import type { Metadata } from "next";
import { portfolio as portfolioData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected client work and outcomes from AVR Research & Development.",
};


export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Selected Work
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            AVR Portfolio & Outcomes
          </h1>
          <p className="text-slate-600 text-base">
            Key implementations and technical tracks delivered across research, tooling, and web platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
                  {item.client}
                </p>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
