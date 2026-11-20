"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CMS_URL } from "@/config/cms";
import { useCms } from "@/lib/useCms";

type FormState = { name: string; email: string; phone: string; subject: string; message: string };
const EMPTY_FORM: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

/**
 * Sends the form to the Google Apps Script web app, which appends it to the
 * private "Messages" tab of the Google Sheet (and emails the admin if set up).
 * "text/plain" keeps it a "simple" request so the browser needs no CORS preflight.
 */
export function ContactForm() {
  const { s } = useCms();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [website, setWebsite] = useState(""); // honeypot: real visitors never fill this
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Cards link here as /contact?subject=Project enquiry: ...
  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject");
    if (subject) setForm((f) => ({ ...f, subject: subject.slice(0, 200) }));
  }, []);

  const set = (k: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!CMS_URL) {
      setError("The contact form is not connected yet. Please call or email us using the details on this page.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(CMS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "contact", ...form, website, page: window.location.pathname }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Couldn't reach the server. Please try again, or call us.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card hover:!translate-y-0 hover:!border-line p-8 md:p-10">
        <p className="font-display text-lg text-ink">{s("contact_success_title", "Thanks for reaching out.")}</p>
        <p className="mt-2 text-sm text-slate">
          {s("contact_success_text", "We've received your message and will get back to you soon.")}
        </p>
      </div>
    );
  }

  const input =
    "rounded-sm border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">Name</label>
          <input required maxLength={120} value={form.name} onChange={set("name")} className={input} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">Email</label>
          <input required type="email" maxLength={160} value={form.email} onChange={set("email")} className={input} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">
            Phone <span className="text-slate">(optional)</span>
          </label>
          <input maxLength={40} value={form.phone} onChange={set("phone")} className={input} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink">
            Subject <span className="text-slate">(optional)</span>
          </label>
          <input maxLength={200} value={form.subject} onChange={set("subject")} className={input} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-ink">Message</label>
        <textarea required rows={5} maxLength={4000} value={form.message} onChange={set("message")} className={input} />
      </div>

      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

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
