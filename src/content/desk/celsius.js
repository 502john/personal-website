// Photos for this object go in public/me/celsius/. Fields are explained in index.js.
//
// Celsius can reviews. Every flavor starts under "Not reviewed". To rate one, set its tier
// to "S", "A", "B", "C", or "D" below. To add proof that you drank it, drop a photo in
// public/me/celsius/ named after the flavor ("kiwi-guava.jpg"); the flavor then opens it.

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

// Flavors you've rated; everything else stays "Not reviewed". Name -> tier.
const tiers = {
  // "Kiwi Guava": "S",
};

export const card = {
  slug: "celsius",
  kind: "can",
  title: "Celsius reviews",
  subtitle: "every can, ranked",
  flavors: flavors.map((name) => ({ name, tier: tiers[name] ?? null })),
};
