"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DeskFocus } from "@/components/portfolio/desk-focus";
import { cn } from "@/lib/utils";
import { Architrave, Column, Cornice, FriezeTile, Pediment, Steps, TEMPLE } from "./temple-art";

// The temple is laid out in the art's own coordinates, as shares of its box, so it scales as
// one drawing. Text is sized in cqw (shares of the temple's width) for the same reason.
const W = TEMPLE.width;
const H = TEMPLE.height;
const place = ({ x, y, width, height }) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(width / W) * 100}%`,
  height: `${(height / H) * 100}%`,
});

// Each piece draws itself in like a pen sketch, from the ground up.
const DRAW = {
  steps: 0,
  columns: [0.35, 0.5, 0.65],
  architrave: 1,
  frieze: 1.2,
  cornice: 1.35,
  pediment: 1.5,
  text: 2.1,
};
const drawn = "absolute [&_path]:[stroke-dasharray:1] [&_path]:animate-draw motion-reduce:[&_path]:animate-none";
const delay = (seconds) => ({ "--delay": `${seconds}s` });

// The frieze under the roof: tiles of carved grooves and square openings, with the
// preparation photos and videos showing through the openings. It drifts slowly sideways
// (two copies of the tiles, so the loop is seamless) and stops while pointed at or focused.
function Frieze({ media, reduceMotion, onOpen }) {
  const { tileWidth, width } = TEMPLE.frieze;
  const count = Math.max(width / tileWidth, media.length);
  const tiles = Array.from({ length: count }, (_, i) => media[i % media.length]);
  const moving = media.length > 0 && !reduceMotion;
  const m = TEMPLE.metope;
  const opening = {
    left: `${(m.x / tileWidth) * 100}%`,
    top: `${(m.y / TEMPLE.frieze.height) * 100}%`,
    width: `${(m.width / tileWidth) * 100}%`,
    height: `${(m.height / TEMPLE.frieze.height) * 100}%`,
  };

  return (
    <div
      className="absolute overflow-hidden border-x-[1.5px] border-current"
      style={{ ...place(TEMPLE.frieze), ...delay(DRAW.frieze) }}
    >
      <div
        className={cn(
          "flex h-full w-max",
          moving && "animate-[frieze_var(--loop)_linear_infinite] hover:[animation-play-state:paused] has-focus-visible:[animation-play-state:paused]"
        )}
        style={{ "--loop": `${count * 4}s` }}
      >
        {[0, 1].map((copy) =>
          tiles.map((item, i) => {
            const Tile = item ? "button" : "div";
            return (
              <Tile
                key={`${copy}-${i}`}
                {...(item && {
                  type: "button",
                  "aria-label": item.alt || `Preparation ${i + 1}`,
                  onClick: (e) => onOpen(e.currentTarget),
                })}
                // The second copy only fills the loop, so it stays out of the tab order.
                {...(copy === 1 && { "aria-hidden": true, tabIndex: -1 })}
                className={cn("relative h-full shrink-0", item && "cursor-pointer")}
                style={{ width: `${(tileWidth / W) * 100}cqw` }}
              >
                {item && (
                  <span className="absolute overflow-hidden" style={opening}>
                    {item.video ? (
                      <video src={`${item.src}#t=0.1`} muted playsInline preload="metadata" className="size-full object-cover" />
                    ) : (
                      <Image src={item.src} alt="" fill sizes="8rem" draggable={false} className="object-cover" />
                    )}
                  </span>
                )}
                <FriezeTile className={cn(drawn, "inset-0 size-full")} style={delay(DRAW.frieze)} />
              </Tile>
            );
          })
        )}
      </div>
    </div>
  );
}

export function Temple({ content, photos, videos, labels }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(null); // the column being pointed at or focused
  const [focus, setFocus] = useState(null);
  const media = [...photos, ...videos.map((v) => ({ ...v, video: true }))];

  const open = (item, target) => {
    const rect = target.getBoundingClientRect();
    setActive(null);
    setFocus({
      item,
      origin: {
        rotate: 0,
        dx: rect.left + rect.width / 2 - innerWidth / 2,
        dy: rect.top + rect.height / 2 - innerHeight / 2,
      },
    });
  };

  const card = (part) => ({ kind: "note", title: part.title, story: part.story, links: part.links });
  const preparation = { kind: "photos", title: content.preparation, photos, videos };
  const fadeIn = {
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : DRAW.text },
  };

  return (
    <>
      <div className="relative w-full text-foreground/85 [container-type:inline-size]" style={{ aspectRatio: `${W} / ${H}` }}>
        <Steps className={drawn} style={{ ...place(TEMPLE.steps), ...delay(DRAW.steps) }} />

        {TEMPLE.columns.map((box, i) => {
          const pillar = content.pillars[i];
          return (
            <button
              key={pillar.label}
              type="button"
              aria-haspopup="dialog"
              aria-label={pillar.title}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={(e) => open(card(pillar), e.currentTarget)}
              className={cn(
                "absolute cursor-pointer transition duration-300 motion-reduce:transition-none",
                active === i && "-translate-y-[1.5%] text-foreground",
                active !== null && active !== i && "opacity-35"
              )}
              style={place(box)}
            >
              <Column className={cn(drawn, "inset-0 size-full")} style={delay(DRAW.columns[i])} />
            </button>
          );
        })}

        <Architrave className={drawn} style={{ ...place(TEMPLE.architrave), ...delay(DRAW.architrave) }} />
        <motion.p
          {...fadeIn}
          className="absolute flex items-center justify-center font-serif text-[max(9px,1.9cqw)] tracking-[0.3em] uppercase"
          style={place(TEMPLE.inscription)}
        >
          {content.inscription}
        </motion.p>

        <Frieze media={media} reduceMotion={reduceMotion} onOpen={(target) => open(preparation, target)} />
        <Cornice className={drawn} style={{ ...place(TEMPLE.cornice), ...delay(DRAW.cornice) }} />

        {/* The roof is why me, resting on the pillars. Clipped to its triangle so only the roof opens it. */}
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={content.whyMe.title}
          onClick={(e) => open(card(content.whyMe), e.currentTarget)}
          className="group absolute cursor-pointer [clip-path:polygon(0_100%,50%_0,100%_100%)]"
          style={place(TEMPLE.pediment)}
        >
          <Pediment className={cn(drawn, "inset-0 size-full")} style={delay(DRAW.pediment)} />
          <motion.span
            {...fadeIn}
            className="absolute inset-x-0 bottom-[18%] text-center font-serif text-[max(11px,2.4cqw)] italic group-hover:text-foreground"
          >
            {content.whyMe.label}
          </motion.span>
        </button>

        {/* The pillars' names, below the steps. */}
        {TEMPLE.columnCenters.map((x, i) => (
          <motion.span
            key={x}
            {...fadeIn}
            aria-hidden="true"
            className={cn(
              "absolute -translate-x-1/2 font-serif text-[max(11px,1.8cqw)] italic transition-opacity duration-300",
              active !== null && active !== i && "opacity-35"
            )}
            style={{ left: `${(x / W) * 100}%`, top: `${((TEMPLE.steps.y + TEMPLE.steps.height + 6) / H) * 100}%` }}
          >
            {content.pillars[i].label}
          </motion.span>
        ))}
      </div>

      {focus && (
        <DeskFocus
          item={focus.item}
          origin={focus.origin}
          labels={labels}
          reduceMotion={reduceMotion}
          onClosed={() => setFocus(null)}
        />
      )}
    </>
  );
}
