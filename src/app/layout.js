
import "./globals.css";
import { site } from "@/content/site";

export const metadata = {
  title: site.name,
  description: site.description,
};

// Apply the saved theme before first paint (AnimatedThemeToggler saves it).
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div>
          {/* <SmoothCursor /> */}
        {children}
        </div>
      </body>
    </html>
  );
}
