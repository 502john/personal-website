import fs from "node:fs";
import path from "node:path";

// Width and height of an image in public/, read from its header when the page is built, so
// photos can be shown at their own shape instead of cropped. null if the format isn't known.
export function imageSize(src) {
  const file = path.join(process.cwd(), "public", decodeURIComponent(src));
  if (!fs.existsSync(file)) return null;
  const b = fs.readFileSync(file);

  if (b.toString("ascii", 1, 4) === "PNG") return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b.toString("ascii", 0, 3) === "GIF") return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
  if (b.toString("ascii", 8, 12) === "WEBP") return webpSize(b);
  if (b[0] === 0xff && b[1] === 0xd8) return jpegSize(b);
  return null;
}

// Adds width and height to each photo in a list.
export function withSizes(photos = []) {
  return photos.map((photo) => ({ ...imageSize(photo.src), ...photo }));
}

function webpSize(b) {
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  return null;
}

// Walks the JPEG markers to the frame header. Phone photos are often stored sideways with an
// orientation tag, so the size is swapped when the tag says the photo is turned.
function jpegSize(b) {
  let orientation = 1;
  for (let i = 2; i + 9 < b.length; ) {
    if (b[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = b[i + 1];
    if (marker === 0xe1 && b.toString("ascii", i + 4, i + 8) === "Exif") orientation = exifOrientation(b, i + 10);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      const height = b.readUInt16BE(i + 5);
      const width = b.readUInt16BE(i + 7);
      return orientation >= 5 ? { width: height, height: width } : { width, height };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

function exifOrientation(b, tiff) {
  const little = b.toString("ascii", tiff, tiff + 2) === "II";
  const u16 = (at) => (little ? b.readUInt16LE(at) : b.readUInt16BE(at));
  const u32 = (at) => (little ? b.readUInt32LE(at) : b.readUInt32BE(at));
  const ifd = tiff + u32(tiff + 4);
  for (let n = u16(ifd), entry = ifd + 2; n > 0; n--, entry += 12) {
    if (u16(entry) === 0x0112) return u16(entry + 8);
  }
  return 1;
}
