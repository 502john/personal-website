import fs from "node:fs";
import path from "node:path";
import { imageSize } from "./image-size";

const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
// Names straight off a camera or phone ("IMG_2034", "PXL_2026...") say nothing about the photo.
const UNNAMED = /^(img|dsc[nf]?|pxl|mvimg|photo|image|screenshot)[-_ ]?\d/i;

function describe(file) {
  const name = file.replace(IMAGE, "").replace(/^\d+[-_ ]*/, "");
  return UNNAMED.test(name) ? "" : name.replace(/[-_]+/g, " ").trim();
}

// Photos dropped in public/me/<slug>/, sorted by file name. Read when the page is built
// (and on every request in dev). "02-bouldering-at-the-gym.jpg" -> alt "bouldering at the gym".
export function deskPhotos(slug) {
  const dir = path.join(process.cwd(), "public", "me", slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE.test(file))
    .sort()
    .map((file) => {
      const src = `/me/${slug}/${encodeURIComponent(file)}`;
      return { src, alt: describe(file), ...imageSize(src) };
    });
}
