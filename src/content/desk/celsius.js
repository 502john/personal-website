// Photos for this object go in public/me/celsius/. Fields are explained in index.js.
//
// Celsius can reviews. To rate a flavor, add its name to a tier below. Anything not in a
// tier shows as "Not reviewed", so a new can only needs adding to the list of cans.
// To add proof that you drank one, drop a photo in public/me/celsius/ named after the flavor
// ("kiwi-guava.jpg"); the flavor then opens it.

// Every canned flavor.
const flavors = [
  "Green Apple Cherry",
  "Fantasy Vibe",
  "Arctic Vibe",
  "Mango Passionfruit",
  "Tropical Vibe",
  "Peach Vibe",
  "Fuji Apple Pear",
  "Orange",
  "Kiwi Guava",
  "Wild Berry",
  "Watermelon",
  "Grape Rush",
  "Cola",
  "Cherry Cola",
  "Strawberry Passionfruit",
  "Mango Lemonade",
  "Kiwi Strawberry",
  "Watermelon Lemonade",
  "Raspberry Peach",
  "Galaxy Vibe",
  "Astro Vibe",
  "Cosmic Vibe",
  "Oasis Vibe",
  "Playa Vibe",
  "Retro Vibe",
  "Spritz Vibe Winter",
  "Spritz Vibe Summer",
  "Fizz Free Peach Mango Green Tea",
  "Fizz Free Pink Lemonade",
  "Fizz Free Dragon Fruit Lime",
  "Fizz Free Blue Razz Lemonade",
  "Essentials Orangesicle",
  "Essentials Grape Slush",
  "Essentials Watermelon Ice",
  "Essentials Blue Crush",
  "Essentials Cherry Limeade",
  "Essentials Dragonberry",
];

// Best to worst. Names must match the list above.
const tiers = {
  S: ["Cherry Cola", "Kiwi Strawberry"],
  A: [],
  B: ["Grape Rush", "Arctic Vibe", "Cosmic Vibe"],
  C: ["Mango Lemonade", "Fuji Apple Pear"],
  D: [],
};

const tierOf = new Map(Object.entries(tiers).flatMap(([tier, names]) => names.map((name) => [name, tier])));

// A typo in a tier would silently leave that flavor unrated, so fail loudly instead.
for (const name of tierOf.keys()) {
  if (!flavors.includes(name)) throw new Error(`celsius.js: "${name}" is in a tier but not in the list of cans`);
}

export const card = {
  slug: "celsius",
  kind: "can",
  title: "Celsius reviews",
  subtitle: "every can, ranked",
  flavors: flavors.map((name) => ({ name, tier: tierOf.get(name) ?? null })),
};
