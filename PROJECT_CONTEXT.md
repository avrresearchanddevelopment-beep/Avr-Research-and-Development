# AVR Website — Project Context

Read this first in every new session. Keep it updated as decisions are made.

## What this is
Marketing + catalog website for **AVR Research & Development Pvt. Ltd.** (Hyderabad).
**Fully static** — hosted on GitHub Pages with a custom domain. The earlier version had a
backend (Prisma/PostgreSQL, JWT auth, student/client/admin portals); that was **intentionally
removed**. Do not reintroduce a server, database, auth or `/api` routes.

## Architecture
* Next.js 16 (App Router, `output: "export"`, `trailingSlash: true`) + React 19 + TypeScript + Tailwind v4.
* **Content lives in a Google Sheet** → `scripts/sync-sheets.mjs` → `public/data/*.json` → pages import via `lib/data.ts`.
* Deploy: `.github/workflows/deploy.yml` (push to `main`, every 6 h, manual, or `repository_dispatch: sheet-updated`).
* Config via GitHub Actions **Variables**: `SHEET_ID`, `CUSTOM_DOMAIN`, `FORM_ENDPOINT`.
* `NEXT_PUBLIC_BASE_PATH` is empty for a custom domain; the workflow sets it to `/<repo>` only when no `CUSTOM_DOMAIN`.
  Use `withBase()` from `config/site.ts` for any plain `<img>` / raw root-relative path.

## Pages (all static)
`/` Home · `/about` · `/projects` (search + auto-built domain/level filters) · `/services` · `/products` ·
`/portfolio` · `/gallery` · `/training` `/internships` `/workshops` `/research` (from the `Programs` tab) ·
`/contact` (form → `FORM_ENDPOINT`, else mailto fallback; accepts `?subject=`) · `/faq` · `/privacy-policy` · `/terms-of-service`

## Rules for future work
1. New content type = add a tab mapper in `scripts/sync-sheets.mjs`, a type in `lib/data.ts`, a template CSV in `sheet-templates/`.
2. Sync must stay non-destructive: a bad/missing tab keeps the previous JSON.
3. No `localStorage` secrets, no server code, no `next/image` optimization (static export).
4. `public/data/*.json` is a committed **fallback snapshot**; the live values come from the sheet at build time.
5. Never commit `.env*` or credentials.

## Reference info (old site)
Address: F5, Ruby Apartments, Opp Maitri Vanam, Pillar No-1464, Hyderabad · Hours Mon–Sat 9:30–7:00.
Contact numbers/emails are in `config/site.ts`.

## Status
**Done:** static export, Sheets sync (6 tabs), GitHub Pages workflow + custom domain, contact form (static),
cleanup of all backend code, legal pages, SEO metadata/sitemap/robots.
**Ideas / next:** per-project detail pages (`/projects/[slug]`), Apps Script “Publish” button in the sheet,
home-page featured-projects strip, Google Analytics/Plausible, real social links in `config/site.ts`.
