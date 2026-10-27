import { formatMonth } from "@/lib/content";

export function Board({ columns, labels }) {
  if (!columns?.length) return null;

  return (
    <div className="mt-12 grid gap-6 rounded-xl border border-dotted p-6 sm:grid-cols-2 sm:gap-8">
      {columns.map((column) => (
        <section key={column.title}>
          <h2 className="text-xs text-muted-foreground">{column.title}</h2>

          {/* Same font and line height in body and items keeps the columns aligned. */}
          {column.body && <p className="mt-2 font-serif text-sm leading-relaxed">{column.body}</p>}

          {column.items?.length > 0 && (
            <ul className="mt-2 font-serif text-sm leading-relaxed">
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {column.updated && (
            <p className="mt-3 text-xs text-muted-foreground">
              {labels.updated} <time dateTime={column.updated}>{formatMonth(column.updated)}</time>
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
