import Image from "next/image";

export function StoryBlocks({ blocks }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="pt-4 font-serif text-lg font-bold">
                {block.body}
              </h2>
            );
          case "text":
            return (
              <p key={i} className="leading-relaxed">
                {block.body}
              </p>
            );
          case "image":
            return (
              <figure key={i}>
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width ?? 1600}
                  height={block.height ?? 900}
                  sizes="(min-width: 672px) 40rem, 100vw"
                  className="h-auto w-full rounded-lg border border-dotted"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
