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
//   line         a sentence or two connecting the evidence to Bloomberg, or a list of paragraphs
//   experience   slugs from content/experience.js, shown as on the home page
//   desk         slugs from content/desk/, shown as the desk objects (tap to flip)
//   links        [{ label, href }]
//   quote        { lead, text, by, note } a quote set apart under the line, with a lead-in before it
//                and what it means after it
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
    line: "I take an idea from the first experiment to something other people can rely on.",
    experience: ["lijing-wang-lab", "ai-imaging-medicine-lab"],
  },

  preparation: {
    label: "Road to Bloomberg",
    line: "The events, the conversations, and the late nights studying for this interview.",
  },

  whyBloomberg: {
    label: "Why Bloomberg to me",
    line: "Bloomberg takes an enormous amount of financial information and makes it accurate and useful for people making real decisions, and it's built by engineers who build for each other. Each pillar holding up this temple is one reason I'm drawn to that.",
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
      line: "At PGIM I built Terraform modules other teams reused. Bloomberg's shared platform engineering, which I learned about at Bloomberg: Code To Career, is that impact at a much larger scale.",
      quote: {
        lead: "One line from Code To Career stuck with me, about working on Bloomberg's infrastructure.",
        text: "There's nothing like working on a car going 100mph, and no one can tell.",
        by: "Zhiquan Yeo",
        note: "The systems people rely on keep running while you change what's underneath them, and the work is done right when nobody notices it happened. That kind of quiet, careful impact is what I want to build toward.",
      },
      experience: ["pgim"],
      desk: ["pgim"],
    },
    {
      label: "Culture",
      line: [
        "Bloomberg's culture is flat, and engineers talk directly with the people leading the work. I know what that does for someone new. At PGIM, being able to sit down with engineers and leadership is a big part of why I grew as fast as I did.",
        "Everyone I've spoken with at Bloomberg also gives back in some way, through mentoring, events like Code To Career, or their own communities. That's what I've done through SHPE and HISPA, and it's the kind of place I want to keep growing in.",
      ],
      desk: ["shpe", "community"],
    },
  ],
};
