# AVR Platform - Project Context (v4: Google Sheets as the admin panel)

Read this first in every new session.

## What this is
Static Next.js 16 site (`output: "export"`) hosted on GitHub Pages under `/AVR_ORG`.
There is **no database and no server**. Everything an admin can change lives in one Google Sheet:

    Google Sheet (admin edits)  ->  Apps Script web app (apps-script/Code.gs)  ->  website (browser fetch)

- Reads: `lib/cms.ts` + `lib/useCms.ts`. First paint uses `data/cms-snapshot.json` (refreshed at build by
  `scripts/pull-cms.mjs`), then the live JSON is fetched from `NEXT_PUBLIC_CMS_URL` and swapped in.
- Writes: only the contact form (`components/public/ContactForm.tsx`) -> POST to the same Apps Script -> private `Messages` tab.
- Sheet tabs: Settings, Navigation, Highlights, About, FAQ, Domains, Projects, Programs, Services, Products,
  Portfolio, Gallery (public) + Messages (private). The template workbook is `AVR_Site_CMS.xlsx`.
- Column headers are camelCased by the script ("Image URL" -> `imageUrl`). Renaming a header or tab breaks that page.
- Only rows with Published = Yes (Navigation: Show = Yes) are sent, sorted by Order.

## Not available (by design)
Student/client login, per-user enrollments, admin dashboard UI, file uploads. These needed the old database
(see `legacy/`, which is git-ignored). Enquiries go to the Messages tab; programme cards can link to a Google Form via "Apply Link".

## Setup / deploy
See `SETUP_GOOGLE_SHEETS.md`. Repo variable `CMS_URL` must be set or the contact form shows "not connected".

## Dev
`npm ci && npm run dev` (add `.env.local` with `NEXT_PUBLIC_CMS_URL=...`, and `NEXT_PUBLIC_BASE_PATH=` for root hosting).
`npm run build` needs internet (Google Fonts).
