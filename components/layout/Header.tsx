"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { assetUrl, telHref } from "@/lib/cms";
import { useCms } from "@/lib/useCms";

export function Header() {
  const [open, setOpen] = useState(false);
  const { cms, s } = useCms();

  // Menu, contact bar, logo and button text all come from the Google Sheet
  // (tabs: Navigation and Settings).
  const navLinks = cms.navigation.map((n) => ({ href: n.path, label: n.label }));
  const mobile = s("mobile_1", siteConfig.contactBar.mobile);
  const landline = s("landline", siteConfig.contactBar.landline);
  const email = s("email", siteConfig.contactBar.email);
  const logo = assetUrl(s("logo_url")) || siteConfig.logo;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="hidden border-b border-steel-dim bg-steel px-4 py-2 sm:px-6 md:block lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-paper">
          <div className="flex gap-6">
            <a href={telHref(mobile)} className="transition-colors hover:text-paper/70">
              Mobile: {mobile}
            </a>
            <a href={telHref(landline)} className="transition-colors hover:text-paper/70">
              Landline: {landline}
            </a>
          </div>
          <a href={`mailto:${email}`} className="transition-colors hover:text-paper/70">
            {email}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/*
            logo.png bundles the full AVR wordmark + "RESEARCH & DEVELOPMENT
            Pvt. Ltd." line in one image, with a dark brown text color.
            That text is nearly invisible directly on this dark navbar, so
            the logo sits on a small white chip for contrast instead of
            being rendered next to separate text.
          */}
          <Link href="/" className="flex items-center group ml-2 sm:ml-4" onClick={() => setOpen(false)}>
            <span className="flex items-center transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt={s("site_name", siteConfig.name)}
                width={1523}
                height={666}
                className="h-12 sm:h-14 w-auto object-contain scale-110"
              />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brass transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-bold bg-brass text-paper px-4 py-2 rounded-full hover:bg-brass-dim transition-all shadow-[0_0_15px_rgba(138,85,48,0.3)]"
            >
              {s("cta_label", "Enquire")}
            </Link>
          </div>

          {/* Mobile menu toggle - the previous version had no way to
              navigate at all on small/medium screens since nav/portal
              links were both `hidden` below `lg`/`md`. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-slate hover:text-brass"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* The contact bar above is `hidden md:block`, so on phones and
              small tablets this is the only place to find phone/email/
              hours — without it that info would be unreachable below lg. */}
          <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 text-xs text-slate">
            <a href={telHref(mobile)} className="transition-colors hover:text-brass">
              Mobile: {mobile}
            </a>
            <a href={telHref(landline)} className="transition-colors hover:text-brass">
              Landline: {landline}
            </a>
            <a href={`mailto:${email}`} className="transition-colors hover:text-brass">
              {email}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}