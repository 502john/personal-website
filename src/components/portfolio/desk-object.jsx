import Image from "next/image";
import { cn } from "@/lib/utils";

// Line-art objects, sized in em so the same drawing works on the desk and in the focus view.
const paper = "border-[1.5px] border-foreground/80 bg-background";

// A photo, or diagonal lines until one is added. The object is a button named by its title,
// and its photos are described on the back, so here they're decorative.
function Snapshot({ photo }) {
  return (
    <div className="relative size-full overflow-hidden border border-foreground/60 bg-[repeating-linear-gradient(135deg,transparent_0_0.4em,color-mix(in_oklch,var(--foreground)_12%,transparent)_0.4em_0.5em)]">
      {photo && <Image src={photo.src} alt="" fill sizes="16rem" className="object-cover" />}
    </div>
  );
}

function Polaroid({ item }) {
  return (
    <div className={cn(paper, "relative h-[12.5em] w-[10.5em] rounded-[0.2em] p-[0.6em] pb-[2.6em]")}>
      <span className="absolute -top-[0.6em] left-1/2 h-[1.2em] w-[4em] -translate-x-1/2 -rotate-3 border border-dashed border-foreground/40 bg-foreground/5" />
      <Snapshot photo={item.photos?.[0]} />
      <p className="absolute inset-x-0 bottom-[0.6em] text-center font-serif text-[0.95em] italic">{item.title}</p>
    </div>
  );
}

// A loose stack of prints with the title on a label; the top three are the first photos.
function Photos({ item }) {
  const [top, second, third] = item.photos ?? [];
  const print = cn(paper, "absolute inset-0 rounded-[0.15em] p-[0.45em]");
  return (
    <div className="relative h-[9.5em] w-[12.5em]">
      <div className={cn(print, "-rotate-6")}>
        <Snapshot photo={third} />
      </div>
      <div className={cn(print, "rotate-[4deg]")}>
        <Snapshot photo={second} />
      </div>
      <div className={print}>
        <Snapshot photo={top} />
      </div>
      <p className={cn(paper, "absolute -bottom-[0.7em] left-[0.9em] -rotate-2 px-[0.6em] py-[0.1em] font-serif text-[0.95em] italic")}>
        {item.title}
      </p>
    </div>
  );
}

function Ticket({ item }) {
  return (
    <div className={cn(paper, "relative flex h-[6.5em] w-[15em] rounded-[0.4em]")}>
      <div className="flex flex-1 flex-col justify-center px-[1em]">
        <p className="text-[0.55em] tracking-[0.3em] text-muted-foreground">ADMIT ONE</p>
        <p className="font-serif text-[1.15em] leading-tight font-bold">{item.title}</p>
        {item.subtitle && <p className="text-[0.65em] text-muted-foreground">{item.subtitle}</p>}
      </div>
      <div className="flex w-[3.2em] items-center justify-center border-l-[1.5px] border-dashed border-foreground/60">
        <p className="rotate-90 text-[0.55em] tracking-[0.2em] whitespace-nowrap">No. 001</p>
      </div>
      <span className="absolute -top-[0.6em] right-[2.6em] size-[1.1em] rounded-full border-[1.5px] border-foreground/80 bg-background [clip-path:inset(50%_0_0_0)]" />
      <span className="absolute -bottom-[0.6em] right-[2.6em] size-[1.1em] rounded-full border-[1.5px] border-foreground/80 bg-background [clip-path:inset(0_0_50%_0)]" />
    </div>
  );
}

function Receipt({ item }) {
  return (
    <div
      className={cn(
        paper,
        "flex h-[14em] w-[9em] flex-col items-center px-[0.8em] pt-[1em] pb-[1.6em] font-mono text-[0.95em] [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/0.8em_100%]"
      )}
    >
      <p className="text-[0.75em] tracking-[0.2em] uppercase">{item.title}</p>
      <p className="mt-[0.3em] text-[0.55em] text-muted-foreground">ORDER #001</p>
      <div className="my-[0.6em] w-full border-t border-dashed border-foreground/50" />
      <div className="flex w-full justify-between text-[0.6em]">
        <span>{item.subtitle ?? "1 x"}</span>
        <span>1</span>
      </div>
      <div className="my-[0.6em] w-full border-t border-dashed border-foreground/50" />
      <p className="mt-auto text-[0.55em] tracking-[0.2em]">THANK YOU</p>
    </div>
  );
}

