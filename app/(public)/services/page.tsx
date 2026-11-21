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
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            {s("services_eyebrow", "Capabilities & Offerings")}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {s("services_title", "R&D & Engineering Services")}
          </h1>
          <p className="text-slate-600 text-base">{s("services_subtitle")}</p>
        </div>

        {/* Services / Student Services Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "services"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Services ({generalServices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("student")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "student"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Student Services ({studentServices.length})
          </button>
        </div>

        {visibleServices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <p className="text-slate-600 text-sm">
              No {activeTab === "student" ? "student services" : "services"} published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {srv.category && (
                    <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3">
                      {srv.category}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{srv.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{srv.description}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-slate-500">
                    {srv.deliverable && (
                      <>
                        Deliverable: <strong className="text-slate-800">{srv.deliverable}</strong>
                      </>
                    )}
                  </span>
                  <Link
                    href={`/contact?subject=${encodeURIComponent("Service enquiry: " + srv.title)}`}
                    className="text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0"
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
