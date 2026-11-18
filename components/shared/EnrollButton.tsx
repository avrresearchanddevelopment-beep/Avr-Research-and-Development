"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Enroll button for a project or module item. Signed-out visitors (or
 * non-students) get sent to the student sign-in page.
 */
export function EnrollButton({
  projectId,
  moduleItemId,
  initiallyEnrolled = false,
}: {
  projectId?: string;
  moduleItemId?: string;
  initiallyEnrolled?: boolean;
}) {
  const router = useRouter();
  const [enrolled, setEnrolled] = useState(initiallyEnrolled);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/student/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, moduleItemId, note: note.trim() || undefined }),
      });
      if (res.status === 401) {
        router.push(`/student?from=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      if (res.ok || res.status === 409) {
        setEnrolled(true);
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Could not enroll. Please try again.");
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }

  if (enrolled) {
    return (
      <p className="inline-flex items-center gap-2 rounded-md bg-steel/10 px-4 py-2.5 text-sm font-medium text-steel-dim">
        <span aria-hidden>✓</span> Enrolled
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-steel"
      >
        Enroll
      </button>
    );
  }

  return (
    <div className="max-w-sm">
      <label className="block text-sm text-ink">
        Note for the team (optional)
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Preferred batch, questions, anything we should know"
          className="mt-1 block w-full rounded-md border border-line bg-surface px-3 py-2 text-sm"
        />
      </label>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-steel disabled:opacity-60"
        >
          {loading ? "Enrolling…" : "Confirm enrollment"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={loading}
          className="rounded-md border border-line px-4 py-2.5 text-sm text-ink hover:border-ink"
        >
          Back
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-brass-dim" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}