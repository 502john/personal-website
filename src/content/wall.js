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
  back: "Back to the desk",
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
        "Learning is getting the big picture. The details matter far less than the lesson.",
        "A good tutor breaks a problem down so that you specifically understand it, the way a small adapter tunes a big model to one task. AI is the equalizer, because now everyone has that tutor.",
      ],
      status: "Full write up coming soon",
    },
  ],
};
