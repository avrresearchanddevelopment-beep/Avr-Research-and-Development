"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/cms";
import { useCms } from "@/lib/useCms";

export default function ProjectsPage() {
  const { cms, s } = useCms();
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [query, setQuery] = useState("");

  const projects = cms.projects;
  const domains = cms.domains.filter((d) => projects.some((p) => p.domainSlug === d.slug));
  const levels = (["btech", "mtech", "other"] as const)
    .filter((l) => projects.some((p) => p.level === l))
    .map((l) => ({ id: l, label: l === "btech" ? "B.Tech" : l === "mtech" ? "M.Tech" : "Other" }));

  const q = query.trim().toLowerCase();
  const filtered = projects.filter((item) => {
    const matchesDomain = selectedDomain === "all" || item.domainSlug === selectedDomain;
    const matchesLevel = selectedLevel === "all" || item.level === selectedLevel;
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.stack.some((t) => t.toLowerCase().includes(q));
    return matchesDomain && matchesLevel && matchesQuery;
  });

  const hasActiveFilters = selectedDomain !== "all" || selectedLevel !== "all" || q.length > 0;

  const resetFilters = () => {
    setSelectedDomain("all");
    setSelectedLevel("all");
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-1.5">
            {s("projects_eyebrow", "AVR Research & Development")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {s("projects_title", "R&D Initiatives & Case Studies")}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">{s("projects_subtitle")}</p>
        </div>

        {/* Unified Single-Row Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3 mb-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, stack (NLP, Next.js, SQL)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Domain Dropdown */}
            <div className="relative lg:w-72 shrink-0">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                aria-label="Filter by domain"
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors cursor-pointer"
              >
                <option value="all">All Domains ({projects.length})</option>
                {domains.map((d) => {
                  const count = projects.filter((p) => p.domainSlug === d.slug).length;
                  return (
                    <option key={d.slug} value={d.slug}>
                      {d.name} ({count})
                    </option>
                  );
                })}
              </select>
              <svg
                className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Segmented Level Toggle */}
            {levels.length > 0 && (
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl shrink-0 self-start lg:self-auto">
                {[{ id: "all", label: "All" }, ...levels].map((l) => {
                  const active = selectedLevel === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setSelectedLevel(l.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        active
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Result Count + Reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 mb-6">
          <span>
            Showing <strong className="text-slate-800">{filtered.length}</strong> of{" "}
            <strong className="text-slate-800">{projects.length}</strong> initiatives
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching initiatives</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try clearing your search filter or switching back to all domains.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((proj) => (
              <article
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
              >
                {proj.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={proj.image} alt={proj.title} className="h-44 w-full object-cover" loading="lazy" />
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                        {proj.domain}
                        {proj.levelLabel ? ` \u2022 ${proj.levelLabel}` : ""}
                      </span>
                      <span className="text-xs font-medium text-slate-500 shrink-0">{proj.projectStatus}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2">{proj.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{proj.summary}</p>
                    {proj.outcome && (
                      <p className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-4">
                        Outcome: {proj.outcome}
                      </p>
                    )}
                  </div>

                  <div>
                    {proj.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.stack.map((tech) => (
                          <span key={tech} className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/contact?subject=${encodeURIComponent("Project enquiry: " + proj.title)}`}
                        className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Request technical brief &rarr;
                      </Link>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                        {proj.price && <span className="text-slate-900 font-semibold">{formatPrice(proj.price)}</span>}
                        {proj.demoUrl && (
                          <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-teal-700">
                            Demo
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-teal-700">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
