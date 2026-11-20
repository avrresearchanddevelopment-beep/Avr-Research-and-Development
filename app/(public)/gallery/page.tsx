"use client";

import { useCms } from "@/lib/useCms";

export default function GalleryPage() {
  const { cms, s } = useCms();

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            {s("gallery_eyebrow", "Visual Archive")}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {s("gallery_title", "AVR Gallery")}
          </h1>
          <p className="text-slate-600 text-base">{s("gallery_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cms.gallery.map((item) => (
            <figure key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title || "AVR gallery image"} className="w-full h-full object-cover" loading="lazy" />
              </div>
              {(item.title || item.caption || item.tag) && (
                <figcaption className="p-4">
                  {item.tag && <span className="text-[11px] font-semibold text-teal-700 uppercase">{item.tag}</span>}
                  {item.title && <h2 className="text-base font-bold text-slate-900 mt-1">{item.title}</h2>}
                  {item.caption && <p className="text-xs text-slate-600 mt-1">{item.caption}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
