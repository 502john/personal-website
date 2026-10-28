// Objects on the /me desk, in the order they're thrown on.
//
// Add an object: copy one of the files in this folder, give it a new slug, import it here,
// and add it to the list. Remove one: delete its line below (and its file).
//
// Photos: drop them in public/me/<slug>/ and they show on the back as a stack to flip through,
// sorted by file name. The file name is the caption and alt text, so name them for what's in
// them ("bouldering-at-the-gym.jpg"); names straight off a phone ("IMG_2034") get no caption.
// A polaroid uses its first photo on the front. For a stack of photos on the desk itself, use
// kind "photos": its top three prints are the first three photos.
// Use .jpg, .png, or .webp (iPhone .heic files won't display in browsers).
//
// Fields
//   slug      matches the photo folder in public/me/
//   kind      note, ticket, polaroid, photos, index, record, book, or receipt
//   title     on the object and the back
//   subtitle  optional second line (event, artist, author, order...)
//   story     paragraphs on the back
//   links     [{ label, href }] shown on the back
//   embed     a Spotify playlist, album, or track link; its player shows on the back
//   hidden    true to keep it here without showing it

import { card as doIt } from "./do-it";
import { card as firstOralPresentation } from "./first-oral-presentation";
import { card as community } from "./community";
import { card as csSweAi } from "./cs-swe-ai";
import { card as onRepeat } from "./on-repeat";
import { card as pragmaticProgrammer } from "./pragmatic-programmer";
import { card as dataIntensiveApplications } from "./data-intensive-applications";
import { card as coffeeOrder } from "./coffee-order";
import { card as offTheClock } from "./off-the-clock";
import { card as greatMindsInStem } from "./great-minds-in-stem";
import { card as cats } from "./cats";
import { card as pgim } from "./pgim";
import { card as friends } from "./friends";

export const desk = [
  doIt,
  firstOralPresentation,
  community,
  csSweAi,
  pgim,
  onRepeat,
  pragmaticProgrammer,
  friends,
  dataIntensiveApplications,
  coffeeOrder,
  offTheClock,
  greatMindsInStem,
  cats,
];
