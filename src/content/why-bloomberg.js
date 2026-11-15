// The hidden /why-bloomberg page. It isn't linked anywhere on the site and asks search
// engines not to index it, so only people with the link find it.
//
// A temple with two brackets beside it. The bottom bracket, the columns, is why Bloomberg to
// me, the foundation. The top bracket, the roof and the photo band under it, is why me to
// Bloomberg, resting on it. Pointing at a part pulls up the evidence beside the temple, using
// what's already on the site, so each part only needs a line connecting the dots.
//
// Fields for each part
//   label        its name, on the temple and above its panel
//   line         one or two sentences connecting the evidence to Bloomberg
//   experience   slugs from content/experience.js, shown as on the home page
//   desk         slugs from content/desk/, shown as the desk objects (tap to flip)
//   links        [{ label, href }]
//
// Road to Bloomberg photos and videos go in public/why-bloomberg/, sorted and captioned by file name
// as on the desk. They show through the band under the roof.

export const whyBloomberg = {
  title: "Why Bloomberg?",
  hint: "Point at any part of the temple.",
  intro: [
    "Two questions, built like a temple.",
    "Why Bloomberg is the foundation, the three reasons it's where I want to grow. Why me rests on top, what I'd bring and how I got ready.",
  ],

  whyMe: {
    label: "Why me to Bloomberg",
    line: "I turn research into something people can rely on. Clear requirements, deliberate trade-offs, and work clean enough that every answer holds up.",
    experience: ["lijing-wang-lab", "ai-imaging-medicine-lab"],
    links: [{ label: "Tether, a team project I led", href: "/projects/tether" }],
  },

  preparation: {
    label: "Road to Bloomberg",
    line: "The events, the conversations, and the late nights studying for this interview.",
  },

  whyBloomberg: {
    label: "Why Bloomberg to me",
    line: "Meaningful data, engineering that multiplies other engineers, and a culture I've already felt.",
  },

  pillars: [
    {
      label: "Data",
      line: "My first research was epidemic forecasting with messy data from many sources. Bloomberg turns far more of it into information people trust with big decisions.",
      experience: ["lijing-wang-lab-forecasting"],
      desk: ["cs-swe-ai"],
    },
    {
      label: "Impact",
      line: "At PGIM I built Terraform modules other teams reused. Bloomberg's shared platform engineering, which I heard about at Data Decoded, is that impact at a much larger scale.",
      experience: ["pgim"],
      desk: ["pgim"],
    },
    {
      label: "Culture",
      line: "Through Bloomberg events and mentorship I've seen how approachable the engineers are, and I know how much I grow when I can talk with the people around me.",
      desk: ["shpe", "community"],
    },
  ],
};
