#!/usr/bin/env node
/**
 * Google Sheets -> public/data/*.json
 *
 * One Google Spreadsheet, one tab per content type. Run before `next build`
 * (the GitHub Action does this automatically).
 *
 *   SHEET_ID=<spreadsheet id> node scripts/sync-sheets.mjs
 *   node scripts/sync-sheets.mjs --id <spreadsheet id>
 *   node scripts/sync-sheets.mjs --dir sheet-templates      # read local CSVs instead
 *   node scripts/sync-sheets.mjs --strict                   # exit 1 on any problem
 *
 * Safety rules (so a bad edit in the sheet can never blank the live site):
 *  - a tab that cannot be fetched, has no recognisable header, or has zero
 *    valid rows is SKIPPED and the existing JSON file is kept;
 *  - rows with an empty title/name, or Published = no/false/0/hide, are dropped.
 *
 * The spreadsheet must be shared as "Anyone with the link -> Viewer".
 */
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve("public/data");

/* ------------------------------------------------------------------ CSV */

/** RFC-4180 parser: quoted fields, escaped quotes, CRLF, newlines inside cells. */
export function parseCsv(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // BOM
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      cell = "";
      rows.push(row);
      row = [];
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/** Rows as objects keyed by a normalised header ("Batch No" -> "batchno"). */
export function csvToRecords(text) {
  const rows = parseCsv(text);
  if (rows.length === 0) return { headers: [], records: [] };
  const headers = rows[0].map(norm);
  const records = rows.slice(1).map((cols) => {
    const rec = {};
    headers.forEach((h, i) => {
      if (h) rec[h] = (cols[i] ?? "").trim();
    });
    return rec;
  });
  return { headers, records };
}

/* -------------------------------------------------------------- helpers */

const norm = (s = "") => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export const slugify = (s = "") =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** First non-empty value among the given header aliases. */
const pick = (rec, ...aliases) => {
  for (const a of aliases) {
    const v = rec[norm(a)];
    if (v) return v;
  }
  return "";
};

/** "a, b; c\nd" -> ["a","b","c","d"] */
const list = (s) =>
  s
    .split(/[,;\n|]+/)
    .map((x) => x.trim())
    .filter(Boolean);

const isHidden = (rec) =>
  ["no", "false", "0", "hide", "hidden", "draft"].includes(
    pick(rec, "Published", "Show", "Visible").toLowerCase()
  );

function uniqueSlugs(items) {
  const seen = new Map();
  for (const it of items) {
    if (!it.slug) continue; // only tabs that use slugs (Projects)
    const base = it.slug;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    if (n > 1) it.slug = `${base}-${n}`;
  }
  return items;
}

/* -------------------------------------------------- tab -> JSON mappers */
// Each tab lists: the sheet tab name, output file, header that MUST exist
// (used to detect a wrong/missing tab), and a row mapper (null = skip row).
// Several aliases are accepted per column, including the old tracker names.

const TABS = [
  {
    tab: "Projects",
    out: "projects.json",
    required: ["title", "projecttitle", "titles", "name"],
    map(r, i) {
      const title = pick(r, "Title", "Project Title", "Titles", "Name");
      if (!title) return null;
      const domain = pick(r, "Domain", "Category", "Department") || "General";
      const existing = pick(r, "Existing System", "Existing", "Exsisting system");
      const proposed = pick(r, "Proposed System", "Proposed", "Proposing");
      const section = pick(r, "Section");
      const batch = pick(r, "Batch No", "Batch");
      return {
        id: `proj-${i + 1}`,
        slug: slugify(title),
        title,
        domainSlug: slugify(domain),
        domainLabel: domain,
        level: pick(r, "Level", "Program", "Type"),
        section,
        batchNo: batch,
        status: pick(r, "Status", "Development Status") || "Active R&D",
        existingSystem: existing,
        proposedSystem: proposed,
        summary:
          pick(r, "Summary", "Description", "Abstract") ||
          [existing && `Existing: ${existing}`, proposed && `Proposed: ${proposed}`]
            .filter(Boolean)
            .join(" | "),
        stack: list(pick(r, "Stack", "Tech Stack", "Technologies", "Tags")),
        link: pick(r, "Link", "Notes / Link", "Base Paper (Drive Link / File Upload)"),
      };
    },
  },
  {
    tab: "Services",
    out: "services.json",
    required: ["title", "name", "service"],
    map(r, i) {
      const title = pick(r, "Title", "Name", "Service");
      if (!title) return null;
      return {
        id: `srv-${i + 1}`,
        title,
        category: pick(r, "Category") || "General",
        deliverable: pick(r, "Deliverable", "Outcome"),
        description: pick(r, "Description", "Summary"),
      };
    },
  },
  {
    tab: "Products",
    out: "products.json",
    required: ["name", "title", "product"],
    map(r, i) {
      const name = pick(r, "Name", "Title", "Product");
      if (!name) return null;
      return {
        id: `prd-${i + 1}`,
        name,
        tag: pick(r, "Tag", "Category"),
        summary: pick(r, "Summary", "Description"),
        highlights: list(pick(r, "Highlights", "Features")),
      };
    },
  },
  {
    tab: "Portfolio",
    out: "portfolio.json",
    required: ["title", "client", "name"],
    map(r, i) {
      const title = pick(r, "Title", "Name");
      if (!title) return null;
      return {
        id: `pf-${i + 1}`,
        client: pick(r, "Client", "Company"),
        title,
        outcome: pick(r, "Outcome", "Description", "Summary"),
        tags: list(pick(r, "Tags", "Stack")),
      };
    },
  },
  {
    tab: "Gallery",
    out: "gallery.json",
    required: ["title", "image", "imageurl"],
    map(r, i) {
      const title = pick(r, "Title", "Name");
      const image = pick(r, "Image", "Image URL", "Photo", "Path");
      if (!title || !image) return null;
      return {
        id: `gal-${i + 1}`,
        title,
        caption: pick(r, "Caption", "Description"),
        image,
        tag: pick(r, "Tag", "Category"),
      };
    },
  },
  {
    // Training / Internships / Workshops / Research live in ONE tab and are
    // split by the "Type" column into modules.json = { training: [], ... }
    tab: "Programs",
    out: "modules.json",
    required: ["title", "name", "program"],
    grouped: true,
    map(r, i) {
      const title = pick(r, "Title", "Name", "Program");
      if (!title) return null;
      const type = slugify(pick(r, "Type", "Module", "Track"));
      const key = ["training", "internships", "workshops", "research"].find(
        (k) => type === k || type === k.replace(/s$/, "")
      );
      if (!key) return null;
      return {
        _key: key,
        id: `${key.slice(0, 3)}-${i + 1}`,
        title,
        domain: pick(r, "Domain", "Category") || "General",
        duration: pick(r, "Duration"),
        mode: pick(r, "Mode", "Format"),
        summary: pick(r, "Summary", "Description"),
      };
    },
  },
];

/* ---------------------------------------------------------------- fetch */

function sheetUrl(id, tab) {
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
}

async function loadCsv({ id, dir }, tab) {
  if (dir) {
    const file = path.join(dir, `${tab}.csv`);
    if (!fs.existsSync(file)) throw new Error(`file not found: ${file}`);
    return fs.readFileSync(file, "utf8");
  }
  const res = await fetch(sheetUrl(id, tab), { redirect: "follow" });
  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} - is the sheet shared as "Anyone with the link: Viewer" and does the tab "${tab}" exist?`
    );
  }
  const text = await res.text();
  if (/^\s*<(!doctype|html)/i.test(text)) {
    throw new Error(`got a web page instead of CSV - check the sheet's sharing settings`);
  }
  return text;
}

