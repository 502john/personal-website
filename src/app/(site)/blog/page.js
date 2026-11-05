import Link from "next/link";
import { Container } from "@/components/portfolio/container";
import { site } from "@/content/site";
import { posts, upcoming } from "@/lib/blog";
import { formatDay } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: `${site.blog.title} | ${site.name}`, description: site.blog.description });

export default function BlogPage() {
  const soon = upcoming();
  const list = posts();
  const { labels } = site;
  const badge = "rounded-md border border-dotted px-1.5 py-0.5";

  return (
    <Container className="pt-20 pb-24">
      <header>
        <h1 className="font-serif text-2xl font-bold">{site.blog.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{site.blog.description}</p>
      </header>

      {list.length + soon.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">{site.blog.empty}</p>
      ) : (
        <ul className="mt-10 divide-y divide-dotted">
          {soon.map((post) => (
            <li key={post.slug} className="py-6 first:pt-0">
              <p className="text-xs text-muted-foreground">
                <span className={badge}>{labels.comingSoon}</span>
              </p>
              <h2 className="mt-1.5 font-serif text-lg font-bold">{post.title}</h2>
              {post.summary && <p className="mt-1.5 font-serif leading-relaxed text-muted-foreground">{post.summary}</p>}
            </li>
          ))}
          {list.map((post) => (
            <li key={post.slug} className="py-6 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-xs tabular-nums text-muted-foreground">
                  <time dateTime={post.date}>{formatDay(post.date)}</time> · {post.minutes} {labels.minRead}
                  {post.draft && <span className={`ml-2 ${badge}`}>{labels.draft}</span>}
                </p>
                <h2 className="mt-1.5 font-serif text-lg font-bold decoration-dotted underline-offset-4 group-hover:underline">
                  {post.title}
                </h2>
                {post.summary && <p className="mt-1.5 font-serif leading-relaxed text-muted-foreground">{post.summary}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