function RecordSleeve({ item }) {
  return (
    <div className="relative h-[11em] w-[14em]">
      <div className="absolute top-[0.5em] right-0 size-[10em] rounded-full border-[1.5px] border-foreground/80 bg-[repeating-radial-gradient(circle,transparent_0_0.35em,color-mix(in_oklch,var(--foreground)_14%,transparent)_0.35em_0.42em)] bg-background group-hover:animate-[spin_5s_linear_infinite] motion-reduce:animate-none">
        <span className="absolute inset-[3.6em] rounded-full border-[1.5px] border-foreground/80 bg-background" />
        <span className="absolute inset-[4.85em] rounded-full bg-foreground/80" />
      </div>
      <div className={cn(paper, "absolute top-0 left-0 flex size-[11em] flex-col justify-end rounded-[0.2em] p-[0.9em]")}>
        <p className="font-serif text-[1.05em] leading-tight font-bold">{item.title}</p>
        {item.subtitle && <p className="text-[0.65em] text-muted-foreground">{item.subtitle}</p>}
      </div>
    </div>
  );
}

function Book({ item }) {
  return (
    <div className={cn(paper, "relative flex h-[13em] w-[9.5em] flex-col rounded-r-[0.4em] rounded-l-[0.15em] py-[1.2em] pr-[0.9em] pl-[1.8em]")}>
      <span className="absolute inset-y-0 left-[0.8em] border-l-[1.5px] border-foreground/60" />
      <p className="font-serif text-[1.05em] leading-tight font-bold">{item.title}</p>
      <div className="my-[0.6em] w-[2em] border-t border-foreground/60" />
      {item.subtitle && <p className="text-[0.65em] text-muted-foreground">{item.subtitle}</p>}
    </div>
  );
}

function Note({ item }) {
  return (
    <div
      className={cn(
        paper,
        "flex size-[9.5em] flex-col justify-center p-[1em] text-center [background-image:linear-gradient(135deg,transparent_calc(100%-1.6em),color-mix(in_oklch,var(--foreground)_10%,transparent)_calc(100%-1.6em))]"
      )}
    >
      <p className="font-serif text-[1.15em] leading-snug italic">{item.title}</p>
      {item.subtitle && <p className="mt-[0.4em] text-[0.65em] text-muted-foreground">{item.subtitle}</p>}
    </div>
  );
}

function IndexCard({ item }) {
  return (
    <div
      className={cn(
        paper,
        "h-[8.5em] w-[14em] rounded-[0.2em] px-[1em] pt-[0.7em] [background-image:repeating-linear-gradient(transparent_0_1.35em,color-mix(in_oklch,var(--foreground)_14%,transparent)_1.35em_calc(1.35em+1px))] [background-position:0_1.4em]"
      )}
    >
      <p className="border-b-[1.5px] border-foreground/50 pb-[0.2em] font-serif text-[1.05em] font-bold">{item.title}</p>
      {item.subtitle && <p className="mt-[0.3em] text-[0.65em] text-muted-foreground">{item.subtitle}</p>}
    </div>
  );
}

// The can's artwork, drawn as a mask so it takes the line color of the theme.
const CAN_ART = { maskImage: "url(/art/celsius-can.svg)", maskRepeat: "no-repeat" };

// A can standing upright, seen from the side: used when it's picked up.
function CanFront() {
  return (
    <div className="relative h-[10.8em] w-[4em]">
      <div className="absolute inset-x-0 top-[0.25em] bottom-[0.15em] rounded-[0.35em_0.35em_0.5em_0.5em] border-[1.5px] border-foreground/80 bg-[color-mix(in_oklch,var(--background)_92%,var(--foreground))]">
        <span className="absolute inset-x-[0.15em] top-[0.6em] bottom-[0.5em] bg-foreground/85" style={{ ...CAN_ART, maskSize: "100% 100%" }} />
      </div>
      <span className="absolute inset-x-[0.2em] top-0 h-[0.45em] rounded-t-[0.3em] bg-foreground/90" />
    </div>
  );
}

// The can on the desk: a real can standing on its base, built from the reference profile
// (radius and height as shares of its diameter, bottom to top). Its body is a ring of narrow
// faces for each stretch of the profile, each one tilted to follow it and clipped narrower at
// the narrow end. The artwork wraps the front half of the body. Only outward faces are drawn.
const CAN = {
  diameter: 3.4, // em
  sides: 16,
  // [bottom radius, bottom height, top radius, top height], shares of the diameter
  parts: [
    { name: "foot", from: [0.4, 0], to: [0.5, 0.21] },
    { name: "body", from: [0.5, 0.21], to: [0.48, 2.57] },
    { name: "shoulder", from: [0.48, 2.57], to: [0.41, 2.64] },
    { name: "rim", from: [0.41, 2.64], to: [0.44, 2.7] },
  ],
  lid: { radius: 0.4, height: 2.64 },
};

