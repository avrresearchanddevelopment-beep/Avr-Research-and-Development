import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">Legal</p>
      <h1 className="mt-4 font-display text-3xl text-ink md:text-5xl">Terms of Service</h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-slate">
        <p>
          By using this website you agree to these terms. The content is provided by{" "}
          {siteConfig.name} for general information about our services, projects and programs.
        </p>
        <h2 className="pt-4 font-display text-xl text-ink">Content</h2>
        <p>
          We work to keep information accurate and up to date, but project listings, program
          details and availability may change without notice. Nothing on this site is a binding
          offer; engagements are confirmed separately in writing.
        </p>
        <h2 className="pt-4 font-display text-xl text-ink">Intellectual property</h2>
        <p>
          Text, logos and images on this site belong to {siteConfig.name} or its licensors and may
          not be reproduced without permission.
        </p>
        <h2 className="pt-4 font-display text-xl text-ink">Contact</h2>
        <p>
          Questions? Write to{" "}
          <a className="text-steel underline" href={siteConfig.emailHref}>{siteConfig.email}</a>.
        </p>
      </div>
    </section>
  );
}
