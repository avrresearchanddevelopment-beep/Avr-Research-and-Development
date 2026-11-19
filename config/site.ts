/**
 * Organization / company details shown across the public site
 * (header contact bar, footer, contact page, structured metadata, etc).
 *
 * Static config - edit here and push to redeploy.
 */

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative path (e.g. "/gallery/a.webp") with the base path.
 *  Absolute URLs (https://...) are returned untouched. */
export function withBase(src: string): string {
  if (!src || /^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  const clean = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${clean}`;
}

export const siteConfig = {
  // Public site URL (used by sitemap/robots). Set NEXT_PUBLIC_SITE_URL in the
  // GitHub Action to https://your-domain.com
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  // Contact form backend (Formspree / Web3Forms / Google Apps Script URL).
  // If empty, the form falls back to opening the visitor's email app.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",

  name: "AVR Research & Development Pvt. Ltd.",
  shortName: "AVR",
  tagline: "A single home for our services, our work, and the people we work with.",

  logo: `${basePath}/brand/logo.png`,
  logoMark: `${basePath}/brand/logo-mark.png`,

  address: {
    line1: "#F5, Ruby Apartments",
    line2: "Opp Maitri Vanam, Pillar No-1464",
    city: "Hyderabad",
    full: "#F5, Ruby Apartments, Opp Maitri Vanam, Pillar No-1464, Hyderabad.",
  },

  phone: "+91 86882 04486",
  phoneHref: "tel:+918688204486",

  email: "info@avrsofttech.com",
  emailHref: "mailto:info@avrsofttech.com",

  // Top contact ribbon in the header (and the mobile menu).
  contactBar: {
    mobile: "7997129566",
    mobileHref: "tel:+917997129566",
    landline: "+91-4079643677",
    landlineHref: "tel:+914079643677",
    email: "avr@avrreasearchanddevelopment.com",
    emailHref: "mailto:avr@avrreasearchanddevelopment.com",
  },
  // Footer content.
  slogan: "Innovating Today, Empowering Tomorrow",
  footerAddress: [
    "#F5, Ruby Apartments",
    "Opp Maitri Vanam",
    "Near Pillar No. 1464",
    "Hyderabad.",
  ],
  footerMobiles: [
    { label: "7997129566", href: "tel:+917997129566" },
    { label: "9951129566", href: "tel:+919951129566" },
  ],

  hours: "Mon - Sat: 9:30 AM - 7:00 PM",

  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },
} as const;
