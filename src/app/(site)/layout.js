import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { site } from "@/content/site";

export default function SiteLayout({ children }) {
  return (
    // The content grows to fill the screen, so on short pages the footer still sits at the bottom.
    <div className="relative flex min-h-svh flex-col">
      <SiteHeader pages={site.pages} />
      <main className="flex-1">{children}</main>
      <SiteFooter pages={site.pages} links={site.links} label={site.labels.pages} />
    </div>
  );
}
