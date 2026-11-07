"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TIERS = ["S", "A", "B", "C", "D"];
const STACK_FROM = 5; // a tier with this many flavors or more stacks up
const SHOWN = 3; // flavors visible in a stack; the rest are counted

const chip = "rounded-md border border-foreground/60 bg-background px-2 py-0.5 text-xs";

// A flavor with proof opens its photo; one without is just a name.
function Flavor({ flavor, onProof }) {
  if (!flavor.proof) return <span className={cn(chip, "block text-muted-foreground")}>{flavor.name}</span>;
  return (
    <button
      type="button"
      onClick={() => onProof(flavor)}
      className={cn(chip, "block cursor-pointer border-foreground/80 hover:bg-foreground/10")}
    >
      {flavor.name}
    </button>
  );
}

// One tier. With many flavors it stacks up like a hand of cards and fans out when tapped.
function Row({ label, items, labels, onProof }) {
  const [open, setOpen] = useState(false);
  const stackable = items.length >= STACK_FROM;
  const stacked = stackable && !open;
  const hidden = items.length - SHOWN;

  return (
    <div className="flex gap-3 border-t border-dotted py-3 first:border-t-0">
      <div
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-md border-[1.5px] border-foreground/80 font-serif font-bold",
          !label && "w-auto min-w-9 px-2 text-[0.65rem] font-normal text-muted-foreground"
        )}
      >
        {label ?? labels.notReviewed}
      </div>

      {stacked ? (
        <button
          type="button"
          aria-expanded="false"
          aria-label={`${labels.showAll} ${items.length}`}
          onClick={() => setOpen(true)}
          className="flex min-h-9 cursor-pointer items-center"
        >
          {items.slice(0, SHOWN).map((flavor, i) => (
            <motion.span
              key={flavor.name}
              layout
              className={cn(chip, "block text-muted-foreground", i > 0 && "-ml-8")}
              style={{ zIndex: SHOWN - i, rotate: (i - 1) * 2 }}
            >
              {flavor.name}
            </motion.span>
          ))}
          <span className="relative z-0 -ml-2 pl-3 text-xs text-muted-foreground">+{hidden}</span>
        </button>
      ) : (
        <div className="min-w-0">
          <ul className="flex min-h-9 flex-wrap items-center gap-1.5">
            {items.map((flavor) => (
              <motion.li key={flavor.name} layout>
                <Flavor flavor={flavor} onProof={onProof} />
              </motion.li>
            ))}
          </ul>
          {stackable && (
            <button
              type="button"
              aria-expanded="true"
              onClick={() => setOpen(false)}
              className="mt-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {labels.stackUp}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// The back of a can: every flavor in its tier, the rest under "not reviewed".
export function TierList({ flavors, labels }) {
  const [open, setOpen] = useState(null);

  if (open) {
    const { proof } = open;
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(null)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← {labels.backToTiers}
        </button>
        <div className="mt-3 rounded-[0.2rem] border-[1.5px] border-foreground/80 p-1.5">
          <Image
            src={proof.src}
            alt={`${open.name}, ${open.tier ? `tier ${open.tier}` : labels.notReviewed}`}
            width={proof.width || 1200}
            height={proof.height || 1600}
            sizes="(min-width: 640px) 28rem, 85vw"
            className="mx-auto max-h-[55vh] w-auto"
          />
        </div>
        <p className="mt-3 text-center font-serif text-sm italic">{open.name}</p>
      </div>
    );
  }

  const rows = [
    ...TIERS.map((tier) => ({ label: tier, items: flavors.filter((f) => f.tier === tier) })),
    { label: null, items: flavors.filter((f) => !TIERS.includes(f.tier)) },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-4">
        {rows.map(({ label, items }) => (
          <Row key={label ?? "none"} label={label} items={items} labels={labels} onProof={setOpen} />
        ))}
      </div>
    </MotionConfig>
  );
}
