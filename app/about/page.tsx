"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/navigation"
import MagneticElement from "@/components/magnetic-element"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const content = contentRef.current

    if (!hero || !content) return

    // Hero animation
    const heroElements = hero.querySelectorAll(".animate-in")
    gsap.fromTo(
      heroElements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      },
    )

    // Content sections animation
    const sections = content.querySelectorAll(".content-section")
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navigation />

      <section ref={heroRef} className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden">
            <h1 className="animate-in text-6xl md:text-8xl font-serif font-light text-foreground mb-8 tracking-tight">
              About Me
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="animate-in text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Passionate web developer crafting digital experiences
            </p>
          </div>
          <div className="overflow-hidden mt-12">
            <div className="animate-in w-24 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>

      <section ref={contentRef} className="pb-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="content-section mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-8">My Journey</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I&apos;m Kashish Nandwani, a passionate web developer with a love for creating beautiful, functional, and
                  user-centered digital experiences. My journey in web development began with curiosity and has evolved
                  into a deep passion for crafting innovative solutions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I specialize in modern web technologies and frameworks, always staying up-to-date with the latest
                  trends and best practices in the industry. My approach combines technical expertise with creative
                  problem-solving to deliver exceptional results.
                </p>
              </div>
              <MagneticElement strength={0.1}>
                <div className="relative w-full aspect-[4/5]"> 
  <Image
    src="/images/img.png"
    alt="Kashish Nandwani"
    fill   // ✅ makes image responsive
    className="object-cover rounded-2xl border border-border"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
</div>
              </MagneticElement>
            </div>
          </div>

          <div className="content-section mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-12 text-center">
              What I Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend Development",
                  description: "Creating responsive, interactive user interfaces with modern frameworks and libraries.",
                },
                {
                  title: "Backend Development",
                  description: "Building robust server-side applications and APIs with scalable architecture.",
                },
                {
                  title: "Full-Stack Solutions",
                  description: "Delivering complete web applications from concept to deployment.",
                },
              ].map((service, index) => (
                <MagneticElement key={service.title} strength={0.1}>
                  <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-500">
                    <div className="text-sm font-mono text-primary mb-4">0{index + 1}</div>
                    <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </MagneticElement>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
