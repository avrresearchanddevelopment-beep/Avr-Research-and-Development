// Runs automatically before `npm run build` (see "prebuild" in package.json).
// Copies the current content of the Google Sheet into data/cms-snapshot.json so the
// built site always contains a recent copy (fast first paint, search engines, offline fallback).
// If anything goes wrong the existing snapshot is kept and the build continues.
import fs from "fs";
import path from "path";

const url = process.env.NEXT_PUBLIC_CMS_URL || process.env.CMS_URL || "";
const target = path.resolve("data", "cms-snapshot.json");

if (!url) {
  console.log("[pull-cms] NEXT_PUBLIC_CMS_URL is not set - using the bundled data/cms-snapshot.json");
  process.exit(0);
}

try {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json || json.ok !== true || typeof json.tabs !== "object") {
    throw new Error(json && json.error ? json.error : "unexpected response");
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(json, null, 1) + "\n", "utf8");
  const counts = Object.entries(json.tabs).map(([k, v]) => `${k}:${Array.isArray(v) ? v.length : Object.keys(v).length}`);
  console.log(`[pull-cms] snapshot updated (${counts.join(", ")})`);
} catch (err) {
  console.warn(`[pull-cms] could not read the sheet (${err.message}) - keeping the bundled snapshot`);
}
