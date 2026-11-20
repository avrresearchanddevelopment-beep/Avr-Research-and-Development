"use client";

import { ContactForm } from "@/components/public/ContactForm";
import { useCms } from "@/lib/useCms";

export default function ContactPage() {
  const { s } = useCms();

  const mobiles = [s("mobile_1"), s("mobile_2")].filter(Boolean).join(" / ");
  const details = [
    { label: "Address", value: s("address") },
    { label: "Mobile", value: mobiles },
    { label: "Landline", value: s("landline") },
    { label: "Email", value: s("email") },
    { label: "Hours", value: s("hours") },
  ].filter((d) => d.value);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">{s("contact_eyebrow", "Contact Us")}</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink md:text-5xl">
        {s("contact_title", "Get in touch")}
      </h1>
      <p className="mt-6 max-w-md text-base text-slate">{s("contact_subtitle")}</p>

      <div className="mt-12 grid gap-12 border-t border-line pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg text-ink">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <dl className="grid gap-8 sm:grid-cols-2 md:grid-cols-1">
          {details.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-brass-dim">{item.label}</dt>
              <dd className="mt-1 text-base text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
