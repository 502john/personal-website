// The hidden /why-bloomberg page. It isn't linked anywhere on the site and asks search
// engines not to index it, so only people with the link find it.
//
// The page is a temple. The three columns are why Bloomberg, for me. The roof is why me, for
// Bloomberg, resting on them. The frieze under the roof is the preparation, from
// public/why-bloomberg/ (photos and videos, sorted and captioned by file name, as on the desk).
//
// Fields
//   title, hint      the heading above the temple
//   inscription      carved across the beam
//   whyMe            opens from the roof { label, title, story, links }
//   pillars          one per column, left to right { label, title, story, links }
//   preparation      the title of the frieze's viewer
//   links            [{ label, href }] shown on the back of a card

export const whyBloomberg = {
  title: "Why Bloomberg",
  hint: "Tap a pillar, the roof, or a panel in the frieze.",
  inscription: "Data · Impact · Culture",

  whyMe: {
    label: "Why me",
    title: "Why me, for Bloomberg",
    story: [
      "Research taught me the gap between proving an idea works and building something other people can rely on. I enjoy the exploring. What I find most rewarding is the next step, making the work readable, reproducible, and maintainable.",
      "I measure twice and cut once. I make requirements explicit early so everyone knows what we're building and what done looks like, and on my team project I pushed us to talk through big technical decisions together.",
      "That makes trade-offs deliberate instead of accidental. Deadlines still force them, and with AI-assisted development I can test an assumption quickly before committing to the bigger build.",
      "Clear communication, decisions grounded in evidence, and software that's reliable without slowing the team down.",
    ],
    links: [
      { label: "Tether, the team project", href: "/projects/tether" },
      { label: "Experience", href: "/#experience" },
    ],
  },

  pillars: [
    {
      label: "Data",
      title: "Meaningful data",
      story: [
        "My interest in data started with epidemic forecasting. The data was large, messy, and came from many sources, and I learned how hard and how rewarding it is to turn that into something reliable.",
        "Bloomberg does that at a scale I find exciting, taking an enormous amount of financial information and making it accurate and accessible to people making important decisions.",
      ],
      links: [{ label: "Research", href: "/#experience" }],
    },
    {
      label: "Impact",
      title: "Engineering that multiplies engineers",
      story: [
        "At PGIM Fixed Income I built reusable Terraform modules that cut duplicated code and streamlined how teams shipped. The best part wasn't the technology. It was knowing other engineers moved faster because of it.",
        "At Bloomberg's Data Decoded event I heard about the shared platform engineering approach, teams building reusable components and services for other engineers. It's the impact I loved at PGIM, at a much larger scale.",
      ],
      links: [
        { label: "PGIM", href: "/#experience" },
        { label: "On the desk", href: "/me" },
      ],
    },
    {
      label: "Culture",
      title: "A culture I've already felt",
      story: [
        "Through Bloomberg events, conversations with engineers, and mentorship, I've seen how collaborative and approachable the people are.",
        "I know what that environment does for me. At PGIM, being able to talk directly with engineers and leadership helped me grow fast.",
      ],
      links: [{ label: "Community, on the desk", href: "/me" }],
    },
  ],

  preparation: "Preparation",
};
