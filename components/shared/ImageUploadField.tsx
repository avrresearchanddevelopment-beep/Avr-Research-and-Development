"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error ?? "Upload failed.");
        return;
      }

      onChange(data.url as string);
    } catch {
      setUploadError("Couldn't reach the server.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-ink">{label}</label>

      <div className="flex items-center gap-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload a file"
          className="flex-1 rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
        <label className="cursor-pointer rounded-sm border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-ink">
          {uploading ? "Uploading..." : "Upload"}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileSelected}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {uploadError && (
        <p role="alert" className="text-sm text-red-700">
          {uploadError}
        </p>
      )}

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="mt-1 h-16 w-16 rounded-sm border border-line object-cover"
        />
      )}
    </div>
  );
}