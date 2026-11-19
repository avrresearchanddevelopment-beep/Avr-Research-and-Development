# AVR Research & Development — Website

A fully **static** Next.js site hosted free on **GitHub Pages** with a custom domain.
No server, no database. All content (projects, services, products, portfolio, gallery,
programs) is edited in a **Google Sheet** and published automatically.

```
Google Sheet ──(sync-sheets.mjs)──▶ public/data/*.json ──(next build)──▶ out/ ──▶ GitHub Pages ──▶ your domain
```

## 1. One-time setup (≈15 minutes)

### A. Put the content in a Google Sheet
1. Create a new Google Sheet.
2. **File → Import → Upload** each CSV from `sheet-templates/` and choose **“Insert new sheet(s)”**.
   You should end up with six tabs named exactly: `Projects`, `Services`, `Products`,
   `Portfolio`, `Gallery`, `Programs`. (They already contain today’s content.)
3. **Share → General access → “Anyone with the link” → Viewer.**
4. Copy the sheet id — the long text in the URL between `/d/` and `/edit`.

### B. Push the code to GitHub
```powershell
git add -A
git commit -m "Static site: Google Sheets + GitHub Pages"
git push origin main
```

### C. Turn on Pages and set variables
In the repo on GitHub:
1. **Settings → Pages → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → Variables → New repository variable:**

| Variable | Value | Required |
|---|---|---|
| `SHEET_ID` | the sheet id from step A4 | recommended |
| `CUSTOM_DOMAIN` | e.g. `www.yourdomain.com` | for a custom domain |
| `FORM_ENDPOINT` | Formspree / Web3Forms URL for the contact form | optional |

3. **Actions → Deploy AVR website → Run workflow.**

### D. Point your domain at GitHub
At your domain registrar’s DNS settings:

* **`www.yourdomain.com`** → `CNAME` → `<your-github-username>.github.io`
* **Bare domain (`yourdomain.com`)** → four `A` records:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

Then **Settings → Pages**: confirm the custom domain shows, wait for the DNS check, and tick
**Enforce HTTPS** (certificate can take up to an hour).

> Without `CUSTOM_DOMAIN` the site deploys to `https://<user>.github.io/<repo>/` and still works.

## 2. Day-to-day: updating content
Edit the Google Sheet. The site picks it up within 6 hours, or immediately via
**Actions → Deploy AVR website → Run workflow**.

| Tab | Columns (header names are case-insensitive) |
|---|---|
| Projects | **Title**, Domain, Level, Section, Batch No, Status, Existing System, Proposed System, Summary, Stack, Link, Published |
| Services | **Title**, Category, Deliverable, Description, Published |
| Products | **Name**, Tag, Summary, Highlights, Published |
| Portfolio | **Title**, Client, Outcome, Tags, Published |
| Gallery | **Title**, **Image**, Caption, Tag, Published |
| Programs | **Type** (`training`/`internships`/`workshops`/`research`), **Title**, Domain, Duration, Mode, Summary, Published |

* `Stack`, `Tags`, `Highlights`: separate items with commas or semicolons.
* `Published`: set to `no` to hide a row without deleting it.
* New `Domain` / `Level` values create filter buttons on the Projects page automatically.
* **Gallery images**: add the file to `public/gallery/` in the repo and write `/gallery/file.webp` in the
  `Image` column, or paste any full `https://…` image URL.
* Safety net: if a tab is missing, renamed, empty or unreachable, that tab is **skipped and the previous
  data stays live** — the site never goes blank because of a sheet mistake. Check the *Sync content*
  step in the Actions log for `!` warnings.

## 3. Everything else
* Company details, phone numbers, address, footer → `config/site.ts`
* About / FAQ text → `app/(public)/about/page.tsx`, `app/(public)/faq/page.tsx`

## 4. Local development
```powershell
npm install
npm run dev                          # http://localhost:3000
$env:SHEET_ID="your_sheet_id"; npm run sync   # pull latest sheet data into public/data
npm run build                        # static output in ./out
npm run typecheck ; npm run lint
node scripts/sync-sheets.mjs --dir sheet-templates   # sync from local CSVs (offline)
```

## Troubleshooting
| Symptom | Fix |
|---|---|
| Sheet edits not showing | Check the sheet is shared “Anyone with the link”, the tab names match exactly, and read the *Sync content* step log. |
| Site loads without CSS/images at `user.github.io/repo` | Don’t set `NEXT_PUBLIC_BASE_PATH` yourself — the workflow does it. Use `CUSTOM_DOMAIN` for a domain. |
| Custom domain says “not properly configured” | DNS not propagated yet (up to 24h), or records don’t match section D. |
| `npm ci` fails in Actions | Run `npm install` locally and commit the updated `package-lock.json`. |
| Contact form opens an email app instead of sending | Expected until you set `FORM_ENDPOINT` (e.g. a free Formspree form). |
