"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useCms } from "@/lib/useCms";

const MAX_VISIBLE_TAGS = 6;

export default function PortfolioPage() {
  const { cms, s } = useCms();
  const [selectedTag, setSelectedTag] = useState("all");
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const items = cms.portfolio;

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      (item.tags || []).forEach((tag) => {
        const clean = tag.trim();
        if (clean) counts.set(clean, (counts.get(clean) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [items]);

  const visibleTags = allTags.slice(0, MAX_VISIBLE_TAGS);
  const extraTags = allTags.slice(MAX_VISIBLE_TAGS);
  const isExtraSelected = extraTags.includes(selectedTag);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Single-Row Tab Bar with Corner Dropdown for Extra Tags */}
        {allTags.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 mb-6 pb-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedTag("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTag === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                All Work
              </button>
              {visibleTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Extra Tags Dropdown at Right Corner */}
            {extraTags.length > 0 && (
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isExtraSelected
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{isExtraSelected ? selectedTag : "More"}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-30 max-h-64 overflow-y-auto">
                    {extraTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSelectedTag(tag);
                          setMoreOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors ${
                          selectedTag === tag
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
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

                  <div className="p-5">
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-teal-800 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.outcome}
                    </p>
                  </div>
                </div>

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
