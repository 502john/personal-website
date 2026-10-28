// A page's title and description, also used for the preview shown when its link is shared:
// Open Graph for iMessage, Slack, LinkedIn, and most others, and a Twitter card for X.
export function pageMetadata({ title, description }) {
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  };
}
