import { SiteHeader } from "@/components/portfolio/site-header";
import { site } from "@/content/site";

export default function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <SiteHeader pages={site.pages} />
      {children}
    </div>
  );
}
