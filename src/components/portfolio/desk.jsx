"use client";

import { motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { random, scatter } from "@/lib/scatter";
import { DeskFocus } from "./desk-focus";
import { DeskItem } from "./desk-item";
import { DeskRoom } from "./desk-room";

// At most `max` objects to a row, with the rows as even as possible.
const balanced = (max) => (n) => Math.ceil(n / Math.ceil(n / max));

// Columns and row height for phone, tablet (sm), and desktop (lg): em on phone and desktop,
// rem on tablet. Wider layouts add columns as objects are added, up to the point where objects
// would bury each other.
const LAYOUTS = [
  { cols: balanced(3), rowHeight: 13 },
  { cols: balanced(4), rowHeight: 16 },
  { cols: balanced(5), rowHeight: 18 },
];

// Camera: tilt is how far the desk leans away, turn is rotation around the vertical.
const VIEW = { tilt: 48, turn: -6 };
const LIMITS = { tilt: [15, 60], turn: [-25, 25] };
const clamp = (v, [lo, hi]) => Math.min(hi, Math.max(lo, v));

// Phone and desktop scenes are sized in em, so one font size zooms all of each: as large as
// `font`, or smaller so the whole desk fits the screen. A phone runs out of width first, so it
// fits both ways. These mirror the scene's classes below.
const ZOOM = {
  phone: { col: 11, perspective: 240, font: 12, smallest: 7, across: "100vw - 2rem" },
  desktop: { width: 64, perspective: 100, font: 16, smallest: 8 },
};
const SCENE = { gap: 10, legs: 3, eye: 0.2, height: 0.95 }; // em, then shares of the scene and desk
const ABOVE = "10rem"; // the page title above the desk, plus a little room below it

// Where the desk's corners land with the camera at rest, in em: how wide they spread, and how
// far below the top of the scene the front edge sits.
function project(width, depth, perspective) {
  const tilt = (VIEW.tilt * Math.PI) / 180;
  const turn = (VIEW.turn * Math.PI) / 180;
  const scene = depth * SCENE.height;
  const eye = scene * SCENE.eye;
  let spread = 0;
  let front = 0;
  for (const [x, y] of [[-width, -depth], [width, -depth], [-width, depth], [width, depth]]) {
    const across = (x * Math.cos(turn) - y * Math.sin(turn)) / 2;
    const along = (x * Math.sin(turn) + y * Math.cos(turn)) / 2;
    const near = perspective / (perspective - along * Math.sin(tilt));
    spread = Math.max(spread, 2 * Math.abs(across) * near);
    front = Math.max(front, eye + (scene / 2 + along * Math.cos(tilt) - eye) * near);
  }
  return { spread, front };
}

function fitFont(width, depth, { perspective, font, smallest, across }) {
  const { spread, front } = project(width, depth, perspective);
  const tall = `(100svh - ${ABOVE}) / ${(SCENE.gap + front + SCENE.legs).toFixed(2)}`;
  const fit = across ? `min(${tall}, (${across}) / ${spread.toFixed(2)})` : `calc(${tall})`;
  return `clamp(${smallest}px, ${fit}, ${font}px)`;
}

function subscribePointer(callback) {
  const query = matchMedia("(pointer: fine)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

// Dragging and orbiting only with a mouse or trackpad; on touch they would fight scrolling.
function useFinePointer() {
  return useSyncExternalStore(
    subscribePointer,
    () => matchMedia("(pointer: fine)").matches,
    () => false
  );
}

export function Desk({ items, labels }) {
  const deskRef = useRef(null);
  const orbit = useRef(null);
  const reduceMotion = useReducedMotion();
  const canDrag = useFinePointer();
  const [stack, setStack] = useState([]); // last touched is on top
  const [focus, setFocus] = useState(null);

  // The camera starts looking straight down, then settles into the angled view.
  const tilt = useSpring(0, { stiffness: 60, damping: 18 });
  const turn = useSpring(0, { stiffness: 60, damping: 18 });
  const transform = useMotionTemplate`translateY(-50%) rotateX(${tilt}deg) rotateZ(${turn}deg)`;

  useEffect(() => {
    if (reduceMotion) {
      tilt.jump(VIEW.tilt);
      turn.jump(VIEW.turn);
    } else {
      tilt.set(VIEW.tilt);
      turn.set(VIEW.turn);
    }
  }, [reduceMotion, tilt, turn]);

  const layouts = LAYOUTS.map(({ cols, rowHeight }) => scatter(items.length, cols(items.length), rowHeight));
  const phoneWidth = LAYOUTS[0].cols(items.length) * ZOOM.phone.col;
  const raise = (i) => setStack((s) => [...s.filter((j) => j !== i), i]);
  // Untouched objects keep their order; touched ones go on top, most recent highest.
  const order = [...items.keys()].filter((i) => !stack.includes(i)).concat(stack);
  const depth = (i) => (order.indexOf(i) + 1) * 2;

  // Drag anywhere that isn't an object (desk, floor, wall) to look around.
  const orbitHandlers = {
    onPointerDown: (e) => {
      if (e.target.closest("[data-slot]") || e.pointerType !== "mouse") return;
      e.currentTarget.setPointerCapture(e.pointerId);
      orbit.current = { px: e.clientX, py: e.clientY, tilt: tilt.get(), turn: turn.get() };
    },
    onPointerMove: (e) => {
      const o = orbit.current;
      if (!o) return;
      turn.set(clamp(o.turn + (e.clientX - o.px) * 0.15, LIMITS.turn));
      tilt.set(clamp(o.tilt - (e.clientY - o.py) * 0.15, LIMITS.tilt));
    },
    onPointerUp: () => {
      orbit.current = null;
    },
  };

  return (
    <>
      <div
        style={{
          "--w0": `${phoneWidth}em`,
          "--h0": `${layouts[0].height}em`,
          "--h1": `${layouts[1].height}rem`,
          "--h2": `${layouts[2].height}em`,
          "--fit0": fitFont(phoneWidth, layouts[0].height, ZOOM.phone),
          "--fit2": fitFont(ZOOM.desktop.width, layouts[2].height, ZOOM.desktop),
        }}
        className="relative mx-auto mt-[10em] h-[calc(var(--h0)*0.95)] w-[var(--w0)] [font-size:var(--fit0)] [perspective:240em] [perspective-origin:50%_20%] sm:mt-40 sm:h-[calc(var(--h1)*0.95)] sm:w-auto sm:[perspective:1600px] lg:mt-[10em] lg:h-[calc(var(--h2)*0.95)] lg:max-w-[64em] lg:[font-size:var(--fit2)] lg:[perspective:100em]"
      >
        <motion.div
          ref={deskRef}
          style={{ transform }}
          {...orbitHandlers}
          className="absolute inset-x-0 top-1/2 h-[var(--h0)] rounded-[0.2em] border-[1.5px] border-foreground/70 bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:1em_1em] select-none [transform-style:preserve-3d] pointer-fine:cursor-grab pointer-fine:active:cursor-grabbing sm:h-[var(--h1)] sm:text-[14px] sm:[background-size:16px_16px] lg:h-[var(--h2)] lg:text-[1em] lg:[background-size:1em_1em]"
        >
          <DeskRoom />
          {items.map((item, i) => {
            const rotate = (random(i + 1) - 0.5) * 24;
            const spots = Object.fromEntries(
              layouts.flatMap((l, k) => [
                [`--l${k}`, `${l.spots[i].left}%`],
                [`--t${k}`, `${l.spots[i].top}%`],
              ])
            );

            return (
              <div
                key={`${i}-${item.title}`}
                data-slot
                className="absolute top-[var(--t0)] left-[var(--l0)] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] sm:top-[var(--t1)] sm:left-[var(--l1)] lg:top-[var(--t2)] lg:left-[var(--l2)]"
                // In 3D, depth (not z-index) decides what's on top. Every object gets its own
                // depth above the desk; objects at the same depth flicker against each other.
                style={{ ...spots, transform: `translateZ(${depth(i)}px)` }}
              >
                <DeskItem
                  item={item}
                  index={i}
                  rotate={rotate}
                  deskRef={deskRef}
                  tilt={tilt}
                  turn={turn}
                  canDrag={canDrag}
                  reduceMotion={reduceMotion}
                  picked={focus?.index === i}
                  onRaise={() => raise(i)}
                  onOpen={(rect) =>
                    setFocus({
                      index: i,
                      rotate,
                      dx: rect.left + rect.width / 2 - innerWidth / 2,
                      dy: rect.top + rect.height / 2 - innerHeight / 2,
                    })
                  }
                />
              </div>
            );
          })}
        </motion.div>
      </div>

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
