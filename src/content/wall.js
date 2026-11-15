// The board on the wall behind the /me desk: short notes on things I care about.
// Tapping the board turns the camera to face it, and tapping a note opens it like a desk object.
//
// Fields for each note
//   slug    names its photo folder, public/wall/<slug>/ (photos show on the back, as on the desk)
//   title   on the note and the back
//   story   paragraphs on the back
//   status  optional small tag under the story, like "Full write up coming soon"
//   hidden  true to keep it here without showing it

export const wall = {
  label: "Things I care about",
  back: "Back to main view",
  notes: [
    {
      slug: "eggs-in-one-basket",
      title: "Don't put all your eggs in one basket",
      story: ["I agree, and I refuse. Passion often takes intensity."],
    },
    {
      slug: "intuitive-learning",
      title: "Intuitive learning as LoRA adapters",
      story: [
        "Most people aren't missing the ability to learn something, they're missing the translation.",
        "LoRA doesn't retrain a big model. The knowledge is already in there, so it adds a small layer that connects it to the task.",
        "A good tutor is that layer. They put the material in your words, your stories, the way you think, and it clicks. AI is the equalizer, because now everyone can have one.",
      ],
      status: "Full write up coming soon",
    },
  ],
};
