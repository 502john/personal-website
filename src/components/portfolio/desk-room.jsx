// The desk's body and the room around it, drawn in faint line art that fades into the page.
// Everything is positioned in the desk's own 3D space: z = 0 is the desktop, negative z is down.
// Sizes are in em (the desk's font size changes per layout), so the room keeps its proportions.

const THICK = "1.4em";
const FLOOR_Z = "-15.4em"; // desktop thickness + legs
const BEHIND = "7em"; // gap between the desk's back edge and the wall
const WALL = "30em";

const edge = "border-[1.5px] border-foreground/70 bg-background";
const faint = "border-foreground/20";

function Leg({ left, top }) {
  const face = `absolute ${edge} h-[14em] w-[1.1em] origin-top`;
  return (
    <div className="absolute [transform-style:preserve-3d]" style={{ left, top }}>
      <div className={face} style={{ transform: `translateZ(-${THICK}) rotateX(-90deg)` }} />
      <div
        className={face}
        style={{
          transform: `translateX(1.1em) translateZ(-${THICK}) rotateX(-90deg) rotateY(-90deg)`,
          transformOrigin: "left top",
        }}
      />
    </div>
  );
}

export function DeskRoom() {
  return (
    // preserve-3d makes this the positioning parent, so it has to cover the desk exactly.
    <div aria-hidden="true" className="absolute inset-0 pointer-fine:cursor-grab [transform-style:preserve-3d]">
      {/* Floor: boards running left to right, fading out at the edges. */}
      <div
        className="absolute -left-[45%] w-[190%] bg-[repeating-linear-gradient(transparent_0_2.4em,color-mix(in_oklch,var(--foreground)_18%,transparent)_2.4em_calc(2.4em+1px))] [mask-image:radial-gradient(closest-side,#000_45%,transparent)]"
        style={{ top: `-${BEHIND}`, height: `calc(100% + ${BEHIND} + 18em)`, transform: `translateZ(${FLOOR_Z})` }}
      />

      {/* Back wall, standing on the floor behind the desk, with a baseboard and a window. */}
      <div
        className="absolute -left-[45%] w-[190%] origin-bottom [mask-image:linear-gradient(to_right,transparent,#000_25%,#000_75%,transparent)]"
        style={{ top: `calc(-${BEHIND} - ${WALL})`, height: WALL, transform: `translateZ(${FLOOR_Z}) rotateX(-90deg)` }}
      >
        <div className={`absolute inset-x-0 bottom-[1.2em] border-t ${faint}`} />
        <div className={`absolute top-[5em] left-[60%] h-[9em] w-[7em] border ${faint}`}>
          <div className={`absolute inset-y-0 left-1/2 border-l ${faint}`} />
          <div className={`absolute inset-x-0 top-1/2 border-t ${faint}`} />
        </div>
      </div>

      {/* Desk body: front and side edges hang down from the desktop. */}
      <div className={`absolute inset-x-0 top-full h-[1.4em] origin-top ${edge}`} style={{ transform: "rotateX(-90deg)" }} />
      <div className={`absolute inset-y-0 left-0 w-[1.4em] origin-left ${edge}`} style={{ transform: "rotateY(90deg)" }} />
      <div className={`absolute inset-y-0 right-0 w-[1.4em] origin-right ${edge}`} style={{ transform: "rotateY(-90deg)" }} />

      <Leg left="3%" top="calc(100% - 2.2em)" />
      <Leg left="calc(97% - 1.1em)" top="calc(100% - 2.2em)" />
      <Leg left="3%" top="1.2em" />
      <Leg left="calc(97% - 1.1em)" top="1.2em" />
    </div>
  );
}
