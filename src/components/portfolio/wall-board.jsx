"use client";

import { cn } from "@/lib/utils";

// A pinboard hanging on the back wall, in the desk's own 3D space (see desk-room.jsx: the
// wall stands BEHIND the desk's back edge, rising from the floor). Sizes are in em so it keeps
// its proportions with the room.
export const BOARD = {
  width: 36,
  height: 16,
  above: 14, // its bottom edge, measured up from the floor (the wall is 30em tall)
  behind: 6.9, // just in front of the wall, so the two never flicker against each other
  floor: -15.4, // the floor's depth below the desktop, as in desk-room.jsx
};
// The board's center, as the camera needs it: how far behind the desk's back edge, and how high
// above the desktop. `closer` moves the camera in toward the board once it's facing it.
BOARD.center = { behind: BOARD.behind, up: BOARD.floor + BOARD.above + BOARD.height / 2, closer: 20 };

const paper = "border-[1.5px] border-foreground/80 bg-background";

// Loose spots for up to six notes, as shares of the board, with a slight tilt each.
const SPOTS = [
  { left: 8, top: 14, rotate: -3 },
  { left: 38, top: 22, rotate: 2 },
  { left: 68, top: 12, rotate: -1.5 },
  { left: 18, top: 56, rotate: 2.5 },
  { left: 50, top: 60, rotate: -2 },
  { left: 76, top: 54, rotate: 1 },
];

function Note({ note, spot, active, onOpen }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      tabIndex={active ? 0 : -1}
      onClick={(e) => onOpen(note, e.currentTarget.getBoundingClientRect())}
      className={cn(
        paper,
        "absolute flex size-[6.5em] cursor-pointer items-center justify-center p-[0.6em] text-center [background-image:linear-gradient(135deg,transparent_calc(100%-1.2em),color-mix(in_oklch,var(--foreground)_10%,transparent)_calc(100%-1.2em))]",
        active ? "pointer-events-auto hover:-translate-y-[0.2em]" : "pointer-events-none",
        "transition-transform duration-200 motion-reduce:transition-none"
      )}
      style={{ left: `${spot.left}%`, top: `${spot.top}%`, rotate: `${spot.rotate}deg` }}
    >
      {/* The pin. */}
      <span aria-hidden="true" className="absolute top-[0.35em] left-1/2 size-[0.5em] -translate-x-1/2 rounded-full border border-foreground/80 bg-foreground/20" />
      <span className="font-serif text-[0.78em] leading-snug italic">{note.title}</span>
    </button>
  );
}

// On the desk view the whole board is one button that turns the camera to it. Facing it, each
// note is a button that opens the note.
export function WallBoard({ notes, label, active, onLook, onOpen }) {
  const { width, height, above, behind, floor } = BOARD;
  return (
    // Hinged at the floor like the wall, then stood up, so the board hangs `above` em up it.
    <div
      data-slot
      className="pointer-events-none absolute origin-bottom"
      style={{
        left: `calc(50% - ${width / 2}em)`,
        width: `${width}em`,
        top: `calc(-${behind}em - ${above + height}em)`,
        height: `${above + height}em`,
        transform: `translateZ(${floor}em) rotateX(-90deg)`,
      }}
    >
      <div className={cn(paper, "absolute inset-x-0 top-0 rounded-[0.3em] p-[0.5em]")} style={{ height: `${height}em` }}>
        <div className="relative size-full rounded-[0.15em] border border-dashed border-foreground/30">
          {notes.slice(0, SPOTS.length).map((note, i) => (
            <Note key={note.title} note={note} spot={SPOTS[i]} active={active} onOpen={onOpen} />
          ))}
        </div>
        {!active && (
          <button
            type="button"
            aria-label={label}
            onClick={onLook}
            className="pointer-events-auto absolute inset-0 cursor-pointer rounded-[0.3em]"
          />
        )}
      </div>
    </div>
  );
}
