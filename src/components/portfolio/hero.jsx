import Image from "next/image";
import { ContentLink } from "./content-link";

export function Hero({ name, tagline, about, links }) {
  return (
    <div className="flex flex-col items-center pt-16 text-center sm:pt-20">
      <Image
        src="/imgs/face.svg"
        alt=""
        width={120}
        height={210}
        priority
        className="h-auto w-[120px] dark:invert"
      />
      <h1 className="-mt-11 font-serif text-2xl font-bold">{name}</h1>
      <p className="mt-1 font-serif">{tagline}</p>

      {about && (
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">{about}</p>
      )}

      {links?.length > 0 && (
        <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <li key={link.href}>
              <ContentLink href={link.href} icon={link.icon}>
                {link.label}
              </ContentLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
