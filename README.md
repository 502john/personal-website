# Purpose

[Website](https://www.john-acosta.com)

The purpose of this project is to have a visual display of my work, skills, and experience.

# Editing the portfolio

Everything on the portfolio comes from `src/content/`. Each file lists its fields at the top.

| To change | Edit |
| --- | --- |
| Name, tagline, links, Now / How I work, section order | `src/content/site.js` |
| Experience | `src/content/experience.js` |
| Leadership, Projects | `src/content/leadership.js`, `projects.js` |
| Objects on /me | `src/content/desk/` (one file each; photos in `public/me/<slug>/`) |

- Entries sort by date. `end: null` marks one as current.
- `hidden: true` hides an entry without deleting it.
- Photos go in `public/imgs/experience/<slug>/`, documents in `public/files/experience/<slug>/`.
- Adding a `story` to an entry creates `/experience/<slug>`.

Preview with `npm run dev`. Design notes are in `docs/redesign-plan.md`.
