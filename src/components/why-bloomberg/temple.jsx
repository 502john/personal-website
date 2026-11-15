"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Architrave, Column, Cornice, FriezeTile, Pediment, Steps, TEMPLE } from "./temple-art";

// The temple is laid out in the art's own coordinates, as shares of its box, so it scales as
// one drawing. Text on it is sized in cqw (shares of its width) for the same reason.
const W = TEMPLE.width;
const H = TEMPLE.height;
const pct = (v, of) => `${(v / of) * 100}%`;
const place = ({ x, y, width, height }) => ({
  left: pct(x, W),
  top: pct(y, H),
  width: pct(width, W),
  height: pct(height, H),
});

// Each piece draws itself in like a pen sketch, from the ground up.
const DRAW = { steps: 0, columns: [0.3, 0.45, 0.6], architrave: 0.9, frieze: 1.05, cornice: 1.2, pediment: 1.35, text: 1.9 };
const drawn = "absolute [&_path]:[stroke-dasharray:1] [&_path]:animate-draw motion-reduce:[&_path]:animate-none";
const delay = (seconds) => ({ "--delay": `${seconds}s` });

const PILLARS = ["data", "impact", "culture"];

// The picked part lives in the link (/why-bloomberg#impact), so an email can point straight at it.
const onHash = (callback) => {
  addEventListener("hashchange", callback);
  return () => removeEventListener("hashchange", callback);
};
const readHash = () => decodeURIComponent(location.hash.slice(1));

// Which pieces belong to the part being pointed at. Everything else fades back.
const PARTS = {
  whyMe: ["pediment", "cornice"],
  preparation: ["frieze", "architrave"],
  whyBloomberg: ["steps", ...PILLARS],
};
const lights = (part, piece) => !part || part === piece || PARTS[part]?.includes(piece);

// The band under the roof: grooves and square openings, with the preparation photos and videos
// showing through. It drifts slowly sideways (two copies of the tiles make a seamless loop).
function Frieze({ media, moving }) {
  const { height } = TEMPLE.frieze;
  // A whole number of tiles fills the band exactly, so no cut-off groove shows at its edge.
  const fit = Math.round(TEMPLE.frieze.width / TEMPLE.frieze.tileWidth);
  const tileWidth = TEMPLE.frieze.width / fit;
  const tiles = Array.from({ length: Math.max(fit, media.length) }, (_, i) => media[i % media.length]);
  const m = TEMPLE.metope;
  const art = TEMPLE.frieze.tileWidth; // the drawing's tile width, which stretches to fit
  const opening = { left: pct(m.x, art), top: pct(m.y, height), width: pct(m.width, art), height: pct(m.height, height) };

  return (
    <div
      className={cn(
        "flex h-full w-max",
        moving && "animate-[frieze_var(--loop)_linear_infinite] group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]"
      )}
      style={{ "--loop": `${tiles.length * 4}s` }}
    >
      {[0, 1].map((copy) =>
        tiles.map((item, i) => (
          <div key={`${copy}-${i}`} className="relative h-full shrink-0" style={{ width: `${(tileWidth / W) * 100}cqw` }}>
            {item && (
              <span className="absolute overflow-hidden" style={opening}>
                {item.video ? (
                  <video src={`${item.src}#t=0.1`} muted playsInline preload="metadata" className="size-full object-cover" />
                ) : (
                  <Image src={item.src} alt="" fill sizes="6rem" draggable={false} className="object-cover" />
                )}
              </span>
            )}
            <FriezeTile preserveAspectRatio="none" className={cn(drawn, "inset-0 size-full")} style={delay(DRAW.frieze)} />
          </div>
        ))
      )}
    </div>
  );
}

// A bracket down the temple's right side, with the part's name beside it.
function Bracket({ from, to, label, part, lit, onPoint, onPick }) {
  return (
    <button
      type="button"
      onPointerEnter={() => onPoint(part)}
      onPointerLeave={() => onPoint(null)}
      onFocus={() => onPoint(part)}
      onBlur={() => onPoint(null)}
      onClick={() => onPick(part)}
      className={cn(
        "absolute inset-x-0 flex cursor-pointer items-center gap-2.5 text-left transition-opacity duration-300",
        !lit && "opacity-30"
      )}
      style={{ top: pct(from, H), height: pct(to - from, H) }}
    >
      <span aria-hidden="true" className="h-full w-2.5 shrink-0 rounded-r-sm border-y-[1.5px] border-r-[1.5px] border-current" />
      <span className="font-serif text-sm leading-snug italic sm:text-base">{label}</span>
    </button>
  );
}

