"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  // /contact/?subject=Enquiry%3A%20Some%20project  ->  pre-fills the subject
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY_FORM,
    subject: searchParams.get("subject") ?? "",
  }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUsed, setMailtoUsed] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const endpoint = siteConfig.formEndpoint;

    // No form service configured -> open the visitor's email app, pre-filled.
    if (!endpoint) {
      const lines = [`Name: ${form.name}`, `Email: ${form.email}`];
      if (form.phone) lines.push(`Phone: ${form.phone}`);
      lines.push("", form.message);
      const body = lines.join("\n");
      // mailto: is an external protocol handler, not a Next.js route
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = `${siteConfig.emailHref}?subject=${encodeURIComponent(
        form.subject || "Website enquiry"
      )}&body=${encodeURIComponent(body)}`;
      setMailtoUsed(true);
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: form.subject || "Website enquiry" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
    } catch {
      setError(
        `Couldn't send your message. Please email ${siteConfig.email} or call ${siteConfig.phone}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card hover:!translate-y-0 hover:!border-line p-8 md:p-10">
        <p className="font-display text-lg text-ink">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-slate">
          {mailtoUsed
            ? `Your email app should have opened with your message ready to send. If nothing opened, write to ${siteConfig.email}.`
            : "We've received your message and will get back to you soon."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className="text-sm text-ink">Name</label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className="text-sm text-ink">Email</label>
          <input
            id="cf-email"
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-phone" className="text-sm text-ink">Phone (optional)</label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-subject" className="text-sm text-ink">Subject (optional)</label>
          <input
            id="cf-subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-sm text-ink">Message</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-sm bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-brass-dim disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}