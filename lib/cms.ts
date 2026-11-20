/**
 * Google-Sheet content layer (pure functions, no React).
 *
 * The Apps Script web app (apps-script/Code.gs) returns every public tab of the
 * sheet as JSON:  { ok: true, tabs: { settings: {...}, projects: [{...}], ... } }
 * Column headers are camelCased ("Image URL" -> imageUrl). Only rows with
 * Published = Yes are sent, already sorted by the Order column.
 * This file turns that raw JSON into the typed objects the pages use.
 */
import snapshotJson from "@/data/cms-snapshot.json";
import { BASE_PATH, CMS_URL } from "@/config/cms";

type RawRow = Record<string, string>;
type RawTabs = Record<string, RawRow[] | Record<string, string> | undefined>;

export type ProgramType = "training" | "internships" | "workshops" | "research";

export interface NavItem { label: string; path: string; inFooter: boolean }
export interface Highlight { title: string; description: string; icon: string }
export interface FaqItem { question: string; answer: string }
export interface Domain { name: string; slug: string; description: string }
export interface Project {
  id: string; slug: string; title: string; domain: string; domainSlug: string;
  level: "btech" | "mtech" | "other" | ""; levelLabel: string;
  summary: string; existingSystem: string; proposedSystem: string; stack: string[];
  outcome: string; projectStatus: string; batchNo: string; image: string;
  demoUrl: string; githubUrl: string; price: string;
}
export interface Program {
  id: string; type: ProgramType; title: string; domain: string; duration: string;
  mode: string; summary: string; image: string; applyLink: string;
}
export interface Service { id: string; title: string; category: string; deliverable: string; description: string }
export interface Product { id: string; name: string; tag: string; summary: string; highlights: string[]; image: string }
export interface PortfolioItem { id: string; title: string; client: string; outcome: string; tags: string[]; image: string }
export interface GalleryItem { id: string; title: string; caption: string; tag: string; image: string }

export interface Cms {
  settings: Record<string, string>;
  navigation: NavItem[];
  highlights: Highlight[];
  about: { paragraphs: string[]; points: string[] };
  faq: FaqItem[];
  domains: Domain[];
  projects: Project[];
  programs: Program[];
  services: Service[];
  products: Product[];
  portfolio: PortfolioItem[];
  gallery: GalleryItem[];
}

/* ------------------------------------------------------------------ helpers */

export function slugify(text = ""): string {
  return text.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const splitList = (v: string | undefined, sep: RegExp) =>
  (v ?? "").split(sep).map((x) => x.trim()).filter(Boolean);

/** Turns whatever the admin pasted into a usable image/file URL. */
export function assetUrl(input?: string): string {
  const v = (input ?? "").trim();
  if (!v) return "";
  const drive = v.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=|thumbnail\?id=)([\w-]{10,})/);
  if (drive) return `https://lh3.googleusercontent.com/d/${drive[1]}=w1200`;
  if (/^(https?:)?\/\//i.test(v) || v.startsWith("data:")) return v;
  return `${BASE_PATH}${v.startsWith("/") ? "" : "/"}${v}`;
}

export function telHref(num: string): string {
  const d = num.replace(/[^\d+]/g, "");
  if (!d) return "";
  if (d.startsWith("+")) return `tel:${d}`;
  return d.length === 10 ? `tel:+91${d}` : `tel:${d}`;
}

export function formatPrice(p: string): string {
  const v = (p ?? "").trim();
  if (!v) return "";
  return /^\d+(\.\d+)?$/.test(v) ? `₹${Number(v).toLocaleString("en-IN")}` : v;
}

export function setting(settings: Record<string, string>, key: string, fallback = ""): string {
  const v = settings[key];
  return v !== undefined && v.trim() !== "" ? v : fallback;
}

/* ---------------------------------------------------------------- normalise */

const rows = (tabs: RawTabs, key: string): RawRow[] => {
  const t = tabs[key];
  return Array.isArray(t) ? t : [];
};
const get = (r: RawRow, k: string) => (r[k] ?? "").toString().trim();

