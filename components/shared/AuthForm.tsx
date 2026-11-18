"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/types/user";

type AuthFormProps = {
  /** Role this portal issues on self-registration. Admin passes null — no public signup. */
  registerRole: Extract<Role, "STUDENT" | "CLIENT"> | null;
  dashboardHref: string;
};

type Mode = "login" | "register";

export function AuthForm({ registerRole, dashboardHref }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        mode === "login"
          ? { email, password }
          : { name, email, password, role: registerRole };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push(dashboardHref);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      {registerRole && (
        <div className="mb-8 flex gap-6 border-b border-line text-sm">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`-mb-px border-b pb-3 ${mode === "login" ? "border-ink text-ink" : "border-transparent text-slate"}`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`-mb-px border-b pb-3 ${mode === "register" ? "border-ink text-ink" : "border-transparent text-slate"}`}
          >
            Create account
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {mode === "register" && registerRole && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-ink">
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={mode === "register" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-sm bg-ink px-4 py-2.5 text-sm text-paper transition-colors hover:bg-brass-dim disabled:opacity-60"
        >
          {loading
            ? "Please wait…"
            : mode === "login"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>
    </div>
  );
}
