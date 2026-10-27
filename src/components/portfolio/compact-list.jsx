import { byRecency, visible } from "@/lib/content";
import { ContentLink } from "./content-link";
import { DateRange } from "./date-range";

export function CompactList({ items, labels }) {
  return (
    <ul className="divide-y divide-dotted">
      {byRecency(visible(items)).map((item) => (
        <li key={item.title + (item.org ?? "")} className="py-3 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <p className="text-sm">
              <span className="font-medium">
                {item.href ? (
                  <ContentLink href={item.href} className="underline decoration-dotted underline-offset-4">
                    {item.title}
                  </ContentLink>
                ) : (
                  item.title
                )}
              </span>
              {item.org && <span className="text-muted-foreground"> · {item.org}</span>}
              {item.status && (
                <span className="ml-2 rounded-md border border-dotted px-1.5 py-0.5 text-xs text-muted-foreground">
                  {item.status}
                </span>
              )}
            </p>
            <DateRange start={item.start} end={item.end} presentLabel={labels.present} />
          </div>
          {item.summary && (
            <p className="mt-0.5 text-sm text-muted-foreground">{item.summary}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
