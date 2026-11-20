/**
 * Where the website gets its content from.
 *
 * CMS_URL is the "Web app" URL of the Google Apps Script that is attached to
 * the Google Sheet (see SETUP_GOOGLE_SHEETS.md). Put it in a GitHub repository
 * variable called CMS_URL (the workflow passes it in) or in .env.local while
 * developing:   NEXT_PUBLIC_CMS_URL=https://script.google.com/macros/s/XXXX/exec
 *
 * While it is empty the site simply shows the bundled copy of the content in
 * data/cms-snapshot.json, so the site never breaks.
 */
export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "";

/** Sub-folder the site is hosted under on GitHub Pages. Use "" for a custom domain. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Avr-Research-and-Development";
