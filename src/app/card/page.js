'use client';
import { RetroGrid } from "@/components/ui/retro-grid"
import { Button } from "@/components/ui/button"
import { SpinningText } from "@/components/ui/spinning-text"
import { useState, useEffect } from "react";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons"


const features = [
  {
    Icon: FileTextIcon,
    name: "Resume",
    // description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: (
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent" />
    ),
    className: "bg-transparent shadow-none border-none  mx-5 h-20 lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-4",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "mx-5 h-20 lg:row-start-2 lg:row-end-2 lg:col-start-1 lg:col-end-4",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "mx-5 h-20 lg:row-start-3 lg:row-end-3 lg:col-start-1 lg:col-end-4",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "mx-5 h-20 lg:row-start-4 lg:row-end-4 lg:col-start-1 lg:col-end-4",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "mx-5 h-20 lg:row-start-5 lg:row-end-5 lg:col-start-1 lg:col-end-4",
  },
//   {
//     Icon: InputIcon,
//     name: "Full text search",
//     description: "Search through all your files in one place.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute -top-20 -right-20 opacity-60" />,
//     className: "lg:row-start-2 lg:row-end-2 lg:col-start-1 lg:col-end-1",
//   },
//   {
//     Icon: GlobeIcon,
//     name: "Multilingual",
//     description: "Supports 100+ languages and counting.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute -top-20 -right-20 opacity-60" />,
//     className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-3",
//   },

]




export default function CardPage() {

    // Logic for Handling the cycling adjectives
    const adjectives = ["scared • ", "hungry • ", "tired • ", "broke • "];
    const template = "do • it • ";
        const [index, setIndex] = useState(0);

    const handleMouseEnter = () => {
        // Move to the next adjective
        setIndex((prev) => (prev + 1) % adjectives.length);
  };


  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background - hidden on mobile, visible on tablet+ */}


    {/* <RetroGrid className="absolute inset-0 hidden sm:block" /> */}
    {/* hides the background under 550 pixels */}
    <RetroGrid className="absolute inset-0 hidden [@media(min-width:600px)]:block" />

      
      
    {/* Card - responsive width with max constraint */}
    <Card className="mt-10 relative z-10 w-full max-w-md bg-transparent shadow-none border-none">

<div className="relative w-full h-64 bg-[url('/imgs/face.svg')] bg-center bg-contain bg-no-repeat group"
                onMouseEnter={handleMouseEnter}>
  
  {/* Default Name */}
  <div className="font-serif mt-50 absolute inset-0 flex items-center justify-center text-black dark:text-white font-bold transition-opacity duration-300 group-hover:opacity-0">
    John Acosta
  </div>

    <div className="font-serif mt-60 absolute inset-0 flex items-center justify-center text-black dark:text-white transition-opacity duration-300 group-hover:opacity-0">
    Applied AI & Software Engineering
  </div>

  {/* Spinning Text on Hover */}
  <div className=" font-serif absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-50 delay 5">
    <SpinningText radius="10" className="text-black dark:text-white font-bold animate-spin-on-hover">
      {template} {adjectives[index]}
    </SpinningText>
  </div>

</div>
        {/* <Card className="mx-5 relative max-w-md  shadow-none border-dotted  ">
    <CardHeader>
        <CardTitle>Contact Me</CardTitle>
        <CardDescription className="space-y-1" >
            <p>....</p>
        </CardDescription>
    </CardHeader>
    </Card>
    
    <Card className="mx-5 relative max-w-md  shadow-none border-dotted  ">
    <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription className="space-y-1" >
            <p>Computer Science Student</p>
            <p>Currently doing research in AI</p>


        </CardDescription>
    </CardHeader>
    </Card> */}
<Card className="mx-5 relative max-w-md shadow-none border-dotted">
  <CardHeader>
    <CardTitle>About</CardTitle>
    <CardDescription className="space-y-1">
      <p>Computer Science student currently researching predictive systems.</p>
    </CardDescription>
  </CardHeader>
</Card>
<Card className="mx-5 relative max-w-md shadow-none border-dotted">
  <CardHeader>
    <CardTitle>Links</CardTitle>
<CardDescription className="space-y-2">
  <p>
    <a
      href="/"
      className="group inline-flex items-center gap-2 hover:underline"
    >
      <GlobeIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
      <span>Website</span>
    </a>
  </p>

  <p>
    <a
      href="/resume"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 hover:underline"
    >
      <FileTextIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
      <span>Resume</span>
    </a>
  </p>

  <p>
    <a
      href="https://linkedin.com/in/johnacosta1/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 hover:underline"
    >
      <LinkedInLogoIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
      <span>LinkedIn</span>
    </a>
  </p>

  <p>
    <a
      href="https://github.com/502john"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 hover:underline"
    >
      <GitHubLogoIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
      <span>GitHub</span>
    </a>
  </p>
</CardDescription>

  </CardHeader>
</Card>

<Card className="mx-5 relative max-w-md shadow-none border-dotted">
  <CardHeader>
    <CardTitle>Contact</CardTitle>
    <CardDescription className="space-y-1">
      <p>
        <a href="mailto:johnacosta502@gmail.com" className="hover:underline">
          johnacosta502@gmail.com
        </a>
      </p>
    </CardDescription>
  </CardHeader>
</Card>




    




        


      </Card>
    </div>
  );
}