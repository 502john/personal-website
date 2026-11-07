"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TIERS = ["S", "A", "B", "C", "D"];

// A flavor with proof opens its photo; one without is just a name.
function Flavor({ flavor, onProof }) {
  const chip = "rounded-md border border-foreground/60 px-2 py-0.5 text-xs";
  if (!flavor.proof) return <li className={cn(chip, "text-muted-foreground")}>{flavor.name}</li>;
  return (
    <li>
      <button
        type="button"
        onClick={() => onProof(flavor)}
        className={cn(chip, "cursor-pointer border-foreground/80 hover:bg-foreground/10")}
      >
        {flavor.name}
      </button>
    </li>
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
    <div className="mt-4">
      {rows.map(({ label, items }) => (
        <div key={label ?? "none"} className="flex gap-3 border-t border-dotted py-3 first:border-t-0">
          <div
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-md border-[1.5px] border-foreground/80 font-serif font-bold",
              !label && "w-auto min-w-9 px-2 text-[0.65rem] font-normal text-muted-foreground"
            )}
          >
            {label ?? labels.notReviewed}
          </div>
          <ul className="flex min-h-9 flex-wrap items-center gap-1.5">
            {items.map((flavor) => (
              <Flavor key={flavor.name} flavor={flavor} onProof={setOpen} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
