import fs from "node:fs";
import path from "node:path";
import { imageSize } from "./image-size";

const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;
// Names straight off a camera or phone ("IMG_2034", "PXL_2026...") say nothing about the photo.
const UNNAMED = /^(img|dsc[nf]?|pxl|mvimg|photo|image|screenshot)[-_ ]?\d/i;

function describe(file) {
  const name = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");
  return UNNAMED.test(name) ? "" : name.replace(/[-_]+/g, " ").trim();
}

// Files of one kind dropped in public/me/<slug>/, sorted by file name, with their sizes. Read
// when the page is built (and on every request in dev).
// "02-bouldering-at-the-gym.jpg" -> alt "bouldering at the gym".
function files(slug, kind) {
  const dir = path.join(process.cwd(), "public", "me", slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => kind.test(file))
    .sort()
    .map((file) => {
      const src = `/me/${slug}/${encodeURIComponent(file)}`;
      return { src, alt: describe(file), ...imageSize(src) };
    });
}

export const deskPhotos = (slug) => files(slug, IMAGE);
export const deskVideos = (slug) => files(slug, VIDEO);
