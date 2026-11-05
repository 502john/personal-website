import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { imageSize } from "@/lib/image-size";
import { demos } from "./demos";

function walk(node, visit) {
  visit(node);
  node.children?.forEach((child) => walk(child, visit));
}

// ::demo{name="..."} on its own line becomes the demo with that name. Other colon words that
// remark-directive picks up (like "note:this") go back to being plain text.
function directives() {
  return (tree) =>
    walk(tree, (node) => {
      if (node.type === "leafDirective" && node.name === "demo") {
        const name = node.attributes?.name;
        if (!demos[name]) throw new Error(`No demo named "${name}". Add it to src/components/blog/demos.js.`);
        node.data = { hName: "demo", hProperties: { name } };
      } else if (node.type.endsWith("Directive")) {
        const text = node.children?.map((child) => child.value ?? "").join("") ?? "";
        const colons = node.type === "textDirective" ? ":" : node.type === "leafDirective" ? "::" : ":::";
        Object.assign(node, { type: "text", value: `${colons}${node.name}${text}`, children: undefined });
      }
    });
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(directives)
  .use(remarkRehype)
  .use(rehypeHighlight, { detect: false });

function PostLink({ href = "", children, ...props }) {
  const classes = "underline decoration-dotted underline-offset-4 hover:decoration-solid";
  // Footnote links and other in-page anchors stay on the page.
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes} {...props}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
      {children}
    </a>
  );
}

// Images in public/ get their real size so they load without a jump; others load as they are.
function PostImage({ src = "", alt = "" }) {
  const size = src.startsWith("/") ? imageSize(src) : null;
  return (
    <span className="my-8 block">
      {size ? (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          sizes="(min-width: 672px) 40rem, 100vw"
          className="h-auto w-full rounded-lg border border-dotted"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="h-auto w-full rounded-lg border border-dotted" />
      )}
      {alt && <span className="mt-2 block text-center text-xs text-muted-foreground">{alt}</span>}
    </span>
  );
}

// Each Markdown element, styled like the rest of the site.
const components = {
  // The footnotes list comes with a heading meant only for screen readers.
  h2: ({ className, ...props }) =>
    className === "sr-only" ? (
      <h2 className="sr-only" {...props} />
    ) : (
      <h2 className="mt-12 mb-4 font-serif text-xl font-bold" {...props} />
    ),
  h3: (props) => <h3 className="mt-8 mb-3 font-serif text-lg font-bold" {...props} />,
  p: (props) => <p className="my-5 font-serif text-[1.0625rem] leading-relaxed" {...props} />,
  a: PostLink,
  img: PostImage,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 font-serif text-[1.0625rem] leading-relaxed marker:text-muted-foreground" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 font-serif text-[1.0625rem] leading-relaxed marker:text-muted-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-2 border-dotted border-foreground/40 pl-4 text-muted-foreground [&>p]:my-2" {...props} />
  ),
  hr: () => <hr className="my-10 border-dotted" />,
  code: (props) => <code className="rounded bg-muted px-1 py-0.5 font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[0.85em]" {...props} />,
  // Code blocks drop the inline code look and scroll sideways on narrow screens.
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-dotted bg-muted/40 p-4 font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[0.8125rem] leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[length:inherit]"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-dotted px-3 py-2 text-left font-medium" {...props} />,
  td: (props) => <td className="border-b border-dotted px-3 py-2 align-top" {...props} />,
  // GitHub-style footnotes: the list at the end of the post.
  section: ({ className, ...props }) => (
    <section
      className={`${className ?? ""} mt-14 border-t border-dotted pt-6 text-sm text-muted-foreground [&_li]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-0 [&_p]:font-sans [&_p]:text-sm`}
      {...props}
    />
  ),
  demo: ({ name }) => {
    const Demo = demos[name];
    return (
      <div className="my-8 font-sans">
        <Demo />
      </div>
    );
  },
};

export async function Markdown({ source }) {
  const tree = await processor.run(processor.parse(source));
  return toJsxRuntime(tree, { Fragment, jsx, jsxs, components });
}
