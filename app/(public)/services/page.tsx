"use client";

import { useState } from "react";
import Link from "next/link";
import { useCms } from "@/lib/useCms";

function isStudentService(srv: { category?: string; title?: string }) {
  const text = `${srv.category || ""} ${srv.title || ""}`.toLowerCase();
  return /student|academic|internship|workshop|training|b\.?tech|m\.?tech|thesis/.test(text);
}

export default function ServicesPage() {
  const { cms, s } = useCms();
  const [activeTab, setActiveTab] = useState<"services" | "student">("services");

  const generalServices = cms.services.filter((srv) => !isStudentService(srv));
  const studentServices = cms.services.filter((srv) => isStudentService(srv));
  const visibleServices = activeTab === "services" ? generalServices : studentServices;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-1.5">
            {s("services_eyebrow", "Capabilities & Offerings")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {s("services_title", "R&D & Engineering Services")}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">{s("services_subtitle")}</p>
        </div>

        {/* Left-Aligned Minimal Tabs (No Fill Color) */}
        <div className="flex items-center justify-start gap-6 border-b border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`pb-2.5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "services"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Services ({generalServices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("student")}
            className={`pb-2.5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "student"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Student Services ({studentServices.length})
          </button>
        </div>

        {visibleServices.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-xl mx-auto">
            <p className="text-slate-600 text-sm">
              No {activeTab === "student" ? "student services" : "services"} published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {srv.category && (
                    <span className="inline-block text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-2.5">
                      {srv.category}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-slate-900 leading-snug mb-1.5">
                    {srv.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {srv.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 truncate">
                    {srv.deliverable && (
                      <>
                        Deliverable: <strong className="text-slate-800">{srv.deliverable}</strong>
                      </>
                    )}
                  </span>
                  <Link
                    href={`/contact?subject=${encodeURIComponent("Service enquiry: " + srv.title)}`}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 shrink-0"
                  >
                    Inquire &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
