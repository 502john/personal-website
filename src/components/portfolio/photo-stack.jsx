"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TILT = [0, 3, -3]; // degrees for the top print and the two under it
const FRAME = 4 / 3; // the stack's area; each print fits inside it at its photo's own shape

// Size of a print, as large as fits in the frame. Without a known size it fills the frame.
function fit(photo) {
  const shape = photo.width && photo.height ? photo.width / photo.height : FRAME;
  return {
    width: `${Math.min(1, shape / FRAME) * 100}%`,
    height: `${Math.min(1, FRAME / shape) * 100}%`,
  };
}

// Going forward, the top print slides off and the next one comes in at the bottom.
// Going back, the last one slides back on top and the bottom one goes away.
const variants = {
  enter: (step) => (step > 0 ? { opacity: 0, rotate: TILT[2] } : { x: "-110%", opacity: 0, rotate: -12 }),
  exit: (step) => (step > 0 ? { x: "-110%", opacity: 0, rotate: -12 } : { opacity: 0 }),
};

// Photos on the back of an object as a loose stack. Swipe the top one, use the arrow keys,
// or the buttons to go through them.
export function PhotoStack({ photos, title, labels, reduceMotion }) {
  const [[index, step], setPage] = useState([0, 1]);
  const many = photos.length > 1;
  const current = photos[index];

  const go = (by) => {
    if (photos[index + by]) setPage([index + by, by]);
  };

  return (
    <div
      className="mt-5"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative aspect-[4/3]">
        <AnimatePresence initial={false} custom={step}>
          {photos
            .slice(index, index + 3)
            .map((photo, pos) => (
              <motion.div
                key={photo.src}
                style={fit(photo)}
                aria-hidden={pos > 0}
                custom={step}
                variants={variants}
                initial="enter"
                animate={{ x: 0, opacity: 1, rotate: TILT[pos], scale: 1 - pos * 0.03 }}
                exit="exit"
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
                drag={pos === 0 && many ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -60 || velocity.x < -400) go(1);
                  else if (offset.x > 60 || velocity.x > 400) go(-1);
                }}
                className={cn(
                  "absolute inset-0 m-auto rounded-[0.2rem] border-[1.5px] border-foreground/80 bg-background p-1.5",
                  pos === 0 && many && "cursor-grab active:cursor-grabbing"
                )}
              >
                <div className="relative size-full overflow-hidden border border-foreground/60">
                  <Image
                    src={photo.src}
                    alt={photo.alt || title}
                    fill
                    draggable={false}
                    sizes="(min-width: 640px) 25rem, 85vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))
            // Last in the DOM is drawn on top.
            .reverse()}
        </AnimatePresence>
      </div>

      {current.alt && <p className="mt-3 text-center font-serif text-sm italic">{current.alt}</p>}

      {many && (
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          {/* aria-disabled rather than disabled, so focus stays put at either end. */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-disabled={index === 0}
            className="-m-2 p-2 hover:text-foreground aria-disabled:opacity-40"
          >
            ← {labels.previous}
          </button>
          <span aria-live="polite">
            {index + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-disabled={index === photos.length - 1}
            className="-m-2 p-2 hover:text-foreground aria-disabled:opacity-40"
          >
            {labels.next} →
          </button>
        </div>
      )}
    </div>
  );
}
