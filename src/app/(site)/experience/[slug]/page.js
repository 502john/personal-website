import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/portfolio/container";
import { DateRange } from "@/components/portfolio/date-range";
import { StackList } from "@/components/portfolio/stack-list";
import { StoryBlocks } from "@/components/portfolio/story-blocks";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { storyHref, withStories } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

// Only entries with a story get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return withStories(experience).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = withStories(experience).find((e) => e.slug === slug);
  return entry ? pageMetadata({ title: `${entry.role} · ${entry.org} | ${site.name}`, description: entry.why }) : {};
}

export default async function ExperiencePage({ params }) {
  const { slug } = await params;
  const stories = withStories(experience);
  const index = stories.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const entry = stories[index];
  // Same order as the home page.
  const previous = stories[index - 1];
  const next = stories[index + 1];
  const meta = [entry.org, entry.team, entry.domain].filter(Boolean).join(" · ");
  const { labels } = site;

  return (
    <Container className="pt-16 pb-24 sm:pt-20">
      <Link href="/" className="text-xs text-muted-foreground hover:underline">
        ← {labels.back}
      </Link>

      <header className="mt-8">
        <DateRange start={entry.start} end={entry.end} presentLabel={labels.present} />
        <h1 className="mt-1 font-serif text-2xl font-bold">{entry.role}</h1>
        {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
        {entry.why && <p className="mt-6 font-serif text-lg leading-relaxed">{entry.why}</p>}
        <StackList items={entry.stack} className="mt-4" />
      </header>

      <div className="mt-10">
        <StoryBlocks blocks={entry.story} />
      </div>

      {(previous || next) && (
        <nav className="mt-16 flex justify-between gap-6 border-t border-dotted pt-6 text-sm">
          {previous ? (
            <Link href={storyHref(previous)} className="group">
              <span className="block text-xs text-muted-foreground">← {labels.previous}</span>
              <span className="group-hover:underline">{previous.org}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={storyHref(next)} className="group text-right">
              <span className="block text-xs text-muted-foreground">{labels.next} →</span>
              <span className="group-hover:underline">{next.org}</span>
            </Link>
          )}
        </nav>
      )}
    </Container>
  );
}
