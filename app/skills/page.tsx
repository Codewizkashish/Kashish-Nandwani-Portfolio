"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/navigation"
import MagneticElement from "@/components/magnetic-element"

gsap.registerPlugin(ScrollTrigger)

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement[]>([])

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 95 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "GSAP", level: 85 },
        { name: "Framer Motion", level: 80 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "PostgreSQL", level: 82 },
        { name: "MongoDB", level: 78 },
        { name: "MySQL", level: 85 },
        { name: "REST APIs", level: 90 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "Cloud services", level: 85 },
        { name: "Figma", level: 80 },
        { name: "Vercel", level: 88 },
        { name: "Supabase", level: 80 },
      ],
    },
  ]

  useEffect(() => {
    const hero = heroRef.current
    const skills = skillsRef.current

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

    // Skills animation
    skills.forEach((skillSection, index) => {
      if (!skillSection) return

      gsap.fromTo(
        skillSection,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: skillSection,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate skill bars
      const skillBars = skillSection.querySelectorAll(".skill-bar")
      skillBars.forEach((bar, skillIndex) => {
        const level = bar.getAttribute("data-level")
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: level ? Number.parseInt(level) / 100 : 0,
            duration: 1.5,
            ease: "power2.out",
            delay: skillIndex * 0.1,
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
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
              Skills
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="animate-in text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Technologies and tools I work with
            </p>
          </div>
          <div className="overflow-hidden mt-12">
            <div className="animate-in w-24 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <MagneticElement key={category.title} strength={0.05}>
                <div
                  ref={(el) => {
                    if (el) skillsRef.current[categoryIndex] = el
                  }}
                  className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500"
                >
                  <h2 className="text-3xl font-serif font-semibold text-foreground mb-8 text-center">
                    {category.title}
                  </h2>
                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className="text-primary text-sm font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="skill-bar h-full bg-gradient-to-r from-primary to-accent origin-left scale-x-0 rounded-full"
                            data-level={skill.level}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MagneticElement>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
