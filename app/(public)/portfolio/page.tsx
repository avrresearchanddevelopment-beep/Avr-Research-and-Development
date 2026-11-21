"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCms } from "@/lib/useCms";

export default function PortfolioPage() {
  const { cms, s } = useCms();
  const [selectedTag, setSelectedTag] = useState("all");

  const items = cms.portfolio;

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      (item.tags || []).forEach((tag) => {
        const clean = tag.trim();
        if (clean) counts.set(clean, (counts.get(clean) || 0) + 1);
      });
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  const filtered =
    selectedTag === "all"
      ? items
      : items.filter((item) => (item.tags || []).some((t) => t.trim() === selectedTag));

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-1.5">
            {s("portfolio_eyebrow", "Selected Work")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {s("portfolio_title", "AVR Portfolio & Outcomes")}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">{s("portfolio_subtitle")}</p>
        </div>

        {/* Left-Aligned Minimal Tag Filter Bar */}
        {allTags.length > 0 && (
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 mb-6 pb-3">
            <div className="flex items-center flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedTag === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                All Work ({items.length})
              </button>
              {allTags.map(([tag, count]) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedTag === tag
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tag} ({count})
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              Showing <strong className="text-slate-800">{filtered.length}</strong> case studies
            </span>
          </div>
        )}

        {/* Portfolio Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <p className="text-slate-600 text-sm mb-4">No portfolio items match this category.</p>
            <button
              type="button"
              onClick={() => setSelectedTag("all")}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
            >
              Show All Work
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image or Clean Fallback Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-end p-5">
                        <span className="text-xs font-semibold uppercase tracking-widest text-teal-300">
                          AVR Case Study
                        </span>
                      </div>
                    )}
                    {item.client && (
                      <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/95 backdrop-blur-xs text-slate-800 px-2.5 py-1 rounded-full shadow-xs">
                        {item.client}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-teal-800 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.outcome}
                    </p>
                  </div>
                </div>

                {/* Footer: Tags + Inquiry CTA */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex flex-col gap-3">
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/contact?subject=${encodeURIComponent("Portfolio enquiry: " + item.title)}`}
                    className="inline-flex items-center text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Discuss similar project &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
