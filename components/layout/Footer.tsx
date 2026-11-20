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
