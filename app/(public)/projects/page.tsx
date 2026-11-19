"use client";

import { useState } from "react";
import Link from "next/link";
import projectsData from "../../../public/data/projects.json";

const DOMAINS = [
  { id: "all", label: "All Initiatives" },
  { id: "artificial-intelligence-and-machine-learning", label: "AI & Machine Learning" },
  { id: "front-end-web-development", label: "Front-End Engineering" },
  { id: "back-end-web-development", label: "Back-End & Security" },
  { id: "data-science-and-data-analytics", label: "Data Science & Analytics" },
];

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = projectsData.filter((item) => {
    const matchesDomain = selectedDomain === "all" || item.domainSlug === selectedDomain;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.stack.some((s) => s.toLowerCase().includes(q));
    return matchesDomain && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            AVR Research & Development
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            R&D Initiatives & Case Studies
          </h1>
          <p className="text-slate-600 text-base">
            Explore active research tracks, engineering systems, and applied solutions built at AVR.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, stack (NLP, Next.js, SQL)..."
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {DOMAINS.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelectedDomain(domain.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedDomain === domain.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {domain.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching initiatives</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try clearing your search filter or switching back to all domains.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain("all");
                setQuery("");
              }}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proj) => (
              <article
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                      {proj.domainLabel}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{proj.status}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{proj.summary}</p>
                  <p className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-4">
                    Outcome: {proj.metrics}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Request technical brief →
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
