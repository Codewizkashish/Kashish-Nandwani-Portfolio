"use client";

import { useRef } from "react";
// import { useScroll } from "framer-motion";
import Link from "next/link";
import StickyCursor from "./sticky-cursor";
import { Linkedin, Github, Code2, Terminal } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start start", "end end"],
  // });

  const stickyRef1 = useRef<HTMLDivElement>(null);
  const stickyRef2 = useRef<HTMLDivElement>(null);
  const stickyRef3 = useRef<HTMLDivElement>(null);
  const stickyRef4 = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "About Me",
      href: "/about",
      video: "/images/about.jpg",
      color: "#BBACAF",
      ref: stickyRef1,
    },
    {
      title: "Projects",
      href: "/projects",
      video: "/videos/projects.mp4",
      color: "#977F6D",
      ref: stickyRef2,
    },
    {
      title: "Achievements",
      href: "/achievements",
      video: "/videos/achievements.mp4",
      color: "#88A28D",
      ref: stickyRef3,
    },
    {
      title: "Skills",
      href: "/skills",
      video: "/videos/skills.mp4",
      color: "#C2491D",
      ref: stickyRef4,
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/kashish-nandwani-284872291/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/Codewizkashish",
      icon: Github,
    },
  ];

  const codingPlatforms = [
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/codewizkashish/",
      icon: Code2,
    },
    {
      name: "CodeChef",
      href: "https://www.codechef.com/users/codishkashh",
      icon: Terminal,
    },
  ];
  return (
    <main ref={containerRef} className="relative">
      <section className="h-screen flex items-center justify-center px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-serif font-light text-foreground mb-8 tracking-tight">
            Kashish Nandwani
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            Web Developer & Creative Technologist
          </p>
          <div className="w-24 h-px bg-primary mx-auto mt-12" />

          {/* 🔗 Social Links (Row 1) */}
          <div className="flex justify-center gap-4 mt-6 font-mono">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                className="relative text-muted-foreground hover:text-primary transition"
              >
                <link.icon size={24} />
              </Link>
            ))}
          </div>

          {/* 🔗 Coding Platforms (Row 2) */}
          <div className="flex justify-center gap-8 mt-4 font-mono text-lg">
            {codingPlatforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.href}
                target="_blank"
                className="relative text-muted-foreground hover:text-primary transition"
              >
                {platform.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {cards.map((card, index) => {
        const targetScale = 1 - (cards.length - index) * 0.05;

        return (
          <div
            key={card.title}
            className="h-screen flex items-center justify-center sticky top-0"
          >
            <div
              ref={card.ref}
              className="relative h-[500px] w-full max-w-[1000px] rounded-[25px] transform-gpu origin-top transition-all duration-500 overflow-hidden cursor-pointer"
              style={{
                backgroundColor: card.color,
                transform: `scale(${targetScale})`,
              }}
            >
              <Link href={card.href} className="block w-full h-full">
                <div className="absolute inset-0">
  {card.video.endsWith(".mp4") ? (
    <video
      src={card.video}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  ) : (
    <Image
      src={card.video}
      alt={card.title}
      fill  
      className="object-cover"
    />
  )}

  <div className="absolute inset-0 bg-black/40" />
</div>


                <div className="relative z-10 flex items-center justify-center h-full">
                  <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-wide">
                    {card.title}
                  </h2>
                </div>
              </Link>

              <StickyCursor stickyElement={card.ref as React.RefObject<HTMLElement>} />
            </div>
          </div>
        );
      })}
    </main>
  );
}
