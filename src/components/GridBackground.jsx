import React from "react"
import LandingPage from "../pages/LandingPage"
import LayoutGridDemo from "../pages/Layoutgriddemo"
import { HeroScrollDemo } from "./Help"
import { Instagram, Linkedin, Mail } from "lucide-react"

export function GridBackgroundDemo() {
  return (
    <div className="h-full w-full bg-black bg-grid-white/[0.2] relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative z-10">
        <LandingPage />
        <ClickToExplore />
        <section id="two"><LayoutGridDemo /></section>
        <section id="three"><HeroScrollDemo /></section>
        <SocialIcons />
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

const SocialIcons = () => {
  return (
    <div className="flex justify-center items-center space-x-6 py-8 mb-5">
      <SocialIcon href="https://www.instagram.com/hassannn_alii/" icon={<Instagram />} label="Instagram" />
      <SocialIcon href="https://www.linkedin.com/in/hassan-ali-sheikh-8037222aa/" icon={<Linkedin />} label="LinkedIn" />
      <SocialIcon href="mailto:hassancodes098@gmail.com" icon={<Mail />} label="Email" />
    </div>
  )
}

const SocialIcon = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      className="text-white hover:text-primary transition-colors duration-300 transform hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">{label}</span>
      {React.cloneElement(icon, { size: 45 })}
    </a>
  )
}

export default GridBackgroundDemo

