"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ContentLink } from "./content-link";

// The end of every page: the same pages as the switch, then the contact links.
export function SiteFooter({ pages, links, label }) {
  const pathname = usePathname();

  return (
    <footer className="mx-auto w-full max-w-2xl px-4 pb-10 sm:px-6">
      <div className="flex flex-col gap-3 border-t border-dotted pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <nav aria-label={label}>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {pages.map((page) => {
              const current = page.href === "/" ? pathname === "/" : pathname.startsWith(page.href);
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    aria-current={current ? "page" : undefined}
                    className={cn("hover:text-foreground hover:underline", current && "text-foreground")}
                  >
                    {page.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <ContentLink href={link.href} className="hover:text-foreground">
                {link.label}
              </ContentLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