function CanPart({ part, index }) {
  const { diameter: d, sides: n } = CAN;
  const [r1, y1] = part.from.map((v) => v * d);
  const [r2, y2] = part.to.map((v) => v * d);
  const lean = (Math.atan2(r1 - r2, y2 - y1) * 180) / Math.PI; // inward is positive
  const length = Math.hypot(r1 - r2, y2 - y1);
  const bottom = 2 * r1 * Math.sin(Math.PI / n);
  const top = (2 * r2 * Math.sin(Math.PI / n)) / bottom;
  const body = part.name === "body";
  const rim = part.name === "rim";
  const front = (n - 8) / 2; // first strip of the front half, facing the viewer at rest

  return Array.from({ length: n }, (_, i) => (
    <div
      key={`${part.name}-${i}`}
      className={cn(
        "absolute top-0 [backface-visibility:hidden] [transform-origin:50%_0]",
        rim ? "bg-foreground/90" : "bg-[color-mix(in_oklch,var(--background)_88%,var(--foreground))] text-foreground"
      )}
      style={{
        left: `${-bottom / 2}em`,
        width: `${bottom + 0.02}em`,
        height: `${length}em`,
        clipPath: `polygon(0 0, 100% 0, ${50 + top * 50}% 100%, ${50 - top * 50}% 100%)`,
        transform: `rotateZ(${(i * 360) / n}deg) translateY(${-r1}em) translateZ(${y1}em) rotateX(${90 - lean}deg)`,
      }}
    >
      {body && i >= front && i < front + 8 && (
        // The art spans eight faces, each showing its own slice, and is upside down because
        // the face's top edge is the can's bottom.
        <span
          className="absolute inset-0 rotate-180 bg-current"
          style={{
            ...CAN_ART,
            maskSize: `${8 * 100}% 100%`,
            maskPosition: `${(100 * (front + 7 - i)) / 7}% 0`,
          }}
        />
      )}
    </div>
  ));
}

function StandingCan() {
  const { diameter: d, lid } = CAN;
  const r = lid.radius * d;
  const rimR = 0.44 * d;
  return (
    <div className="relative [transform-style:preserve-3d]" style={{ width: `${d}em`, height: `${d}em` }}>
      <div className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
        {CAN.parts.map((part, i) => (
          <CanPart key={part.name} part={part} index={i} />
        ))}
        {/* The lid sits below the rim: a recessed disc with a scored opening and a tab above it. */}
        <div
          className="absolute rounded-full border-[1.5px] border-foreground/70 bg-[color-mix(in_oklch,var(--background)_80%,var(--foreground))] [transform-style:preserve-3d]"
          style={{ left: `${-r}em`, top: `${-r}em`, width: `${2 * r}em`, height: `${2 * r}em`, transform: `translateZ(${lid.height * d}em)` }}
        >
          <span className="absolute inset-[0.3em] rounded-full border border-foreground/40" />
          <span className="absolute top-[55%] left-1/2 size-[1.1em] -translate-x-1/2 rounded-full border border-foreground/60" />
        </div>
        <div
          className="absolute rounded-full border-foreground/90"
          style={{ left: `${-rimR}em`, top: `${-rimR}em`, width: `${2 * rimR}em`, height: `${2 * rimR}em`, borderWidth: `${0.04 * d}em`, transform: `translateZ(${2.7 * d}em)` }}
        />
        <div
          className="absolute grid place-items-center rounded-[0.3em] border-[1.5px] border-foreground/80 bg-foreground/15"
          style={{ left: "-0.4em", top: "-1.05em", width: "0.8em", height: "0.95em", transform: `translateZ(${(lid.height + 0.02) * d}em)` }}
        >
          <span className="size-[0.35em] rounded-full border border-foreground/70" />
        </div>
      </div>
    </div>
  );
}

function Can({ solid }) {
  return solid ? <StandingCan /> : <CanFront />;
}

const kinds = {
  can: Can,
  polaroid: Polaroid,
  photos: Photos,
  ticket: Ticket,
  receipt: Receipt,
  record: RecordSleeve,
  book: Book,
  note: Note,
  index: IndexCard,
};

export function DeskObject({ item, solid }) {
  const Kind = kinds[item.kind] ?? Note;
  return <Kind item={item} solid={solid} />;
}
