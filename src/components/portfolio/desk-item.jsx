"use client";

import { animate, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, useRef } from "react";
import { DeskObject } from "./desk-object";

// Note on 3D: opacity below 1 flattens an element's 3D children, so fades only ever go on
// flat leaves (the object and its shadow), never on the wrappers that carry depth.

const LIFT = 46; // px the object rises off the desk while dragged

// Screen movement -> movement along the tilted, turned desk (perspective ignored).
function toDesk(dx, dy, tilt, turn) {
  const t = (turn * Math.PI) / 180;
  const along = -dx * Math.sin(t) + dy * Math.cos(t);
  return {
    x: dx * Math.cos(t) + dy * Math.sin(t),
    y: along / Math.max(0.3, Math.cos((tilt * Math.PI) / 180)),
  };
}

// One object lying on the desk: drops in on load, lifts on hover, slides and can be tossed.
export function DeskItem({ item, index, rotate, deskRef, tilt, turn, canDrag, reduceMotion, picked, onRaise, onOpen }) {
  const buttonRef = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const appear = useMotionValue(0);
  const lift = useSpring(0, { stiffness: 260, damping: 22 });
  const swing = useSpring(useTransform(useVelocity(x), [-1500, 1500], [-12, 12], { clamp: true }), {
    stiffness: 300,
    damping: 30,
  });
  const angle = useTransform(swing, (s) => rotate + s);
  const height = useTransform(lift, (l) => l + 1); // always just above its own shadow
  const shadowOpacity = useTransform([appear, lift], ([a, l]) => a * (0.4 - (0.25 * l) / LIFT));
  const shadowScale = useTransform(lift, [0, LIFT], [1, 1.12]);

  // Show the object as its throw begins, not before.
  useEffect(() => {
    if (reduceMotion) return appear.jump(1);
    const fade = animate(appear, 1, { duration: 0.15, delay: 0.6 + index * 0.09 });
    return () => fade.stop();
  }, [appear, index, reduceMotion]);

  const onPointerDown = (e) => {
    dragged.current = false;
    onRaise();
    if (!canDrag || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    x.stop();
    y.stop();
    drag.current = { px: e.clientX, py: e.clientY, x: x.get(), y: y.get(), moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    d.moved = true;
    lift.set(LIFT);
    const p = toDesk(dx, dy, tilt.get(), turn.get());
    x.set(d.x + p.x);
    y.set(d.y + p.y);
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    dragged.current = true;
    lift.set(0);

    // Toss: keep sliding with the release velocity, staying on the desk.
    const desk = deskRef.current;
    const slot = buttonRef.current.closest("[data-slot]");
    const toss = { type: "inertia", power: 0.35, timeConstant: 260, bounceStiffness: 260, bounceDamping: 22 };
    animate(x, x.get(), {
      ...toss,
      velocity: x.getVelocity(),
      min: -slot.offsetLeft + 40,
      max: desk.offsetWidth - slot.offsetLeft - 40,
    });
    animate(y, y.get(), {
      ...toss,
      velocity: y.getVelocity(),
      min: -slot.offsetTop + 40,
      max: desk.offsetHeight - slot.offsetTop - 40,
    });
  };

  return (
    <motion.div className="[transform-style:preserve-3d]" style={{ x, y }}>
      <motion.div
        className="[transform-style:preserve-3d]"
        initial={reduceMotion ? false : { z: 480, rotateX: -30, rotate: rotate * 3 }}
        animate={{ z: 0, rotateX: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: reduceMotion ? 0 : 0.6 + index * 0.09 }}
      >
        <motion.div className="relative [transform-style:preserve-3d]" style={{ rotate: angle }}>
          <motion.div
            aria-hidden="true"
            className="absolute -inset-[6%] rounded-[1em] bg-[radial-gradient(closest-side,rgb(0_0_0/0.45),transparent)]"
            style={{ opacity: picked ? 0 : shadowOpacity, scale: shadowScale }}
          />
          <motion.div className="[transform-style:preserve-3d]" style={{ z: height }}>
            <motion.button
              ref={buttonRef}
              type="button"
              aria-haspopup="dialog"
              // Hidden while picked up, but still focusable so focus can return to it.
              style={{ opacity: picked ? 0 : appear }}
              className="group block cursor-pointer text-left"
              onPointerEnter={(e) => e.pointerType === "mouse" && !drag.current && lift.set(14)}
              onPointerLeave={() => !drag.current && lift.set(0)}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClick={() => {
                if (dragged.current) return; // a drag just ended; don't also open
                onOpen(buttonRef.current.getBoundingClientRect());
              }}
            >
              <DeskObject item={item} />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
