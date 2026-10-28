# Portfolio notes

The portfolio at `/` tells my experience as short chapters: what I'm doing now, then each role, newest first. `/card` stays a simple link page.

## Rules

- All text, links, dates, photos and files live in `src/content/`. Components only render what they're given.
- Order comes from dates, not from the order in the file.
- Keep the existing look: serif headings, dotted borders, muted text, true-black dark mode.
- Minimal. One line per chapter up front, everything else behind Details.
- No job-seeking language.
- No numbers that haven't been cleared for public use (PGIM figures are left out for now).
- Photos and files are optional; every chapter has to look complete without them.
- No colons in site copy.
- No new dependencies.

## Structure

```
src/app/
  layout.js                  root layout, saved-theme script
  (site)/                    portfolio pages, share the theme toggle
    page.js                  /
    experience/[slug]/       /experience/<slug>, only for entries with a story
    me/                      /me, a desk of objects to pick up (experimental)
    projects/tether/         /projects/tether (not linked from the home page)
  (card)/card/               /card
src/content/                 site.js, experience.js, leadership.js, projects.js, desk/
src/components/portfolio/    Hero, Board, Chapters, Chapter, CompactList, PhotoStrip, ...
src/lib/content.js           sorting, grouping, date formatting
```

Route groups (folders in parentheses) don't change URLs; they let `/card` and the portfolio have separate layouts.

## Open items

- Photos and the poster for Engineering for research (NEBEC 2025?).
- Which numbers are cleared for public use, especially PGIM.
- AI-Tutor is hidden in `projects.js`; include it or delete it.
- Leadership entries are memberships; add roles if there are any.
- `/projects/tether`: keep or delete.
