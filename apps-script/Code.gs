/**
 * AVR website backend  -  Google Apps Script attached to the Google Sheet.
 *
 *   GET   (the website reads content)  -> JSON of every public tab. Only rows with
 *                                         Published/Show = Yes, sorted by "Order".
 *   POST  (the contact form)           -> appends a row to the private "Messages" tab
 *                                         (+ optional email to the admin).
 *
 * The "Messages" tab is never returned by GET, so the sheet itself can stay private.
 * Setup steps: see SETUP_GOOGLE_SHEETS.md
 */

var CONFIG = {
  // Optional: receive an email for every new message. Leave '' to turn off.
  NOTIFY_EMAIL: '',

  // How long the website JSON is cached (seconds). Any manual edit in the sheet clears it at once.
  CACHE_SECONDS: 600,

  // Tabs that are sent to the website. (Names must match the tab names in the sheet.)
  PUBLIC_TABS: ['Settings', 'Navigation', 'Highlights', 'About', 'FAQ', 'Domains', 'Projects',
                'Programs', 'Services', 'Products', 'Portfolio', 'Gallery'],

  MESSAGES_TAB: 'Messages',
  MESSAGES_HEADERS: ['Timestamp', 'Type', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Page', 'Status'],

  MAX_LEN: { name: 120, email: 160, phone: 40, subject: 200, message: 4000, page: 200 }
};

/* ================================================================ READ (GET) */

function doGet() {
  try {
    var cached = readCache_();
    if (cached) return out_(cached);

    var text = JSON.stringify(buildPayload_());
    writeCache_(text);
    return out_(text);
  } catch (err) {
    return out_(JSON.stringify({ ok: false, error: String(err) }));
  }
}

function buildPayload_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tabs = {};

  CONFIG.PUBLIC_TABS.forEach(function (name) {
    var sh = ss.getSheetByName(name);
    if (!sh) return; // missing tab -> website keeps its built-in content for it
    var key = name.toLowerCase();
    var values = sh.getDataRange().getDisplayValues();
    if (values.length === 0) { tabs[key] = key === 'settings' ? {} : []; return; }

    var headers = values[0].map(camelKey_);
    var records = [];
    for (var r = 1; r < values.length; r++) {
      var rec = {}, hasData = false;
      for (var c = 0; c < headers.length; c++) {
        if (!headers[c]) continue;
        var v = String(values[r][c]).trim();
        rec[headers[c]] = v;
        if (v) hasData = true;
      }
      if (hasData) records.push(rec);
    }

    if (key === 'settings') {
      var map = {};
      records.forEach(function (rec) {
        if (rec.key && rec.key.charAt(0) !== '_') map[rec.key] = rec.value || '';
      });
      tabs[key] = map;
      return;
    }

    // visibility: "Published" (or "Show" in Navigation). No such column = always visible.
    var flag = headers.indexOf('published') >= 0 ? 'published' : (headers.indexOf('show') >= 0 ? 'show' : null);
    if (flag) records = records.filter(function (rec) { return truthy_(rec[flag]); });

    // order: smaller first, blanks last, ties keep sheet order
    var indexed = records.map(function (rec, i) { return { rec: rec, i: i }; });
    indexed.sort(function (a, b) {
      var oa = parseFloat(a.rec.order), ob = parseFloat(b.rec.order);
      oa = isNaN(oa) ? 1e9 : oa; ob = isNaN(ob) ? 1e9 : ob;
      return oa !== ob ? oa - ob : a.i - b.i;
    });
    tabs[key] = indexed.map(function (x) { return x.rec; });
  });

  return { ok: true, updatedAt: new Date().toISOString(), tabs: tabs };
}

/** "Image URL" -> imageUrl, "In Footer" -> inFooter, "GitHub URL" -> githubUrl */
function camelKey_(header) {
  var parts = String(header).trim().split(/[^A-Za-z0-9]+/).filter(function (p) { return p; });
  if (!parts.length) return '';
  return parts[0].toLowerCase() + parts.slice(1).map(function (p) {
    return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
  }).join('');
}

function truthy_(v) {
  return ['yes', 'true', 'y', '1', '\u2713', '\u2714', 'published', 'show'].indexOf(String(v).trim().toLowerCase()) >= 0;
}

