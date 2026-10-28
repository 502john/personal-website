"use client";

import { motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { random, scatter } from "@/lib/scatter";
import { DeskFocus } from "./desk-focus";
import { DeskItem } from "./desk-item";
import { DeskRoom } from "./desk-room";

// At most `max` objects to a row, with the rows as even as possible.
const balanced = (max) => (n) => Math.ceil(n / Math.ceil(n / max));

// Columns and row height (rem) for phone, tablet (sm), and desktop (lg). Wider layouts add
// columns as objects are added, up to the point where objects would bury each other.
const LAYOUTS = [
  { cols: () => 2, rowHeight: 13 },
  { cols: balanced(4), rowHeight: 16 },
  { cols: balanced(5), rowHeight: 18 },
];

// Camera: tilt is how far the desk leans away, turn is rotation around the vertical.
const VIEW = { tilt: 48, turn: -6 };
const LIMITS = { tilt: [15, 60], turn: [-25, 25] };
const clamp = (v, [lo, hi]) => Math.min(hi, Math.max(lo, v));

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
        style={Object.fromEntries(layouts.map((l, k) => [`--h${k}`, `${l.height}rem`]))}
        className="relative mt-32 h-[calc(var(--h0)*0.95)] [perspective:1600px] [perspective-origin:50%_20%] sm:mt-40 sm:h-[calc(var(--h1)*0.95)] lg:h-[calc(var(--h2)*0.95)]"
      >
        <motion.div
          ref={deskRef}
          style={{ transform }}
          {...orbitHandlers}
          className="absolute inset-x-0 top-1/2 h-[var(--h0)] rounded-[0.2em] border-[1.5px] border-foreground/70 bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] text-[12px] select-none [--hd:var(--h0)] [transform-style:preserve-3d] pointer-fine:cursor-grab pointer-fine:active:cursor-grabbing sm:h-[var(--h1)] sm:text-[14px] sm:[--hd:var(--h1)] lg:h-[var(--h2)] lg:text-[16px] lg:[--hd:var(--h2)]"
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
