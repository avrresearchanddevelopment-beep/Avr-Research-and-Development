# AVR Research & Development - website

Static Next.js site on GitHub Pages. All content (pages, projects, services, FAQ, contact details, menu ...) is
edited by the admin in a **Google Sheet** - no database, no code changes.

- Admin / setup guide: [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md)
- Technical notes for developers: [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)

## Run locally

```bash
npm ci
echo NEXT_PUBLIC_CMS_URL=https://script.google.com/macros/s/XXXX/exec > .env.local   # optional
npm run dev
```

Without `NEXT_PUBLIC_CMS_URL` the site shows the content bundled in `data/cms-snapshot.json`.
