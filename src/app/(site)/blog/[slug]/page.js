import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/blog/markdown";
import { Container } from "@/components/portfolio/container";
import { site } from "@/content/site";
import { post, posts } from "@/lib/blog";
import { formatDay } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const entry = post((await params).slug);
  return entry ? pageMetadata({ title: `${entry.title} | ${site.name}`, description: entry.summary }) : {};
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const list = posts();
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const entry = list[index];
  // The list runs newest first, so the newer post is the one before.
  const newer = list[index - 1];
  const older = list[index + 1];
  const { labels } = site;

  return (
    <Container className="pt-16 pb-24 sm:pt-20">
      <Link href="/blog" className="text-xs text-muted-foreground hover:underline">
        ← {site.blog.title}
      </Link>

      <header className="mt-8">
        <p className="text-xs tabular-nums text-muted-foreground">
          <time dateTime={entry.date}>{formatDay(entry.date)}</time> · {entry.minutes} {labels.minRead}
        </p>
        <h1 className="mt-1.5 font-serif text-3xl leading-tight font-bold">{entry.title}</h1>
        {entry.summary && <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">{entry.summary}</p>}
      </header>

      <article className="mt-8 border-t border-dotted pt-4">
        <Markdown source={entry.content} />
      </article>

      {(newer || older) && (
        <nav className="mt-16 flex justify-between gap-6 border-t border-dotted pt-6 text-sm">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group">
              <span className="block text-xs text-muted-foreground">← {labels.previous}</span>
              <span className="font-serif group-hover:underline">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group text-right">
              <span className="block text-xs text-muted-foreground">{labels.next} →</span>
              <span className="font-serif group-hover:underline">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </Container>
  );
}
