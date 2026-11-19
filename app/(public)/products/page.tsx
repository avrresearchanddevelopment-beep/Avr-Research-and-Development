import type { Metadata } from "next";
import Link from "next/link";
import { products as productsData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software products and toolkits built by AVR Research & Development.",
};


export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Platforms & Toolkits
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            AVR Products & Frameworks
          </h1>
          <p className="text-slate-600 text-base">
            Reusable modules and frameworks engineered for evaluation, document intelligence, and web delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-3">
                  {prod.tag}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{prod.name}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{prod.summary}</p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  {prod.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
              >
                Request Demo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
