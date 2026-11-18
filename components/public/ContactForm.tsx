"use client";

import { useState, type FormEvent } from "react";

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
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card hover:!translate-y-0 hover:!border-line p-8 md:p-10">
        <p className="font-display text-lg text-ink">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-slate">
          We&apos;ve received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">Email</label>
          <input
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
          <label className="text-sm text-ink">Phone (optional)</label>
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">Subject (optional)</label>
          <input
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-ink">Message</label>
        <textarea
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