# AVR Platform — Project Context

Read this file first in every new session before touching code. Keep it updated
whenever a decision is made or a milestone is finished — this is the single
source of truth for "what is this project and how far along is it," so
progress doesn't get lost between AI sessions.

## What this is

A replacement for AVR Research & Development's old static marketing site
(avrresearchanddevelopment.com). It is not just a website — it's a full web
application with four parts:

1. **Public site** — what visitors see (About, Services, Products, Portfolio,
   Gallery, B.Tech Projects, M.Tech Projects, Contact Us).
2. **Student portal** — students log in, browse Training/Internships/
   Workshops/Projects/Research, and enroll.
3. **Client portal** — clients log in and request Services.
4. **Admin dashboard** — staff add/edit domains, projects, trainings, and
   services through forms. No developer needed to publish new content —
   this is the core value-add over the old static site.

## Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + Prisma 6
(PostgreSQL) + JWT sessions via `jose` (httpOnly cookie, `proxy.ts`
middleware) + Zod validation.

## Key decision: navigation must mirror the old site

The old site's nav was: **Home / About Us / B.Tech Projects / M.Tech
Projects / Contact Us / FAQ's**. The org's leadership (and prospective
students) already know this layout, so the new site's *public-facing* nav
should match it, even though the underlying content model is organized
differently (by Domain — AI/ML, Web Dev, etc. — and by Module — Projects,
Training, Internships, Workshops, Research).

Decided approach: **keep old nav labels on top, powered by the new
admin-driven system underneath.**

- Add a `level` field (B.Tech / M.Tech) to the `Project` model so the same
  admin form that creates a project also decides which public nav tab it
  appears under.
- Public routes `/btech-projects` and `/mtech-projects` list projects
  filtered by level, using the existing domain-filtered layout pattern.
- Real `/contact` page using the org's actual address/phone/email (see
  below).

## Reference info from the old site (for Contact / About / Footer)

- Address: F5, Ruby Apartments, Opp Maitri Vanam, Pillar No-1464, Hyderabad.
- Phone: +91 8688204486 (site also shows +91-868 820 4486 — same number)
- Email: avrsofttech@gmail.com (site also shows info@avrsofttech.com)
- Hours: Mon–Sat, 9:30 to 7:00
- Old categories: Machine Learning, AI, Deep Learning, Image Processing,
  Python/Java, Big Data; B.Tech/M.Tech/Major/Mini/IEEE Projects, Trainings

## Status snapshot (update this section as work progresses)

### Done
- Auth: register/login/logout/me, bcrypt + JWT httpOnly cookie sessions,
  role-gated middleware (`proxy.ts`) for `/student/dashboard`,
  `/client/dashboard`, `/admin/dashboard`.
- DB schema: `User`, `StudentProfile`, `ClientProfile`, `Service`,
  `Product`, `PortfolioItem`, `GalleryImage`, `Domain`, `DomainModule`,
  `Project` (now with a `level` field: BTECH/MTECH — migration
  `20260907120000_add_project_level`, defaults existing rows to BTECH).
- Admin Domain CRUD: full API (`/api/admin/domains`) + `DomainManager` UI.
- Admin Project CRUD: API (`/api/admin/projects`, `/api/admin/projects/[id]`)
  + `ProjectManager` admin UI at `/admin/dashboard/projects`, with a
  "Level" field controlling B.Tech/M.Tech placement. Admin dashboard home
  now links to both Domains and Projects sections.
- Public nav (`config/nav.ts`) now matches the old site: Home / About Us /
  B.Tech Projects / M.Tech Projects / Contact Us. Services/Products/
  Portfolio/Gallery moved to `secondaryNav`, still linked from the footer.
- `/contact` page with the org's real address/phone/email.
- `/btech-projects` and `/mtech-projects` public pages — list published
  projects grouped by domain, filtered by `level`
  (`lib/projects.ts` + `ProjectLevelSection` component).
- Public Services/Products/Portfolio/Gallery pages now query their real DB
  tables (`isPublished: true`) and fall back to `PlaceholderPage` only when
  a table is empty.
- Seed script for 10 tech domains (`seed-domains.mjs`).

### In progress / not yet done
- Home page `Highlights` — check how much is hardcoded vs pulled from
  `data/home-highlights.ts` vs the DB.
- No FAQ's page/section yet (old site had one in the header).
- No admin forms yet for Service/Product/PortfolioItem/GalleryImage — the
  public pages read from these tables, but nothing writes to them except
  Prisma Studio / direct DB access. Same pattern as ProjectManager can be
  reused.
- Gallery image upload isn't wired up (GalleryImage.imageUrl expects a URL
  today, no file upload UI).

### Known gaps
- No git repository was present in the last handoff — set one up and
  commit regularly so history isn't lost between sessions.
- The new `add_project_level` migration has not been run against a live
  database in this session (no DB access in the working environment) —
  run `npx prisma migrate deploy` (or `migrate dev` locally) before
  testing or demoing.
- `npm install && npm run build` has not been verified end-to-end in this
  session — do this before any live demo.

## How to continue a session

1. Read this file.
2. Skim folder structure, `prisma/schema.prisma`, and recent `git log` (once
   git is initialized) to confirm this file is still accurate.
3. Update the "Status snapshot" section as soon as you finish something —
   don't wait until the end of the session.