export function normalizeCms(tabs: RawTabs): Cms {
  const rawSettings = tabs.settings;
  const settings: Record<string, string> =
    rawSettings && !Array.isArray(rawSettings) ? (rawSettings as Record<string, string>) : {};

  const projects: Project[] = rows(tabs, "projects")
    .filter((r) => get(r, "title"))
    .map((r, i) => {
      const lv = get(r, "level").toLowerCase().replace(/[^a-z]/g, "");
      const level = lv === "btech" ? "btech" : lv === "mtech" ? "mtech" : lv ? "other" : "";
      return {
        id: `proj-${i}`,
        slug: get(r, "slug") || slugify(get(r, "title")),
        title: get(r, "title"),
        domain: get(r, "domain"),
        domainSlug: slugify(get(r, "domain")),
        level,
        levelLabel: level === "btech" ? "B.Tech" : level === "mtech" ? "M.Tech" : get(r, "level"),
        summary: get(r, "summary"),
        existingSystem: get(r, "existingSystem"),
        proposedSystem: get(r, "proposedSystem"),
        stack: splitList(r.stack, /[,\n]/),
        outcome: get(r, "outcome"),
        projectStatus: get(r, "projectStatus"),
        batchNo: get(r, "batchNo"),
        image: assetUrl(r.imageUrl),
        demoUrl: get(r, "demoUrl"),
        githubUrl: get(r, "githubUrl"),
        price: get(r, "price"),
      };
    });

  // Domain buttons: the Domains tab decides the order; any domain typed on a
  // project row but missing from that tab is appended automatically.
  const domains: Domain[] = [];
  const seen = new Set<string>();
  for (const r of rows(tabs, "domains")) {
    const name = get(r, "name");
    if (name && !seen.has(slugify(name))) {
      seen.add(slugify(name));
      domains.push({ name, slug: slugify(name), description: get(r, "description") });
    }
  }
  for (const p of projects) {
    if (p.domain && !seen.has(p.domainSlug)) {
      seen.add(p.domainSlug);
      domains.push({ name: p.domain, slug: p.domainSlug, description: "" });
    }
  }

  const aboutRows = rows(tabs, "about");
  const typeOf = (r: RawRow) => get(r, "type").toLowerCase();

  return {
    settings,
    navigation: rows(tabs, "navigation")
      .filter((r) => get(r, "label") && get(r, "path"))
      .map((r) => ({
        label: get(r, "label"),
        path: get(r, "path"),
        inFooter: ["yes", "true", "y", "1"].includes(get(r, "inFooter").toLowerCase()),
      })),
    highlights: rows(tabs, "highlights")
      .filter((r) => get(r, "title"))
      .map((r) => ({ title: get(r, "title"), description: get(r, "description"), icon: get(r, "icon").toLowerCase() })),
    about: {
      paragraphs: aboutRows.filter((r) => typeOf(r) !== "point" && get(r, "text")).map((r) => get(r, "text")),
      points: aboutRows.filter((r) => typeOf(r) === "point" && get(r, "text")).map((r) => get(r, "text")),
    },
    faq: rows(tabs, "faq")
      .filter((r) => get(r, "question"))
      .map((r) => ({ question: get(r, "question"), answer: get(r, "answer") })),
    domains,
    projects,
    programs: rows(tabs, "programs")
      .filter((r) => get(r, "title"))
      .map((r, i) => {
        const t = get(r, "type").toLowerCase();
        const type: ProgramType = t.startsWith("intern") ? "internships" : t.startsWith("work") ? "workshops" : t.startsWith("res") ? "research" : "training";
        return {
          id: `prog-${i}`, type, title: get(r, "title"), domain: get(r, "domain"), duration: get(r, "duration"),
          mode: get(r, "mode"), summary: get(r, "summary"), image: assetUrl(r.imageUrl), applyLink: get(r, "applyLink"),
        };
      }),
    services: rows(tabs, "services")
      .filter((r) => get(r, "title"))
      .map((r, i) => ({
        id: `srv-${i}`, title: get(r, "title"), category: get(r, "category"),
        deliverable: get(r, "deliverable"), description: get(r, "description"),
      })),
    products: rows(tabs, "products")
      .filter((r) => get(r, "name"))
      .map((r, i) => ({
        id: `prd-${i}`, name: get(r, "name"), tag: get(r, "tag"), summary: get(r, "summary"),
        highlights: splitList(r.highlights, /[;\n]/), image: assetUrl(r.imageUrl),
      })),
    portfolio: rows(tabs, "portfolio")
      .filter((r) => get(r, "title"))
      .map((r, i) => ({
        id: `port-${i}`, title: get(r, "title"), client: get(r, "client"), outcome: get(r, "outcome"),
        tags: splitList(r.tags, /[,\n]/), image: assetUrl(r.imageUrl),
      })),
    gallery: rows(tabs, "gallery")
      .filter((r) => get(r, "imageUrl"))
      .map((r, i) => ({
        id: `gal-${i}`, title: get(r, "title"), caption: get(r, "caption"), tag: get(r, "tag"), image: assetUrl(r.imageUrl),
      })),
  };
}

/* ------------------------------------------------------------ snapshot/live */

const snapshotTabs = (snapshotJson as { tabs: RawTabs }).tabs;

/** Content bundled into the build (from the last time the sheet was pulled). */
export const SNAPSHOT: Cms = normalizeCms(snapshotTabs);

let livePromise: Promise<Cms | null> | null = null;
let liveAt = 0;

/** Fetches the current sheet content in the visitor's browser (cached for 5 min per tab session). */
export function loadLive(): Promise<Cms | null> {
  if (!CMS_URL) return Promise.resolve(null);
  if (!livePromise || Date.now() - liveAt > 5 * 60 * 1000) {
    liveAt = Date.now();
    livePromise = fetch(CMS_URL, { cache: "no-store", redirect: "follow" })
      .then((res) => res.json())
      .then((json) => {
        if (!json || json.ok !== true || typeof json.tabs !== "object") return null;
        // A tab that is missing in the response keeps its bundled content.
        return normalizeCms({ ...snapshotTabs, ...json.tabs });
      })
      .catch(() => null);
  }
  return livePromise;
}
