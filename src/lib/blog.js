import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "src", "content", "blog");
const WORDS_PER_MINUTE = 230;

// Posts in src/content/blog/, newest first. The file name without its leading date is the URL:
// "2026-11-05-hidden-seed-state.md" -> /blog/hidden-seed-state. Drafts only show in dev.
export function posts() {
  const showDrafts = process.env.NODE_ENV === "development";
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map(read)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function post(slug) {
  return posts().find((p) => p.slug === slug);
}

function read(file) {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  if (!data.title || !data.date) throw new Error(`${file} needs a title and a date at the top.`);

  // YAML reads 2026-11-05 as a date; keep it as text so it reads the same everywhere.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug: file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    title: data.title,
    date,
    summary: data.summary ?? "",
    draft: data.draft === true,
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  };
}
