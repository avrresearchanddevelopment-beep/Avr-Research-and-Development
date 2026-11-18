import { ContactForm } from "@/components/public/ContactForm";
import { siteConfig } from "@/config/site";

const CONTACT_DETAILS = [
  {
    label: "Address",
    value: "F5, Ruby Apartments, Opp Maitri Vanam, Pillar No-1464, Hyderabad.",
  },
  {
    label: "Mobile",
    value: `${siteConfig.footerMobiles.map((m) => m.label).join(" / ")}`,
  },
  { label: "Landline", value: siteConfig.contactBar.landline },
  { label: "Email", value: siteConfig.contactBar.email },
  { label: "Hours", value: "Mon – Sat, 9:30 AM to 7:00 PM" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">Contact Us</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink md:text-5xl">
        Get in touch
      </h1>
      <p className="mt-6 max-w-md text-base text-slate">
        Questions about a project, training, or internship? Reach out and
        we&apos;ll get back to you.
      </p>

      <div className="mt-12 grid gap-12 border-t border-line pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg text-ink">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <dl className="grid gap-8 sm:grid-cols-2 md:grid-cols-1">
          {CONTACT_DETAILS.map((item) => (
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