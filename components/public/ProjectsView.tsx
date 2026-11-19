"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects } from "@/lib/data";

const ALL = "all";

export function ProjectsView() {
  const [domain, setDomain] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const searchParams = useSearchParams();
  // Deep link: /projects/?q=radar
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  // Filters are built from the data, so a new Domain/Level typed into the
  // Google Sheet shows up automatically after the next sync.
  const domains = useMemo(() => {
    const seen = new Map<string, string>();
    projects.forEach((p) => seen.set(p.domainSlug, p.domainLabel));
    return [...seen].map(([id, label]) => ({ id, label }));
  }, []);
  const levels = useMemo(
    () => [...new Set(projects.map((p) => p.level).filter((l): l is string => !!l))],
    []
  );

  const filtered = projects.filter((p) => {
    if (domain !== ALL && p.domainSlug !== domain) return false;
    if (level !== ALL && p.level !== level) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [p.title, p.summary, p.existingSystem, p.proposedSystem, p.domainLabel, ...p.stack]
      .filter(Boolean)
      .some((s) => String(s).toLowerCase().includes(q));
  });

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
      active
        ? "bg-slate-900 text-white shadow-sm"
        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            AVR Research & Development
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Projects & R&D Initiatives
          </h1>
          <p className="text-slate-600 text-base">
            Explore active research tracks, engineering systems, and applied solutions built at AVR.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, stack (NLP, Next.js, SQL)..."
            aria-label="Search projects"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {levels.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2.5 mb-4">
            {[ALL, ...levels].map((l) => (
              <button key={l} type="button" onClick={() => setLevel(l)} className={chip(level === l)}>
                {l === ALL ? "All Levels" : l}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[{ id: ALL, label: "All Domains" }, ...domains].map((d) => (
            <button key={d.id} type="button" onClick={() => setDomain(d.id)} className={chip(domain === d.id)}>
              {d.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching projects</h3>
            <p className="text-sm text-slate-500 mb-6">Try clearing your search or filters.</p>
            <button
              type="button"
              onClick={() => {
                setDomain(ALL);
                setLevel(ALL);
                setQuery("");
              }}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-xs text-slate-500 mb-6">
              Showing {filtered.length} of {projects.length} projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                        {p.domainLabel}
                      </span>
                      <span className="text-xs font-medium text-slate-500 text-right">{p.status}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h2>
                    {(p.level || p.section || p.batchNo) && (
                      <p className="text-xs text-slate-500 mb-3">
                        {[p.level, p.section, p.batchNo && `Batch ${p.batchNo}`].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {p.summary && <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.summary}</p>}
                    {(p.existingSystem || p.proposedSystem) && (
                      <dl className="text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-4 space-y-1.5">
                        {p.existingSystem && (
                          <div>
                            <dt className="font-semibold text-slate-700 inline">Existing: </dt>
                            <dd className="text-slate-600 inline">{p.existingSystem}</dd>
                          </div>
                        )}
                        {p.proposedSystem && (
                          <div>
                            <dt className="font-semibold text-slate-700 inline">Proposed: </dt>
                            <dd className="text-slate-600 inline">{p.proposedSystem}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>

                  <div>
                    {p.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.stack.map((tech) => (
                          <span key={tech} className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/contact/?subject=${encodeURIComponent(`Enquiry: ${p.title}`)}`}
                        className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Request technical brief →
                      </Link>
                      {p.link && /^https?:\/\//i.test(p.link) && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-slate-500 hover:text-slate-800"
                        >
                          Reference ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
