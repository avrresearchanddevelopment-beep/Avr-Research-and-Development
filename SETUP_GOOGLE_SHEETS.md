# Google Sheets as the admin panel - setup & daily use

```
Google Sheet  --(Apps Script web app)-->  website
 (admin edits)         Code.gs             (shows it live)

Contact form  --POST--> Apps Script --> private "Messages" tab (+ optional email)
```

The Sheet replaces the old database and the old admin dashboard. The sheet itself stays **private**
(share it only with your admins as *Editor*); the script only sends the public tabs to the website.

---

## One-time setup (about 15 minutes)

### 1. Create the Google Sheet
1. Open <https://sheets.new>.
2. **File > Import > Upload** and choose `AVR_Site_CMS.xlsx` > **Replace spreadsheet** > Import.
3. You should now see these tabs: `README, Settings, Navigation, Highlights, About, FAQ, Domains, Projects,
   Programs, Services, Products, Portfolio, Gallery, Messages`. Do not rename them or the header row.
4. Name the file e.g. *AVR Website CMS*. **Share** it with your admin team as Editor. Leave "General access" = Restricted.

### 2. Add the script
1. In the sheet: **Extensions > Apps Script**.
2. Delete the sample code, paste everything from `apps-script/Code.gs`, click **Save**.
3. (Optional) At the top set `NOTIFY_EMAIL: 'you@example.com'` to get an email for each new message.
4. Select the function `authorizeOnce` in the toolbar > **Run** > review permissions > **Allow**
   (Google shows "unverified app" because it is your own script: Advanced > Go to project).

### 3. Publish it as a web app
1. **Deploy > New deployment > (gear) Web app**
2. *Execute as:* **Me**  -  *Who has access:* **Anyone**  > **Deploy**.
3. Copy the **Web app URL** (ends with `/exec`). Open it in a browser: you should see JSON starting with `{"ok":true`.

> If you edit `Code.gs` later: **Deploy > Manage deployments > pencil > Version: New version > Deploy**.
> Otherwise the old code keeps running. (The URL stays the same.)

### 4. Connect the website
1. GitHub repo > **Settings > Secrets and variables > Actions > Variables > New repository variable**
   Name `CMS_URL`, value = the Web app URL.
2. **Actions > Deploy AVR Static Website > Run workflow.** After it finishes, the site is live and connected.

For local development create `.env.local` with `NEXT_PUBLIC_CMS_URL=<the same URL>`.

---

## Daily use (for the admin)

| I want to ... | Do this |
|---|---|
| Change phone / email / address / hours | **Settings** tab, edit the *Value* column |
| Change home page title, text, buttons | **Settings** (`hero_*`) and **Highlights** tab (cards) |
| Add a project | **Projects** tab: add a row, set *Published = Yes*. New *Domain* names create a filter button automatically |
| Add training / internship / workshop / research | **Programs** tab, pick the *Type* |
| Hide something without deleting | *Published = No* |
| Change the order | **Order** column (smaller = first) |
| Hide or show a menu link | **Navigation** tab, *Show = Yes/No* |
| Edit About / FAQ | **About** / **FAQ** tabs |
| Add pictures | Paste a link in **Image URL**. Google Drive: upload the picture, *Share > Anyone with the link*, paste that link |
| Read enquiries | **Messages** tab (private). Change *Status* to New / Read / Responded |

Edits show on the website within about a minute (hard refresh with Ctrl+F5 if you do not see them).
Programme cards: put a Google Form link in **Apply Link** to send applicants to a form; leave it empty to use the contact form.

---

## Good to know

- **Not possible without a database/server:** student and client logins, "my enrolments" dashboards, uploading files from the site.
  Enquiries (including "Apply / Enquire" buttons) arrive in the **Messages** tab instead.
- **Public by design:** anything in the 12 public tabs is readable by anyone who opens the website's data URL.
  Never put passwords or private notes in those tabs. Put private notes in a new tab with another name - it is never published.
- **Spam:** the form has a hidden trap field, a 1-message-per-minute-per-email limit, and cell values are escaped against formula injection.
- **If the sheet or script is unavailable** the site keeps showing the last copy baked into the build (`data/cms-snapshot.json`);
  the workflow also rebuilds every 6 hours to refresh that copy.

## Troubleshooting

| Problem | Fix |
|---|---|
| Contact form says "not connected yet" | `CMS_URL` variable missing when the site was built. Add it and re-run the workflow |
| Browser shows an error / login page for the web app URL | Deployment access must be **Anyone** (step 3) |
| A change does not show | Row has *Published = Yes*? Header/tab names unchanged? Wait a minute, hard refresh |
| A whole page went empty | A tab or header was renamed. Restore the original name (see README tab) |
| Code change in Apps Script has no effect | Create a **New version** in Manage deployments |
