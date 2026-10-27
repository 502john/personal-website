import Link from "next/link";
import {
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const icons = {
  file: FileTextIcon,
  linkedin: LinkedInLogoIcon,
  github: GitHubLogoIcon,
  mail: EnvelopeClosedIcon,
};

// Site pages navigate in place; files and external links open in a new tab.
export function ContentLink({ href, icon, className, children }) {
  const Icon = icons[icon];
  const classes = cn("group inline-flex items-center gap-2 hover:underline", className);
  const body = (
    <>
      {Icon && (
        <Icon aria-hidden="true" className="h-4 w-4 opacity-70 transition group-hover:opacity-100" />
      )}
      <span>{children}</span>
    </>
  );

  const isPage = href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
  if (isPage) {
    return <Link href={href} className={classes}>{body}</Link>;
  }

  const newTab = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={classes}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {body}
    </a>
  );
}
