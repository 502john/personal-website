"use client";

import { useReducedMotion } from "motion/react";
import { useState } from "react";
import { DeskFocus } from "@/components/portfolio/desk-focus";
import { DeskObject } from "@/components/portfolio/desk-object";
import { PhotoStack } from "@/components/portfolio/photo-stack";

// Objects from the /me desk, small and in a row. Tapping one picks it up and flips it, as on the desk.
export function DeskShelf({ items, labels }) {
  const reduceMotion = useReducedMotion();
  const [focus, setFocus] = useState(null);

  return (
    <>
      <ul className="flex flex-wrap items-end gap-6 text-[10px]">
        {items.map((item, i) => (
          <li key={item.slug}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={item.title}
              className="block cursor-pointer text-left transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none"
              style={{ opacity: focus?.index === i ? 0 : 1 }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setFocus({
                  index: i,
                  rotate: 0,
                  dx: rect.left + rect.width / 2 - innerWidth / 2,
                  dy: rect.top + rect.height / 2 - innerHeight / 2,
                });
              }}
            >
              <DeskObject item={item} />
            </button>
          </li>
        ))}
      </ul>

      {focus && (
        <DeskFocus
          key={focus.index}
          item={items[focus.index]}
          origin={focus}
          labels={labels}
          reduceMotion={reduceMotion}
          onClosed={() => setFocus(null)}
        />
      )}
    </>
  );
}

// The preparation photos as a stack to flip through, then any videos.
export function Preparation({ photos, videos, labels, title }) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      {photos.length > 0 && <PhotoStack photos={photos} title={title} labels={labels} reduceMotion={reduceMotion} />}
      {videos.map((video) => (
        <video
          key={video.src}
          src={`${video.src}#t=0.1`}
          aria-label={video.alt || title}
          controls
          playsInline
          preload="metadata"
          className="mt-5 block w-full rounded-md border border-dotted bg-black"
        />
      ))}
    </>
  );
}
