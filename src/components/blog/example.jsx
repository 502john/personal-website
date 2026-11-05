"use client";

import { useState } from "react";

// A small sample demo: drag the slider and the bars follow. Copy it to start a real one.
export function Example() {
  const [value, setValue] = useState(40);
  const bars = Array.from({ length: 12 }, (_, i) => Math.round(value * (0.4 + 0.6 * Math.abs(Math.sin(i + value / 25)))));

  return (
    <div className="rounded-lg border border-dotted p-4">
      <div className="flex h-24 items-end gap-1.5">
        {bars.map((height, i) => (
          <div key={i} className="flex-1 rounded-sm bg-foreground/70" style={{ height: `${height}%` }} />
        ))}
      </div>
      <label className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        Strength
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="flex-1 accent-foreground"
        />
        <span className="w-8 text-right tabular-nums">{value}</span>
      </label>
    </div>
  );
}
