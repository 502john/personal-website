const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-06" -> "Jun 2026", "2026" -> "2026"
export function formatMonth(date) {
  const [year, month] = date.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function visible(items) {
  return items.filter((item) => !item.hidden);
}

// Current items (end: null) sort first; undated items keep their written order.
function sortEnd(item) {
  if (item.end === null) return "9999";
  return item.end ?? item.start ?? "";
}

export function byRecency(items) {
  return [...items].sort(
    (a, b) =>
      sortEnd(b).localeCompare(sortEnd(a)) ||
      (b.start ?? "").localeCompare(a.start ?? "")
  );
}

// Entries that get an /experience/<slug> page.
export function withStories(entries) {
  return byRecency(visible(entries)).filter((entry) => entry.story?.length);
}

// Groups entries by chapter, newest first. An entry without a chapter stands alone, titled by org.
export function toChapters(entries) {
  const chapters = new Map();
  for (const entry of byRecency(visible(entries))) {
    const key = entry.chapter ?? entry.slug;
    if (!chapters.has(key)) chapters.set(key, { title: entry.chapter ?? entry.org, entries: [] });
    chapters.get(key).entries.push(entry);
  }
  return [...chapters.values()];
}

// Earliest start to latest end; end is null if any entry is current.
export function spanOf(entries) {
  const starts = entries.map((e) => e.start).filter(Boolean).sort();
  const ends = entries.map((e) => e.end);
  return {
    start: starts[0],
    end: ends.includes(null) ? null : ends.filter(Boolean).sort().at(-1),
  };
}

export function storyHref(entry) {
  return `/experience/${entry.slug}`;
}
