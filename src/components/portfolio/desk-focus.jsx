"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ContentLink } from "./content-link";
import { DeskObject } from "./desk-object";
import { PhotoStack } from "./photo-stack";

// open.spotify.com/{playlist|album|track}/<id>, or the embed link Spotify's share menu gives,
// -> its embeddable player URL.
function spotifyEmbed(url) {
  const match = url?.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(playlist|album|track)\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
}

// The picked-up view: flies in from the desk, flips to the back, and returns on close.
export function DeskFocus({ item, origin, labels, reduceMotion, onClosed }) {
  const dialogRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const close = () => {
    setFlipped(false);
    setClosing(true);
  };

  const player = spotifyEmbed(item.embed);
  const away = { x: origin.dx, y: origin.dy, scale: 0.45, rotate: origin.rotate };
  const center = { x: 0, y: 0, scale: 1, rotate: 0 };
  const wait = closing && !reduceMotion ? 0.35 : 0;

  return (
    <dialog
      ref={dialogRef}
      aria-label={item.title}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0 text-foreground backdrop:bg-transparent"
    >
      <motion.div
        className="absolute inset-0 bg-background/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, delay: wait }}
        onClick={close}
      />

      <button
        type="button"
        onClick={close}
        className="absolute top-4 right-4 z-10 text-xs text-muted-foreground hover:text-foreground"
      >
        {labels.close}
      </button>

      <div className="pointer-events-none absolute inset-0 grid place-items-center p-4">
        <motion.div
          // A player needs more room than text and photos, so its card is wider.
          className={cn(
            "pointer-events-auto [perspective:1400px]",
            player ? "w-[min(38rem,92vw)]" : "w-[min(28rem,92vw)]"
          )}
          initial={away}
          animate={closing ? away : center}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 21, delay: wait }}
          onAnimationComplete={() => {
            if (!closing) return setFlipped(true);
            dialogRef.current.close(); // restores focus to the object that opened it
            onClosed();
          }}
        >
          {/* The back sits in normal flow so the panel fits its content; the front is centered over it. */}
          <motion.div
            className="relative [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.3, 0.7, 0.2, 1] }}
          >
            <div className="absolute inset-0 grid place-items-center [backface-visibility:hidden]">
              <button type="button" onClick={() => setFlipped(true)} className="text-[22px] sm:text-[26px]">
                <DeskObject item={item} />
              </button>
            </div>

            <div className="flex max-h-[82vh] min-h-[min(22rem,70vh)] flex-col rounded-xl border-[1.5px] border-foreground/80 bg-background shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="flex justify-end border-b border-dotted px-5 py-3">
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {labels.flip}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                <h2 className="font-serif text-xl font-bold">{item.title}</h2>

                {item.story?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 font-serif text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {item.photos?.length > 0 && (
                  <PhotoStack photos={item.photos} title={item.title} labels={labels} reduceMotion={reduceMotion} />
                )}

                {/* Loads only once the back is showing, so the desk itself stays light. */}
                {flipped && player && (
                  <iframe
                    title={`${item.title} on Spotify`}
                    src={player}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    // Spotify shows its track list from 352px (22rem) tall; taller shows more of it.
                    className="mt-5 h-[clamp(22rem,58vh,34rem)] w-full rounded-xl border-0"
                  />
                )}

                {item.links?.length > 0 && (
                  <ul className="mt-5 space-y-1 text-sm text-muted-foreground">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <ContentLink href={link.href}>{link.label}</ContentLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </dialog>
  );
}
