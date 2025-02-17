import React from "react"
import LandingPage from "../pages/LandingPage"
import LayoutGridDemo from "../pages/Layoutgriddemo"
import { HeroScrollDemo } from "./Help"


export function GridBackgroundDemo() {
  return (
    <div className="h-full w-full bg-black bg-grid-white/[0.2] relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative z-10">
        <LandingPage />
        <ClickToExplore />
        <section id="two" className="mb-8 md:mb-0"><LayoutGridDemo /></section>
        <section id="three"><HeroScrollDemo /></section>
        
      </div>
    </div>
  )
}

const ClickToExplore = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-0 mb-0">
        Click to Explore
      </h1>
    </div>
  )
}



export default GridBackgroundDemo

