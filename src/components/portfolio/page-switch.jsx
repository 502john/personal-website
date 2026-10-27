"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function PageSwitch({ pages }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center rounded-full border border-dotted bg-background p-0.5 text-xs">
      {pages.map((page) => {
        const current = pathname === page.href;
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={current ? "page" : undefined}
            className={cn(
              // before: extends the tap area vertically without changing the look
              "relative rounded-full px-2.5 py-1 transition-colors before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-['']",
              current ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
