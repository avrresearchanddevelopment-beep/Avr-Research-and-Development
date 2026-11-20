"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProgramType } from "@/lib/cms";
import { useCms } from "@/lib/useCms";

interface ModulePageProps {
  title: string;
  description: string;
  moduleKey: ProgramType;
}

/**
 * Shared page for Training / Internships / Workshops / Research.
 * Cards come from the "Programs" tab of the Google Sheet (Type column decides the page).
 * Heading text can be changed in the Settings tab (e.g. training_title, training_subtitle).
 */
export function ModulePage({ title, description, moduleKey }: ModulePageProps) {
  const { cms, s } = useCms();
  const items = cms.programs.filter((p) => p.type === moduleKey);
  const domains = ["All", ...Array.from(new Set(items.map((i) => i.domain).filter(Boolean)))];
  const [selectedDomain, setSelectedDomain] = useState("All");

  const visibleItems = selectedDomain === "All" ? items : items.filter((i) => i.domain === selectedDomain);

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            {s("programs_eyebrow", "AVR Programs & Tracks")}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {s(`${moduleKey}_title`, title)}
          </h1>
          <p className="text-slate-600 text-base">{s(`${moduleKey}_subtitle`, description)}</p>
        </div>

        {domains.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {domains.map((dom) => (
              <button
                key={dom}
                type="button"
                onClick={() => setSelectedDomain(dom)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selectedDomain === dom
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        )}

        {visibleItems.length === 0 ? (
          <p className="text-center text-slate-500 text-sm">New programmes will be announced here soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden"
              >
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover" loading="lazy" />
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">{item.domain}</span>
                      <span className="text-slate-500 font-medium">{item.duration}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.summary}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{item.mode}</span>
                    {item.applyLink ? (
                      <a
                        href={item.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Apply Now →
                      </a>
                    ) : (
                      <Link
                        href={`/contact?subject=${encodeURIComponent("Enrolment: " + item.title)}`}
                        className="font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Apply / Enquire →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModulePage;
