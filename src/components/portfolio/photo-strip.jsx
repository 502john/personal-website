"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Width over height, or 4:3 when the size isn't known.
const shape = (photo) => (photo.width && photo.height ? photo.width / photo.height : 4 / 3);

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
      <ul className={cn("flex gap-2", className)}>
        {photos.slice(0, 3).map((photo) => (
          // Widths in proportion to each photo's shape, so the row shares one height and
          // nothing is cropped.
          <li key={photo.src} className="min-w-0" style={{ flex: `${shape(photo)} 1 0%` }}>
            <button
              type="button"
              onClick={() => setActive(photo)}
              aria-label={`${labels.viewPhoto}: ${photo.alt}`}
              className="relative block w-full overflow-hidden rounded-md border border-dotted"
              style={{ aspectRatio: shape(photo) }}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 640px) 20rem, 50vw"
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
