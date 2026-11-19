
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const exploreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/training", label: "Training" },
  { href: "/internships", label: "Internships" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper/70 border-t border-paper/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 shadow-sm"
            >
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={1523}
                height={666}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm font-display text-xl leading-snug text-paper">
              {siteConfig.slogan}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brass">
              Explore
            </h4>

            <ul className="space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/70 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brass">
              Contact
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="leading-relaxed text-paper/70">
                {siteConfig.footerAddress.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>

              <li className="text-paper/70">
                <span className="text-paper/50">Mobile: </span>
                {siteConfig.footerMobiles.map((m, i) => (
                  <span key={m.href}>
                    {i > 0 && " / "}
                    <a href={m.href} className="transition-colors hover:text-brass">
                      {m.label}
                    </a>
                  </span>
                ))}
              </li>

              <li>
                <a
                  href={siteConfig.contactBar.emailHref}
                  className="break-words text-paper/70 transition-colors hover:text-brass"
                >
                  {siteConfig.contactBar.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-paper/10 pt-8 text-xs text-paper/60 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name} All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-paper"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-paper"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
