// Site-wide text for the portfolio. /card has its own.

export const site = {
  name: "John Acosta",
  tagline: "Applied AI & Software Engineering",
  // Shown in search results and link previews.
  description: "John Acosta · Applied AI & Software Engineering",

  // 2-3 sentences under the name. null hides it.
  about: null,

  // Columns under the intro. Each has a title plus any of body, items, updated ("YYYY-MM").
  // An empty list hides it.
  board: [
    {
      title: "Now",
      body: "Final year of computer science at NJIT. Building my foundation in AI to understand the mechanisms behind the technology disrupting the world.",
      updated: "2026-10",
    },
    {
      title: "How I work",
      items: [
        "Understand the why first.",
        "Ask if it's feasible, viable, and desirable.",
        "Own it end to end.",
        "Let feedback shape the idea.",
      ],
    },
  ],

  // The switch in the top-left corner of the portfolio and /card.
  pages: [
    { label: "Portfolio", href: "/" },
    { label: "Me", href: "/me" },
    { label: "Card", href: "/card" },
  ],

  // The /me page. Objects on the desk are in content/desk/.
  me: {
    title: "Get to know me",
    hint: "Pick up anything on the desk.",
    orbitHint: "Drag the desk to look around.", // shown only with a mouse or trackpad
  },

  // icon: file, linkedin, github, or mail.
  links: [
    { label: "Resume", href: "/resume.pdf", icon: "file" },
    { label: "LinkedIn", href: "https://linkedin.com/in/johnacosta1/", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/502john", icon: "github" },
    { label: "Email", href: "mailto:johnacosta502@gmail.com", icon: "mail" },
  ],

  // Home page sections, in order. id is experience, leadership, or projects.
  sections: [
    { id: "experience", title: "Experience" },
    { id: "leadership", title: "Leadership" },
    { id: "projects", title: "Projects" },
  ],

  labels: {
    present: "Present",
    fullStory: "Full story",
    details: "Details",
    updated: "Updated",
    back: "Back",
    previous: "Previous",
    next: "Next",
    close: "Close",
    flip: "Flip",
    viewPhoto: "View photo",
  },
};
