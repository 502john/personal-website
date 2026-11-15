import { Container } from "@/components/portfolio/container";
import { Temple } from "@/components/why-bloomberg/temple";
import { site } from "@/content/site";
import { whyBloomberg } from "@/content/why-bloomberg";
import { folderPhotos, folderVideos } from "@/lib/desk-photos";
import { pageMetadata } from "@/lib/metadata";

// Not linked from anywhere, and kept out of search results, so only people with the link see it.
export const metadata = {
  ...pageMetadata({ title: `${whyBloomberg.title} | ${site.name}`, description: whyBloomberg.hint }),
  robots: { index: false, follow: false },
};

export default function WhyBloombergPage() {
  return (
    <Container className="max-w-4xl pt-20 pb-32">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-2xl font-bold">{whyBloomberg.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{whyBloomberg.hint}</p>
      </header>
      <Temple
        content={whyBloomberg}
        photos={folderPhotos("why-bloomberg")}
        videos={folderVideos("why-bloomberg")}
        labels={site.labels}
      />
    </Container>
  );
}
