import Link from "next/link";
import servicesData from "../../../public/data/services.json";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Capabilities & Offerings
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            R&D & Engineering Services
          </h1>
          <p className="text-slate-600 text-base">
            Practical engineering, applied AI prototyping, and structured technical guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3">
                  {srv.category}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{srv.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{srv.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-slate-500">
                  Deliverable: <strong className="text-slate-800">{srv.deliverable}</strong>
                </span>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0"
                >
                  Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
