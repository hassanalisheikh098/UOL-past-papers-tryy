"use client";
import React from "react";
import { ContainerScroll } from "../pages/contribute";
import { Instagram, Linkedin, Mail } from "lucide-react"
import pic from '../assets/pic.png'; // Adjust the path as necessary

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

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold dark:text-white">
              Want To Contribute? <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Send us your past papers to help us Grow!
              </span>
            </h1>
          </>
        }
      >
        <img
          src= {pic}
          alt="hero"
          height={1700}
          width={800}
          className="mx-auto rounded-2xl object-cover object-left-top w-full h-full"
          draggable={false}
        />
      </ContainerScroll>
      <SocialIcons />
    </div>
  );
}
