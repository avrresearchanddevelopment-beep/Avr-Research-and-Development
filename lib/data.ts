/**
 * Typed access to the JSON files in public/data (generated from Google Sheets
 * by scripts/sync-sheets.mjs). Import from here, not from the JSON directly,
 * so pages keep compiling even if a sheet column is empty or missing.
 */
import projectsJson from "@/public/data/projects.json";
import servicesJson from "@/public/data/services.json";
import productsJson from "@/public/data/products.json";
import portfolioJson from "@/public/data/portfolio.json";
import galleryJson from "@/public/data/gallery.json";
import modulesJson from "@/public/data/modules.json";

export type Project = {
  id: string;
  slug: string;
  title: string;
  domainSlug: string;
  domainLabel: string;
  level?: string;
  section?: string;
  batchNo?: string;
  status: string;
  existingSystem?: string;
  proposedSystem?: string;
  summary?: string;
  stack: string[];
  link?: string;
};
export type Service = { id: string; title: string; category: string; deliverable?: string; description?: string };
export type Product = { id: string; name: string; tag?: string; summary?: string; highlights: string[] };
export type PortfolioItem = { id: string; client?: string; title: string; outcome?: string; tags: string[] };
export type GalleryItem = { id: string; title: string; caption?: string; image: string; tag?: string };
export type ProgramItem = { id: string; title: string; domain: string; duration?: string; mode?: string; summary?: string };
export type ModuleKey = "training" | "internships" | "workshops" | "research";

export const projects = projectsJson as Project[];
export const services = servicesJson as Service[];
export const products = productsJson as Product[];
export const portfolio = portfolioJson as PortfolioItem[];
export const gallery = galleryJson as GalleryItem[];
export const modules = modulesJson as Record<ModuleKey, ProgramItem[]>;
