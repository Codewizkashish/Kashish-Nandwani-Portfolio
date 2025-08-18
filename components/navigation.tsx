"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import MagneticElement from "./magnetic-element";
import Footer from "./Footer";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const menuBackgroundRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "About", href: "/about", index: "01" },
    { name: "Projects", href: "/projects", index: "02" },
    { name: "Skills", href: "/skills", index: "03" },
    { name: "Achievements", href: "/achievements", index: "04" },
  ];

  useEffect(() => {
    const menu = menuRef.current;
    const items = menuItemsRef.current;
    const background = menuBackgroundRef.current;

    if (!menu || !background) return;

    if (isMenuOpen) {
      gsap.set(menu, { display: "flex" });

      // Background animation
      gsap.fromTo(
        background,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.6, ease: "power3.out" }
      );

      // Menu items staggered animation
      gsap.fromTo(
        items,
        { opacity: 0, y: 60, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Add subtle floating animation to menu items
      items.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            y: "+=10",
            duration: 2 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1 + index * 0.1,
          });
        }
      });
    } else {
      gsap.to(items, {
        opacity: 0,
        y: -30,
        rotationX: 90,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in",
      });

      gsap.to(background, {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "power3.in",
        delay: 0.2,
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });

      // Kill floating animations
      items.forEach((item) => {
        if (item) gsap.killTweensOf(item);
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <MagneticElement strength={0.4}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative flex flex-col gap-1.5 p-3 hover:scale-110 transition-transform duration-300 z-50"
            >
              <span
                className={`w-7 h-0.5 bg-foreground transition-all duration-500 ${
                  isMenuOpen ? "rotate-45 translate-y-2 bg-primary" : ""
                }`}
              />
              <span
                className={`w-7 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`w-7 h-0.5 bg-foreground transition-all duration-500 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2 bg-primary" : ""
                }`}
              />

              <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
            </button>
          </MagneticElement>

          <MagneticElement strength={0.3}>
            <Link
              href="/contact"
              className="relative text-foreground hover:text-primary transition-colors duration-300 font-medium px-6 py-3 border border-border hover:border-primary/50 rounded-full backdrop-blur-sm bg-background/50"
            >
              Contact Me
              <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 hover:scale-100 transition-transform duration-300 -z-10" />
            </Link>
          </MagneticElement>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-30 hidden flex-col items-center justify-center overflow-hidden"
      >
        <div
          ref={menuBackgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card backdrop-blur-xl"
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 text-center space-y-12">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                if (el) menuItemsRef.current[index] = el;
              }}
              className="group relative"
            >
              <MagneticElement strength={0.2}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-8">
                    <span className="text-sm font-mono text-primary/60 group-hover:text-primary transition-colors duration-300">
                      {item.index}
                    </span>
                    <span className="text-5xl md:text-7xl font-serif font-light text-foreground group-hover:text-primary transition-colors duration-500 tracking-tight">
                      {item.name}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-1/2 w-0 h-px bg-primary group-hover:w-full group-hover:left-0 transition-all duration-500" />
                </Link>
              </MagneticElement>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
