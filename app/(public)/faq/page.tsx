import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about ${siteConfig.shortName}.`,
};

// Edit this list to change what the FAQ page shows.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "What does AVR offer?",
    answer:
      "Our current offerings are listed under Services, Products and Portfolio. Programmes for students are under Projects, Training, Internships, Workshops and Research.",
  },
  {
    question: "How can I get in touch?",
    answer: `Call ${siteConfig.phone}, email ${siteConfig.email}, or use the contact form. Our hours are ${siteConfig.hours}.`,
  },
  {
    question: "Where are you located?",
    answer: siteConfig.address.full,
  },
  {
    question: "How do students sign up?",
    answer:
      "Browse Projects, Training, Internships and Workshops, then use the Contact page (or call us) to enquire. We will confirm batch dates and fees directly.",
  },
  {
    question: "How do clients get started?",
    answer:
      "Send us a message through the Contact page or call us, tell us what you need, and we will get back to you with a plan and timeline.",
  },
  {
    question: "What happens after I send a message?",
    answer:
      "Our team reads every message and replies by email or phone. Include your email address and, if you like, a phone number so we can reach you.",
  },
];

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">FAQ</p>
      <h1 className="mt-4 font-display text-3xl leading-tight text-ink md:text-5xl">
        Frequently asked questions
      </h1>

      <div className="mt-12 divide-y divide-line border-y border-line">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
              {faq.question}
              <span
                aria-hidden="true"
                className="text-brass-dim transition-transform group-open:rotate-45"
              >
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