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
  // Filter buttons are built from the sheet: only domains / levels that have at least one project.
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

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
      active ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            {s("projects_eyebrow", "AVR Research & Development")}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {s("projects_title", "R&D Initiatives & Case Studies")}
          </h1>
          <p className="text-slate-600 text-base">{s("projects_subtitle")}</p>
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

        {levels.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2.5 mb-4">
            {[{ id: "all", label: "All Levels" }, ...levels].map((l) => (
              <button key={l.id} type="button" onClick={() => setSelectedLevel(l.id)} className={chip(selectedLevel === l.id)}>
                {l.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[{ slug: "all", name: "All Initiatives" }, ...domains].map((d) => (
            <button key={d.slug} type="button" onClick={() => setSelectedDomain(d.slug)} className={chip(selectedDomain === d.slug)}>
              {d.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching initiatives</h3>
            <p className="text-sm text-slate-500 mb-6">Try clearing your search filter or switching back to all domains.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain("all");
                setSelectedLevel("all");
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
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
              >
                {proj.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={proj.image} alt={proj.title} className="h-44 w-full object-cover" loading="lazy" />
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                        {proj.domain}
                        {proj.levelLabel ? ` • ${proj.levelLabel}` : ""}
                      </span>
                      <span className="text-xs font-medium text-slate-500">{proj.projectStatus}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h2>
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
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/contact?subject=${encodeURIComponent("Project enquiry: " + proj.title)}`}
                        className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Request technical brief →
                      </Link>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                        {proj.price && <span className="text-slate-900">{formatPrice(proj.price)}</span>}
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
