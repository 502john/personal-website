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
| Celsius can reviews | `src/content/desk/celsius.js` (proof photos in `public/me/celsius/`) |

- Entries sort by date. `end: null` marks one as current.
- `hidden: true` hides an entry without deleting it.
- Photos go in `public/imgs/experience/<slug>/`, documents in `public/files/experience/<slug>/`.
- Adding a `story` to an entry creates `/experience/<slug>`.

## Celsius reviews

The upright can on the /me desk opens to a tier list of every canned flavor.

- Add a flavor name to a tier (S to D) in `celsius.js` to rate it. Anything not in a tier shows as Not reviewed.
- A tier with five or more flavors stacks up and fans out when tapped.
- Drop a photo named after the flavor in `public/me/celsius/` (`kiwi-guava.jpg`) and that flavor opens it as proof.
- A flavor in a tier but missing from the list of cans fails the build, so typos get caught.

## The /me desk

Objects are drawn in CSS in `src/components/portfolio/desk-object.jsx`, and `index.js` in the desk folder lists the kinds and fields. The desk is a tilted 3D scene. Books have real side faces, the can is a ring of faces revolved from a reference profile, and thin paper gets a flat edge line, because very short walls make the browser's 3D sorting slice through nearby objects.

## For agents

`AGENTS.md` warns that this Next.js version differs from older ones. Read the guides in `node_modules/next/dist/docs/` before writing code.

Preview with `npm run dev`. Design notes are in `docs/redesign-plan.md`.
