import { cn } from "@/lib/utils";

export function StackList({ items, className }) {
  if (!items?.length) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((tool) => (
        <li
          key={tool}
          className="rounded-md border border-dotted px-2 py-0.5 text-xs text-muted-foreground"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}
