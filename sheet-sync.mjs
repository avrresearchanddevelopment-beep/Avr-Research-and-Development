import fs from "fs";
import path from "path";

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

function mapDomainSlug(domainText = "") {
  const d = domainText.toLowerCase();
  if (d.includes("ai") || d.includes("ml") || d.includes("nlp") || d.includes("vision")) {
    return "artificial-intelligence-and-machine-learning";
  }
  if (d.includes("data") || d.includes("analytics") || d.includes("sql")) {
    return "data-science-and-data-analytics";
  }
  if (d.includes("front") || d.includes("react") || d.includes("next") || d.includes("ui")) {
    return "front-end-web-development";
  }
  return "back-end-web-development";
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeRows(csvText, fallbackFile) {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const raw = {};
    headers.forEach((h, idx) => {
      raw[h] = cols[idx] ?? "";
    });

    const title =
      raw["Title"] ||
      raw["Project Title"] ||
      raw["Titles"] ||
      raw["Name"] ||
      "";

    if (!title) continue;

    const batchNo = raw["Batch No"] || raw["Batch-No"] || String(i);
    const section = raw["Section"] || "IT Section B";
    const dept = raw["Department"] || "IT";
    const existing = raw["Existing System"] || raw["Existing"] || raw["Exsisting system"] || "";
    const proposed = raw["Proposed System"] || raw["Proposing"] || "";
    const domain = raw["Domain"] || dept;
    const status = raw["Status"] || raw["Development Status"] || "Active R&D";
    const codeMode = raw["Code / Without Code"] || "";
    const assigned = raw["Assigned Email ID"] || raw["Assigned Claude Login"] || "";
    const notes = raw["Notes / Link"] || raw["Notes / Claude Link"] || raw["Base Paper (Drive Link / File Upload)"] || "";

    const summaryParts = [];
    if (existing) summaryParts.push(`Existing: ${existing}`);
    if (proposed) summaryParts.push(`Proposed: ${proposed}`);
    if (!summaryParts.length) {
      summaryParts.push(`${section} — Batch ${batchNo} R&D Initiative`);
    }

    const stack = [domain, section, codeMode, assigned]
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);

    rows.push({
      id: `item-${i}`,
      slug: `${slugify(title) || "item"}-${i}`,
      title,
      domainSlug: mapDomainSlug(`${domain} ${title}`),
      domainLabel: `${dept} • ${section} (Batch ${batchNo})`,
      status,
      summary: summaryParts.join(" | "),
      stack,
      metrics: notes || `${section} • Batch ${batchNo}`,
    });
  }

  // If the sheet had headers only (empty rows), keep a clean placeholder entry so builds never break
  if (rows.length === 0) {
    return [
      {
        id: "empty-sheet-1",
        slug: "awaiting-spreadsheet-entries",
        title: "Spreadsheet Ready for Entries",
        domainSlug: "artificial-intelligence-and-machine-learning",
        domainLabel: `Synced from ${path.basename(fallbackFile)}`,
        status: "Pending Input",
        summary: "No data rows found yet in the linked spreadsheet. Add rows to the sheet and re-sync.",
        stack: ["Google Sheets", "CSV Sync", "Static JSON"],
        metrics: "0 rows imported",
      },
    ];
  }

  return rows;
}

async function run() {
  const [,, source, targetJson = "public/data/projects.json"] = process.argv;
  if (!source) {
    console.log("Usage: node sheet-sync.mjs <sheet_url_or_csv_path> [public/data/target.json]");
    process.exit(1);
  }

  let csvText = "";
  if (/^https?:\/\//i.test(source)) {
    const idMatch = source.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = source.match(/gid=(\d+)/);
    const exportUrl = idMatch
      ? `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=csv&gid=${gidMatch ? gidMatch[1] : "0"}`
      : source;

    const res = await fetch(exportUrl);
    if (!res.ok) {
      throw new Error(
        `Could not fetch sheet (HTTP ${res.status}). Make sure the sheet is shared as "Anyone with the link" (Viewer), or download it as CSV and pass the local .csv path.`
      );
    }
    csvText = await res.text();
  } else {
    const absPath = path.resolve(source);
    if (!fs.existsSync(absPath)) {
      throw new Error(`File not found: ${absPath}`);
    }
    csvText = fs.readFileSync(absPath, "utf8");
  }

  const normalized = normalizeRows(csvText, source);
  const outPath = path.resolve(targetJson);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2) + "\n", "utf8");
  console.log(`Synced ${normalized.length} record(s) -> ${outPath}`);
}

run().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});