"use client";

import { useState } from "react";
import Link from "next/link";
import modulesData from "../../public/data/modules.json";

type ModuleKey = keyof typeof modulesData;

interface ModulePageProps {
  title: string;
  description: string;
  moduleKey?: ModuleKey;
}

export function ModulePage({ title, description, moduleKey }: ModulePageProps) {
  const inferredKey: ModuleKey =
    moduleKey ||
    (title.toLowerCase().includes("research")
      ? "research"
      : title.toLowerCase().includes("training")
      ? "training"
      : title.toLowerCase().includes("workshop")
      ? "workshops"
      : "internships");

  const items = modulesData[inferredKey] || modulesData.internships;
  const domains = ["All", ...Array.from(new Set(items.map((i) => i.domain)))];
  const [selectedDomain, setSelectedDomain] = useState("All");

  const visibleItems =
    selectedDomain === "All" ? items : items.filter((i) => i.domain === selectedDomain);

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            AVR Programs & Tracks
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-600 text-base">{description}</p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                    {item.domain}
                  </span>
                  <span className="text-slate-500 font-medium">{item.duration}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.summary}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{item.mode}</span>
                <Link href="/contact" className="font-semibold text-teal-700 hover:text-teal-800">
                  Apply / Enquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModulePage;
