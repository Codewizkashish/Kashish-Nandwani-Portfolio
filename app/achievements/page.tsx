"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/navigation"
import MagneticElement from "@/components/magnetic-element"

gsap.registerPlugin(ScrollTrigger)

export default function AchievementsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement[]>([])

    const achievements = [
    {
      year: "2025",
      title: "Open Source Contributor - GSSoC’25",
      organization: "GirlScript Summer of Code",
      description:
        "Selected from thousands of applicants as a GSSoC’25 contributor; collaborated with global developers to enhance production-grade web apps, optimize frontend components, and improve documentation.",
    },
    {
      year: "2025",
      title: "Hackzilla 2025 Coordinator",
      organization: "IIIT Sonepat",
      description:
        "Organized a national-level 24-hour hackathon with 200+ participants and 25+ sponsors as part of the Student Council.",
    },
    {
      year: "2024",
      title: "LeetCode Achiever",
      organization: "LeetCode",
      description:
        "Solved 200+ problems across data structures and algorithms, maintaining a 200-day streak.",
    },
    {
      year: "2024",
      title: "CodeChef Competitor",
      organization: "CodeChef",
      description:
        "Achieved a peak rating of 1362 by solving diverse competitive programming problems.",
    },
    {
      year: "2023",
      title: "B.Tech in Information Technology",
      organization: "IIIT Sonepat",
      description:
        "Started Bachelor of Technology in Information Technology at IIIT Sonepat after qualifying JEE Mains.",
    },
    {
      year: "2017-2020",
      title: "Mathematics Competitions",
      organization: "SOF & Brain-o-Brain",
      description:
        "Won multiple awards — Gold (District), Silver (State), and Champion Trophy in Abacus competitions, and a Bronze medal in International Mathematics Olympiad (IMO).",
    },
  ]


  useEffect(() => {
    const hero = heroRef.current
    const achievementElements = achievementsRef.current

    if (!hero) return

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

    // Achievements animation
    achievementElements.forEach((achievement, index) => {
      if (!achievement) return

      gsap.fromTo(
        achievement,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: achievement,
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
              Achievements
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="animate-in text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Milestones and recognition in my journey
            </p>
          </div>
          <div className="overflow-hidden mt-12">
            <div className="animate-in w-24 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <MagneticElement key={achievement.title} strength={0.05}>
                  <div
                    ref={(el) => {
                      if (el) achievementsRef.current[index] = el
                    }}
                    className="relative flex gap-8 group"
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-background font-mono font-bold group-hover:scale-110 transition-transform duration-300">
                        {achievement.year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1 bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 group-hover:translate-x-2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-mono text-primary">{achievement.year}</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <h3 className="text-2xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <p className="text-primary font-medium mb-4">{achievement.organization}</p>
                      <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
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
