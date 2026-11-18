"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export type ServiceOption = { id: string; title: string };

export function ServiceRequestForm({ services }: { services: ServiceOption[] }) {
  const router = useRouter();
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  if (services.length === 0) {
    return (
      <p className="text-sm text-slate">
        No services are available to request yet — check back soon.
      </p>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/client/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, message }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Could not send your request.");
        return;
      }
      setMessage("");
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm text-ink">
        Service
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm"
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-ink">
        What do you need?
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          className="mt-1 block w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>

      {error && (
        <p className="text-sm text-brass-dim" role="alert">
          {error}
        </p>
      )}
      {success && <p className="text-sm text-slate">Request sent. We&apos;ll be in touch.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-steel disabled:opacity-60"
      >
        {saving ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}