/* ----------------------------------------------------------------- main */

function parseArgs(argv) {
  const o = { id: process.env.SHEET_ID || "", dir: "", strict: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--id") o.id = argv[++i] ?? "";
    else if (argv[i] === "--dir") o.dir = argv[++i] ?? "";
    else if (argv[i] === "--strict") o.strict = true;
  }
  // allow a full URL to be pasted as the id
  const m = o.id.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m) o.id = m[1];
  return o;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!opts.id && !opts.dir) {
    console.log("SHEET_ID not set - skipping sync, using the JSON already in public/data.");
    return;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  let problems = 0;

  for (const t of TABS) {
    const target = path.join(DATA_DIR, t.out);
    try {
      const text = await loadCsv(opts, t.tab);
      const { headers, records } = csvToRecords(text);

      if (!t.required.some((h) => headers.includes(h))) {
        throw new Error(
          `no recognisable header row (expected a column like "${t.required[0]}"; found: ${headers.join(", ") || "nothing"})`
        );
      }

      const mapped = records
        .filter((r) => !isHidden(r))
        .map((r, i) => t.map(r, i))
        .filter(Boolean);

      if (mapped.length === 0) throw new Error("0 valid rows - keeping the previous data");

      let output;
      if (t.grouped) {
        output = { training: [], internships: [], workshops: [], research: [] };
        for (const { _key, ...item } of mapped) output[_key].push(item);
      } else {
        output = uniqueSlugs(mapped);
      }

      fs.writeFileSync(target, JSON.stringify(output, null, 2) + "\n", "utf8");
      console.log(`✓ ${t.tab.padEnd(10)} ${String(mapped.length).padStart(3)} rows -> public/data/${t.out}`);
    } catch (err) {
      problems++;
      const kept = fs.existsSync(target) ? "kept existing file" : "no file";
      console.warn(`! ${t.tab.padEnd(10)} skipped (${kept}): ${err.message}`);
    }
  }

  if (problems && opts.strict) process.exit(1);
}

// Run only when executed directly (not when imported by tests)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("sync-sheets.mjs")) {
  main().catch((e) => {
    console.error("Sync failed:", e.message);
    process.exit(1);
  });
}
