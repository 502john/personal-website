import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function SiteHeader() {
  return (
    <header className="absolute top-4 right-4 z-50">
      <AnimatedThemeToggler />
    </header>
  );
}
