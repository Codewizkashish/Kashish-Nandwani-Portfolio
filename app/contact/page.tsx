"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Navigation from "@/components/navigation"
import MagneticElement from "@/components/magnetic-element"
import { Mail, Phone, Linkedin, Github } from "lucide-react"

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const form = formRef.current

    if (!hero || !form) return

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

    // Form animation
    const formElements = form.querySelectorAll(".form-element")
    gsap.fromTo(
      formElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      },
    )
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navigation />

      {/* Hero / Intro */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden">
            <h1 className="animate-in text-6xl md:text-8xl font-serif font-light text-foreground mb-6 tracking-tight">
              Hire Me
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="animate-in text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              I&apos;m currently <span className="text-primary font-medium">available for freelance projects</span> and open
              to full-time opportunities. Let&apos;s build something impactful together.
            </p>
          </div>
          <div className="overflow-hidden mt-10">
            <div className="animate-in w-24 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-32 px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          {/* <form ref={formRef} className="space-y-8">
            <div className="form-element">
              <label htmlFor="name" className="block text-foreground font-medium mb-3">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-6 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="form-element">
              <label htmlFor="email" className="block text-foreground font-medium mb-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-6 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-element">
              <label htmlFor="message" className="block text-foreground font-medium mb-3">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-6 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="form-element">
              <MagneticElement strength={0.2}>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-medium py-4 px-8 rounded-xl hover:bg-primary/90 transition-colors duration-300"
                >
                  Send Message
                </button>
              </MagneticElement>
            </div>
          </form> */}

          {/* Direct Info */}
          <div className="text-center">
            <p className="text-muted-foreground mb-8">Contact me</p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
              <MagneticElement strength={0.1}>
                <a
                  href="mailto:nandwanikashish14@gmail.com"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  <Mail size={20} /> nandwanikashish14@gmail.com
                </a>
              </MagneticElement>
              <MagneticElement strength={0.1}>
                <a
                  href="tel:6388025234"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  <Phone size={20} /> +91 63880 25234
                </a>
              </MagneticElement>
            </div>
          </div>

          {/* Social + Resume */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
            <MagneticElement strength={0.1}>
              <a
                href="https://www.linkedin.com/in/kashish-nandwani-284872291/"
                target="_blank"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <Linkedin size={22} /> LinkedIn
              </a>
            </MagneticElement>
            <MagneticElement strength={0.1}>
              <a
                href="https://github.com/Codewizkashish"
                target="_blank"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <Github size={22} /> GitHub
              </a>
            </MagneticElement>
            <MagneticElement strength={0.2}>
              <a
                href="/resume.pdf"
                download
                className="bg-card border border-border rounded-xl py-3 px-6 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Download Resume
              </a>
            </MagneticElement>
          </div>
        </div>
      </section>
    </main>
  )
}
