"use client";
import React from "react";
import { ContainerScroll } from "../pages/contribute";
import { Instagram, Linkedin, Mail } from "lucide-react"

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
          src="https://scontent.flhe5-1.fna.fbcdn.net/v/t39.30808-6/477324413_1739136723298798_5827494122248110193_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFz2HqO7lgNEEx38oGYQ4N3Lqn5OwQNS4Yuqfk7BA1LhhIrgKmQfbibf1PEVbWqGoqDWdTas7pcrt8U-6YR9AN2&_nc_ohc=ZgDecVlpdDoQ7kNvgGzKHoY&_nc_oc=Adjv_hCncHWTRTAxQh5D4zXpMts0Sqq5xzbqJn_jwEAggFNWcL2VNsDrpb_qizzyG6TYX_ZWWn2tvqwjWgValaIQ&_nc_zt=23&_nc_ht=scontent.flhe5-1.fna&_nc_gid=At36JAhRpmRB-zi4V58G5oX&oh=00_AYBdvjenXRc-Fwpm6jzEoPYn0cXaWdsRlt3vM-Z63_dDfw&oe=67B2BDA3"
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