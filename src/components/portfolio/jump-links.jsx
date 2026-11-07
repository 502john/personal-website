import { Fragment } from "react";

// A quiet line of links to the sections further down the page.
export function JumpLinks({ sections, label }) {
  return (
    <nav aria-label={label} className="mt-5 flex flex-wrap justify-center gap-x-2 text-xs text-muted-foreground">
      {sections.map((section, i) => (
        <Fragment key={section.id}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <a href={`#${section.id}`} className="decoration-dotted underline-offset-4 hover:text-foreground hover:underline">
            {section.title}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
