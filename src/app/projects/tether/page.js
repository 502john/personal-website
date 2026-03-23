"use client"

import { IconCloud } from "@/components/ui/icon-cloud"
import { MorphingText } from "@/components/ui/morphing-text"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
// import { RetroGrid } from "@/components/ui/retro-grid"
import { FileTextIcon } from "@radix-ui/react-icons"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const slugs = [
  "nextdotjs",
  "fastapi",
  "docker",
  "postgresql",
  "python",
  "react",
  "typescript",
]

const texts = ["Tether", "Trustworthy Learning Trajectories"]

export default function TetherPage() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">

      <div className="fixed top-4 right-4 z-50">
        <AnimatedThemeToggler />
      </div>

      {/* <RetroGrid className="absolute inset-0 hidden [@media(min-width:600px)]:block" /> */}

      <Card className="mt-10 relative z-10 w-full max-w-md bg-transparent shadow-none border-none">

        <div className="w-full flex items-center justify-center overflow-hidden" style={{ height: "200px" }}>
          <div style={{ transform: "scale(1)", transformOrigin: "center center" }}>
            <IconCloud images={images} />
          </div>
        </div>

        {/* MorphingText — override the hardcoded font size */}
        <div
          className="w-full flex items-center justify-center pb-4"
          style={{ fontSize: "0", lineHeight: "0" }}
        >
          <div className=" w-full">
            <MorphingText texts={texts} className="!text-xl !h-8 !leading-snug !lg:text-xl" />
          </div>
        </div>

        {/* Card */}
        <Card className="mx-5 relative max-w-md shadow-none border-dotted">
          <CardHeader>
            {/* <CardTitle>Tether</CardTitle> */}
            <CardDescription className="space-y-2">
              <p>
                <a
                  href="/tether-design-document"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 hover:underline"
                >
                  <FileTextIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                  <span>Design Document</span>
                </a>
              </p>
              <p>
                <a href="/" className="inline-flex items-center gap-2 hover:underline text-xs text-muted-foreground">
                  ← back
                </a>
              </p>
            </CardDescription>
          </CardHeader>
        </Card>

      </Card>
    </div>
  )
}