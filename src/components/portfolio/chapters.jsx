import { toChapters } from "@/lib/content";
import { Chapter } from "./chapter";

export function Chapters({ entries, labels }) {
  return (
    <ol className="divide-y divide-dotted">
      {toChapters(entries).map((chapter) => (
        <Chapter key={chapter.entries[0].slug} chapter={chapter} labels={labels} />
      ))}
    </ol>
  );
}
