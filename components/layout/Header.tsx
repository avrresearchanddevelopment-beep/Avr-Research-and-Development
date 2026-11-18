"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const portalLinks = [
  { href: "/student", label: "Student" },
  { href: "/client", label: "Client" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="hidden border-b border-steel-dim bg-steel px-4 py-2 sm:px-6 md:block lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-paper">
          <div className="flex gap-6">
            <a href={siteConfig.contactBar.mobileHref} className="transition-colors hover:text-paper/70">
              Mobile: {siteConfig.contactBar.mobile}
            </a>
            <a href={siteConfig.contactBar.landlineHref} className="transition-colors hover:text-paper/70">
              Landline: {siteConfig.contactBar.landline}
            </a>
          </div>
          <a href={siteConfig.contactBar.emailHref} className="transition-colors hover:text-paper/70">
            {siteConfig.contactBar.email}
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
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={1523}
                height={666}
                priority
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
            {portalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-sm font-bold bg-brass text-paper px-4 py-2 rounded-full hover:bg-brass-dim transition-all shadow-[0_0_15px_rgba(138,85,48,0.3)]"
            >
              Admin
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
            {[...navLinks, ...portalLinks, { href: "/admin", label: "Admin" }].map((link) => (
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
            <a href={siteConfig.contactBar.mobileHref} className="transition-colors hover:text-brass">
              Mobile: {siteConfig.contactBar.mobile}
            </a>
            <a href={siteConfig.contactBar.landlineHref} className="transition-colors hover:text-brass">
              Landline: {siteConfig.contactBar.landline}
            </a>
            <a href={siteConfig.contactBar.emailHref} className="transition-colors hover:text-brass">
              {siteConfig.contactBar.email}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}