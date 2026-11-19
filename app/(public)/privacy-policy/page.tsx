import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">Legal</p>
      <h1 className="mt-4 font-display text-3xl text-ink md:text-5xl">Privacy Policy</h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-slate">
        <p>
          This website is a static information site for {siteConfig.name}. It has no user accounts
          or logins and does not store visitor data on its own servers.
        </p>
        <h2 className="pt-4 font-display text-xl text-ink">Information you send us</h2>
        <p>
          If you use the contact form or email us, we receive the details you choose to share (such
          as your name, email address, phone number and message). We use them only to reply to your
          enquiry and do not sell or share them with third parties for marketing.
        </p>
        <h2 className="pt-4 font-display text-xl text-ink">Third-party services</h2>
        <p>
          The site is hosted on GitHub Pages, and the contact form may be processed by a form
          service. Those providers may log technical data such as IP address under their own
          privacy policies.
        </p>
        <h2 className="pt-4 font-display text-xl text-ink">Contact</h2>
        <p>
          Questions about this policy? Write to{" "}
          <a className="text-steel underline" href={siteConfig.emailHref}>{siteConfig.email}</a>.
        </p>
      </div>
    </section>
  );
}
