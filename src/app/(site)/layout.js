import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { site } from "@/content/site";

export default function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <SiteHeader pages={site.pages} />
      {children}
      <SiteFooter pages={site.pages} links={site.links} label={site.labels.pages} />
    </div>
  );
}
