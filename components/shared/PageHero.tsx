import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Dark title band used at the top of inner pages. `actions` sit on the
 * right on wide screens (sign out, profile, ...); `children` render under
 * the description.
 */
export function PageHero({
  title,
  description,
  back,
  actions,
  children,
}: {
  title: string;
  description?: string;
  back?: { href: string; label: string };
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="blueprint bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pb-24 md:pt-14">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0 max-w-2xl">
            {back && (
              <Link
                href={back.href}
                className="text-sm text-paper/60 transition-colors hover:text-paper"
              >
                &larr; {back.label}
              </Link>
            )}
            <h1
              className={`break-words font-display text-4xl leading-[1.08] tracking-tight md:text-5xl ${
                back ? "mt-5" : ""
              }`}
            >
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/70">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}