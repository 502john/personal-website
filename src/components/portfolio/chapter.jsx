import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { spanOf, storyHref } from "@/lib/content";
import { ContentLink } from "./content-link";
import { DateRange } from "./date-range";
import { PhotoStrip } from "./photo-strip";
import { StackList } from "./stack-list";

export function Chapter({ chapter, labels }) {
  const { title, entries } = chapter;
  const lead = entries[0]; // newest
  const span = spanOf(entries);
  const multiple = entries.length > 1;

  // Oldest first, e.g. "Intern → Research Assistant".
  const roles = [...new Set([...entries].reverse().map((e) => e.role))].join(" → ");
  const orgs = [...new Set(entries.map((e) => e.org))];
  const meta = [...orgs, lead.team, lead.domain].filter(Boolean).join(" · ");
  const photos = entries.flatMap((e) => e.photos ?? []);
  const files = entries.flatMap((e) => e.files ?? []);
  const stories = entries.filter((e) => e.story?.length);

  return (
    <li className="py-10 first:pt-0 last:pb-0">
      <article>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-serif text-lg font-bold">{title}</h3>
          <DateRange start={span.start} end={span.end} presentLabel={labels.present} />
        </div>
        <p className="mt-1 text-sm">{roles}</p>
        {meta && <p className="text-sm text-muted-foreground">{meta}</p>}

        {lead.why && <p className="mt-4 font-serif leading-relaxed">{lead.why}</p>}

        <details className="group mt-4">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
            {labels.details}
            <ChevronRightIcon aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-90" />
          </summary>

          <div className="mt-4 space-y-6">
            {entries.map((entry) => (
              <div key={entry.slug}>
                {multiple && (
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="text-sm font-medium">{entry.role}</p>
                    <DateRange start={entry.start} end={entry.end} presentLabel={labels.present} />
                  </div>
                )}
                {multiple && entry !== lead && entry.why && (
                  <p className="mb-2 font-serif text-sm leading-relaxed">{entry.why}</p>
                )}
                {entry.bullets?.length > 0 && (
                  <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-muted-foreground/50">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <StackList items={entry.stack} className="mt-3" />
              </div>
            ))}

            <PhotoStrip photos={photos} labels={labels} />

            {files.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {files.map((file) => (
                  <li key={file.href}>
                    <ContentLink href={file.href} icon="file">
                      {file.label}
                    </ContentLink>
                  </li>
                ))}
              </ul>
            )}

            {stories.length > 0 && (
              <p className="flex flex-wrap gap-x-4 gap-y-2">
                {stories.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={storyHref(entry)}
                    className="text-sm underline decoration-dotted underline-offset-4 hover:decoration-solid"
                  >
                    {labels.fullStory}
                    {multiple && `: ${entry.role}`} →
                  </Link>
                ))}
              </p>
            )}
          </div>
        </details>
      </article>
    </li>
  );
}
