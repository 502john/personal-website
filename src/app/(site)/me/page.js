import { Container } from "@/components/portfolio/container";
import { Desk } from "@/components/portfolio/desk";
import { desk } from "@/content/desk";
import { site } from "@/content/site";
import { visible } from "@/lib/content";
import { deskPhotos } from "@/lib/desk-photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: `${site.me.title} | ${site.name}`, description: site.me.hint });

export default function MePage() {
  const items = visible(desk).map((card) => ({ ...card, photos: deskPhotos(card.slug) }));

  return (
    // Clip at the page edges, not the column, so the room can reach toward the sides
    // and fade out at the bottom without adding scroll.
    <div className="overflow-clip">
      <Container className="max-w-5xl pt-20 pb-48">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-2xl font-bold">{site.me.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {site.me.hint} <span className="hidden pointer-fine:inline">{site.me.orbitHint}</span>
          </p>
        </header>
        <Desk items={items} labels={site.labels} />
      </Container>
    </div>
  );
}
