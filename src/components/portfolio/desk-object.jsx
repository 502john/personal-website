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

const kinds = {
  polaroid: Polaroid,
  photos: Photos,
  ticket: Ticket,
  receipt: Receipt,
  record: RecordSleeve,
  book: Book,
  note: Note,
  index: IndexCard,
};

export function DeskObject({ item }) {
  const Kind = kinds[item.kind] ?? Note;
  return <Kind item={item} />;
}
