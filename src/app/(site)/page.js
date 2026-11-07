import { CompactList } from "@/components/portfolio/compact-list";
import { Container } from "@/components/portfolio/container";
import { Hero } from "@/components/portfolio/hero";
import { JumpLinks } from "@/components/portfolio/jump-links";
import { Section } from "@/components/portfolio/section";
import { Board } from "@/components/portfolio/board";
import { Chapters } from "@/components/portfolio/chapters";
import { experience } from "@/content/experience";
import { leadership } from "@/content/leadership";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { withSizes } from "@/lib/image-size";

const sections = {
  experience: () => (
    <Chapters entries={experience.map((e) => ({ ...e, photos: withSizes(e.photos) }))} labels={site.labels} />
  ),
  leadership: () => <CompactList items={leadership} labels={site.labels} />,
  projects: () => <CompactList items={projects} labels={site.labels} />,
};

export default function HomePage() {
  const shown = site.sections.filter(({ id }) => sections[id]);

  return (
    <Container className="pb-24">
      <Hero name={site.name} tagline={site.tagline} about={site.about} links={site.links} />
      <JumpLinks sections={shown} label={site.labels.onThisPage} />
      <Board columns={site.board} labels={site.labels} />
      {shown.map(({ id, title }) => (
        <Section key={id} id={id} title={title}>
          {sections[id]()}
        </Section>
      ))}
    </Container>
  );
}
