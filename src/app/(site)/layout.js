import { SiteHeader } from "@/components/portfolio/site-header";

export default function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <SiteHeader />
      {children}
    </div>
  );
}
