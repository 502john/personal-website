
import "./globals.css";

// import { SmoothCursor } from "@/components/ui/smooth-cursor"


export const metadata = {
  title: "John Acosta",
  description: "Links to my work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ minWidth: 400, overflowX: "hidden" }}>
          {/* <SmoothCursor /> */}
        {children}
        </div>
      </body>
    </html>
  );
}
