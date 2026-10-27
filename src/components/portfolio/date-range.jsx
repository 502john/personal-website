import { formatMonth } from "@/lib/content";
import { cn } from "@/lib/utils";

// "Jun 2026 – Aug 2026", "Jan 2026 – Present", or one date if there's no end.
export function DateRange({ start, end, presentLabel, className }) {
  if (!start) return null;

  return (
    <p className={cn("text-xs whitespace-nowrap tabular-nums text-muted-foreground", className)}>
      <time dateTime={start}>{formatMonth(start)}</time>
      {end !== undefined && (
        <>
          {" – "}
          {end === null ? presentLabel : <time dateTime={end}>{formatMonth(end)}</time>}
        </>
      )}
    </p>
  );
}
