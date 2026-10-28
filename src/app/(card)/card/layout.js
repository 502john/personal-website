import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: site.name, description: "Links to my work." });

export default function CardLayout({ children }) {
  return children;
}