/* =============================================================== WRITE (POST) */

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (body.website) return out_(JSON.stringify({ ok: true })); // honeypot filled = bot; pretend success
    if (body.action !== 'contact') return out_(JSON.stringify({ ok: false, error: 'Unknown request.' }));

    var m = {
      name: clean_(body.name, CONFIG.MAX_LEN.name),
      email: clean_(body.email, CONFIG.MAX_LEN.email),
      phone: clean_(body.phone, CONFIG.MAX_LEN.phone),
      subject: clean_(body.subject, CONFIG.MAX_LEN.subject),
      message: clean_(body.message, CONFIG.MAX_LEN.message),
      page: clean_(body.page, CONFIG.MAX_LEN.page)
    };
    if (!m.name || !m.message) return out_(JSON.stringify({ ok: false, error: 'Please fill in your name and message.' }));
    if (!/^\S+@\S+\.\S+$/.test(m.email)) return out_(JSON.stringify({ ok: false, error: 'Please enter a valid email address.' }));

    // one message per email per minute (stops accidental double clicks and simple spam)
    var cache = CacheService.getScriptCache();
    var rlKey = 'rl_' + m.email.toLowerCase();
    if (cache.get(rlKey)) {
      return out_(JSON.stringify({ ok: false, error: 'Please wait a minute before sending another message.' }));
    }
    cache.put(rlKey, '1', 60);

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sh = messagesSheet_();
      sh.appendRow([
        new Date(), 'Contact', safeCell_(m.name), safeCell_(m.email), safeCell_(m.phone),
        safeCell_(m.subject), safeCell_(m.message), safeCell_(m.page), 'New'
      ]);
    } finally {
      lock.releaseLock();
    }

    notify_(m);
    return out_(JSON.stringify({ ok: true }));
  } catch (err) {
    return out_(JSON.stringify({ ok: false, error: 'Could not save your message. Please try again or call us.' }));
  }
}

function messagesSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.MESSAGES_TAB);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.MESSAGES_TAB);
    sh.appendRow(CONFIG.MESSAGES_HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify_(m) {
  if (!CONFIG.NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      replyTo: m.email,
      subject: '[AVR website] ' + (m.subject || 'New message from ' + m.name),
      body: 'Name: ' + m.name + '\nEmail: ' + m.email + '\nPhone: ' + m.phone +
            '\nPage: ' + m.page + '\n\n' + m.message
    });
  } catch (err) { /* the message is already saved; a mail failure must not fail the form */ }
}

function clean_(v, max) { return String(v == null ? '' : v).replace(/\s+$/g, '').replace(/^\s+/g, '').substring(0, max); }

/** Stops spreadsheet-formula injection: text starting with = + - @ would otherwise run as a formula. */
function safeCell_(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }

/* ===================================================================== CACHE */

var CHUNK = 30000; // characters per cache entry (cache limit is 100 KB per entry; non-English text uses more bytes)

function readCache_() {
  var cache = CacheService.getScriptCache();
  var n = parseInt(cache.get('cms_n') || '0', 10);
  if (!n) return null;
  var keys = [];
  for (var i = 0; i < n; i++) keys.push('cms_' + i);
  var got = cache.getAll(keys), text = '';
  for (var j = 0; j < n; j++) {
    if (got['cms_' + j] == null) return null;
    text += got['cms_' + j];
  }
  return text;
}

function writeCache_(text) {
  var cache = CacheService.getScriptCache();
  var n = Math.ceil(text.length / CHUNK), items = { cms_n: String(n) };
  for (var i = 0; i < n; i++) items['cms_' + i] = text.substr(i * CHUNK, CHUNK);
  try { cache.putAll(items, CONFIG.CACHE_SECONDS); } catch (err) { /* too big to cache: just skip caching */ }
}

function clearCache_() {
  var cache = CacheService.getScriptCache();
  var n = parseInt(cache.get('cms_n') || '0', 10), keys = ['cms_n'];
  for (var i = 0; i < Math.max(n, 40); i++) keys.push('cms_' + i);
  cache.removeAll(keys);
}

/** Runs automatically on every manual edit in the sheet, so changes show on the website within seconds. */
function onEdit() { clearCache_(); }

/** Run this once from the Apps Script editor after pasting the code: it asks Google for the permissions the script needs. */
function authorizeOnce() {
  SpreadsheetApp.getActiveSpreadsheet().getName();
  CacheService.getScriptCache();
  LockService.getScriptLock();
  if (CONFIG.NOTIFY_EMAIL) MailApp.getRemainingDailyQuota();
  clearCache_();
}

function out_(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
