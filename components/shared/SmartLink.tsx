import Link from "next/link";
import type { ReactNode } from "react";

/** Internal paths use the Next router (basePath-aware); full URLs open as normal links. */
export function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    const external = /^https?:/i.test(href);
    return (
      <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href || "/"} className={className}>
      {children}
    </Link>
  );
}