export function Temple({ content, panels, media }) {
  const reduceMotion = useReducedMotion();
  const [pointed, setPointed] = useState(null);
  const hash = useSyncExternalStore(onHash, readHash, () => "");
  const picked = panels[hash] ? hash : "intro";
  const part = pointed;

  const pick = (next) => {
    history.replaceState(null, "", `#${next}`);
    dispatchEvent(new HashChangeEvent("hashchange"));
    // On narrow screens the panel is below the temple, so bring it into view.
    if (innerWidth < 1024) document.getElementById("why-panel")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  // Props for a piece of the temple that can be pointed at and picked.
  const handles = (name) => ({
    type: "button",
    "aria-pressed": picked === name,
    onPointerEnter: () => setPointed(name),
    onPointerLeave: () => setPointed(null),
    onFocus: () => setPointed(name),
    onBlur: () => setPointed(null),
    onClick: () => pick(name),
  });
  const fade = (piece) => cn("transition-opacity duration-300 motion-reduce:transition-none", !lights(part, piece) && "opacity-30");
  const fadeIn = {
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : DRAW.text },
  };

  const { pediment, cornice, frieze, architrave, columns, steps } = TEMPLE;
  const roofEnd = cornice.y + cornice.height;
  const beamEnd = architrave.y + architrave.height;
  const bottomEnd = steps.y + steps.height;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
      <div className="mx-auto flex w-full max-w-xl text-foreground/85">
        <div className="relative flex-1 [container-type:inline-size]" style={{ aspectRatio: `${W} / ${H}` }}>
          <Steps className={cn(drawn, fade("steps"))} style={{ ...place(steps), ...delay(DRAW.steps) }} />

          {columns.map((box, i) => (
            <button
              key={PILLARS[i]}
              {...handles(PILLARS[i])}
              aria-label={content.pillars[i].label}
              className={cn("absolute cursor-pointer", fade(PILLARS[i]))}
              style={place(box)}
            >
              <Column
                className={cn(drawn, "inset-0 size-full transition-transform duration-300", part === PILLARS[i] && "-translate-y-[1.5%]")}
                style={delay(DRAW.columns[i])}
              />
            </button>
          ))}

          <Architrave className={cn(drawn, fade("architrave"))} style={{ ...place(architrave), ...delay(DRAW.architrave) }} />
          {/* The beam names the band of photos above it. */}
          <motion.p
            {...fadeIn}
            aria-hidden="true"
            className={cn("pointer-events-none absolute flex items-center justify-center font-serif text-[max(9px,2cqw)] tracking-[0.3em] uppercase", fade("architrave"))}
            // The band below the beam's line, so the line never touches the letters.
            style={place({ ...architrave, y: architrave.y + architrave.height / 3, height: (architrave.height * 2) / 3 })}
          >
            {content.preparation.label}
          </motion.p>

          <button
            {...handles("preparation")}
            aria-label={content.preparation.label}
            className={cn("group absolute cursor-pointer overflow-hidden border-x-[1.5px] border-current", fade("frieze"))}
            style={place(frieze)}
          >
            <Frieze media={media} moving={media.length > 0 && !reduceMotion} />
          </button>

          <Cornice className={cn(drawn, fade("cornice"))} style={{ ...place(cornice), ...delay(DRAW.cornice) }} />

          <button
            {...handles("whyMe")}
            aria-label={content.whyMe.label}
            className={cn("absolute cursor-pointer [clip-path:polygon(0_100%,50%_0,100%_100%)]", fade("pediment"))}
            style={place(pediment)}
          >
            <Pediment className={cn(drawn, "inset-0 size-full")} style={delay(DRAW.pediment)} />
          </button>

          {/* The pillars' names, under the steps. */}
          {TEMPLE.columnCenters.map((x, i) => (
            <motion.span
              key={x}
              {...fadeIn}
              aria-hidden="true"
              className={cn("absolute -translate-x-1/2 pt-2 font-serif text-[max(12px,2.6cqw)] italic", fade(PILLARS[i]))}
              style={{ left: pct(x, W), top: pct(bottomEnd, H) }}
            >
              {content.pillars[i].label}
            </motion.span>
          ))}
        </div>

        <div className="relative ml-3 w-24 shrink-0 sm:ml-4 sm:w-28">
          <Bracket
            from={pediment.y}
            to={roofEnd}
            label={content.whyMe.label}
            part="whyMe"
            lit={lights(part, "pediment")}
            onPoint={setPointed}
            onPick={pick}
          />
          <Bracket
            from={beamEnd + 8}
            to={bottomEnd}
            label={content.whyBloomberg.label}
            part="whyBloomberg"
            lit={lights(part, "steps")}
            onPoint={setPointed}
            onPick={pick}
          />
        </div>
      </div>

      <div id="why-panel" className="mt-16 scroll-mt-24 lg:sticky lg:top-24 lg:mt-0 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={picked}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {panels[picked]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
