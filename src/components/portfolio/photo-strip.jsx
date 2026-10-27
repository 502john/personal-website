"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Up to three thumbnails; clicking one opens it in a <dialog>.
export function PhotoStrip({ photos, labels, className }) {
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);

  // Open after render so focus lands on the close button.
  useEffect(() => {
    if (active && !dialogRef.current.open) dialogRef.current.showModal();
  }, [active]);

  if (!photos?.length) return null;

  const close = () => dialogRef.current.close();

  return (
    <>
      <ul className={cn("grid grid-cols-3 gap-2", className)}>
        {photos.slice(0, 3).map((photo) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setActive(photo)}
              aria-label={`${labels.viewPhoto}: ${photo.alt}`}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-md border border-dotted"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 640px) 10rem, 30vw"
                className="object-cover transition-opacity hover:opacity-90"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[min(64rem,92vw)] rounded-lg border bg-background p-0 text-foreground backdrop:bg-black/70"
      >
        {active && (
          <figure className="p-3">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width ?? 1600}
              height={active.height ?? 1200}
              sizes="92vw"
              className="h-auto max-h-[75vh] w-full object-contain"
            />
            <figcaption className="mt-2 flex items-start justify-between gap-4 text-xs text-muted-foreground">
              <span>{active.caption}</span>
              <button type="button" onClick={close} className="shrink-0 hover:underline">
                {labels.close}
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
