"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({ variant = "light" }: { variant?: "light" | "dark" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={`rounded-md border px-4 py-2 text-sm transition-colors disabled:opacity-60 ${
        variant === "dark"
          ? "border-paper/30 text-paper hover:bg-paper/10"
          : "border-line text-ink hover:border-ink"
      }`}
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}