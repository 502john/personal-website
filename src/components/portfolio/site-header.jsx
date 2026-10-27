import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { PageSwitch } from "./page-switch";

export function SiteHeader({ pages }) {
  return (
    <header className="pointer-events-none absolute inset-x-4 top-4 z-50 flex items-center justify-between">
      <div className="pointer-events-auto">
        <PageSwitch pages={pages} />
      </div>
      <div className="pointer-events-auto flex">
        {/* Padding enlarges the tap area; the negative margin keeps the icon in place. */}
        <AnimatedThemeToggler className="-m-3 p-3" />
      </div>
    </header>
  );
}
