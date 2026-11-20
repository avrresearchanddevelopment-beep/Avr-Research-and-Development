"use client";

import Link from "next/link";
import { useCms } from "@/lib/useCms";

export function FaqList() {
  const { cms, s } = useCms();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">{s("faq_eyebrow", "FAQ")}</p>
      <h1 className="mt-4 font-display text-3xl leading-tight text-ink md:text-5xl">
        {s("faq_title", "Frequently asked questions")}
      </h1>

      <div className="mt-12 divide-y divide-line border-y border-line">
        {cms.faq.map((faq, i) => (
          <details key={`${faq.question}-${i}`} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
              {faq.question}
              <span aria-hidden="true" className="text-brass-dim transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate">{faq.answer}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate">
        Still have a question?{" "}
        <Link href="/contact" className="text-ink underline">
          Send us a message
        </Link>
        .
      </p>
    </section>
  );
}
