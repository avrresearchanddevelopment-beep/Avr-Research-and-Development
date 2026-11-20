"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { assetUrl, telHref } from "@/lib/cms";
import { useCms } from "@/lib/useCms";

export function Footer() {
  const { cms, s } = useCms();

  // Everything below comes from the Google Sheet (tabs: Navigation, Settings).
  const exploreLinks = cms.navigation.filter((n) => n.inFooter);
  const addressLines = s("footer_address", siteConfig.footerAddress.join(" | "))
    .split("|")
    .map((l) => l.trim())
    .filter(Boolean);
  const mobiles = [s("mobile_1"), s("mobile_2")].filter(Boolean);
  const email = s("email", siteConfig.contactBar.email);
  const logo = assetUrl(s("logo_url")) || siteConfig.logo;
  const whatsappUrl = s("whatsapp_url") || "https://wa.me/917997129566";
  const instagramUrl = s("instagram_url") || "https://instagram.com";
  const linkedinUrl = s("linkedin_url") || "https://linkedin.com";
  const emailAddr = s("email") || "avr@avrresearchanddevelopment.com";
  const name = s("site_name", siteConfig.name);
  const privacy = s("privacy_url");
  const terms = s("terms_url");

  return (
    <footer className="bg-ink text-paper/70 border-t border-paper/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={name} width={1523} height={666} className="h-16 w-auto object-contain" />
            </Link>

            <p className="mt-5 max-w-sm font-display text-xl leading-snug text-paper">
              {s("slogan", siteConfig.slogan)}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-green-400 hover:bg-green-500/15 hover:text-green-400"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.47 0 .11 5.36.11 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.9 11.9 0 005.82 1.49h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.5-8.42zM12.07 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.84 9.84 0 01-1.51-5.25c0-5.44 4.43-9.87 9.87-9.87 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 012.89 6.98c0 5.44-4.43 9.84-9.88 9.84zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
                </svg>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-pink-400 hover:bg-pink-500/15 hover:text-pink-400"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={`mailto:${emailAddr}`}
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-amber-400 hover:bg-amber-500/15 hover:text-amber-400"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-sky-400 hover:bg-sky-500/15 hover:text-sky-400"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brass">Explore</h4>

            <ul className="space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-paper/70 transition-colors hover:text-brass">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brass">Contact</h4>

            <ul className="space-y-4 text-sm">
              <li className="leading-relaxed text-paper/70">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>

              {mobiles.length > 0 && (
                <li className="text-paper/70">
                  <span className="text-paper/50">Mobile: </span>
                  {mobiles.map((m, i) => (
                    <span key={m}>
                      {i > 0 && " / "}
                      <a href={telHref(m)} className="transition-colors hover:text-brass">
                        {m}
                      </a>
                    </span>
                  ))}
                </li>
              )}

              <li>
                <a href={`mailto:${email}`} className="break-words text-paper/70 transition-colors hover:text-brass">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-paper/10 pt-8 text-xs text-paper/60 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {name} All rights reserved.
          </p>

          <div className="flex gap-6">
            {privacy && (
              <a href={privacy} className="transition-colors hover:text-paper">
                Privacy Policy
              </a>
            )}
            {terms && (
              <a href={terms} className="transition-colors hover:text-paper">
                Terms of Service
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
