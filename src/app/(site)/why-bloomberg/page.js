import { Chapters } from "@/components/portfolio/chapters";
import { ContentLink } from "@/components/portfolio/content-link";
import { Container } from "@/components/portfolio/container";
import { DeskShelf, Preparation } from "@/components/why-bloomberg/shelf";
import { Temple } from "@/components/why-bloomberg/temple";
import { desk } from "@/content/desk";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { whyBloomberg as page } from "@/content/why-bloomberg";
import { deskPhotos, deskVideos, folderPhotos, folderVideos } from "@/lib/desk-photos";
import { withSizes } from "@/lib/image-size";
import { pageMetadata } from "@/lib/metadata";

// Not linked from anywhere, and kept out of search results, so only people with the link see it.
export const metadata = {
  ...pageMetadata({ title: `Why Bloomberg | ${site.name}`, description: page.intro.join(" ") }),
  robots: { index: false, follow: false },
};

const entries = (slugs = []) =>
  experience.filter((e) => slugs.includes(e.slug)).map((e) => ({ ...e, photos: withSizes(e.photos) }));

const deskItems = (slugs = []) =>
  slugs
    .map((slug) => desk.find((card) => card.slug === slug))
    .filter(Boolean)
    .map((card) => ({ ...card, photos: deskPhotos(card.slug), videos: deskVideos(card.slug) }));

// One part's panel: its name, the line connecting the dots, then the evidence from the site.
function Panel({ part, children }) {
  return (
    <div>
      <h2 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{part.label}</h2>
      {[part.line].flat().map((paragraph) => (
        <p key={paragraph} className="mt-3 font-serif text-lg leading-relaxed">
          {paragraph}
        </p>
      ))}
      {part.quote && (
        <div className="mt-8">
          {part.quote.lead && <p className="text-sm text-muted-foreground">{part.quote.lead}</p>}
          <figure className="mt-4 border-l-[1.5px] border-foreground/60 pl-4">
            <blockquote className="font-serif text-lg leading-relaxed italic">“{part.quote.text}”</blockquote>
            <figcaption className="mt-2 text-sm text-muted-foreground">{part.quote.by}</figcaption>
          </figure>
          {part.quote.note && <p className="mt-8 font-serif text-lg leading-relaxed">{part.quote.note}</p>}
        </div>
      )}
      {children}
      {part.experience?.length > 0 && (
        <div className="mt-8">
          <Chapters entries={entries(part.experience)} labels={site.labels} />
        </div>
      )}
      {part.desk?.length > 0 && (
        <div className="mt-8">
          <DeskShelf items={deskItems(part.desk)} labels={site.labels} />
        </div>
      )}
      {part.links?.length > 0 && (
        <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
          {part.links.map((link) => (
            <li key={link.href}>
              <ContentLink href={link.href}>{link.label}</ContentLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function WhyBloombergPage() {
  const photos = folderPhotos("why-bloomberg");
  const videos = folderVideos("why-bloomberg");
  const [data, impact, culture] = page.pillars;

  const panels = {
    intro: (
      <div className="space-y-3 font-serif text-lg leading-relaxed">
        {page.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    ),
    whyMe: <Panel part={page.whyMe} />,
    preparation: (
      <Panel part={page.preparation}>
        <Preparation photos={photos} videos={videos} labels={site.labels} title={page.preparation.label} />
      </Panel>
    ),
    whyBloomberg: <Panel part={page.whyBloomberg} />,
    data: <Panel part={data} />,
    impact: <Panel part={impact} />,
    culture: <Panel part={culture} />,
  };

  return (
    <Container className="max-w-6xl pt-16 pb-32">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-3xl font-bold sm:text-5xl">{page.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{page.hint}</p>
      </header>
      <Temple content={page} panels={panels} media={[...photos, ...videos.map((v) => ({ ...v, video: true }))]} />
    </Container>
  );
}
